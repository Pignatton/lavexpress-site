import { GEO_LOJA } from "@/lib/lavexpress";

// Coordenada vinda da fonte única (lib/lavexpress.ts).
export const STORE_LOCATION = {
    lat: GEO_LOJA.lat,
    lng: GEO_LOJA.lng,
    address: "R. Ruy Pinto Bandeira, 580 - loja 1 - Jardim Camburi, Vitória/ES",
};

// Vitória: atendimento total
export const CITIES_FULLY_SUPPORTED = ["vitória"];

// Serra: atendimento por raio (km)
export const SERRA_RADIUS_KM = 8;

// Vila Velha: bairros nobres (AJUSTÁVEL)
export const VILA_VELHA_NOBLE_NEIGHBORHOODS = [
    "praia da costa",
    "itaparica",
    "itapuã",
    "coqueiral de itaparica",
    "gaivotas",
    "praia de itapoã",
    "jockey de itaparica",
];
