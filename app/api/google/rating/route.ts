import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Cache por 6 horas (reduz custo e deixa estável)
export const revalidate = 21600;

type GooglePlaceDetailsResponse = {
    status: string;
    result?: {
        name?: string;
        url?: string;
        rating?: number;
        user_ratings_total?: number;
    };
    error_message?: string;
};

export async function GET() {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const placeId = process.env.LAVEXPRESS_GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
        return NextResponse.json(
            { ok: false, error: "Missing GOOGLE_MAPS_API_KEY or LAVEXPRESS_GOOGLE_PLACE_ID" },
            { status: 500 }
        );
    }

    const url =
        "https://maps.googleapis.com/maps/api/place/details/json" +
        `?place_id=${encodeURIComponent(placeId)}` +
        `&fields=${encodeURIComponent("name,rating,user_ratings_total,url")}` +
        `&language=pt-BR` +
        `&key=${encodeURIComponent(apiKey)}`;

    const res = await fetch(url, { next: { revalidate } });
    const data = (await res.json()) as GooglePlaceDetailsResponse;

    if (!res.ok || data.status !== "OK" || !data.result) {
        console.error("Google Places API Error:", {
            status: res.status,
            dataStatus: data.status,
            errorMessage: data.error_message,
            placeId: placeId
        });
        return NextResponse.json(
            {
                ok: false,
                status: data.status,
                error: data.error_message ?? "Failed to fetch place details",
            },
            { status: 502 }
        );
    }

    const payload = {
        ok: true,
        name: data.result.name ?? "Lavexpress",
        rating: data.result.rating ?? null,
        count: data.result.user_ratings_total ?? null,
        mapsUrl: data.result.url ?? null,
        // links úteis para CTA
        reviewUrl: `https://search.google.com/local/writereview?placeid=${placeId}`,
        reviewsListUrl: `https://search.google.com/local/reviews?placeid=${placeId}`,
    };

    return NextResponse.json(payload);
}
