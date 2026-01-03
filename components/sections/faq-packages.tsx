"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";

const FAQ_ITEMS = [
    {
        question: "Como funciona a validade dos pacotes?",
        answer: "Todos os pacotes têm validade de 90 dias (3 meses) a partir da data da compra. Você pode usar suas peças como quiser dentro desse período, sem pressa.",
    },
    {
        question: "O que acontece se eu não usar todas as peças?",
        answer: "As peças não utilizadas expiram após 90 dias. Recomendamos escolher um pacote adequado ao seu volume mensal para garantir o melhor custo-benefício.",
    },
    {
        question: "Posso incluir edredons ou ternos no pacote?",
        answer: "Não. Os pacotes são exclusivos para roupas do dia a dia (camisetas, calças, shorts, roupas de cama simples, toalhas). Peças especiais como edredons, ternos, vestidos de festa e tapetes são cobradas à parte na tabela de 'Peças Avulsas'.",
    },
    {
        question: "Como é feita a contagem das peças?",
        answer: "É super simples: 1 peça = 1 unidade do pacote. Exemplo: 1 camiseta = 1 peça. 1 calça jeans = 1 peça. Roupas íntimas e meias geralmente são contabilizadas em pares ou conjuntos, consulte nossa tabela detalhada no WhatsApp.",
    },
    {
        question: "Posso compartilhar o pacote com outra pessoa?",
        answer: "Sim! O pacote é vinculado ao seu cadastro, mas você pode enviar roupas de familiares que moram na mesma residência, desde que a coleta e entrega sejam no mesmo endereço.",
    },
    {
        question: "O pagamento é antecipado?",
        answer: "Sim, para garantir o desconto exclusivo dos pacotes, o pagamento é realizado na contratação (Pix ou Cartão). Assim você ganha créditos de peças para usar quando quiser.",
    },
];

export function FaqPackages() {
    return (
        <section className="py-16 bg-slate-50">
            <div className="container px-4 md:px-6">
                <div className="mx-auto max-w-3xl text-center mb-10">
                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 mb-4">
                        <HelpCircle className="h-3.5 w-3.5" />
                        Tira-dúvidas
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Perguntas Frequentes sobre Pacotes
                    </h2>
                </div>

                <div className="mx-auto max-w-2xl">
                    <Accordion type="single" collapsible className="w-full grid gap-4">
                        {FAQ_ITEMS.map((item, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border border-slate-200 bg-white px-6 rounded-2xl data-[state=open]:ring-2 data-[state=open]:ring-blue-100 transition-all"
                            >
                                <AccordionTrigger className="py-4 text-left font-semibold text-slate-900 hover:text-blue-600 hover:no-underline">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-600 leading-relaxed pb-4">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
