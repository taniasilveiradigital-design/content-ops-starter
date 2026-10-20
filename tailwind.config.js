/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                cafe: '#5c3b2e',
                tinta: '#2e1f18',
                terracota: '#b26d47',
                barro: '#ba8166',
                bege: '#bfa795',
                linho: '#f6f1ec',
                cru: '#ece3da'
            },
            fontFamily: {
                serif: ['var(--font-serif)', 'Georgia', 'serif'],
                sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
                script: ['var(--font-script)', 'cursive']
            },
            maxWidth: {
                prose: '42rem'
            }
        }
    },
    plugins: []
};
