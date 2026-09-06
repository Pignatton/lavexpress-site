"use client";

/**
 * attribution-client.ts — a camada que toca o browser. [CONTRATO-ATRIB]
 *
 * Aqui vivem cookie, relógio, `location` e rede. Toda a REGRA de atribuição
 * está em `lib/attribution.ts` (puro); este arquivo só liga o mundo real àquela
 * regra e, principalmente, garante a REGRA DE OURO:
 *
 *   O WhatsApp abre SEMPRE. Nenhuma chamada de rede atrasa ou impede o wa.me.
 *
 * Por isso: nenhuma função é `async`, nenhuma devolve promise que o chamador
 * precise aguardar, e todo caminho de falha é engolido. Cookie bloqueado,
 * `localStorage` proibido, rede caída, endpoint fora do ar — o clique segue.
 */

import { LAVEXPRESS } from "@/lib/lavexpress";
import { appendLeadRef, buildWhatsAppLink } from "@/lib/whatsapp";
import {
    LIMITES,
    desserializarCookie,
    gerarLeadRef,
    lerParametrosDaUrl,
    limparTexto,
    limparUrl,
    mesclarAtribuicao,
    serializarCookie,
    type Atribuicao,
} from "@/lib/attribution";

export const COOKIE_NOME = "lx_attr";

/** 90 dias — alinhado à janela de clique do `gclid` no Google Ads. */
export const COOKIE_MAX_AGE = 7776000;

/** Teto duro do fallback de rede. Depois disso a requisição é abortada. */
export const TIMEOUT_INGEST_MS = 600;

const TENANT_SLUG = "lavexpress";

/* -------------------------------------------------------------------------- */
/* Cookie                                                                      */
/* -------------------------------------------------------------------------- */

function lerCookie(nome: string): string | null {
    try {
        if (typeof document === "undefined" || typeof document.cookie !== "string") {
            return null;
        }
        const alvo = `${nome}=`;
        for (const parte of document.cookie.split(";")) {
            const p = parte.trim();
            if (p.startsWith(alvo)) return p.slice(alvo.length);
        }
        return null;
    } catch {
        return null;
    }
}

function gravarCookie(nome: string, valor: string): void {
    try {
        if (typeof document === "undefined") return;
        // `Secure` só em https: em http o browser descarta o cookie inteiro,
        // e perder a atribuição em preview local seria pior que não marcá-la.
        const seguro =
            typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : "";
        document.cookie = `${nome}=${valor}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax${seguro}`;
    } catch {
        // Cookies desabilitados. A atribuição desta sessão vive só em memória.
    }
}

/* -------------------------------------------------------------------------- */
/* Captura                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Lê o cookie `lx_attr`, mescla com a URL atual, regrava e devolve o resultado.
 *
 * Idempotente dentro da mesma visita: chamar duas vezes não gera dois `ref`,
 * porque a segunda leitura já encontra o cookie da primeira. Sem cookie
 * disponível, devolve um objeto em memória — o `Ref:` da mensagem continua
 * funcionando, só não sobrevive ao recarregar a página.
 */
export function capturarAtribuicao(): Atribuicao {
    const agoraISO = new Date().toISOString();

    const existente = desserializarCookie(lerCookie(COOKIE_NOME));

    const nova: Partial<Atribuicao> = {};
    try {
        if (typeof window !== "undefined" && typeof window.location !== "undefined") {
            Object.assign(nova, lerParametrosDaUrl(window.location.search));

            const landing = limparUrl(window.location.href, LIMITES.url);
            if (landing !== null) nova.landing_url = landing;
        }
        if (typeof document !== "undefined") {
            const origem = limparUrl(document.referrer, LIMITES.referrer);
            if (origem !== null) nova.referrer = origem;
        }
    } catch {
        // URL exótica ou ambiente sem `location`: segue com o que já coletou.
    }

    const atribuicao = mesclarAtribuicao(existente, nova, agoraISO, gerarLeadRef());
    gravarCookie(COOKIE_NOME, serializarCookie(atribuicao));
    return atribuicao;
}

/* -------------------------------------------------------------------------- */
/* Ingestão                                                                    */
/* -------------------------------------------------------------------------- */

export type ExtrasIngest = {
    bairro?: string | null;
    cep?: string | null;
    serviceInterest?: string | null;
};

/** Ambiente de desenvolvimento não deve contaminar o funil de produção. */
function ehTeste(): boolean {
    try {
        if (typeof location === "undefined") return false;
        const h = location.hostname;
        return (
            h === "localhost" ||
            h === "127.0.0.1" ||
            h === "[::1]" ||
            h === "::1" ||
            h.endsWith(".local")
        );
    } catch {
        return false;
    }
}

/**
 * Dispara o evento de clique para o endpoint de ingestão. FIRE-AND-FORGET.
 *
 * Devolve `void` de propósito: se devolvesse promise, alguém acabaria colocando
 * um `await` no caminho do clique e quebraria a regra de ouro.
 *
 * Sem `NEXT_PUBLIC_LEAD_INGEST_URL` configurada, NÃO faz chamada nenhuma — nem
 * um preflight. Cookie e `Ref:` na mensagem seguem funcionando; o site apenas
 * não sabe para onde reportar ainda.
 */
export function enviarIngest(a: Atribuicao, extras: ExtrasIngest = {}): void {
    try {
        // Escrito literalmente para o Next conseguir substituir em build time.
        const bruta = process.env.NEXT_PUBLIC_LEAD_INGEST_URL;
        if (typeof bruta !== "string") return;
        const url = bruta.trim();
        if (url.length === 0) return;

        const corpo = JSON.stringify({
            lead_ref: a.ref,
            tenant_slug: TENANT_SLUG,
            gclid: a.gclid,
            gbraid: a.gbraid,
            wbraid: a.wbraid,
            utm_source: a.utm_source,
            utm_medium: a.utm_medium,
            utm_campaign: a.utm_campaign,
            utm_content: a.utm_content,
            utm_term: a.utm_term,
            landing_url: a.landing_url,
            referrer: a.referrer,
            bairro: limparTexto(extras.bairro, LIMITES.bairro),
            cep: limparTexto(extras.cep, LIMITES.cep),
            service_interest: limparTexto(extras.serviceInterest, LIMITES.servico),
            first_touch_at: a.first_seen_at,
            last_touch_at: a.last_seen_at,
            is_test: ehTeste(),
        });

        // Preferência: `sendBeacon`. É o único transporte que o browser promete
        // entregar mesmo com a aba saindo de cena — que é exatamente o que
        // acontece um instante depois, quando o wa.me abre.
        const nav = typeof navigator !== "undefined" ? navigator : undefined;
        if (nav && typeof nav.sendBeacon === "function") {
            const blob = new Blob([corpo], { type: "application/json" });
            if (nav.sendBeacon(url, blob)) return;
            // `false` = fila cheia ou payload recusado; cai no fetch abaixo.
        }

        if (typeof fetch !== "function") return;

        const controle = typeof AbortController === "function" ? new AbortController() : null;
        if (controle) {
            setTimeout(() => {
                try {
                    controle.abort();
                } catch {
                    /* já finalizada */
                }
            }, TIMEOUT_INGEST_MS);
        }

        // `void` + `.catch` vazio: a resposta é ignorada por contrato, e uma
        // promise rejeitada sem handler viraria "unhandled rejection" no console.
        void fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: corpo,
            keepalive: true,
            credentials: "omit",
            signal: controle ? controle.signal : undefined,
        }).catch(() => {
            /* rede é opcional aqui */
        });
    } catch {
        // NUNCA lança. Telemetria não derruba conversão.
    }
}

/* -------------------------------------------------------------------------- */
/* Ponte com o WhatsApp                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Monta o link do wa.me já com o `Ref:` e dispara a ingestão de passagem.
 *
 * Caminho único usado tanto pelo `<WhatsAppLink>` quanto pelos handlers
 * imperativos. Síncrona de ponta a ponta. Se qualquer etapa falhar, devolve o
 * link com a mensagem ORIGINAL — perde-se o rastreio, nunca o lead.
 */
export function linkWhatsAppComAtribuicao(params: {
    text: string;
    phoneE164?: string;
    extras?: ExtrasIngest;
}): string {
    const phoneE164 = params.phoneE164 ?? LAVEXPRESS.whatsappE164;
    try {
        const atribuicao = capturarAtribuicao();
        enviarIngest(atribuicao, params.extras ?? {});
        return buildWhatsAppLink({
            phoneE164,
            text: appendLeadRef(params.text, atribuicao.ref),
        });
    } catch {
        return buildWhatsAppLink({ phoneE164, text: params.text });
    }
}
