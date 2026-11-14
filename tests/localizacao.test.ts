import { describe, expect, it } from "vitest";

import { GEO_LOJA, LAVEXPRESS } from "@/lib/lavexpress";
import { STORE_LOCATION } from "@/lib/bairrosAtendidos";
import { negocioLocalJsonLd } from "@/lib/negocio-json-ld";

// Distância Haversine (km), a mesma fórmula de lib/validarArea.ts.
function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

describe("localização da loja (fonte única)", () => {
    it("usa a coordenada do pino oficial do Google (CID)", () => {
        expect(GEO_LOJA).toEqual({ lat: -20.262486, lng: -40.264914 });
        expect(LAVEXPRESS.geo).toBe(GEO_LOJA);
        expect(LAVEXPRESS.googleMapsCidUrl).toContain(`ll=${GEO_LOJA.lat},${GEO_LOJA.lng}`);
        expect(LAVEXPRESS.googleMapsCidUrl).toContain("cid=13356030677811140771");
    });

    it("STORE_LOCATION (validação de área) é a mesma coordenada", () => {
        expect(STORE_LOCATION.lat).toBe(GEO_LOJA.lat);
        expect(STORE_LOCATION.lng).toBe(GEO_LOJA.lng);
        expect(distanceKm(STORE_LOCATION.lat, STORE_LOCATION.lng, GEO_LOJA.lat, GEO_LOJA.lng)).toBe(0);
    });

    it("a coordenada antiga ficava a ~3 km (não pode voltar)", () => {
        const d = distanceKm(-20.2589, -40.2922, GEO_LOJA.lat, GEO_LOJA.lng);
        expect(d).toBeGreaterThan(2.5);
        expect(STORE_LOCATION.lat).not.toBe(-20.2589);
    });
});

describe("JSON-LD do negócio local", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- leitura livre do JSON-LD no teste
    const ld = negocioLocalJsonLd() as Record<string, any>;

    it("tem tipo, nome, endereço completo, CEP, telefone e URL", () => {
        expect(ld["@type"]).toBe("DryCleaningOrLaundry");
        expect(ld.name).toBe("Lavexpress Lavanderia");
        expect(ld.address.streetAddress).toContain("R. Ruy Pinto Bandeira, 580 - loja 1");
        expect(ld.address.postalCode).toBe("29090-130");
        expect(ld.telephone).toBe("+552733377604");
        expect(ld.url).toMatch(/^https:\/\//);
    });

    it("geo é a mesma da fonte única", () => {
        expect(ld.geo.latitude).toBe(GEO_LOJA.lat);
        expect(ld.geo.longitude).toBe(GEO_LOJA.lng);
    });

    it("horário: seg–sex 9–18 e sáb 9–13", () => {
        const [semana, sabado] = ld.openingHoursSpecification;
        expect(semana.dayOfWeek).toHaveLength(5);
        expect([semana.opens, semana.closes]).toEqual(["09:00", "18:00"]);
        expect([sabado.dayOfWeek, sabado.opens, sabado.closes]).toEqual(["Saturday", "09:00", "13:00"]);
    });

    it("não traz nota nem avaliações", () => {
        const s = JSON.stringify(ld);
        expect(s).not.toContain("aggregateRating");
        expect(s).not.toContain("review");
    });
});
