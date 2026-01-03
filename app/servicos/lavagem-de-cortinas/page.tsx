import type { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LAVEXPRESS } from "@/lib/lavexpress";
import { buildWhatsAppLink } from "@/lib/whatsapp";
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
    "Limpeza profissional de cortinas e tapetes com remoção profunda de poeira, ácaros e odores. Renove seu ambiente com qualidade e segurança. Coleta e entrega em Vitória/ES.",
};

// Preços por serviço
const PRICE_TAPETE = 65; // R$ 65,00 por m²
const PRICE_CORTINA = 55; // R$ 55,00 por parte

function Stars({ rating = 4.7, count = 37 }: { rating?: number; count?: number }) {
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

                  <Stars rating={4.7} count={37} />

                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold text-slate-700 shadow-sm">
                    <span className="text-slate-500 font-bold">A partir de</span>
                    <span className="text-blue-600">R$ {formatBRL(PRICE_CORTINA)}/parte</span>
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                  Cortinas limpas mudam o{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                    ar da sua casa
                  </span>
                </h2>

                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  Cortinas acumulam <strong>poeira, ácaros e odores</strong> que você não vê,
                  mas sente. Nossa lavagem profissional devolve leveza, cor e
                  um ambiente muito mais saudável — sem esforço para você.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Remove poeira e alérgenos invisíveis",
                    "Não encolhe e não desbota",
                    "Renova a cor e o caimento",
                    "Coleta e entrega no conforto da sua casa",
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
                    <a href={waAgendar} target="_blank" rel="noreferrer">
                      Agendar lavagem de cortinas
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
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

                  <Stars rating={4.7} count={37} />

                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold text-slate-700 shadow-sm">
                    <span className="text-slate-500 font-bold">A partir de</span>
                    <span className="text-emerald-600">R$ {formatBRL(PRICE_TAPETE)}/m²</span>
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                  Tapetes limpos sem{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                    esforço, cheiro ou mofo
                  </span>
                </h2>

                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  Tapetes são pesados, difíceis de lavar e acumulam sujeira profunda.
                  Nossa limpeza profissional remove odores, renova as cores
                  e garante secagem completa — algo impossível em casa.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Limpeza profunda por m²",
                    "Secagem lenta e controlada (sem mofo)",
                    "Ideal para tapetes grossos e persas",
                    "Cores renovadas e textura preservada",
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
                    <a href={waAgendar} target="_blank" rel="noreferrer">
                      Agendar lavagem de tapetes
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
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
                Lavar em casa não remove a <strong>poeira profunda</strong> e pode encolher ou desbotar. Nosso processo é seguro para cada tipo de fibra.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              <Card className="p-6 md:p-8 rounded-2xl md:rounded-3xl border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-blue-600 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                  <Wind className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Ar mais saudável</h3>
                <p className="text-slate-600 leading-relaxed">
                  Removemos poeira, ácaros e alérgenos que ficam presos nas fibras. Sua família respira melhor.
                </p>
              </Card>

              <Card className="p-6 md:p-8 rounded-2xl md:rounded-3xl border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-emerald-600 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Cores renovadas</h3>
                <p className="text-slate-600 leading-relaxed">
                  A sujeira acumulada esconde a cor real. A lavagem profunda devolve o visual original.
                </p>
              </Card>

              <Card className="p-6 md:p-8 rounded-2xl md:rounded-3xl border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-purple-600 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Processo seguro</h3>
                <p className="text-slate-600 leading-relaxed">
                  Produtos específicos para cada tipo de fibra. Não encolhe, não desbota, não agride.
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
                  q: "Vocês instalam a cortina?",
                  a: "Temos parceiros e equipe para desmontagem e instalação. Consulte disponibilidade e valor no WhatsApp.",
                },
                {
                  q: "Tapete demora a secar?",
                  a: "Sim, tapetes grossos precisam de 7 a 10 dias para secar completamente sem cheiro de mofo. Garantimos secagem adequada.",
                },
                {
                  q: "Lavam tapete persa?",
                  a: "Sim, com processo delicado e produtos neutros específicos para fibras nobres. Cuidado especial para preservar cores e textura.",
                },
                {
                  q: "Como é calculado o valor?",
                  a: `Tapetes: R$ ${formatBRL(PRICE_TAPETE)}/m². Cortinas: R$ ${formatBRL(PRICE_CORTINA)}/parte. Confirmamos medidas e valor total no WhatsApp antes de fechar.`,
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
                <a href={waAgendar} target="_blank" rel="noreferrer">
                  <span className="hidden sm:inline">Quero agendar agora</span>
                  <span className="sm:hidden">Agendar agora</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
