export interface Project {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  description: string[];
}

export const projects: Project[] = [
  {
    id: "0",
    title: "Uma presença digital",
    imageSrc: "/landing_page_example.webp",
    imageAlt: "Exemplo de Landing Page",
    description: [
      "Uma primeira impressão com personalidade",
      "Clareza em qualquer tela",
      "Um caminho simples para quem chega",
    ],
  },
  {
    id: "1",
    title: "Uma visão do negócio",
    imageSrc: "/dashboard_example.jpeg",
    imageAlt: "Exemplo de Dashboard",
    description: [
      "Informação que encontra seu lugar",
      "Leitura rápida do que importa",
      "Decisões com menos ruído",
    ],
  },
  {
    id: "2",
    title: "Algo próprio",
    imageSrc: "/other_projects_example.webp",
    imageAlt: "Exemplo de uma solução digital personalizada",
    description: [
      "Uma ideia desenhada ao seu redor",
      "Tecnologia que acompanha o momento",
    ],
  },
];
