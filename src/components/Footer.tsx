import Link from 'next/link';
import { nav, site } from '@/lib/site';

export default function Footer() {
    return (
        <footer className="bg-tinta text-linho">
            <div className="container-site grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
                <div>
                    <p className="font-serif text-3xl font-semibold text-white">Tânia Silveira</p>
                    <p className="mt-3 max-w-sm text-sm text-bege">
                        Estratégia de produto e estrutura para marcas de moda. A partir de {site.city}, com raiz no chão de fábrica.
                    </p>
                    <p className="mt-5 font-script text-3xl text-barro" aria-hidden="true">
                        com fibra
                    </p>
                </div>
                <nav aria-label="Rodapé">
                    <p className="eyebrow !text-barro">Páginas</p>
                    <ul className="mt-4 space-y-2 text-sm">
                        {nav.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href} className="hover:text-white">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link href="/contacto/" className="hover:text-white">
                                Contacto
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div>
                    <p className="eyebrow !text-barro">Começa aqui</p>
                    <ul className="mt-4 space-y-2 text-sm">
                        <li>
                            <Link href="/diagnostico/" className="hover:text-white">
                                Diagnóstico gratuito da marca
                            </Link>
                        </li>
                        <li>
                            <Link href="/calculadora-margem/" className="hover:text-white">
                                Calculadora de margem
                            </Link>
                        </li>
                        {site.instagram && (
                            <li>
                                <a href={site.instagram} rel="me noopener" target="_blank" className="hover:text-white">
                                    Instagram
                                </a>
                            </li>
                        )}
                        {site.linkedin && (
                            <li>
                                <a href={site.linkedin} rel="me noopener" target="_blank" className="hover:text-white">
                                    LinkedIn
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="border-t border-white/10">
                <div className="container-site flex flex-col gap-2 py-6 text-xs text-bege sm:flex-row sm:justify-between">
                    <p>© {new Date().getFullYear()} Tânia Silveira. Todos os direitos reservados.</p>
                    <Link href="/politica-de-privacidade/" className="hover:text-white">
                        Política de privacidade
                    </Link>
                </div>
            </div>
        </footer>
    );
}
