import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LAVEXPRESS } from "@/lib/lavexpress";
import { buildAgendamentoMessage, buildWhatsAppLink } from "@/lib/whatsapp";

export function CtaFinal() {
    const text = buildAgendamentoMessage({
        tipoServico: "Recomendação de pacote (melhor custo-benefício)",
    });

    const link = buildWhatsAppLink({
        phoneE164: LAVEXPRESS.whatsappE164,
        text,
    });

    return (
        <section className="section pb-20 md:pb-14">
            <Card className="premium-card p-7 md:p-10 shadow-[var(--shadow-md)]">
                <div className="grid gap-6 md:grid-cols-2 md:items-center">
                    <div>
                        <h3 className="font-heading text-2xl md:text-3xl">
                            Agende agora e resolva sua lavanderia da semana com padrão profissional.
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground md:text-base">
                            Nós indicamos o melhor pacote para seu volume e já confirmamos o melhor horário de coleta.
                        </p>

                        <div className="mt-3 text-xs text-muted-foreground">
                            Coletas fixas (manhã): {LAVEXPRESS.pickupRules.fixedMorningDays.join(", ")} • Outros dias: {LAVEXPRESS.pickupRules.otherDaysMinNoticeHours}h de antecedência
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 md:items-end">
                        <Button asChild className="cta-ring w-full md:w-auto">
                            <a href={link} target="_blank" rel="noreferrer">
                                Agendar no WhatsApp
                            </a>
                        </Button>

                        <div className="text-xs text-muted-foreground">
                            Atendimento: {LAVEXPRESS.serviceAreas.join(", ")}
                        </div>
                    </div>
                </div>
            </Card>
        </section>
    );
}
