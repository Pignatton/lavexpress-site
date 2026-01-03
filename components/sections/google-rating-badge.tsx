import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { LAVEXPRESS } from "@/lib/lavexpress";

type RatingPayload = {
    ok: boolean;
    name?: string;
    rating?: number | null;
    count?: number | null;
    reviewUrl?: string;
    reviewsListUrl?: string;
    mapsUrl?: string;
};

async function getRating(): Promise<RatingPayload | null> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/google/rating`, {
            next: { revalidate: 21600 },
            cache: "no-store",
        });

        if (!res.ok) {
            console.warn("Google Places API failed, using fallback data");
            return null;
        }

        const data = await res.json() as RatingPayload;
        if (!data.ok) {
            console.warn("Google Places API returned error:", data);
            return null;
        }

        return data;
    } catch (error) {
        console.warn("Error fetching Google rating:", error);
        return null;
    }
}

export async function GoogleRatingBadge() {
    const data = await getRating();

    // Se temos dados do Google, usa eles com link
    if (data?.ok && data.rating && data.count && data.reviewsListUrl) {
        return (
            <a href={data.reviewsListUrl} target="_blank" rel="noreferrer" className="inline-flex">
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1">
                    <Star className="mr-1.5 size-4 fill-blue-700" />
                    {data.rating.toFixed(1)} ({data.count} avaliações)
                </Badge>
            </a>
        );
    }

    // Fallback: usa dados estáticos do LAVEXPRESS
    return (
        <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1">
            <Star className="mr-1.5 size-4 fill-blue-700" />
            {LAVEXPRESS.rating.score.toFixed(1)} ({LAVEXPRESS.rating.count} avaliações)
        </Badge>
    );
}
