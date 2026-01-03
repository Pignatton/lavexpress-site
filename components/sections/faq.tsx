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

const FAQS = [
    {
        icon: Wallet,
        question: "Lavar na lavanderia não sai muito caro?",
        answer: "Essa é a maior surpresa dos nossos clientes: na ponta do lápis, sai mais barato. Quando você soma o custo de sabão de qualidade, amaciante, tira-manchas, água, energia elétrica, manutenção da máquina e, principalmente, o valor do seu tempo, lavar em casa custa caro. Nossos Pacotes Lavexpress reduzem o custo por peça para centavos, com resultado profissional.",
    },
    {
        icon: Clock,
        question: "Quanto tempo eu ganho delegando isso?",
        answer: "Em média, uma família gasta de 4 a 6 horas semanais lavando, estendendo, recolhendo e passando roupas. Com a Lavexpress, esse tempo é todo seu novamente. Imagine ter um sábado inteiro livre para curtir a família ou descansar, sem se preocupar com o cesto de roupa suja.",
    },
    {
        icon: ShieldCheck,
        question: "Minhas roupas vão durar menos?",
        answer: "Pelo contrário, elas vão durar mais. A lavagem doméstica agressiva (sabão em pó comum, secagem ao sol forte, torção na máquina) desgasta as fibras. Nossos processos usam produtos biodegradáveis de alta tecnologia e secagem controlada que preservam as cores e a integridade do tecido por muito mais tempo.",
    },
    {
        icon: Sparkles,
        question: "E a parte chata de passar roupa?",
        answer: "Pode esquecer o ferro de passar. Entregamos suas roupas (dependendo do pacote) perfeitamente passadas e embaladas. Camisas sociais no cabide, lençóis dobrados com perfeição. A sensação de vestir uma roupa com acabamento profissional todos os dias é impagável.",
    },
    {
        question: "Como funciona a coleta e entrega?",
        answer: "Simples e sem burocracia. Temos rotas fixas semanais para pacotes recorrentes (você nem precisa pedir) e agendamento flexível para pedidos avulsos. Pode deixar na portaria se não estiver em casa. Nossa logística se adapta à sua rotina, não o contrário.",
    },
    {
        question: "O que acontece se uma peça manchar ou sumir?",
        answer: "Transparência total e garantia. Todas as peças são filmadas e catalogadas na entrada. Temos seguro total sobre os itens e processos rigorosos de rastreio. Se houver qualquer incidente (o que é raríssimo), nós resolvemos e indenizamos imediatamente. Sua tranquilidade é nossa prioridade.",
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
                                    Nossa equipe responde na hora pelo WhatsApp. Sem robôs, atendimento humano de verdade.
                                </p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <a
                                    href={buildWhatsAppLink({
                                        phoneE164: LAVEXPRESS.whatsappE164,
                                        text: "Olá, tenho uma dúvida sobre a Lavexpress."
                                    })}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
                                >
                                    Falar com atendente &rarr;
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
