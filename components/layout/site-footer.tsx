import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { LAVEXPRESS } from "@/lib/lavexpress";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Instagram, MapPin, Phone, Clock, Mail, ExternalLink } from "lucide-react";
import { SeoKeywords } from "@/components/sections/seo-keywords";

export function SiteFooter() {
    const whatsappLink = buildWhatsAppLink({
        phoneE164: LAVEXPRESS.whatsappE164,
        text: "Olá, gostaria de tirar uma dúvida.",
    });

    return (
        <footer className="border-t bg-slate-50 pt-16 pb-28 md:pb-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Column */}
                    <div>
                        <Link href="/" className="block w-fit">
                            <div className="relative h-12 w-48">
                                <Image
                                    src="/imagens/logo colorida.png"
                                    alt="Lavexpress Logo"
                                    fill
                                    className="object-contain object-left"
                                    priority
                                />
                            </div>
                        </Link>
                        <p className="mt-6 text-sm text-slate-600 leading-relaxed max-w-xs">
                            Desde 2016. Lavanderia profissional com coleta e entrega. Cuidado real com suas roupas,
                            previsibilidade e preço justo.
                        </p>
                        <div className="mt-6 flex gap-4">
                            <a
                                href="https://instagram.com/lavexpress_lavanderia"
                                target="_blank"
                                rel="noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm ring-1 ring-slate-200 transition-all hover:text-pink-600 hover:ring-pink-200 hover:scale-105"
                                aria-label="Instagram"
                            >
                                <Instagram className="size-5" />
                            </a>
                            <a
                                href={`mailto:${LAVEXPRESS.email}`}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm ring-1 ring-slate-200 transition-all hover:text-emerald-600 hover:ring-emerald-200 hover:scale-105"
                                aria-label="Email"
                            >
                                <Mail className="size-5" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div>
                        <h3 className="font-bold text-slate-900">Navegação</h3>
                        <ul className="mt-4 space-y-3 text-sm text-slate-600">
                            <li>
                                <Link href="/" className="hover:text-emerald-600 transition-colors inline-flex items-center gap-1">
                                    Início
                                </Link>
                            </li>
                            <li>
                                <Link href="/sobre" className="hover:text-emerald-600 transition-colors inline-flex items-center gap-1">
                                    Sobre Nós
                                </Link>
                            </li>
                            <li>
                                <Link href="/pacotes" className="hover:text-emerald-600 transition-colors inline-flex items-center gap-1">
                                    Pacotes e Preços
                                </Link>
                            </li>
                            <li>
                                <Link href="/contato" className="hover:text-emerald-600 transition-colors inline-flex items-center gap-1">
                                    Contato
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 className="font-bold text-slate-900">Fale Conosco</h3>
                        <ul className="mt-4 space-y-4 text-sm text-slate-600">
                            <li>
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-3 hover:text-emerald-600 transition-colors group"
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                                        <Phone className="size-4" />
                                    </div>
                                    <span className="font-medium">{LAVEXPRESS.whatsappDisplay}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`tel:${LAVEXPRESS.phone}`}
                                    className="flex items-center gap-3 hover:text-emerald-600 transition-colors group"
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                        <Phone className="size-4" />
                                    </div>
                                    <span>{LAVEXPRESS.phoneDisplay}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={LAVEXPRESS.googleMapsCidUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-start gap-3 hover:text-emerald-600 transition-colors group"
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors shrink-0">
                                        <MapPin className="size-4" />
                                    </div>
                                    <span className="leading-relaxed">
                                        {LAVEXPRESS.addressLine}<br />
                                        {LAVEXPRESS.addressDistrict} - {LAVEXPRESS.addressCity}<br />
                                        <span className="text-xs text-slate-400 group-hover:text-emerald-500/70">Ver no mapa <ExternalLink className="inline h-3 w-3 ml-0.5" /></span>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Hours Column */}
                    <div>
                        <h3 className="font-bold text-slate-900">Horário de Funcionamento</h3>
                        <ul className="mt-4 space-y-3 text-sm text-slate-600">
                            <li className="flex items-start gap-3">
                                <Clock className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                                <div>
                                    <span className="block font-medium text-slate-900">Segunda a Sexta</span>
                                    <span>09:00 - 18:00</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Clock className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                                <div>
                                    <span className="block font-medium text-slate-900">Sábado</span>
                                    <span>09:00 - 13:00</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-10 bg-slate-200" />

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between text-xs text-slate-500 text-center md:text-left">
                    <div>
                        <div className="font-medium text-slate-700">Pignatton Lavanderia LTDA</div>
                        <div>CNPJ: 25.075.135/0001-47</div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-center">
                        <span>© {new Date().getFullYear()} Lavexpress. Todos os direitos reservados.</span>
                        <span className="hidden md:inline">•</span>
                        <Link href="/termos" className="hover:text-emerald-600 transition-colors">
                            Termos de Uso e Privacidade
                        </Link>
                    </div>
                </div>
                <SeoKeywords />
            </div>
        </footer>
    );
}
