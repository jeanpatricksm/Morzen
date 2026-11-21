export interface Project {
  id: string;
  title: string;
  /** Linha que explica o que a imagem é (ver AGENTS.md, ressalva 9). */
  kind: string;
  url: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  description: string[];
}

export const projects: Project[] = [
  {
    id: "0",
    title: "Uma presença digital",
    kind: "Site / landing page · ex.: Ana Júlia Advogada",
    url: "anajuliavilelaadvogada.com",
    imageSrc: "/projects/landing-ana-julia.webp",
    imageAlt: "Exemplo de landing page feita pela Morzen",
    imageWidth: 1440,
    imageHeight: 900,
    description: ["Primeira impressão com personalidade", "Clareza em qualquer tela"],
  },
  {
    id: "1",
    title: "Uma visão do negócio",
    kind: "Dashboard / painel de indicadores",
    url: "painel.seunegocio.com",
    imageSrc: "/dashboard_example.webp",
    imageAlt: "Exemplo de dashboard",
    imageWidth: 1280,
    imageHeight: 720,
    description: ["Leitura rápida do que importa", "Decisões com menos ruído"],
  },
  {
    id: "2",
    title: "Algo próprio",
    kind: "Sistema, app iOS ou MVP · ex.: EOS Fit",
    url: "eosfit.com.br",
    imageSrc: "/projects/app-eos-fit-desktop.webp",
    imageAlt: "Exemplo de app iOS feito pela Morzen",
    imageWidth: 1440,
    imageHeight: 900,
    description: ["Uma ideia desenhada ao seu redor", "Tecnologia que acompanha o momento"],
  },
];

export const unknownProject: Project = {
  id: "unknown",
  title: "Ainda não sei",
  kind: "Sem problema",
  url: "",
  imageSrc: "",
  imageAlt: "",
  description: ["A gente descobre junto qual o melhor caminho"],
};
