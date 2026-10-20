import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Política de privacidade',
    description: 'Como são tratados os dados pessoais enviados através do site taniasilveira.pt.',
    alternates: { canonical: '/politica-de-privacidade/' }
};

export default function PrivacidadePage() {
    return (
        <section className="container-site py-16 sm:py-24">
            <div className="prose-site mx-auto max-w-prose">
                <p className="eyebrow">Legal</p>
                <h1 className="mt-4 text-4xl">Política de privacidade</h1>
                <p className="mt-6">Esta política explica que dados são recolhidos neste site, para quê e quais são os teus direitos, nos termos do Regulamento Geral sobre a Proteção de Dados (RGPD).</p>

                <h2>Responsável pelo tratamento</h2>
                <p>Tânia Silveira, com atividade em Guimarães, Portugal. Para qualquer questão sobre os teus dados, usa a <Link href="/contacto/">página de contacto</Link>.</p>

                <h2>Que dados são recolhidos</h2>
                <ul>
                    <li>Formulário de contacto: nome, email, marca, site ou Instagram, fase da marca, serviço de interesse e mensagem.</li>
                    <li>Diagnóstico: as respostas ficam apenas no teu navegador. Só são enviadas se preencheres o formulário no fim, juntamente com nome, email e marca.</li>
                    <li>A calculadora de margem funciona apenas no teu navegador. Nenhum valor é enviado.</li>
                </ul>

                <h2>Para que são usados</h2>
                <p>Exclusivamente para responder ao teu pedido e, se fizer sentido, apresentar uma proposta de trabalho. Os dados não são vendidos nem cedidos a terceiros para marketing.</p>

                <h2>Base legal e conservação</h2>
                <p>O tratamento assenta no teu consentimento e em diligências pré-contratuais a teu pedido. Os dados são conservados durante o tempo necessário para responder ao pedido e, havendo relação comercial, pelo prazo legal aplicável.</p>

                <h2>Subcontratantes</h2>
                <p>O site está alojado na Netlify, que também recebe e guarda as mensagens dos formulários. A Netlify atua como subcontratante, com garantias contratuais de proteção de dados.</p>

                <h2>Cookies</h2>
                <p>Este site não usa cookies de publicidade nem ferramentas de análise que identifiquem visitantes.</p>

                <h2>Os teus direitos</h2>
                <p>Podes pedir acesso, retificação, apagamento, limitação ou portabilidade dos teus dados, e retirar o consentimento a qualquer momento. Tens ainda o direito de apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD).</p>

                <p className="text-sm text-tinta/60">Última atualização: outubro de 2026.</p>
            </div>
        </section>
    );
}
