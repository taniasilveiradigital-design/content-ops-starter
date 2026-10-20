// Dados centrais do site. Preencher os campos vazios para aparecerem no site e no Google.
export const site = {
    name: 'Tânia Silveira',
    url: 'https://taniasilveira.pt',
    title: 'Tânia Silveira — Consultoria estratégica para marcas de moda',
    description:
        'Estratégia de produto, margem e estrutura para marcas de moda. Método FIBRA e Consultoria Tafetá 360, com experiência real de indústria têxtil.',
    jobTitle: 'Estrategista de produto e estrutura para marcas de moda',
    city: 'Guimarães',
    region: 'Braga',
    country: 'PT',
    // Ex.: 'https://www.instagram.com/utilizador/' — deixar vazio para esconder
    instagram: '',
    // Ex.: 'https://www.linkedin.com/in/utilizador/' — deixar vazio para esconder
    linkedin: ''
};

export const sameAs = [site.instagram, site.linkedin].filter(Boolean);

export const nav = [
    { href: '/metodo-fibra/', label: 'Método FIBRA' },
    { href: '/consultoria-tafeta-360/', label: 'Tafetá 360' },
    { href: '/diagnostico/', label: 'Diagnóstico' },
    { href: '/calculadora-margem/', label: 'Calculadora' },
    { href: '/sobre/', label: 'Sobre' }
];

export const clients = ['Nicau Couture', 'ROMEO', 'DOMPURE', 'Hosmos.co', 'Little Leflot', "Traços D'Amor"];
