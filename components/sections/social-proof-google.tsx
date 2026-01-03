"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, ExternalLink } from "lucide-react";

type GoogleReview = {
    author_name: string;
    rating: number;
    relative_time_description?: string;
    text?: string;
    author_url?: string;
    profile_photo_url?: string;
};

type ApiResponse = {
    placeName?: string;
    rating?: number | null;
    total?: number | null;
    address?: string | null;
    googleUrl?: string | null;
    reviews?: GoogleReview[];
    error?: boolean;
    message?: string;
};

function StarsRow({ value, className = "text-yellow-400" }: { value: number, className?: string }) {
    return (
        <div className={`flex items-center gap-1 ${className}`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < value ? "fill-current" : ""}`} />
            ))}
        </div>
    );
}

function formatRating(v?: number | null) {
    if (!v) return "—";
    // pt-BR
    return v.toFixed(1).replace(".", ",");
}

export function SocialProofGoogle() {
    const [data, setData] = React.useState<ApiResponse | null>(null);

    React.useEffect(() => {
        let mounted = true;
        fetch("/api/google/reviews")
            .then((r) => r.json())
            .then((json) => mounted && setData(json))
            .catch(() => mounted && setData({ error: true, message: "Falha ao carregar avaliações." }));
        return () => {
            mounted = false;
        };
    }, []);

    const placeName = data?.placeName ?? "Lavexpress Lavanderia";
    const rating = data?.rating ?? 4.7; // fallback pro seu número real atual
    const total = data?.total ?? 37; // fallback pro seu número real atual
    const googleUrl =
        data?.googleUrl ??
        "https://www.google.com/maps?cid=13356030677811140771";
    const address =
        data?.address ??
        "Ao lado do Supermercado BH da praia - R. Ruy Pinto Bandeira, 580 - loja 1 - Jardim Camburi, Vitória - ES, 29090-130";

    const allReviews = Array.isArray(data?.reviews) ? data!.reviews! : [];
    // Filter for 5 stars ONLY as requested
    const fiveStars = allReviews.filter((r) => r.rating === 5);

    // Show only 5 star reviews, max 4 (2x2 grid)
    const reviews = fiveStars.slice(0, 4);

    return (
        <section className="relative bg-gradient-to-br from-emerald-600 to-green-700 py-20 md:py-24 overflow-hidden text-white">
            {/* Animated Background Effects (Simplified from StoreHighlights) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-30" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="container relative mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="mx-auto mb-10 max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-900/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-50 backdrop-blur-sm">
                        Avaliações reais no Google
                    </div>

                    <h2 className="mt-5 text-balance text-3xl font-extrabold text-white md:text-5xl">
                        Confiança não se promete —
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 to-white">
                            {" "}se prova
                        </span>
                        .
                    </h2>

                    <p className="mt-4 text-lg text-emerald-50">
                        Comentários reais de clientes que usam a Lavexpress no dia a dia. Você agenda, a gente busca, cuida e entrega no prazo.
                    </p>
                </div>

                {/* Row: summary + reviews */}
                <div className="grid gap-6 lg:grid-cols-12">
                    {/* Summary */}
                    <div className="lg:col-span-4">
                        <Card className="h-full rounded-3xl border border-emerald-400/20 bg-white/10 shadow-2xl backdrop-blur-sm">
                            <CardContent className="p-8">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="text-lg font-extrabold text-white">{placeName}</div>
                                        <div className="mt-2 flex items-center gap-3">
                                            <div className="text-4xl font-extrabold text-white">{formatRating(rating)}</div>
                                            <div className="space-y-1">
                                                <StarsRow value={5} />
                                                <div className="text-sm text-emerald-100">
                                                    {total} avaliações no Google
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ícone “G” simples */}
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/20">
                                        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.25 17.21 15.81 18.11V21.09H19.62C21.85 19.09 23.49 16.04 23.49 12.275Z" fill="#4285F4" />
                                            <path d="M12 24C15.24 24 17.97 21.92 19.96 18.96L16.15 15.97C15.07 16.69 13.69 17.14 12 17.14C8.87 17.14 6.22 15.04 5.28 12.21H1.34V15.27C3.35 19.27 7.42 22 12 22Z" fill="#34A853" />
                                            <path d="M5.28 12.21C5.03 11.46 4.89 10.66 4.89 9.84C4.89 9.01 5.03 8.21 5.28 7.46V4.4H1.34C0.48 6.11 0 8.04 0 9.84C0 11.63 0.48 13.56 1.34 15.27L5.28 12.21Z" fill="#FBBC05" />
                                            <path d="M12 2.85C13.77 2.85 15.35 3.46 16.6 4.65L18.66 2.59C16.97 1.02 14.68 0 12 0C7.42 0 3.35 2.73 1.34 6.73L5.28 9.79C6.22 6.96 8.87 4.85 12 4.85V2.85Z" fill="#EA4335" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-3 text-sm text-emerald-50">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 h-2.5 w-2.5 rounded-full bg-white" />
                                        <div>Somente comentários reais exibidos aqui.</div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 h-2.5 w-2.5 rounded-full bg-white" />
                                        <div>Fonte oficial: Google Reviews (com link direto para ver todos).</div>
                                    </div>
                                </div>

                                <div className="mt-7 grid gap-3">
                                    <Button
                                        className="h-12 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50"
                                        asChild
                                    >
                                        <a href={googleUrl} target="_blank" rel="noreferrer">
                                            Ver no Google <ExternalLink className="ml-2 h-4 w-4" />
                                        </a>
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="h-12 rounded-2xl border-emerald-400/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                                        asChild
                                    >
                                        <a
                                            href="https://www.google.com/maps/dir/?api=1&destination=-20.262486,-40.264914"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Traçar rota <MapPin className="ml-2 h-4 w-4" />
                                        </a>
                                    </Button>

                                    {/* Attribution mínima (importante para compliance) */}
                                    <div className="pt-2 text-xs text-emerald-200/60">
                                        As avaliações são exibidas via Google Places API e pertencem aos seus respectivos autores.
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Reviews */}
                    <div className="lg:col-span-8">
                        <div className="grid gap-4 md:grid-cols-2">
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {(reviews.length ? reviews : Array.from({ length: 4 })).map((r: any, idx: number) => {
                                const isSkeleton = !reviews.length;
                                return (
                                    <Card
                                        key={isSkeleton ? idx : `${r.author_name}-${idx}`}
                                        className="rounded-3xl border border-emerald-400/20 bg-white/95 shadow-xl backdrop-blur-sm"
                                    >
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-sm font-extrabold">
                                                        {isSkeleton ? "•" : (r.author_name?.[0] ?? "C")}
                                                    </div>
                                                    <div>
                                                        <div className="font-extrabold text-slate-900">
                                                            {isSkeleton ? "Carregando..." : r.author_name}
                                                        </div>
                                                    </div>
                                                </div>

                                                <StarsRow value={5} />
                                            </div>

                                            <p className="mt-4 text-sm leading-relaxed text-slate-700">
                                                {isSkeleton
                                                    ? "Buscando comentários 5 estrelas no Google..."
                                                    : `“${(r.text ?? "").slice(0, 240)}${(r.text?.length ?? 0) > 240 ? "…" : ""}”`}
                                            </p>

                                            <div className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
                                                Fonte: Google Reviews
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="mt-10 overflow-hidden rounded-3xl border border-emerald-400/20 bg-white/10 shadow-2xl backdrop-blur-sm">
                    <div className="relative h-[380px] w-full bg-slate-800">
                        <iframe
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps?ll=-20.262486,-40.264914&z=16&t=m&hl=pt-BR&gl=BR&mapclient=embed&cid=13356030677811140771&output=embed"
                            title="Localização Lavexpress"
                            className="grayscale-[0.35] hover:grayscale-0 transition-all duration-700"
                        />
                    </div>

                    <div className="p-6 md:flex md:items-center md:justify-between">
                        <div className="flex items-start gap-3 text-white">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                                <MapPin className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="font-extrabold">{placeName}</div>
                                <div className="text-sm text-emerald-100">{address}</div>
                            </div>
                        </div>

                        <Button className="mt-4 w-full rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 md:mt-0 md:w-auto" asChild>
                            <a href={googleUrl} target="_blank" rel="noreferrer">
                                Ver no Google Maps <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
