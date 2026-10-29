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

/**
 * Janela de atribuição, em segundos (90 dias).
 *
 * Não é um número escolhido por conveniência: é a *janela de conversão de
 * clique* da ação `Contato - WhatsApp` na conta 253-893-7535, conferida no
 * painel do Google Ads em 29/10/2026. As outras 13 ações da conta estão em 30
 * dias, que é o padrão do Google — esta foi elevada de propósito.
 *
 * Se a janela do painel mudar, este número muda junto. Guardar atribuição por
 * mais tempo que a janela do Ads produz conversa atribuída a um clique que o
 * próprio Google já não conta.
 */
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

function gravarCookie(nome: string, valor: string, maxAgeSegundos: number): void {
    try {
        if (typeof document === "undefined") return;
        // `Secure` só em https: em http o browser descarta o cookie inteiro,
        // e perder a atribuição em preview local seria pior que não marcá-la.
        const seguro =
            typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : "";
        const maxAge = Math.max(0, Math.floor(maxAgeSegundos));
        document.cookie = `${nome}=${valor}; Max-Age=${maxAge}; Path=/; SameSite=Lax${seguro}`;
    } catch {
        // Cookies desabilitados. A atribuição desta sessão vive só em memória.
    }
}

/**
 * Quanto ainda resta da janela de atribuição, em segundos.
 *
 * POR QUE ISSO EXISTE: antes, `gravarCookie` escrevia `Max-Age` cheio a cada
 * escrita, e `<AttributionBoot>` reescreve o cookie a CADA troca de rota. O
 * efeito era uma janela de 90 dias *rolante a partir da última visita* — para
 * visitante recorrente, ela nunca fechava. Isso contraria a janela do Google
 * Ads e mantém dado pessoal vivo sem prazo.
 *
 * A âncora é `click_id_at`, não `first_seen_at`: quem chega por busca orgânica
 * e volta semanas depois por um anúncio tem a janela começando no clique pago,
 * que é como o Google conta. Sem nenhum click id, cai para `first_seen_at` —
 * não há clique a ancorar, e limitar pelo primeiro contato é o bound
 * conservador.
 *
 * Relógio ilegível devolve a janela cheia (`fail-open`): perder atribuição é
 * ruim, derrubar o cookie de quem não deveria perdê-lo é pior.
 */
export function janelaRestante(a: Atribuicao, agoraMs: number): number {
    const ancora = Date.parse(a.click_id_at ?? a.first_seen_at);
    if (!Number.isFinite(ancora)) return COOKIE_MAX_AGE;

    const decorrido = Math.floor((agoraMs - ancora) / 1000);
    if (!Number.isFinite(decorrido)) return COOKIE_MAX_AGE;

    return Math.max(0, Math.min(COOKIE_MAX_AGE, COOKIE_MAX_AGE - decorrido));
}

/* -------------------------------------------------------------------------- */
/* Captura                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Lê o cookie `lx_attr`, mescla com a URL atual, regrava e devolve o resultado.
 *
 * O `Max-Age` da regravação é o que RESTA da janela (ver `janelaRestante`), não
 * a janela cheia — senão o cookie nunca expiraria para quem volta ao site.
 *
 * Idempotente dentro da mesma visita: chamar duas vezes não gera dois `ref`,
 * porque a segunda leitura já encontra o cookie da primeira. Sem cookie
 * disponível, devolve um objeto em memória — o `Ref:` da mensagem continua
 * funcionando, só não sobrevive ao recarregar a página.
 */
export function capturarAtribuicao(): Atribuicao {
    const agoraMs = Date.now();
    const agoraISO = new Date(agoraMs).toISOString();

    const guardado = desserializarCookie(lerCookie(COOKIE_NOME));

    // Janela vencida não é "visita repetida": é um período de atribuição novo.
    // Descartar aqui faz nascer `ref`, `first_seen_at` e `click_id_at` novos, em
    // vez de arrastar indefinidamente um clique que o Ads já não conta.
    const existente =
        guardado !== null && janelaRestante(guardado, agoraMs) > 0 ? guardado : null;

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
    gravarCookie(
        COOKIE_NOME,
        serializarCookie(atribuicao),
        janelaRestante(atribuicao, agoraMs),
    );
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
