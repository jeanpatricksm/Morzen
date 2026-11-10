export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  introduction: string;
  outcomes: string[];
  approach: string[];
  faq: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    slug: "sites-e-landing-pages",
    title: "Sites profissionais e landing pages",
    shortTitle: "Presença digital",
    description:
      "Criação de sites profissionais e landing pages claros, responsivos e alinhados à identidade e aos objetivos do seu negócio.",
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
    faq: [
      {
        question: "Quanto custa um site profissional?",
        answer:
          "Depende do escopo, das integrações e do nível de personalização. Depois de uma primeira conversa sobre o seu contexto, enviamos uma proposta com valor e prazo fechados, sem custo para conversar.",
      },
      {
        question: "Quanto tempo leva para o site ficar pronto?",
        answer:
          "Uma landing page costuma levar algumas semanas; sites com mais páginas e conteúdo levam mais. O prazo é definido na proposta e você acompanha cada etapa.",
      },
      {
        question: "Por que não usar Lovable, Wix ou outro criador de sites?",
        answer:
          "Essas ferramentas funcionam bem para começar. Um site feito sob medida compensa quando a identidade, o desempenho, o SEO e a evolução do site importam para o negócio.",
      },
      {
        question: "Vocês atendem fora do Vale do Paraíba?",
        answer:
          "Sim. Atendemos empresas de todo o Brasil de forma remota e, presencialmente, a região do Vale do Paraíba.",
      },
    ],
  },
  {
    slug: "dashboards-e-interfaces",
    title: "Dashboards e painéis de indicadores",
    shortTitle: "Operação mais clara",
    description:
      "Dashboards sob medida, uma alternativa ao Power BI, que organizam os indicadores da empresa e apoiam decisões mais claras.",
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
    faq: [
      {
        question: "Quanto custa um dashboard sob medida?",
        answer:
          "Depende do escopo, das integrações e do nível de personalização. Depois de uma primeira conversa sobre o seu contexto, enviamos uma proposta com valor e prazo fechados, sem custo para conversar.",
      },
      {
        question: "Qual a diferença para o Power BI?",
        answer:
          "O Power BI é ótimo para análise. Um painel sob medida faz sentido quando a equipe precisa agir dentro da própria ferramenta, com regras, permissões e telas pensadas para a rotina da operação.",
      },
      {
        question: "Vocês conectam os dados que já usamos?",
        answer:
          "Sim. Partimos das fontes que a empresa já tem, como planilhas, bancos de dados e sistemas, e organizamos a informação em um só lugar.",
      },
    ],
  },
  {
    slug: "sistemas-internos",
    title: "Sistemas para empresas e sistemas de gestão",
    shortTitle: "Processos que fluem",
    description:
      "Sistemas de gestão para empresas que substituem planilhas de controle, reduzem improvisos e tornam processos mais simples de acompanhar.",
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
    faq: [
      {
        question: "Quanto custa um sistema para empresa?",
        answer:
          "Depende do escopo, das integrações e do nível de personalização. Depois de uma primeira conversa sobre o seu contexto, enviamos uma proposta com valor e prazo fechados, sem custo para conversar.",
      },
      {
        question: "Quando vale trocar a planilha de controle por um sistema?",
        answer:
          "Quando várias pessoas editam ao mesmo tempo, erros começam a se repetir ou ninguém sabe qual versão está certa. Esses são sinais de que o processo já pede um sistema.",
      },
      {
        question: "Sistema sob medida ou ERP pronto?",
        answer:
          "Um ERP pronto atende processos padrão. Um sistema sob medida compensa quando o seu processo é o diferencial do negócio ou quando o ERP obriga a equipe a criar contornos.",
      },
      {
        question: "Quanto tempo leva para desenvolver um sistema?",
        answer:
          "Começamos por uma primeira versão com o essencial, que já entra em uso, e evoluímos a partir dela. O prazo de cada etapa fica definido na proposta.",
      },
    ],
  },
  {
    slug: "aplicativos-e-produtos-digitais",
    title: "Desenvolvimento de aplicativos e MVPs",
    shortTitle: "Produtos para crescer",
    description:
      "Desenvolvimento de aplicativos e MVPs pensados para validar uma ideia, evoluir com o uso e acompanhar o negócio.",
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
    faq: [
      {
        question: "Quanto custa desenvolver um aplicativo?",
        answer:
          "Depende do escopo, das integrações e do nível de personalização. Depois de uma primeira conversa sobre o seu contexto, enviamos uma proposta com valor e prazo fechados, sem custo para conversar.",
      },
      {
        question: "O que é um MVP?",
        answer:
          "É a primeira versão do produto, com o mínimo necessário para validar a ideia com pessoas reais antes de investir em todas as funcionalidades.",
      },
      {
        question: "Vale a pena começar com no-code?",
        answer:
          "Para validar rápido, às vezes sim. Quando o produto cresce, exige integrações ou regras próprias, o desenvolvimento com código passa a compensar, e podemos ajudar nessa transição.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
