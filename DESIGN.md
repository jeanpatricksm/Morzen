---
name: Morzen
description: Minimalismo atmosférico em céu roxo luminoso e papel claro — inspirado na clareza do Codex, mantendo a identidade roxa da Morzen.
colors:
  primary: "#6445d8"
  primary-deep: "#201835"
  lilac: "#b9a8ff"
  lilac-soft: "#c8b9ff"
  paper: "#f7f7f4"
  paper-tint: "#ebe9f4"
  surface: "#ffffff"
  ink: "#17151b"
  muted: "#5a5468"
  hairline: "rgba(23, 21, 27, 0.10)"
  danger: "#b4232a"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.6vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.85rem, 3.4vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.028em"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.3
rounded:
  sm: "10px"
  md: "16px"
  lg: "22px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
  button-light:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "13px 26px"
---

# Design System: Morzen

## Overview

**Creative North Star: "Clareza Atmosférica Morzen"**

Inspirado no minimalismo luminoso e sereno da página do Codex, o site da Morzen coloca o produto real e a clareza da mensagem no centro absoluto — sem excesso decorativo, sem colagens de esculturas e sem templates dark genéricos. O hero abre em um céu atmosférico full-bleed nas cores roxas e lilás da Morzen com o emblema central da marca, tipografia limpa centralizada, botão branco em pílula e uma janela real de projetos emergindo da base do horizonte.

Abaixo do hero, a página respira em papel claro (`#f7f7f4`) com muito espaço em branco, grade limpa de caminhos/serviços, linhas alternadas de demonstração com previews reais flutuando sobre fundos atmosféricos em degradê roxo, faixa noturna em roxo profundo (`#201835`) para o manifesto `"Não escondemos o processo"` e retratos naturais dos fundadores.

**Key Characteristics:**
- Paleta proprietária fechada da Morzen (`#6445d8`, `#201835`, `#b9a8ff`, `#c8b9ff`, `#f7f7f4`, `#ebe9f4`, `#17151b`) — sem azul cobalto ou cores externas.
- Tipografia geométrica limpa (`Archivo`, pesos 400, 500, 600 e 800) com tracking negativo suave (`-0.03em`) nos títulos, trazendo a precisão moderna de produto de engenharia em todas as rotas.
- Hero full-bleed em céu lilás/roxo luminoso com emblema central branco, CTA em pílula branca e janela de preview interativa emergindo da borda inferior.
- Seção de capacidades em linhas alternadas (texto de um lado, janela real de navegador ou iPhone sobre degradê roxo atmosférico do outro).
- Retratos dos fundadores (Jean e Diego) sempre em cor natural, sem filtro ou tinta roxa.

## Colors

Paleta de quatro papéis estritamente presos à identidade da marca Morzen, com contraste mínimo WCAG AA (≥ 4.5:1) em todo texto legível.

### Primary
- **Roxo Morzen** (`primary`): acento principal da marca. Sustenta a atmosfera dos céus luminosos, fundos de demonstração de produto, ícones e estado hover de ações primárias.
- **Roxo Profundo** (`primary-deep`): base da faixa de manifesto escuro, profundidade inferior do céu do hero e sombras suaves com matiz roxo.

### Secondary
- **Lilás Luminoso** (`lilac`) e **Lilás Névoa** (`lilac-soft`): névoa atmosférica do céu e detalhes sutis sobre superfícies escuras.

### Neutral
- **Papel Morzen** (`paper`): fundo principal das seções claras.
- **Papel Lilás** (`paper-tint`): superfícies secundárias (lateral do formulário `/new_project`, faixa de método em `/servicos/:slug`).
- **Branco Limpo** (`surface`): cards de serviço, botões primários sobre fundos escuros/atmosféricos, emblema central e área de preenchimento do formulário.
- **Tinta** (`ink`): tipografia principal, botões sólidos sobre papel claro e moldura do iPhone.
- **Cinza Ameixa** (`muted`): textos secundários e legendas (contraste ≥ 6.8:1 sobre papel).
- **Linha Fina** (`hairline`): bordas sutis de `1px` em cards, divisores e rodapé.

### Named Rules
**The Pure Atmosphere Rule.** Fundos visuais usam apenas luz atmosférica, névoa suave e degradês roxos/lilás da Morzen — sem esculturas, colagens de papel rasgado, estrelas soltas ou texturas de ruído pesadas.

**The Natural Portraits Rule.** Fotos dos fundadores (Jean Patrick e Diego Rezende) nunca recebem filtro ou tinta roxa.

## Typography

**Display & Body Font:** `Archivo` (fallback `system-ui, sans-serif`)

**Character:** Uma única família geométrica limpa (pesos 400, 500, 600 e 800) com escala generosa e tracking negativo sutil nos títulos, entregando a mesma nitidez moderna de interfaces de engenharia e produtos digitais de ponta.

### Hierarchy
- **Display**: `Archivo` 500, `clamp(2.25rem, 4.6vw, 3.75rem)`, `line-height: 1.08`, tracking `-0.03em`. Título central do Hero e aberturas de serviço.
- **Headline**: `Archivo` 500, `clamp(1.85rem, 3.4vw, 2.75rem)`, `line-height: 1.12`, tracking `-0.028em`. Títulos de seção na Home e fechamento.
- **Title**: `Archivo` 600, `1.25rem`–`1.625rem`, `line-height: 1.25`, tracking `-0.02em`. Títulos das linhas alternadas de projetos, cards de serviço e etapas do formulário.
- **Body**: `Archivo` 400, `0.9375rem`–`1.0625rem`, `line-height: 1.6`, medida máxima de `58ch`–`66ch`.
- **Label**: `Archivo` 500, `0.8125rem`, sem caixa alta excessiva.

## Layout

Container principal limitado a `1180px` (`padding: 0 32px` no desktop, `0 18px` no mobile). A Home segue o ritmo Codex:
1. Hero full-bleed em céu atmosférico roxo/lilás com navbar transparente no topo, emblema central branco, título centralizado, botão branco em pílula e janela interativa de projetos emergindo da base.
2. Grade limpa de 4 caminhos/serviços (`#servicos`) sobre papel claro.
3. Três linhas alternadas de demonstração (`#projetos`): texto de um lado e quadro amplo com degradê atmosférico roxo emoldurando exemplos reais (*Ana Júlia Advogada*, *EOS Fit* em iPhone e *Dashboard*) do outro.
4. Faixa escura em `primary-deep` com o manifesto `"Não escondemos o processo"` e os 4 pilares.
5. Seção limpa dos fundadores (`#fundadores`) com retratos naturais.
6. Faixa final atmosférica `"Acompanhe nossa construção."` espelhando o céu do hero com CTA branco e links das redes sociais.

Âncoras (`#projetos`, `#servicos`, `#fundadores`) usam `scroll-margin-top: 88px`.

## Elevation & Depth

Superfícies claras repousam planas com bordas suaves de `1px` (`hairline`). Sombras suaves com matiz roxo (`rgba(32, 24, 53, ...)`) ficam reservadas à janela de showcase do hero, aos mockups flutuando sobre os degradês roxos, ao emblema central e à navbar fixa ao rolar.

## Shapes

- **Quadros de showcase e banners atmosféricos:** `22px` no desktop (`16px` no mobile).
- **Cards, janelas de navegador e emblema da marca:** `16px`.
- **Botões e chips de navegação:** pílula (`999px`).
- **Ícones de direção:** sempre chevrons (`ChevronRight`, `ChevronLeft`) do `lucide-preact`; nunca flechas.

## Components

### Buttons
- **Light Pill (sobre céu/escuro):** fundo branco (`#ffffff`), texto `ink`, `999px`, `13px 26px`, hover suave para `paper-tint`.
- **Primary Dark Pill (sobre papel claro):** fundo `ink`, texto branco, `999px`, `12px 24px`, hover para `primary` (`#6445d8`).
- **Ghost / Outline:** borda `1px` sutil, hover suave sem animar layout.

### Navigation
Transparente e minimalista no topo do Hero (marca à esquerda, 5 links limpos no centro, pílula branca + botão preto à direita). Ao rolar (ou em páginas internas), ganha fundo papel translúcido (`rgba(247, 247, 244, 0.90)`) com `backdrop-filter: blur(18px)` e borda inferior fina. Menu mobile em `<dialog>` nativo.

### Hero Interactive Preview Window
Janela estilo estúdio (`#17151b`, borda translúcida sutil) ancorada na base do hero com abas limpas para alternar os exemplos reais (*Ana Júlia Advogada*, *EOS Fit iOS*, *Dashboard*) sem sair da primeira tela.

## Do's and Don'ts

### Do:
- **Do** manter toda a copy SEO essencial em português do Brasil, com o `<h1>` contendo a oferta real.
- **Do** mostrar exemplos reais como capacidade (*Ana Júlia Advogada* em janela web, *EOS Fit* dentro de um iPhone).
- **Do** animar apenas `transform`, `opacity` e cores, respeitando `prefers-reduced-motion`.

### Don't:
- **Don't** inventar clientes, logos de terceiros, depoimentos ou números.
- **Don't** usar esculturas clássicas, colagens de papel rasgado, estrelas soltas ou filtros roxos nas fotos dos fundadores.
- **Don't** usar flechas (`→ ← ↗`); sempre chevrons.
