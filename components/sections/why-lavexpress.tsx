import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Sparkles, Clock, Wallet, ArrowRight } from "lucide-react";

type Pillar = {
    title: string;
    desc: string;
    icon: React.ElementType;
    tone: "blue" | "green";
};

const PILLARS: Pillar[] = [
    {
        title: "Fim das roupas danificadas",
        desc: "Processo profissional para preservar suas peças. Adeus, roupas encolhidas, manchadas ou mal cuidadas em casa.",
        icon: ShieldCheck,
        tone: "blue",
    },
    {
        title: "Sua semana livre de verdade",
        desc: "Pare de perder tempo lavando e passando. Receba tudo pronto para usar e foque no que realmente importa.",
        icon: Sparkles,
        tone: "green",
    },
    {
        title: "Zero imprevistos",
        desc: "Sem “talvez amanhã”. Você tem prazos claros e rotina organizada com coleta e entrega combinadas.",
        icon: Clock,
        tone: "blue",
    },
    {
        title: "Economia na ponta do lápis",
        desc: "Somando produtos, energia e seu tempo, lavar em casa custa caro. Pacotes trazem economia real.",
        icon: Wallet,
        tone: "green",
    },
];

function toneStyles(tone: Pillar["tone"]) {
    if (tone === "green") {
        return {
            iconText: "text-emerald-700",
            iconBg: "bg-emerald-50",
            ring: "group-hover:ring-emerald-200",
            topBar: "from-emerald-500 to-blue-500",
        };
    }
    return {
        iconText: "text-blue-700",
        iconBg: "bg-blue-50",
        ring: "group-hover:ring-blue-200",
        topBar: "from-blue-500 to-emerald-500",
    };
}

export function WhyLavexpress() {
    return (
        <section className="relative overflow-hidden bg-slate-50/60 py-20 md:py-24">
            {/* Background (premium, leve) */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/12 to-emerald-500/10 blur-3xl" />
                <div className="absolute -bottom-28 left-[-140px] h-[520px] w-[520px] rounded-full bg-emerald-500/10 blur-3xl" />
                <div className="absolute -top-10 right-[-140px] h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />
            </div>

            <div className="container relative mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
                    <div className="mx-auto inline-flex items-center rounded-full border border-blue-200 bg-white/80 px-4 py-1.5 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur">
                        Benefícios reais
                    </div>

                    <h2 className="mt-6 text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                        Chega de perder tempo (e roupas) em casa.
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
                        Deixe a Lavexpress cuidar de tudo com processo profissional, previsibilidade e custo-benefício.
                        Você ganha tempo, preserva suas peças e mantém a rotina organizada.
                    </p>
                </div>

                {/* Grid */}
                <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {PILLARS.map((p) => {
                        const Icon = p.icon;
                        const s = toneStyles(p.tone);

                        return (
                            <Card
                                key={p.title}
                                className={[
                                    "group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
                                    "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(0,0,0,0.10)]",
                                    "focus-within:ring-4 focus-within:ring-blue-200/30",
                                ].join(" ")}
                            >
                                {/* Top accent bar (marca) */}
                                <div
                                    className={[
                                        "absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-90",
                                        s.topBar,
                                    ].join(" ")}
                                />

                                {/* Subtle inner border */}
                                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-slate-200/50" />

                                <CardContent className="relative flex h-full flex-col items-center p-7 text-center md:p-8">
                                    {/* Icon */}
                                    <div
                                        className={[
                                            "mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl shadow-inner",
                                            s.iconBg,
                                            s.iconText,
                                            "ring-0 ring-offset-0 transition-transform duration-300 group-hover:scale-[1.06]",
                                            "ring-4 ring-transparent",
                                            s.ring,
                                        ].join(" ")}
                                    >
                                        <Icon className="h-8 w-8" aria-hidden="true" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold leading-snug text-slate-900 md:text-xl">
                                        {p.title}
                                    </h3>

                                    {/* Desc */}
                                    <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-[15px]">
                                        {p.desc}
                                    </p>

                                    {/* Micro footer line */}
                                    <div className="mt-5 h-px w-12 bg-gradient-to-r from-blue-500/40 to-emerald-500/40" />
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Section CTA (CRO: fecha e empurra para próxima ação) */}
                <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center justify-center gap-3 text-center md:mt-14">
                    <p className="text-sm text-slate-600 md:text-base">
                        Quer que a gente recomende o melhor pacote para o seu volume?
                    </p>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Link
                            href="/pacotes"
                            className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                        >
                            Ver Pacotes Lavexpress
                            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                        </Link>

                        <Link
                            href="/contato"
                            className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 px-5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(11,92,255,0.18)] transition hover:brightness-[0.98]"
                        >
                            Agendar agora
                            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>

                    <div className="text-xs text-slate-500">
                        Processo profissional • Prazos previsíveis • Custo-benefício
                    </div>
                </div>
            </div>
        </section>
    );
}
