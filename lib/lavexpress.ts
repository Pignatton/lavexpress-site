export const LAVEXPRESS = {
    name: "Lavexpress Lavanderia",
    email: "lavexpresslavanderia@hotmail.com",
    whatsappE164: "5527996172403",
    whatsappDisplay: "(27) 99617-2403",
    phoneDisplay: "(27) 3337-7604",
    addressLine: "R. Ruy Pinto Bandeira, 580 - loja 1",
    addressDistrict: "Jardim Camburi",
    addressCity: "Vitória - ES",
    addressZip: "29090-130",
    fullAddress:
        "R. Ruy Pinto Bandeira, 580 - loja 1 - Jardim Camburi, Vitória - ES, 29090-130",
    hours: {
        weekdays: "Segunda a Sexta • 09:00 - 18:00",
        saturday: "Sábado • 09:00 - 13:00",
        sunday: "Domingo • Fechado",
    },

    // Link oficial que você mandou (CID)
    googleMapsCidUrl:
        "https://www.google.com/maps?ll=-20.262486,-40.264914&z=16&t=m&hl=pt-BR&gl=BR&mapclient=embed&cid=13356030677811140771",

    // Para abrir no app do Google Maps com query do endereço
    googleMapsDirectionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=R.%20Ruy%20Pinto%20Bandeira%2C%20580%20-%20loja%201%20-%20Jardim%20Camburi%2C%20Vit%C3%B3ria%20-%20ES%2C%2029090-130",

    // Se você já tem Place ID, coloque aqui.
    // Se não tiver, eu deixei o campo; você pode obter via Places API (Find Place) depois.
    googlePlaceId: "ChIJ_fmjZbIZuAARoxgnYCMnWrk",

    // Legacy fields kept for compatibility if needed elsewhere
    brand: "Lavexpress",
    phone: "2733377604",
    rating: { score: 4.7, count: 37 },
    serviceAreas: ["Vitória/ES", "Serra/ES", "Vila Velha/ES"],
    pickupRules: {
        fixedMorningDays: ["Terça", "Sexta", "Sábado"],
        otherDaysMinNoticeHours: 24,
    },
    sla: {
        washDryHoursMin: 24,
        washDryHoursMax: 48,
        washDryIronBusinessDaysMin: 4,
        washDryIronBusinessDaysMax: 5,
        expressInStoreHoursMin: 3,
        expressInStoreHoursMax: 4,
    },
    exclusions: [
        "Edredons especiais (avaliar caso a caso)",
        "Ternos",
        "Vestidos de festa",
        "Peças delicadas que não podem ir à máquina",
    ],
} as const;
