import type { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PACOTES } from "@/lib/catalogo";
import { LAVEXPRESS } from "@/lib/lavexpress";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import {
    ArrowRight,
    CheckCircle2,
    Clock,
    MessageCircle,
    ShieldCheck,
    Sparkles,
    Truck,
    Star,
    Zap,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Pacotes | Lavexpress",
    description: "Pacotes Lavexpress: melhor custo-benefício por peça, com coleta e entrega grátis e padrão profissional. Escolha o ideal para sua rotina.",
};

function Stars({ rating = 4.7, count = 37 }: { rating?: number; count?: number }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold text-slate-700 shadow-sm">
            <div className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                ))}
            </div>
            <span>
                {String(rating).replace(".", ",")} no Google ({count})
            </span>
        </div>
    );
}

function formatBRL(n: number) {
    return n.toFixed(2).replace(".", ",");
}

type PackageItem = { pecas: number; valor: number; porPeca: number };

function PackageCard({
    title,
    description,
    profileLine,
    items,
    color,
    badge,
    icon: Icon,
}: {
    title: string;
    description: string;
    profileLine: string;
    items: PackageItem[];
    color: "blue" | "green" | "slate";
    badge?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
}) {
    const bestValue = items.reduce((prev, current) => (prev.porPeca < current.porPeca ? prev : current));
    const topRows = items.slice(0, 5);

    const colorStyles = {
        blue: {
            bg: "bg-blue-50",
            text: "text-blue-700",
            border: "border-blue-200",
            gradient: "from-blue-600 to-emerald-600",
            chip: "bg-blue-100 text-blue-800",
            button:
                "bg-gradient-to-r from-blue-600 to-emerald-600 hover:opacity-95 text-white shadow-lg",
            dot: "bg-blue-600",
        },
        green: {
            bg: "bg-emerald-50",
            text: "text-emerald-700",
            border: "border-emerald-200",
            gradient: "from-emerald-600 to-blue-600",
            chip: "bg-emerald-100 text-emerald-800",
            button:
                "bg-gradient-to-r from-emerald-600 to-blue-600 hover:opacity-95 text-white shadow-lg",
            dot: "bg-emerald-600",
        },
        slate: {
            bg: "bg-slate-50",
            text: "text-slate-800",
            border: "border-slate-200",
            gradient: "from-slate-900 to-slate-700",
            chip: "bg-slate-100 text-slate-800",
            button: "bg-slate-900 hover:bg-slate-800 text-white shadow-lg",
            dot: "bg-slate-900",
        },
    };

    const s = colorStyles[color] as typeof colorStyles["blue"];

    const wa = buildWhatsAppLink({
        phoneE164: LAVEXPRESS.whatsappE164,
        text: `Olá! Quero contratar o pacote ${title}. Pode me orientar com disponibilidade de coleta e como funciona?`,
    });

    return (
        <Card
            className={`group relative overflow-hidden rounded-3xl border ${s.border} bg-white shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl`}
        >
            {/* badge topo */}
            {badge && (
                <div className="absolute right-0 top-0 rounded-bl-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-sm">
                    {badge}
                </div>
            )}

            {/* faixa gradiente sutil */}
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.gradient} opacity-70`} />

            {/* header */}
            <div className={`p-6 md:p-8 ${s.bg}`}>
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ${s.text}`}>
                            <Icon className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className={`text-2xl font-extrabold ${s.text} leading-tight`}>{title}</h3>
                            <div className={`mt-1 inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold ${s.chip}`}>
                                Ideal para: {profileLine}
                            </div>
                        </div>
                    </div>
                </div>

                <p className="mt-4 text-sm md:text-[15px] text-slate-600 leading-relaxed max-w-[520px]">
                    {description}
                </p>

                {/* preço “âncora” */}
                <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm border border-white/50 ring-1 ring-slate-100 relative overflow-hidden">
                    <div className={`absolute inset-0 opacity-[0.04] bg-gradient-to-br ${s.gradient}`} />
                    <div className="relative">
                        <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                            Melhor custo por peça (neste pacote)
                        </div>
                        <div className="mt-2 flex items-baseline justify-between gap-4">
                            <div className="flex items-baseline gap-2">
                                <span className="text-sm font-extrabold text-slate-400">R$</span>
                                <span className={`text-5xl font-extrabold tracking-tight ${s.text}`}>
                                    {formatBRL(bestValue.porPeca)}
                                </span>
                                <span className="text-sm font-extrabold text-slate-500">/peça</span>
                            </div>
                            <div className="text-right">
                                <div className="text-xs font-bold text-slate-500">No pacote de</div>
                                <div className="text-lg font-extrabold text-slate-900">{bestValue.pecas} peças</div>
                            </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs">
                            <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 font-semibold text-slate-600">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                Sem fidelidade
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 font-semibold text-slate-600">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                Pagamentos facilitados
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 font-semibold text-slate-600">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                Validade 90 dias
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* body */}
            <div className="p-6 md:p-8">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-extrabold text-slate-900">Tabelas mais escolhidas</div>
                    <div className="text-xs font-semibold text-slate-500">Escolha no WhatsApp</div>
                </div>

                <div className="mt-4 space-y-3">
                    {topRows.map((item) => (
                        <div
                            key={item.pecas}
                            className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`h-2 w-2 rounded-full ${s.dot}`} />
                                <div className="font-extrabold text-slate-900">{item.pecas} peças</div>
                            </div>

                            <div className="text-right">
                                <div className="font-extrabold text-slate-900">
                                    R$ {formatBRL(item.valor)}
                                </div>
                                <div className="mt-0.5 inline-flex items-center gap-1 rounded-full border border-slate-100 bg-slate-50 px-2 py-0.5 text-xs font-extrabold text-slate-700">
                                    R$ {formatBRL(item.porPeca)}/peça
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-8">
                    <Button className={`w-full h-12 rounded-xl text-base font-extrabold transition-transform hover:scale-[1.01] ${s.button}`} asChild>
                        <a href={wa} target="_blank" rel="noreferrer">
                            <MessageCircle className="mr-2 h-5 w-5" />
                            Quero este pacote
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                    </Button>

                    <p className="mt-3 text-center text-xs text-slate-500">
                        Confirmação rápida no WhatsApp • Atendimento claro • Prazos previsíveis
                    </p>
                </div>
            </div>
        </Card>
    );
}

export default function PacotesPage() {
    const waHelp = buildWhatsAppLink({
        phoneE164: LAVEXPRESS.whatsappE164,
        text: "Olá! Quero uma recomendação do melhor pacote para minha rotina. Posso te dizer quantas peças uso por semana?",
    });

    return (
        <>
            <SiteHeader />

            <main className="min-h-screen bg-slate-50/50">
                {/* HERO */}
                <section className="relative pt-32 pb-16 overflow-hidden">
                    {/* glows */}
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -top-24 left-1/2 h-[520px] w-[1100px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/18 to-emerald-500/16 blur-3xl" />
                        <div className="absolute -bottom-40 left-[-180px] h-[520px] w-[520px] rounded-full bg-emerald-500/10 blur-3xl" />
                        <div className="absolute -top-32 right-[-180px] h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />
                    </div>

                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="text-center max-w-4xl mx-auto">
                            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                                <Badge
                                    variant="outline"
                                    className="border-blue-200 bg-blue-50 text-blue-700 px-4 py-1.5 text-sm font-extrabold rounded-full"
                                >
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Melhor custo-benefício + padrão profissional
                                </Badge>

                                <Stars rating={4.7} count={37} />

                                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-extrabold text-emerald-700 shadow-sm">
                                    <Truck className="h-4 w-4" />
                                    Coleta e entrega grátis
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight text-balance">
                                Pacotes que{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                                    organizam sua rotina
                                </span>{" "}
                                e reduzem o custo por peça.
                            </h1>

                            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed text-pretty">
                                Você não compra “lavagem”. Você compra{" "}
                                <strong>tempo livre</strong>, <strong>previsibilidade</strong> e{" "}
                                <strong>roupa impecável</strong> — com o padrão Lavexpress.
                            </p>

                            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button
                                    size="lg"
                                    className="h-14 px-10 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all font-extrabold text-lg"
                                    asChild
                                >
                                    <a href={waHelp} target="_blank" rel="noreferrer">
                                        Recomendar meu pacote
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </a>
                                </Button>

                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-14 px-10 rounded-xl border-slate-200 bg-white text-slate-900 hover:bg-slate-50 font-extrabold text-lg"
                                    asChild
                                >
                                    <a href="#pacotes">
                                        Ver pacotes disponíveis
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </a>
                                </Button>
                            </div>

                            {/* micro garantias (sem fricção) */}
                            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600">
                                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold shadow-sm">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                    Sem fidelidade
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold shadow-sm">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                    Pagamentos facilitados
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold shadow-sm">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                    Validade 90 dias
                                </span>
                            </div>
                        </div>

                        {/* Visual premium */}
                        <div className="relative mx-auto max-w-5xl mt-14">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/18 to-emerald-500/18 blur-3xl rounded-[3rem] -z-10" />
                            <div className="relative rounded-[2rem] overflow-hidden border border-white/50 shadow-2xl bg-white/80 backdrop-blur-sm">
                                <Image
                                    src="/imagens/hero-folded-new.png"
                                    alt="Roupas perfeitamente dobradas"
                                    width={1200}
                                    height={600}
                                    className="w-full h-[280px] md:h-[460px] object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8 md:p-12 justify-center text-center">
                                    <div className="text-white">
                                        <div className="text-sm font-semibold opacity-90 mb-2">Padrão Lavexpress</div>
                                        <div className="text-2xl md:text-3xl font-extrabold">
                                            Pronto para usar. Pronto para sua semana.
                                        </div>
                                        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                                            <Zap className="h-4 w-4" />
                                            Confirmação rápida no WhatsApp
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* POR QUE PACOTE (curto e convincente) */}
                <section className="py-12 bg-white border-y border-slate-100">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                            <Card className="p-6 rounded-2xl border-slate-200 bg-white shadow-sm">
                                <div className="flex items-start gap-3">
                                    <Truck className="h-5 w-5 text-emerald-600 mt-0.5" />
                                    <div>
                                        <div className="font-extrabold text-slate-900">Coleta e entrega grátis</div>
                                        <div className="text-sm text-slate-600">
                                            Buscamos e levamos na sua porta. Sem taxa adicional nos pacotes.
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 rounded-2xl border-slate-200 bg-white shadow-sm">
                                <div className="flex items-start gap-3">
                                    <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <div className="font-extrabold text-slate-900">Mais previsibilidade</div>
                                        <div className="text-sm text-slate-600">
                                            Você sabe quando coleta e quando recebe. Rotina organizada.
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 rounded-2xl border-slate-200 bg-white shadow-sm">
                                <div className="flex items-start gap-3">
                                    <ShieldCheck className="h-5 w-5 text-emerald-600 mt-0.5" />
                                    <div>
                                        <div className="font-extrabold text-slate-900">Padrão profissional</div>
                                        <div className="text-sm text-slate-600">
                                            Processo consistente para reduzir erro e desgaste das peças.
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 rounded-2xl border-slate-200 bg-white shadow-sm">
                                <div className="flex items-start gap-3">
                                    <Sparkles className="h-5 w-5 text-slate-900 mt-0.5" />
                                    <div>
                                        <div className="font-extrabold text-slate-900">Custo por peça menor</div>
                                        <div className="text-sm text-slate-600">
                                            Quanto mais peças, melhor o valor. Sem perder qualidade.
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* PACOTES */}
                <section id="pacotes" className="py-16">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <Badge
                                variant="outline"
                                className="mb-5 border-emerald-200 bg-emerald-50 text-emerald-700 px-4 py-1.5 text-sm font-extrabold rounded-full"
                            >
                                Escolha guiada
                            </Badge>

                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                                3 opções claras — para 3 rotinas diferentes
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                Se você não tiver certeza agora, clique em <strong>“Recomendar meu pacote”</strong> e
                                a gente te indica o ideal em poucos minutos no WhatsApp.
                            </p>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
                            <PackageCard
                                title="Lavar + Secar"
                                profileLine="dia a dia e família"
                                description="O essencial bem feito: roupas limpas, cheirosas e dobradas. Ideal para manter a semana em ordem sem complicação."
                                items={PACOTES.lavarSecar}
                                color="green"
                                badge="Mais escolhido"
                                icon={Sparkles}
                            />

                            <PackageCard
                                title="Completo"
                                profileLine="quem quer praticidade total"
                                description="Lavar, secar e passar com padrão consistente. Para quem quer pegar e usar — e não perder tempo com ferro."
                                items={PACOTES.lavarSecarPassar}
                                color="blue"
                                badge="Melhor experiência"
                                icon={ShieldCheck}
                            />

                            <PackageCard
                                title="Só Passar"
                                profileLine="quem lava em casa"
                                description="Você cuida da lavagem e a gente resolve o mais chato: roupas alinhadas e prontas para usar no dia a dia."
                                items={PACOTES.passar}
                                color="slate"
                                icon={Clock}
                            />
                        </div>

                        {/* CTA final */}
                        <div className="mt-16 text-center">
                            <h3 className="text-2xl font-extrabold text-slate-900 mb-4">
                                Quer que a gente recomende o pacote certo para você?
                            </h3>
                            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                                Você só me diz quantas peças usa por semana e se quer passar ou não. Eu te respondo com a melhor opção e o melhor custo-benefício.
                            </p>

                            <Button
                                size="lg"
                                className="h-14 px-10 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all font-extrabold text-lg"
                                asChild
                            >
                                <a href={waHelp} target="_blank" rel="noreferrer">
                                    Recomendar meu pacote
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </a>
                            </Button>

                            <p className="mt-4 text-xs text-slate-500">
                                Sem fidelidade • Pagamentos facilitados • Validade 90 dias
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </>
    );
}
