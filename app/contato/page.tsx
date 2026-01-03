import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Faq } from "@/components/sections/faq";
import { GoogleReviews } from "@/components/sections/google-reviews";
import { LAVEXPRESS } from "@/lib/lavexpress";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import {
    MapPin,
    MessageCircle,
    Clock,
    Phone,
    ArrowRight,
    Navigation,
    Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Contato | Lavexpress Lavanderia",
    description:
        "Fale com a Lavexpress. Atendimento via WhatsApp, endereço em Jardim Camburi e horários de funcionamento.",
};

function WhatsAppComposer() {
    const wa = (text: string) =>
        buildWhatsAppLink({ phoneE164: LAVEXPRESS.whatsappE164, text });

    return (
        <Card className="p-6 md:p-8 rounded-3xl border-slate-100 shadow-sm bg-white">
            <div className="flex items-start justify-between gap-6">
                <div>
                    <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-full px-4 py-1.5">
                        WhatsApp (Recomendado)
                    </Badge>
                    <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Mande uma mensagem pronta em 20 segundos
                    </h2>
                    <p className="mt-2 text-slate-600 leading-relaxed">
                        Clique em um motivo abaixo e você já abre o WhatsApp com a mensagem completa (sem enrolação).
                    </p>
                </div>

                <div className="hidden md:flex items-center justify-center h-14 w-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700">
                    <Sparkles className="h-6 w-6" />
                </div>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-3">
                <Button
                    className="h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold"
                    asChild
                >
                    <a
                        href={wa(
                            "Olá! Quero agendar coleta e entrega. Meu bairro/CEP é: _____. Serviço: ( ) Lavar+Secar ( ) Lavar+Secar+Passar ( ) Passadoria. Quantidade aproximada: _____."
                        )}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Agendar coleta agora <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                </Button>

                <Button
                    variant="outline"
                    className="h-12 rounded-2xl border-emerald-200 text-emerald-900 hover:bg-emerald-50 font-extrabold"
                    asChild
                >
                    <a
                        href={wa(
                            "Olá! Quero saber qual pacote vale mais para mim. Minha rotina é: _____. Quantas pessoas em casa: _____. Bairro/CEP: _____."
                        )}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Quero recomendação de pacote <MessageCircle className="ml-2 h-4 w-4" />
                    </a>
                </Button>

                <Button
                    variant="outline"
                    className="h-12 rounded-2xl border-slate-200 text-slate-900 hover:bg-slate-50 font-extrabold"
                    asChild
                >
                    <a
                        href={wa(
                            "Olá! Tenho dúvidas sobre prazo e área atendida. Meu bairro/CEP é: _____."
                        )}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Dúvidas (prazo/área) <MessageCircle className="ml-2 h-4 w-4" />
                    </a>
                </Button>

                <Button
                    variant="outline"
                    className="h-12 rounded-2xl border-slate-200 text-slate-900 hover:bg-slate-50 font-extrabold"
                    asChild
                >
                    <a
                        href={wa(
                            "Olá! Quero orçamento para itens maiores (edredom/cortina/tapete). Itens: _____. Quantidade: _____. Bairro/CEP: _____."
                        )}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Orçamento (itens grandes) <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                </Button>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                    <div className="font-extrabold text-emerald-900">Canal mais rápido</div>
                    <div className="text-emerald-800/90 mt-1">
                        Atendimento e agendamento direto no WhatsApp.
                    </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="font-extrabold text-slate-900">Informações que aceleram</div>
                    <div className="text-slate-700 mt-1">
                        Informe bairro/CEP + serviço + quantidade aproximada.
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default function ContatoPage() {
    const waLink = buildWhatsAppLink({
        phoneE164: LAVEXPRESS.whatsappE164,
        text: "Olá! Gostaria de falar com a Lavexpress.",
    });

    return (
        <>
            <SiteHeader />

            <main className="min-h-screen bg-slate-50">
                {/* HERO */}
                <section className="pt-28 md:pt-36 pb-10 md:pb-14 bg-gradient-to-br from-emerald-600 to-green-700 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-white/10 rounded-full blur-[110px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[520px] h-[520px] bg-emerald-900/10 rounded-full blur-[110px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="max-w-3xl">
                            <Badge className="bg-white/20 hover:bg-white/30 text-white border-white/20 font-extrabold rounded-full px-4 py-1.5 backdrop-blur-sm">
                                Contato Oficial
                            </Badge>

                            <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                                Atendimento rápido. Coleta e entrega com padrão profissional.
                            </h1>

                            <p className="mt-4 text-lg md:text-xl text-emerald-50 leading-relaxed">
                                Fale agora no WhatsApp e resolva em minutos: validar área, escolher o melhor pacote e agendar.
                            </p>

                            <div className="mt-7 flex flex-col sm:flex-row gap-3">
                                <Button
                                    size="lg"
                                    className="h-12 md:h-14 rounded-2xl bg-white text-emerald-800 hover:bg-emerald-50 font-extrabold shadow-lg shadow-emerald-900/20"
                                    asChild
                                >
                                    <a href={waLink} target="_blank" rel="noreferrer">
                                        Chamar no WhatsApp <ArrowRight className="ml-2 h-5 w-5" />
                                    </a>
                                </Button>

                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-12 md:h-14 rounded-2xl border-white/30 bg-white/10 text-white hover:bg-white/20 font-extrabold backdrop-blur-sm"
                                    asChild
                                >
                                    <a href={LAVEXPRESS.googleMapsCidUrl} target="_blank" rel="noreferrer">
                                        Ver no Google Maps <Navigation className="ml-2 h-5 w-5" />
                                    </a>
                                </Button>
                            </div>

                            <div className="mt-7 flex flex-wrap gap-3 text-sm text-emerald-50">
                                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-semibold backdrop-blur-sm">
                                    <Phone className="h-4 w-4 text-emerald-200" />
                                    {LAVEXPRESS.whatsappDisplay}
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-semibold backdrop-blur-sm">
                                    <Clock className="h-4 w-4 text-emerald-200" />
                                    {LAVEXPRESS.hours.weekdays}
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-semibold backdrop-blur-sm">
                                    <MapPin className="h-4 w-4 text-emerald-200" />
                                    {LAVEXPRESS.addressDistrict} • {LAVEXPRESS.addressCity}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PRIMARY ACTION */}
                <section className="py-12 container mx-auto px-4 md:px-6">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6 items-start">
                        <div className="lg:col-span-2">
                            <WhatsAppComposer />
                        </div>

                        <div className="space-y-6">
                            <Card className="p-6 rounded-3xl border-slate-100 bg-white shadow-sm">
                                <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-full px-4 py-1.5">
                                    Dados oficiais
                                </Badge>

                                <div className="mt-5 space-y-4 text-sm">
                                    <div className="flex gap-3">
                                        <MapPin className="h-5 w-5 text-emerald-700 mt-0.5" />
                                        <div>
                                            <div className="font-extrabold text-slate-900">Endereço</div>
                                            <div className="text-slate-700">{LAVEXPRESS.fullAddress}</div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <Phone className="h-5 w-5 text-emerald-700 mt-0.5" />
                                        <div>
                                            <div className="font-extrabold text-slate-900">WhatsApp</div>
                                            <div className="text-slate-700">{LAVEXPRESS.whatsappDisplay}</div>
                                            <div className="mt-1 text-slate-500">
                                                Telefone: {LAVEXPRESS.phoneDisplay}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <Clock className="h-5 w-5 text-emerald-700 mt-0.5" />
                                        <div>
                                            <div className="font-extrabold text-slate-900">Horário</div>
                                            <div className="text-slate-700">{LAVEXPRESS.hours.weekdays}</div>
                                            <div className="text-slate-700">{LAVEXPRESS.hours.saturday}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 grid gap-3">
                                    <Button
                                        className="h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold"
                                        asChild
                                    >
                                        <a href={LAVEXPRESS.googleMapsDirectionsUrl} target="_blank" rel="noreferrer">
                                            Como chegar <Navigation className="ml-2 h-4 w-4" />
                                        </a>
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="h-12 rounded-2xl border-emerald-200 text-emerald-900 hover:bg-emerald-50 font-extrabold"
                                        asChild
                                    >
                                        <a href={LAVEXPRESS.googleMapsCidUrl} target="_blank" rel="noreferrer">
                                            Abrir no Maps <ArrowRight className="ml-2 h-4 w-4" />
                                        </a>
                                    </Button>
                                </div>
                            </Card>

                            <Card className="p-6 rounded-3xl border-emerald-200 bg-emerald-50 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <MessageCircle className="h-6 w-6 text-emerald-700 mt-0.5" />
                                    <div>
                                        <div className="font-extrabold text-emerald-900">
                                            Dica para responder mais rápido
                                        </div>
                                        <div className="mt-1 text-emerald-900/90 text-sm">
                                            Envie: <b>bairro/CEP</b> + <b>serviço</b> + <b>quantidade aproximada</b>.
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* REVIEWS (Google 5★) */}
                <GoogleReviews />

                {/* FAQ */}
                <section className="py-16 bg-white">
                    <Faq />
                </section>
            </main>

            <SiteFooter />
        </>
    );
}
