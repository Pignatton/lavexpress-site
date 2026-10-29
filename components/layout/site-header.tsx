"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { WhatsAppLink } from "@/components/whatsapp-link";

/**
 * Copy preservada dos dois CTAs que antes tinham o wa.me escrito à mão (com o
 * telefone dentro do JSX). Agora o número sai de `LAVEXPRESS` e o link passa
 * pelo caminho central, que carimba o `Ref:` do lead.
 */
const MSG_AGENDAR = "Olá! Gostaria de agendar um serviço de lavanderia. Pode me ajudar?";

type NavItem = { href: string; label: string };

/**
 * Desktop (md+). Maximo 5 itens.
 *
 * A barra em 768px tem ~398px uteis entre o logo e o cluster de botoes.
 * Com 4 labels ja estava no limite; crescer para 7 quebraria o layout.
 * Por isso "Pacotes Lavexpress" vira "Pacotes" aqui.
 */
const NAV_DESKTOP: NavItem[] = [
    { href: "/#servicos", label: "Serviços" },
    { href: "/pacotes", label: "Pacotes" },
    { href: "/empresas", label: "Empresas" },
    { href: "/sobre", label: "Sobre" },
    { href: "/contato", label: "Contato" },
];

/**
 * Lista completa — so no Sheet mobile, que e uma coluna vertical.
 *
 * E aqui que /agendamento e /servicos/lavagem-de-ternos deixam de ser
 * orfas: as duas respondem 200 mas nao existiam em nenhum menu.
 */
const NAV_MOBILE: NavItem[] = [
    { href: "/#servicos", label: "Serviços" },
    { href: "/pacotes", label: "Pacotes Lavexpress" },
    { href: "/empresas", label: "Empresas e Uniformes" },
    { href: "/agendamento", label: "Agendar Coleta" },
    { href: "/servicos/lavagem-de-ternos", label: "Ternos e Roupas Sociais" },
    { href: "/sobre", label: "Sobre Nós" },
    { href: "/contato", label: "Contato" },
];

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    {/* <div className="size-8 rounded-md bg-[var(--primary)]" aria-hidden="true" />
                    <span className="font-heading text-sm tracking-wide">Lavexpress</span> */}
                    <div className="relative h-10 w-32">
                        <Image
                            src="/imagens/logo colorida.png"
                            alt="Lavexpress"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                </Link>

                <nav className="hidden items-center gap-6 md:flex">
                    {NAV_DESKTOP.map((i) => (
                        <Link key={i.href} href={i.href} className="text-sm text-muted-foreground hover:text-foreground">
                            {i.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden items-center gap-2 md:flex">
                    <Button asChild variant="outline">
                        <Link href="/pacotes">Ver Pacotes</Link>
                    </Button>
                    <Button asChild>
                        <WhatsAppLink text={MSG_AGENDAR}>Agendar</WhatsAppLink>
                    </Button>
                </div>

                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline">Menu</Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[320px] bg-white sm:w-[400px] overflow-y-auto">
                            <SheetHeader className="border-b pb-4 mb-4">
                                <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
                                <div className="relative h-8 w-28">
                                    <Image
                                        src="/imagens/logo colorida.png"
                                        alt="Lavexpress"
                                        fill
                                        className="object-contain object-left"
                                        priority
                                    />
                                </div>
                            </SheetHeader>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-4">
                                    {NAV_MOBILE.map((i) => (
                                        <Link
                                            key={i.href}
                                            href={i.href}
                                            className="text-lg font-medium text-slate-600 hover:text-blue-600 transition-colors py-2 border-b border-slate-50"
                                        >
                                            {i.label}
                                        </Link>
                                    ))}
                                </div>
                                <div className="mt-4 flex flex-col gap-3">
                                    <Button asChild variant="outline" className="w-full justify-start h-12 text-base border-slate-200">
                                        <Link href="/pacotes">Ver Pacotes</Link>
                                    </Button>
                                    <Button asChild className="w-full justify-start h-12 text-base bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold shadow-md">
                                        <WhatsAppLink text={MSG_AGENDAR}>
                                            Agendar Agora
                                        </WhatsAppLink>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
