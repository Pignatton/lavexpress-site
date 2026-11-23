import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { ITEMS } from "@/lib/calcularEstimativa";
import { PACOTES, TABELA_PRECOS } from "@/lib/catalogo";

/**
 * Preços de 2026 efetivamente praticados (comprovantes do LavCore e coluna
 * "Preço 2026" da tabela oficial do dono). A tabela 2027 NÃO entra aqui:
 * ela só vale a partir do dia de lançamento definido pelo dono.
 */
const ler = (caminho: string) => readFileSync(fileURLToPath(new URL(caminho, import.meta.url)), "utf8");

const preco = (nome: string) => TABELA_PRECOS.find((i) => i.nome === nome)?.valor;
const precoCalc = (id: string) => ITEMS.find((i) => i.id === id)?.price;

describe("Preços avulsos de 2026 (correção D3 de 23/11/2026)", () => {
    it("calculadora de /agendamento: terno R$ 48 e edredom casal R$ 50", () => {
        expect(precoCalc("Terno Completo")).toBe(48);
        expect(precoCalc("Edredom Casal")).toBe(50);
    });

    it("demais itens da calculadora seguem iguais", () => {
        expect(precoCalc("Camisa Social Manga Longa")).toBe(18);
        expect(precoCalc("Calça Jeans")).toBe(15);
        expect(precoCalc("Tênis")).toBe(50);
        expect(precoCalc("Cortinas (a partir)")).toBe(55);
    });

    it("catálogo interno coerente com os comprovantes", () => {
        expect(preco("Terno Completo")).toBe(48);
        expect(preco("Edredom Solteiro")).toBe(45);
        expect(preco("Edredom Casal")).toBe(50);
        expect(preco("Edredom Queen")).toBe(55);
    });

    it("página de edredons: 'a partir de' R$ 45", () => {
        const pagina = ler("../app/servicos/lavagem-de-edredons/page.tsx");
        expect(pagina).toMatch(/const STARTING_PRICE = 45;/);
        expect(pagina).not.toMatch(/STARTING_PRICE = 40/);
    });
});

describe("Pacotes de 2026: os 20 valores não mudam", () => {
    it("lavar e secar", () => {
        expect(PACOTES.lavarSecar.map((p) => [p.pecas, p.valor])).toEqual([
            [60, 365], [80, 430], [120, 590], [160, 730], [215, 945], [245, 1065], [280, 1195], [360, 1450],
        ]);
    });

    it("lavar, secar e passar", () => {
        expect(PACOTES.lavarSecarPassar.map((p) => [p.pecas, p.valor])).toEqual([
            [40, 360], [60, 435], [90, 570], [120, 710], [160, 885], [200, 1045], [240, 1155], [320, 1410],
        ]);
    });

    it("só passar", () => {
        expect(PACOTES.passar.map((p) => [p.pecas, p.valor])).toEqual([
            [40, 320], [60, 390], [90, 510], [120, 640],
        ]);
    });
});

describe("Textos aprovados em 23/11/2026", () => {
    it("rodapé (D4): Jardim Camburi e coleta sob consulta", () => {
        const rodape = ler("../components/layout/site-footer.tsx").replace(/\s+/g, " ");
        expect(rodape).toContain(
            "Lavanderia em Jardim Camburi, Vitória/ES. Coleta e entrega mediante consulta de disponibilidade e condições.",
        );
        expect(rodape).not.toMatch(/Lavanderia profissional com coleta e entrega/);
    });

    it("Termos (D2): data de atualização da publicação", () => {
        expect(ler("../app/termos/page.tsx")).toMatch(/const ATUALIZADO_EM = "23 de novembro de 2026";/);
    });
});
