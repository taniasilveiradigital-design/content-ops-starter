export type Area = 'produto' | 'margem' | 'posicionamento' | 'decisao';
export type Stage = 'inicio' | 'operacao' | 'escala';

export const stageQuestion = {
    text: 'Em que fase está a tua marca?',
    options: [
        { value: 'inicio' as Stage, label: 'Ainda não lancei, ou lancei há pouco' },
        { value: 'operacao' as Stage, label: 'Já vendo, mas com muito esforço e pouca margem' },
        { value: 'escala' as Stage, label: 'Vendo bem, mas quero afinar e crescer com precisão' }
    ]
};

export const statements: { area: Area; text: string }[] = [
    { area: 'produto', text: 'Crio peças novas porque gosto delas, não porque a coleção precisa delas.' },
    { area: 'margem', text: 'Defino o preço a olhar para a concorrência, não para os meus custos.' },
    { area: 'posicionamento', text: 'Se tapasse o logótipo, a minha marca podia ser confundida com outra.' },
    { area: 'decisao', text: 'Mudo de direção sempre que algo não vende como esperava.' },
    { area: 'produto', text: 'Não sei quais são as peças que realmente pagam a coleção.' },
    { area: 'margem', text: 'Faço descontos para conseguir vender.' },
    { area: 'posicionamento', text: 'Não consigo explicar numa frase para quem é a minha marca.' },
    { area: 'decisao', text: 'Tomo as decisões importantes por impulso, sem um critério definido.' }
];

export const answerOptions = [
    { value: 2, label: 'Sim' },
    { value: 1, label: 'Às vezes' },
    { value: 0, label: 'Não' }
];

export const areaLabels: Record<Area, string> = {
    produto: 'Produto',
    margem: 'Margem',
    posicionamento: 'Posicionamento',
    decisao: 'Decisão'
};

// Em caso de empate, a decisão vem primeiro: é a raiz dos outros problemas.
const tieOrder: Area[] = ['decisao', 'produto', 'margem', 'posicionamento'];

export const results: Record<Area | 'solida', { title: string; text: string; actions: string[] }> = {
    produto: {
        title: 'O teu gargalo está no produto.',
        text: 'A coleção cresce por gosto, não por lógica. Há peças a ocupar stock e orçamento sem pagar o lugar que têm. Sem saber o que vende e porquê, cada coleção nova é uma aposta.',
        actions: [
            'Lista as peças da última coleção por unidades vendidas e por margem. As de cima dizem-te onde está a marca.',
            'Define a função de cada peça antes de a desenhar: entrada, margem ou imagem.',
            'Corta o que não tem função. Menos referências, mais critério.'
        ]
    },
    margem: {
        title: 'O teu gargalo está na margem.',
        text: 'Vendes, mas o dinheiro não fica. Preço definido pela concorrência e descontos para escoar são sinal de que o custo real nunca foi feito até ao fim.',
        actions: [
            'Faz a conta completa por peça: produção, aviamentos, amostras, portes, comissões e devoluções.',
            'Revê o preço a partir do custo real, não do que os outros cobram.',
            'Trava os descontos permanentes. Desconto sem estratégia ensina a cliente a esperar.'
        ]
    },
    posicionamento: {
        title: 'O teu gargalo está no posicionamento.',
        text: 'A marca existe, mas não se distingue. Quando a cliente não percebe porque és tu, a decisão dela passa a ser o preço.',
        actions: [
            'Escreve numa frase: para quem é, que problema resolve, porque és tu. Se não cabe numa frase, ainda não está claro.',
            'Confirma que produto, preço e comunicação dizem a mesma coisa.',
            'Deixa de falar para toda a gente. Uma cliente bem definida vende mais do que um público largo.'
        ]
    },
    decisao: {
        title: 'O teu gargalo está na decisão.',
        text: 'Há esforço, mas não há critério. Mudar de direção a cada venda fraca não é flexibilidade. É falta de estrutura para decidir.',
        actions: [
            'Define 3 critérios fixos para aprovar qualquer decisão de coleção, preço ou investimento.',
            'Dá tempo às decisões antes de as mudar. Uma coleção não se avalia em duas semanas.',
            'Separa o urgente do estrutural. Reserva tempo na semana só para o estrutural.'
        ]
    },
    solida: {
        title: 'A tua base está sólida.',
        text: 'Não há um gargalo evidente. O próximo passo é afinar com precisão para crescer sem perder margem nem controlo.',
        actions: [
            'Confirma a margem real das tuas 5 peças mais vendidas.',
            'Revê se a coleção seguinte mantém a lógica que está a resultar.',
            'Identifica a próxima decisão estrutural e trata-a antes de ser urgente.'
        ]
    }
};

export function computeResult(stage: Stage, answers: number[]) {
    const scores: Record<Area, number> = { produto: 0, margem: 0, posicionamento: 0, decisao: 0 };
    statements.forEach((s, i) => (scores[s.area] += answers[i] ?? 0));
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const max = Math.max(...Object.values(scores));
    const main: Area | 'solida' = total <= 3 || max <= 1 ? 'solida' : tieOrder.find((a) => scores[a] === max)!;

    // Recomendação: Tafetá 360 para marcas já a operar, com problemas focados; FIBRA nos restantes casos.
    const service = stage !== 'inicio' && (main === 'solida' || (stage === 'escala' && total <= 8)) ? 'tafeta' : 'fibra';
    return { scores, total, main, service } as const;
}
