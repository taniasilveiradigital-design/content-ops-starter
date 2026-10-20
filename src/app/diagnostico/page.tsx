import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import Quiz from '@/components/Quiz';
import { breadcrumbSchema } from '@/lib/schema';

const description =
    'Diagnóstico gratuito para marcas de moda: 9 perguntas para descobrires se o gargalo está no produto, na margem, no posicionamento ou na decisão. Resultado imediato.';

export const metadata: Metadata = {
    title: 'Diagnóstico gratuito para marcas de moda — Onde está a travar a tua marca?',
    description,
    alternates: { canonical: '/diagnostico/' },
    openGraph: { url: '/diagnostico/', title: 'Diagnóstico gratuito para marcas de moda', description }
};

export default function DiagnosticoPage() {
    return (
        <>
            <JsonLd data={breadcrumbSchema([{ name: 'Diagnóstico', path: '/diagnostico/' }])} />
            <section className="weave min-h-[80vh] border-b border-cru">
                <div className="container-site grid gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_1.4fr]">
                    <div>
                        <p className="eyebrow">Diagnóstico gratuito · 3 minutos</p>
                        <h1 className="mt-4 text-4xl sm:text-5xl">Onde está a travar a tua marca?</h1>
                        <p className="mt-5 text-lg text-tinta/85">
                            Antes de mudar tudo, percebe o que está errado. Responde com verdade: o resultado só vale o que as respostas valerem.
                        </p>
                        <ul className="mt-6 space-y-2 text-tinta/80">
                            <li>· Produto, margem, posicionamento ou decisão</li>
                            <li>· Os teus primeiros 3 passos</li>
                            <li>· O serviço indicado para a tua fase</li>
                        </ul>
                    </div>
                    <div id="quiz" className="scroll-mt-28">
                        <Quiz />
                    </div>
                </div>
            </section>
        </>
    );
}
