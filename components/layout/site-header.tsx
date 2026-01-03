"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";

const NAV = [
    { href: "/#servicos", label: "Serviços" },
    { href: "/pacotes", label: "Pacotes Lavexpress" },
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
                    {NAV.map((i) => (
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
                        <a href="https://wa.me/5527996172403?text=Olá!%20Gostaria%20de%20agendar%20um%20serviço%20de%20lavanderia.%20Pode%20me%20ajudar?" target="_blank" rel="noreferrer">Agendar</a>
                    </Button>
                </div>

                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline">Menu</Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[320px] bg-white sm:w-[400px]">
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
                                    {NAV.map((i) => (
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
                                        <a href="https://wa.me/5527996172403?text=Olá!%20Gostaria%20de%20agendar%20um%20serviço%20de%20lavanderia.%20Pode%20me%20ajudar?" target="_blank" rel="noreferrer">
                                            Agendar Agora
                                        </a>
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
