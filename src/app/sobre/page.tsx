import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { CtaBand, PageHero } from '@/components/ui';
import { breadcrumbSchema } from '@/lib/schema';
import { clients } from '@/lib/site';

const description =
    'Tânia Silveira, estrategista de produto e estrutura para marcas de moda. Transmontana, a viver em Guimarães, com percurso em produção, planeamento, produto e gestão comercial têxtil.';

export const metadata: Metadata = {
    title: 'Sobre a Tânia Silveira — Estrategista de marcas de moda com raiz na indústria têxtil',
    description,
    alternates: { canonical: '/sobre/' },
    openGraph: { url: '/sobre/', type: 'profile', title: 'Sobre a Tânia Silveira', description }
};

const values = ['Disciplina', 'Inteligência', 'Respeito', 'Excelência', 'Amor'];

export default function SobrePage() {
    return (
        <>
            <JsonLd data={breadcrumbSchema([{ name: 'Sobre', path: '/sobre/' }])} />
            <PageHero
                eyebrow="Sobre"
                title="Não venho da teoria. Venho do chão de fábrica."
                intro="Sou a Tânia Silveira. Estrategista de produto e estrutura para marcas de moda. Não sou criadora de conteúdo: sou quem organiza as decisões por trás da marca."
            />

            <section className="container-site grid gap-12 py-20 sm:py-24 lg:grid-cols-[1fr_1.4fr]">
                <div className="reveal">
                    <p className="eyebrow">De onde venho</p>
                    <h2 className="mt-4">Transmontana de raiz.</h2>
                    <div className="relative mt-8 aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                        <Image src="/fotos/tania-raizes.webp" alt="Tânia Silveira nas serras transmontanas ao pôr do sol" fill sizes="(min-width: 1024px) 35vw, 90vw" className="photo-grade object-cover" />
                    </div>
                </div>
                <div className="prose-site reveal text-lg text-tinta/85">
                    <p>
                        Nasci em Chaves e cresci em Carrazedo de Montenegro, em Trás-os-Montes. De lá trouxe a forma de trabalhar: direta, sem rodeios, a
                        resolver mesmo quando ninguém tem o caminho feito.
                    </p>
                    <p>
                        Vivo em Guimarães, no centro da indústria têxtil portuguesa. Foi aqui que fiz o percurso inteiro: produção, planeamento, produto e
                        gestão comercial. Vi marcas a crescer e vi marcas a fechar. Quase sempre pelas mesmas razões.
                    </p>
                </div>
            </section>

            <section className="weave border-y border-cru">
                <div className="container-site grid gap-12 py-20 sm:py-24 lg:grid-cols-[1fr_1.4fr]">
                    <div className="reveal">
                        <p className="eyebrow">O que faço</p>
                        <h2 className="mt-4">Trago critério onde existe improviso.</h2>
                        <div className="relative mt-8 aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                            <Image src="/fotos/tania-camisa.webp" alt="Tânia Silveira, retrato de camisa branca" fill sizes="(min-width: 1024px) 35vw, 90vw" className="photo-grade object-cover" />
                        </div>
                    </div>
                    <div className="prose-site reveal text-lg text-tinta/85">
                        <p>
                            Transformo marcas de moda confusas em negócios com direção, margem e estrutura. Olho para a coleção, para o preço e para as
                            decisões com os olhos de quem já esteve do lado da produção. E uso inteligência artificial para chegar mais depressa ao que interessa.
                        </p>
                        <p>Sei onde a margem se perde antes de a peça chegar à cliente. Sei porque é que uma coleção bonita pode não pagar as contas.</p>
                        <p>
                            É esse conhecimento que levo para o <Link href="/metodo-fibra/">Método FIBRA</Link> e para a{' '}
                            <Link href="/consultoria-tafeta-360/">Consultoria Tafetá 360</Link>.
                        </p>
                    </div>
                </div>
            </section>

            <section className="container-site py-20 sm:py-24">
                <div className="grid gap-12 lg:grid-cols-2">
                    <div className="reveal">
                        <p className="eyebrow">Valores</p>
                        <ul className="mt-6 flex flex-wrap gap-3">
                            {values.map((v) => (
                                <li key={v} className="rounded-full border border-bege px-5 py-2 font-serif text-xl font-semibold text-cafe">
                                    {v}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="reveal">
                        <p className="eyebrow">Marcas com quem trabalhei</p>
                        <ul className="mt-6 grid grid-cols-2 gap-3">
                            {clients.map((c) => (
                                <li key={c} className="font-serif text-2xl font-semibold text-cafe/80">
                                    {c}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <CtaBand title="Bora fazer acontecer?" text="Começa pelo diagnóstico ou marca já uma conversa." />
        </>
    );
}
