'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav } from '@/lib/site';

export default function Header() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => setOpen(false), [pathname]);

    // Costura no topo: avança com o scroll
    useEffect(() => {
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [pathname]);

    return (
        <header className="sticky top-0 z-40 border-b border-cru/80 bg-white/90 backdrop-blur">
            <div className="container-site flex h-16 items-center justify-between gap-4 sm:h-20">
                <Link href="/" className="flex flex-col leading-none" aria-label="Tânia Silveira — página inicial">
                    <span className="font-serif text-2xl font-semibold text-cafe sm:text-[1.7rem]">Tânia Silveira</span>
                    <span className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-terracota">Estratégia para marcas de moda</span>
                </Link>

                <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
                    {nav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`text-sm font-medium transition hover:text-terracota ${pathname === item.href ? 'text-terracota' : 'text-cafe'}`}
                            aria-current={pathname === item.href ? 'page' : undefined}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link href="/contacto/" className="btn-primary !py-2.5">
                        Marcar conversa
                    </Link>
                </nav>

                <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cru text-cafe lg:hidden"
                    aria-expanded={open}
                    aria-controls="menu-movel"
                    aria-label={open ? 'Fechar menu' : 'Abrir menu'}
                    onClick={() => setOpen((v) => !v)}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                        {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
                    </svg>
                </button>
            </div>

            {open && (
                <nav id="menu-movel" aria-label="Menu" className="border-t border-cru bg-white lg:hidden">
                    <div className="container-site flex flex-col py-4">
                        {nav.map((item) => (
                            <Link key={item.href} href={item.href} className="border-b border-cru/70 py-3 font-medium text-cafe">
                                {item.label}
                            </Link>
                        ))}
                        <Link href="/contacto/" className="btn-primary mt-5">
                            Marcar conversa
                        </Link>
                    </div>
                </nav>
            )}

            <div className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden" aria-hidden="true">
                <div className="stitch origin-left transition-transform duration-150" style={{ transform: `scaleX(${progress})` }} />
            </div>
        </header>
    );
}
