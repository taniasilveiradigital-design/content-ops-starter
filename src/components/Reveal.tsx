'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Mostra as secções com classe .reveal à medida que entram no ecrã.
export default function Reveal() {
    const pathname = usePathname();

    useEffect(() => {
        const els = Array.from(document.querySelectorAll('.reveal:not(.is-visible)'));
        if (!('IntersectionObserver' in window)) {
            els.forEach((el) => el.classList.add('is-visible'));
            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('is-visible');
                        io.unobserve(e.target);
                    }
                });
            },
            { rootMargin: '0px 0px -8% 0px' }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [pathname]);

    return null;
}
