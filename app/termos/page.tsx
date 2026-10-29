import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Separator } from "@/components/ui/separator";
import { LAVEXPRESS } from "@/lib/lavexpress";

/**
 * Data de revisão do texto, fixa e escrita à mão.
 *
 * Era `new Date()` no render: a política se declarava atualizada no dia em que
 * fosse lida, o que é falso e some justamente com a informação que importa —
 * desde quando valem estes termos.
 */
const ATUALIZADO_EM = "29 de outubro de 2026";

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
                            Última atualização: {ATUALIZADO_EM}
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
                                <li><strong>Prazos:</strong> Os prazos de entrega variam de 24–48h a 5 dias úteis, dependendo do tipo de serviço e volume.</li>
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

                            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">5.1 Quem trata seus dados</h3>
                            <p>
                                O controlador dos seus dados pessoais é a Lavexpress Lavanderia, CNPJ {LAVEXPRESS.cnpj},
                                com estabelecimento em {LAVEXPRESS.addressLine}, {LAVEXPRESS.addressDistrict}, {LAVEXPRESS.addressCity},
                                CEP {LAVEXPRESS.addressZip}.
                            </p>
                            <p className="mt-4">
                                Para qualquer pedido relativo aos seus dados — inclusive exclusão — fale pelo WhatsApp{" "}
                                <a href={`https://wa.me/${LAVEXPRESS.whatsappE164}`} className="text-blue-700 underline">
                                    {LAVEXPRESS.whatsappDisplay}
                                </a>{" "}
                                ou pelo e-mail{" "}
                                <a href={`mailto:${LAVEXPRESS.email}`} className="text-blue-700 underline">
                                    {LAVEXPRESS.email}
                                </a>. Respondemos em até 15 dias.
                            </p>

                            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">5.2 O que tratamos, para quê, e com que base legal</h3>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>
                                    <strong>Nome, WhatsApp e endereço</strong> — para orçar, coletar, lavar, entregar e
                                    cobrar o serviço. Base legal: execução de contrato e procedimentos preliminares a
                                    pedido do titular (art. 7, V). Não dependem de consentimento: sem eles não há como
                                    buscar nem devolver a sua roupa.
                                </li>
                                <li>
                                    <strong>Histórico de pedidos e valores</strong> — para atender, resolver problemas e
                                    cumprir obrigações fiscais. Base legal: execução de contrato (art. 7, V) e
                                    cumprimento de obrigação legal (art. 7, II).
                                </li>
                                <li>
                                    <strong>Dados de navegação no site</strong> (páginas visitadas, origem do acesso,
                                    identificadores de clique de anúncio e um código interno de referência) — para
                                    entender de onde vêm nossos contatos e medir se a nossa divulgação funciona. Base
                                    legal: legítimo interesse (art. 7, IX). Você pode se opor a esse tratamento —
                                    veja 5.5 e a seção 6.
                                </li>
                                <li>
                                    <strong>Envio de promoções</strong> — só para quem autorizar, e só depois de
                                    perguntarmos. Base legal: consentimento (art. 7, I), que você pode retirar a
                                    qualquer momento pelo mesmo WhatsApp, sem perder o direito ao serviço.
                                </li>
                            </ul>
                            <p className="mt-4">
                                Não pedimos nem queremos dados sensíveis (art. 11 da LGPD) e não tratamos dados de
                                crianças e adolescentes de forma dirigida.
                            </p>

                            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">5.3 Com quem seus dados são compartilhados</h3>
                            <p>
                                <strong>Nós não vendemos seus dados.</strong> Mas é preciso ser exato: ao usar este
                                site, alguns dados de navegação são tratados por fornecedores de tecnologia que operam
                                como operadores ou controladores próprios, inclusive fora do Brasil. São estes, nomeados:
                            </p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>
                                    <strong>Google LLC</strong> — Google Tag Manager, Google Analytics 4 e Google Ads.
                                    Medem acessos, origem do tráfego e resultados de anúncios.
                                </li>
                                <li>
                                    <strong>Vercel Inc.</strong> — hospedagem do site.
                                </li>
                                <li>
                                    <strong>WhatsApp / Meta Platforms</strong> — quando você escolhe falar conosco por
                                    ali, a conversa acontece na plataforma deles e segue as políticas deles.
                                </li>
                            </ul>
                            <p className="mt-4">
                                <strong>O que deixamos de usar:</strong> até 29 de outubro de 2026 este site usou o
                                Microsoft Clarity, uma ferramenta de gravação de sessão. Ela foi desativada e não
                                coleta mais nada. Enquanto esteve ativa, podia registrar cliques, rolagem e o conteúdo
                                das páginas visitadas, incluindo os endereços dos links clicados.
                            </p>
                            <p className="mt-4">
                                Esses fornecedores podem tratar dados fora do Brasil. A LGPD admite a transferência
                                internacional nas hipóteses dos arts. 33 e 34 — e estamos verificando, contrato a
                                contrato, qual delas cada fornecedor aplica. Assim que essa verificação terminar, a
                                informação entra aqui, nomeada. Fora esses fornecedores, compartilhamos dados apenas
                                quando a lei ou uma ordem judicial exigir.
                            </p>

                            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">5.4 Por quanto tempo guardamos</h3>
                            <p>
                                Estes são os prazos que adotamos. O prazo do cookie é aplicado automaticamente pelo
                                próprio site; os demais são cumpridos por rotina de revisão dos nossos registros, e
                                estamos implantando a conferência periódica que garante o descarte na data certa.
                            </p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>
                                    <strong>Cadastro de quem contratou</strong> — 5 anos contados do último serviço,
                                    pelos prazos do Código de Defesa do Consumidor e pelas obrigações fiscais.
                                </li>
                                <li>
                                    <strong>Contato que não virou serviço</strong> — 12 meses, e depois os dados de
                                    identificação são apagados.
                                </li>
                                <li>
                                    <strong>Registros de atendimento usados para análise</strong> — 12 meses, e depois
                                    permanecem apenas em números totais, sem identificar ninguém.
                                </li>
                                <li>
                                    <strong>Cookie de medição do site</strong> — até 90 dias, com a contagem
                                    explicada na seção 6. Este prazo é <strong>aplicado automaticamente</strong> pelo
                                    site: o cookie expira sozinho, sem depender de ninguém lembrar.
                                </li>
                            </ul>

                            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">5.5 Seus direitos</h3>
                            <p>
                                O art. 18 da LGPD garante a você, a qualquer momento e sem custo:
                            </p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>confirmação de que tratamos seus dados, e acesso a eles;</li>
                                <li>correção de dados incompletos, inexatos ou desatualizados;</li>
                                <li>anonimização, bloqueio ou eliminação de dados desnecessários ou tratados fora da lei;</li>
                                <li>portabilidade a outro fornecedor, mediante requisição;</li>
                                <li>eliminação dos dados tratados com o seu consentimento;</li>
                                <li>informação sobre com quem compartilhamos seus dados — está em 5.3;</li>
                                <li>informação sobre o que acontece se você não consentir, e quais são as consequências;</li>
                                <li>revogação do consentimento, quando foi ele a base do tratamento;</li>
                                <li>
                                    <strong>oposição ao tratamento feito com base em legítimo interesse</strong>
                                    {" "}(art. 18, §2) — é o caso da medição descrita na seção 6.
                                </li>
                            </ul>
                            <p className="mt-4">
                                Basta pedir pelo WhatsApp ou e-mail de 5.1. Você também pode reclamar à Autoridade
                                Nacional de Proteção de Dados (ANPD).
                            </p>
                            <p className="mt-4">
                                <strong>Sobre o pedido de oposição, com honestidade:</strong> hoje não temos um botão
                                que desligue a medição para uma pessoa específica. Ao receber seu pedido, nós o
                                registramos, paramos de usar seus dados nas nossas análises e apagamos os registros
                                que já tivermos. Para <strong>interromper a coleta</strong> enquanto não oferecemos
                                esse controle no site, o caminho efetivo é bloquear ou apagar os cookies nas
                                configurações do seu navegador — instruções na seção 6. Estamos trabalhando para
                                oferecer o controle aqui mesmo.
                            </p>

                            <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">5.6 Segurança</h3>
                            <p>
                                Acesso aos dados de cadastro é restrito a quem atende e entrega. Os registros que usamos
                                para análise comercial ficam separados dos dados de identificação, que são guardados à
                                parte — é uma medida de minimização e segurança (arts. 6, III e 46). Ela reduz risco,
                                mas não torna o dado anônimo: ele continua sendo dado pessoal, e continua protegido
                                por esta política.
                            </p>

                            <Separator className="my-8" />

                            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">6. Cookies e medição</h2>
                            <p>
                                Este site usa cookies e tecnologias semelhantes. Nenhum deles é necessário para você
                                navegar — eles existem para medição. Esta é a lista completa:
                            </p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>
                                    <strong>lx_attr</strong> (nosso) — guarda um código de referência no formato
                                    LX-XXXXXX e, quando existe, a origem da sua visita (identificador de clique de
                                    anúncio do Google e parâmetros de campanha). Não guarda nome, telefone nem
                                    endereço.
                                    <br /><br />
                                    <strong>Validade:</strong> até 90 dias contados do clique no anúncio que trouxe
                                    você até aqui. Se você chegou sem passar por um anúncio, contam-se 90 dias da sua
                                    primeira visita. O prazo <strong>não se renova</strong> a cada nova visita: ele
                                    termina na data em que vence, e depois disso um novo período começa do zero.
                                    <br /><br />
                                    <strong>O que vai para o WhatsApp:</strong> quando você nos chama a partir do
                                    site, apenas o código LX-XXXXXX acompanha a mensagem — é ele que aparece como{" "}
                                    <em>Ref:</em> no fim do texto. <strong>A origem da visita não vai junto</strong>,
                                    e o código, sozinho, não nos diz de qual anúncio ou campanha você veio: essa
                                    informação fica apenas no seu navegador, neste cookie, e não é transmitida a
                                    nós pela conversa.
                                </li>
                                <li>
                                    <strong>_ga, _ga_*</strong> (Google Analytics 4) — medem visitas e páginas vistas.
                                </li>
                                <li>
                                    <strong>_gcl_*</strong> (Google Ads) — ligam uma visita ao anúncio que a originou.
                                </li>
                            </ul>
                            <p className="mt-4">
                                <strong>Transparência sobre o momento em que eles carregam:</strong> hoje essas
                                ferramentas são ativadas quando a página abre, antes de qualquer escolha sua, com base
                                no legítimo interesse (art. 7, IX). Estamos trabalhando para oferecer um controle de
                                preferências no próprio site.
                            </p>
                            <p className="mt-4">
                                Enquanto esse controle não existe, o caminho que <strong>efetivamente interrompe a
                                coleta</strong> é bloquear ou apagar cookies nas configurações do seu navegador —
                                todos os navegadores permitem fazer isso por site. Você também pode se opor pelos
                                canais de 5.1: nesse caso registramos o pedido, paramos de usar seus dados nas nossas
                                análises e apagamos o que já tivermos, mas o bloqueio no navegador continua sendo o
                                que impede a coleta de acontecer.
                            </p>
                            <p className="mt-4">
                                Recusar esses cookies não impede você de usar o site, pedir orçamento ou contratar o
                                serviço.
                            </p>

                            <Separator className="my-8" />

                            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">7. Contato</h2>
                            <p>
                                Dúvidas sobre estes termos ou sobre seus dados pessoais: WhatsApp{" "}
                                <a href={`https://wa.me/${LAVEXPRESS.whatsappE164}`} className="text-blue-700 underline">
                                    {LAVEXPRESS.whatsappDisplay}
                                </a>{" "}
                                ou e-mail{" "}
                                <a href={`mailto:${LAVEXPRESS.email}`} className="text-blue-700 underline">
                                    {LAVEXPRESS.email}
                                </a>.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <SiteFooter />
        </>
    );
}
