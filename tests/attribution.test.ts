import { describe, expect, it } from "vitest";

import {
    ALFABETO_REF,
    LIMITES,
    REF_REGEX,
    desserializarCookie,
    gerarLeadRef,
    lerParametrosDaUrl,
    limparTexto,
    limparUrl,
    mesclarAtribuicao,
    serializarCookie,
    temClickId,
    type Atribuicao,
} from "@/lib/attribution";
import { LAVEXPRESS } from "@/lib/lavexpress";
import { appendLeadRef, buildAgendamentoMessage, buildWhatsAppLink } from "@/lib/whatsapp";

const T0 = "2026-09-06T12:00:00.000Z";
const T1 = "2026-09-20T09:30:00.000Z";
const REF_FIXO = "LX-A7K3Q9";

function base(parcial: Partial<Atribuicao> = {}): Atribuicao {
    return {
        v: 1,
        ref: REF_FIXO,
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
        first_seen_at: T0,
        last_seen_at: T0,
        click_id_at: null,
        ...parcial,
    };
}

/* ========================================================================== */

describe("gerarLeadRef", () => {
    it("respeita o formato canônico LX-XXXXXX", () => {
        for (let i = 0; i < 200; i++) {
            const ref = gerarLeadRef();
            expect(ref).toMatch(REF_REGEX);
            expect(ref.startsWith("LX-")).toBe(true);
            expect(ref).toHaveLength(9);
        }
    });

    it("usa exclusivamente o alfabeto Crockford sem I, L, O e U", () => {
        expect(ALFABETO_REF).toBe("0123456789ABCDEFGHJKMNPQRSTVWXYZ");
        expect(ALFABETO_REF).toHaveLength(32);
        for (const proibido of ["I", "L", "O", "U"]) {
            expect(ALFABETO_REF.includes(proibido)).toBe(false);
        }

        const simbolos = new Set<string>();
        for (let i = 0; i < 2000; i++) {
            for (const c of gerarLeadRef().slice(3)) {
                expect(ALFABETO_REF.includes(c)).toBe(true);
                simbolos.add(c);
            }
        }
        // 12.000 símbolos sorteados: se algum do alfabeto ficasse inalcançável
        // (viés de módulo, off-by-one no índice), ele faltaria aqui.
        expect(simbolos.size).toBe(32);
    });

    it("nunca produz I, L, O ou U", () => {
        for (let i = 0; i < 5000; i++) {
            expect(gerarLeadRef().slice(3)).not.toMatch(/[ILOU]/);
        }
    });

    it("mantém unicidade em 10.000 gerações", () => {
        const vistos = new Set<string>();
        for (let i = 0; i < 10_000; i++) vistos.add(gerarLeadRef());

        // Espaço amostral = 32^6 = 1.073.741.824. Pelo paradoxo do aniversário,
        // 10.000 sorteios esperam ~0,047 colisão — ou seja, ~4,7% das execuções
        // teriam UMA colisão legítima. Exigir 10.000 exatos seria um teste
        // instável, então o limite é 5 colisões: a chance disso acontecer com um
        // gerador correto é da ordem de 1e-14, e qualquer defeito real de
        // entropia (relógio, contador, alfabeto truncado) estoura o limite com
        // folga.
        expect(vistos.size).toBeGreaterThanOrEqual(9_995);
    });
});

/* ========================================================================== */

describe("limparTexto", () => {
    it("desmonta tentativa de HTML", () => {
        const sujo = '<script>alert("xss")</script>';
        const limpo = limparTexto(sujo, LIMITES.utm);
        expect(limpo).not.toBeNull();
        expect(limpo).not.toContain("<");
        expect(limpo).not.toContain(">");
        expect(limpo).not.toContain('"');
        expect(limpo).toBe("scriptalertxss/script");
    });

    it("remove quebra de linha e retorno de carro", () => {
        expect(limparTexto("google\nads\r\ncpc", LIMITES.utm)).toBe("googleadscpc");
    });

    it("remove caracteres de controle", () => {
        expect(limparTexto("cpc\u0000\u0007\u001B[31m", LIMITES.utm)).toBe("cpc31m");
    });

    it("remove separadores de JSON e aspas", () => {
        const limpo = limparTexto('a{"b":1,"c":[2]}', LIMITES.utm);
        for (const c of ["{", "}", '"', ":", ",", "[", "]"]) {
            expect(limpo).not.toContain(c);
        }
    });

    it("corta string gigante no limite pedido", () => {
        expect(limparTexto("A".repeat(10_000), LIMITES.utm)).toHaveLength(LIMITES.utm);
        expect(limparTexto("B".repeat(10_000), LIMITES.clickId)).toHaveLength(LIMITES.clickId);
        expect(limparTexto("C".repeat(10_000), LIMITES.cep)).toHaveLength(LIMITES.cep);
    });

    it("normaliza para NFKC antes de filtrar", () => {
        // Fullwidth: sem NFKC, `ｇｃｌｉｄ` passaria como texto diferente de `gclid`.
        expect(limparTexto("ｇｃｌｉｄ", LIMITES.utm)).toBe("gclid");
    });

    it("preserva valores legítimos de UTM e click id", () => {
        expect(limparTexto("google", LIMITES.utm)).toBe("google");
        expect(limparTexto("black-friday_2026", LIMITES.utm)).toBe("black-friday_2026");
        expect(limparTexto("Cj0KCQjw-_a1BhC=", LIMITES.clickId)).toBe("Cj0KCQjw-_a1BhC=");
    });

    it("vira null quando sobra vazio ou o tipo é outro", () => {
        expect(limparTexto("", LIMITES.utm)).toBeNull();
        expect(limparTexto("   ", LIMITES.utm)).toBeNull();
        expect(limparTexto("<<<>>>", LIMITES.utm)).toBeNull();
        expect(limparTexto(null, LIMITES.utm)).toBeNull();
        expect(limparTexto(undefined, LIMITES.utm)).toBeNull();
        expect(limparTexto(42, LIMITES.utm)).toBeNull();
        expect(limparTexto({ toString: () => "x" }, LIMITES.utm)).toBeNull();
    });
});

describe("limparUrl", () => {
    it("preserva a estrutura de uma URL http(s)", () => {
        expect(limparUrl("https://lavexpress.com/pacotes?gclid=abc", LIMITES.url)).toBe(
            "https://lavexpress.com/pacotes?gclid=abc",
        );
    });

    it("recusa protocolo executável e lixo", () => {
        expect(limparUrl("javascript:alert(1)", LIMITES.url)).toBeNull();
        expect(limparUrl("data:text/html,<script>", LIMITES.url)).toBeNull();
        expect(limparUrl("nao é url", LIMITES.url)).toBeNull();
        expect(limparUrl("", LIMITES.url)).toBeNull();
        expect(limparUrl(null, LIMITES.url)).toBeNull();
    });

    it("corta no limite", () => {
        const gigante = `https://lavexpress.com/?q=${"z".repeat(2000)}`;
        expect(limparUrl(gigante, LIMITES.url)).toHaveLength(LIMITES.url);
    });
});

/* ========================================================================== */

describe("lerParametrosDaUrl", () => {
    it("captura visita com gclid", () => {
        const p = lerParametrosDaUrl("?gclid=Cj0KCQ123&utm_source=google&utm_medium=cpc");
        expect(p.gclid).toBe("Cj0KCQ123");
        expect(p.gbraid).toBeUndefined();
        expect(p.wbraid).toBeUndefined();
        expect(p.utm_source).toBe("google");
        expect(p.utm_medium).toBe("cpc");
        expect(temClickId(p)).toBe(true);
    });

    it("captura visita com gbraid", () => {
        const p = lerParametrosDaUrl("?gbraid=0AAAAA_bR123&utm_campaign=pmax-lavanderia");
        expect(p.gbraid).toBe("0AAAAA_bR123");
        expect(p.gclid).toBeUndefined();
        expect(p.utm_campaign).toBe("pmax-lavanderia");
        expect(temClickId(p)).toBe(true);
    });

    it("captura visita com wbraid", () => {
        const p = lerParametrosDaUrl("?wbraid=Cj8KCQ_wb987");
        expect(p.wbraid).toBe("Cj8KCQ_wb987");
        expect(p.gclid).toBeUndefined();
        expect(temClickId(p)).toBe(true);
    });

    it("captura visita orgânica (sem parâmetros na URL)", () => {
        const p = lerParametrosDaUrl("");
        expect(p).toEqual({});
        expect(temClickId(p)).toBe(false);
    });

    it("captura visita direta (query irrelevante)", () => {
        const p = lerParametrosDaUrl("?fbclid=xyz&ref=amigo&pagina=2");
        expect(p).toEqual({});
        expect(temClickId(p)).toBe(false);
    });

    it("captura visita só com UTM", () => {
        const p = lerParametrosDaUrl(
            "?utm_source=instagram&utm_medium=social&utm_campaign=stories&utm_content=card2&utm_term=lavanderia",
        );
        expect(p).toEqual({
            utm_source: "instagram",
            utm_medium: "social",
            utm_campaign: "stories",
            utm_content: "card2",
            utm_term: "lavanderia",
        });
        expect(temClickId(p)).toBe(false);
    });

    it("ignora qualquer chave fora da allowlist", () => {
        const p = lerParametrosDaUrl(
            "?gclid=ok&tenant_id=999&role=admin&amount_cents=1&preco=0&ref=LX-HACKED&v=9",
        );
        expect(Object.keys(p)).toEqual(["gclid"]);
    });

    it("sanitiza e trunca os valores lidos", () => {
        const p = lerParametrosDaUrl(
            `?utm_source=${encodeURIComponent('<b>goo gle</b>')}&gclid=${"x".repeat(500)}`,
        );
        expect(p.utm_source).toBe("bgoo gle/b");
        expect(p.gclid).toHaveLength(LIMITES.clickId);
    });

    it("aceita a query com ou sem a interrogação inicial", () => {
        expect(lerParametrosDaUrl("gclid=abc")).toEqual({ gclid: "abc" });
        expect(lerParametrosDaUrl("?gclid=abc")).toEqual({ gclid: "abc" });
    });
});

/* ========================================================================== */

describe("mesclarAtribuicao", () => {
    it("primeira visita grava tudo e carimba os dois instantes", () => {
        const a = mesclarAtribuicao(
            null,
            {
                gclid: "abc123",
                utm_source: "google",
                landing_url: "https://lavexpress.com/?gclid=abc123",
                referrer: "https://www.google.com/",
            },
            T0,
            REF_FIXO,
        );

        expect(a.v).toBe(1);
        expect(a.ref).toBe(REF_FIXO);
        expect(a.gclid).toBe("abc123");
        expect(a.gbraid).toBeNull();
        expect(a.utm_source).toBe("google");
        expect(a.utm_term).toBeNull();
        expect(a.first_seen_at).toBe(T0);
        expect(a.last_seen_at).toBe(T0);
    });

    it("preserva o first touch na segunda visita", () => {
        const primeira = base({
            gclid: "primeiro-clique",
            utm_source: "google",
            utm_medium: "cpc",
            landing_url: "https://lavexpress.com/pacotes",
            referrer: "https://www.google.com/",
        });

        const segunda = mesclarAtribuicao(
            primeira,
            {
                utm_source: "instagram",
                utm_medium: "social",
                landing_url: "https://lavexpress.com/contato",
                referrer: "https://l.instagram.com/",
            },
            T1,
            "LX-NOVO99",
        );

        expect(segunda.ref).toBe(REF_FIXO);
        expect(segunda.gclid).toBe("primeiro-clique");
        expect(segunda.utm_source).toBe("google");
        expect(segunda.utm_medium).toBe("cpc");
        expect(segunda.landing_url).toBe("https://lavexpress.com/pacotes");
        expect(segunda.referrer).toBe("https://www.google.com/");
        expect(segunda.first_seen_at).toBe(T0);
        // Única coisa que muda numa visita repetida.
        expect(segunda.last_seen_at).toBe(T1);
    });

    it("promove o click id quando o cookie ainda não tinha nenhum", () => {
        const organica = base({ utm_source: "instagram", utm_medium: "social" });
        expect(temClickId(organica)).toBe(false);

        const promovida = mesclarAtribuicao(
            organica,
            { gclid: "clique-pago", utm_source: "google", utm_medium: "cpc" },
            T1,
            "LX-NOVO99",
        );

        expect(promovida.gclid).toBe("clique-pago");
        expect(promovida.utm_source).toBe("google");
        expect(promovida.utm_medium).toBe("cpc");
        // O identificador do lead e a origem do first touch não se mexem.
        expect(promovida.ref).toBe(REF_FIXO);
        expect(promovida.first_seen_at).toBe(T0);
        expect(promovida.last_seen_at).toBe(T1);
    });

    it("promove gbraid e wbraid pela mesma regra", () => {
        const comGbraid = mesclarAtribuicao(base(), { gbraid: "gb-1" }, T1, "LX-NOVO99");
        expect(comGbraid.gbraid).toBe("gb-1");

        const comWbraid = mesclarAtribuicao(base(), { wbraid: "wb-1" }, T1, "LX-NOVO99");
        expect(comWbraid.wbraid).toBe("wb-1");
    });

    it("NÃO sobrescreve um click id que já existe", () => {
        const comGclid = base({ gclid: "gclid-original", utm_source: "google" });

        const depois = mesclarAtribuicao(
            comGclid,
            { gclid: "gclid-novo", gbraid: "gbraid-novo", utm_source: "bing" },
            T1,
            "LX-NOVO99",
        );

        expect(depois.gclid).toBe("gclid-original");
        expect(depois.gbraid).toBeNull();
        expect(depois.utm_source).toBe("google");
        expect(depois.last_seen_at).toBe(T1);
    });

    it("um identificador Google nunca é trocado por outro tipo", () => {
        const comGbraid = base({ gbraid: "gbraid-original" });
        const depois = mesclarAtribuicao(comGbraid, { gclid: "gclid-novo" }, T1, "LX-NOVO99");

        expect(depois.gbraid).toBe("gbraid-original");
        expect(depois.gclid).toBeNull();
    });

    it("visita repetida sem click id só atualiza a recência", () => {
        const antes = base({ utm_source: "instagram" });
        const depois = mesclarAtribuicao(antes, { utm_source: "facebook" }, T1, "LX-NOVO99");

        expect(depois).toEqual({ ...antes, last_seen_at: T1 });
    });
});

/* ========================================================================== */

describe("cookie", () => {
    it("faz ida e volta sem perder campo", () => {
        const a = base({
            gclid: "abc",
            utm_source: "google",
            landing_url: "https://lavexpress.com/?gclid=abc",
            referrer: "https://www.google.com/",
        });
        expect(desserializarCookie(serializarCookie(a))).toEqual(a);
    });

    it("não lança e recomeça limpo com cookie corrompido", () => {
        const lixos = [
            "{{{",
            "não é json",
            encodeURIComponent("{"),
            "%E0%A4%A", // percent-encoding inválido: decodeURIComponent lançaria
            encodeURIComponent(JSON.stringify([1, 2, 3])),
            encodeURIComponent(JSON.stringify("apenas uma string")),
            encodeURIComponent(JSON.stringify(null)),
            encodeURIComponent(JSON.stringify({ v: 1 })),
            encodeURIComponent(JSON.stringify({ ...base(), v: 2 })),
            encodeURIComponent(JSON.stringify({ ...base(), ref: "LX-ILOU99" })),
            encodeURIComponent(JSON.stringify({ ...base(), ref: "hacked" })),
            encodeURIComponent(JSON.stringify({ ...base(), ref: 42 })),
            encodeURIComponent(JSON.stringify({ ...base(), first_seen_at: "ontem" })),
            encodeURIComponent(JSON.stringify({ ...base(), last_seen_at: "" })),
            "",
            null,
            undefined,
        ];

        for (const lixo of lixos) {
            expect(() => desserializarCookie(lixo)).not.toThrow();
            expect(desserializarCookie(lixo)).toBeNull();
        }

        // "Recomeça limpo": a mescla com `null` gera uma atribuição nova e válida.
        const nova = mesclarAtribuicao(desserializarCookie("{{{"), {}, T1, REF_FIXO);
        expect(nova.ref).toBe(REF_FIXO);
        expect(nova.first_seen_at).toBe(T1);
    });

    it("descarta chave injetada e sanitiza o que sobrou", () => {
        const adulterado = encodeURIComponent(
            JSON.stringify({
                ...base(),
                utm_source: '<img src=x onerror="alert(1)">',
                landing_url: "javascript:alert(1)",
                is_admin: true,
                tenant_id: "outro",
            }),
        );

        const lido = desserializarCookie(adulterado);
        expect(lido).not.toBeNull();
        expect(lido!.utm_source).not.toContain("<");
        expect(lido!.landing_url).toBeNull();
        expect(Object.keys(lido!)).not.toContain("is_admin");
        expect(Object.keys(lido!)).not.toContain("tenant_id");
    });
});

/* ========================================================================== */

describe("appendLeadRef", () => {
    const COPY =
        "Olá! Quero agendar coleta na Lavexpress.\nRegião/CEP: Jardim Camburi\nServiço: Quero recomendação do melhor pacote (custo-benefício).";

    it("não destrói a copy original", () => {
        const saida = appendLeadRef(COPY, REF_FIXO);
        expect(saida.startsWith(COPY)).toBe(true);
        expect(saida).toContain("custo-benefício");
        expect(saida).toContain("Jardim Camburi");
    });

    it("acrescenta no fim, separado por linha em branco", () => {
        expect(appendLeadRef(COPY, REF_FIXO)).toBe(`${COPY}\n\nRef: ${REF_FIXO}`);
        expect(appendLeadRef(COPY, REF_FIXO).endsWith(`Ref: ${REF_FIXO}`)).toBe(true);
    });

    it("é reentrante: não empilha duas linhas de referência", () => {
        const uma = appendLeadRef(COPY, REF_FIXO);
        const duas = appendLeadRef(uma, REF_FIXO);
        expect(duas).toBe(uma);
        expect(duas.match(/Ref:/g)).toHaveLength(1);
    });

    it("devolve o texto intacto quando o ref é inválido", () => {
        for (const ruim of ["", "LX-ILOU99", "lx-a7k3q9", "LX-A7K3Q", "hacked", "LX-A7K3Q99"]) {
            expect(appendLeadRef(COPY, ruim)).toBe(COPY);
        }
    });

    it("aguenta texto vazio", () => {
        expect(appendLeadRef("", REF_FIXO)).toBe(`Ref: ${REF_FIXO}`);
    });
});

/** O `text` sai como form-encoding (espaço vira `+`), então decodifica-se assim. */
function textoDoLink(link: string): string {
    return new URLSearchParams(link.slice(link.indexOf("?") + 1)).get("text") ?? "";
}

describe("link do WhatsApp", () => {
    it("carrega o lead_ref e nada mais de atribuição", () => {
        const mensagem = appendLeadRef("Olá! Quero agendar.", REF_FIXO);
        const link = buildWhatsAppLink({ phoneE164: "5527996172403", text: mensagem });

        expect(link.startsWith("https://wa.me/5527996172403?text=")).toBe(true);
        expect(textoDoLink(link)).toBe(mensagem);
        expect(textoDoLink(link)).toContain(`Ref: ${REF_FIXO}`);

        // Proibições do contrato: nenhum identificador do Google e nenhum
        // telefone dentro da MENSAGEM.
        for (const proibido of ["gclid", "gbraid", "wbraid"]) {
            expect(link.toLowerCase()).not.toContain(proibido);
        }
        expect(mensagem).not.toContain("5527996172403");
    });
});

/**
 * Guarda de regressão: 15 arquivos importam estas duas funções. A atribuição
 * entrou por cima delas, e nenhuma assinatura podia mudar no caminho.
 */
describe("assinaturas preexistentes de lib/whatsapp", () => {
    it("buildAgendamentoMessage aceita o objeto vazio", () => {
        const msg = buildAgendamentoMessage({});
        expect(msg.startsWith("Olá! ")).toBe(true);
        expect(msg).toContain("Quero agendar uma coleta.");
        expect(msg).toContain(LAVEXPRESS.pickupRules.fixedMorningDays.join(", "));
    });

    it("buildAgendamentoMessage monta nome, local e serviço", () => {
        const msg = buildAgendamentoMessage({
            nome: "Ana",
            enderecoOuBairro: "Jardim Camburi",
            tipoServico: "Passadoria",
        });
        expect(msg).toContain("Meu nome é Ana.");
        expect(msg).toContain("Meu bairro/CEP é Jardim Camburi.");
        expect(msg).toContain("Quero agendar: Passadoria.");
    });

    it("buildAgendamentoMessage cita o SLA da fonte de verdade", () => {
        const msg = buildAgendamentoMessage({});
        expect(msg).toContain(
            `${LAVEXPRESS.sla.washDryHoursMin}–${LAVEXPRESS.sla.washDryHoursMax}h`,
        );
        expect(msg).toContain(
            `${LAVEXPRESS.sla.washDryIronBusinessDaysMin}–${LAVEXPRESS.sla.washDryIronBusinessDaysMax} dias úteis`,
        );
    });

    it("buildWhatsAppLink continua devolvendo o wa.me com o text codificado", () => {
        const link = buildWhatsAppLink({ phoneE164: "5527996172403", text: "a b&c" });
        expect(link).toBe("https://wa.me/5527996172403?text=a+b%26c");
    });

    it("a mensagem de agendamento sobrevive ao carimbo do Ref", () => {
        const original = buildAgendamentoMessage({ tipoServico: "Lavar + Secar" });
        const carimbada = appendLeadRef(original, REF_FIXO);
        expect(carimbada.startsWith(original)).toBe(true);
        expect(carimbada.endsWith(`Ref: ${REF_FIXO}`)).toBe(true);
    });
});
