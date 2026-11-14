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
    // Tapete: sem preço homologado (sob consulta); o item antigo por m² saiu.
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
            "Secagem",
            "Dobra organizada",
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
        description: "Tênis sujo estraga qualquer visual. Mande uma foto do par pelo WhatsApp: avaliamos o material e o estado e passamos o valor e o prazo antes de fechar.",
        benefits: [
            { title: "Avaliação do par", description: "Olhamos o material e o estado antes de fechar.", icon: "Sparkles" },
            { title: "Orçamento antes", description: "Valor e prazo confirmados antes de você autorizar.", icon: "ShieldCheck" },
            { title: "Atendimento no balcão", description: "Traga o par à loja em Jardim Camburi.", icon: "Zap" }
        ],
        process: [
            { step: 1, title: "Avaliação", description: "Inspecionamos o material e o estado do calçado." },
            { step: 2, title: "Orçamento", description: "Confirmamos valor e prazo antes de fechar." },
            { step: 3, title: "Lavagem", description: "Conforme o material do par." },
            { step: 4, title: "Retirada", description: "Você retira o par na loja." }
        ],
        faq: [
            { question: "Qual é o prazo?", answer: "O prazo é confirmado após a avaliação do material e do estado do par." },
            { question: "Lavam qualquer material?", answer: "Depende do par. Mande uma foto pelo WhatsApp que a equipe avalia." }
        ],
        ctaText: "Pedir orçamento do meu tênis"
    },
    "lavagem-de-edredons": {
        title: "Edredons e Cobertores",
        subtitle: "Peças volumosas que não cabem bem na máquina de casa.",
        heroImage: "/images/carousel_comforter.png",
        description: "Edredons e cobertores são pesados e difíceis de lavar e secar em casa. Traga ao balcão: confirmamos valor e prazo antes de fechar.",
        benefits: [
            { title: "Lavar e secar", description: "Peças volumosas lavadas e secas na loja.", icon: "Sparkles" },
            { title: "Orçamento antes", description: "Valor e prazo confirmados antes de fechar.", icon: "ShieldCheck" },
            { title: "Atendimento no balcão", description: "Traga à loja em Jardim Camburi.", icon: "Zap" }
        ],
        process: [
            { step: 1, title: "Avaliação", description: "Conferimos o tamanho e o tipo da peça." },
            { step: 2, title: "Lavagem", description: "Conforme o que a etiqueta permite." },
            { step: 3, title: "Secagem", description: "A peça é seca na loja." },
            { step: 4, title: "Retirada", description: "Você retira na loja." }
        ],
        faq: [
            { question: "Qual é o prazo?", answer: "O prazo depende da peça e é confirmado antes de fechar." },
            { question: "Vocês buscam?", answer: "Coleta e entrega: consulte as condições pelo WhatsApp." }
        ],
        ctaText: "Pedir orçamento"
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
        subtitle: "Peças grandes que dão trabalho em casa.",
        heroImage: "/images/carousel_delicate.png",
        description: "Cortinas acumulam poeira e são pesadas para lavar em casa. Informe o tipo e o tamanho aproximado e receba o orçamento. Tapetes: sob consulta, com avaliação por foto.",
        benefits: [
            { title: "Orçamento antes", description: "Valor e prazo confirmados antes de fechar.", icon: "ShieldCheck" },
            { title: "Peças grandes", description: "Cortinas pesadas para lavar e secar em casa.", icon: "Sparkles" },
            { title: "Atendimento no balcão", description: "Traga à loja em Jardim Camburi.", icon: "Truck" }
        ],
        process: [
            { step: 1, title: "Orçamento", description: "Você informa tipo e tamanho; confirmamos valor e prazo." },
            { step: 2, title: "Lavagem", description: "Conforme o tecido e a etiqueta." },
            { step: 3, title: "Secagem", description: "A peça é seca na loja." },
            { step: 4, title: "Retirada", description: "Você retira na loja." }
        ],
        faq: [
            { question: "E a retirada e a instalação da cortina?", answer: "Fale com a gente no WhatsApp antes para combinar como a cortina chega e volta." },
            { question: "Lavam tapete?", answer: "Sob consulta: mande uma foto e confirmamos se dá para lavar, o valor e o prazo." }
        ],
        ctaText: "Orçar Lavagem de Casa"
    },
    "lavagem-de-ternos": {
        title: "Ternos e Roupas Sociais",
        subtitle: "Cuidado delicado para peças que exigem respeito.",
        heroImage: "/imagens/hero-suit.png",
        // A Lavexpress NÃO faz lavagem a seco. O nome do processo e os resultados
        // (durabilidade, remoção de manchas) não estão confirmados: o texto
        // descreve só o atendimento (avaliação e orçamento por peça).
        description: "Ternos, blazers e vestidos de festa com valor por peça. Consulte a equipe sobre a sua peça antes de trazer.",
        benefits: [
            { title: "Avaliação da peça", description: "A equipe olha tecido, etiqueta e manchas antes de fechar.", icon: "Zap" },
            { title: "Valor por peça", description: "Fora dos pacotes, com valor informado antes.", icon: "Sparkles" },
            { title: "Orçamento antes", description: "Valor e prazo confirmados antes de fechar.", icon: "ShieldCheck" }
        ],
        process: [
            { step: 1, title: "Avaliação", description: "Olhamos o tecido, a etiqueta e as manchas." },
            { step: 2, title: "Orçamento", description: "Valor e prazo confirmados antes de fechar." },
            { step: 3, title: "Cuidado", description: "Conforme o que a etiqueta da peça permite." },
            { step: 4, title: "Retirada", description: "Você retira a peça na loja." }
        ],
        faq: [
            { question: "Tira mancha?", answer: "Depende do tecido e do tempo da mancha. Mande uma foto que a equipe avalia." },
            { question: "Quanto tempo leva?", answer: "O prazo depende da peça e é confirmado antes de fechar." },
            { question: "Vocês buscam?", answer: "Coleta e entrega: consulte as condições pelo WhatsApp." }
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
