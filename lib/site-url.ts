/**
 * Origem canônica do site em produção.
 *
 * Fica num módulo só para que sitemap, robots e metadata nunca divirjam.
 *
 * Duas defesas, porque já falhou nas duas pontas:
 *
 * 1. O fallback é o domínio REAL. Antes era `lavexpress.com.br`, que não é o
 *    domínio oficial.
 * 2. Um valor de `NEXT_PUBLIC_BASE_URL` apontando para localhost é ignorado.
 *    A produção estava publicando `http://localhost:3000` no sitemap.xml e no
 *    robots.txt justamente porque a variável estava definida assim no ambiente
 *    de Production — e `env || fallback` nunca corrige um valor presente e
 *    errado. Como este módulo só alimenta URLs canônicas (sitemap, robots,
 *    metadataBase), localhost jamais é uma resposta válida aqui, nem em dev.
 */
const PRODUCAO = "https://lavexpresslavanderia.com";

function origemValida(valor: string | undefined): valor is string {
    if (!valor) return false;
    try {
        const { protocol, hostname } = new URL(valor);
        if (protocol !== "https:" && protocol !== "http:") return false;
        return !["localhost", "127.0.0.1", "[::1]", "::1"].includes(hostname);
    } catch {
        return false;
    }
}

const bruto = process.env.NEXT_PUBLIC_BASE_URL;

export const SITE_URL = origemValida(bruto)
    ? bruto.replace(/\/+$/, "")
    : PRODUCAO;
