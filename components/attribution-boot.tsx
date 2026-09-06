"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { capturarAtribuicao } from "@/lib/attribution-client";

/**
 * AttributionBoot — captura a origem NA CHEGADA ao site. [CONTRATO-ATRIB]
 *
 * POR QUE ISSO EXISTE (e por que capturar só no clique não basta):
 *
 * O `gclid` chega uma única vez, na URL de entrada. Se a captura acontecesse
 * apenas quando a pessoa clica no WhatsApp, todo visitante que chegasse em
 * `/?gclid=X` e navegasse para `/pacotes` antes de clicar perderia a
 * atribuição — no momento do clique `location.search` já não tem o `gclid`, e
 * o cookie ainda não existiria para preservá-lo. Isso derrubaria justamente a
 * jornada mais valiosa: quem pesquisa antes de falar.
 *
 * Montado no layout raiz, este componente grava o cookie no primeiro render de
 * qualquer página. A partir daí `mesclarAtribuicao` protege o first touch.
 *
 * REGRA DE OURO: nada aqui pode quebrar a página. `capturarAtribuicao` já é
 * defensiva, mas o efeito inteiro vai dentro de `try/catch` — cookie
 * desabilitado, modo privado ou `crypto` indisponível não podem derrubar o
 * render nem impedir o WhatsApp de abrir.
 *
 * Não renderiza nada e não observa `useSearchParams`, de propósito: aquele hook
 * força a página inteira a sair da renderização estática. Lemos a query direto
 * de `window.location` dentro do efeito, que roda só no browser.
 */
export function AttributionBoot() {
    const pathname = usePathname();

    React.useEffect(() => {
        try {
            capturarAtribuicao();
        } catch {
            // Silêncio proposital: atribuição é telemetria, não funcionalidade.
        }
    }, [pathname]);

    return null;
}
