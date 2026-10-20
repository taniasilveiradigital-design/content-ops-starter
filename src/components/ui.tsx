import Link from 'next/link';

export function Faq({ items }: { items: { q: string; a: string }[] }) {
    return (
        <div className="divide-y divide-cru border-y border-cru">
            {items.map((item) => (
                <details key={item.q} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-serif text-xl font-semibold text-cafe sm:text-2xl [&::-webkit-details-marker]:hidden">
                        {item.q}
                        <span className="mt-1 text-2xl leading-none text-terracota transition group-open:rotate-45" aria-hidden="true">
                            +
                        </span>
                    </summary>
                    <p className="mt-3 max-w-prose text-tinta/85">{item.a}</p>
                </details>
            ))}
        </div>
    );
}

export function CtaBand({
    title = 'Antes de mudar tudo, percebe o que está errado.',
    text = 'Faz o diagnóstico em 3 minutos. Ou marca uma conversa e vemos juntas onde está o gargalo.'
}: {
    title?: string;
    text?: string;
}) {
    return (
        <section className="bg-cafe text-white">
            <div className="container-site reveal py-16 text-center sm:py-20">
                <h2 className="mx-auto max-w-3xl !text-white">{title}</h2>
                <p className="mx-auto mt-5 max-w-xl text-linho/90">{text}</p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link href="/diagnostico/" className="btn-light">
                        Fazer o diagnóstico
                    </Link>
                    <Link href="/contacto/" className="btn border border-white/60 text-white hover:bg-white hover:text-cafe">
                        Marcar conversa
                    </Link>
                </div>
            </div>
        </section>
    );
}

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children?: React.ReactNode }) {
    return (
        <section className="weave border-b border-cru">
            <div className="container-site py-16 sm:py-24">
                <p className="eyebrow">{eyebrow}</p>
                <h1 className="mt-4 max-w-4xl">{title}</h1>
                <p className="mt-6 max-w-2xl text-lg text-tinta/85">{intro}</p>
                {children}
            </div>
        </section>
    );
}

export function Check({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex gap-3">
            <svg className="mt-1.5 h-4 w-4 flex-none text-terracota" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 8.5l3 3 7-7" />
            </svg>
            <span>{children}</span>
        </li>
    );
}
