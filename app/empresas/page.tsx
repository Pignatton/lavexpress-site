import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SocialProofGoogle } from "@/components/sections/social-proof-google";
import { GoogleRatingBadgeClient } from "@/components/sections/google-rating-badge-client";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { LAVEXPRESS } from "@/lib/lavexpress";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import {
    ArrowRight,
    Building2,
    CheckCircle2,
    Clock,
    MapPin,
    MessageCircle,
    ShieldCheck,
    Shirt,
    Truck,
    Users,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Lavagem de uniformes para empresas em Vitória",
    description:
        "Lavagem e passadoria de uniformes leves, camisas sociais e roupas de escritório para empresas em Vitória, Vila Velha e Serra. Coleta e entrega. Orçamento pelo WhatsApp.",
    alternates: { canonical: "/empresas" },
    openGraph: {
        type: "website",
        url: "/empresas",
        title: "Uniformes leves e roupa de escritório — atendimento corporativo Lavexpress",
        description:
            "Camisa social, polo, calça e blazer leve da sua equipe, lavados e passados com coleta e entrega na Grande Vitória.",
    },
};

/* ------------------------------------------------------------------ *
 * Mensagens de WhatsApp — uma por intenção.
 *
 * Cada CTA manda uma mensagem diferente, então o atendimento já sabe de
 * onde a conversa veio e o que a pessoa quer. O `Ref: LX-XXXXXX` é
 * carimbado pelo <WhatsAppLink> no clique; nada de rastreio vai escrito
 * aqui dentro.
 * ------------------------------------------------------------------ */
const MSG_ORCAMENTO = `Olá! Quero um orçamento corporativo da Lavexpress.

Empresa:
Bairro/cidade:
Tipo de peça (camisa social, polo, calça, blazer):
Quantidade aproximada:
Frequência (semanal, quinzenal, mensal):
Precisa de passadoria? (sim / não)

Pode responder só o que já souber.`;

const MSG_CURTA =
    "Olá! Quero começar um atendimento corporativo na Lavexpress. Posso contar como é a rotina da minha equipe?";

const MSG_PASSADORIA =
    "Olá! Quero falar sobre passadoria para as roupas da minha equipe. (Empresa: ___ / Tipo de peça: ___ / Quantidade aproximada: ___)";

/* ------------------------------- dados ------------------------------ */

const PERFIS = [
    {
        icon: Building2,
        title: "Escritórios e equipes administrativas",
        text: "Camisaria e calça social do time que recebe cliente, atende no balcão e participa de reunião. Volume previsível, padrão de apresentação constante.",
    },
    {
        icon: ShieldCheck,
        title: "Advocacia, contabilidade e imobiliárias",
        text: "Rotina de audiência, visita e assinatura. Roupa social em uso diário, com necessidade real de passadoria bem feita e não só de lavagem.",
    },
    {
        icon: Users,
        title: "Equipes comerciais e de recepção",
        text: "Polo e camisa com identidade visual da empresa, usadas por quem está na linha de frente todos os dias.",
    },
    {
        icon: Truck,
        title: "Transportadoras e logística",
        text: "Camisa, polo e calça do escritório, da expedição e dos motoristas que trabalham com uniforme leve de apresentação.",
    },
    {
        icon: Shirt,
        title: "RH e gestão de facilities",
        text: "Quem resolve o problema de uniforme para o time inteiro e precisa de um fornecedor com rotina e contato direto — não de mais uma tarefa solta na agenda.",
    },
];

const PASSOS = [
    {
        n: 1,
        title: "Conte como é a sua rotina",
        text: "Você manda, pelo WhatsApp, o tipo de peça, a quantidade aproximada e com que frequência isso acontece. Não precisa de número exato: a ordem de grandeza já serve para desenhar o atendimento.",
    },
    {
        n: 2,
        title: "Combinamos o formato do atendimento",
        text: "A partir do que você descreveu, montamos o orçamento e definimos juntos o modelo que faz sentido: volume por envio, calendário de coleta e entrega e se a passadoria entra no fluxo.",
    },
    {
        n: 3,
        title: "Buscamos na empresa ou você traz",
        text: "Fazemos coleta e entrega em Vitória, Vila Velha e regiões selecionadas da Serra. Se preferir, sua equipe deixa e retira na nossa unidade no Jardim Camburi.",
    },
    {
        n: 4,
        title: "Conferimos e processamos",
        text: "As peças são conferidas na entrada, separadas por tipo e tratamento, lavadas, secas e — quando o atendimento inclui — passadas peça por peça.",
    },
    {
        n: 5,
        title: "Você acompanha pelo WhatsApp",
        text: "Falando com gente, não com robô. Dúvida sobre um envio, mudança de data, peça que precisa voltar antes: é a mesma conversa, no mesmo número.",
    },
    {
        n: 6,
        title: "Recebe pronto para usar",
        text: "As peças voltam dobradas ou em cabide, prontas para ir direto para o armário da empresa ou para a mão de cada pessoa.",
    },
];

const PECAS_SIM = [
    "Camisa social e camisaria em geral",
    "Polo de equipe, com ou sem bordado",
    "Camiseta de uniforme leve",
    "Calça social e calça de uniforme administrativo",
    "Blazer leve e peças de apresentação",
    "Terno e conjunto social",
];

const PECAS_APARTE = [
    "Peças com graxa ou óleo industrial",
    "Itens com contaminação química ou biológica",
    "EPI que exija descontaminação certificada",
    "Enxoval de hotelaria e lavagem industrial pesada",
];

const CONTROLES = [
    {
        icon: CheckCircle2,
        title: "Conferência na entrada e na saída",
        text: "Cada envio é conferido quando chega e quando sai. O que entrou é o que volta, e você sabe o que está em processo.",
    },
    {
        icon: Shirt,
        title: "Separação por tipo de peça",
        text: "Camisaria, calça, polo, blazer e peça social não vão todos pelo mesmo caminho. A separação por tipo e tratamento é o que mantém o caimento e a cor ao longo dos meses de uso.",
    },
    {
        icon: MessageCircle,
        title: "Um canal, uma conversa",
        text: "O atendimento corporativo acontece no WhatsApp, com histórico. O que foi combinado fica registrado na mesma conversa — sem protocolo e sem recomeçar a explicação a cada contato.",
    },
    {
        icon: Building2,
        title: "Operação local, com endereço",
        text: "Somos uma lavanderia de bairro, no Jardim Camburi, atendendo empresas da Grande Vitória. Você sabe onde a sua roupa está e com quem falar.",
    },
];

const REFORCOS = [
    {
        icon: Users,
        title: "Orçamento feito sobre o seu volume",
        text: "A proposta nasce do que a sua equipe realmente usa por semana, não de um pacote genérico.",
    },
    {
        icon: ShieldCheck,
        title: "Tudo combinado antes de começar",
        text: "Formato, calendário e condições ficam claros no orçamento, antes do primeiro envio.",
    },
    {
        icon: Truck,
        title: "Coleta e entrega na empresa",
        text: "Sua equipe não para a rotina para resolver roupa.",
    },
];

const FAQ = [
    {
        q: "Como funciona a cobrança para empresa?",
        a: "O orçamento corporativo é montado caso a caso, a partir de três informações: tipo de peça, quantidade aproximada por período e frequência. Com isso em mãos, passamos os valores e o formato de atendimento por escrito, no WhatsApp, antes de qualquer envio.",
    },
    {
        q: "Existe contrato ou volume mínimo?",
        a: "Não publicamos condição padrão nesta página justamente porque ela muda conforme o tamanho e o ritmo de cada equipe. Formato, periodicidade e condições são definidos junto com você no orçamento, com clareza e sem letra miúda.",
    },
    {
        q: "Vocês buscam e entregam na empresa?",
        a: "Sim. Fazemos coleta e entrega em Vitória, Vila Velha e regiões selecionadas da Serra. Os dias e horários são combinados de acordo com a rotina do seu escritório. Se for mais prático, sua equipe também pode deixar e retirar na nossa unidade no Jardim Camburi.",
    },
    {
        q: "Como vocês controlam as peças de cada pessoa?",
        a: "Cada envio é conferido na entrada e na saída, com separação por tipo de peça e tratamento. Para equipes que precisam de identificação individual, combinamos a forma de marcação e organização na hora do orçamento, antes do primeiro envio.",
    },
    {
        q: "As peças voltam passadas?",
        a: "Podem voltar passadas, sim — a passadoria é um serviço próprio e entra no atendimento quando você quiser. Também atendemos empresas que só precisam do acabamento, sem a lavagem. Os dois formatos são definidos no orçamento.",
    },
    {
        q: "Em quanto tempo a roupa volta?",
        a: `Na nossa operação, lavagem e secagem ficam prontas em ${LAVEXPRESS.sla.washDryHoursMin} a ${LAVEXPRESS.sla.washDryHoursMax} horas e passadoria leva de ${LAVEXPRESS.sla.washDryIronBusinessDaysMin} a ${LAVEXPRESS.sla.washDryIronBusinessDaysMax} dias úteis. Para empresas, esses prazos servem de referência: os dias de coleta e de entrega são combinados com você no orçamento, de acordo com o volume e a frequência da sua equipe.`,
    },
    {
        q: "Minha equipe é pequena. Vale a pena conversar?",
        a: "Vale. Não existe tamanho mínimo para conversar: o orçamento é montado sobre o volume real da sua equipe, seja ela de cinco ou de cinquenta pessoas. Conte quantas são e com que frequência a roupa precisa estar pronta, e montamos o atendimento no tamanho da sua operação.",
    },
];

function Pill({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold shadow-sm text-sm text-slate-700">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            {children}
        </span>
    );
}

export default function EmpresasPage() {
    const waOrcamento = buildWhatsAppLink({
        phoneE164: LAVEXPRESS.whatsappE164,
        text: MSG_ORCAMENTO,
    });

    const waCurta = buildWhatsAppLink({
        phoneE164: LAVEXPRESS.whatsappE164,
        text: MSG_CURTA,
    });

    const waPassadoria = buildWhatsAppLink({
        phoneE164: LAVEXPRESS.whatsappE164,
        text: MSG_PASSADORIA,
    });

    return (
        <>
            <SiteHeader />

            <main className="min-h-screen bg-slate-50/50">
                {/* ---------------------------------------------- HERO */}
                <section className="relative overflow-hidden bg-white">
                    <div
                        className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/14 to-green-500/12 blur-3xl"
                        aria-hidden="true"
                    />
                    <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-20">
                        <div className="max-w-3xl">
                            <div className="flex flex-wrap items-center gap-3 mb-5">
                                <Badge className="bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                                    Atendimento corporativo
                                </Badge>
                                <GoogleRatingBadgeClient />
                            </div>

                            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-4 md:mb-6 leading-tight text-balance">
                                Lavagem de uniformes e{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                                    roupa de escritório
                                </span>{" "}
                                para empresas em Vitória
                            </h1>

                            <p className="text-base md:text-lg lg:text-xl text-slate-600 mb-6 leading-relaxed text-pretty">
                                Camisa social, polo, calça e blazer leve da sua equipe lavados, passados e
                                devolvidos prontos para usar — com coleta e entrega em Vitória, Vila Velha
                                e regiões selecionadas da Serra.
                            </p>

                            <div className="flex flex-wrap items-center gap-3 mb-8">
                                <Pill>Coleta e entrega</Pill>
                                <Pill>Peça conferida na entrada e na saída</Pill>
                                <Pill>Orçamento pelo WhatsApp</Pill>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    className="h-12 md:h-14 px-6 md:px-10 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all font-extrabold text-base md:text-lg"
                                    asChild
                                >
                                    <WhatsAppLink href={waOrcamento} target="_blank" rel="noreferrer">
                                        <span className="hidden sm:inline">Pedir orçamento no WhatsApp</span>
                                        <span className="sm:hidden">Pedir orçamento</span>
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </WhatsAppLink>
                                </Button>

                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-12 md:h-14 px-6 md:px-10 rounded-xl border-slate-200 bg-white text-slate-900 hover:bg-slate-50 font-extrabold text-base md:text-lg"
                                    asChild
                                >
                                    <Link href="#como-funciona">
                                        Ver como funciona
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                            </div>

                            <p className="mt-6 text-sm text-slate-500 leading-relaxed">
                                Atendemos a partir do Jardim Camburi. Conte como é a rotina da sua equipe e
                                montamos um orçamento com base no volume e na frequência reais.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ------------------------------------------ PARA QUEM É */}
                <section className="py-12 md:py-20">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 text-balance">
                            Para quem é o atendimento corporativo da Lavexpress
                        </h2>
                        <div className="max-w-3xl space-y-4 text-slate-600 leading-relaxed mb-10">
                            <p>
                                Nosso foco é um só: a roupa que sua equipe veste para atender, reunir e
                                representar a empresa. Camisa social que precisa chegar impecável na
                                recepção, polo de equipe comercial, calça do administrativo, blazer leve
                                que fica pendurado atrás da cadeira e sai para a reunião.
                            </p>
                            <p>
                                Enxoval de hotelaria e lavagem industrial seguem outra lógica, com outro
                                tipo de processo. A nossa é a roupa de apresentação — aquela em que
                                amassado, colarinho torto e cheiro de armário aparecem na primeira
                                impressão que o cliente tem do seu negócio.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {PERFIS.map((p) => (
                                <Card key={p.title} className="p-6 bg-white border-slate-100 shadow-sm">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 flex items-center justify-center mb-4">
                                        <p.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="font-extrabold text-slate-900 mb-2">{p.title}</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">{p.text}</p>
                                </Card>
                            ))}
                        </div>

                        <div className="mt-10">
                            <Button
                                size="lg"
                                className="h-12 md:h-14 px-6 md:px-10 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all font-extrabold text-base md:text-lg"
                                asChild
                            >
                                <WhatsAppLink href={waOrcamento} target="_blank" rel="noreferrer">
                                    <span className="hidden sm:inline">Quero um orçamento para minha equipe</span>
                                    <span className="sm:hidden">Quero um orçamento</span>
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </WhatsAppLink>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* ------------------------------------------ COMO FUNCIONA */}
                <section id="como-funciona" className="py-12 md:py-20 bg-white scroll-mt-20">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-3 text-balance">
                            Como enviar e receber
                        </h2>
                        <p className="text-slate-600 mb-10 max-w-2xl">
                            Sem fila, sem planilha nova e sem ninguém da equipe carregando sacola para casa.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {PASSOS.map((p) => (
                                <div
                                    key={p.n}
                                    className="p-6 rounded-2xl border border-slate-100 bg-slate-50/60"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-extrabold flex items-center justify-center mb-4">
                                        {p.n}
                                    </div>
                                    <h3 className="font-extrabold text-slate-900 mb-2">{p.title}</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">{p.text}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10">
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-12 md:h-14 px-6 md:px-10 rounded-xl border-slate-200 bg-white text-slate-900 hover:bg-slate-50 font-extrabold text-base md:text-lg"
                                asChild
                            >
                                <WhatsAppLink href={waCurta} target="_blank" rel="noreferrer">
                                    Começar pelo WhatsApp
                                    <MessageCircle className="ml-2 h-5 w-5" />
                                </WhatsAppLink>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* ------------------------------------------ QUAIS PEÇAS */}
                <section className="py-12 md:py-20">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 text-balance">
                            Quais peças entram no atendimento corporativo
                        </h2>
                        <p className="text-slate-600 mb-10 max-w-3xl leading-relaxed">
                            Nosso processo é desenhado para uniforme leve e roupa de apresentação. Em
                            termos práticos, é o que sai do uso normal de escritório, atendimento e
                            administrativo: transpiração do dia, café, caneta, poeira leve, marca de cinto
                            de segurança, vinco de cadeira.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <h3 className="text-lg font-extrabold text-slate-900">
                                        Peças que fazem parte do nosso dia a dia
                                    </h3>
                                </div>
                                <ul className="space-y-4">
                                    {PECAS_SIM.map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-700"
                                        >
                                            <span
                                                className="h-2 w-2 rounded-full bg-emerald-500 mr-3 shrink-0"
                                                aria-hidden="true"
                                            />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-5 bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-sm text-slate-700 leading-relaxed">
                                    O que o nosso processo entrega bem: caimento preservado, cor viva por
                                    mais tempo, colarinho e punho com acabamento de passadoria, costura e
                                    botão conferidos na saída.
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                                        <span className="text-red-600 font-extrabold text-xl" aria-hidden="true">
                                            ×
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-extrabold text-slate-900">
                                        O que é tratado à parte
                                    </h3>
                                </div>
                                <ul className="space-y-4">
                                    {PECAS_APARTE.map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-700"
                                        >
                                            <span
                                                className="h-2 w-2 rounded-full bg-red-400 mr-3 shrink-0"
                                                aria-hidden="true"
                                            />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-5 bg-white p-4 rounded-xl border border-slate-200 text-sm text-slate-700 leading-relaxed">
                                    Se algum item desse tipo aparecer no seu volume, sinalizamos já na
                                    conversa do orçamento e explicamos com clareza o que entra e o que não
                                    entra, antes de qualquer envio. Assim você fecha o atendimento sabendo
                                    exatamente o que está contratando.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ------------------------------------------ PASSADORIA */}
                <section className="py-12 md:py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 text-balance">
                            Passadoria: a parte que mais aparece
                        </h2>
                        <div className="space-y-4 text-slate-600 leading-relaxed mb-8">
                            <p>
                                Em roupa de apresentação, a lavagem resolve a higiene e a passadoria resolve
                                a imagem. Uma camisa limpa e amassada não passa a mensagem que você quer
                                passar.
                            </p>
                            <p>
                                A passadoria é um serviço próprio, com processo e tempo próprios — ela pode
                                ser combinada junto com a lavagem ou tratada como atendimento separado, para
                                a empresa que já lava internamente e só precisa do acabamento. No orçamento,
                                definimos qual dos dois formatos funciona melhor para a sua operação.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <Button
                                size="lg"
                                className="h-12 md:h-14 px-6 md:px-10 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all font-extrabold text-base md:text-lg"
                                asChild
                            >
                                <WhatsAppLink href={waPassadoria} target="_blank" rel="noreferrer">
                                    <span className="hidden sm:inline">Falar sobre passadoria para a equipe</span>
                                    <span className="sm:hidden">Falar sobre passadoria</span>
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </WhatsAppLink>
                            </Button>

                            <Link
                                href="/servicos/passadoria"
                                className="text-sm font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4"
                            >
                                Ver a página de passadoria
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ------------------------------------------ PRAZOS */}
                <section className="py-12 md:py-20">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="flex items-center gap-3 mb-4">
                            <Clock className="h-6 w-6 text-blue-600" />
                            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 text-balance">
                                Prazos e ritmo da operação
                            </h2>
                        </div>
                        <div className="space-y-4 text-slate-600 leading-relaxed">
                            <p>
                                Na nossa operação do dia a dia, lavagem e secagem ficam prontas em{" "}
                                <strong>
                                    {LAVEXPRESS.sla.washDryHoursMin} a {LAVEXPRESS.sla.washDryHoursMax} horas
                                </strong>
                                , e passadoria leva de{" "}
                                <strong>
                                    {LAVEXPRESS.sla.washDryIronBusinessDaysMin} a{" "}
                                    {LAVEXPRESS.sla.washDryIronBusinessDaysMax} dias úteis
                                </strong>
                                .
                            </p>
                            <p>
                                Para empresas, esses números servem como referência de como a casa
                                trabalha. Os dias de coleta e de entrega do seu atendimento são combinados
                                com você no orçamento, a partir do volume e da frequência da sua equipe —
                                e só são confirmados depois que a gente verificar que cabe na operação.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ------------------------------------------ CONTROLES */}
                <section className="py-12 md:py-20 bg-white">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-10 text-balance">
                            Conferência, controle e retorno
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {CONTROLES.map((c) => (
                                <Card key={c.title} className="p-6 bg-white border-slate-100 shadow-sm">
                                    <div className="flex items-start gap-4">
                                        <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center">
                                            <c.icon className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-extrabold text-slate-900 mb-1.5">{c.title}</h3>
                                            <p className="text-sm text-slate-600 leading-relaxed">{c.text}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ------------------------------------------ AVALIAÇÕES */}
                <section className="py-12 md:py-20">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-3 text-balance">
                            Avaliações no Google
                        </h2>
                        <p className="text-slate-600 mb-8 max-w-2xl leading-relaxed">
                            Antes de confiar o uniforme da sua equipe a alguém, vale ler quem já é cliente.
                            Nossas avaliações no Google ficam abertas, com nome e data.
                        </p>
                    </div>
                    <SocialProofGoogle />
                </section>

                {/* ------------------------------------------ ONDE ATENDEMOS */}
                <section className="py-12 md:py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="flex items-center gap-3 mb-4">
                            <MapPin className="h-6 w-6 text-emerald-600" />
                            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 text-balance">
                                Onde atendemos
                            </h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-5">
                            Coleta e entrega em <strong>Vitória</strong>, <strong>Vila Velha</strong> e{" "}
                            <strong>regiões selecionadas da Serra</strong>, com base no Jardim Camburi.
                        </p>
                        <div className="flex flex-wrap gap-3 mb-6">
                            {LAVEXPRESS.serviceAreas.map((area) => (
                                <Pill key={area}>{area}</Pill>
                            ))}
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            Não tem certeza se o endereço da sua empresa está na rota? Manda o bairro na
                            mensagem e confirmamos na hora.
                        </p>
                    </div>
                </section>

                {/* ------------------------------------------ ORÇAMENTO */}
                <section className="py-12 md:py-20">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-3 text-balance">
                            Peça o orçamento da sua equipe
                        </h2>
                        <p className="text-slate-600 mb-10 max-w-2xl leading-relaxed">
                            Você descreve a rotina, nós montamos a proposta. Em uma conversa de WhatsApp,
                            sem formulário longo e sem compromisso.
                        </p>

                        <div className="grid md:grid-cols-3 gap-6 mb-10">
                            {REFORCOS.map((r) => (
                                <Card key={r.title} className="p-6 bg-white border-slate-100 shadow-sm">
                                    <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                                        <r.icon className="h-5 w-5 text-emerald-600" />
                                    </div>
                                    <h3 className="font-extrabold text-slate-900 mb-1.5">{r.title}</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">{r.text}</p>
                                </Card>
                            ))}
                        </div>

                        <Button
                            size="lg"
                            className="h-12 md:h-14 px-6 md:px-10 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all font-extrabold text-base md:text-lg"
                            asChild
                        >
                            <WhatsAppLink href={waOrcamento} target="_blank" rel="noreferrer">
                                <span className="hidden sm:inline">Pedir orçamento no WhatsApp</span>
                                <span className="sm:hidden">Pedir orçamento</span>
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </WhatsAppLink>
                        </Button>
                    </div>
                </section>

                {/* ------------------------------------------ FAQ */}
                <section className="py-12 md:py-20 bg-white">
                    <div className="max-w-3xl mx-auto px-4">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-10 text-balance">
                            Perguntas de quem decide
                        </h2>
                        <Accordion type="single" collapsible className="w-full grid gap-4">
                            {FAQ.map((item, i) => (
                                <AccordionItem
                                    key={item.q}
                                    value={`item-${i}`}
                                    className="border border-slate-200 bg-white px-6 rounded-2xl data-[state=open]:ring-2 data-[state=open]:ring-blue-100 transition-all"
                                >
                                    <AccordionTrigger className="py-4 text-left font-semibold text-slate-900 hover:text-blue-600 hover:no-underline">
                                        {item.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-600 leading-relaxed pb-4">
                                        {item.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>

                {/* ------------------------------------------ CTA FINAL */}
                <section className="py-14 md:py-20 bg-gradient-to-br from-emerald-600 to-green-700 text-white">
                    <div className="max-w-3xl mx-auto px-4 text-center">
                        <h2 className="text-2xl md:text-4xl font-extrabold mb-4 text-balance">
                            Sua equipe bem apresentada, sem virar trabalho do seu dia
                        </h2>
                        <p className="text-emerald-50 mb-8 leading-relaxed">
                            Conte o tipo de peça, a quantidade aproximada e a frequência. Respondemos com o
                            formato de atendimento e o orçamento.
                        </p>
                        <Button
                            size="lg"
                            className="h-12 md:h-14 px-6 md:px-10 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 shadow-lg font-extrabold text-base md:text-lg"
                            asChild
                        >
                            <WhatsAppLink href={waOrcamento} target="_blank" rel="noreferrer">
                                <span className="hidden sm:inline">Pedir orçamento corporativo</span>
                                <span className="sm:hidden">Pedir orçamento</span>
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </WhatsAppLink>
                        </Button>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </>
    );
}
