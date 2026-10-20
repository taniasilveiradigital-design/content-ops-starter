import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import MarginCalculator from '@/components/MarginCalculator';
import { CtaBand, Faq } from '@/components/ui';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { site } from '@/lib/site';

const description =
    'Calculadora de margem para marcas de roupa: calcula o custo real e a margem por peça com amostras, portes, comissões, devoluções, descontos e IVA. Gratuita.';

export const metadata: Metadata = {
    title: 'Calculadora de margem para marcas de roupa — Preço e custo real por peça',
    description,
    alternates: { canonical: '/calculadora-margem/' },
    openGraph: { url: '/calculadora-margem/', title: 'Calculadora de margem para marcas de roupa', description }
};

const faq = [
    {
        q: 'Como calcular o preço de uma peça de roupa?',
        a: 'Parte do custo real, não do preço da concorrência. Soma produção, aviamentos, desenvolvimento e amostras divididos pelas unidades, portes, devoluções e taxas. Depois define a margem que a marca precisa e chega ao PVP, sem esquecer o IVA e o desconto médio que vais praticar.'
    },
    {
        q: 'Qual é uma boa margem para uma marca de roupa?',
        a: 'Depende do canal. Na venda direta ao cliente final, uma margem de cerca de 60% sobre o preço sem IVA é uma referência de trabalho comum, porque tem de pagar marketing, stock parado e saldos. Por grosso e em consignação a conta é diferente.'
    },
    {
        q: 'A regra de multiplicar o custo por 3 funciona?',
        a: 'É um ponto de partida, não uma regra. Multiplicar o custo da peça não inclui portes, devoluções, comissões nem descontos. É por isso que muitas marcas acham que têm margem e no fim do mês não sobra nada.'
    },
    {
        q: 'Porque é que o IVA entra nas contas?',
        a: 'Porque o IVA não é teu. Em Portugal continental são 23% do preço final que entregas ao Estado. A tua margem calcula-se sobre o preço sem IVA.'
    }
];

const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Calculadora de margem para marcas de roupa',
    url: `${site.url}/calculadora-margem/`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: 'pt-PT',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    creator: { '@id': `${site.url}/#tania` }
};

export default function CalculadoraPage() {
    return (
        <>
            <JsonLd data={appSchema} />
            <JsonLd data={faqSchema(faq)} />
            <JsonLd data={breadcrumbSchema([{ name: 'Calculadora de margem', path: '/calculadora-margem/' }])} />

            <section className="weave border-b border-cru">
                <div className="container-site py-14 sm:py-20">
                    <p className="eyebrow">Ferramenta gratuita</p>
                    <h1 className="mt-4 max-w-4xl text-4xl sm:text-5xl">Calculadora de margem: quanto ganhas de facto por peça?</h1>
                    <p className="mt-5 max-w-2xl text-lg text-tinta/85">
                        A maioria das marcas calcula a margem só com o custo de produção. Faltam amostras, portes, comissões, devoluções e descontos. Mete os
                        teus números e vê a margem real.
                    </p>
                    <div className="mt-12">
                        <MarginCalculator />
                    </div>
                </div>
            </section>

            <section className="container-site py-20 sm:py-24">
                <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
                    <h2 className="reveal">Preço e margem: o essencial</h2>
                    <div className="reveal">
                        <Faq items={faq} />
                    </div>
                </div>
            </section>

            <CtaBand title="Os números não mentem. Mas também não decidem." text="Se a margem não está onde devia, vemos juntas onde corrigir: produto, custo, preço ou canal." />
        </>
    );
}
