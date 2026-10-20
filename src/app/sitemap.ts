import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

const routes: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/metodo-fibra/', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/consultoria-tafeta-360/', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/diagnostico/', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/calculadora-margem/', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/sobre/', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contacto/', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/politica-de-privacidade/', priority: 0.2, changeFrequency: 'yearly' }
];

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();
    return routes.map((r) => ({ url: `${site.url}${r.path}`, lastModified, changeFrequency: r.changeFrequency, priority: r.priority }));
}
