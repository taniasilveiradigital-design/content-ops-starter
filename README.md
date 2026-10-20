# taniasilveira.pt

Site da Tânia Silveira — estratégia de produto e estrutura para marcas de moda.

## Páginas
- `/` — página inicial
- `/metodo-fibra/` e `/consultoria-tafeta-360/` — serviços
- `/diagnostico/` — diagnóstico interativo (9 perguntas, resultado imediato)
- `/calculadora-margem/` — calculadora de margem real por peça
- `/sobre/`, `/contacto/`, `/politica-de-privacidade/`

## Onde mudar dados
- `src/lib/site.ts` — Instagram, LinkedIn, marcas clientes, navegação
- `src/lib/quiz.ts` — perguntas e resultados do diagnóstico
- `src/lib/faq.ts` — perguntas frequentes da página inicial

## SEO
Metadados por página, Open Graph (`public/og.png`), dados estruturados (Person, ProfessionalService, Service, FAQPage, BreadcrumbList, WebApplication), `sitemap.xml`, `robots.txt`, `lang="pt-PT"` e site 100% estático.

## Publicação (Netlify)
`npm run build` gera a pasta `out/`. Os formulários usam Netlify Forms (declarados em `public/__forms.html`).

O template original ficou arquivado em `legacy-template/` e pode ser apagado.
