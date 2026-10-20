import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Dr_Sugiyama, Raleway } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import { site } from '@/lib/site';
import { baseGraph } from '@/lib/schema';
import './globals.css';

const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-serif', display: 'swap' });
const sans = Raleway({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-sans', display: 'swap' });
const script = Dr_Sugiyama({ subsets: ['latin'], weight: '400', variable: '--font-script', display: 'swap' });

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: { default: site.title, template: '%s | Tânia Silveira' },
    description: site.description,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    alternates: { canonical: '/', languages: { 'pt-PT': '/' } },
    openGraph: {
        type: 'website',
        locale: 'pt_PT',
        url: '/',
        siteName: site.name,
        title: site.title,
        description: site.description,
        images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Tânia Silveira — Estratégia para marcas de moda' }]
    },
    twitter: { card: 'summary_large_image', title: site.title, description: site.description, images: ['/og.png'] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    formatDetection: { telephone: false }
};

export const viewport: Viewport = {
    themeColor: '#5c3b2e',
    width: 'device-width',
    initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-PT" className={`${serif.variable} ${sans.variable} ${script.variable}`}>
            <head>
                <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
                <JsonLd data={baseGraph} />
            </head>
            <body>
                <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-cafe focus:px-4 focus:py-2 focus:text-white">
                    Saltar para o conteúdo
                </a>
                <Header />
                <main id="conteudo">{children}</main>
                <Footer />
                <Reveal />
            </body>
        </html>
    );
}
