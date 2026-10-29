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

    /**
     * Avaliação pública do Perfil da Empresa no Google.
     *
     * Conferido no Google Maps em 28/10/2026 (horário de Brasília): 4,7 estrelas,
     * 43 avaliações.
     * Antes o par estava escrito à mão em 8 arquivos, todos com `count = 37` —
     * o número tinha envelhecido e divergido do perfil real.
     *
     * A rota /api/google/rating existe e buscaria isto sozinha, mas hoje
     * devolve REQUEST_DENIED: o faturamento do projeto Google Cloud está
     * desativado, e não há autorização para habilitá-lo. Enquanto isso, este é
     * o valor de referência — num lugar só, para não divergir de novo.
     *
     * Este objeto SUBSTITUI o antigo `rating: { score, count }`, que era uma
     * segunda fonte de verdade com os mesmos dados desatualizados.
     */
    google: {
        rating: 4.7,
        reviews: 43,
        conferidoEm: "2026-10-28",
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
    /**
     * Peças que NÃO entram nos pacotes mensais e são cobradas à parte, pela
     * tabela de peças avulsas.
     *
     * ⚠️ Isto NÃO é uma lista de serviços recusados. Terno, blazer e couro são
     * atendidos e têm preço próprio em `catalogo.ts` (Terno Completo R$ 45,00,
     * Blazer R$ 35,00, Jaqueta de Couro R$ 75,00). O nome anterior do campo era
     * `exclusions`, o que fazia a lista ser lida como "não fazemos" — inclusive
     * por quem auditou o site. O nome atual diz o que a lista é.
     *
     * O único serviço realmente não oferecido é **lavagem a seco**, e por isso
     * ele não aparece aqui: não é peça fora do pacote, é processo que a
     * operação não executa.
     */
    foraDosPacotes: [
        "Edredons especiais (avaliar caso a caso)",
        "Ternos e blazers",
        "Vestidos de festa",
        "Peças delicadas que não podem ir à máquina",
    ],
} as const;
