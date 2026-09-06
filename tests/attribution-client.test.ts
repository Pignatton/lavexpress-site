import { afterEach, describe, expect, it, vi } from "vitest";

import { REF_REGEX, desserializarCookie } from "@/lib/attribution";
import {
    COOKIE_MAX_AGE,
    COOKIE_NOME,
    TIMEOUT_INGEST_MS,
    capturarAtribuicao,
    enviarIngest,
    linkWhatsAppComAtribuicao,
} from "@/lib/attribution-client";

const ENV_INGEST = "NEXT_PUBLIC_LEAD_INGEST_URL";
const ENDPOINT = "https://ingest.lavcore.test/leads";

type Browser = {
    /** Cookies como o browser os guardaria: nome -> valor. */
    jar: Map<string, string>;
    /** Cada string crua passada para `document.cookie = ...`. */
    escritas: string[];
};

function montarBrowser(opts: {
    url?: string;
    referrer?: string;
    cookieInicial?: string;
    cookiesQuebrados?: boolean;
} = {}): Browser {
    const jar = new Map<string, string>();
    const escritas: string[] = [];

    if (opts.cookieInicial) {
        const i = opts.cookieInicial.indexOf("=");
        jar.set(opts.cookieInicial.slice(0, i), opts.cookieInicial.slice(i + 1));
    }

    const doc = {
        referrer: opts.referrer ?? "",
        get cookie(): string {
            if (opts.cookiesQuebrados) throw new Error("cookies desabilitados");
            return [...jar].map(([k, v]) => `${k}=${v}`).join("; ");
        },
        set cookie(cru: string) {
            if (opts.cookiesQuebrados) throw new Error("cookies desabilitados");
            escritas.push(cru);
            const par = cru.split(";")[0];
            const i = par.indexOf("=");
            jar.set(par.slice(0, i).trim(), par.slice(i + 1));
        },
    };

    const u = new URL(opts.url ?? "https://lavexpress.com/");
    const loc = { href: u.href, search: u.search, hostname: u.hostname, protocol: u.protocol };

    vi.stubGlobal("document", doc);
    vi.stubGlobal("window", { location: loc, document: doc });
    vi.stubGlobal("location", loc);

    return { jar, escritas };
}

afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.useRealTimers();
    vi.restoreAllMocks();
});

/* ========================================================================== */

describe("capturarAtribuicao", () => {
    it("grava a primeira visita paga no cookie lx_attr", () => {
        const b = montarBrowser({
            url: "https://lavexpress.com/pacotes?gclid=Cj0KCQ123&utm_source=google&utm_medium=cpc",
            referrer: "https://www.google.com/",
        });

        const a = capturarAtribuicao();

        expect(a.ref).toMatch(REF_REGEX);
        expect(a.gclid).toBe("Cj0KCQ123");
        expect(a.utm_source).toBe("google");
        expect(a.utm_medium).toBe("cpc");
        expect(a.landing_url).toContain("/pacotes?gclid=Cj0KCQ123");
        expect(a.referrer).toBe("https://www.google.com/");
        expect(a.first_seen_at).toBe(a.last_seen_at);

        expect(desserializarCookie(b.jar.get(COOKIE_NOME))).toEqual(a);
        expect(b.escritas[0]).toContain(`Max-Age=${COOKIE_MAX_AGE}`);
        expect(b.escritas[0]).toContain("Path=/");
        expect(b.escritas[0]).toContain("SameSite=Lax");
    });

    it("marca Secure em https e omite em http", () => {
        const seguro = montarBrowser({ url: "https://lavexpress.com/" });
        capturarAtribuicao();
        expect(seguro.escritas[0]).toContain("; Secure");

        vi.unstubAllGlobals();

        const local = montarBrowser({ url: "http://localhost:3000/" });
        capturarAtribuicao();
        expect(local.escritas[0]).not.toContain("Secure");
    });

    it("reaproveita o mesmo lead_ref na segunda visita", () => {
        const b = montarBrowser({ url: "https://lavexpress.com/?gclid=primeiro" });
        const primeira = capturarAtribuicao();

        vi.unstubAllGlobals();
        montarBrowser({
            url: "https://lavexpress.com/contato?gclid=segundo&utm_source=bing",
            cookieInicial: `${COOKIE_NOME}=${b.jar.get(COOKIE_NOME)}`,
        });
        const segunda = capturarAtribuicao();

        expect(segunda.ref).toBe(primeira.ref);
        expect(segunda.gclid).toBe("primeiro");
        expect(segunda.utm_source).toBeNull();
        expect(segunda.landing_url).toBe(primeira.landing_url);
        expect(segunda.first_seen_at).toBe(primeira.first_seen_at);
    });

    it("promove o click id de uma visita paga depois de uma orgânica", () => {
        const b = montarBrowser({
            url: "https://lavexpress.com/?utm_source=instagram",
            referrer: "https://l.instagram.com/",
        });
        const organica = capturarAtribuicao();
        expect(organica.gclid).toBeNull();

        vi.unstubAllGlobals();
        montarBrowser({
            url: "https://lavexpress.com/pacotes?gclid=pago-1&utm_source=google&utm_medium=cpc",
            cookieInicial: `${COOKIE_NOME}=${b.jar.get(COOKIE_NOME)}`,
        });
        const paga = capturarAtribuicao();

        expect(paga.ref).toBe(organica.ref);
        expect(paga.gclid).toBe("pago-1");
        expect(paga.utm_source).toBe("google");
        expect(paga.first_seen_at).toBe(organica.first_seen_at);
    });

    it("cookie corrompido não lança e recomeça limpo", () => {
        const b = montarBrowser({
            url: "https://lavexpress.com/?gclid=novo",
            cookieInicial: `${COOKIE_NOME}=%7B%7B%7Bnao-e-json`,
        });

        let a!: ReturnType<typeof capturarAtribuicao>;
        expect(() => {
            a = capturarAtribuicao();
        }).not.toThrow();

        expect(a.ref).toMatch(REF_REGEX);
        expect(a.gclid).toBe("novo");
        // O cookie quebrado foi substituído por um válido.
        expect(desserializarCookie(b.jar.get(COOKIE_NOME))).toEqual(a);
    });

    it("cookie desabilitado devolve atribuição em memória", () => {
        montarBrowser({ url: "https://lavexpress.com/?gclid=abc", cookiesQuebrados: true });

        let a!: ReturnType<typeof capturarAtribuicao>;
        expect(() => {
            a = capturarAtribuicao();
        }).not.toThrow();

        expect(a.ref).toMatch(REF_REGEX);
        expect(a.gclid).toBe("abc");
    });

    it("funciona sem window nem document (render no servidor)", () => {
        let a!: ReturnType<typeof capturarAtribuicao>;
        expect(() => {
            a = capturarAtribuicao();
        }).not.toThrow();
        expect(a.ref).toMatch(REF_REGEX);
        expect(a.landing_url).toBeNull();
    });
});

/* ========================================================================== */

function atribuicaoDeTeste() {
    montarBrowser({ url: "https://lavexpress.com/?gclid=abc&utm_source=google" });
    const a = capturarAtribuicao();
    vi.unstubAllGlobals();
    return a;
}

describe("enviarIngest", () => {
    it("NÃO faz chamada de rede quando a env está vazia", () => {
        const a = atribuicaoDeTeste();
        const beacon = vi.fn(() => true);
        const fetchSpy = vi.fn();
        vi.stubGlobal("navigator", { sendBeacon: beacon });
        vi.stubGlobal("fetch", fetchSpy);
        vi.stubEnv(ENV_INGEST, "");

        enviarIngest(a, {});

        expect(beacon).not.toHaveBeenCalled();
        expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("NÃO faz chamada de rede quando a env está ausente", () => {
        const a = atribuicaoDeTeste();
        const beacon = vi.fn(() => true);
        const fetchSpy = vi.fn();
        vi.stubGlobal("navigator", { sendBeacon: beacon });
        vi.stubGlobal("fetch", fetchSpy);
        vi.stubEnv(ENV_INGEST, undefined);

        enviarIngest(a, { bairro: "Jardim Camburi" });

        expect(beacon).not.toHaveBeenCalled();
        expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("NÃO faz chamada de rede quando a env é só espaço em branco", () => {
        const a = atribuicaoDeTeste();
        const beacon = vi.fn(() => true);
        vi.stubGlobal("navigator", { sendBeacon: beacon });
        vi.stubGlobal("fetch", vi.fn());
        vi.stubEnv(ENV_INGEST, "   ");

        enviarIngest(a, {});

        expect(beacon).not.toHaveBeenCalled();
    });

    it("usa sendBeacon com o corpo do contrato quando a env existe", async () => {
        const a = atribuicaoDeTeste();
        const beacon = vi.fn(() => true);
        const fetchSpy = vi.fn();
        vi.stubGlobal("navigator", { sendBeacon: beacon });
        vi.stubGlobal("fetch", fetchSpy);
        vi.stubGlobal("location", { hostname: "lavexpress.com", protocol: "https:" });
        vi.stubEnv(ENV_INGEST, ENDPOINT);

        enviarIngest(a, { bairro: "Jardim Camburi", cep: "29090-130", serviceInterest: "Passadoria" });

        expect(beacon).toHaveBeenCalledTimes(1);
        expect(fetchSpy).not.toHaveBeenCalled();

        const [url, blob] = beacon.mock.calls[0] as unknown as [string, Blob];
        expect(url).toBe(ENDPOINT);
        expect(blob.type).toBe("application/json");

        const corpo = JSON.parse(await blob.text());
        expect(corpo).toMatchObject({
            lead_ref: a.ref,
            tenant_slug: "lavexpress",
            gclid: "abc",
            utm_source: "google",
            bairro: "Jardim Camburi",
            cep: "29090-130",
            service_interest: "Passadoria",
            first_touch_at: a.first_seen_at,
            last_touch_at: a.last_seen_at,
            is_test: false,
        });
    });

    it("sanitiza os extras antes de enviar", async () => {
        const a = atribuicaoDeTeste();
        const beacon = vi.fn(() => true);
        vi.stubGlobal("navigator", { sendBeacon: beacon });
        vi.stubEnv(ENV_INGEST, ENDPOINT);

        enviarIngest(a, { bairro: '<b>Praia do Canto</b>', cep: "X".repeat(500), serviceInterest: "" });

        const [, blob] = beacon.mock.calls[0] as unknown as [string, Blob];
        const corpo = JSON.parse(await blob.text());
        expect(corpo.bairro).toBe("bPraia do Canto/b");
        expect(corpo.cep).toHaveLength(16);
        expect(corpo.service_interest).toBeNull();
    });

    it("marca is_test em ambiente local", async () => {
        const a = atribuicaoDeTeste();
        const beacon = vi.fn(() => true);
        vi.stubGlobal("navigator", { sendBeacon: beacon });
        vi.stubGlobal("location", { hostname: "localhost", protocol: "http:" });
        vi.stubEnv(ENV_INGEST, ENDPOINT);

        enviarIngest(a, {});

        const [, blob] = beacon.mock.calls[0] as unknown as [string, Blob];
        expect(JSON.parse(await blob.text()).is_test).toBe(true);
    });

    it("cai para fetch com keepalive quando sendBeacon recusa", () => {
        vi.useFakeTimers();
        const a = atribuicaoDeTeste();
        const fetchSpy = vi.fn(() => Promise.resolve(new Response(null)));
        vi.stubGlobal("navigator", { sendBeacon: vi.fn(() => false) });
        vi.stubGlobal("fetch", fetchSpy);
        vi.stubEnv(ENV_INGEST, ENDPOINT);

        enviarIngest(a, {});

        expect(fetchSpy).toHaveBeenCalledTimes(1);
        const [url, init] = fetchSpy.mock.calls[0] as unknown as [string, RequestInit];
        expect(url).toBe(ENDPOINT);
        expect(init.method).toBe("POST");
        expect(init.keepalive).toBe(true);
        expect(init.credentials).toBe("omit");

        // Timeout duro de 600 ms: passado o prazo, a requisição é abortada e o
        // clique nunca fica pendurado esperando a rede.
        expect(init.signal?.aborted).toBe(false);
        vi.advanceTimersByTime(TIMEOUT_INGEST_MS);
        expect(init.signal?.aborted).toBe(true);
    });

    it("usa fetch quando o browser não tem sendBeacon", () => {
        vi.useFakeTimers();
        const a = atribuicaoDeTeste();
        const fetchSpy = vi.fn(() => Promise.resolve(new Response(null)));
        vi.stubGlobal("navigator", {});
        vi.stubGlobal("fetch", fetchSpy);
        vi.stubEnv(ENV_INGEST, ENDPOINT);

        enviarIngest(a, {});

        expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    it("nunca lança, mesmo com transporte quebrado", () => {
        vi.useFakeTimers();
        const a = atribuicaoDeTeste();
        vi.stubEnv(ENV_INGEST, ENDPOINT);

        vi.stubGlobal("navigator", {
            sendBeacon: () => {
                throw new Error("beacon explodiu");
            },
        });
        vi.stubGlobal("fetch", () => {
            throw new Error("fetch explodiu");
        });

        expect(() => enviarIngest(a, {})).not.toThrow();
    });

    it("rejeição de rede não vira unhandled rejection", () => {
        vi.useFakeTimers();
        const a = atribuicaoDeTeste();
        vi.stubEnv(ENV_INGEST, ENDPOINT);
        vi.stubGlobal("navigator", { sendBeacon: vi.fn(() => false) });
        vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new Error("offline"))));

        expect(() => enviarIngest(a, {})).not.toThrow();
    });
});

/* ========================================================================== */

/** O `text` sai como form-encoding (espaço vira `+`), então decodifica-se assim. */
function textoDoLink(link: string): string {
    return new URLSearchParams(link.slice(link.indexOf("?") + 1)).get("text") ?? "";
}

describe("linkWhatsAppComAtribuicao", () => {
    it("carimba o Ref: e não faz rede sem endpoint configurado", () => {
        montarBrowser({ url: "https://lavexpress.com/?gclid=abc" });
        const fetchSpy = vi.fn();
        vi.stubGlobal("fetch", fetchSpy);
        vi.stubEnv(ENV_INGEST, "");

        const link = linkWhatsAppComAtribuicao({ text: "Olá! Quero agendar." });
        const texto = textoDoLink(link);

        expect(link.startsWith("https://wa.me/5527996172403?text=")).toBe(true);
        expect(texto.startsWith("Olá! Quero agendar.")).toBe(true);
        expect(texto).toMatch(/\n\nRef: LX-[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{6}$/);
        expect(fetchSpy).not.toHaveBeenCalled();

        // Nada de identificador do Google escapando para a URL pública.
        for (const proibido of ["gclid", "gbraid", "wbraid"]) {
            expect(link.toLowerCase()).not.toContain(proibido);
        }
    });

    it("reusa o mesmo lead_ref em dois cliques da mesma sessão", () => {
        montarBrowser({ url: "https://lavexpress.com/?gclid=abc" });
        vi.stubEnv(ENV_INGEST, "");

        const um = linkWhatsAppComAtribuicao({ text: "Primeiro clique." });
        const dois = linkWhatsAppComAtribuicao({ text: "Segundo clique." });

        const ref = (s: string) => /Ref: (LX-[A-Z0-9]{6})/.exec(textoDoLink(s))?.[1];
        expect(ref(um)).toBeDefined();
        expect(ref(dois)).toBe(ref(um));
    });

    it("devolve o link com a copy original se a captura falhar", () => {
        // Sem `crypto` não há como gerar `lead_ref`; o lead ainda tem que passar.
        vi.stubGlobal("crypto", undefined);
        montarBrowser({ url: "https://lavexpress.com/" });

        const link = linkWhatsAppComAtribuicao({ text: "Olá! Quero agendar." });
        expect(textoDoLink(link)).toBe("Olá! Quero agendar.");
        expect(link.startsWith("https://wa.me/")).toBe(true);
    });
});
