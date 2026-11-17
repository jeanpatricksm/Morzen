# AGENTS.md — Morzen

Guia para agentes que trabalham neste repositório. Leia antes de mexer no visual do site.

## Projeto

- Site institucional da Morzen (software sob medida, construído em público).
- **Vite + Preact** com prerender (`@preact/preset-vite` + `preact-iso`). Sem Next, React, Tailwind ou shadcn — mantenha o projeto enxuto.
- Ícones: `lucide-preact`; logos de marca (Instagram/LinkedIn/GitHub) em `src/components/brand-icons.tsx`.
- Fontes self-hosted via `@fontsource` (Anton, Archivo, Italiana).
- Formulário envia via `fetch` para o Formspree (`mbgjrgwq`).
- `npm run dev` / `npm run build` (gera `dist/`: HTML pré-renderizado por rota + sitemap, robots, 404.html e imagens OG via `scripts/postbuild.mjs`).
- Preact 11: estilos inline numéricos NÃO ganham "px" automático e atributos SVG vão em kebab-case (`text-anchor`, `font-size`).
- Rotas: `/` (home), `/new_project` (formulário em 5 etapas), `/servicos/:slug`, 404.
- Mocks de referência do redesign ficam em `mocks/` (o aprovado é `mocks/mock-03-colagem.html` + `mocks/mock-03-form.html`).

## Direção visual aprovada (redesign 2026)

Estilo "colagem editorial": mistura de tipografia condensada gigante, blocos isométricos, gradientes granulados, serifa fina e grid editorial.

### Paleta — NÃO mudar

As cores são a única coisa mantida do site antigo. Use só estas (tokens em `src/styles/mz.css`):

| Token | Valor | Uso |
|---|---|---|
| `--mz-paper` | `#f7f7f4` | fundo principal |
| `--mz-paper-2` | `#ebe9f4` | fundos lilás-acinzentados |
| `--mz-ink` | `#17151b` | texto, botões pretos |
| `--mz-violet` | `#6445d8` | acento principal da marca |
| `--mz-violet-deep` | `#201835` | roxo profundo |
| `--mz-lilac` / `--mz-lilac-2` | `#b9a8ff` / `#c8b9ff` | acentos suaves |

Não introduzir cores fora da paleta (nada de azul cobalto, rosa, laranja etc.).

### Tipografia

- **Anton** — só para o "MORZEN" gigante do hero.
- **Archivo** — fonte de texto e de títulos pesados (manifesto em caixa alta, peso 800).
- **Italiana** — serifa fina para títulos editoriais da home.
- **No formulário (`/new_project`) use fonte normal (Archivo)** em títulos, opções e campos. A serifa fina fica difícil de ler ali; no máximo uma palavra de destaque no painel lateral.

## Ressalvas do dono (seguir sempre)

1. **Ícones: sempre chevrons, nunca flechas.** Use `ChevronRight`/`ChevronLeft`/`ChevronDown` do lucide. Nada de `→ ← ↓ ↗` nem `ArrowRight`/`ArrowUpRight`/`ArrowLeft`.
2. **Use ícones** (lucide-react) para dar apoio visual a botões, serviços, redes sociais etc.
3. **Nada pode tampar o nome "MORZEN" no hero.** Os blocos isométricos ficam empilhados *em cima* da palavra, apoiados no topo das letras; cubos soltos e esferas ficam fora das letras.
4. **Blocos isométricos precisam ter significado** — representam "os building blocks da web" (DB, API, AUTH, UI, DATA + bloco MZ encaixando no topo). Nada de cubo mágico/caixote aleatório.
5. **Sem estrela decorativa (sparkle) solta** ao lado de elementos.
6. **Fotos dos fundadores (Jean e Diego) sem filtro/tinta roxa.** Tinta roxa só em imagens decorativas, nunca nas fotos de pessoas.
7. **Projetos: o foco é a capacidade, não o cliente.** A seção responde "O que fazemos?": *conseguimos fazer landing pages*, *conseguimos fazer apps iOS*. O projeto real aparece só como "Exemplo · …".
   - Ana Júlia Advogada (https://anajuliavilelaadvogada.com/) → **landing page**.
   - EOS Fit (https://eosfit.com.br/) → **app iOS** (mostrar dentro de um iPhone).
8. **Seção de projetos = cards empilhados que vão passando no scroll** (sticky stack: o card de trás encolhe/escurece quando o próximo chega), fundo roxo da marca.
9. **Cards de escolha no formulário precisam deixar claro o que é a imagem** — usar moldura de janela de navegador (barra + URL) e uma linha explicando o tipo ("Site / landing page · ex.: …"). Nada de arcos que cortam a imagem.
10. **Navbar numa linha só**: logo + selo, menu em pill com indicador deslizante, status "Construindo ao vivo" e botão preto. Fica fixa com blur ao rolar.
11. Não inventar clientes, depoimentos, números ou métricas. Só usar o que existe (Ana Júlia, EOS Fit, fundadores).
12. Sempre conferir o resultado no navegador (screenshot) antes de dizer que está pronto — inclusive se nada sobrepõe texto.
13. Mocks/protótipos em HTML vão em `mocks/`.
14. Copy em português do Brasil.
15. **Copy: manter a essência e os textos do site original** (https://morzen.com.br/), que já eram otimizados para SEO. O redesign muda o visual, não a mensagem. Frases-chave a preservar: "Sistemas, sites e aplicativos para empresas, construídos com você", "Atendemos todo o Brasil e, presencialmente, o Vale do Paraíba", "Não escondemos o processo", "Software que respeita o problema antes de escolher a tecnologia", "A identidade nasce de quem está construindo", "Acompanhe nossa construção", CTA "Conversar sobre um projeto". O `<h1>` precisa conter a descrição (não só "Morzen"); metadata/JSON-LD em `lib/seo.ts` não mudam sem motivo.

## Performance e acessibilidade (manter)

- Nada de bibliotecas pesadas: antes de adicionar uma dependência, veja se dá para resolver com CSS/HTML nativo (ex.: menu mobile é `<dialog>`).
- Animações ligadas a mouse/scroll atualizam variáveis CSS ou `style` direto, limitadas por `requestAnimationFrame` — nunca `setState` a cada evento.
- O `<h1>` do hero não pode começar invisível (prejudica LCP); animação de entrada só em elementos secundários.
- Conteúdo que troca sozinho (órbita do manifesto) para quando a pessoa interage e respeita `prefers-reduced-motion`.
- Imagens: webp, com `width`/`height` e `loading="lazy"` abaixo da dobra; fotos redimensionadas para o tamanho exibido (~420px de largura para retratos).
- Sem sourcemaps no build de produção.
- Ao mudar conteúdo, atualize `LAST_MODIFIED` em `scripts/postbuild.mjs` (sitemap).

## Estrutura do código

- `index.html` + `src/main.tsx` — entrada, rotas (`preact-iso`) e função `prerender`.
- `src/lib/head.ts` — title/description/canonical/OG/Twitter/robots por rota (SEO). `src/lib/seo.ts` e `src/lib/services.ts` — dados.
- `src/styles/mz.css` — todos os estilos (classes `mz-*`).
- `src/components/` — `navbar.tsx` (menu mobile em `<dialog>` nativo), `iso.tsx` (cubos isométricos), `brand-icons.tsx`.
- `src/pages/home/*` — home (hero, manifesto em órbita, cards de projetos).
- `src/pages/service.tsx` — páginas `/servicos/:slug` (JSON-LD Service/FAQ/Breadcrumb).
- `src/pages/new-project/*` — formulário; pontuação em `qualify.ts`, opções em `projects.ts`.
- `src/pages/not-found.tsx` — 404.
- Novas rotas que não são linkadas pela home precisam entrar em `additionalPrerenderRoutes` no `vite.config.ts` e no `getHead`.
