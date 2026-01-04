import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink } from "lucide-react";
import { LAVEXPRESS } from "@/lib/lavexpress";
import { fetchPlaceDetails } from "@/lib/google-places";

function StarsRow() {
    return (
        <div className="flex items-center gap-1 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
            ))}
        </div>
    );
}

export async function GoogleReviews() {
    let rating = 4.7;
    let total = 37;
    let reviews: any[] = [];
    let error = false;

    try {
        const data = await fetchPlaceDetails();
        rating = data.rating ?? 4.7;
        total = data.user_ratings_total ?? 37;

        const allReviews = data.reviews ?? [];
        // Apenas 5 estrelas, com texto (evita card vazio)
        reviews = allReviews
            .filter((r) => Number(r.rating) === 5)
            .filter((r) => (r.text ?? "").trim().length > 0)
            .slice(0, 12);

    } catch (err) {
        console.error("Failed to fetch Google Reviews:", err);
        error = true;
    }

    return (
        <section className="py-16 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
                        <div>
                            <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-full px-4 py-1.5">
                                Avaliações Reais do Google (5★)
                            </Badge>
                            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                                Clientes elogiando o padrão Lavexpress
                            </h2>
                            <p className="mt-3 text-slate-600 leading-relaxed max-w-2xl">
                                Transparência total: aqui aparecem comentários reais do Google. Exibimos apenas avaliações 5★ com texto.
                            </p>
                        </div>

                        <Card className="p-5 rounded-2xl border-slate-100 shadow-sm bg-slate-50/60">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold">
                                    {String(rating).replace(".", ",")}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <StarsRow />
                                        <span className="text-sm font-extrabold text-slate-900">
                                            {String(rating).replace(".", ",")} • {total} avaliações
                                        </span>
                                    </div>
                                    <div className="text-xs text-slate-600 mt-1">
                                        Fonte: Google Reviews
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {reviews.length === 0 ? (
                        <Card className="p-8 rounded-2xl border-slate-100 bg-slate-50/60">
                            <div className="text-slate-700 font-semibold">
                                {error
                                    ? "Não foi possível carregar as avaliações agora. Você ainda pode ver todas diretamente no Google."
                                    : "Nenhuma avaliação 5★ com texto encontrada recentemente."}
                            </div>
                            <div className="mt-4">
                                <Button
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl"
                                    asChild
                                >
                                    <a href={LAVEXPRESS.googleMapsCidUrl} target="_blank" rel="noreferrer">
                                        Ver avaliações no Google <ExternalLink className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
                            </div>
                        </Card>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reviews.slice(0, 6).map((r, idx) => (
                                <Card
                                    key={`${r.author_name}-${idx}`}
                                    className="p-6 rounded-2xl border-slate-100 shadow-sm hover:shadow-lg transition-all bg-white"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="h-11 w-11 rounded-full overflow-hidden bg-slate-100 shrink-0">
                                            {r.profile_photo_url ? (
                                                <Image
                                                    src={r.profile_photo_url}
                                                    alt={r.author_name}
                                                    width={44}
                                                    height={44}
                                                    className="h-11 w-11 object-cover"
                                                />
                                            ) : (
                                                <div className="h-11 w-11 bg-emerald-600/10" />
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-extrabold text-slate-900 truncate">{r.author_name}</div>
                                            <div className="mt-1 flex items-center gap-2">
                                                <StarsRow />
                                                <span className="text-xs text-slate-500">{r.relative_time_description}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="mt-4 text-slate-700 leading-relaxed line-clamp-5">
                                        {r.text}
                                    </p>

                                    <div className="mt-5 pt-4 border-t border-slate-100">
                                        <span className="inline-flex items-center gap-2 text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
                                            5★ verificado
                                        </span>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                        <div className="text-sm text-slate-600">
                            Quer conferir tudo? Veja diretamente no Google.
                        </div>
                        <Button
                            variant="outline"
                            className="rounded-xl border-emerald-200 text-emerald-800 hover:bg-emerald-50 font-extrabold"
                            asChild
                        >
                            <a href={LAVEXPRESS.googleMapsCidUrl} target="_blank" rel="noreferrer">
                                Abrir no Google <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
