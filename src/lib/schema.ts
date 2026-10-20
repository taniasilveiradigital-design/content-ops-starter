import { sameAs, site } from './site';

export const personId = `${site.url}/#tania`;
export const businessId = `${site.url}/#negocio`;

export const baseGraph = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'WebSite',
            '@id': `${site.url}/#website`,
            url: `${site.url}/`,
            name: site.name,
            inLanguage: 'pt-PT',
            publisher: { '@id': businessId }
        },
        {
            '@type': 'Person',
            '@id': personId,
            name: site.name,
            jobTitle: site.jobTitle,
            url: `${site.url}/sobre/`,
            image: `${site.url}/fotos/tania-retrato.webp`,
            homeLocation: { '@type': 'Place', name: `${site.city}, Portugal` },
            knowsAbout: [
                'Estratégia de marcas de moda',
                'Desenvolvimento de produto têxtil',
                'Estrutura de coleção',
                'Cálculo de margem e preço',
                'Produção têxtil',
                'Posicionamento de marca',
                'Mercado têxtil',
                'Inteligência artificial aplicada à moda'
            ],
            ...(sameAs.length ? { sameAs } : {})
        },
        {
            '@type': 'ProfessionalService',
            '@id': businessId,
            name: `${site.name} — Estratégia para marcas de moda`,
            url: `${site.url}/`,
            image: `${site.url}/og.png`,
            description: site.description,
            founder: { '@id': personId },
            address: {
                '@type': 'PostalAddress',
                addressLocality: site.city,
                addressRegion: site.region,
                addressCountry: site.country
            },
            areaServed: { '@type': 'Country', name: 'Portugal' },
            knowsLanguage: 'pt-PT',
            ...(sameAs.length ? { sameAs } : {}),
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Serviços',
                itemListElement: [
                    { '@type': 'Offer', itemOffered: { '@id': `${site.url}/metodo-fibra/#servico` } },
                    { '@type': 'Offer', itemOffered: { '@id': `${site.url}/consultoria-tafeta-360/#servico` } }
                ]
            }
        }
    ]
};

export function serviceSchema(opts: { path: string; name: string; description: string; serviceType: string }) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${site.url}${opts.path}#servico`,
        name: opts.name,
        description: opts.description,
        serviceType: opts.serviceType,
        url: `${site.url}${opts.path}`,
        provider: { '@id': businessId },
        areaServed: { '@type': 'Country', name: 'Portugal' },
        audience: { '@type': 'BusinessAudience', name: 'Marcas de moda' }
    };
}

export function faqSchema(items: { q: string; a: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((i) => ({
            '@type': 'Question',
            name: i.q,
            acceptedAnswer: { '@type': 'Answer', text: i.a }
        }))
    };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [{ name: 'Início', path: '/' }, ...items].map((i, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: i.name,
            item: `${site.url}${i.path}`
        }))
    };
}
