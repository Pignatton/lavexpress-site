import {
    STORE_LOCATION,
    CITIES_FULLY_SUPPORTED,
    SERRA_RADIUS_KM,
    VILA_VELHA_NOBLE_NEIGHBORHOODS,
} from "@/lib/bairrosAtendidos";

export type AreaCheckResult =
    | { ok: true; normalized: string; reason: string }
    | { ok: false; normalized: string; reason: string };

function normalize(input: string) {
    return input
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/g, "")
        .trim();
}

// Distância Haversine (km)
function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

/**
 * Validação simplificada por texto.
 * (CEP + geocoding pode ser plugado depois sem quebrar nada)
 */
export function validarCepOuBairro(input: string): AreaCheckResult {
    const value = normalize(input);

    if (!value) {
        return { ok: false, normalized: "", reason: "Entrada inválida" };
    }

    // Vitória = sempre atende
    if (value.includes("vitoria") || value.includes("jardim camburi")) {
        return { ok: true, normalized: value, reason: "Vitória - atendimento total" };
    }

    // Vila Velha (bairros nobres)
    if (value.includes("vila velha")) {
        const hit = VILA_VELHA_NOBLE_NEIGHBORHOODS.some((b) =>
            value.includes(normalize(b))
        );

        return hit
            ? { ok: true, normalized: value, reason: "Vila Velha (bairro nobre)" }
            : {
                ok: false,
                normalized: value,
                reason: "Vila Velha fora da área prioritária",
            };
    }

    // Serra (heurística por proximidade textual)
    if (value.includes("serra")) {
        // fallback: considera Serra como possível e valida manual depois
        return {
            ok: true,
            normalized: value,
            reason: "Serra (validação por proximidade)",
        };
    }

    return {
        ok: false,
        normalized: value,
        reason: "Fora da área atendida",
    };
}
