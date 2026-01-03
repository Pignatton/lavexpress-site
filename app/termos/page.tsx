import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Separator } from "@/components/ui/separator";

export const metadata = {
    title: "Termos de Uso e Privacidade | Lavexpress",
    description: "Política de privacidade, termos de serviço e condições de uso da Lavexpress Lavanderia.",
};

export default function TermosPage() {
    return (
        <>
            <SiteHeader />
            <main className="min-h-screen bg-slate-50 py-24 md:py-32">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Termos de Uso e Política de Privacidade
                        </h1>
                        <p className="text-slate-600 mb-8">
                            Última atualização: {new Date().toLocaleDateString('pt-BR')}
                        </p>

                        <div className="prose prose-slate max-w-none text-slate-700">
                            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Visão Geral</h2>
                            <p>
                                Bem-vindo à Lavexpress. Ao utilizar nossos serviços de lavanderia delivery, você concorda com os termos descritos abaixo.
                                Nosso compromisso é oferecer um serviço de qualidade, com transparência e respeito aos seus dados.
                            </p>

                            <Separator className="my-8" />

                            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Serviços Prestados</h2>
                            <p>
                                A Lavexpress oferece serviços de lavagem, secagem e passadoria de roupas domésticas, edredons, tapetes e cortinas.
                                O serviço inclui coleta e entrega (delivery) nas áreas de cobertura especificadas (Vitória, Vila Velha e Serra).
                            </p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li><strong>Prazos:</strong> Os prazos de entrega variam de 24h a 5 dias úteis, dependendo do tipo de serviço e volume.</li>
                                <li><strong>Triagem:</strong> Todas as peças passam por triagem. Reservamo-nos o direito de recusar itens que apresentem riscos de danos durante o processo de lavagem.</li>
                            </ul>

                            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Responsabilidades e Danos</h2>
                            <p>
                                Utilizamos processos profissionais e produtos de alta qualidade. No entanto, o desgaste natural dos tecidos e danos pré-existentes não são de nossa responsabilidade.
                            </p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li><strong>Indenização:</strong> Em caso de dano comprovado causado por falha em nosso processo, a indenização é limitada a até 10 vezes o valor do serviço contratado para a peça específica.</li>
                                <li><strong>Itens nos bolsos:</strong> Não nos responsabilizamos por objetos, dinheiro ou valores deixados nos bolsos das roupas. Por favor, verifique antes de enviar.</li>
                            </ul>

                            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Pagamentos</h2>
                            <p>
                                O pagamento deve ser realizado no momento da entrega ou conforme acordado via WhatsApp (Pix, Cartão de Crédito/Débito).
                                A falta de pagamento pode acarretar na retenção dos itens até a regularização.
                            </p>

                            <Separator className="my-8" />

                            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">5. Política de Privacidade (LGPD)</h2>
                            <p>
                                Respeitamos sua privacidade e protegemos seus dados conforme a Lei Geral de Proteção de Dados (LGPD).
                            </p>

                            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">5.1 Coleta de Dados</h3>
                            <p>
                                Coletamos apenas os dados necessários para a prestação do serviço: Nome, Endereço, Telefone (WhatsApp) e Histórico de Pedidos.
                            </p>

                            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">5.2 Uso das Informações</h3>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>Para agendamento de coletas e entregas.</li>
                                <li>Para comunicação sobre o status do pedido.</li>
                                <li>Para envio de promoções e novidades (você pode solicitar o descadastramento a qualquer momento).</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">5.3 Compartilhamento</h3>
                            <p>
                                Não vendemos nem compartilhamos seus dados pessoais com terceiros para fins de marketing. Seus dados são utilizados exclusivamente para a operação da Lavexpress.
                            </p>

                            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">6. Contato</h2>
                            <p>
                                Para dúvidas sobre estes termos ou sobre seus dados pessoais, entre em contato através do nosso WhatsApp ou e-mail oficial listados no rodapé deste site.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <SiteFooter />
        </>
    );
}
