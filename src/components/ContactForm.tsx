'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { submitNetlifyForm } from '@/lib/forms';

const serviceOptions = [
    { value: 'fibra', label: 'Método FIBRA' },
    { value: 'tafeta', label: 'Consultoria Tafetá 360' },
    { value: 'nao-sei', label: 'Ainda não sei' }
];

export default function ContactForm() {
    const router = useRouter();
    const [servico, setServico] = useState('nao-sei');
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');

    // Pré-seleciona o serviço quando se chega de uma página de serviço (?servico=fibra)
    useEffect(() => {
        const s = new URLSearchParams(window.location.search).get('servico');
        if (s && serviceOptions.some((o) => o.value === s)) setServico(s);
    }, []);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        if (fd.get('bot-field')) return;
        setSending(true);
        setError('');
        try {
            const data: Record<string, string> = {};
            fd.forEach((v, k) => (data[k] = String(v)));
            data.consentimento = fd.get('consentimento') ? 'sim' : 'não';
            await submitNetlifyForm('contacto', data);
            router.push('/obrigada/');
        } catch {
            setError('Não foi possível enviar. Tenta de novo daqui a pouco.');
            setSending(false);
        }
    }

    return (
        <form name="contacto" onSubmit={onSubmit} className="card space-y-5">
            <p className="hidden">
                <label>
                    Não preencher: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="f-nome" className="label">
                        Nome
                    </label>
                    <input id="f-nome" name="nome" required autoComplete="name" className="field" />
                </div>
                <div>
                    <label htmlFor="f-email" className="label">
                        Email
                    </label>
                    <input id="f-email" name="email" type="email" required autoComplete="email" className="field" />
                </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="f-marca" className="label">
                        Marca
                    </label>
                    <input id="f-marca" name="marca" className="field" placeholder="Nome da marca" />
                </div>
                <div>
                    <label htmlFor="f-link" className="label">
                        Site ou Instagram
                    </label>
                    <input id="f-link" name="link" className="field" placeholder="@marca ou www…" />
                </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="f-fase" className="label">
                        Fase da marca
                    </label>
                    <select id="f-fase" name="fase" className="field" defaultValue="">
                        <option value="" disabled>
                            Escolhe
                        </option>
                        <option>Ainda não lancei</option>
                        <option>Já vendo, mas sobra pouco</option>
                        <option>Vendo bem, quero afinar e crescer</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="f-servico" className="label">
                        Interesse
                    </label>
                    <select id="f-servico" name="servico" className="field" value={servico} onChange={(e) => setServico(e.target.value)}>
                        {serviceOptions.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <label htmlFor="f-msg" className="label">
                    O que está a travar a tua marca?
                </label>
                <textarea id="f-msg" name="mensagem" rows={5} required className="field" placeholder="Em poucas linhas. Sem filtros." />
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
            <button type="submit" disabled={sending} className="btn-primary w-full disabled:opacity-60 sm:w-auto">
                {sending ? 'A enviar…' : 'Enviar mensagem'}
            </button>
        </form>
    );
}
