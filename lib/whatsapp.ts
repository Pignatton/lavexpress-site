import { LAVEXPRESS } from "@/lib/lavexpress";

export function buildWhatsAppLink(params: {
    phoneE164: string; // Ex: "5527999999999"
    text: string;
}): string {
    const base = `https://wa.me/${params.phoneE164}`;
    const q = new URLSearchParams({ text: params.text });
    return `${base}?${q.toString()}`;
}

export function buildAgendamentoMessage(input: {
    nome?: string;
    enderecoOuBairro?: string;
    tipoServico?: string;
}): string {
    const nome = input.nome?.trim() ? `Olá! Meu nome é ${input.nome.trim()}. ` : "Olá! ";
    const local = input.enderecoOuBairro?.trim()
        ? `Meu bairro/CEP é ${input.enderecoOuBairro.trim()}. `
        : "";

    const servico = input.tipoServico?.trim()
        ? `Quero agendar: ${input.tipoServico.trim()}. `
        : "Quero agendar uma coleta. ";

    const regras = `Coleta (manhã) fixa: ${LAVEXPRESS.pickupRules.fixedMorningDays.join(
        ", "
    )}. Outros dias: agendamento com ${LAVEXPRESS.pickupRules.otherDaysMinNoticeHours}h de antecedência. `;

    const prazo = `Prazo padrão: lavar e secar em ${LAVEXPRESS.sla.washDryHoursMin}–${LAVEXPRESS.sla.washDryHoursMax}h. Lavar, secar e passar em ${LAVEXPRESS.sla.washDryIronBusinessDaysMin}–${LAVEXPRESS.sla.washDryIronBusinessDaysMax} dias úteis. `;

    const fechamento =
        "Pode me passar os horários disponíveis e o melhor pacote para o meu volume de roupas?";

    return `${nome}${local}${servico}${regras}${prazo}${fechamento}`;
}
