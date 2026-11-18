/**
 * Emite um bloco <script type="application/ld+json">.
 *
 * `<` é escapado para que nenhum texto do conteúdo consiga fechar a tag
 * <script> (recomendação da própria documentação do Next para JSON-LD).
 */
export function JsonLd({ dados }: { dados: Record<string, unknown> | null }) {
    if (!dados) return null;

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(dados).replace(/</g, "\\u003c"),
            }}
        />
    );
}
