import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CaseSelector from '@/components/CaseSelector';
import HeroAI from '@/components/HeroAI';
import Marquee from '@/components/Marquee';
import JsonLd from '@/components/JsonLd';
import { Check, CtaBand, Faq } from '@/components/ui';
import { homeFaq } from '@/lib/faq';
import { faqSchema } from '@/lib/schema';
import { clients, site } from '@/lib/site';

export const metadata: Metadata = {
    title: { absolute: site.title },
    alternates: { canonical: '/' }
};

const stages = [
    {
        tag: 'Começar',
        title: 'Tens a ideia mas não tens o caminho.',
        text: 'Ideias soltas e investimento no escuro. Antes de gastar, decide o que vem primeiro e o que não pode ser ignorado.'
    },
    {
        tag: 'Operar',
        title: 'Vendes, mas no fim do mês sobra pouco.',
        text: 'Trabalhas o dia todo e dependes de desconto para vender. O erro está no preço, na margem ou no produto. Raramente no esforço.'
    },
    {
        tag: 'Escalar',
        title: 'Cresceste e viraste o gargalo.',
        text: 'A marca depende de ti para tudo. Quanto mais fazes, menos avanças. Falta estrutura que não gire à tua volta.'
    }
];

const aiCards = [
    { tag: '01 · dados', title: 'Coleção e vendas lidas a sério', text: 'Cruzo vendas, stock e margem por referência. Fica claro o que paga a coleção e o que só ocupa espaço.' },
    { tag: '02 · cenários', title: 'Custo e preço testados antes', text: 'Simulo preços, quantidades e descontos antes de decidires. Vês o impacto na margem antes de produzir.' },
    { tag: '03 · mercado', title: 'Mercado têxtil com filtro', text: 'Leio tendências, concorrência e sinais do mercado depressa. E separo o que serve a tua marca do ruído.' },
    { tag: '04 · processos', title: 'Operação que não depende de ti', text: 'Monto rotinas e ferramentas com IA para a marca deixar de girar à tua volta.' }
];

const pillars =['Estrutura antes do crescimento', 'Produto antes da comunicação', 'Clareza antes da execução', 'Decisão antes da ação'];

export default function HomePage() {
    return (
        <>
            <JsonLd data={faqSchema(homeFaq)} />

            <HeroAI />
            <Marquee />

            {/* FASES */}
            <section className="container-site py-20 sm:py-28">
                <div className="reveal max-w-3xl">
                    <p className="eyebrow">Onde estás agora</p>
                    <h2 className="mt-4">O problema muda de forma. A raiz é sempre a mesma.</h2>
                    <p className="mt-5 text-lg text-tinta/85">Falta de estrutura, clareza e direção. Reconheces-te em alguma destas?</p>
                </div>
                <div className="mt-12 grid gap-5 md:grid-cols-3">
                    {stages.map((s, i) => (
                        <article key={s.tag} className="card reveal transition hover:-translate-y-1 hover:border-barro" style={{ transitionDelay: `${i * 80}ms` }}>
                            <p className="font-script text-3xl text-terracota">{s.tag}</p>
                            <h3 className="mt-2">{s.title}</h3>
                            <p className="mt-3 text-tinta/80">{s.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            {/* IA */}
            <section id="ia" className="scroll-mt-20 bg-cafe text-linho">
                <div className="container-site grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1.25fr] lg:items-center">
                    <div className="reveal relative">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-1 ring-white/10">
                            <Image
                                src="/fotos/tania-estudio.webp"
                                alt="Tânia Silveira no escritório, com o ecrã de trabalho atrás"
                                fill
                                sizes="(min-width: 1024px) 40vw, 90vw"
                                className="photo-grade object-cover"
                            />
                        </div>
                        <p className="absolute -bottom-5 left-6 rounded-full bg-terracota px-5 py-2 text-sm font-semibold text-white shadow-lg">
                            Chão de fábrica + IA
                        </p>
                    </div>
                    <div className="reveal">
                        <p className="eyebrow !text-barro">IA com chão de fábrica</p>
                        <h2 className="mt-4 !text-white">A IA acelera. O critério vem da fábrica.</h2>
                        <p className="mt-5 text-lg text-linho/85">
                            Uso inteligência artificial para fazer em horas o que antes levava semanas: ler dados, cruzar custos, testar cenários. Mas nenhuma
                            ferramenta sabe porque é que um fornecedor atrasa ou onde a margem se perde numa peça. Isso sei eu.
                        </p>
                        <div className="mt-10 grid gap-4 sm:grid-cols-2">
                            {aiCards.map((c) => (
                                <article key={c.title} className="rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:border-barro hover:bg-white/10">
                                    <p className="font-mono text-xs text-barro">{c.tag}</p>
                                    <h3 className="mt-2 !text-xl !text-white">{c.title}</h3>
                                    <p className="mt-2 text-sm text-linho/80">{c.text}</p>
                                </article>
                            ))}
                        </div>
                        <p className="mt-8 font-serif text-2xl font-semibold text-white">Não vendo IA. Resolvo problemas. A IA é uma das ferramentas.</p>
                    </div>
                </div>
            </section>

            {/* REVERSÃO */}
            <section className="bg-tinta text-linho">
                <div className="container-site grid gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:items-center">
                    <div className="reveal">
                        <p className="eyebrow !text-barro">O que quase ninguém diz</p>
                        <h2 className="mt-4 !text-white">Não é um problema criativo. É um problema de negócio.</h2>
                    </div>
                    <div className="reveal space-y-5 text-lg text-linho/85">
                        <p>Uma coleção mal estruturada não é um erro criativo. É um erro de negócio.</p>
                        <p>
                            A maioria das marcas que me chega não tem problema de produto. Tem problema de decisão. E a decisão errada veio antes da coleção, do
                            preço e da comunicação.
                        </p>
                        <ul className="grid gap-3 pt-2 sm:grid-cols-2">
                            {pillars.map((p) => (
                                <li key={p} className="rounded-xl border border-white/15 px-4 py-3 text-base font-semibold text-white">
                                    {p}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* FERRAMENTAS */}
            <section className="container-site py-20 sm:py-28">
                <div className="reveal max-w-3xl">
                    <p className="eyebrow">Ferramentas gratuitas</p>
                    <h2 className="mt-4">Começa por perceber onde estás.</h2>
                </div>
                <div className="mt-12 grid gap-5 md:grid-cols-2">
                    <Link href="/diagnostico/" className="card reveal group block transition hover:border-terracota">
                        <p className="text-sm font-semibold text-terracota">9 perguntas · 3 minutos</p>
                        <h3 className="mt-2 text-3xl">Diagnóstico da marca</h3>
                        <p className="mt-3 text-tinta/80">
                            Descobre se o gargalo está no produto, na margem, no posicionamento ou na decisão. Resultado imediato, com os primeiros passos.
                        </p>
                        <span className="mt-6 inline-block font-semibold text-cafe group-hover:text-terracota">Fazer o diagnóstico →</span>
                    </Link>
                    <Link href="/calculadora-margem/" className="card reveal group block transition hover:border-terracota">
                        <p className="text-sm font-semibold text-terracota">Custo real · Margem real</p>
                        <h3 className="mt-2 text-3xl">Calculadora de margem</h3>
                        <p className="mt-3 text-tinta/80">
                            Mete os custos que costumam ficar de fora: amostras, portes, comissões, devoluções, descontos. Vê quanto ganhas de facto por peça.
                        </p>
                        <span className="mt-6 inline-block font-semibold text-cafe group-hover:text-terracota">Calcular a margem →</span>
                    </Link>
                </div>
            </section>

            {/* SERVIÇOS */}
            <section className="weave border-y border-cru">
                <div className="container-site py-20 sm:py-28">
                    <div className="reveal max-w-3xl">
                        <p className="eyebrow">Como trabalhamos</p>
                        <h2 className="mt-4">Dois caminhos. Um critério.</h2>
                    </div>
                    <div className="mt-12 grid gap-5 lg:grid-cols-2">
                        <article className="card reveal flex flex-col">
                            <p className="eyebrow">Acompanhamento 1:1 · 6 meses</p>
                            <h3 className="mt-3 text-4xl">Método FIBRA</h3>
                            <p className="mt-4 text-tinta/85">
                                Não é mentoria de conteúdo. É estrutura de negócio. Em 6 meses, a marca passa a ter direção, margem e decisões com critério.
                            </p>
                            <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-cafe">Mentalidade · Produto · Digital</p>
                            <ul className="mt-5 space-y-2">
                                <Check>Organização de coleção</Check>
                                <Check>Lógica de produto</Check>
                                <Check>Ajuste de margem</Check>
                                <Check>Direção de posicionamento</Check>
                                <Check>Mentalidade de decisão</Check>
                            </ul>
                            <Link href="/metodo-fibra/" className="btn-primary mt-8 self-start">
                                Ver o Método FIBRA
                            </Link>
                        </article>
                        <article className="card reveal flex flex-col">
                            <p className="eyebrow">2h + seguimento de 1h ao fim de 1 mês</p>
                            <h3 className="mt-3 text-4xl">Consultoria Tafetá 360</h3>
                            <p className="mt-4 text-tinta/85">
                                Para quem já tem uma marca a funcionar e quer saber exatamente onde afinar para crescer com mais precisão.
                            </p>
                            <ul className="mt-5 space-y-2">
                                <Check>Otimização do que já existe</Check>
                                <Check>Correção de falhas estruturais</Check>
                                <Check>Ajustes finos em produto e margem</Check>
                                <Check>Direção comercial mais estratégica</Check>
                            </ul>
                            <Link href="/consultoria-tafeta-360/" className="btn-primary mt-8 self-start">
                                Ver a Tafetá 360
                            </Link>
                        </article>
                    </div>
                    <div className="reveal mt-10">
                        <CaseSelector />
                    </div>
                </div>
            </section>

            {/* SOBRE */}
            <section className="container-site grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                <div className="reveal grid grid-cols-2 gap-4">
                    <figure className="relative row-span-2 min-h-[320px] overflow-hidden rounded-[1.5rem]">
                        <Image src="/fotos/tania-porto.webp" alt="Tânia Silveira de fato branco, com o Porto ao fundo" fill sizes="(min-width: 1024px) 25vw, 45vw" className="photo-grade object-cover" />
                    </figure>
                    <figure className="relative aspect-square overflow-hidden rounded-[1.5rem]">
                        <Image src="/fotos/tania-raizes.webp" alt="Tânia Silveira ao pôr do sol, nas serras transmontanas" fill sizes="(min-width: 1024px) 20vw, 45vw" className="photo-grade object-cover" />
                        <figcaption className="absolute bottom-3 left-3 rounded-full bg-tinta/70 px-3 py-1 text-xs font-semibold text-white">Raiz transmontana</figcaption>
                    </figure>
                    <figure className="relative aspect-square overflow-hidden rounded-[1.5rem]">
                        <Image src="/fotos/tania-sistema.webp" alt="Ecrã com o sistema de produto, clientes e fornecedores" fill sizes="(min-width: 1024px) 20vw, 45vw" className="photo-grade object-cover" />
                        <figcaption className="absolute bottom-3 left-3 rounded-full bg-tinta/70 px-3 py-1 text-xs font-semibold text-white">Estrutura no ecrã</figcaption>
                    </figure>
                </div>
                <div className="reveal space-y-5 text-lg text-tinta/85">
                    <p className="eyebrow">Quem está do outro lado</p>
                    <h2 className="!mt-4">Não venho da teoria. Venho da fábrica.</h2>
                    <p>
                        Transmontana, de Carrazedo de Montenegro. Vivo em Guimarães, no centro da indústria têxtil portuguesa. Fiz o percurso inteiro:
                        produção, planeamento, produto e gestão comercial.
                    </p>
                    <p>Sei onde a margem se perde antes de a peça chegar à cliente. É esse critério que levo para cada marca.</p>
                    <Link href="/sobre/" className="btn-secondary">
                        Conhecer o meu percurso
                    </Link>
                </div>
            </section>

            {/* MARCAS */}
            <section className="border-y border-cru bg-linho">
                <div className="container-site py-12">
                    <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-cafe/70">Marcas com quem trabalhei</p>
                    <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                        {clients.map((c) => (
                            <li key={c} className="font-serif text-2xl font-semibold text-cafe/80">
                                {c}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* FAQ */}
            <section className="container-site py-20 sm:py-28">
                <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
                    <div className="reveal">
                        <p className="eyebrow">Perguntas frequentes</p>
                        <h2 className="mt-4">Antes de marcares.</h2>
                    </div>
                    <div className="reveal">
                        <Faq items={homeFaq} />
                    </div>
                </div>
            </section>

            <CtaBand />
        </>
    );
}
