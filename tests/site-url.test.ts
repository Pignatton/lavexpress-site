import { describe, expect, it } from "vitest";

import { ORIGEM_CANONICA, normalizarOrigem } from "@/lib/site-url";

const CANONICA = "https://lavexpresslavanderia.com";

describe("normalizarOrigem", () => {
    it("aceita o domínio oficial em https", () => {
        expect(normalizarOrigem(CANONICA)).toBe(CANONICA);
    });

    it("normaliza www para o ápice", () => {
        expect(normalizarOrigem("https://www.lavexpresslavanderia.com")).toBe(CANONICA);
    });

    it("força https quando vier em http", () => {
        expect(normalizarOrigem("http://lavexpresslavanderia.com")).toBe(CANONICA);
        expect(normalizarOrigem("http://www.lavexpresslavanderia.com")).toBe(CANONICA);
    });

    it("descarta caminho, query e porta — a origem é só o host", () => {
        expect(normalizarOrigem("https://lavexpresslavanderia.com/pacotes?x=1")).toBe(CANONICA);
        expect(normalizarOrigem("https://lavexpresslavanderia.com:443/")).toBe(CANONICA);
    });

    it("é insensível a maiúsculas no host", () => {
        expect(normalizarOrigem("https://WWW.LavExpressLavanderia.COM")).toBe(CANONICA);
    });

    it("remove barra final", () => {
        expect(normalizarOrigem("https://lavexpresslavanderia.com/")).toBe(CANONICA);
    });

    // Este é o caso que quebrou a produção: a variável existia e apontava para
    // localhost, então `env || fallback` nunca entrava em ação.
    it("rejeita localhost em qualquer forma", () => {
        expect(normalizarOrigem("http://localhost:3000")).toBeNull();
        expect(normalizarOrigem("https://localhost")).toBeNull();
        expect(normalizarOrigem("http://127.0.0.1:3000")).toBeNull();
    });

    it("rejeita o domínio antigo que não é oficial", () => {
        expect(normalizarOrigem("https://lavexpress.com.br")).toBeNull();
        expect(normalizarOrigem("https://www.lavexpress.com.br")).toBeNull();
    });

    it("rejeita domínio de terceiro que apenas contém o nome", () => {
        expect(normalizarOrigem("https://lavexpresslavanderia.com.br")).toBeNull();
        expect(normalizarOrigem("https://fake-lavexpresslavanderia.com")).toBeNull();
        expect(normalizarOrigem("https://lavexpresslavanderia.com.evil.test")).toBeNull();
    });

    it("rejeita esquemas não-http", () => {
        expect(normalizarOrigem("javascript:alert(1)")).toBeNull();
        expect(normalizarOrigem("data:text/html,x")).toBeNull();
        expect(normalizarOrigem("ftp://lavexpresslavanderia.com")).toBeNull();
    });

    it("rejeita entrada vazia, inválida ou ausente", () => {
        expect(normalizarOrigem(undefined)).toBeNull();
        expect(normalizarOrigem(null)).toBeNull();
        expect(normalizarOrigem("")).toBeNull();
        expect(normalizarOrigem("   ")).toBeNull();
        expect(normalizarOrigem("nao-e-url")).toBeNull();
        expect(normalizarOrigem("//lavexpresslavanderia.com")).toBeNull();
    });
});

describe("ORIGEM_CANONICA", () => {
    it("é o domínio oficial, em https e sem barra final", () => {
        expect(ORIGEM_CANONICA).toBe(CANONICA);
        expect(ORIGEM_CANONICA.endsWith("/")).toBe(false);
    });
});
