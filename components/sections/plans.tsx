"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PACOTES } from "@/lib/catalogo";
import { Check, MessageCircle } from "lucide-react";
import { LAVEXPRESS } from "@/lib/lavexpress";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { usePlanHighlight } from "@/lib/use-plan-highlight";

export function Plans() {
    usePlanHighlight();

    const waLink = buildWhatsAppLink({
        phoneE164: LAVEXPRESS.whatsappE164,
        text: "Olá! Gostaria de saber mais sobre os pacotes."
    });

    return (
        <section className="py-20 bg-white" id="planos">
            <div className="container px-4 md:px-6">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Lavar + Secar */}
                    <Card data-plan="wash-dry" className="border-slate-200 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-2 bg-green-500" />
                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-green-700">Lavar + Secar</CardTitle>
                            <p className="text-sm text-slate-500">Roupas limpas, secas e dobradas.</p>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {PACOTES.lavarSecar.slice(0, 5).map((p) => (
                                <div key={p.pecas} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0">
                                    <span className="font-medium text-slate-900">{p.pecas} peças</span>
                                    <div className="text-right">
                                        <div className="font-bold text-green-600">R$ {p.valor.toFixed(2).replace('.', ',')}</div>
                                        <div className="text-xs text-slate-500">R$ {p.porPeca.toFixed(2).replace('.', ',')} / peça</div>
                                    </div>
                                </div>
                            ))}
                            <Button variant="outline" className="w-full mt-4 border-green-200 text-green-700 hover:bg-green-50" asChild>
                                <a href={waLink} target="_blank" rel="noreferrer">Ver todos os tamanhos</a>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Lavar + Secar + Passar */}
                    <Card data-plan="wash-dry-iron" className="border-slate-200 shadow-xl hover:shadow-2xl transition-shadow relative overflow-hidden scale-105 z-10">
                        <div className="absolute top-0 left-0 right-0 h-2 bg-blue-600" />
                        <div className="absolute top-4 right-4">
                            <Badge className="bg-blue-600 hover:bg-blue-700">Mais Completo</Badge>
                        </div>
                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-blue-700">Lavar + Secar + Passar</CardTitle>
                            <p className="text-sm text-slate-500">O serviço completo para sua comodidade.</p>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {PACOTES.lavarSecarPassar.slice(0, 5).map((p) => (
                                <div key={p.pecas} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0">
                                    <span className="font-medium text-slate-900">{p.pecas} peças</span>
                                    <div className="text-right">
                                        <div className="font-bold text-blue-600">R$ {p.valor.toFixed(2).replace('.', ',')}</div>
                                        <div className="text-xs text-slate-500">R$ {p.porPeca.toFixed(2).replace('.', ',')} / peça</div>
                                    </div>
                                </div>
                            ))}
                            <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white" asChild>
                                <a href={waLink} target="_blank" rel="noreferrer">
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    Contratar Pacote
                                </a>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Passar */}
                    <Card data-plan="iron-only" className="border-slate-200 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-2 bg-slate-400" />
                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-slate-700">Só Passar</CardTitle>
                            <p className="text-sm text-slate-500">Suas roupas passadas com perfeição.</p>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {PACOTES.passar.map((p) => (
                                <div key={p.pecas} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0">
                                    <span className="font-medium text-slate-900">{p.pecas} peças</span>
                                    <div className="text-right">
                                        <div className="font-bold text-slate-600">R$ {p.valor.toFixed(2).replace('.', ',')}</div>
                                        <div className="text-xs text-slate-500">R$ {p.porPeca.toFixed(2).replace('.', ',')} / peça</div>
                                    </div>
                                </div>
                            ))}
                            <Button variant="outline" className="w-full mt-4" asChild>
                                <a href={waLink} target="_blank" rel="noreferrer">Falar com atendente</a>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-slate-500 max-w-2xl mx-auto">
                        * Todos os pacotes têm validade de 90 dias. Não estão inclusos: Edredons, Ternos, Vestidos de Festa e peças que não podem ir à máquina.
                    </p>
                </div>
            </div>
        </section>
    );
}
