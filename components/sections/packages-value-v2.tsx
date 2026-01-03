"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowRight,
    BadgeCheck,
    Clock,
    ShieldCheck,
    Sparkles,
    Star,
    Truck,
    Wallet,
    Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

type Mode = "pacotes" | "avulso" | "emcasa";

type Props = {
    pricePerPieceFrom?: number; // ex 4.40
    ratingFallback?: number; // ex 4.7
    totalFallback?: number; // ex 37
    slaWashDry?: string; // "24–48h"
    slaIron?: string; // "4–5 dias úteis"
};

function formatBRL(v: number) {
    return `R$ ${v.toFixed(2).replace(".", ",")}`;
}

function scrollToPlans() {
    const el = document.getElementById("planos");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function StarsRow({ value }: { value: number }) {
    return (
        <div className="flex items-center gap-1 text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < value ? "fill-current" : ""}`} />
            ))}
        </div>
    );
}

type ReviewsApi = {
    rating?: number | null;
    total?: number | null;
    placeName?: string;
    googleUrl?: string | null;
};

export function PackagesValueV2({
    pricePerPieceFrom = 4.4,
    ratingFallback = 4.7,
    totalFallback = 37,
    slaWashDry = "24–48h",
    slaIron = "4–5 dias úteis",
}: Props) {
    const reduceMotion = useReducedMotion();
    const priceLabel = formatBRL(pricePerPieceFrom);

    const [mode, setMode] = React.useState<Mode>("pacotes");
    const [reviewsMeta, setReviewsMeta] = React.useState<ReviewsApi | null>(null);

    React.useEffect(() => {
        let mounted = true;
        fetch("/api/google/reviews")
            .then((r) => r.json())
            .then((json) => mounted && setReviewsMeta(json))
            .catch(() => mounted && setReviewsMeta(null));
        return () => {
            mounted = false;
        };
    }, []);

    const rating = (reviewsMeta?.rating ?? ratingFallback) as number;
    const total = (reviewsMeta?.total ?? totalFallback) as number;
    const googleUrl =
        reviewsMeta?.googleUrl ?? "https://www.google.com/maps?cid=13356030677811140771";

    const MODE_CONTENT: Record<
        Mode,
        {
            label: string;
            kicker: string;
            title: React.ReactNode;
            desc: React.ReactNode;
            bullets: { icon: React.ElementType; title: string; desc: string }[];
            ctaLabel: string;
            ctaHint: string;
        }
    > = {
        pacotes: {
            label: "Pacotes",
            kicker: "Recomendado para quem quer custo-benefício e previsibilidade",
            title: (
                <>
                    Pacotes Lavexpress são melhores porque entrega{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                        padrão profissional + previsibilidade
                    </span>{" "}
                    por peça.
                </>
            ),
            desc: (
                <>
                    Você não compra “lavagem”. Você compra{" "}
                    <strong>rotina resolvida</strong>: coleta, processo padronizado e entrega
                    no prazo — com preço por peça que faz sentido.
                </>
            ),
            bullets: [
                {
                    icon: Wallet,
                    title: "Preço por peça que vale a pena",
                    desc: `A partir de ${priceLabel}/peça nos pacotes. Mais barato do que parece quando você soma tempo, energia e produtos.`,
                },
                {
                    icon: Truck,
                    title: "Coleta e entrega previsíveis",
                    desc: `Lavar + Secar em ${slaWashDry}. Passadoria em ${slaIron}. Sem “talvez amanhã”.`,
                },
                {
                    icon: ShieldCheck,
                    title: "Processo padronizado (menos risco)",
                    desc: "Triagem e cuidado para reduzir manchas, encolhimento e desgaste. Roupa volta pronta para usar.",
                },
            ],
            ctaLabel: "Ver pacotes e agendar",
            ctaHint: "Sem fidelidade. Pagamento na entrega.",
        },

        avulso: {
            label: "Avulso",
            kicker: "Bom para emergências, pior para rotina",
            title: (
                <>
                    Avulso resolve hoje, mas custa caro na{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                        recorrência
                    </span>
                    .
                </>
            ),
            desc: (
                <>
                    Avulso parece “mais flexível”, mas você paga mais vezes e perde o
                    principal: <strong>previsibilidade</strong> e <strong>custo por peça</strong>.
                </>
            ),
            bullets: [
                {
                    icon: Wallet,
                    title: "Custo total maior no mês",
                    desc: "Quando vira rotina, o avulso costuma sair mais caro do que pacotes com preço por peça otimizado.",
                },
                {
                    icon: Clock,
                    title: "Menos previsível",
                    desc: "Na prática, você volta a depender de encaixe e disponibilidade. Pacote organiza seu fluxo.",
                },
                {
                    icon: Zap,
                    title: "Menos prioridade",
                    desc: "Pacotes tendem a receber atendimento mais consistente por planejamento de operação.",
                },
            ],
            ctaLabel: "Quero economizar com pacote",
            ctaHint: "Veja o melhor pacote para sua rotina em 30s.",
        },

        emcasa: {
            label: "Em casa",
            kicker: "O barato que sai caro quando você soma tudo",
            title: (
                <>
                    Lavar em casa não custa só dinheiro —
                    custa{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                        tempo e desgaste
                    </span>
                    .
                </>
            ),
            desc: (
                <>
                    Produto, energia, água, varal, clima, cheiro, máquina lotada e risco de
                    danificar peça. O “barato” vira custo invisível.
                </>
            ),
            bullets: [
                {
                    icon: Clock,
                    title: "Você perde horas por semana",
                    desc: "Separar, lavar, estender, recolher, dobrar, passar. Tempo que você não recupera.",
                },
                {
                    icon: ShieldCheck,
                    title: "Risco de manchas e encolhimento",
                    desc: "Mistura de tecidos e produtos errados são o caminho mais comum para estragar roupa boa.",
                },
                {
                    icon: Truck,
                    title: "Chuva e cheiro ruim",
                    desc: "Secagem inconsistente gera roupa úmida, cheiro e retrabalho. Processo profissional evita isso.",
                },
            ],
            ctaLabel: "Quero resolver isso hoje",
            ctaHint: "Agende e receba no prazo. Sem fidelidade.",
        },
    };

    const content = MODE_CONTENT[mode];

    return (
        <section className="relative overflow-hidden bg-white py-20 md:py-24">
            {/* Background premium (azul + verde) */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-28 left-1/2 h-[560px] w-[1100px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/14 to-emerald-500/12 blur-3xl" />
                <div className="absolute -bottom-32 left-[-160px] h-[520px] w-[520px] rounded-full bg-emerald-500/10 blur-3xl" />
                <div className="absolute -top-20 right-[-160px] h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />
            </div>

            <div className="container relative z-10 mx-auto px-4 md:px-6">
                <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
                    {/* LEFT */}
                    <motion.div
                        className="lg:col-span-7"
                        initial={{ opacity: 0, x: -18 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: reduceMotion ? 0 : 0.55 }}
                    >
                        {/* Proof strip */}
                        <div className="mb-5 flex flex-wrap items-center gap-3">
                            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-blue-700">
                                <BadgeCheck className="h-4 w-4" />
                                Padrão profissional
                            </div>

                            <a
                                href={googleUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                                title="Ver avaliações no Google"
                            >
                                <StarsRow value={5} />
                                <span>
                                    {String(rating).replace(".", ",")} no Google ({total})
                                </span>
                            </a>

                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
                                <Truck className="h-4 w-4" />
                                Coleta e entrega
                            </div>
                        </div>

                        <h2 className="text-balance text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
                            {content.title}
                        </h2>

                        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-slate-600">
                            {content.desc}
                        </p>

                        {/* Mode switch (simple, clear) */}
                        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                            {(["pacotes", "avulso", "emcasa"] as Mode[]).map((k) => {
                                const active = k === mode;
                                return (
                                    <button
                                        key={k}
                                        onClick={() => setMode(k)}
                                        className={[
                                            "h-12 rounded-2xl px-5 text-sm font-extrabold transition-all",
                                            "border",
                                            active
                                                ? "border-transparent bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg shadow-blue-600/20"
                                                : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
                                        ].join(" ")}
                                    >
                                        {MODE_CONTENT[k].label}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-3">
                            {content.bullets.map((b) => (
                                <Card
                                    key={b.title}
                                    className="rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur transition-transform hover:-translate-y-0.5 hover:shadow-md"
                                >
                                    <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-900">
                                        <b.icon className="h-5 w-5" />
                                    </div>
                                    <div className="text-sm font-extrabold text-slate-900">{b.title}</div>
                                    <div className="mt-1 text-sm leading-relaxed text-slate-600">
                                        {b.desc}
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Button
                                size="lg"
                                className="h-14 rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 px-8 text-lg font-extrabold shadow-lg shadow-blue-600/20 transition-all hover:from-blue-700 hover:to-emerald-700 hover:scale-[1.01]"
                                asChild
                            >
                                <Link href="/pacotes">
                                    {content.ctaLabel}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>

                            <div className="text-sm text-slate-600">
                                <div className="font-bold text-slate-800">{content.ctaHint}</div>
                                <div className="text-slate-500">
                                    Compare e experimente. Se fizer sentido, você continua.
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT: “Oferta” clara (sem confusão) */}
                    <motion.div
                        className="lg:col-span-5"
                        initial={{ opacity: 0, x: 18 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: reduceMotion ? 0 : 0.55, delay: 0.1 }}
                    >
                        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl p-7">
                            <div className="mb-6">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-600 text-white shadow-lg shadow-emerald-600/20">
                                    <Sparkles className="h-6 w-6" />
                                </div>

                                <div className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
                                    Decisão simples
                                </div>
                                <div className="mt-2 text-2xl font-extrabold text-slate-900">
                                    Pacote = melhor custo por peça + rotina no eixo
                                </div>
                                <div className="mt-2 text-sm text-slate-600">
                                    A partir de <span className="font-extrabold text-emerald-600">{priceLabel}/peça</span> nos pacotes.
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="font-extrabold text-slate-900">Prazo previsível</div>
                                        <div className="text-sm text-slate-600">
                                            Lavar + Secar em <strong>{slaWashDry}</strong>. Passadoria em <strong>{slaIron}</strong>.
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                        <Truck className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="font-extrabold text-slate-900">Coleta e entrega</div>
                                        <div className="text-sm text-slate-600">
                                            Você não perde tempo: é só agendar e receber pronto.
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-50 text-slate-900">
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="font-extrabold text-slate-900">Risco reduzido</div>
                                        <div className="text-sm text-slate-600">
                                            Processo padronizado e cuidado técnico para evitar retrabalho e desgaste.
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                                        <Zap className="h-4 w-4 text-emerald-600" />
                                        Experimente sem dor
                                    </div>
                                    <div className="mt-1 text-sm text-slate-600">
                                        Sem fidelidade e pagamento na entrega. Se você gostar, vira rotina.
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    className="h-12 rounded-2xl border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                                    asChild
                                >
                                    <Link href="/pacotes">
                                        Ver pacotes recomendados
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>

                                <div className="text-xs text-slate-500">
                                    Dica: o melhor pacote é o que mantém sua rotina previsível com custo por peça estável.
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
