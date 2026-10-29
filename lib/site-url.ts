/**
 * Origem canônica do site.
 *
 * Fica num módulo só para que sitemap, robots e metadata nunca divirjam, e é
 * deliberadamente restritiva: só o domínio oficial é aceito.
 *
 * O histórico justifica o rigor. A produção publicou `http://localhost:3000`
 * no sitemap.xml e no robots.txt porque `NEXT_PUBLIC_BASE_URL` estava definida
 * assim no ambiente de Production — e `env || fallback` nunca corrige uma
 * variável presente e errada. Antes disso, o fallback do código apontava para
 * `lavexpress.com.br`, que também não é o domínio oficial.
 *
 * Regras:
 * - só `lavexpresslavanderia.com` (com ou sem `www`) é aceito;
 * - `www` é normalizado para o ápice, que é a forma canônica;
 * - o esquema é sempre forçado para https;
 * - qualquer outra coisa — localhost, domínio errado, string inválida, vazio —
 *   cai no domínio oficial.
 */
export const ORIGEM_CANONICA = "https://lavexpresslavanderia.com";

const HOST_CANONICO = "lavexpresslavanderia.com";

/** Normaliza um valor para a origem canônica, ou devolve null se não servir. */
export function normalizarOrigem(valor: string | undefined | null): string | null {
    if (typeof valor !== "string" || valor.trim() === "") return null;

    let url: URL;
    try {
        url = new URL(valor.trim());
    } catch {
        return null;
    }

    if (url.protocol !== "https:" && url.protocol !== "http:") return null;

    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    if (host !== HOST_CANONICO) return null;

    // Sempre https e sempre o ápice: www e http são variantes, não canônicos.
    return `https://${HOST_CANONICO}`;
}

export const SITE_URL =
    normalizarOrigem(process.env.NEXT_PUBLIC_BASE_URL) ?? ORIGEM_CANONICA;
