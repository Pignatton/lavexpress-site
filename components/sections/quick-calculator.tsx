"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ITEMS, calcularTotal, formatarMoeda } from "@/lib/calcularEstimativa";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { LAVEXPRESS } from "@/lib/lavexpress";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { motion } from "framer-motion";

export function QuickCalculator() {
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

    const updateQuantity = (id: string, delta: number) => {
        setQuantities((prev) => {
            const current = prev[id] || 0;
            const newQuantity = Math.max(0, current + delta);
            return { ...prev, [id]: newQuantity };
        });
    };

    const total = calcularTotal(quantities);
    const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);

    const handleSchedule = () => {
        const itemsList = Object.entries(quantities)
            .filter(([_, qty]) => qty > 0)
            .map(([id, qty]) => {
                const item = ITEMS.find((i) => i.id === id);
                return `${qty}x ${item?.name}`;
            })
            .join(", ");

        const message = `Olá! Fiz uma simulação no site:\n\n${itemsList}\n\n*Total Estimado: ${formatarMoeda(total)}*\n\nGostaria de agendar a coleta.`;

        const link = buildWhatsAppLink({
            phoneE164: LAVEXPRESS.whatsappE164,
            text: message
        });
        window.open(link, "_blank");
    };

    return (
        <section className="py-20 bg-slate-50" id="calculadora">
            <div className="container px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                            Quanto vai custar?
                        </h2>
                        <p className="mt-4 text-lg text-slate-600">
                            Faça uma simulação rápida dos itens mais comuns. Temos preços transparentes e justos para você não ter surpresas.
                        </p>

                        <div className="mt-8 grid gap-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                    <ShoppingBag className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Coleta e Entrega Grátis</h3>
                                    <p className="text-sm text-slate-600">Para pedidos acima de R$ 100,00 em bairros atendidos.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Card className="border-slate-200 shadow-xl bg-white/80 backdrop-blur">
                        <CardHeader>
                            <CardTitle>Simulador de Preço</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-4">
                                {ITEMS.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-slate-900">{item.name}</span>
                                            <span className="text-xs text-slate-500">{formatarMoeda(item.price)}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8 rounded-full"
                                                onClick={() => updateQuantity(item.id, -1)}
                                                disabled={!quantities[item.id]}
                                            >
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="w-4 text-center font-medium">{quantities[item.id] || 0}</span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8 rounded-full"
                                                onClick={() => updateQuantity(item.id, 1)}
                                            >
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 rounded-xl bg-slate-50 p-4 border border-slate-100">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm text-slate-600">Total Estimado</span>
                                    <span className="text-2xl font-bold text-slate-900">{formatarMoeda(total)}</span>
                                </div>
                                <Button
                                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-green-600 hover:brightness-110 shadow-lg shadow-blue-600/20"
                                    onClick={handleSchedule}
                                    disabled={totalItems === 0}
                                >
                                    Agendar Coleta com esses itens
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
