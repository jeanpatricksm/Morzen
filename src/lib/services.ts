export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  introduction: string;
  outcomes: string[];
  approach: string[];
}

export const services: Service[] = [
  {
    slug: "sites-e-landing-pages",
    title: "Sites e landing pages sob medida",
    shortTitle: "Presença digital",
    description:
      "Sites e landing pages claros, responsivos e alinhados à identidade e aos objetivos do seu negócio.",
    introduction:
      "Uma presença digital precisa explicar o que torna o negócio relevante e conduzir cada pessoa ao próximo passo sem ruído. A Morzen transforma contexto, conteúdo e identidade em uma experiência web feita para representar a realidade da empresa.",
    outcomes: [
      "Uma mensagem mais clara para quem chega",
      "Experiência responsiva em diferentes telas",
      "Estrutura preparada para evoluir com o negócio",
      "Caminhos objetivos para contato ou conversão",
    ],
    approach: [
      "Entendemos o público, o momento e o objetivo principal da página.",
      "Organizamos conteúdo e hierarquia antes de escolher efeitos ou tecnologia.",
      "Construímos e refinamos a interface com atenção a acessibilidade, desempenho e manutenção.",
    ],
  },
  {
    slug: "dashboards-e-interfaces",
    title: "Dashboards e interfaces para operações",
    shortTitle: "Operação mais clara",
    description:
      "Dashboards e interfaces que organizam informações importantes e apoiam decisões mais claras.",
    introduction:
      "Quando dados e tarefas estão espalhados, até decisões simples consomem tempo. A Morzen desenha interfaces que aproximam a informação certa de quem precisa agir, respeitando a rotina e a linguagem de cada operação.",
    outcomes: [
      "Informação organizada por prioridade",
      "Leitura rápida do que exige atenção",
      "Fluxos mais diretos para tarefas recorrentes",
      "Uma base consistente para novas funcionalidades",
    ],
    approach: [
      "Mapeamos usuários, decisões e fontes de informação.",
      "Definimos hierarquia, estados e fluxos antes da camada visual.",
      "Validamos a interface no contexto real e ajustamos o que ainda gera dúvida.",
    ],
  },
  {
    slug: "sistemas-internos",
    title: "Sistemas internos sob medida",
    shortTitle: "Processos que fluem",
    description:
      "Sistemas internos que reduzem improvisos e tornam processos importantes mais simples de acompanhar.",
    introduction:
      "Planilhas, mensagens e ferramentas desconectadas podem funcionar por um tempo, mas tornam a operação difícil de enxergar. A Morzen cria sistemas a partir do processo existente, sem forçar o negócio a caber em uma solução genérica.",
    outcomes: [
      "Menos etapas manuais e informação duplicada",
      "Responsabilidades e estados mais visíveis",
      "Rotinas importantes reunidas em um só fluxo",
      "Tecnologia adaptada às particularidades da equipe",
    ],
    approach: [
      "Entendemos como o trabalho acontece hoje e onde estão os principais atritos.",
      "Priorizamos o menor fluxo capaz de gerar valor real.",
      "Evoluímos a solução com o uso, preservando clareza e continuidade.",
    ],
  },
  {
    slug: "aplicativos-e-produtos-digitais",
    title: "Aplicativos e produtos digitais",
    shortTitle: "Produtos para crescer",
    description:
      "Aplicativos e produtos digitais pensados para validar uma ideia, evoluir com o uso e acompanhar o negócio.",
    introduction:
      "Um produto digital não começa pela lista de funcionalidades. Ele começa por uma necessidade, por quem sente essa necessidade e pelo que precisa ser aprendido. A Morzen ajuda a transformar esse contexto em uma primeira versão útil e em um caminho de evolução.",
    outcomes: [
      "Escopo inicial orientado pelo problema",
      "Experiência coerente do primeiro acesso ao uso recorrente",
      "Decisões técnicas compatíveis com o momento do produto",
      "Base preparada para aprender e evoluir",
    ],
    approach: [
      "Delimitamos o problema, o público e as hipóteses que precisam ser validadas.",
      "Organizamos a primeira versão em torno do valor essencial.",
      "Construímos, observamos o uso e definimos os próximos passos com evidência.",
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
