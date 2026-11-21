import type { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LAVEXPRESS } from "@/lib/lavexpress";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppLink } from "@/components/whatsapp-link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Truck,
  Star,
  Zap,
  Wind,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Lavagem de Cortinas e Tapetes | Lavexpress",
  description:
    "Lavagem de cortinas e tapetes na Lavexpress, em Jardim Camburi. Valor e prazo confirmados antes de fechar. Coleta e entrega em Vitória/ES: consulte as condições.",
};

// Preços por serviço
// Tapete: a tabela de preços 2027 não traz valor. Enquanto não houver um
// preço aprovado, a página não mostra número (o antigo era R$ 65,00/m²).
const TAPETE_SEM_PRECO = "sob consulta";
// Unidade de cobrança (por parte, por cortina, por metro) ainda não confirmada:
// a página mostra só "a partir de", sem unidade.
const PRICE_CORTINA = 60; // a partir de R$ 60,00 (tabela 2027)

function Stars({ rating = LAVEXPRESS.google.rating, count = LAVEXPRESS.google.reviews }: { rating?: number; count?: number }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold text-slate-700 shadow-sm">
      <div className="flex items-center gap-1 text-yellow-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <span>
        {String(rating).replace(".", ",")} no Google ({count})
      </span>
    </div>
  );
}

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function CortinasPage() {
  const waAgendar = buildWhatsAppLink({
    phoneE164: LAVEXPRESS.whatsappE164,
    text:
      "Olá! Quero lavar cortinas/tapetes. Pode me informar coleta/entrega e o valor? (Tipo: ___ / Tamanho aproximado: ___ / Bairro: ___)",
  });



  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-slate-50/50">
        {/* CORTINAS + TAPETES (DUAL HERO SECTION) */}
        <section className="py-20 md:py-28 bg-slate-50/50">
          <div className="container mx-auto px-4 md:px-6 space-y-28">
            {/* ===================== */}
            {/* HERO CORTINAS */}
            {/* ===================== */}
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              {/* TEXTO */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Badge
                    variant="outline"
                    className="border-blue-200 bg-blue-50 text-blue-700 px-4 py-1.5 text-sm font-extrabold rounded-full"
                  >
                    Lavagem de Cortinas
                  </Badge>

                  <Stars />

                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold text-slate-700 shadow-sm">
                    <span className="text-slate-500 font-bold">A partir de</span>
                    <span className="text-blue-600">R$ {formatBRL(PRICE_CORTINA)}</span>
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                  Cortinas limpas,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                    sem trabalho para você
                  </span>
                </h2>

                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  Cortina é grande e pesada para lavar em casa. A Lavexpress lava para você,{" "}
                  <strong>sem ocupar sua máquina nem o seu varal</strong>, e confirma valor e prazo antes de fechar.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Sem ocupar sua máquina nem o seu varal",
                    "Valor e prazo confirmados antes de fechar",
                    `Coleta e entrega: ${LAVEXPRESS.coletaEntrega.condicao}`,
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <span className="text-slate-700 font-semibold">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="h-14 px-10 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-extrabold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                    asChild
                  >
                    <WhatsAppLink href={waAgendar} target="_blank" rel="noreferrer">
                      Agendar lavagem de cortinas
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </WhatsAppLink>
                  </Button>
                </div>
              </div>

              {/* IMAGEM */}
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 blur-3xl rounded-[3rem]" />
                <Image
                  src="/images/cortina_hero_clean_1767393559850.png"
                  alt="Cortinas limpas e renovadas"
                  width={900}
                  height={600}
                  className="relative rounded-[2rem] shadow-2xl object-cover"
                  priority
                />
              </div>
            </div>

            {/* ===================== */}
            {/* HERO TAPETES */}
            {/* ===================== */}
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              {/* IMAGEM */}
              <div className="relative lg:order-1 order-2">
                <div className="absolute -inset-6 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 blur-3xl rounded-[3rem]" />
                <Image
                  src="/images/tapete_hero_clean_1767393546527.png"
                  alt="Tapete limpo com cores renovadas"
                  width={900}
                  height={600}
                  className="relative rounded-[2rem] shadow-2xl object-cover"
                />
              </div>

              {/* TEXTO */}
              <div className="lg:order-2 order-1">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Badge
                    variant="outline"
                    className="border-emerald-200 bg-emerald-50 text-emerald-700 px-4 py-1.5 text-sm font-extrabold rounded-full"
                  >
                    Lavagem de Tapetes
                  </Badge>

                  <Stars />

                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold text-slate-700 shadow-sm">
                    <span className="text-slate-500 font-bold">Valor</span>
                    <span className="text-emerald-600">{TAPETE_SEM_PRECO}</span>
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                  Tapetes limpos{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                    sem esforço
                  </span>
                </h2>

                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  Tapete é pesado e difícil de lavar e secar em casa. Mande uma foto no WhatsApp:
                  confirmamos se dá para lavar, o valor e o prazo antes de fechar.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    `Valor ${TAPETE_SEM_PRECO}, informado antes de fechar`,
                    "Prazo informado na avaliação",
                    `Coleta e entrega: ${LAVEXPRESS.coletaEntrega.condicao}`,
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <span className="text-slate-700 font-semibold">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="h-14 px-10 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-extrabold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                    asChild
                  >
                    <WhatsAppLink href={waAgendar} target="_blank" rel="noreferrer">
                      Agendar lavagem de tapetes
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </WhatsAppLink>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="py-12 md:py-16 bg-white border-y border-slate-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge
                variant="outline"
                className="mb-4 border-slate-200 bg-white text-slate-700 px-4 py-1.5 text-sm font-extrabold rounded-full"
              >
                Por que Lavexpress?
              </Badge>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 md:mb-4">
                Porque cortinas e tapetes exigem cuidado especializado
              </h2>
              <p className="text-slate-600 leading-relaxed">
                São peças grandes e pesadas para lavar e secar em casa. Na Lavexpress, você sabe o <strong>valor e o prazo antes</strong> de autorizar.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              <Card className="p-6 md:p-8 rounded-2xl md:rounded-3xl border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-blue-600 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                  <Wind className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Sem esforço em casa</h3>
                <p className="text-slate-600 leading-relaxed">
                  Nada de máquina cheia, varal ocupado e peça pesada para secar.
                </p>
              </Card>

              <Card className="p-6 md:p-8 rounded-2xl md:rounded-3xl border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-emerald-600 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Avaliação antes</h3>
                <p className="text-slate-600 leading-relaxed">
                  Olhamos o tecido e o estado da peça antes de dar o orçamento.
                </p>
              </Card>

              <Card className="p-6 md:p-8 rounded-2xl md:rounded-3xl border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-purple-600 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Valor e prazo antes</h3>
                <p className="text-slate-600 leading-relaxed">
                  Você só autoriza depois de saber quanto custa e quando fica pronto.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ (objeções) */}
        <section className="py-12 md:py-16 bg-white border-t border-slate-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 md:mb-4">
                Dúvidas rápidas
              </h2>
              <p className="text-slate-600">
                Respostas diretas para as dúvidas que mais travam o agendamento.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {[
                {
                  q: "E a retirada e a instalação da cortina?",
                  a: "Fale com a gente no WhatsApp antes de agendar para combinar como a cortina chega e volta.",
                },
                {
                  q: "Tapete demora a secar?",
                  a: "Depende da espessura e do material. O prazo é informado na avaliação, antes de fechar.",
                },
                {
                  q: "Lavam qualquer tipo de tapete?",
                  a: "Depende do material e do tamanho. Mande uma foto no WhatsApp e confirmamos se dá para lavar, o valor e o prazo.",
                },
                {
                  q: "Como é calculado o valor?",
                  a: `Cortinas: a partir de R$ ${formatBRL(PRICE_CORTINA)}. Tapetes: ${TAPETE_SEM_PRECO}. Confirmamos medidas e valor total no WhatsApp antes de fechar.`,
                },
              ].map((item) => (
                <Card key={item.q} className="p-6 rounded-2xl border-slate-100 bg-slate-50/50">
                  <div className="font-extrabold text-slate-900 mb-2">{item.q}</div>
                  <div className="text-sm text-slate-600 leading-relaxed">{item.a}</div>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button
                size="lg"
                className="h-12 md:h-14 px-6 md:px-10 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all font-extrabold text-base md:text-lg"
                asChild
              >
                <WhatsAppLink href={waAgendar} target="_blank" rel="noreferrer">
                  <span className="hidden sm:inline">Quero agendar agora</span>
                  <span className="sm:hidden">Agendar agora</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </WhatsAppLink>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
