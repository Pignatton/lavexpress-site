/**
 * attribution.ts — atribuição de marketing que chega pela URL. [CONTRATO-ATRIB]
 *
 * Módulo FOLHA e PURO: sem React, sem I/O, sem `document`, sem `Date.now()`.
 * Todo estado do mundo (relógio, URL, cookie) entra por parâmetro. Isso deixa
 * cada regra testável isoladamente e impede que a lógica de atribuição dependa
 * de um browser existir.
 *
 * ⚠️ TUDO QUE VEM DA URL OU DO COOKIE É HOSTIL. Só lemos as chaves que
 * conhecemos e devolvemos objetos reconstruídos campo a campo: não é lista de
 * bloqueio (que envelhece mal) — é lista de permissão. Chave desconhecida no
 * cookie ou na query string simplesmente não tem caminho de leitura.
 *
 * REGRA DE OURO DO PROJETO: nada aqui pode atrasar ou impedir a abertura do
 * WhatsApp. Por isso nenhuma função assíncrona vive neste arquivo.
 */

/**
 * Crockford Base32 sem I, L, O e U — os quatro símbolos que humanos confundem
 * ao ditar um código por telefone. 32 símbolos exatos.
 */
export const ALFABETO_REF = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

/**
 * Regex canônica do `lead_ref`. FONTE ÚNICA DA VERDADE do formato que vai na
 * mensagem do WhatsApp. Sem flag `g`, portanto `test()` é stateless.
 */
export const REF_REGEX = /^LX-[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{6}$/;

/** Quantos símbolos do alfabeto compõem o sufixo. 32^6 = 1.073.741.824. */
const TAMANHO_REF = 6;

/**
 * Limites de tamanho por campo. Atribuição não precisa de texto longo, e cortar
 * cedo evita que alguém use o cookie como área de despejo.
 */
export const LIMITES = {
    utm: 80,
    clickId: 120,
    url: 512,
    referrer: 512,
    bairro: 80,
    cep: 16,
    servico: 60,
} as const;

/** Formato do cookie `lx_attr`. `v` existe para permitir migração futura. */
export type Atribuicao = {
    v: 1;
    ref: string;
    gclid: string | null;
    gbraid: string | null;
    wbraid: string | null;
    utm_source: string | null;
    utm_medium: string | null;
    utm_campaign: string | null;
    utm_content: string | null;
    utm_term: string | null;
    landing_url: string | null;
    referrer: string | null;
    first_seen_at: string;
    last_seen_at: string;
};

/** As ÚNICAS chaves lidas da query string. Qualquer outra é ignorada. */
export const CHAVES_URL = [
    "gclid",
    "gbraid",
    "wbraid",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
] as const;

export type ChaveUrl = (typeof CHAVES_URL)[number];

const CLICK_IDS = ["gclid", "gbraid", "wbraid"] as const;

/* -------------------------------------------------------------------------- */
/* Geração do lead_ref                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Maior múltiplo de `ALFABETO_REF.length` que cabe em um byte.
 *
 * Bytes a partir daqui são DESCARTADOS em vez de reduzidos com `%`, porque o
 * módulo faria os primeiros símbolos do alfabeto saírem mais vezes que os
 * últimos. Com 32 símbolos o valor é 256 e nenhum byte é rejeitado — mas a
 * conta continua correta se o alfabeto mudar, e é isso que a torna segura.
 */
const LIMITE_UNIFORME = 256 - (256 % ALFABETO_REF.length);

function bytesAleatorios(quantidade: number): Uint8Array {
    const c = globalThis.crypto;
    if (!c || typeof c.getRandomValues !== "function") {
        // Sem CSPRNG não existe identificador aceitável. `Math.random` está
        // proibido pelo contrato, então falhamos alto e o chamador degrada
        // para "abrir o WhatsApp sem Ref:".
        throw new Error("crypto.getRandomValues indisponível");
    }
    return c.getRandomValues(new Uint8Array(quantidade));
}

/**
 * Gera um `lead_ref` no formato `LX-XXXXXX`, uniformemente distribuído.
 *
 * Sem PII, sem sequência, sem relógio: dois leads do mesmo segundo não colidem
 * mais do que dois leads de meses diferentes.
 */
export function gerarLeadRef(): string {
    let sufixo = "";
    while (sufixo.length < TAMANHO_REF) {
        // Pede sempre o que falta; a rejeição raramente cobra uma segunda volta.
        const bytes = bytesAleatorios(TAMANHO_REF - sufixo.length);
        for (const b of bytes) {
            if (b >= LIMITE_UNIFORME) continue; // viés de módulo: descarta
            sufixo += ALFABETO_REF[b % ALFABETO_REF.length];
            if (sufixo.length === TAMANHO_REF) break;
        }
    }
    return `LX-${sufixo}`;
}

/* -------------------------------------------------------------------------- */
/* Sanitização                                                                 */
/* -------------------------------------------------------------------------- */

/** Aceita string ou o primeiro item quando a origem entrega array. */
function primeiro(v: unknown): string | null {
    if (typeof v === "string") return v;
    if (Array.isArray(v) && typeof v[0] === "string") return v[0];
    return null;
}

/**
 * Normaliza um texto livre de marketing (UTM, click id, bairro, CEP, serviço).
 *
 * Mantém apenas caracteres que aparecem em valores reais. Isso derruba de uma
 * vez tentativa de HTML, aspas, quebra de linha, caractere de controle e
 * separador de JSON — sem precisar prever cada ataque, um por um.
 */
export function limparTexto(bruto: unknown, max: number): string | null {
    const s = primeiro(bruto);
    if (s === null) return null;
    const limpo = s
        .normalize("NFKC")
        .replace(/[^\p{L}\p{N}._\-/= ]/gu, "")
        .trim()
        .slice(0, max);
    return limpo.length > 0 ? limpo : null;
}

/**
 * Sanitiza uma URL absoluta (`landing_url`, `referrer`).
 *
 * A allowlist de caracteres de `limparTexto` não serve aqui: ela come `:`, `?`
 * e `&`, e transformaria `https://site/x?y=1` em algo que não é mais URL. Em
 * vez de afrouxar a allowlist caractere a caractere, validamos a estrutura —
 * o parser da própria plataforma decide o que é URL. Só `http`/`https` passam,
 * o que descarta `javascript:` e `data:` sem precisar citá-los.
 */
export function limparUrl(bruto: unknown, max: number): string | null {
    const s = primeiro(bruto);
    if (s === null) return null;
    const cru = s.trim();
    if (cru.length === 0) return null;
    let u: URL;
    try {
        u = new URL(cru);
    } catch {
        return null;
    }
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    const texto = u.toString().slice(0, max);
    return texto.length > 0 ? texto : null;
}

/* -------------------------------------------------------------------------- */
/* Leitura da URL                                                              */
/* -------------------------------------------------------------------------- */

function limiteDaChave(chave: ChaveUrl): number {
    return (CLICK_IDS as readonly string[]).includes(chave)
        ? LIMITES.clickId
        : LIMITES.utm;
}

/**
 * Converte a query string em atribuição parcial.
 *
 * Devolve APENAS as chaves realmente presentes e não vazias após a limpeza.
 * A ausência de uma chave é informação: é ela que distingue "esta visita não
 * trouxe click id" de "esta visita trouxe click id vazio".
 */
export function lerParametrosDaUrl(search: string): Partial<Atribuicao> {
    const saida: Partial<Record<ChaveUrl, string>> = {};
    if (typeof search !== "string") return saida;

    const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    for (const chave of CHAVES_URL) {
        const valor = limparTexto(params.get(chave), limiteDaChave(chave));
        if (valor !== null) saida[chave] = valor;
    }
    return saida;
}

/** Há identificador de clique do Google neste conjunto de campos? */
export function temClickId(a: Partial<Atribuicao> | null | undefined): boolean {
    if (!a) return false;
    return CLICK_IDS.some((k) => typeof a[k] === "string" && a[k]!.length > 0);
}

/* -------------------------------------------------------------------------- */
/* First touch × Last touch                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Mescla a visita atual com o que o cookie já sabia.
 *
 * REGRA (normativa): `ref`, click id, UTM, `landing_url`, `referrer` e
 * `first_seen_at` são FIRST TOUCH — gravados na primeira visita e nunca
 * sobrescritos. `last_seen_at` sempre atualiza.
 *
 * EXCEÇÃO ÚNICA — promoção: se o cookie ainda não tem NENHUM click id e chega
 * uma visita COM click id, o click id e as UTM daquela visita entram no lugar.
 * Um identificador Google válido jamais é substituído por outro.
 *
 * Decisão registrada: na promoção as cinco UTM são substituídas EM BLOCO pelas
 * da visita que promoveu, inclusive quando vêm vazias. Manter UTM antigas ao
 * lado de um `gclid` novo produziria um relatório mentiroso (`gclid` do Ads com
 * `utm_source=instagram`); o click id é a atribuição autoritativa a partir daí.
 * `landing_url`, `referrer` e `first_seen_at` continuam sendo os do first touch,
 * porque o contrato só promove click id e UTM.
 */
export function mesclarAtribuicao(
    existente: Atribuicao | null,
    nova: Partial<Atribuicao>,
    agoraISO: string,
    refNovo: string,
): Atribuicao {
    if (!existente) {
        return {
            v: 1,
            ref: refNovo,
            gclid: nova.gclid ?? null,
            gbraid: nova.gbraid ?? null,
            wbraid: nova.wbraid ?? null,
            utm_source: nova.utm_source ?? null,
            utm_medium: nova.utm_medium ?? null,
            utm_campaign: nova.utm_campaign ?? null,
            utm_content: nova.utm_content ?? null,
            utm_term: nova.utm_term ?? null,
            landing_url: nova.landing_url ?? null,
            referrer: nova.referrer ?? null,
            first_seen_at: agoraISO,
            last_seen_at: agoraISO,
        };
    }

    const promover = !temClickId(existente) && temClickId(nova);
    if (!promover) {
        // Caminho comum: visita repetida. Só o carimbo de recência muda.
        return { ...existente, last_seen_at: agoraISO };
    }

    return {
        ...existente,
        gclid: nova.gclid ?? null,
        gbraid: nova.gbraid ?? null,
        wbraid: nova.wbraid ?? null,
        utm_source: nova.utm_source ?? null,
        utm_medium: nova.utm_medium ?? null,
        utm_campaign: nova.utm_campaign ?? null,
        utm_content: nova.utm_content ?? null,
        utm_term: nova.utm_term ?? null,
        last_seen_at: agoraISO,
    };
}

/* -------------------------------------------------------------------------- */
/* Cookie                                                                      */
/* -------------------------------------------------------------------------- */

export function serializarCookie(a: Atribuicao): string {
    return encodeURIComponent(JSON.stringify(a));
}

function textoOuNulo(v: unknown, max: number): string | null {
    return typeof v === "string" ? limparTexto(v, max) : null;
}

function urlOuNulo(v: unknown, max: number): string | null {
    return typeof v === "string" ? limparUrl(v, max) : null;
}

/** Um carimbo de tempo só serve se o relógio conseguir lê-lo de volta. */
function instanteValido(v: unknown): string | null {
    if (typeof v !== "string" || v.length === 0 || v.length > 40) return null;
    const t = Date.parse(v);
    return Number.isFinite(t) ? v : null;
}

/**
 * Lê o cookie de volta para um objeto — ou `null`.
 *
 * FALHA FECHADA e SILENCIOSA: JSON quebrado, versão desconhecida, `ref` fora do
 * formato ou data ilegível devolvem `null`, e o chamador recomeça limpo. Nunca
 * lança: uma exceção aqui interromperia o clique, e o contrato manda o WhatsApp
 * abrir sempre. O objeto é reconstruído campo a campo, então chave injetada no
 * cookie não sobrevive à leitura.
 */
export function desserializarCookie(bruto: string | null | undefined): Atribuicao | null {
    try {
        if (typeof bruto !== "string" || bruto.length === 0) return null;

        let json = bruto;
        try {
            json = decodeURIComponent(bruto);
        } catch {
            // Cookie gravado sem percent-encoding: tenta o texto como veio.
        }

        const cru: unknown = JSON.parse(json);
        if (cru === null || typeof cru !== "object" || Array.isArray(cru)) return null;
        const o = cru as Record<string, unknown>;

        if (o.v !== 1) return null;

        const ref = typeof o.ref === "string" ? o.ref : "";
        if (!REF_REGEX.test(ref)) return null;

        const first = instanteValido(o.first_seen_at);
        const last = instanteValido(o.last_seen_at);
        if (first === null || last === null) return null;

        return {
            v: 1,
            ref,
            gclid: textoOuNulo(o.gclid, LIMITES.clickId),
            gbraid: textoOuNulo(o.gbraid, LIMITES.clickId),
            wbraid: textoOuNulo(o.wbraid, LIMITES.clickId),
            utm_source: textoOuNulo(o.utm_source, LIMITES.utm),
            utm_medium: textoOuNulo(o.utm_medium, LIMITES.utm),
            utm_campaign: textoOuNulo(o.utm_campaign, LIMITES.utm),
            utm_content: textoOuNulo(o.utm_content, LIMITES.utm),
            utm_term: textoOuNulo(o.utm_term, LIMITES.utm),
            landing_url: urlOuNulo(o.landing_url, LIMITES.url),
            referrer: urlOuNulo(o.referrer, LIMITES.referrer),
            first_seen_at: first,
            last_seen_at: last,
        };
    } catch {
        return null;
    }
}
