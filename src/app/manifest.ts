import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Tânia Silveira — Estratégia para marcas de moda',
        short_name: 'Tânia Silveira',
        start_url: '/',
        display: 'standalone',
        background_color: '#f6f1ec',
        theme_color: '#5c3b2e',
        lang: 'pt-PT',
        icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }]
    };
}
