const items = ['Produto', 'Margem', 'Coleção', 'Produção', 'Mercado têxtil', 'Posicionamento', 'Inteligência artificial', 'Decisão'];

export default function Marquee() {
    const row = items.flatMap((t) => [t, '✦']);
    return (
        <div className="overflow-hidden border-y border-terracota/30 bg-terracota py-4 text-white" aria-hidden="true">
            <div className="marquee flex w-max gap-8 whitespace-nowrap font-serif text-2xl font-semibold sm:text-3xl">
                {[...row, ...row].map((t, i) => (
                    <span key={i} className={t === '✦' ? 'text-white/50' : ''}>
                        {t}
                    </span>
                ))}
            </div>
        </div>
    );
}
