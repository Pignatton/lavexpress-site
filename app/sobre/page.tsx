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
    MapPin,
    MessageCircle,
    ShieldCheck,
    Sparkles,
    Star,
    Truck,
    Users,
    Zap,
    HeartHandshake,
    BadgeCheck,
    Timer,
    ClipboardCheck,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Sobre Nós | Lavexpress Lavanderia",
    description:
        "Conheça a Lavexpress: lavanderia delivery em Vitória/ES. Qualidade profissional, conveniência real e confiança para sua rotina.",
};

function Stars({ rating = 4.7, count = 37 }: { rating?: number; count?: number }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold text-slate-700 shadow-sm">
            <div className="flex items-center gap-1 text-yellow-500" aria-hidden="true">
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

function SectionHeader({
    badge,
    title,
    subtitle,
}: {
    badge: string;
    title: React.ReactNode;
    subtitle?: React.ReactNode;
}) {
    return (
        <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge
                variant="outline"
                className="mb-4 border-blue-200 bg-blue-50 text-blue-700 px-4 py-1.5 text-sm font-extrabold rounded-full"
            >
                {badge}
            </Badge>

            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">{title}</h2>

            {subtitle ? (
                <p className="text-lg text-slate-600 leading-relaxed">{subtitle}</p>
            ) : null}
        </div>
    );
}

export default function SobrePage() {
    const waContato = buildWhatsAppLink({
        phoneE164: LAVEXPRESS.whatsappE164,
        text: "Olá! Vim pelo site e gostaria de conhecer melhor os serviços da Lavexpress.",
    });

    return (
        <>
            <SiteHeader />

            <main className="min-h-screen bg-slate-50/50">
                {/* HERO - QUEM SOMOS */}
                <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50">
                    {/* Glow effects */}
                    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                        <div className="absolute -top-24 left-1/2 h-[520px] w-[1100px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/10 to-emerald-500/10 blur-3xl" />
                    </div>

                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="grid lg:grid-cols-12 gap-12 items-center">
                            {/* Text Content */}
                            <div className="lg:col-span-6">
                                <div className="flex flex-wrap items-center gap-3 mb-6">
                                    <Badge
                                        variant="outline"
                                        className="border-blue-200 bg-blue-50 text-blue-700 px-4 py-1.5 text-sm font-extrabold rounded-full"
                                    >
                                        <Users className="mr-2 h-4 w-4" />
                                        Quem Somos
                                    </Badge>
                                    <Stars />
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                                    Transformamos a forma como você <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">cuida das suas roupas</span>.
                                </h1>

                                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                                    <p>
                                        A <strong>Lavexpress Lavanderia</strong> é referência em delivery em Vitória – ES. Nossa proposta é simples e direta: <strong>qualidade profissional</strong>, <strong>conveniência real</strong> e <strong>confiança</strong>.
                                    </p>
                                    <p>
                                        Nós cuidamos de todo o processo para que você ganhe tempo, receba suas roupas limpas, cheirosas e prontas para o uso, sem precisar sair de casa ou reorganizar sua rotina.
                                    </p>
                                </div>

                                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                    <Button
                                        size="lg"
                                        className="h-14 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-extrabold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                                        asChild
                                    >
                                        <a href={waContato} target="_blank" rel="noreferrer">
                                            Fale com a gente
                                            <MessageCircle className="ml-2 h-5 w-5" />
                                        </a>
                                    </Button>
                                </div>
                            </div>

                            {/* Image Content */}
                            <div className="lg:col-span-6">
                                <div className="relative">
                                    <div className="pointer-events-none absolute -inset-4 rounded-[3rem] bg-gradient-to-r from-blue-500/20 to-emerald-500/20 blur-2xl opacity-70" />

                                    <Card className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/80 backdrop-blur-sm shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
                                        <div className="relative h-[400px] w-full">
                                            <Image
                                                src="/images/lavexpress_interior_real.jpg"
                                                alt="Interior da Lavexpress - Padrão Profissional"
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />
                                        </div>

                                        <div className="absolute bottom-6 left-6 right-6">
                                            <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-lg">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <MapPin className="h-5 w-5 text-blue-600" />
                                                    <span className="font-extrabold text-slate-900">Jardim Camburi • Vitória/ES</span>
                                                </div>
                                                <p className="text-sm text-slate-600 font-medium">
                                                    Base operacional própria com processos padronizados.
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* NOSSA HISTÓRIA */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="md:w-1/3">
                                    <div className="sticky top-24">
                                        <Badge
                                            variant="outline"
                                            className="mb-4 border-emerald-200 bg-emerald-50 text-emerald-700 px-4 py-1.5 text-sm font-extrabold rounded-full"
                                        >
                                            Nossa Trajetória
                                        </Badge>
                                        <h2 className="text-3xl font-extrabold text-slate-900 leading-tight mb-4">
                                            Nascemos de uma necessidade real.
                                        </h2>
                                        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full" />
                                    </div>
                                </div>

                                <div className="md:w-2/3 space-y-6 text-lg text-slate-600 leading-relaxed">
                                    <p>
                                        Desde que iniciamos nossas atividades em Vitória, no bairro <strong>Jardim Camburi</strong>, a Lavexpress vem se destacando pelo atendimento personalizado, pela organização do processo e pela consistência na qualidade.
                                    </p>
                                    <p className="p-6 bg-slate-50 rounded-2xl border-l-4 border-blue-500 italic text-slate-700">
                                        &quot;Famílias e empresas queriam um serviço confiável, pontual e com padrão profissional, sem preços abusivos ou improvisos.&quot;
                                    </p>
                                    <p>
                                        Ao longo do tempo, estruturamos processos, definimos prazos claros e criamos um modelo que une <strong>resultado premium</strong>, <strong>preço justo</strong> e <strong>praticidade</strong> — algo que hoje faz parte do nosso DNA.
                                    </p>
                                    <p>
                                        Nossa base sempre foi o compromisso com a qualidade e a praticidade, refletido em cada etapa do atendimento.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PROPOSTA DE VALOR */}
                <section className="py-16 md:py-24 bg-slate-50/50 border-y border-slate-100">
                    <div className="container mx-auto px-4 md:px-6">
                        <SectionHeader
                            badge="Proposta de Valor"
                            title={
                                <>
                                    Somos mais do que uma lavanderia.<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                                        Somos parceiros da sua rotina.
                                    </span>
                                </>
                            }
                            subtitle="Nosso foco está em entregar uma experiência sem atritos:"
                        />

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                            {[
                                {
                                    title: "Comodidade total",
                                    desc: "Coleta e entrega diretamente no seu endereço, de forma programada e organizada.",
                                    icon: Truck,
                                    color: "blue"
                                },
                                {
                                    title: "Processo profissional",
                                    desc: "Lavagem, secagem, tratamento e acabamento com padrões técnicos que respeitam tecido e cor.",
                                    icon: Sparkles,
                                    color: "emerald"
                                },
                                {
                                    title: "Agilidade e confiança",
                                    desc: "Prazos cumpridos, comunicação clara e roupas prontas conforme o combinado.",
                                    icon: Timer,
                                    color: "blue"
                                },
                                {
                                    title: "Atendimento humano",
                                    desc: "Contato direto via WhatsApp, sem robôs, sem enrolação e com orientação real.",
                                    icon: HeartHandshake,
                                    color: "emerald"
                                }
                            ].map((item) => (
                                <Card
                                    key={item.title}
                                    className="group p-6 rounded-2xl border-slate-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors ${item.color === 'blue'
                                        ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                                        : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'
                                        }`}>
                                        <item.icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="font-extrabold text-slate-900 mb-3 text-lg">{item.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* POR QUE ESCOLHER (TABELA PREMIUM) */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid lg:grid-cols-12 gap-12 max-w-7xl mx-auto items-start">
                            <div className="lg:col-span-4">
                                <Badge
                                    variant="outline"
                                    className="mb-4 border-slate-200 bg-slate-50 text-slate-700 px-4 py-1.5 text-sm font-extrabold rounded-full"
                                >
                                    Por Que Escolher
                                </Badge>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                                    Simplificamos o cuidado com suas roupas.
                                </h2>
                                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                    Nosso modelo une processos profissionais, organização operacional e atendimento ágil. Tudo pensado para respeitar o seu tempo e superar expectativas.
                                </p>

                                <div className="p-6 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl border border-blue-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Zap className="h-5 w-5 text-blue-600" />
                                        <span className="font-extrabold text-slate-900">Foco no essencial</span>
                                    </div>
                                    <p className="text-slate-600 text-sm">
                                        Você vive o que importa, nós cuidamos do resto.
                                    </p>
                                </div>
                            </div>

                            <div className="lg:col-span-8">
                                <Card className="overflow-hidden border-slate-200 shadow-lg rounded-2xl">
                                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                                        <span className="font-extrabold text-slate-700 uppercase tracking-wider text-xs">O que nos diferencia</span>
                                        <BadgeCheck className="h-5 w-5 text-emerald-500" />
                                    </div>
                                    <div className="divide-y divide-slate-100">
                                        {[
                                            { dif: "Coleta e entrega no endereço", ben: "Você economiza tempo e não carrega peso" },
                                            { dif: "Padrão profissional de lavagem", ben: "Roupas limpas, preservadas e cheirosas" },
                                            { dif: "Atendimento ágil e dedicado", ben: "Suporte próximo e eficiente" },
                                            { dif: "Solução residencial e comercial", ben: "Atende famílias e empresas" },
                                            { dif: "Prazos ajustados à sua rotina", ben: "Flexibilidade e previsibilidade" }
                                        ].map((row, i) => (
                                            <div key={i} className="grid md:grid-cols-2 p-5 hover:bg-slate-50 transition-colors group">
                                                <div className="flex items-start gap-3 mb-2 md:mb-0">
                                                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                                                    <span className="font-bold text-slate-900">{row.dif}</span>
                                                </div>
                                                <div className="text-slate-600 pl-8 md:pl-0 flex items-center">
                                                    <span className="md:hidden font-bold text-xs uppercase text-slate-400 mr-2">Benefício:</span>
                                                    {row.ben}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* MISSÃO & ONDE ESTAMOS */}
                <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-600 to-green-700 text-white overflow-hidden relative">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
                            {/* Missão */}
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-3xl hover:bg-white/20 transition-colors shadow-lg">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-white/20 rounded-xl">
                                        <Sparkles className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Nossa Missão</h3>
                                </div>
                                <p className="text-emerald-50 text-lg leading-relaxed">
                                    Oferecer soluções completas de lavanderia, com <strong>excelência operacional</strong> e foco no cliente, garantindo conveniência, qualidade e confiança em cada peça que passa pelas nossas mãos.
                                </p>
                            </div>

                            {/* Onde Estamos */}
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-3xl hover:bg-white/20 transition-colors shadow-lg">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-white/20 rounded-xl">
                                        <MapPin className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Onde Estamos</h3>
                                </div>
                                <p className="text-emerald-50 text-lg leading-relaxed">
                                    Atendemos <strong>Vitória – ES</strong>, com base no bairro <strong>Jardim Camburi</strong>, realizando coletas programadas nas regiões próximas para garantir pontualidade, segurança e eficiência em todo o processo.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* NOSSOS COMPROMISSOS */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <SectionHeader
                            badge="Nossos Compromissos"
                            title="Pilares da nossa relação com você"
                            subtitle="Transparência e qualidade em cada entrega."
                        />

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
                            {[
                                {
                                    title: "Pontualidade",
                                    desc: "Entregas sempre dentro do prazo combinado.",
                                    icon: Clock,
                                    bg: "bg-blue-50",
                                    text: "text-blue-600"
                                },
                                {
                                    title: "Excelência técnica",
                                    desc: "Equipamentos, produtos e processos que respeitam tecidos e cores.",
                                    icon: BadgeCheck,
                                    bg: "bg-emerald-50",
                                    text: "text-emerald-600"
                                },
                                {
                                    title: "Conveniência",
                                    desc: "Agendamento simples e comunicação direta via WhatsApp.",
                                    icon: MessageCircle,
                                    bg: "bg-blue-50",
                                    text: "text-blue-600"
                                },
                                {
                                    title: "Transparência",
                                    desc: "Preços claros, serviços bem explicados e nenhuma surpresa.",
                                    icon: ClipboardCheck,
                                    bg: "bg-emerald-50",
                                    text: "text-emerald-600"
                                }
                            ].map((item) => (
                                <div key={item.title} className="text-center group">
                                    <div className={`w-20 h-20 mx-auto rounded-full ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                        <item.icon className={`h-8 w-8 ${item.text}`} />
                                    </div>
                                    <h3 className="text-xl font-extrabold text-slate-900 mb-3">{item.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <Button
                                size="lg"
                                className="h-14 px-10 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-extrabold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                                asChild
                            >
                                <a href={waContato} target="_blank" rel="noreferrer">
                                    Falar no WhatsApp
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
