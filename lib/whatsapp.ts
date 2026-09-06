import { LAVEXPRESS } from "@/lib/lavexpress";
import { REF_REGEX } from "@/lib/attribution";

/**
 * Carimba o `lead_ref` no fim da mensagem, separado por linha em branco.
 *
 * PRESERVA a copy existente: só acrescenta. É o ÚNICO dado de atribuição que
 * pode aparecer na mensagem — `gclid`, `gbraid`, `wbraid` e telefone estão
 * proibidos na URL pública e no texto pelo contrato.
 *
 * `leadRef` fora do formato canônico devolve o texto intacto: sem `Ref:` o lead
 * apenas não é rastreável, enquanto uma referência inválida sujaria o funil e
 * confundiria o atendente.
 */
export function appendLeadRef(text: string, leadRef: string): string {
    const base = typeof text === "string" ? text : "";
    if (typeof leadRef !== "string" || !REF_REGEX.test(leadRef)) return base;

    const sufixo = `Ref: ${leadRef}`;
    // Reentrância: o mesmo texto pode passar por aqui de novo (re-render,
    // segundo clique) e não deve acumular duas linhas de referência.
    if (base.trimEnd().endsWith(sufixo)) return base;
    if (base.length === 0) return sufixo;

    return `${base}\n\n${sufixo}`;
}

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
