import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * Os Termos não podem prometer o que a loja não confirma (delivery como regra,
 * área de cobertura, prazo fixo, tapetes). As cláusulas de indenização,
 * retenção e triagem aguardam revisão jurídica e não são testadas aqui.
 */
const termos = readFileSync(fileURLToPath(new URL("../app/termos/page.tsx", import.meta.url)), "utf8");

describe("Termos: ajustes factuais", () => {
    it("não chama o serviço de delivery nem promete área de cobertura", () => {
        expect(termos).not.toMatch(/lavanderia delivery/i);
        expect(termos).not.toMatch(/inclui coleta e entrega/i);
        expect(termos).not.toMatch(/Vila Velha|Serra\)/);
    });

    it("não lista tapetes nem prazo fixo", () => {
        expect(termos).not.toMatch(/tapete/i);
        expect(termos).not.toMatch(/24.?48h|5 dias úteis/);
    });

    it("diz que coleta e entrega são sob consulta", () => {
        expect(termos).toMatch(/Coleta e entrega podem ser combinadas mediante consulta prévia/);
    });
});
