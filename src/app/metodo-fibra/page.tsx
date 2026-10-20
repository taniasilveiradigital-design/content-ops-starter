import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { Check, CtaBand, Faq, PageHero } from '@/components/ui';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema';

const description =
    'Método FIBRA: acompanhamento estratégico 1:1 de 6 meses para marcas de moda. Coleção, margem, posicionamento e decisão com critério de quem conhece a indústria têxtil.';

export const metadata: Metadata = {
    title: 'Método FIBRA — Acompanhamento estratégico para marcas de moda',
    description,
    alternates: { canonical: '/metodo-fibra/' },
    openGraph: { url: '/metodo-fibra/', title: 'Método FIBRA — Acompanhamento estratégico para marcas de moda', description }
};

const pillars = [
    {
        name: 'Mentalidade',
        text: 'Decidir com critério em vez de reagir. Sair do ciclo de esforço e de desconto, e assumir a marca como negócio.'
    },
    {
        name: 'Produto',
        text: 'Coleção com lógica, peças com função, preço construído a partir do custo real. É aqui que a margem se ganha ou se perde.'
    },
    {
        name: 'Digital',
        text: 'Posicionamento claro e comunicação alinhada com o produto e com o preço. A marca diz a mesma coisa em todo o lado.'
    }
];

const faq = [
    {
        q: 'Para quem é o Método FIBRA?',
        a: 'Para marcas de moda que já perceberam que o problema é estrutural e precisam de acompanhamento para o resolver. Serve quem está a começar e quer fazê-lo com critério, e quem já vende mas trabalha muito e fica com pouco.'
    },
    {
        q: 'Como funciona o acompanhamento?',
        a: 'São 6 meses de trabalho 1:1, organizados em três pilares: Mentalidade, Produto e Digital. O plano parte do diagnóstico da tua marca, não de um modelo igual para todas.'
    },
    {
        q: 'O Método FIBRA é uma mentoria de conteúdo?',
        a: 'Não. É estrutura de negócio. Trabalhamos coleção, margem, posicionamento e decisão. O conteúdo passa a funcionar quando isto está resolvido.'
    },
    {
        q: 'Garantes resultados?',
        a: 'Não prometo números. Prometo trabalho com critério e experiência real de indústria. O resultado depende das decisões que forem tomadas e executadas — e é para isso que existe o acompanhamento.'
    }
];

export default function FibraPage() {
    return (
        <>
            <JsonLd data={serviceSchema({ path: '/metodo-fibra/', name: 'Método FIBRA', description, serviceType: 'Consultoria estratégica para marcas de moda' })} />
            <JsonLd data={faqSchema(faq)} />
            <JsonLd data={breadcrumbSchema([{ name: 'Método FIBRA', path: '/metodo-fibra/' }])} />

            <PageHero
                eyebrow="Acompanhamento estratégico 1:1 · 6 meses"
                title="Método FIBRA: estrutura de negócio para marcas de moda."
                intro="Não é mentoria de conteúdo. Em 6 meses, a tua marca passa a ter direção, margem e decisões com critério."
            >
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <Link href="/contacto/?servico=fibra" className="btn-primary">
                        Quero entrar no FIBRA
                    </Link>
                    <Link href="/diagnostico/" className="btn-secondary">
                        Fazer primeiro o diagnóstico
                    </Link>
                </div>
            </PageHero>

            <section className="container-site grid gap-12 py-20 sm:py-24 lg:grid-cols-2">
                <div className="reveal">
                    <p className="eyebrow">Para quem é</p>
                    <h2 className="mt-4">Para marcas que já perceberam o problema.</h2>
                </div>
                <div className="reveal space-y-5 text-lg text-tinta/85">
                    <p>Já sabes que não é falta de esforço. Já testaste mais conteúdo, mais coleções, mais descontos. O resultado não mudou.</p>
                    <p>O FIBRA é para quem quer parar de tentar e passar a decidir. Com método, com acompanhamento e com quem conhece a indústria por dentro.</p>
                </div>
            </section>

            <section className="weave border-y border-cru">
                <div className="container-site py-20 sm:py-24">
                    <p className="eyebrow reveal">Os três pilares</p>
                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {pillars.map((p, i) => (
                            <article key={p.name} className="card reveal">
                                <p className="font-serif text-5xl font-semibold text-terracota/70">0{i + 1}</p>
                                <h3 className="mt-3 text-3xl">{p.name}</h3>
                                <p className="mt-3 text-tinta/80">{p.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="container-site grid gap-12 py-20 sm:py-24 lg:grid-cols-2">
                <div className="reveal">
                    <p className="eyebrow">O que inclui</p>
                    <h2 className="mt-4">O que trabalhamos juntas.</h2>
                </div>
                <ul className="reveal space-y-4 text-lg">
                    <Check>Organização de coleção: o que entra, o que sai e porquê.</Check>
                    <Check>Lógica de produto: cada peça com uma função no negócio.</Check>
                    <Check>Ajuste de margem: preço construído a partir do custo real.</Check>
                    <Check>Direção de posicionamento: para quem é a marca e porque és tu.</Check>
                    <Check>Mentalidade de decisão: critério fixo em vez de impulso.</Check>
                </ul>
            </section>

            <section className="bg-tinta text-linho">
                <div className="container-site grid gap-10 py-20 sm:py-24 md:grid-cols-2">
                    <div className="reveal">
                        <p className="eyebrow !text-barro">O que não é</p>
                        <ul className="mt-5 space-y-3 text-lg">
                            <li>✕ Gestão de redes sociais</li>
                            <li>✕ Fórmulas prontas iguais para todas</li>
                            <li>✕ Promessas de faturação</li>
                        </ul>
                    </div>
                    <div className="reveal">
                        <p className="eyebrow !text-barro">O que é</p>
                        <ul className="mt-5 space-y-3 text-lg text-white">
                            <li>✓ Estrutura antes do crescimento</li>
                            <li>✓ Produto antes da comunicação</li>
                            <li>✓ Decisão antes da ação</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="container-site py-20 sm:py-24">
                <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
                    <h2 className="reveal">Perguntas sobre o FIBRA</h2>
                    <div className="reveal">
                        <Faq items={faq} />
                    </div>
                </div>
            </section>

            <CtaBand title="Pronta para estruturar a tua marca?" text="Marca uma conversa. Vemos onde está a tua marca e se o FIBRA é o caminho certo." />
        </>
    );
}
