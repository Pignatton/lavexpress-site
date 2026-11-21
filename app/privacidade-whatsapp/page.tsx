import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Separator } from "@/components/ui/separator";
import { LAVEXPRESS } from "@/lib/lavexpress";

/** Data de revisão, fixa e escrita à mão (preencher na publicação). */
const ATUALIZADO_EM = "[data da publicação]";
const RAZAO_SOCIAL = "PIGNATTON LAVANDERIA LTDA";

export const metadata = {
    title: "Privacidade do Atendimento no WhatsApp",
    description:
        "Como a Lavexpress Lavanderia trata seus dados no atendimento automatizado pelo WhatsApp: dados, finalidades, fornecedores, prazos e seus direitos.",
};

const h2 = "text-xl font-bold text-slate-900 mt-8 mb-4";
const link = "text-blue-700 underline";

export default function PrivacidadeWhatsappPage() {
    return (
        <>
            <SiteHeader />
            <main className="min-h-screen bg-slate-50 py-24 md:py-32">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Política de Privacidade do Atendimento no WhatsApp
                        </h1>
                        <p className="text-slate-600 mb-8">Última atualização: {ATUALIZADO_EM}</p>

                        <div className="prose prose-slate max-w-none text-slate-700">
                            <h2 className={h2}>1. Quem somos</h2>
                            <p>
                                A <strong>{LAVEXPRESS.name}</strong> é o nome fantasia de <strong>{RAZAO_SOCIAL}</strong>, CNPJ{" "}
                                {LAVEXPRESS.cnpj}, com sede em {LAVEXPRESS.fullAddress}. Somos a <strong>controladora</strong> dos
                                dados pessoais tratados no nosso atendimento pelo WhatsApp (Lei nº 13.709/2018 — LGPD). Esta política
                                complementa a seção de privacidade dos nossos{" "}
                                <Link href="/termos" className={link}>Termos de Uso e Privacidade</Link>.
                            </p>

                            <Separator className="my-8" />

                            <h2 className={h2}>2. O atendimento automatizado</h2>
                            <p>
                                No nosso WhatsApp ({LAVEXPRESS.whatsappDisplay}), um <strong>atendente automatizado</strong> responde
                                dúvidas sobre serviços, preços da nossa tabela vigente, pacotes e horários, monta orçamentos e passa a
                                conversa para a nossa equipe quando necessário. Ele responde automaticamente só no horário da loja. Você
                                pode pedir para falar com uma pessoa a qualquer momento.
                            </p>

                            <Separator className="my-8" />

                            <h2 className={h2}>3. Dados que tratamos</h2>
                            <ul>
                                <li><strong>Seu número de WhatsApp</strong>, que a plataforma do WhatsApp envia junto com cada mensagem.</li>
                                <li>
                                    <strong>Texto das mensagens</strong> que você envia e das respostas que enviamos. De áudios, fotos e
                                    documentos, o atendente registra só o tipo; o conteúdo não é lido por ele e a conversa vai para a equipe.
                                </li>
                                <li>
                                    <strong>Informações que você mesmo informa</strong> para o orçamento: quantidade de peças, tipo de
                                    serviço, bairro e preferência por ir à loja ou consultar coleta.
                                </li>
                                <li>
                                    <strong>Dados técnicos</strong>: identificadores de mensagem, data e hora, situação da entrega (enviada,
                                    entregue, lida) e categoria de cobrança informada pela Meta.
                                </li>
                            </ul>
                            <p>
                                O atendente <strong>não pede</strong> CPF, endereço completo, dados de cartão nem senhas. Cadastro e
                                pagamento são feitos com a nossa equipe.
                            </p>

                            <Separator className="my-8" />

                            <h2 className={h2}>4. Para que usamos e com que base legal</h2>
                            <ul>
                                <li>Responder às suas perguntas, montar orçamentos e recomendar o serviço adequado;</li>
                                <li>
                                    Passar a conversa para a nossa equipe, com um resumo, quando você pede ou quando o assunto exige (pedido
                                    em andamento, pagamento, reclamação, peça especial);
                                </li>
                                <li>Segurança, evitar respostas duplicadas e acompanhar o funcionamento do serviço.</li>
                            </ul>
                            <p>
                                <strong>Bases legais:</strong> procedimentos preliminares a contrato, a seu pedido (art. 7º, V), e
                                legítimo interesse em atender quem nos procura (art. 7º, IX).
                            </p>
                            <p>
                                <strong>Atendimento automatizado:</strong> as respostas são redigidas por inteligência artificial, com os
                                preços da nossa tabela. O atendente <strong>não fecha vendas nem confirma pagamentos</strong>; isso é
                                feito pela equipe. Você pode pedir a revisão por uma pessoa (art. 20 da LGPD).
                            </p>

                            <Separator className="my-8" />

                            <h2 className={h2}>5. Com quem compartilhamos</h2>
                            <ul>
                                <li>
                                    <strong>Meta Platforms</strong> (WhatsApp Business Platform), para receber e enviar as mensagens. O
                                    WhatsApp trata os dados da sua conta conforme a{" "}
                                    <a href="https://www.whatsapp.com/legal/privacy-policy" className={link} rel="noopener">política de privacidade do WhatsApp</a>.
                                </li>
                                <li>
                                    <strong>Anthropic</strong> (modelo de linguagem Claude), para redigir as respostas. Enviamos o texto das
                                    mensagens recentes e as informações do orçamento. <strong>Seu número de telefone não é enviado</strong>,
                                    mas o que você escrever na mensagem é.
                                </li>
                                <li><strong>Provedor de hospedagem</strong> do servidor do atendente, contratado pela Lavexpress.</li>
                                <li>
                                    <strong>Nossa equipe</strong>, que acessa as conversas num painel com login individual e verificação
                                    em duas etapas.
                                </li>
                            </ul>
                            <p>Não vendemos dados e não os usamos para publicidade.</p>

                            <Separator className="my-8" />

                            <h2 className={h2}>6. Transferência internacional</h2>
                            <p>
                                A Meta e a Anthropic tratam dados fora do Brasil (inclusive nos Estados Unidos), e o servidor do atendente
                                pode estar no exterior. Essas transferências seguem o art. 33 da LGPD, com as garantias contratuais desses
                                fornecedores.
                            </p>

                            <Separator className="my-8" />

                            <h2 className={h2}>7. Por quanto tempo guardamos</h2>
                            <ul>
                                <li><strong>Texto das mensagens e seu número</strong>, nos registros de mensagens e envios: até <strong>48 horas</strong> depois de respondida a mensagem;</li>
                                <li><strong>Memória da conversa</strong> (até as 12 mensagens mais recentes e os dados do orçamento): <strong>7 dias</strong> sem novas mensagens;</li>
                                <li><strong>Seu número vinculado à conversa</strong>: <strong>7 dias</strong> após a sua última mensagem, se nada estiver pendente;</li>
                                <li><strong>Respostas enviadas e resumos para a equipe</strong>: <strong>30 dias</strong>;</li>
                                <li><strong>Identificador técnico da mensagem</strong> (sem conteúdo), para não responder duas vezes: <strong>30 dias</strong>;</li>
                                <li><strong>Registros técnicos e métricas</strong>, sem texto e sem telefone: <strong>90 a 180 dias</strong>; <strong>ações da equipe no painel</strong>: <strong>1 ano</strong>;</li>
                                <li><strong>Cópias de segurança</strong>: até <strong>14 dias</strong>.</li>
                            </ul>
                            <p>O histórico que fica no aplicativo WhatsApp da loja segue as regras do WhatsApp.</p>

                            <Separator className="my-8" />

                            <h2 className={h2}>8. Segurança</h2>
                            <ul>
                                <li>Conexão criptografada (HTTPS) com o WhatsApp e verificação da assinatura de cada mensagem recebida;</li>
                                <li>Credenciais guardadas fora do código;</li>
                                <li>Painel da equipe com login individual, verificação em duas etapas e registro de cada ação;</li>
                                <li>Seu número não aparece nos registros técnicos: a conversa é identificada por um código.</li>
                            </ul>

                            <Separator className="my-8" />

                            <h2 className={h2}>9. Seus direitos</h2>
                            <p>
                                Você pode pedir confirmação e acesso, correção, anonimização, bloqueio ou eliminação, informação sobre
                                compartilhamento e revisão de resposta automatizada (arts. 18 e 20 da LGPD). Para pedir a exclusão, veja{" "}
                                <Link href="/exclusao-de-dados" className={link}>Exclusão de dados</Link>.
                            </p>

                            <Separator className="my-8" />

                            <h2 className={h2}>10. Contato</h2>
                            <p>
                                WhatsApp{" "}
                                <a href={`https://wa.me/${LAVEXPRESS.whatsappE164}`} className={link}>{LAVEXPRESS.whatsappDisplay}</a>{" "}
                                ou e-mail{" "}
                                <a href={`mailto:${LAVEXPRESS.email}`} className={link}>{LAVEXPRESS.email}</a>. Loja:{" "}
                                {LAVEXPRESS.fullAddress}.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <SiteFooter />
        </>
    );
}
