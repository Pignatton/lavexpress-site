"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowRight,
    Sparkles,
    CheckCircle2,
    XCircle,
    Clock,
    Wallet,
    Shirt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

type Props = {
    pricePerPieceFrom?: number;
    showImage?: boolean;
    slaWashDry?: string; // ex: "24–48h"
    slaIron?: string; // ex: "4–5 dias úteis"
};

function formatBRL(v: number) {
    return `R$ ${v.toFixed(2).replace(".", ",")}`;
}

function scrollToPlans() {
    const el = document.getElementById("planos");
    if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

export function PackagesValue({
    pricePerPieceFrom = 4.4,
    showImage = true,
    slaWashDry = "24–48h",
    slaIron = "4–5 dias úteis",
}: Props) {
    const reduceMotion = useReducedMotion();
    const priceLabel = formatBRL(pricePerPieceFrom);

    return (
        <section className="relative overflow-hidden bg-white py-20 md:py-24">
            {/* Background premium (azul + verde) */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/12 to-emerald-500/10 blur-3xl" />
                <div className="absolute -bottom-28 left-[-140px] h-[520px] w-[520px] rounded-full bg-emerald-500/10 blur-3xl" />
                <div className="absolute -top-16 right-[-140px] h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />
            </div>

            <div className="container relative z-10 mx-auto px-4 md:px-6">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* LEFT: Copy & Value Props */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: reduceMotion ? 0 : 0.6 }}
                    >
                        {/* Pill */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100/50 px-4 py-2 text-sm font-bold uppercase tracking-wider text-blue-700">
                            <Sparkles className="h-4 w-4" aria-hidden="true" />
                            <span>Economia real + padrão profissional</span>
                        </div>

                        <h2 className="mb-5 text-balance text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
                            Você não paga só por lavar.
                            <br />
                            Você paga por{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                                tempo livre + roupa impecável
                            </span>
                            .
                        </h2>

                        <p className="mb-8 max-w-2xl text-pretty text-lg leading-relaxed text-slate-600">
                            Lavar em casa parece “barato” — até você somar <strong>produtos</strong>, <strong>energia</strong>, <strong>tempo</strong> e o risco de estragar suas peças.
                            Nos pacotes Lavexpress, você tem processo profissional, prazo previsível e custo-benefício de verdade.
                        </p>

                        {/* Value Cards Row */}
                        <div className="mb-10 grid gap-4 sm:grid-cols-3">
                            <Card className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white/80 p-4 text-center shadow-sm backdrop-blur transition-transform hover:scale-105">
                                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <Wallet className="h-5 w-5" />
                                </div>
                                <div className="text-sm font-bold text-slate-900">A partir de</div>
                                <div className="text-2xl font-extrabold text-blue-700">{priceLabel}</div>
                                <div className="text-xs text-slate-500">/peça nos pacotes</div>
                            </Card>

                            <Card className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white/80 p-4 text-center shadow-sm backdrop-blur transition-transform hover:scale-105">
                                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div className="text-sm font-bold text-slate-900">Economize</div>
                                <div className="text-2xl font-extrabold text-emerald-700">10h+</div>
                                <div className="text-xs text-slate-500">livres por mês</div>
                            </Card>

                            <Card className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white/80 p-4 text-center shadow-sm backdrop-blur transition-transform hover:scale-105">
                                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                                    <Shirt className="h-5 w-5" />
                                </div>
                                <div className="text-sm font-bold text-slate-900">Roupas</div>
                                <div className="text-2xl font-extrabold text-purple-700">Novas</div>
                                <div className="text-xs text-slate-500">por muito mais tempo</div>
                            </Card>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Button
                                size="lg"
                                className="h-14 rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 px-8 text-lg font-bold shadow-lg shadow-blue-600/20 transition-all hover:from-blue-700 hover:to-emerald-700 hover:scale-[1.02]"
                                onClick={scrollToPlans}
                            >
                                Ver Pacotes Lavexpress
                                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                            </Button>
                        </div>
                    </motion.div>

                    {/* RIGHT: Comparison Table */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
                            {/* Header */}
                            <div className="grid grid-cols-2 border-b border-slate-100">
                                <div className="bg-slate-50 p-6 text-center">
                                    <div className="text-sm font-bold uppercase tracking-wider text-slate-500">Em Casa</div>
                                    <div className="mt-1 text-xl font-bold text-slate-700">Dor de Cabeça</div>
                                </div>
                                <div className="relative bg-gradient-to-br from-blue-600 to-emerald-600 p-6 text-center text-white">
                                    <div className="text-sm font-bold uppercase tracking-wider text-blue-100">Lavexpress</div>
                                    <div className="mt-1 text-xl font-bold">Vida Livre</div>
                                    {/* Badge */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-yellow-900 shadow-sm">
                                        Recomendado
                                    </div>
                                </div>
                            </div>

                            {/* Rows */}
                            <div className="divide-y divide-slate-100">
                                {[
                                    { label: "Produtos e Sabão", home: "Você compra e carrega", pro: "Incluso (Profissional)" },
                                    { label: "Tempo Gasto", home: "Lavar, estender, dobrar...", pro: "Zero (Só agendar)" },
                                    { label: "Risco de Manchas", home: "Alto (Misturar peças)", pro: "Zero (Triagem técnica)" },
                                    { label: "Dias de Chuva", home: "Roupa úmida e cheiro ruim", pro: "Secagem perfeita sempre" },
                                    { label: "Acabamento", home: "Amassado ou trabalhoso", pro: "Dobrado e Passado" },
                                ].map((item, i) => (
                                    <div key={i} className="grid grid-cols-2 text-sm">
                                        <div className="flex flex-col items-center justify-center bg-slate-50/50 p-4 text-center text-slate-600">
                                            <XCircle className="mb-2 h-6 w-6 text-red-400" />
                                            <span>{item.home}</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center bg-white p-4 text-center font-medium text-slate-800">
                                            <CheckCircle2 className="mb-2 h-6 w-6 text-emerald-500" />
                                            <span>{item.pro}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="bg-slate-50 p-6 text-center">
                                <p className="text-sm text-slate-600">
                                    Pare de perder tempo. Deixe quem entende cuidar das suas roupas.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
