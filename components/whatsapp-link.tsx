"use client";

import * as React from "react";

import { LAVEXPRESS } from "@/lib/lavexpress";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { linkWhatsAppComAtribuicao, type ExtrasIngest } from "@/lib/attribution-client";

const MENSAGEM_PADRAO = "Olá! Gostaria de falar com a Lavexpress.";

/**
 * Recupera a copy original de um link wa.me já montado no servidor.
 *
 * Existe para que a migração dos ~30 CTAs do site fosse mecânica: quem já tinha
 * `<a href={waAgendar}>` só troca a tag, sem repetir a mensagem em dois lugares.
 */
function textoDoHref(href: string | undefined): string | null {
    if (typeof href !== "string") return null;
    const corte = href.indexOf("?");
    if (corte < 0) return null;
    try {
        const texto = new URLSearchParams(href.slice(corte + 1)).get("text");
        return texto !== null && texto.length > 0 ? texto : null;
    } catch {
        return null;
    }
}

/**
 * Handler de clique que carimba o `Ref:` reescrevendo o `href` do próprio nó.
 *
 * Exportado para as âncoras que NÃO podem virar um `<WhatsAppLink>` sem mudar
 * comportamento — hoje o `motion.a` do botão flutuante, que precisa continuar
 * sendo o elemento animado pelo framer-motion. Uma implementação só, dois
 * pontos de uso.
 */
export function criarHandlerWhatsApp(params: {
    text: string;
    phoneE164?: string;
    extras?: ExtrasIngest;
}) {
    return function aoClicar(evento: React.MouseEvent<HTMLAnchorElement>) {
        try {
            const alvo = evento.currentTarget;
            const destino = linkWhatsAppComAtribuicao(params);
            if (typeof destino === "string" && destino.length > 0) {
                alvo.href = destino;
            }
        } catch {
            // `href` original permanece no nó: abre o WhatsApp com a copy de
            // sempre, apenas sem rastreio. Nunca chamamos `preventDefault()`.
        }
    };
}

export type WhatsAppLinkProps = Omit<React.ComponentPropsWithRef<"a">, "href"> & {
    /** Link wa.me já montado (server-side). Serve de fallback sem JavaScript. */
    href?: string;
    /** Copy da mensagem. Vence sobre o `text` embutido no `href`. */
    text?: string;
    phoneE164?: string;
    /** Contexto opcional do lead, enviado só à ingestão — nunca à mensagem. */
    bairro?: string | null;
    cep?: string | null;
    serviceInterest?: string | null;
};

/**
 * CTA único do WhatsApp. [CONTRATO-ATRIB]
 *
 * Renderiza uma âncora normal — com `href` real, indexável e funcional sem
 * JavaScript. No clique, reescreve o `href` do próprio nó com a mensagem
 * carimbada (`Ref: LX-XXXXXX`) e deixa a navegação PADRÃO acontecer.
 *
 * Por que reescrever em vez de `preventDefault()` + `window.open()`: `open()`
 * pode ser barrado por bloqueador de pop-up e engoliria o lead. Não chamando
 * `preventDefault()`, o pior caso possível é o browser abrir o `href` que já
 * estava lá — a copy original, sem `Ref:`. O WhatsApp abre SEMPRE.
 *
 * Nada de `await` no caminho do clique: `linkWhatsAppComAtribuicao` é síncrona
 * e a ingestão é fire-and-forget.
 */
export function WhatsAppLink({
    href,
    text,
    phoneE164 = LAVEXPRESS.whatsappE164,
    bairro,
    cep,
    serviceInterest,
    onClick,
    target = "_blank",
    rel = "noreferrer",
    children,
    ...rest
}: WhatsAppLinkProps) {
    // Deriva da PROP, nunca do DOM: o `href` do nó é reescrito a cada clique, e
    // relê-lo faria a mensagem acumular uma linha `Ref:` a cada vez.
    const textoBase = React.useMemo(
        () => text ?? textoDoHref(href) ?? MENSAGEM_PADRAO,
        [text, href],
    );

    const hrefInicial = React.useMemo(
        () => href ?? buildWhatsAppLink({ phoneE164, text: textoBase }),
        [href, phoneE164, textoBase],
    );

    const extras = React.useMemo<ExtrasIngest>(
        () => ({ bairro, cep, serviceInterest }),
        [bairro, cep, serviceInterest],
    );

    function handleClick(evento: React.MouseEvent<HTMLAnchorElement>) {
        // O handler do chamador vem primeiro e é isolado: um erro dele não pode
        // impedir a atribuição nem a navegação.
        try {
            onClick?.(evento);
        } catch {
            /* handler externo com defeito não derruba o CTA */
        }

        criarHandlerWhatsApp({ text: textoBase, phoneE164, extras })(evento);
    }

    return (
        <a {...rest} href={hrefInicial} target={target} rel={rel} onClick={handleClick}>
            {children}
        </a>
    );
}
