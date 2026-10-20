import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

const description = 'Marca uma conversa com a Tânia Silveira sobre a tua marca de moda. Método FIBRA ou Consultoria Tafetá 360: vemos juntas qual faz sentido.';

export const metadata: Metadata = {
    title: 'Contacto — Marcar conversa',
    description,
    alternates: { canonical: '/contacto/' },
    openGraph: { url: '/contacto/', title: 'Contacto — Tânia Silveira', description }
};

const steps = [
    { title: 'Leio a tua mensagem', text: 'Com atenção ao que escreveste sobre a marca.' },
    { title: 'Respondo por email', text: 'Com uma primeira leitura e a proposta de uma conversa.' },
    { title: 'Conversa inicial', text: 'Percebemos se faz sentido trabalharmos juntas, e em que formato.' }
];

export default function ContactoPage() {
    return (
        <>
            <JsonLd data={breadcrumbSchema([{ name: 'Contacto', path: '/contacto/' }])} />
            <section className="weave border-b border-cru">
                <div className="container-site grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_1.4fr]">
                    <div>
                        <p className="eyebrow">Contacto</p>
                        <h1 className="mt-4 text-4xl sm:text-5xl">Fala-me da tua marca.</h1>
                        <p className="mt-5 text-lg text-tinta/85">Sem formulários intermináveis. Diz-me onde estás e o que está a travar. O resto vemos na conversa.</p>
                        <ol className="mt-10 space-y-6">
                            {steps.map((s, i) => (
                                <li key={s.title} className="flex gap-4">
                                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-cafe font-serif text-lg font-semibold text-white">
                                        {i + 1}
                                    </span>
                                    <div>
                                        <p className="font-semibold text-cafe">{s.title}</p>
                                        <p className="text-tinta/75">{s.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <ContactForm />
                </div>
            </section>
        </>
    );
}
