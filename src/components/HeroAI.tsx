'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const words = ['margem', 'coleção', 'produção', 'preço', 'posicionamento', 'decisão'];

const lines = [
    { t: '› a ler coleção SS26 — 42 referências', c: 'text-linho/70' },
    { t: '› a cruzar vendas × margem × stock', c: 'text-linho/70' },
    { t: '› margem real: 38% · esperada: 55%', c: 'text-barro' },
    { t: '› 9 peças sem função na coleção', c: 'text-barro' },
    { t: '✓ decisão: cortar 9, rever preço de 6', c: 'text-white font-semibold' }
];

function useReducedMotion() {
    const [reduced, setReduced] = useState(false);
    useEffect(() => setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches), []);
    return reduced;
}

function RotatingWord() {
    const reduced = useReducedMotion();
    const [i, setI] = useState(0);
    const [text, setText] = useState(words[0]);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (reduced) return;
        const word = words[i];
        const done = !deleting && text === word;
        const empty = deleting && text === '';
        const delay = done ? 1600 : empty ? 250 : deleting ? 45 : 85;
        const id = setTimeout(() => {
            if (done) setDeleting(true);
            else if (empty) {
                setDeleting(false);
                setI((i + 1) % words.length);
            } else setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
        }, delay);
        return () => clearTimeout(id);
    }, [text, deleting, i, reduced]);

    return (
        <span className="relative inline-block text-barro">
            {text}
            <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-barro align-middle" style={{ height: '0.9em' }} aria-hidden="true" />
        </span>
    );
}

function Terminal() {
    const reduced = useReducedMotion();
    const [shown, setShown] = useState(0);
    const [chars, setChars] = useState(0);

    useEffect(() => {
        if (reduced) {
            setShown(lines.length);
            return;
        }
        if (shown >= lines.length) {
            const id = setTimeout(() => {
                setShown(0);
                setChars(0);
            }, 4200);
            return () => clearTimeout(id);
        }
        const line = lines[shown].t;
        const id = setTimeout(
            () => {
                if (chars < line.length) setChars(chars + 1);
                else {
                    setShown(shown + 1);
                    setChars(0);
                }
            },
            chars < line.length ? 28 : 520
        );
        return () => clearTimeout(id);
    }, [shown, chars, reduced]);

    return (
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-tinta/90 p-4 font-mono text-[0.78rem] leading-relaxed shadow-2xl backdrop-blur sm:p-5 sm:text-[0.82rem]">
            <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="h-2.5 w-2.5 rounded-full bg-terracota" />
                <span className="h-2.5 w-2.5 rounded-full bg-bege/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-bege/30" />
                <span className="ml-2 text-[0.7rem] uppercase tracking-widest text-linho/50">análise de marca · IA + critério</span>
            </div>
            <div className="min-h-[8.5rem]" aria-label="Exemplo de análise de uma coleção">
                {lines.map((l, idx) =>
                    idx < shown ? (
                        <p key={l.t} className={l.c}>
                            {l.t}
                        </p>
                    ) : idx === shown ? (
                        <p key={l.t} className={l.c}>
                            {l.t.slice(0, chars)}
                            <span className="inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-barro" />
                        </p>
                    ) : null
                )}
            </div>
            <p className="mt-2 text-[0.65rem] text-linho/40">Exemplo ilustrativo</p>
        </div>
    );
}

export default function HeroAI() {
    return (
        <section className="relative overflow-hidden bg-tinta text-linho">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Cpath d='M0 2.5h10M0 7.5h10' stroke='%23f6f1ec' stroke-width='.6'/%3E%3Cpath d='M2.5 0v10M7.5 0v10' stroke='%23ba8166' stroke-width='.6'/%3E%3C/svg%3E\")"
                }}
                aria-hidden="true"
            />
            <svg className="thread-draw pointer-events-none absolute -left-40 bottom-0 h-[520px] w-[900px] text-terracota/40" viewBox="0 0 900 520" fill="none" aria-hidden="true">
                <path d="M0 480C180 420 240 300 380 320s200 160 330 90 120-260 190-330" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1400" />
            </svg>

            <div className="container-site relative grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-8 lg:py-24">
                <div>
                    <p className="eyebrow !text-barro">Estratega de marcas de moda & mercado têxtil</p>
                    <p className="mt-5 font-serif text-[3.6rem] font-semibold leading-[0.88] tracking-tight text-white sm:text-8xl lg:text-[7.5rem]" aria-hidden="true">
                        Tânia
                        <br />
                        Silveira<span className="text-terracota">.</span>
                    </p>
                    <h1 className="mt-7 max-w-xl !font-serif !text-2xl !font-medium !leading-snug !text-linho sm:!text-3xl">
                        Estratégia para marcas de moda e mercado têxtil. Com chão de fábrica e inteligência artificial.
                    </h1>
                    <p className="mt-6 text-lg text-linho/80 sm:text-xl">
                        Resolvo o teu problema de <RotatingWord />
                    </p>
                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <Link href="/diagnostico/" className="btn-light">
                            Fazer o diagnóstico gratuito
                        </Link>
                        <Link href="#ia" className="btn border border-white/40 text-white hover:bg-white hover:text-cafe">
                            Como uso a IA
                        </Link>
                    </div>
                </div>

                <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                    <div className="relative ml-auto aspect-[4/5] w-[88%] overflow-hidden rounded-[2rem] ring-1 ring-white/10">
                        <Image
                            src="/fotos/tania-retrato.webp"
                            alt="Tânia Silveira, estratega de marcas de moda"
                            fill
                            priority
                            sizes="(min-width: 1024px) 40vw, 90vw"
                            className="photo-grade object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-tinta/70 via-transparent to-transparent" />
                        <p className="absolute right-5 top-4 font-script text-4xl text-white/90 drop-shadow">com fibra</p>
                    </div>
                    <div className="relative -mt-28 sm:-mt-32 lg:absolute lg:-left-6 lg:bottom-8 lg:mt-0">
                        <Terminal />
                    </div>
                </div>
            </div>
        </section>
    );
}
