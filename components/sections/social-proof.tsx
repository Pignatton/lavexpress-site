"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Star, MapPin, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const REVIEWS = [
    {
        name: "Orondino Martins",
        initial: "O",
        bg: "bg-blue-600",
        text: "Eu sou muito bem atendido, um serviço profissional e afetuoso.",
        stars: 5,
        date: "há um mês",
    },
    {
        name: "Francisco Moreira",
        initial: "F",
        bg: "bg-emerald-600",
        text: "Excelente qualidade na lavagem e no atendimento. Recomendo muito!",
        stars: 5,
        date: "há 2 meses",
    },
    {
        name: "Admir Martins",
        initial: "A",
        bg: "bg-purple-600",
        text: "Serviço de primeira. Minhas camisas voltam impecáveis. Virei cliente fiel.",
        stars: 5,
        date: "há 3 meses",
    },
    {
        name: "Silvia Cristina",
        initial: "S",
        bg: "bg-orange-500",
        text: "Facilitou minha vida. Buscam e entregam no prazo combinado. Adoro!",
        stars: 5,
        date: "há um mês",
    },
    {
        name: "Carlos Monteiro",
        initial: "C",
        bg: "bg-slate-600",
        text: "Preço justo e roupas muito bem cuidadas. O atendimento é nota 10.",
        stars: 5,
        date: "há 4 meses",
    },
];

export function SocialProof() {
    return (
        <section className="bg-slate-950 py-20 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold text-white md:text-5xl">
                        O que nossos <span className="text-emerald-500">clientes dizem</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-400">
                        Confira avaliações reais sobre a qualidade e agilidade da Lavexpress.
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative -mx-4 mb-20 overflow-hidden px-4 md:mx-0 md:px-0">
                    <div className="flex gap-4 overflow-x-auto pb-8 pt-4 sm:gap-6 snap-x snap-mandatory scrollbar-hide">
                        {/* Summary Card */}
                        <div className="min-w-[280px] max-w-[280px] shrink-0 snap-center md:min-w-[320px] md:max-w-[320px]">
                            <Card className="flex h-full flex-col justify-center rounded-2xl border-none bg-slate-900 p-8 text-center shadow-2xl">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white p-2">
                                    {/* Logo Placeholder or G icon */}
                                    <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.25 17.21 15.81 18.11V21.09H19.62C21.85 19.09 23.49 16.04 23.49 12.275Z" fill="#4285F4" />
                                        <path d="M12 24C15.24 24 17.97 21.92 19.96 18.96L16.15 15.97C15.07 16.69 13.69 17.14 12 17.14C8.87 17.14 6.22 15.04 5.28 12.21H1.34V15.27C3.35 19.27 7.42 22 12 22Z" fill="#34A853" />
                                        <path d="M5.28 12.21C5.03 11.46 4.89 10.66 4.89 9.84C4.89 9.01 5.03 8.21 5.28 7.46V4.4H1.34C0.48 6.11 0 8.04 0 9.84C0 11.63 0.48 13.56 1.34 15.27L5.28 12.21Z" fill="#FBBC05" />
                                        <path d="M12 2.85C13.77 2.85 15.35 3.46 16.6 4.65L18.66 2.59C16.97 1.02 14.68 0 12 0C7.42 0 3.35 2.73 1.34 6.73L5.28 9.79C6.22 6.96 8.87 4.85 12 4.85V2.85Z" fill="#EA4335" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-white">Lavexpress Lavanderia</h3>
                                <div className="mt-2 flex justify-center gap-1 text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-current" />
                                    ))}
                                </div>
                                <p className="mt-2 text-sm text-slate-400">4.8 de 5 estrelas</p>
                                <p className="text-xs text-slate-500">36 avaliações no Google</p>

                                <Button variant="outline" className="mt-6 w-full border-slate-700 bg-transparent text-white hover:bg-slate-800 hover:text-white">
                                    Escreva sua avaliação
                                </Button>
                            </Card>
                        </div>

                        {/* Reviews */}
                        {REVIEWS.map((review, i) => (
                            <div key={i} className="min-w-[300px] max-w-[300px] shrink-0 snap-center md:min-w-[340px] md:max-w-[340px]">
                                <Card className="flex h-full flex-col justify-between rounded-2xl border-none bg-white p-6 shadow-xl transition-transform hover:-translate-y-1">
                                    <div>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${review.bg} text-sm font-bold text-white`}>
                                                    {review.initial}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900">{review.name}</div>
                                                    <div className="text-xs text-slate-500">{review.date}</div>
                                                </div>
                                            </div>
                                            <svg viewBox="0 0 24 24" className="h-5 w-5 opacity-80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.25 17.21 15.81 18.11V21.09H19.62C21.85 19.09 23.49 16.04 23.49 12.275Z" fill="#4285F4" />
                                                <path d="M12 24C15.24 24 17.97 21.92 19.96 18.96L16.15 15.97C15.07 16.69 13.69 17.14 12 17.14C8.87 17.14 6.22 15.04 5.28 12.21H1.34V15.27C3.35 19.27 7.42 22 12 22Z" fill="#34A853" />
                                                <path d="M5.28 12.21C5.03 11.46 4.89 10.66 4.89 9.84C4.89 9.01 5.03 8.21 5.28 7.46V4.4H1.34C0.48 6.11 0 8.04 0 9.84C0 11.63 0.48 13.56 1.34 15.27L5.28 12.21Z" fill="#FBBC05" />
                                                <path d="M12 2.85C13.77 2.85 15.35 3.46 16.6 4.65L18.66 2.59C16.97 1.02 14.68 0 12 0C7.42 0 3.35 2.73 1.34 6.73L5.28 9.79C6.22 6.96 8.87 4.85 12 4.85V2.85Z" fill="#EA4335" />
                                            </svg>
                                        </div>

                                        <div className="mt-3 flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-current" />
                                            ))}
                                            <span className="ml-2 h-4 w-4 text-blue-500">
                                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                                            </span>
                                        </div>

                                        <p className="mt-3 text-sm leading-relaxed text-slate-700">
                                            &quot;{review.text}&quot;
                                        </p>
                                    </div>

                                    <div className="mt-4 border-t border-slate-100 pt-3">
                                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                                                <Quote className="h-3 w-3" />
                                            </div>
                                            Resposta do proprietário
                                        </div>
                                        <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                                            Muito obrigado pela confiança, {review.name.split(" ")[0]}! Conte sempre com a gente.
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Map Section */}
                <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
                    <div className="relative h-[400px] w-full bg-slate-800">
                        {/* Google Maps Embed */}
                        <iframe
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://maps.google.com/maps?q=-20.2624864,-40.2649145+(Lavexpress+Lavanderia)&z=16&output=embed"
                            title="Localização Lavexpress"
                            className="grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
                        ></iframe>

                        {/* Overlay Gradient for smooth integration */}
                        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl" />
                    </div>
                    <div className="bg-slate-900 p-6 md:flex md:items-center md:justify-between">
                        <div className="flex items-center gap-3 text-white">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
                                <MapPin className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="font-bold">Lavexpress Lavanderia</div>
                                <div className="text-sm text-slate-400">Atendemos Vitória, Serra e Vila Velha</div>
                            </div>
                        </div>
                        <Button className="mt-4 w-full bg-emerald-600 text-white hover:bg-emerald-700 md:mt-0 md:w-auto" asChild>
                            <a href="https://maps.app.goo.gl/4zTs2pvDrav3F37v8" target="_blank" rel="noreferrer">
                                Ver no Google Maps
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
