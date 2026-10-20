// Dados centrais do site. Preencher os campos vazios para aparecerem no site e no Google.
export const site = {
    name: 'Tânia Silveira',
    url: 'https://taniasilveira.pt',
    title: 'Tânia Silveira — Estratega de marcas de moda e mercado têxtil',
    description:
        'Estratégia para marcas de moda e mercado têxtil: produto, margem e estrutura, com experiência de chão de fábrica e inteligência artificial aplicada.',
    jobTitle: 'Estratega de marcas de moda e mercado têxtil',
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
