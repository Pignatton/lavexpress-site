import { afterEach, describe, expect, it, vi } from "vitest";

import { REF_REGEX, desserializarCookie, type Atribuicao } from "@/lib/attribution";
import {
    COOKIE_MAX_AGE,
    COOKIE_NOME,
    capturarAtribuicao,
    janelaRestante,
    linkWhatsAppComAtribuicao,
} from "@/lib/attribution-client";


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

/** Extrai a mensagem de dentro do wa.me para conferir a copy e o `Ref:`. */
function textoDoLink(link: string): string {
    return decodeURIComponent(new URL(link).searchParams.get("text") ?? "");
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

describe("linkWhatsAppComAtribuicao", () => {
    it("carimba o Ref: sem fazer nenhuma chamada de rede", () => {
        montarBrowser({ url: "https://lavexpress.com/?gclid=abc" });
        const fetchSpy = vi.fn();
        const beaconSpy = vi.fn(() => true);
        vi.stubGlobal("fetch", fetchSpy);
        vi.stubGlobal("navigator", { sendBeacon: beaconSpy });

        const link = linkWhatsAppComAtribuicao({ text: "Olá! Quero agendar." });
        const texto = textoDoLink(link);

        expect(link.startsWith("https://wa.me/5527996172403?text=")).toBe(true);
        expect(texto.startsWith("Olá! Quero agendar.")).toBe(true);
        expect(texto).toMatch(/\n\nRef: LX-[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{6}$/);
        // A atribuicao vive inteira no cookie: nada sai do browser.
        expect(fetchSpy).not.toHaveBeenCalled();
        expect(beaconSpy).not.toHaveBeenCalled();

        // Nada de identificador do Google escapando para a URL pública.
        for (const proibido of ["gclid", "gbraid", "wbraid"]) {
            expect(link.toLowerCase()).not.toContain(proibido);
        }
    });

    it("reusa o mesmo lead_ref em dois cliques da mesma sessão", () => {
        montarBrowser({ url: "https://lavexpress.com/?gclid=abc" });

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


/* ========================================================================== */

const DIA = 86400;

/** Um cookie `lx_attr` válido, com os campos que o teste quiser sobrescrever. */
function cookieCom(campos: Partial<Atribuicao>): string {
    const agora = new Date().toISOString();
    const a: Atribuicao = {
        v: 1,
        ref: "LX-AAAAAA",
        gclid: null,
        gbraid: null,
        wbraid: null,
        utm_source: null,
        utm_medium: null,
        utm_campaign: null,
        utm_content: null,
        utm_term: null,
        landing_url: null,
        referrer: null,
        first_seen_at: agora,
        last_seen_at: agora,
        click_id_at: null,
        ...campos,
    };
    return `${COOKIE_NOME}=${encodeURIComponent(JSON.stringify(a))}`;
}

function haDias(n: number): string {
    return new Date(Date.now() - n * DIA * 1000).toISOString();
}

/** O `Max-Age` que foi efetivamente escrito em `document.cookie`. */
function maxAgeEscrito(escritas: string[]): number {
    const ultima = escritas[escritas.length - 1] ?? "";
    const m = ultima.match(/Max-Age=(\d+)/);
    return m ? Number(m[1]) : -1;
}

describe("janela de atribuição do lx_attr", () => {
    it("REGRESSÃO: regravar devolve o que RESTA da janela, não 90 dias cheios", () => {
        // Este é o bug que o teste existe para impedir de voltar. Antes, todo
        // `Max-Age` saía cheio, e o <AttributionBoot> regrava a cada troca de
        // rota — a janela rolava indefinidamente e nunca fechava.
        const dezDias = haDias(10);
        const b = montarBrowser({
            url: "https://lavexpress.com/pacotes",
            cookieInicial: cookieCom({
                ref: "LX-ABC123",
                gclid: "clique-de-10-dias",
                click_id_at: dezDias,
                first_seen_at: dezDias,
            }),
        });

        const a = capturarAtribuicao();
        expect(a.ref).toBe("LX-ABC123");

        const maxAge = maxAgeEscrito(b.escritas);
        expect(maxAge).toBeLessThan(COOKIE_MAX_AGE);
        expect(maxAge).toBeGreaterThan(79 * DIA);
        expect(maxAge).toBeLessThanOrEqual(80 * DIA);
    });

    it("janela vencida começa um período novo, com ref novo e sem arrastar o clique velho", () => {
        const velho = haDias(91);
        montarBrowser({
            cookieInicial: cookieCom({
                ref: "LX-ABC123",
                gclid: "clique-vencido",
                click_id_at: velho,
                first_seen_at: velho,
            }),
        });

        const a = capturarAtribuicao();

        expect(a.ref).not.toBe("LX-ABC123");
        expect(a.ref).toMatch(REF_REGEX);
        expect(a.gclid).toBeNull();
        expect(a.click_id_at).toBeNull();
    });

    it("ancora no clique pago, não na primeira visita orgânica", () => {
        // Chegou por busca orgânica há 20 dias; volta hoje por um anúncio.
        // A janela de atribuição abre AGORA — é assim que o Google conta.
        const vinteDias = haDias(20);
        const b = montarBrowser({
            url: "https://lavexpress.com/?gclid=abc123",
            cookieInicial: cookieCom({
                ref: "LX-RG0001",
                first_seen_at: vinteDias,
                last_seen_at: vinteDias,
                click_id_at: null,
            }),
        });

        const a = capturarAtribuicao();

        expect(a.ref).toBe("LX-RG0001");
        expect(a.gclid).toBe("abc123");
        expect(a.first_seen_at).toBe(vinteDias);
        expect(a.click_id_at).not.toBeNull();
        // 90 dias a partir do clique, não os 70 que sobrariam do first touch.
        expect(maxAgeEscrito(b.escritas)).toBe(COOKIE_MAX_AGE);
    });

    it("dois cliques na mesma visita não esticam a janela", () => {
        const cincoDias = haDias(5);
        const b = montarBrowser({
            cookieInicial: cookieCom({
                ref: "LX-ABC123",
                gclid: "x",
                click_id_at: cincoDias,
                first_seen_at: cincoDias,
            }),
        });

        const um = linkWhatsAppComAtribuicao({ text: "Primeiro clique." });
        const dois = linkWhatsAppComAtribuicao({ text: "Segundo clique." });

        expect(textoDoLink(um)).toContain("Ref: LX-ABC123");
        expect(textoDoLink(dois)).toContain("Ref: LX-ABC123");
        for (const escrita of b.escritas) {
            expect(maxAgeEscrito([escrita])).toBeLessThanOrEqual(86 * DIA);
        }
    });

    it("relógio ilegível devolve a janela cheia (fail-open)", () => {
        const a = JSON.parse(
            decodeURIComponent(cookieCom({}).slice(COOKIE_NOME.length + 1)),
        ) as Atribuicao;
        a.first_seen_at = "não é uma data";
        a.click_id_at = null;

        expect(janelaRestante(a, Date.now())).toBe(COOKIE_MAX_AGE);
    });

    it("sem cookie, o WhatsApp abre e o Ref: ainda vai", () => {
        montarBrowser({ cookiesQuebrados: true });

        const link = linkWhatsAppComAtribuicao({ text: "Olá! Quero agendar." });

        expect(link.startsWith("https://wa.me/5527996172403?text=")).toBe(true);
        expect(textoDoLink(link)).toMatch(
            /\n\nRef: LX-[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{6}$/,
        );
    });

    it("sem crypto, o WhatsApp abre com a copy original — nunca engole o lead", () => {
        montarBrowser();
        vi.stubGlobal("crypto", undefined);

        const link = linkWhatsAppComAtribuicao({ text: "Olá! Quero agendar." });

        expect(link.startsWith("https://wa.me/5527996172403?text=")).toBe(true);
        expect(textoDoLink(link)).toBe("Olá! Quero agendar.");
    });
});
