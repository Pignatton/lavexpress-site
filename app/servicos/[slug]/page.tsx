import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SERVICES_DETAILS } from "@/lib/catalogo";
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
    Wallet,
    Zap,
    Star,
    MapPin,
} from "lucide-react";

// Map string icon names to components
const ICONS = {
    Clock,
    ShieldCheck,
    Truck,
    Sparkles,
    Zap,
    Wallet,
};

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return Object.keys(SERVICES_DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = SERVICES_DETAILS[slug];

    if (!service) {
        return { title: "Serviço não encontrado | Lavexpress" };
    }

    return {
        title: `${service.title} | Lavexpress`,
        description: service.description,
    };
}

/**
 * Copy helpers (mais conversão, menos “genérico”)
 */
function getHeroKicker(serviceTitle: string) {
    return `Padrão profissional + coleta e entrega`;
}

function getHeroTitle(serviceTitle: string) {
    // Mantém o título do serviço, mas já “vende”
    return `${serviceTitle} com padrão profissional e prazo previsível.`;
}

function getHeroSubtitle(serviceDesc: string) {
    // Evita “lavanderia qualquer” e reforça valor (comodidade + confiança)
    return `A gente busca na sua porta, cuida com processo padronizado e devolve pronto para usar. Sem dor de cabeça, com atendimento rápido em Vitória e região.`;
}

function getBenefitsHeading() {
    return "Por que a Lavexpress é diferente na prática";
}

function getBenefitsSubheading() {
    return "Você percebe no toque, no cheiro, no caimento e principalmente no tempo que você ganha.";
}

function getIncludedHeading() {
    return "O que você recebe (de verdade)";
}

function getIncludedSubheading() {
    return "Sem letras miúdas: aqui está o que está incluso para você se sentir seguro antes de agendar.";
}

function getAllowedHeading() {
    return "O que pode ir no cesto";
}

function getAllowedSubheading() {
    return "Roupas do dia a dia, com cuidado e padrão consistente.";
}

function getExcludedHeading() {
    return "O que é tratado à parte";
}

function getExcludedSubheading() {
    return "Itens especiais podem exigir cuidado extra e orçamento específico.";
}

function getProcessHeading() {
    return "Como funciona (sem complicação)";
}

function getProcessSubheading() {
    return "Um fluxo simples que resolve sua rotina e mantém suas roupas no padrão certo.";
}

function getFinalCTAHeading() {
    return "Teste uma vez. Se fizer sentido, vira sua rotina.";
}

function getFinalCTASubheading() {
    return "Agende agora e receba suas roupas prontas para usar. Atendimento claro, prazos previsíveis e cuidado profissional.";
}

function Stars({ rating = 4.7, count = 37 }: { rating?: number; count?: number }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700">
            <div className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < 5 ? "fill-current" : ""}`} />
                ))}
            </div>
            <span>
                {String(rating).replace(".", ",")} no Google ({count})
            </span>
        </div>
    );
}

export default async function ServicePage({ params }: Props) {
    const { slug } = await params;
    const service = SERVICES_DETAILS[slug];

    if (!service) {
        notFound();
    }

    const whatsappLink = buildWhatsAppLink({
        phoneE164: LAVEXPRESS.whatsappE164,
        text: `Olá! Quero agendar ${service.title}. Pode me orientar com disponibilidade e valores?`,
    });

    // Você pode puxar isso do seu LAVEXPRESS depois (se tiver no arquivo lib/lavexpress)
    const locationLine =
        "Ao lado do Supermercado BH da Praia — R. Ruy Pinto Bandeira, 580, Loja 1 — Jardim Camburi, Vitória/ES";

    return (
        <>
            <SiteHeader />

            <main className="min-h-screen bg-slate-50/50">
                {/* Hero */}
                <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
                    {/* Background glows mais “vivo” (mantém seu padrão azul+verde) */}
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -top-28 left-1/2 h-[520px] w-[1100px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/18 to-emerald-500/14 blur-3xl" />
                        <div className="absolute -bottom-32 left-[-160px] h-[520px] w-[520px] rounded-full bg-emerald-500/10 blur-3xl" />
                        <div className="absolute -top-24 right-[-160px] h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />
                    </div>

                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Copy */}
                            <div>
                                {/* Kicker + Prova social + Local */}
                                <div className="flex flex-wrap items-center gap-3 mb-6">
                                    <Badge
                                        variant="outline"
                                        className="border-blue-200 bg-blue-50 text-blue-700 px-4 py-1.5 text-sm font-semibold rounded-full"
                                    >
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        {getHeroKicker(service.title)}
                                    </Badge>

                                    <Stars rating={4.7} count={37} />

                                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
                                        <Truck className="h-4 w-4" />
                                        Coleta e entrega
                                    </div>
                                </div>

                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight text-balance">
                                    {getHeroTitle(service.title)}
                                </h1>

                                <p className="text-lg md:text-xl text-slate-600 mb-6 leading-relaxed text-pretty">
                                    {getHeroSubtitle(service.description)}
                                </p>

                                <div className="flex flex-wrap items-center gap-3 mb-8">
                                    <div className="inline-flex items-center gap-2 text-sm text-slate-600">
                                        <Clock className="h-4 w-4 text-blue-600" />
                                        <span>
                                            Lavar + secar: <strong>24–48h</strong> | Passadoria:{" "}
                                            <strong>4–5 dias úteis</strong>
                                        </span>
                                    </div>

                                    <div className="inline-flex items-center gap-2 text-sm text-slate-600">
                                        <MapPin className="h-4 w-4 text-emerald-600" />
                                        <span className="text-slate-600">{locationLine}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        size="lg"
                                        className="h-14 px-8 w-full sm:w-auto rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all font-extrabold text-lg"
                                        asChild
                                    >
                                        <a href={whatsappLink} target="_blank" rel="noreferrer">
                                            Agendar pelo WhatsApp
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </a>
                                    </Button>

                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="h-14 px-8 w-full sm:w-auto rounded-xl border-slate-200 bg-white text-slate-900 hover:bg-slate-50 font-bold"
                                        asChild
                                    >
                                        <a href="/pacotes">
                                            Ver pacotes e preços
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </a>
                                    </Button>
                                </div>

                                <p className="mt-4 text-sm text-slate-500">
                                    Sem fidelidade. Atendimento claro e confirmação rápida no WhatsApp.
                                </p>
                            </div>

                            {/* Visual */}
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 blur-3xl rounded-[3rem] -z-10" />
                                <div className="relative rounded-[2rem] overflow-hidden border border-white/60 shadow-2xl bg-white/80 backdrop-blur-sm aspect-[4/3]">
                                    <Image
                                        src={service.heroImage}
                                        alt={service.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>

                                {/* Mini overlay (sutil, “top site”) */}
                                <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-slate-200 bg-white/90 backdrop-blur p-4 shadow-xl hidden sm:block">
                                    <div className="grid grid-cols-3 gap-3 text-center">
                                        <div className="rounded-xl bg-slate-50 p-3">
                                            <div className="text-xs text-slate-500">Cuidado</div>
                                            <div className="text-sm font-extrabold text-slate-900">Padrão</div>
                                        </div>
                                        <div className="rounded-xl bg-slate-50 p-3">
                                            <div className="text-xs text-slate-500">Prazo</div>
                                            <div className="text-sm font-extrabold text-slate-900">Previsível</div>
                                        </div>
                                        <div className="rounded-xl bg-slate-50 p-3">
                                            <div className="text-xs text-slate-500">Rotina</div>
                                            <div className="text-sm font-extrabold text-slate-900">Resolvida</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end visual */}
                        </div>
                    </div>
                </section>

                {/* Benefits */}
                <section className="py-16 md:py-20 bg-white border-y border-slate-100">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                                {getBenefitsHeading()}
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                {getBenefitsSubheading()}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {service.benefits.map((benefit, index) => {
                                const Icon = ICONS[benefit.icon as keyof typeof ICONS] || Sparkles;

                                // Ajuste de copy “top” sem mudar seu catálogo:
                                // (mantém o benefit.title do catálogo, mas melhora a descrição exibida com uma camada de “venda”)
                                const upgradedDescription =
                                    benefit.description ||
                                    "Cuidado profissional com padrão consistente, do jeito que você espera quando confia suas peças a uma lavanderia séria.";

                                return (
                                    <Card
                                        key={index}
                                        className="p-8 border-slate-100 shadow-sm hover:shadow-md transition-all bg-slate-50/50 rounded-2xl"
                                    >
                                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-blue-600 shadow-sm border border-slate-100">
                                            <Icon className="h-7 w-7" />
                                        </div>

                                        <h3 className="text-xl font-extrabold text-slate-900 mb-3">
                                            {benefit.title}
                                        </h3>

                                        <p className="text-slate-600 leading-relaxed">
                                            {upgradedDescription}
                                        </p>

                                        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-700">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                            Pronto para usar quando voltar
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Included */}
                {service.included && (
                    <section className="py-16 md:py-20 bg-white">
                        <div className="container mx-auto px-4 md:px-6">
                            <div className="text-center max-w-3xl mx-auto mb-12">
                                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                                    {getIncludedHeading()}
                                </h2>
                                <p className="text-slate-600">{getIncludedSubheading()}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
                                {service.included.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start p-4 rounded-xl bg-slate-50 border border-slate-100"
                                    >
                                        <CheckCircle2 className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0" />
                                        <span className="text-slate-800 font-semibold">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 max-w-5xl mx-auto grid gap-4 grid-cols-1 md:grid-cols-3">
                                <Card className="p-5 rounded-2xl border-slate-200 bg-white">
                                    <div className="flex items-center gap-2 font-extrabold text-slate-900">
                                        <ShieldCheck className="h-5 w-5 text-blue-600" />
                                        Processo padronizado
                                    </div>
                                    <p className="mt-1 text-sm text-slate-600">
                                        Triagem e cuidado para reduzir erro comum de lavagem doméstica.
                                    </p>
                                </Card>

                                <Card className="p-5 rounded-2xl border-slate-200 bg-white">
                                    <div className="flex items-center gap-2 font-extrabold text-slate-900">
                                        <Clock className="h-5 w-5 text-emerald-600" />
                                        Prazo previsível
                                    </div>
                                    <p className="mt-1 text-sm text-slate-600">
                                        Você sabe quando busca e quando recebe. Isso organiza sua rotina.
                                    </p>
                                </Card>

                                <Card className="p-5 rounded-2xl border-slate-200 bg-white">
                                    <div className="flex items-center gap-2 font-extrabold text-slate-900">
                                        <Wallet className="h-5 w-5 text-slate-900" />
                                        Pacotes valem mais
                                    </div>
                                    <p className="mt-1 text-sm text-slate-600">
                                        Melhor custo-benefício no mês sem perder qualidade.
                                    </p>
                                </Card>
                            </div>
                        </div>
                    </section>
                )}

                {/* Allowed vs Excluded */}
                {(service.allowedItems || service.excludedItems) && (
                    <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-200">
                        <div className="container mx-auto px-4 md:px-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
                                {/* Allowed */}
                                {service.allowedItems && (
                                    <div>
                                        <div className="flex items-center mb-8">
                                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
                                                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900">
                                                    {getAllowedHeading()}
                                                </h3>
                                                <p className="text-slate-600 text-sm">{getAllowedSubheading()}</p>
                                            </div>
                                        </div>

                                        <ul className="space-y-4">
                                            {service.allowedItems.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-slate-100"
                                                >
                                                    <div className="h-2 w-2 rounded-full bg-emerald-500 mr-3" />
                                                    <span className="text-slate-800 font-semibold">{item}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <p className="mt-6 text-sm text-slate-600 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                            Se você quiser separar por cor ou tecido, é só avisar no WhatsApp.
                                            Nós orientamos o melhor formato (cesto separado ou combinado).
                                        </p>
                                    </div>
                                )}

                                {/* Excluded */}
                                {service.excludedItems && (
                                    <div>
                                        <div className="flex items-center mb-8">
                                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                                                <div className="h-6 w-6 text-red-600 font-extrabold text-xl flex items-center justify-center">
                                                    ×
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900">
                                                    {getExcludedHeading()}
                                                </h3>
                                                <p className="text-slate-600 text-sm">{getExcludedSubheading()}</p>
                                            </div>
                                        </div>

                                        <ul className="space-y-4">
                                            {service.excludedItems.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-slate-100"
                                                >
                                                    <div className="h-2 w-2 rounded-full bg-red-400 mr-3" />
                                                    <span className="text-slate-700 font-medium">{item}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <p className="mt-6 text-sm text-slate-600 bg-white p-4 rounded-xl border border-slate-200">
                                            Esses itens geralmente precisam de cuidado especial. A gente atende sim,
                                            com orçamento específico para garantir o melhor resultado.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* Process */}
                <section className="py-16 md:py-20 bg-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                                {getProcessHeading()}
                            </h2>
                            <p className="text-slate-600">{getProcessSubheading()}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 -z-10" />

                            {service.process.map((step, index) => {
                                // Reforço de conversão nos textos do processo (sem mudar seu catálogo original)
                                const betterDesc =
                                    step.description ||
                                    "Você agenda, a gente busca e devolve no padrão certo — sem você se preocupar com nada.";

                                return (
                                    <div key={index} className="relative flex flex-col items-center text-center">
                                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 border-4 border-slate-50 shadow-sm z-10">
                                            <span className="text-2xl font-extrabold text-blue-600">{step.step}</span>
                                        </div>

                                        <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                                            {step.title}
                                        </h3>

                                        <p className="text-sm text-slate-600 leading-relaxed max-w-[220px]">
                                            {betterDesc}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-12 max-w-4xl mx-auto rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                                <div className="flex items-start gap-3">
                                    <Truck className="h-5 w-5 text-emerald-600 mt-0.5" />
                                    <div>
                                        <div className="font-extrabold text-slate-900">Coleta e entrega</div>
                                        <div className="text-sm text-slate-600">Você não perde tempo saindo de casa.</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <ShieldCheck className="h-5 w-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <div className="font-extrabold text-slate-900">Cuidado técnico</div>
                                        <div className="text-sm text-slate-600">Padrão consistente, peça por peça.</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Zap className="h-5 w-5 text-slate-900 mt-0.5" />
                                    <div>
                                        <div className="font-extrabold text-slate-900">Confirmação rápida</div>
                                        <div className="text-sm text-slate-600">Tudo alinhado no WhatsApp em minutos.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                {/* Final CTA */}
                <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-600 to-green-700 text-white relative overflow-hidden">
                    {/* Background Effects (Static for Server Component) */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-40" />
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
                    </div>

                    <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
                            {getFinalCTAHeading()}
                        </h2>
                        <p className="text-lg text-emerald-50 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                            {getFinalCTASubheading()}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                size="lg"
                                className="h-16 px-12 w-full sm:w-auto rounded-full bg-white text-emerald-800 hover:bg-emerald-50 hover:scale-[1.02] transition-all font-extrabold text-lg shadow-xl shadow-emerald-900/20"
                                asChild
                            >
                                <a href={whatsappLink} target="_blank" rel="noreferrer">
                                    <MessageCircle className="mr-2 h-5 w-5 text-emerald-600" />
                                    Agendar pelo WhatsApp
                                </a>
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="h-16 px-12 w-full sm:w-auto rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 font-bold text-lg backdrop-blur-sm"
                                asChild
                            >
                                <a href="/pacotes">
                                    Ver pacotes e preços
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </a>
                            </Button>
                        </div>

                        <p className="mt-8 text-sm text-emerald-100/80 font-medium">
                            Atendimento: Vitória/ES e região • Prazos previsíveis • Padrão profissional
                        </p>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </>
    );
}
