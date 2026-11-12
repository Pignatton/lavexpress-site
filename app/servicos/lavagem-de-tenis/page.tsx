import type { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LAVEXPRESS } from "@/lib/lavexpress";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppLink } from "@/components/whatsapp-link";
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
    title: "Lavagem de Tênis | Lavexpress",
    description:
        "Lavagem de tênis e calçados na Lavexpress, em Jardim Camburi: avaliação do material e orçamento antes de fechar. Coleta e entrega em Vitória/ES: consulte as condições.",
};

function Stars({ rating = LAVEXPRESS.google.rating, count = LAVEXPRESS.google.reviews }: { rating?: number; count?: number }) {
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

export default function SneakersPage() {
    const waAgendar = buildWhatsAppLink({
        phoneE164: LAVEXPRESS.whatsappE164,
        text:
            "Olá! Quero lavar meus tênis. Pode me dizer como funciona a coleta e o prazo aproximado? (Material: ___ / Cor: ___ / Estado: ___)",
    });

    const waDuvidas = buildWhatsAppLink({
        phoneE164: LAVEXPRESS.whatsappE164,
        text:
            "Olá! Tenho dúvidas sobre a lavagem de tênis (camurça/branco/odor). Pode me orientar?",
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
                                        Spa de Calçados
                                    </Badge>

                                    <Stars />

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
                                    Seus tênis com{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                                        aparência renovada
                                    </span>{" "}
                                    — sem risco de estragar em casa.
                                </h1>

                                <p className="text-base md:text-lg lg:text-xl text-slate-600 mb-6 md:mb-8 leading-relaxed text-pretty">
                                    Antes de lavar, a gente <strong>avalia o material e o estado</strong> do par.
                                    Você recebe o <strong>valor e o prazo antes de fechar</strong>.
                                </p>

                                {/* bullets (conversão) */}
                                <div className="grid gap-3 mb-6 md:mb-8">
                                    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                        <ShieldCheck className="h-5 w-5 text-emerald-600 mt-0.5" />
                                        <div>
                                            <div className="font-extrabold text-slate-900">
                                                Avaliação antes do serviço
                                            </div>
                                            <div className="text-sm text-slate-600">
                                                Olhamos o material (couro, camurça, tecido, sintético) e o estado do par antes de dar o orçamento.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                        <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                                        <div>
                                            <div className="font-extrabold text-slate-900">Valor e prazo antes de fechar</div>
                                            <div className="text-sm text-slate-600">
                                                Você só autoriza depois de saber quanto custa e quando fica pronto.
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
                                        <WhatsAppLink href={waAgendar} target="_blank" rel="noreferrer">
                                            <span className="hidden sm:inline">Agendar coleta</span>
                                            <span className="sm:hidden">Agendar</span>
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </WhatsAppLink>
                                    </Button>

                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="h-12 md:h-14 px-6 md:px-10 rounded-xl border-slate-200 bg-white text-slate-900 hover:bg-slate-50 font-extrabold text-base md:text-lg"
                                        asChild
                                    >
                                        <WhatsAppLink href={waDuvidas} target="_blank" rel="noreferrer">
                                            <span className="hidden sm:inline">Tirar dúvidas</span>
                                            <span className="sm:hidden">Dúvidas</span>
                                            <MessageCircle className="ml-2 h-5 w-5" />
                                        </WhatsAppLink>
                                    </Button>
                                </div>

                                {/* micro garantias */}
                                <div className="mt-6 flex flex-wrap items-center gap-3">
                                    <Pill>Pagamento facilitado</Pill>
                                    <Pill>Avaliação do material</Pill>
                                    <Pill>Prazo informado antes</Pill>
                                </div>

                                <p className="mt-4 text-xs text-slate-500">
                                    Observação: resultados podem variar conforme desgaste, manchas antigas e tipo de material.
                                </p>
                            </div>

                            {/* RIGHT: Visual Card */}
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 blur-3xl rounded-[3rem] -z-10" />
                                <div className="relative rounded-[2rem] overflow-hidden border border-white/60 shadow-2xl bg-white/80 backdrop-blur-sm">
                                    <Image
                                        src="/imagens/hero-sneakers.png"
                                        alt="Tênis higienizado e renovado"
                                        width={800}
                                        height={600}
                                        className="w-full h-auto object-cover"
                                        priority
                                    />

                                    {/* Price Tag Overlay */}
                                    <div className="absolute bottom-3 right-3 md:bottom-6 md:right-6 bg-white/95 backdrop-blur rounded-xl md:rounded-2xl p-3 md:p-4 shadow-xl border border-slate-100 max-w-[180px] md:max-w-[240px]">
                                        <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                                            A partir de
                                        </div>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-xs md:text-sm font-bold text-slate-400">R$</span>
                                            <span className="text-3xl md:text-4xl font-extrabold text-slate-900">60</span>
                                            <span className="text-xs md:text-sm font-bold text-slate-400">,00</span>
                                        </div>
                                        <div className="mt-1.5 md:mt-2 text-[10px] md:text-xs text-slate-600 font-semibold leading-tight">
                                            Valor varia por material/estado.
                                        </div>
                                    </div>
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
                                Padrão Lavexpress
                            </Badge>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 md:mb-4">
                                Como a Lavexpress cuida do seu tênis
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                Cada par é avaliado antes do serviço. Você sabe o <strong>valor</strong> e o <strong>prazo</strong> antes de autorizar,
                                e decide se traz na loja ou pede a coleta.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                            <Card className="p-6 md:p-8 rounded-2xl md:rounded-3xl border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all group">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-blue-600 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                                    <Sparkles className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Avaliação do material</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Couro, camurça, tecido ou sintético: o material e o estado do par definem o que dá para fazer.
                                </p>
                            </Card>

                            <Card className="p-8 rounded-3xl border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all group">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-emerald-600 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                                    <ShieldCheck className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Orçamento antes</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Mande uma foto do par no WhatsApp. O valor e o prazo são confirmados antes de você fechar.
                                </p>
                            </Card>

                            <Card className="p-8 rounded-3xl border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all group">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-purple-600 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                                    <Zap className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Na loja ou com coleta</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Traga o par na loja em Jardim Camburi ou peça a coleta. {LAVEXPRESS.coletaEntrega.condicaoFrase}
                                </p>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* PROCESS */}
                <section className="py-12 md:py-16">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                            <div>
                                <Badge
                                    variant="outline"
                                    className="mb-4 border-blue-200 bg-blue-50 text-blue-700 px-4 py-1.5 text-sm font-extrabold rounded-full"
                                >
                                    Padrão em 4 etapas
                                </Badge>

                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 md:mb-6">
                                    Como funciona (do jeito certo)
                                </h2>

                                <div className="space-y-6">
                                    {[
                                        {
                                            title: "1) Coleta",
                                            desc: `Você traz na loja ou pede a coleta. ${LAVEXPRESS.coletaEntrega.condicaoFrase}`,
                                        },
                                        {
                                            title: "2) Avaliação do material",
                                            desc: "Olhamos o material e o estado do par e confirmamos valor e prazo.",
                                        },
                                        {
                                            title: "3) Lavagem",
                                            desc: "Feita conforme a avaliação do material.",
                                        },
                                        {
                                            title: "4) Retirada ou entrega",
                                            desc: "O par fica pronto para você retirar na loja ou receber, conforme combinado.",
                                        },
                                    ].map((step, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-sm">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-extrabold text-slate-900">{step.title}</h4>
                                                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                    <Button
                                        size="lg"
                                        className="h-12 px-8 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-extrabold"
                                        asChild
                                    >
                                        <WhatsAppLink href={waAgendar} target="_blank" rel="noreferrer">
                                            Agendar coleta
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </WhatsAppLink>
                                    </Button>

                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="h-12 px-8 rounded-xl border-slate-200 bg-white text-slate-900 hover:bg-slate-50 font-extrabold"
                                        asChild
                                    >
                                        <WhatsAppLink href={waDuvidas} target="_blank" rel="noreferrer">
                                            Tirar dúvidas
                                            <MessageCircle className="ml-2 h-4 w-4" />
                                        </WhatsAppLink>
                                    </Button>
                                </div>
                            </div>

                            {/* Right stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="p-6 bg-white border-slate-100 shadow-sm rounded-2xl">
                                    <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                                        Prazo
                                    </div>
                                    <div className="text-3xl font-extrabold text-slate-900 mb-1">Após avaliação</div>
                                    <div className="text-sm text-slate-500 font-medium">
                                        O prazo é confirmado após a avaliação do material e das condições do par.
                                    </div>
                                </Card>

                                <Card className="p-6 bg-white border-slate-100 shadow-sm rounded-2xl">
                                    <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                                        O que mais pedem
                                    </div>
                                    <div className="text-3xl font-extrabold text-slate-900 mb-1">Branco</div>
                                    <div className="text-sm text-slate-500 font-medium">
                                        Avaliamos o estado do par antes de dar o orçamento.
                                    </div>
                                </Card>

                                <Card className="p-6 bg-white border-slate-100 shadow-sm col-span-2 rounded-2xl">
                                    <div className="flex items-center gap-3 mb-2">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                                        <div className="font-extrabold text-slate-900">Pagamento facilitado</div>
                                    </div>
                                    <div className="text-sm text-slate-500 leading-relaxed">
                                        Aceitamos diversas formas de pagamento para melhor te atender.
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ (objeções) */}
                <section className="py-12 md:py-16 bg-white border-t border-slate-100">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 md:mb-4">Dúvidas rápidas</h2>
                            <p className="text-slate-600">
                                Respostas diretas para as dúvidas que mais travam o agendamento.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                            {[
                                {
                                    q: "Dá para lavar tênis branco?",
                                    a: "Sim. A gente avalia o estado (amarelado antigo, manchas profundas) antes de fechar. Não prometemos “zero marca” em desgaste antigo — mas buscamos o melhor resultado possível com segurança.",
                                },
                                {
                                    q: "E camurça / nobuck?",
                                    a: "Depende do par. A avaliação do material define se dá para lavar, o valor e o prazo.",
                                },
                                {
                                    q: "Qual é o prazo?",
                                    a: "O prazo é confirmado após a avaliação do material e das condições do par.",
                                },
                                {
                                    q: "Quais as formas de pagamento?",
                                    a: "Pagamento facilitado. Aceitamos diversas formas para melhor te atender.",
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
                                <WhatsAppLink href={waAgendar} target="_blank" rel="noreferrer">
                                    <span className="hidden sm:inline">Quero agendar agora</span>
                                    <span className="sm:hidden">Agendar agora</span>
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </WhatsAppLink>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </>
    );
}
