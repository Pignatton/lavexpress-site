export type GoogleReview = {
    author_name: string;
    rating: number;
    relative_time_description?: string;
    text?: string;
    time?: number;
    author_url?: string;
    profile_photo_url?: string;
};

export type GooglePlaceDetails = {
    name: string;
    rating?: number;
    user_ratings_total?: number;
    reviews?: GoogleReview[];
    url?: string;
    formatted_address?: string;
};

function assertEnv(name: string) {
    const v = process.env[name];
    if (!v) throw new Error(`Missing env: ${name}`);
    return v;
}

export async function fetchPlaceDetails(): Promise<GooglePlaceDetails> {
    const key = assertEnv("GOOGLE_MAPS_API_KEY");
    const placeId = assertEnv("LAVEXPRESS_GOOGLE_PLACE_ID");

    // Campos mínimos para social proof
    const fields = [
        "name",
        "rating",
        "user_ratings_total",
        "reviews",
        "url",
        "formatted_address",
    ].join(",");

    const endpoint =
        `https://maps.googleapis.com/maps/api/place/details/json` +
        `?place_id=${encodeURIComponent(placeId)}` +
        `&fields=${encodeURIComponent(fields)}` +
        `&language=pt-BR` +
        `&key=${encodeURIComponent(key)}`;

    const res = await fetch(endpoint, {
        // cache no servidor (Next 15)
        next: { revalidate: 60 * 60 }, // 1h
    });

    if (!res.ok) {
        throw new Error(`Google Places error: ${res.status}`);
    }

    const data = await res.json();

    if (data.status !== "OK") {
        throw new Error(`Google Places status: ${data.status} - ${data.error_message ?? ""}`.trim());
    }

    return data.result as GooglePlaceDetails;
}
