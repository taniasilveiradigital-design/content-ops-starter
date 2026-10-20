'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { submitNetlifyForm } from '@/lib/forms';
import { Area, answerOptions, areaLabels, computeResult, results, Stage, stageQuestion, statements } from '@/lib/quiz';

const services = {
    fibra: { name: 'Método FIBRA', href: '/metodo-fibra/', why: 'O que encontraste aqui pede estrutura e acompanhamento, não um ajuste pontual.' },
    tafeta: { name: 'Consultoria Tafetá 360', href: '/consultoria-tafeta-360/', why: 'A base existe. Uma intervenção focada chega para corrigir e afinar.' }
};

export default function Quiz() {
    const router = useRouter();
    const [step, setStep] = useState(0); // 0 = fase, 1..n = afirmações, n+1 = resultado
    const [stage, setStage] = useState<Stage | null>(null);
    const [answers, setAnswers] = useState<number[]>([]);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');

    const totalSteps = statements.length + 1;
    const done = step > statements.length;

    function chooseStage(s: Stage) {
        setStage(s);
        setStep(1);
    }

    function answer(value: number) {
        const next = [...answers];
        next[step - 1] = value;
        setAnswers(next);
        setStep(step + 1);
        document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function restart() {
        setStage(null);
        setAnswers([]);
        setStep(0);
    }

    if (done && stage) {
        const r = computeResult(stage, answers);
        const res = results[r.main];
        const svc = services[r.service];

        async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            if (fd.get('bot-field')) return;
            setSending(true);
            setError('');
            try {
                await submitNetlifyForm('diagnostico', {
                    nome: String(fd.get('nome') || ''),
                    email: String(fd.get('email') || ''),
                    marca: String(fd.get('marca') || ''),
                    fase: stage!,
                    gargalo: r.main,
                    servico_recomendado: svc.name,
                    pontuacoes: (Object.keys(r.scores) as Area[]).map((a) => `${areaLabels[a]}: ${r.scores[a]}/4`).join(' | '),
                    consentimento: fd.get('consentimento') ? 'sim' : 'não'
                });
                router.push('/obrigada/');
            } catch {
                setError('Não foi possível enviar. Tenta de novo ou usa a página de contacto.');
                setSending(false);
            }
        }

        return (
            <div className="space-y-8" aria-live="polite">
                <div className="card">
                    <p className="eyebrow">O teu resultado</p>
                    <h2 className="mt-3 text-3xl sm:text-4xl">{res.title}</h2>
                    <p className="mt-4 text-lg text-tinta/85">{res.text}</p>

                    <div className="mt-8 space-y-4">
                        {(Object.keys(r.scores) as Area[]).map((a) => (
                            <div key={a}>
                                <div className="flex justify-between text-sm font-semibold text-cafe">
                                    <span>{areaLabels[a]}</span>
                                    <span>{r.scores[a]}/4</span>
                                </div>
                                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-cru">
                                    <div
                                        className={`h-full rounded-full transition-all duration-700 ${a === r.main ? 'bg-terracota' : 'bg-bege'}`}
                                        style={{ width: `${(r.scores[a] / 4) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                        <p className="text-xs text-tinta/60">Quanto maior a barra, maior o peso dessa área no que está a travar a marca.</p>
                    </div>
                </div>

                <div className="card">
                    <h3>Os teus primeiros 3 passos</h3>
                    <ol className="mt-5 space-y-4">
                        {res.actions.map((a, i) => (
                            <li key={a} className="flex gap-4">
                                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-linho font-serif text-lg font-semibold text-terracota">
                                    {i + 1}
                                </span>
                                <span className="pt-0.5">{a}</span>
                            </li>
                        ))}
                    </ol>
                    {r.main === 'margem' && (
                        <Link href="/calculadora-margem/" className="btn-secondary mt-6">
                            Calcular a margem real →
                        </Link>
                    )}
                    <p className="mt-6 border-t border-cru pt-5 text-sm text-tinta/70">
                        Este diagnóstico aponta a direção. Não decide por ti. Quem decide é quem conhece o negócio por dentro.
                    </p>
                </div>

                <div className="rounded-2xl bg-cafe p-6 text-white sm:p-8">
                    <p className="text-sm font-semibold uppercase tracking-widest text-barro">Recomendo</p>
                    <p className="mt-1 font-serif text-4xl font-semibold">{svc.name}</p>
                    <p className="mt-3 text-linho/90">{svc.why}</p>
                    <Link href={svc.href} className="btn-light mt-6">
                        Ver {svc.name}
                    </Link>
                </div>

                <form name="diagnostico" onSubmit={onSubmit} className="card space-y-4">
                    <div>
                        <h3>Queres falar sobre este resultado?</h3>
                        <p className="mt-2 text-tinta/80">Deixa os teus dados. Recebo o teu diagnóstico e respondo-te por email.</p>
                    </div>
                    <p className="hidden">
                        <label>
                            Não preencher: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                        </label>
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="q-nome" className="label">
                                Nome
                            </label>
                            <input id="q-nome" name="nome" required autoComplete="name" className="field" />
                        </div>
                        <div>
                            <label htmlFor="q-email" className="label">
                                Email
                            </label>
                            <input id="q-email" name="email" type="email" required autoComplete="email" className="field" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="q-marca" className="label">
                            Marca (nome ou Instagram)
                        </label>
                        <input id="q-marca" name="marca" className="field" />
                    </div>
                    <label className="flex gap-3 text-sm text-tinta/80">
                        <input type="checkbox" name="consentimento" required className="mt-1 h-4 w-4 accent-cafe" />
                        <span>
                            Aceito que os meus dados sejam usados para responder a este pedido, conforme a{' '}
                            <Link href="/politica-de-privacidade/" className="underline">
                                política de privacidade
                            </Link>
                            .
                        </span>
                    </label>
                    {error && <p className="text-sm font-semibold text-red-700">{error}</p>}
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button type="submit" disabled={sending} className="btn-primary disabled:opacity-60">
                            {sending ? 'A enviar…' : 'Enviar o meu diagnóstico'}
                        </button>
                        <button type="button" onClick={restart} className="btn-secondary">
                            Refazer o diagnóstico
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    const progress = (step / totalSteps) * 100;

    return (
        <div className="card">
            <div className="flex items-center justify-between text-sm font-semibold text-cafe">
                <span>
                    Pergunta {step + 1} de {totalSteps}
                </span>
                {step > 0 && (
                    <button type="button" onClick={() => setStep(step - 1)} className="text-terracota hover:underline">
                        ← Voltar
                    </button>
                )}
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-cru" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
                <div className="h-full rounded-full bg-terracota transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>

            {step === 0 ? (
                <fieldset className="mt-8">
                    <legend className="font-serif text-3xl font-semibold text-cafe">{stageQuestion.text}</legend>
                    <div className="mt-6 grid gap-3">
                        {stageQuestion.options.map((o) => (
                            <button
                                key={o.value}
                                type="button"
                                onClick={() => chooseStage(o.value)}
                                className={`rounded-xl border px-5 py-4 text-left font-medium transition hover:border-cafe hover:bg-linho ${
                                    stage === o.value ? 'border-cafe bg-linho' : 'border-cru'
                                }`}
                            >
                                {o.label}
                            </button>
                        ))}
                    </div>
                </fieldset>
            ) : (
                <fieldset className="mt-8" key={step}>
                    <legend className="font-serif text-3xl font-semibold leading-snug text-cafe">“{statements[step - 1].text}”</legend>
                    <p className="mt-2 text-sm text-tinta/70">Isto acontece na tua marca?</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        {answerOptions.map((o) => (
                            <button
                                key={o.value}
                                type="button"
                                onClick={() => answer(o.value)}
                                className={`rounded-xl border px-5 py-4 font-semibold transition hover:border-cafe hover:bg-linho ${
                                    answers[step - 1] === o.value ? 'border-cafe bg-linho' : 'border-cru'
                                }`}
                            >
                                {o.label}
                            </button>
                        ))}
                    </div>
                </fieldset>
            )}
        </div>
    );
}
