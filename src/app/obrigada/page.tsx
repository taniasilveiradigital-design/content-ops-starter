import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Mensagem recebida',
    robots: { index: false, follow: true },
    alternates: { canonical: '/obrigada/' }
};

export default function ObrigadaPage() {
    return (
        <section className="weave flex min-h-[70vh] items-center">
            <div className="container-site py-20 text-center">
                <p className="font-script text-5xl text-terracota">Recebido</p>
                <h1 className="mx-auto mt-4 max-w-2xl text-4xl sm:text-5xl">A tua mensagem chegou.</h1>
                <p className="mx-auto mt-5 max-w-xl text-lg text-tinta/85">Vou ler com atenção e respondo-te por email. Entretanto, se ainda não calculaste a margem real da tua marca, é um bom ponto de partida.</p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link href="/calculadora-margem/" className="btn-primary">
                        Calcular a margem
                    </Link>
                    <Link href="/" className="btn-secondary">
                        Voltar ao início
                    </Link>
                </div>
            </div>
        </section>
    );
}
