import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { Check, CtaBand, Faq, PageHero } from '@/components/ui';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema';

const description =
    'Consultoria Tafetá 360: sessão estratégica de 2h + seguimento de 1h ao fim de um mês, para marcas de moda que já vendem e querem afinar produto, margem e direção comercial.';

export const metadata: Metadata = {
    title: 'Consultoria Tafetá 360 — Sessão estratégica para marcas de moda',
    description,
    alternates: { canonical: '/consultoria-tafeta-360/' },
    openGraph: { url: '/consultoria-tafeta-360/', title: 'Consultoria Tafetá 360 — Sessão estratégica para marcas de moda', description }
};

const steps = [
    { when: 'Sessão 1 · 2 horas', title: 'Diagnóstico estratégico', text: 'Olhamos para a marca inteira: produto, margem, posicionamento e operação. Saímos com o que corrigir e por que ordem.' },
    { when: 'Durante 1 mês', title: 'Execução', text: 'Aplicas as decisões. O plano é concreto, por isso sabes exatamente o que fazer primeiro.' },
    { when: 'Sessão 2 · 1 hora', title: 'Seguimento', text: 'Revemos o que mudou, ajustamos o que não resultou e fechamos os próximos passos.' }
];

const faq = [
    {
        q: 'Para quem é a Consultoria Tafetá 360?',
        a: 'Para marcas de moda com base criada, que já vendem, mas precisam de refinamento e de escalar com precisão. Se a marca ainda não tem estrutura, o caminho indicado é o Método FIBRA.'
    },
    {
        q: 'Qual a diferença para o Método FIBRA?',
        a: 'A Tafetá 360 é uma intervenção focada: 2 horas de diagnóstico e 1 hora de seguimento. O FIBRA é um acompanhamento de 6 meses para estruturar a marca de raiz.'
    },
    {
        q: 'As sessões são presenciais ou online?',
        a: 'Combinamos o formato na conversa inicial, consoante o que fizer mais sentido para a tua marca.'
    }
];

export default function TafetaPage() {
    return (
        <>
            <JsonLd
                data={serviceSchema({ path: '/consultoria-tafeta-360/', name: 'Consultoria Tafetá 360', description, serviceType: 'Consultoria estratégica para marcas de moda' })}
            />
            <JsonLd data={faqSchema(faq)} />
            <JsonLd data={breadcrumbSchema([{ name: 'Consultoria Tafetá 360', path: '/consultoria-tafeta-360/' }])} />

            <PageHero
                eyebrow="2h de estratégia + 1h de seguimento"
                title="Consultoria Tafetá 360: afinar a marca com precisão."
                intro="Para quem já tem uma marca a funcionar e quer saber exatamente onde afinar para crescer com mais precisão."
            >
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <Link href="/contacto/?servico=tafeta" className="btn-primary">
                        Marcar a Tafetá 360
                    </Link>
                    <Link href="/calculadora-margem/" className="btn-secondary">
                        Calcular primeiro a margem
                    </Link>
                </div>
            </PageHero>

            <section className="container-site py-20 sm:py-24">
                <p className="eyebrow reveal">Como funciona</p>
                <h2 className="reveal mt-4 max-w-3xl">Três momentos. Um mês de diferença.</h2>
                <ol className="mt-12 grid gap-5 md:grid-cols-3">
                    {steps.map((s, i) => (
                        <li key={s.title} className="card reveal relative">
                            <span className="absolute right-6 top-5 font-serif text-5xl font-semibold text-cru">{i + 1}</span>
                            <p className="text-sm font-semibold text-terracota">{s.when}</p>
                            <h3 className="mt-2">{s.title}</h3>
                            <p className="mt-3 text-tinta/80">{s.text}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="weave border-y border-cru">
                <div className="container-site grid gap-12 py-20 sm:py-24 lg:grid-cols-2">
                    <div className="reveal">
                        <p className="eyebrow">Onde atuamos</p>
                        <h2 className="mt-4">Menos tentativa. Mais precisão.</h2>
                    </div>
                    <ul className="reveal space-y-4 text-lg">
                        <Check>Otimização do que já existe, sem recomeçar do zero.</Check>
                        <Check>Correção de falhas estruturais que travam o crescimento.</Check>
                        <Check>Ajustes finos em produto e margem.</Check>
                        <Check>Direção comercial mais estratégica e mais assertiva.</Check>
                    </ul>
                </div>
            </section>

            <section className="container-site py-20 sm:py-24">
                <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
                    <h2 className="reveal">Perguntas sobre a Tafetá 360</h2>
                    <div className="reveal">
                        <Faq items={faq} />
                    </div>
                </div>
            </section>

            <CtaBand title="A base existe. Falta afinar." text="Marca a tua Consultoria Tafetá 360 ou faz primeiro o diagnóstico para confirmar onde está o gargalo." />
        </>
    );
}
