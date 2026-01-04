import { NextResponse } from "next/server";
import { fetchPlaceDetails } from "@/lib/google-places";

export const revalidate = 3600; // 1h

export async function GET() {
    try {
        const data = await fetchPlaceDetails();

        const rating = data.rating ?? 0;
        const total = data.user_ratings_total ?? 0;
        const reviews = data.reviews ?? [];

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
    } catch (error: any) {
        console.error("API Google Reviews error:", error);
        return NextResponse.json(
            { ok: false, error: error.message || "Unknown error" },
            { status: 500 }
        );
    }
}
