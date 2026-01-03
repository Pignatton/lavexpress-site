"use client";

import { CalendarCheck, Truck, Sparkles, Shirt } from "lucide-react";

const STEPS = [
    {
        icon: CalendarCheck,
        title: "1. Agende em Segundos",
        description: "Chame no WhatsApp ou agende pelo site. É rápido, fácil e você escolhe o melhor horário.",
        color: "text-blue-600",
        bg: "bg-blue-50",
    },
    {
        icon: Truck,
        title: "2. Coleta Grátis",
        description: "Buscamos suas roupas na sua porta, no horário combinado. Sem taxas extras para a nossa área.",
        color: "text-emerald-600",
        bg: "bg-emerald-50",
    },
    {
        icon: Sparkles,
        title: "3. Cuidado Profissional",
        description: "Suas peças passam por um processo rigoroso de lavagem, secagem e passadoria com produtos premium.",
        color: "text-purple-600",
        bg: "bg-purple-50",
    },
    {
        icon: Shirt,
        title: "4. Entrega Expressa",
        description: "Receba tudo limpo, cheiroso e dobrado/pendurado em até 24h (consulte disponibilidade).",
        color: "text-indigo-600",
        bg: "bg-indigo-50",
    },
];

export function HowItWorks() {
    return (
        <section className="py-24 bg-white relative overflow-hidden" id="como-funciona">
            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900 mb-4">
                        Como funciona a Lavexpress?
                    </h2>
                    <p className="text-lg text-slate-600">
                        Simplificamos sua rotina em 4 passos simples. Você não precisa nem sair de casa.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-100 via-emerald-100 to-indigo-100 -z-10" />

                    {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="relative flex flex-col items-center text-center group">
                                <div className={`w-24 h-24 rounded-2xl ${step.bg} flex items-center justify-center mb-6 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md`}>
                                    <Icon className={`w-10 h-10 ${step.color}`} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
