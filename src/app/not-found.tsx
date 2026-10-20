import Link from 'next/link';

export default function NotFound() {
    return (
        <section className="weave flex min-h-[70vh] items-center">
            <div className="container-site py-20 text-center">
                <p className="font-serif text-7xl font-semibold text-terracota">404</p>
                <h1 className="mx-auto mt-4 max-w-2xl text-4xl">Esta página saiu da coleção.</h1>
                <p className="mx-auto mt-5 max-w-xl text-lg text-tinta/85">O endereço não existe ou mudou. Começa por aqui:</p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link href="/" className="btn-primary">
                        Página inicial
                    </Link>
                    <Link href="/diagnostico/" className="btn-secondary">
                        Fazer o diagnóstico
                    </Link>
                </div>
            </div>
        </section>
    );
}
