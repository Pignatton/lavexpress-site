import { LAVEXPRESS } from "@/lib/lavexpress";
import { SITE_URL } from "@/lib/site-url";

/**
 * JSON-LD do negócio local (schema.org `DryCleaningOrLaundry`).
 *
 * `DryCleaningOrLaundry` é o tipo do schema.org para lavanderias em geral:
 * não afirma lavagem a seco (a operação não faz).
 *
 * NAP igual ao da ficha do Google; os dados saem de `lib/lavexpress.ts`.
 *
 * FICOU DE FORA, de propósito:
 * - `aggregateRating`: nota de terceiros publicada pela própria empresa não
 *   gera estrela e contraria as diretrizes do Google.
 * - `priceRange`: a tabela 2027 só entra no dia D.
 * - coleta/entrega e prazos: não confirmados.
 *
 * Quando o ramo `melhorias/imagens-seo-conversao` entrar, este objeto substitui
 * `negocioLocalJsonLd()` de `lib/seo.ts` (lá o telefone é o WhatsApp e a área é
 * Vitória, Serra e Vila Velha inteiras, ambos a corrigir).
 */

/** Telefone fixo da ficha do Google: (27) 3337-7604. */
const TELEFONE_FIXO_E164 = `+55${LAVEXPRESS.phone}`;

/** Coordenada da fonte única (`GEO_LOJA` em lib/lavexpress.ts). */
const GEO = { latitude: LAVEXPRESS.geo.lat, longitude: LAVEXPRESS.geo.lng } as const;

export function negocioLocalJsonLd(): Record<string, unknown> {
    return {
        "@context": "https://schema.org",
        "@type": "DryCleaningOrLaundry",
        "@id": `${SITE_URL}/#negocio`,
        name: LAVEXPRESS.name,
        url: SITE_URL,
        telephone: TELEFONE_FIXO_E164,
        email: LAVEXPRESS.email,
        address: {
            "@type": "PostalAddress",
            streetAddress: `${LAVEXPRESS.addressLine} - ${LAVEXPRESS.addressDistrict}`,
            addressLocality: "Vitória",
            addressRegion: "ES",
            postalCode: LAVEXPRESS.addressZip,
            addressCountry: "BR",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: GEO.latitude,
            longitude: GEO.longitude,
        },
        hasMap: LAVEXPRESS.googleMapsCidUrl,
        contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: `+${LAVEXPRESS.whatsappE164}`,
            url: `https://wa.me/${LAVEXPRESS.whatsappE164}`,
            availableLanguage: "pt-BR",
            description: "WhatsApp",
        },
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "18:00",
            },
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Saturday",
                opens: "09:00",
                closes: "13:00",
            },
        ],
        areaServed: {
            "@type": "Place",
            name: "Jardim Camburi, Vitória - ES",
        },
    };
}
