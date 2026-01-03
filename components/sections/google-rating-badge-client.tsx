"use client";

import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

type RatingData = {
    rating: number;
    count: number;
    reviewsListUrl?: string;
};

export function GoogleRatingBadgeClient() {
    const [data, setData] = useState<RatingData>({
        rating: 4.7,
        count: 37,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRating = async () => {
            try {
                const res = await fetch("/api/google/rating");
                if (res.ok) {
                    const result = await res.json();
                    if (result.ok && result.rating && result.count) {
                        setData({
                            rating: result.rating,
                            count: result.count,
                            reviewsListUrl: result.reviewsListUrl,
                        });
                    }
                }
            } catch (error) {
                console.warn("Failed to fetch Google rating, using fallback");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRating();
    }, []);

    const badgeContent = (
        <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1">
            <Star className="mr-1.5 size-4 fill-blue-700" />
            {data.rating.toFixed(1)} ({data.count} avaliações)
        </Badge>
    );

    if (data.reviewsListUrl) {
        return (
            <a href={data.reviewsListUrl} target="_blank" rel="noreferrer" className="inline-flex">
                {badgeContent}
            </a>
        );
    }

    return badgeContent;
}
