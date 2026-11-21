import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Separator } from "@/components/ui/separator";
import { LAVEXPRESS } from "@/lib/lavexpress";

/** Data de revisão, fixa e escrita à mão (preencher na publicação). */
const ATUALIZADO_EM = "[data da publicação]";

export const metadata = {
    title: "Exclusão de Dados",
    description: "Como pedir a exclusão dos seus dados tratados no atendimento pelo WhatsApp da Lavexpress Lavanderia.",
};

const h2 = "text-xl font-bold text-slate-900 mt-8 mb-4";
const link = "text-blue-700 underline";
const assunto = encodeURIComponent("Exclusão de dados - atendimento WhatsApp");

export default function ExclusaoDeDadosPage() {
    return (
        <>
            <SiteHeader />
            <main className="min-h-screen bg-slate-50 py-24 md:py-32">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Exclusão de Dados</h1>
                        <p className="text-slate-600 mb-8">
                            Atendimento pelo WhatsApp · Responsável: PIGNATTON LAVANDERIA LTDA (CNPJ {LAVEXPRESS.cnpj}) · Última
                            atualização: {ATUALIZADO_EM}
                        </p>

                        <div className="prose prose-slate max-w-none text-slate-700">
                            <h2 className={h2}>Como pedir</h2>
                            <ol>
                                <li>
                                    <strong>No nosso WhatsApp</strong>{" "}
                                    <a href={`https://wa.me/${LAVEXPRESS.whatsappE164}`} className={link}>{LAVEXPRESS.whatsappDisplay}</a>:
                                    escreva <strong>&quot;apagar meus dados&quot;</strong>. O atendente passa a conversa para a nossa equipe,
                                    que registra o pedido.
                                </li>
                                <li>
                                    <strong>Por e-mail</strong>:{" "}
                                    <a href={`mailto:${LAVEXPRESS.email}?subject=${assunto}`} className={link}>{LAVEXPRESS.email}</a>, com o
                                    assunto &quot;Exclusão de dados&quot;, informando o número de WhatsApp usado na conversa.
                                </li>
                            </ol>
                            <p>Podemos confirmar que o pedido vem do titular do número antes de executá-lo.</p>

                            <Separator className="my-8" />

                            <h2 className={h2}>O que apagamos</h2>
                            <ul>
                                <li>As mensagens e respostas guardadas no servidor do atendente;</li>
                                <li>A memória da conversa (peças, serviço, bairro, orçamentos) e o resumo da equipe;</li>
                                <li>Seu número e os registros técnicos ligados à conversa.</li>
                            </ul>
                            <p>
                                A exclusão é feita em até <strong>15 dias</strong> e você recebe a confirmação pelo mesmo canal do pedido.
                                Cópias de segurança são substituídas em até 14 dias. Guardamos apenas o registro de que o pedido foi
                                atendido, sem o conteúdo da conversa, e o que precisarmos manter por obrigação legal ou para o exercício
                                regular de direitos (art. 16 da LGPD) — por exemplo, se a conversa fizer parte de um pedido ou de uma
                                reclamação em andamento.
                            </p>

                            <Separator className="my-8" />

                            <h2 className={h2}>O que não é apagado por aqui</h2>
                            <ul>
                                <li>O histórico no aplicativo WhatsApp da loja: se você pedir, a equipe apaga a conversa no aparelho;</li>
                                <li>Os dados da sua conta no WhatsApp, controlados pela Meta.</li>
                            </ul>

                            <Separator className="my-8" />

                            <h2 className={h2}>Prazos automáticos</h2>
                            <p>
                                Mesmo sem pedido, os dados são apagados nos prazos da{" "}
                                <Link href="/privacidade-whatsapp" className={link}>Política de Privacidade do Atendimento no WhatsApp</Link>{" "}
                                (por exemplo, o texto das mensagens até 48 horas depois de respondidas e a memória da conversa após 7 dias
                                sem atividade).
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <SiteFooter />
        </>
    );
}
