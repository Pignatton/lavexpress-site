import type { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
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
    title: "Passadoria Profissional | Lavexpress",
    description:
        "Passadoria profissional com acabamento impecável e padrão de lavanderia profissional. Ganhe tempo e receba roupas prontas para vestir. Coleta e entrega em Vitória/ES.",
};

/**
 * ✅ Menor preço por peça dentro de PACOTES COM PASSADORIA (Lavar + Secar + Passar)
 * Pelo seu próprio critério: "Passadoria nunca abaixo de R$ 4,40/peça".
 */
const STARTING_PRICE = 4.40;

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

function Pill({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold shadow-sm text-sm text-slate-700">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            {children}
        </span>
    );
}

function formatBRL(value: number) {
    return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function PassadoriaPage() {
    const waAgendar = buildWhatsAppLink({
        phoneE164: LAVEXPRESS.whatsappE164,
        text:
            "Olá! Quero passadoria (de preferência no pacote com passadoria). Pode me informar as opções e o valor por peça? (Quantidade: ___ / Bairro: ___)",
    });

    const waDuvidas = buildWhatsAppLink({
        phoneE164: LAVEXPRESS.whatsappE164,
        text:
            "Olá! Tenho dúvidas sobre passadoria (prazo, tipo de peça e pacote com passadoria). Pode me orientar?",
    });

    return (
        <>
            <SiteHeader />

            <main className="min-h-screen bg-slate-50/50">
                {/* HERO */}
                <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 overflow-hidden">
                    {/* glows */}
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -top-24 left-1/2 h-[520px] w-[1100px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/18 to-emerald-500/16 blur-3xl" />
                        <div className="absolute -bottom-40 left-[-180px] h-[520px] w-[520px] rounded-full bg-emerald-500/10 blur-3xl" />
                        <div className="absolute -top-32 right-[-180px] h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />
                    </div>

                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* LEFT */}
                            <div>
                                <div className="flex flex-wrap items-center gap-3 mb-6">
                                    <Badge
                                        variant="outline"
                                        className="border-blue-200 bg-blue-50 text-blue-700 px-4 py-1.5 text-sm font-extrabold rounded-full"
                                    >
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        Passadoria Profissional
                                    </Badge>

                                    <Stars rating={4.7} count={37} />

                                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-extrabold text-emerald-700 shadow-sm">
                                        <Truck className="h-4 w-4" />
                                        Coleta e entrega (consulte área)
                                    </div>

                                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold text-slate-700 shadow-sm">
                                        <Clock className="h-4 w-4 text-blue-600" />
                                        Jardim Camburi • Vitória/ES
                                    </div>
                                </div>

                                <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-4 md:mb-6 leading-tight text-balance">
                                    Roupas{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                                        prontas para vestir
                                    </span>{" "}
                                    com acabamento de lavanderia profissional.
                                </h1>

                                <p className="text-base md:text-lg lg:text-xl text-slate-600 mb-6 md:mb-8 leading-relaxed text-pretty">
                                    Se você usa <strong>camisa, uniforme, roupa social</strong> ou precisa estar bem apresentado todo dia,
                                    a passadoria não pode ser &quot;mais ou menos&quot;. A Lavexpress entrega <strong>padrão consistente</strong>,
                                    sem você perder horas passando em casa.
                                </p>

                                {/* VALUE STRIP (oferta clara) */}
                                <div className="flex flex-wrap items-center gap-3 mb-6">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-900 shadow-sm">
                                        <span className="text-slate-500 font-bold">A partir de</span>
                                        <span className="text-blue-600">R$ {formatBRL(STARTING_PRICE)}/peça</span>
                                        <span className="text-slate-500 font-bold hidden sm:inline">no pacote com passadoria</span>
                                    </div>

                                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-extrabold text-blue-700 shadow-sm">
                                        <ShieldCheck className="h-4 w-4" />
                                        Acabamento profissional
                                    </div>

                                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-extrabold text-emerald-700 shadow-sm">
                                        <Zap className="h-4 w-4" />
                                        Melhor custo-benefício
                                    </div>
                                </div>

                                {/* bullets (conversão) */}
                                <div className="grid gap-3 mb-6 md:mb-8">
                                    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                        <Sparkles className="h-5 w-5 text-emerald-600 mt-0.5" />
                                        <div>
                                            <div className="font-extrabold text-slate-900">Visual impecável (de verdade)</div>
                                            <div className="text-sm text-slate-600">
                                                Colarinhos alinhados, punhos bem feitos e acabamento limpo — padrão de lavanderia, não &quot;ferro correndo&quot;.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                        <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                                        <div>
                                            <div className="font-extrabold text-slate-900">Você ganha tempo e rotina</div>
                                            <div className="text-sm text-slate-600">
                                                Chega de separar roupa para passar no domingo. Você recebe pronto e sua semana &quot;anda&quot;.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                        <Truck className="h-5 w-5 text-emerald-600 mt-0.5" />
                                        <div>
                                            <div className="font-extrabold text-slate-900">Pronto para guardar (ou sair)</div>
                                            <div className="text-sm text-slate-600">
                                                Entrega organizada, para você guardar rápido ou já sair usando. Menos bagunça, mais praticidade.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        size="lg"
                                        className="h-12 md:h-14 px-6 md:px-10 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all font-extrabold text-base md:text-lg"
                                        asChild
                                    >
                                        <a href={waAgendar} target="_blank" rel="noreferrer">
                                            <span className="hidden sm:inline">Quero o pacote com passadoria</span>
                                            <span className="sm:hidden">Pacote + Passadoria</span>
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </a>
                                    </Button>

                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="h-12 md:h-14 px-6 md:px-10 rounded-xl border-slate-200 bg-white text-slate-900 hover:bg-slate-50 font-extrabold text-base md:text-lg"
                                        asChild
                                    >
                                        <a href={waDuvidas} target="_blank" rel="noreferrer">
                                            <span className="hidden sm:inline">Tirar dúvidas</span>
                                            <span className="sm:hidden">Dúvidas</span>
                                            <MessageCircle className="ml-2 h-5 w-5" />
                                        </a>
                                    </Button>
                                </div>

                                {/* micro garantias */}
                                <div className="mt-6 flex flex-wrap items-center gap-3">
                                    <Pill>Preço por peça previsível</Pill>
                                    <Pill>Qualidade conferida</Pill>
                                    <Pill>Ideal para rotina</Pill>
                                </div>

                                <p className="mt-4 text-xs text-slate-500">
                                    Observação: &quot;a partir de&quot; refere-se ao melhor custo por peça nos pacotes com passadoria. Valor varia por tipo de peça e quantidade.
                                </p>
                            </div>

                            {/* RIGHT: Visual Card */}
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 blur-3xl rounded-[3rem] -z-10" />
                                <div className="relative rounded-[2rem] overflow-hidden border border-white/60 shadow-2xl bg-white/80 backdrop-blur-sm">
                                    <Image
                                        src="/images/passadoria_hero_premium_1767392413417.png"
                                        alt="Roupas perfeitamente passadas"
                                        width={800}
                                        height={600}
                                        className="w-full h-auto object-cover"
                                        priority
                                    />

                                    {/* Price Tag Overlay */}
                                    <div className="absolute bottom-3 right-3 md:bottom-6 md:right-6 bg-white/95 backdrop-blur rounded-xl md:rounded-2xl p-3 md:p-4 shadow-xl border border-slate-100 max-w-[210px] md:max-w-[280px]">
                                        <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                                            Melhor custo no pacote
                                        </div>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-xs md:text-sm font-bold text-slate-400">R$</span>
                                            <span className="text-3xl md:text-4xl font-extrabold text-slate-900">
                                                {String(STARTING_PRICE).replace(".", ",")}
                                            </span>
                                            <span className="text-xs md:text-sm font-bold text-slate-400">/peça</span>
                                        </div>
                                        <div className="mt-1.5 md:mt-2 text-[10px] md:text-xs text-slate-600 font-semibold leading-tight">
                                            No pacote com passadoria (quanto mais peças, melhor).
                                        </div>
                                        <div className="mt-2 md:mt-3 text-[10px] md:text-xs text-emerald-700 font-extrabold flex items-center gap-1">
                                            <CheckCircle2 className="h-3 w-3" />
                                            <span className="hidden md:inline">Acabamento Profissional</span>
                                            <span className="md:hidden">Acabamento top</span>
                                        </div>
                                    </div>
                                </div>

                                {/* mini "checklist incluso" */}
                                <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {[
                                        { title: "Passadoria", desc: "padrão profissional" },
                                        { title: "Conferência", desc: "peça por peça" },
                                        { title: "Organização", desc: "pronto p/ usar" },
                                    ].map((it) => (
                                        <Card key={it.title} className="p-4 rounded-2xl border-slate-100 bg-white shadow-sm">
                                            <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Incluso</div>
                                            <div className="mt-1 font-extrabold text-slate-900">{it.title}</div>
                                            <div className="text-xs text-slate-600 font-medium">{it.desc}</div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* BENEFITS */}
                <section className="py-12 md:py-16 bg-white border-y border-slate-100">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <Badge
                                variant="outline"
                                className="mb-4 border-slate-200 bg-white text-slate-700 px-4 py-1.5 text-sm font-extrabold rounded-full"
                            >
                                Por que pacote com passadoria converte mais?
                            </Badge>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 md:mb-4">
                                Porque você compra &quot;rotina pronta&quot;, não só passadoria
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                No avulso, você paga toda vez e decide toda vez. No pacote, você garante{" "}
                                <strong>preço por peça</strong>, previsibilidade e padrão semanal.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                            <Card className="p-6 md:p-8 rounded-2xl md:rounded-3xl border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all group">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-blue-600 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                                    <ShieldCheck className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Preço por peça</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Você sabe quanto está pagando e consegue comparar. Transparência aumenta confiança e decisão.
                                </p>
                            </Card>

                            <Card className="p-6 md:p-8 rounded-2xl md:rounded-3xl border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all group">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-emerald-600 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                                    <Clock className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Menos decisões</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Você não &quot;pensa&quot; em passadoria: sua roupa volta pronta e ponto. Isso vira hábito.
                                </p>
                            </Card>

                            <Card className="p-6 md:p-8 rounded-2xl md:rounded-3xl border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all group">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-purple-600 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                                    <Truck className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Praticidade total</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Coleta e entrega, com padrão repetível. Cliente fica porque simplifica a vida.
                                </p>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-12 md:py-16 bg-white border-t border-slate-100">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 md:mb-4">
                                Dúvidas rápidas
                            </h2>
                            <p className="text-slate-600">Sem enrolação: para você decidir rápido.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                            {[
                                {
                                    q: "Esse valor é avulso?",
                                    a: `Não. "A partir de R$ ${formatBRL(STARTING_PRICE)}/peça" é no pacote com passadoria (melhor custo por peça). No WhatsApp informamos a opção ideal para sua quantidade.`,
                                },
                                {
                                    q: "Qual o prazo?",
                                    a: "Em média 2 a 3 dias úteis. Confirmamos antes de fechar, para você não ficar sem roupa.",
                                },
                                {
                                    q: "Passam qualquer tecido?",
                                    a: "Sim. Ajustamos temperatura e cuidado por tipo de tecido para manter o acabamento sem agredir a peça.",
                                },
                                {
                                    q: "Por que pacote vale mais?",
                                    a: "Porque você ganha previsibilidade: preço por peça, menos decisões e padrão semanal. É o tipo de serviço que vira indispensável.",
                                },
                            ].map((item) => (
                                <Card key={item.q} className="p-6 rounded-2xl border-slate-100 bg-slate-50/50">
                                    <div className="font-extrabold text-slate-900 mb-2">{item.q}</div>
                                    <div className="text-sm text-slate-600 leading-relaxed">{item.a}</div>
                                </Card>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <Button
                                size="lg"
                                className="h-12 md:h-14 px-6 md:px-10 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all font-extrabold text-base md:text-lg"
                                asChild
                            >
                                <a href={waAgendar} target="_blank" rel="noreferrer">
                                    <span className="hidden sm:inline">Quero meu pacote com passadoria</span>
                                    <span className="sm:hidden">Quero o pacote</span>
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </>
    );
}
