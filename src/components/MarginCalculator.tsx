'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type Field = { key: keyof Values; label: string; hint: string; suffix: string; step: string };
type Values = {
    producao: number;
    aviamentos: number;
    amostras: number;
    unidades: number;
    portes: number;
    taxas: number;
    comissoes: number;
    devolucoes: number;
    desconto: number;
    pvp: number;
    iva: number;
};

const defaults: Values = {
    producao: 18,
    aviamentos: 2.5,
    amostras: 600,
    unidades: 200,
    portes: 4.5,
    taxas: 2.5,
    comissoes: 0,
    devolucoes: 8,
    desconto: 10,
    pvp: 79,
    iva: 23
};

const groups: { title: string; fields: Field[] }[] = [
    {
        title: 'Custo da peça',
        fields: [
            { key: 'producao', label: 'Produção por peça', hint: 'Tecido + confeção', suffix: '€', step: '0.1' },
            { key: 'aviamentos', label: 'Aviamentos e embalagem', hint: 'Etiquetas, botões, saco, caixa', suffix: '€', step: '0.1' },
            { key: 'amostras', label: 'Amostras e desenvolvimento', hint: 'Total gasto neste modelo', suffix: '€', step: '10' },
            { key: 'unidades', label: 'Unidades produzidas', hint: 'Para dividir o desenvolvimento', suffix: 'un.', step: '1' }
        ]
    },
    {
        title: 'Custos de vender',
        fields: [
            { key: 'portes', label: 'Portes por envio', hint: 'O que pagas tu, não a cliente', suffix: '€', step: '0.1' },
            { key: 'taxas', label: 'Taxas de pagamento', hint: 'Stripe, MB Way, PayPal…', suffix: '%', step: '0.1' },
            { key: 'comissoes', label: 'Comissões', hint: 'Marketplace, loja, afiliados', suffix: '%', step: '1' },
            { key: 'devolucoes', label: 'Taxa de devoluções', hint: 'Em cada 100 vendas, quantas voltam', suffix: '%', step: '1' }
        ]
    },
    {
        title: 'Preço',
        fields: [
            { key: 'pvp', label: 'PVP com IVA', hint: 'O preço que a cliente vê', suffix: '€', step: '1' },
            { key: 'desconto', label: 'Desconto médio', hint: 'Média real, incluindo saldos e códigos', suffix: '%', step: '1' },
            { key: 'iva', label: 'IVA', hint: '23% no continente', suffix: '%', step: '1' }
        ]
    }
];

const eur = new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' });
const pct = (n: number) => `${(n * 100).toFixed(1).replace('.', ',')}%`;
const TARGET = 0.6;

function compute(v: Values) {
    const pvpSemIva = v.pvp / (1 + v.iva / 100);
    const precoEfetivo = pvpSemIva * (1 - v.desconto / 100);
    const desenvolvimento = v.unidades > 0 ? v.amostras / v.unidades : 0;
    const custoPeca = v.producao + v.aviamentos + desenvolvimento;
    const taxasPct = (v.taxas + v.comissoes) / 100;
    const custoTaxas = precoEfetivo * taxasPct;
    // Cada devolução custa os portes de ida e de volta.
    const custoDevolucoes = (v.devolucoes / 100) * v.portes * 2;
    const custoFixoVenda = custoPeca + v.portes + custoDevolucoes;
    const custoTotal = custoFixoVenda + custoTaxas;
    const margem = precoEfetivo - custoTotal;
    const margemPct = precoEfetivo > 0 ? margem / precoEfetivo : 0;
    const multiplicador = v.producao + v.aviamentos > 0 ? v.pvp / (v.producao + v.aviamentos) : 0;
    const denom = 1 - taxasPct - TARGET;
    const pvpAlvo = denom > 0 ? (custoFixoVenda / denom / (1 - v.desconto / 100)) * (1 + v.iva / 100) : NaN;
    return { pvpSemIva, precoEfetivo, desenvolvimento, custoPeca, custoTaxas, custoDevolucoes, custoTotal, margem, margemPct, multiplicador, pvpAlvo };
}

function verdict(m: number) {
    if (m < 0.3) return { label: 'Estás a pagar para vender.', tone: 'bg-red-50 text-red-900 border-red-200', text: 'Com esta margem, cada venda mal cobre a operação. Mais vendas não resolvem: o problema está no preço ou no custo.' };
    if (m < 0.5) return { label: 'Margem curta.', tone: 'bg-amber-50 text-amber-900 border-amber-200', text: 'Sobra pouco para marketing, stock parado e imprevistos. Qualquer desconto extra come o lucro.' };
    if (m < 0.6) return { label: 'Margem razoável.', tone: 'bg-linho text-cafe border-bege', text: 'Há base, mas pouca folga. Afinar custo ou preço dá-te espaço para crescer sem aperto.' };
    return { label: 'Margem saudável.', tone: 'bg-emerald-50 text-emerald-900 border-emerald-200', text: 'Há espaço para investir na marca. Garante que se mantém quando entram saldos e devoluções.' };
}

export default function MarginCalculator() {
    const [values, setValues] = useState<Values>(defaults);
    const r = useMemo(() => compute(values), [values]);
    const v = verdict(r.margemPct);

    function update(key: keyof Values, raw: string) {
        const n = parseFloat(raw.replace(',', '.'));
        setValues((prev) => ({ ...prev, [key]: Number.isFinite(n) && n >= 0 ? n : 0 }));
    }

    const breakdown = [
        { label: 'Peça (produção + aviamentos)', value: values.producao + values.aviamentos },
        { label: 'Desenvolvimento por peça', value: r.desenvolvimento },
        { label: 'Portes', value: values.portes },
        { label: 'Devoluções', value: r.custoDevolucoes },
        { label: 'Taxas e comissões', value: r.custoTaxas }
    ];

    return (
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()} aria-label="Dados da peça">
                {groups.map((g) => (
                    <fieldset key={g.title} className="card">
                        <legend className="sr-only">{g.title}</legend>
                        <p className="font-serif text-2xl font-semibold text-cafe" aria-hidden="true">
                            {g.title}
                        </p>
                        <div className="mt-5 grid gap-5 sm:grid-cols-2">
                            {g.fields.map((f) => (
                                <div key={f.key}>
                                    <label htmlFor={`c-${f.key}`} className="label">
                                        {f.label}
                                    </label>
                                    <div className="relative">
                                        <input
                                            id={`c-${f.key}`}
                                            type="number"
                                            inputMode="decimal"
                                            min="0"
                                            step={f.step}
                                            defaultValue={defaults[f.key]}
                                            onChange={(e) => update(f.key, e.target.value)}
                                            className="field pr-12"
                                            aria-describedby={`c-${f.key}-hint`}
                                        />
                                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-cafe/60">{f.suffix}</span>
                                    </div>
                                    <p id={`c-${f.key}-hint`} className="mt-1 text-xs text-tinta/60">
                                        {f.hint}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </fieldset>
                ))}
            </form>

            <div className="space-y-5 lg:sticky lg:top-28" aria-live="polite">
                <div className="rounded-2xl bg-cafe p-6 text-white sm:p-8">
                    <p className="text-sm font-semibold uppercase tracking-widest text-barro">Margem real por peça</p>
                    <p className="mt-2 font-serif text-6xl font-semibold">{pct(r.margemPct)}</p>
                    <p className="mt-1 text-linho/90">{eur.format(r.margem)} por peça vendida</p>
                    <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/15 pt-5 text-sm">
                        <div>
                            <dt className="text-linho/70">Recebes de facto</dt>
                            <dd className="mt-0.5 text-lg font-semibold">{eur.format(r.precoEfetivo)}</dd>
                        </div>
                        <div>
                            <dt className="text-linho/70">Custa-te de facto</dt>
                            <dd className="mt-0.5 text-lg font-semibold">{eur.format(r.custoTotal)}</dd>
                        </div>
                        <div>
                            <dt className="text-linho/70">PVP ÷ custo da peça</dt>
                            <dd className="mt-0.5 text-lg font-semibold">{r.multiplicador.toFixed(1).replace('.', ',')}×</dd>
                        </div>
                        <div>
                            <dt className="text-linho/70">PVP para 60% de margem</dt>
                            <dd className="mt-0.5 text-lg font-semibold">{Number.isFinite(r.pvpAlvo) ? eur.format(r.pvpAlvo) : '—'}</dd>
                        </div>
                    </dl>
                </div>

                <div className={`rounded-2xl border p-5 ${v.tone}`}>
                    <p className="font-semibold">{v.label}</p>
                    <p className="mt-1 text-sm">{v.text}</p>
                </div>

                <div className="card !p-6">
                    <p className="font-semibold text-cafe">Para onde vai o dinheiro</p>
                    <ul className="mt-4 space-y-2.5 text-sm">
                        {breakdown.map((b) => (
                            <li key={b.label}>
                                <div className="flex justify-between">
                                    <span>{b.label}</span>
                                    <span className="font-semibold">{eur.format(b.value)}</span>
                                </div>
                                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-cru">
                                    <div
                                        className="h-full rounded-full bg-barro"
                                        style={{ width: `${r.precoEfetivo > 0 ? Math.min(100, (b.value / r.precoEfetivo) * 100) : 0}%` }}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-4 text-xs text-tinta/60">Barras em percentagem do que recebes por peça, já sem IVA e com o desconto médio.</p>
                </div>

                <div className="card !p-6">
                    <p className="text-sm text-tinta/80">
                        Os 60% são uma referência de trabalho para venda direta ao cliente final. Venda por grosso, consignação e marketplaces têm outra conta. A
                        calculadora mostra os números. A decisão sobre o que fazer com eles é estratégica.
                    </p>
                    <Link href="/consultoria-tafeta-360/" className="btn-primary mt-5">
                        Rever preço e margem comigo
                    </Link>
                </div>
            </div>
        </div>
    );
}
