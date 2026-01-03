import { NextResponse } from "next/server";

type GoogleReview = {
    author_name: string;
    rating: number;
    relative_time_description?: string;
    text?: string;
    profile_photo_url?: string;
};

// export const revalidate = 60 * 60; // 1h (ISR para route handler)

export async function GET() {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const placeId = process.env.LAVEXPRESS_GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
        return NextResponse.json(
            { ok: false, error: "Missing GOOGLE_MAPS_API_KEY or LAVEXPRESS_GOOGLE_PLACE_ID" },
            { status: 500 }
        );
    }

    // Place Details (classic endpoint). Campos: rating, user_ratings_total, reviews
    const url =
        "https://maps.googleapis.com/maps/api/place/details/json" +
        `?place_id=${encodeURIComponent(placeId)}` +
        `&fields=${encodeURIComponent("rating,user_ratings_total,reviews")}` +
        `&language=pt-BR` +
        `&key=${encodeURIComponent(apiKey)}`;

    const resp = await fetch(url, {
        // cache no servidor (Next) + revalidate acima
        next: { revalidate: 3600 },
    });

    if (!resp.ok) {
        return NextResponse.json(
            { ok: false, error: "Google Places request failed" },
            { status: 502 }
        );
    }

    const data = await resp.json();

    const result = data?.result ?? {};
    const rating = Number(result?.rating ?? 0);
    const total = Number(result?.user_ratings_total ?? 0);

    const reviews: GoogleReview[] = Array.isArray(result?.reviews)
        ? result.reviews
        : [];

    // Apenas 5 estrelas, com texto (evita card vazio)
    const onlyFiveStars = reviews
        .filter((r) => Number(r.rating) === 5)
        .filter((r) => (r.text ?? "").trim().length > 0)
        .slice(0, 12);

    return NextResponse.json({
        ok: true,
        rating,
        total,
        reviews: onlyFiveStars.map((r) => ({
            author_name: r.author_name,
            rating: r.rating,
            relative_time_description: r.relative_time_description ?? "",
            text: r.text ?? "",
            profile_photo_url: r.profile_photo_url ?? "",
        })),
    });
}
