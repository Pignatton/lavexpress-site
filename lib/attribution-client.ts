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
    limparUrl,
    mesclarAtribuicao,
    serializarCookie,
    type Atribuicao,
} from "@/lib/attribution";

export const COOKIE_NOME = "lx_attr";

/** 90 dias — alinhado à janela de clique do `gclid` no Google Ads. */
export const COOKIE_MAX_AGE = 7776000;

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
/* Ponte com o WhatsApp                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Monta o link do wa.me já com o `Ref:`.
 *
 * Caminho único usado tanto pelo `<WhatsAppLink>` quanto pelos handlers
 * imperativos. Síncrona, local e sem rede: nada aqui sai do browser. Se
 * qualquer etapa falhar, devolve o link com a mensagem ORIGINAL — perde-se o
 * rastreio, nunca o lead.
 */
export function linkWhatsAppComAtribuicao(params: {
    text: string;
    phoneE164?: string;
}): string {
    const phoneE164 = params.phoneE164 ?? LAVEXPRESS.whatsappE164;
    try {
        const atribuicao = capturarAtribuicao();
        return buildWhatsAppLink({
            phoneE164,
            text: appendLeadRef(params.text, atribuicao.ref),
        });
    } catch {
        return buildWhatsAppLink({ phoneE164, text: params.text });
    }
}
