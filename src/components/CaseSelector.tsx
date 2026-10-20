'use client';

import Link from 'next/link';
import { useState } from 'react';

const cases = [
    {
        id: 'inicio',
        label: 'Estou a começar',
        title: 'Método FIBRA',
        href: '/metodo-fibra/',
        text: 'Começar certo custa menos do que corrigir depois. Em 6 meses montamos a base: produto, margem e posicionamento decididos antes de investires no escuro.'
    },
    {
        id: 'operacao',
        label: 'Já vendo, mas sobra pouco',
        title: 'Método FIBRA',
        href: '/metodo-fibra/',
        text: 'Trabalhas muito e fica pouco. Isso não se resolve com mais esforço. Resolve-se com preço, margem e coleção com lógica — e isso pede acompanhamento.'
    },
    {
        id: 'escala',
        label: 'A marca já funciona, quero afinar',
        title: 'Consultoria Tafetá 360',
        href: '/consultoria-tafeta-360/',
        text: 'A base existe. Falta precisão. Duas horas para identificar o que corrigir, um mês para executar, uma hora de seguimento para ajustar.'
    }
];

export default function CaseSelector() {
    const [active, setActive] = useState(cases[0].id);
    const current = cases.find((c) => c.id === active)!;

    return (
        <div className="card weave !border-bege/50">
            <p className="eyebrow">Qual é o teu caso?</p>
            <div role="radiogroup" aria-label="Escolhe a fase da tua marca" className="mt-5 flex flex-col gap-2 sm:flex-row">
                {cases.map((c) => (
                    <button
                        key={c.id}
                        type="button"
                        role="radio"
                        aria-checked={active === c.id}
                        onClick={() => setActive(c.id)}
                        className={`rounded-full border px-5 py-2.5 text-left text-sm font-semibold transition sm:text-center ${
                            active === c.id ? 'border-cafe bg-cafe text-white' : 'border-bege bg-white text-cafe hover:border-cafe'
                        }`}
                    >
                        {c.label}
                    </button>
                ))}
            </div>
            <div className="mt-6 rounded-xl bg-white p-6" aria-live="polite">
                <p className="text-sm font-semibold uppercase tracking-widest text-terracota">Recomendo</p>
                <p className="mt-1 font-serif text-3xl font-semibold text-cafe">{current.title}</p>
                <p className="mt-3 text-tinta/85">{current.text}</p>
                <Link href={current.href} className="btn-secondary mt-5">
                    Ver {current.title} →
                </Link>
            </div>
        </div>
    );
}
