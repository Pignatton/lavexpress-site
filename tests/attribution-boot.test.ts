import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { afterEach, describe, expect, it, vi } from "vitest";

import { REF_REGEX } from "@/lib/attribution";
import { COOKIE_NOME, capturarAtribuicao } from "@/lib/attribution-client";

/**
 * Regressão da captura NA CHEGADA. [CONTRATO-ATRIB]
 *
 * O defeito que estes testes travam foi real e passou despercebido pela suíte
 * original: enquanto a captura acontecia apenas no clique do WhatsApp, quem
 * chegava em `/?gclid=X` e navegava para outra página antes de clicar **perdia
 * o gclid**. No momento do clique `location.search` já estava limpa e o cookie
 * ainda não existia para preservar nada. Verificado no site compilado: o
 * cookie nascia com `gclid: null`.
 *
 * `<AttributionBoot />` corrige isso chamando `capturarAtribuicao()` no
 * primeiro render de qualquer página. Estes testes exercitam exatamente esse
 * mecanismo — duas chamadas em URLs diferentes, como o componente faz ao
 * montar e a cada troca de rota.
 */

type Browser = { jar: Map<string, string> };

function montarBrowser(opts: { url: string; jar?: Map<string, string>; referrer?: string }): Browser {
    const jar = opts.jar ?? new Map<string, string>();

    const doc = {
        referrer: opts.referrer ?? "",
        get cookie(): string {
            return [...jar].map(([k, v]) => `${k}=${v}`).join("; ");
        },
        set cookie(cru: string) {
            const par = cru.split(";")[0];
            const i = par.indexOf("=");
            jar.set(par.slice(0, i).trim(), par.slice(i + 1));
        },
    };

    const u = new URL(opts.url);
    const loc = { href: u.href, search: u.search, hostname: u.hostname, protocol: u.protocol };

    vi.stubGlobal("document", doc);
    vi.stubGlobal("window", { location: loc, document: doc });
    vi.stubGlobal("location", loc);

    return { jar };
}

afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

describe("captura na chegada (AttributionBoot)", () => {
    it("preserva o gclid quando a pessoa navega antes de clicar no WhatsApp", () => {
        // 1. Chega pelo anúncio. O boot captura no render da home.
        const jar = new Map<string, string>();
        montarBrowser({
            url: "https://lavexpress.com/?gclid=CENARIO_MULTIPAGINA&utm_source=google&utm_medium=cpc&utm_campaign=lavexpress2026",
            jar,
            referrer: "https://www.google.com/",
        });
        const naChegada = capturarAtribuicao();
        expect(naChegada.gclid).toBe("CENARIO_MULTIPAGINA");

        // 2. Navega para /pacotes. A query some da URL; o boot roda de novo.
        vi.unstubAllGlobals();
        montarBrowser({ url: "https://lavexpress.com/pacotes", jar });
        const naSegundaPagina = capturarAtribuicao();

        // 3. É aqui que o clique aconteceria. O gclid tem de continuar vivo.
        expect(naSegundaPagina.gclid).toBe("CENARIO_MULTIPAGINA");
        expect(naSegundaPagina.utm_source).toBe("google");
        expect(naSegundaPagina.utm_campaign).toBe("lavexpress2026");
        expect(naSegundaPagina.ref).toBe(naChegada.ref);
        expect(naSegundaPagina.landing_url).toContain("gclid=CENARIO_MULTIPAGINA");
        expect(naSegundaPagina.referrer).toBe("https://www.google.com/");
        expect(naSegundaPagina.first_seen_at).toBe(naChegada.first_seen_at);
    });

    it("não inventa atribuição paga em visita orgânica", () => {
        const jar = new Map<string, string>();
        montarBrowser({ url: "https://lavexpress.com/", jar });
        const a = capturarAtribuicao();

        expect(a.ref).toMatch(REF_REGEX);
        expect(a.gclid).toBeNull();
        expect(a.gbraid).toBeNull();
        expect(a.wbraid).toBeNull();
        expect(jar.has(COOKIE_NOME)).toBe(true);
    });

    it("promove o click id quando o anúncio só aparece na segunda visita", () => {
        // Primeiro contato orgânico: cookie existe, sem click id.
        const jar = new Map<string, string>();
        montarBrowser({ url: "https://lavexpress.com/servicos/lavagem-de-tenis", jar });
        const organica = capturarAtribuicao();
        expect(organica.gclid).toBeNull();

        // Volta clicando no anúncio: o click id é promovido, o ref não muda.
        vi.unstubAllGlobals();
        montarBrowser({ url: "https://lavexpress.com/?gclid=VOLTOU_PELO_ADS&utm_source=google", jar });
        const paga = capturarAtribuicao();

        expect(paga.gclid).toBe("VOLTOU_PELO_ADS");
        expect(paga.utm_source).toBe("google");
        expect(paga.ref).toBe(organica.ref);
        expect(paga.first_seen_at).toBe(organica.first_seen_at);
    });

    it("não troca um click id válido por outro em visita posterior", () => {
        const jar = new Map<string, string>();
        montarBrowser({ url: "https://lavexpress.com/?gclid=PRIMEIRO_CLIQUE", jar });
        const primeira = capturarAtribuicao();

        vi.unstubAllGlobals();
        montarBrowser({ url: "https://lavexpress.com/?gclid=SEGUNDO_CLIQUE", jar });
        const segunda = capturarAtribuicao();

        // First touch manda: quem descobriu o cliente leva o crédito.
        expect(segunda.gclid).toBe("PRIMEIRO_CLIQUE");
        expect(segunda.ref).toBe(primeira.ref);
    });

    /**
     * Os testes acima provam que o MECANISMO preserva o gclid. Este prova que
     * ele está LIGADO: o defeito original não era lógica errada, era ninguém
     * chamar a captura na chegada. Sem esta asserção, remover `<AttributionBoot />`
     * do layout deixaria a suíte verde e a atribuição quebrada em produção.
     */
    it("o layout raiz monta o AttributionBoot", () => {
        const layout = readFileSync(
            fileURLToPath(new URL("../app/layout.tsx", import.meta.url)),
            "utf8",
        );

        expect(layout).toMatch(/import\s*\{\s*AttributionBoot\s*\}\s*from\s*"@\/components\/attribution-boot"/);
        expect(layout).toContain("<AttributionBoot />");
    });

    it("chamadas repetidas na mesma página são idempotentes", () => {
        const jar = new Map<string, string>();
        montarBrowser({ url: "https://lavexpress.com/?gclid=IDEMPOTENTE", jar });

        const a = capturarAtribuicao();
        const b = capturarAtribuicao();
        const c = capturarAtribuicao();

        expect(b.ref).toBe(a.ref);
        expect(c.ref).toBe(a.ref);
        expect(c.gclid).toBe("IDEMPOTENTE");
        expect(c.first_seen_at).toBe(a.first_seen_at);
    });
});
