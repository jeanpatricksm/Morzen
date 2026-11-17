# Design

<!-- impeccable:design-schema 1 -->

Referência completa e regras do dono do projeto: `AGENTS.md`. Mocks aprovados: `mocks/mock-03-colagem.html` e `mocks/mock-03-form.html`.

## Visual World

"Colagem editorial": tipografia condensada gigante (MORZEN), blocos isométricos que representam os building blocks da web (DB, API, AUTH, UI, DATA + bloco MZ encaixando), gradientes roxos granulados, serifa fina para títulos editoriais e grids com linhas finas. Moderno, preciso e com personalidade, sem cara de template.

## Color

Paleta fixa da marca (tokens em `src/styles/mz.css`): papel `#f7f7f4`, lilás-acinzentado `#ebe9f4`, tinta `#17151b`, roxo Morzen `#6445d8`, roxo profundo `#201835`, lilás `#b9a8ff` / `#c8b9ff`. Nada fora disso. Roxo aparece em acentos, gradientes e na seção de projetos; fotos de pessoas nunca recebem tinta roxa.

## Typography

Anton só no "MORZEN" do hero. Archivo para texto, UI e títulos pesados em caixa alta (peso 800). Italiana (serifa fina) para títulos editoriais da home e serviços. No formulário, só Archivo: legibilidade primeiro.

## Layout

Navbar integrada ao hero que se recolhe numa pílula branca ao rolar. Hero com pilha isométrica apoiada sobre o nome (nunca tampando). Manifesto em bloco lilás com pilares orbitando o gradiente. Cards de capacidade empilhados no scroll sobre fundo roxo. Fundadores em grade editorial com recortes orgânicos.

## Components

Botões pretos em pill com chevron (nunca flechas). Pills com borda de 1.5px na cor tinta. Ícones lucide em círculos. Cards de escolha com moldura de navegador para deixar claro o que a imagem é.

## Motion

Entrada suave do subtítulo e CTAs, blocos flutuando devagar, parallax leve com o mouse, transição da navbar, órbita lenta. Tudo pausável/respeitando `prefers-reduced-motion`; nada que esconda conteúdo importante se o JS falhar.

## Boundaries

Não inventar clientes, depoimentos ou métricas. Não copiar marcas de terceiros. Copy segue a do site original (SEO).
