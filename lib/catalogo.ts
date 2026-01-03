export const TABELA_PRECOS = [
    { nome: "Avental de Raspa", valor: 10.00, prazo: 3 },
    { nome: "Bandeiras", valor: 15.00, prazo: 5 },
    { nome: "Beca", valor: 30.00, prazo: 2 },
    { nome: "Bermuda", valor: 10.00, prazo: 2 },
    { nome: "Blazer", valor: 35.00, prazo: 3 },
    { nome: "Blazer (Só Passar)", valor: 20.00, prazo: 2 },
    { nome: "Blusa (a partir)", valor: 15.00, prazo: 2 },
    { nome: "Blusão de Raspa", valor: 20.00, prazo: 3 },
    { nome: "Bolsa para Roupas", valor: 55.00, prazo: 1 },
    { nome: "Boné", valor: 15.00, prazo: 5 },
    { nome: "Calça Jeans", valor: 15.00, prazo: 2 },
    { nome: "Calça Social", valor: 25.00, prazo: 3 },
    { nome: "Camisa", valor: 12.00, prazo: 2 },
    { nome: "Camisa de Malha (Só Passar)", valor: 8.00, prazo: 3 },
    { nome: "Camisa Polo", valor: 12.00, prazo: 2 },
    { nome: "Camisa Social Manga Curta", valor: 15.00, prazo: 3 },
    { nome: "Camisa Social Manga Longa", valor: 18.00, prazo: 3 },
    { nome: "Camisa Social (Só Passar)", valor: 10.00, prazo: 2 },
    { nome: "Capa Cadeira de Festa", valor: 10.00, prazo: 5 },
    { nome: "Casacos (a partir)", valor: 70.00, prazo: 4 },
    { nome: "Cortinas (a partir)", valor: 55.00, prazo: 7 },
    { nome: "Edredom Casal", valor: 45.00, prazo: 2 },
    { nome: "Edredom Queen", valor: 45.00, prazo: 2 },
    { nome: "Edredom Solteiro", valor: 40.00, prazo: 2 },
    { nome: "Jaleco", valor: 25.00, prazo: 3 },
    { nome: "Jaqueta de Couro", valor: 75.00, prazo: 7 },
    { nome: "Jaquetas Simples", valor: 45.00, prazo: 2 },
    { nome: "Lençol (Lavar/Secar/Passar)", valor: 15.00, prazo: 1 },
    { nome: "Tapete Sintético (m²)", valor: 65.00, prazo: 7 },
    { nome: "Tênis", valor: 50.00, prazo: 5 },
    { nome: "Terno Completo", valor: 45.00, prazo: 3 },
    { nome: "Toalha de Banho", valor: 10.00, prazo: 2 },
    { nome: "Vestido de Festa", valor: 90.00, prazo: 3 },
    { nome: "Vestido Simples (a partir)", valor: 65.00, prazo: 4 },
];

export const PACOTES = {
    lavarSecar: [
        { pecas: 60, valor: 365.00, porPeca: 6.08 },
        { pecas: 80, valor: 430.00, porPeca: 5.38 },
        { pecas: 120, valor: 590.00, porPeca: 4.92 },
        { pecas: 160, valor: 730.00, porPeca: 4.56 },
        { pecas: 215, valor: 945.00, porPeca: 4.40 },
        { pecas: 245, valor: 1065.00, porPeca: 4.35 },
        { pecas: 280, valor: 1195.00, porPeca: 4.27 },
        { pecas: 360, valor: 1450.00, porPeca: 4.03 },
    ],
    lavarSecarPassar: [
        { pecas: 40, valor: 360.00, porPeca: 9.00 },
        { pecas: 60, valor: 435.00, porPeca: 7.25 },
        { pecas: 90, valor: 570.00, porPeca: 6.33 },
        { pecas: 120, valor: 710.00, porPeca: 5.92 },
        { pecas: 160, valor: 885.00, porPeca: 5.53 },
        { pecas: 200, valor: 1045.00, porPeca: 5.22 },
        { pecas: 240, valor: 1155.00, porPeca: 4.81 },
        { pecas: 320, valor: 1410.00, porPeca: 4.41 },
    ],
    passar: [
        { pecas: 40, valor: 320.00, porPeca: 8.00 },
        { pecas: 60, valor: 390.00, porPeca: 6.50 },
        { pecas: 90, valor: 510.00, porPeca: 5.67 },
        { pecas: 120, valor: 640.00, porPeca: 5.33 },
    ]
};

export const SERVICES_DETAILS: Record<string, {
    title: string;
    subtitle: string;
    heroImage: string;
    description: string;
    benefits: { title: string; description: string; icon: "Clock" | "ShieldCheck" | "Truck" | "Sparkles" | "Zap" | "Wallet" }[];
    process: { step: number; title: string; description: string }[];
    faq?: { question: string; answer: string }[];
    included?: string[];
    allowedItems?: string[];
    excludedItems?: string[];
    ctaText: string;
}> = {
    "lavagem-de-roupas": {
        title: "Serviço por Cesto",
        subtitle: "A solução ideal para quem busca comodidade total, economia e praticidade.",
        heroImage: "/images/service_basket.png",
        description: "Você recebe um cesto exclusivo, coloca suas roupas do dia a dia, e nós cuidamos de todo o processo. Atenção: O cliente decide a separação das peças. Se colocar tudo junto no cesto, lavaremos tudo junto (responsabilidade do cliente sobre mistura de cores).",
        benefits: [
            { title: "Economia de Tempo", description: "Você não perde horas lavando roupa. Deixe isso com a gente.", icon: "Clock" },
            { title: "Custo Inteligente", description: "Mais barato que serviço avulso. Padrão profissional com economia.", icon: "Wallet" },
            { title: "Conforto Absoluto", description: "Coleta e entrega na sua porta. Tudo feito sem sair de casa.", icon: "Truck" }
        ],
        included: [
            "Coleta e entrega no seu endereço",
            "Lavagem profissional com produtos adequados",
            "Secagem controlada para preservar as roupas",
            "Dobra organizada e higienizada",
            "Processo padronizado, seguro e confiável"
        ],
        allowedItems: [
            "Camisetas",
            "Calças",
            "Bermudas",
            "Shorts",
            "Roupas íntimas",
            "Meias",
            "Pijamas",
            "Roupas leves em geral"
        ],
        excludedItems: [
            "Edredons e cobertores",
            "Ternos e blazers",
            "Vestidos de festa",
            "Peças delicadas ou especiais",
            "Qualquer roupa que não possa ser lavada em máquina"
        ],
        process: [
            { step: 1, title: "Solicitação", description: "Peça seu cesto exclusivo Lavexpress." },
            { step: 2, title: "Preenchimento", description: "Coloque suas roupas (separe por cor se desejar lavagem separada)." },
            { step: 3, title: "Coleta e Lavagem", description: "Buscamos e lavamos conforme seu cesto." },
            { step: 4, title: "Entrega", description: "Receba tudo limpo, seco e dobrado." }
        ],
        ctaText: "Pedir Meu Cesto"
    },
    "lavagem-de-tenis": {
        title: "Spa de Tênis e Calçados",
        subtitle: "Seus tênis favoritos, novos de novo.",
        heroImage: "/imagens/hero-sneakers.png",
        description: "Tênis sujo estraga qualquer visual. Nossa limpeza técnica manual remove a sujeira impregnada que a lavagem caseira não tira, devolvendo a cor e o aspecto de novo aos seus calçados.",
        benefits: [
            { title: "Limpeza Detalhada", description: "Esfregamos cada centímetro à mão. Nada de jogar na máquina e estragar.", icon: "Sparkles" },
            { title: "Secagem Segura", description: "Estufa controlada que evita descolamento de solado e mau cheiro.", icon: "ShieldCheck" },
            { title: "Cadarços e Palmilhas", description: "Higienizados separadamente para garantir limpeza total.", icon: "Zap" }
        ],
        process: [
            { step: 1, title: "Avaliação", description: "Inspecionamos o material e o estado do calçado." },
            { step: 2, title: "Descontaminação", description: "Remoção de sujeira pesada do solado e tecido." },
            { step: 3, title: "Higienização", description: "Limpeza profunda com produtos específicos para cada material." },
            { step: 4, title: "Acabamento", description: "Secagem, desodorização e embalagem." }
        ],
        faq: [
            { question: "Demora muito?", answer: "Pedimos 5 a 7 dias para garantir uma secagem perfeita e segura." },
            { question: "Lavam camurça?", answer: "Sim! Temos expertise em camurça, couro e tecidos sintéticos." },
            { question: "Tira o chulé?", answer: "Nosso processo de ozonização e bactericidas elimina 99% dos odores." }
        ],
        ctaText: "Renovar Meus Tênis"
    },
    "lavagem-de-edredons": {
        title: "Edredons e Cobertores",
        subtitle: "Durma melhor com roupa de cama higienizada de verdade.",
        heroImage: "/images/carousel_comforter.png",
        description: "Seu edredom pode estar cheio de ácaros e poeira invisível. Nossa lavagem profunda remove alérgenos, manchas e devolve o volume e a maciez que a máquina doméstica não consegue dar.",
        benefits: [
            { title: "Saúde do Sono", description: "Elimina ácaros e fungos que causam alergias respiratórias.", icon: "ShieldCheck" },
            { title: "Volume e Maciez", description: "Secagem em tambor industrial que 'afofa' as fibras do enchimento.", icon: "Sparkles" },
            { title: "Sem Mofo", description: "Garantia de secagem 100% completa, impossível em varal doméstico.", icon: "Zap" }
        ],
        process: [
            { step: 1, title: "Coleta", description: "Buscamos as peças volumosas na sua casa." },
            { step: 2, title: "Lavagem Profunda", description: "Imersão e ação mecânica suave para limpar o enchimento." },
            { step: 3, title: "Secagem Turbo", description: "Alta temperatura controlada para esterilizar e dar volume." },
            { step: 4, title: "Entrega", description: "Entregue em embalagem protetora (ou a vácuo, se pedir)." }
        ],
        faq: [
            { question: "Lavam edredom King/Queen?", answer: "Sim, nossas máquinas industriais comportam qualquer tamanho." },
            { question: "Quanto tempo leva?", answer: "Geralmente 2 a 3 dias úteis para garantir secagem total." },
            { question: "Vocês buscam?", answer: "Com certeza. Não ocupe seu carro com edredons gigantes." }
        ],
        ctaText: "Higienizar Edredons"
    },
    "passadoria": {
        title: "Passadoria Express",
        subtitle: "Chega de perder horas no ferro de passar.",
        heroImage: "/images/carousel_ironing.png",
        description: "Passar roupa é a tarefa doméstica mais odiada. Deixe isso com a gente. Entregamos suas camisas e roupas sociais impecáveis, alinhadas e prontas para vestir. Você ganha tempo e apresentação pessoal.",
        benefits: [
            { title: "Apresentação Impecável", description: "Roupas sem vincos, com colarinhos e punhos perfeitos.", icon: "Sparkles" },
            { title: "Economia de Tempo", description: "Quantas horas você gasta passando? Nós devolvemos esse tempo para você.", icon: "Clock" },
            { title: "Praticidade", description: "Receba tudo no cabide ou dobrado, direto para o armário.", icon: "Truck" }
        ],
        process: [
            { step: 1, title: "Coleta", description: "Buscamos suas roupas limpas (secas)." },
            { step: 2, title: "Passadoria", description: "Equipamentos industriais a vapor que protegem o tecido." },
            { step: 3, title: "Conferência", description: "Inspeção de qualidade peça a peça." },
            { step: 4, title: "Entrega", description: "Tudo pronto para usar, sem amassados." }
        ],
        faq: [
            { question: "Preciso fornecer cabides?", answer: "Pode enviar os seus ou fornecemos os nossos (consulte condições)." },
            { question: "Qual o prazo?", answer: "Rápido! Em 2 a 3 dias suas roupas estão de volta." },
            { question: "Passam qualquer tecido?", answer: "Sim, temos temperatura certa para seda, linho, algodão e sintéticos." }
        ],
        ctaText: "Quero Minhas Roupas Passadas"
    },
    "lavagem-de-cortinas": {
        title: "Cortinas e Tapetes",
        subtitle: "Sua casa livre de poeira e odores.",
        heroImage: "/images/carousel_delicate.png",
        description: "Cortinas e tapetes acumulam quilos de poeira por ano. Nossa limpeza especializada remove a sujeira profunda, elimina odores de mofo/animais e renova as cores do ambiente.",
        benefits: [
            { title: "Ar Puro", description: "Removemos a poeira acumulada que causa rinite e alergias.", icon: "ShieldCheck" },
            { title: "Cores Vivas", description: "A sujeira esconde a cor real. A lavagem devolve a vida à decoração.", icon: "Sparkles" },
            { title: "Sem Trabalho", description: "Esqueça o esforço de esfregar tapete ou tirar cortina pesada.", icon: "Truck" }
        ],
        process: [
            { step: 1, title: "Retirada", description: "Agendamos a retirada (consulte serviço de desmontagem)." },
            { step: 2, title: "Bate-Poeira", description: "Remoção física da sujeira sólida antes da lavagem." },
            { step: 3, title: "Lavagem Profunda", description: "Imersão e escovação específica para cada fibra." },
            { step: 4, title: "Secagem e Entrega", description: "Secagem lenta e entrega agendada." }
        ],
        faq: [
            { question: "Vocês instalam a cortina?", answer: "Temos parceiros e equipe para desmontagem e instalação. Consulte." },
            { question: "Tapete demora a secar?", answer: "Sim, tapetes grossos precisam de 7 a 10 dias para secar sem cheiro." },
            { question: "Lavam tapete persa?", answer: "Sim, com processo delicado e produtos neutros." }
        ],
        ctaText: "Orçar Lavagem de Casa"
    },
    "lavagem-de-ternos": {
        title: "Ternos e Roupas Sociais",
        subtitle: "Cuidado delicado para peças que exigem respeito.",
        heroImage: "/imagens/hero-suit.png",
        description: "Ternos, blazers e vestidos de festa não podem ver água comum. Nossa limpeza a seco (ou Wet Cleaning) protege a estrutura, o forro e o caimento da peça, garantindo durabilidade e elegância.",
        benefits: [
            { title: "Wet Cleaning", description: "Tecnologia moderna que limpa sem agredir as fibras delicadas.", icon: "Zap" },
            { title: "Caimento Perfeito", description: "Passadoria técnica que mantém a estrutura da alfaiataria.", icon: "Sparkles" },
            { title: "Durabilidade", description: "Evita o desgaste prematuro causado por lavagens incorretas.", icon: "ShieldCheck" }
        ],
        process: [
            { step: 1, title: "Análise", description: "Identificação de manchas e tipo de tecido." },
            { step: 2, title: "Pré-tratamento", description: "Remoção manual de manchas visíveis." },
            { step: 3, title: "Limpeza Técnica", description: "Processo específico para alfaiataria." },
            { step: 4, title: "Finalização", description: "Passadoria a vapor e embalagem em capa protetora." }
        ],
        faq: [
            { question: "Remove manchas de vinho?", answer: "Temos altas taxas de sucesso, mas depende do tempo da mancha." },
            { question: "Quanto tempo leva?", answer: "Peças delicadas levam de 3 a 5 dias úteis." },
            { question: "Vocês buscam?", answer: "Sim, buscamos e entregamos no cabide." }
        ],
        ctaText: "Cuidar dos Meus Ternos"
    }
};

export const SERVICES = Object.entries(SERVICES_DETAILS).map(([slug, details]) => ({
    title: details.title,
    description: details.subtitle,
    icon: "Sparkles", // Default icon for the list view if needed
    slug: slug
}));
