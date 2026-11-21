import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Clock, Wallet, ShieldCheck, Sparkles } from "lucide-react";
import { LAVEXPRESS } from "@/lib/lavexpress";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { PACOTES } from "@/lib/catalogo";

const PACOTE_MENOR = PACOTES.lavarSecar[0];
const PACOTE_MAIOR = PACOTES.lavarSecar[PACOTES.lavarSecar.length - 1];
const brl = (n: number) => n.toFixed(2).replace(".", ",");

const FAQS = [
    {
        icon: Wallet,
        question: "Lavar na lavanderia não sai muito caro?",
        // Só afirma o que a tabela de preços sustenta: os dois extremos do
        // pacote lavar + secar, cada valor por peça junto do tamanho do pacote.
        answer: `Nos Pacotes Lavexpress, quanto maior o pacote, menor o valor por peça: no lavar + secar, vai de R$ ${brl(PACOTE_MENOR.porPeca)}/peça no pacote de ${PACOTE_MENOR.pecas} peças a R$ ${brl(PACOTE_MAIOR.porPeca)}/peça no pacote de ${PACOTE_MAIOR.pecas} peças. Para comparar com lavar em casa, some sabão, amaciante, tira-manchas, água, energia elétrica, manutenção da máquina e o seu tempo.`,
    },
    {
        icon: Clock,
        question: "Quanto tempo eu ganho delegando isso?",
        answer: "Lavar, estender, recolher e passar roupa toma horas da semana. Com a Lavexpress, esse tempo volta para você: o sábado fica livre para a família ou para descansar, sem o cesto de roupa suja esperando.",
    },
    {
        icon: ShieldCheck,
        question: "Minhas roupas vão durar menos?",
        answer: `Cada peça é lavada conforme o que ela suporta. ${LAVEXPRESS.regrasPacotes.exclusoes} Essas peças são avaliadas à parte, com valor e prazo combinados antes. Se tiver dúvida sobre alguma peça, mande uma foto no WhatsApp.`,
    },
    {
        icon: Sparkles,
        question: "E a parte chata de passar roupa?",
        answer: "Pode esquecer o ferro de passar. Entregamos suas roupas (dependendo do pacote) perfeitamente passadas e embaladas. Camisas sociais no cabide, lençóis dobrados com perfeição. A sensação de vestir uma roupa com acabamento profissional todos os dias é impagável.",
    },
    {
        question: "Como funciona a coleta e entrega?",
        answer: `As coletas são feitas pela manhã, nos dias fixos de coleta (${LAVEXPRESS.pickupRules.fixedMorningDays.join(", ").replace(/, ([^,]*)$/, " e $1")}). ${LAVEXPRESS.coletaEntrega.condicaoFrase} Você também pode trazer e retirar na loja.`,
    },
    {
        question: "O que acontece se uma peça manchar ou sumir?",
        answer: "Se acontecer qualquer problema com uma peça, fale com a gente pelo WhatsApp. Avaliamos cada caso diretamente com você.",
    },
];

export function Faq() {
    return (
        <section className="bg-slate-50 py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header Centered */}
                <div className="mx-auto max-w-3xl text-center mb-12">
                    <Badge variant="outline" className="mb-4 border-blue-200 bg-blue-50 text-blue-700">
                        Dúvidas Comuns
                    </Badge>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                        Por que a Lavexpress é indispensável?
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Mais que lavar roupas, nós vendemos tempo livre e qualidade de vida. Entenda por que quem começa, não para.
                    </p>
                </div>

                {/* FAQ Grid/List */}
                <div className="mx-auto max-w-3xl">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {FAQS.map((faq, index) => {
                            const Icon = faq.icon;
                            return (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border border-slate-200 bg-white px-4 md:px-6 rounded-2xl data-[state=open]:border-blue-200 data-[state=open]:shadow-md transition-all duration-200"
                                >
                                    <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-slate-800 hover:text-blue-600 hover:no-underline py-5 md:py-6">
                                        <div className="flex items-start gap-3">
                                            {Icon && <Icon className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />}
                                            {faq.question}
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-sm md:text-base leading-relaxed text-slate-600 pb-5 md:pb-6">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>

                    {/* Contact Box - Below Questions */}
                    <div className="mt-12">
                        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 md:flex md:items-center md:justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                                        <MessageCircle className="h-5 w-5" />
                                    </div>
                                    <div className="font-semibold text-slate-900">Ainda tem dúvida?</div>
                                </div>
                                <p className="text-sm text-slate-600 max-w-md">
                                    Nossa equipe responde pelo WhatsApp, com atendimento humano.
                                </p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <WhatsAppLink
                                    href={buildWhatsAppLink({
                                        phoneE164: LAVEXPRESS.whatsappE164,
                                        text: "Olá, tenho uma dúvida sobre a Lavexpress."
                                    })}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
                                >
                                    Falar com atendente &rarr;
                                </WhatsAppLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
