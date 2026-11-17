export interface Choice {
  id: string;
  label: string;
  detail?: string;
  score: number;
}

export interface Answers {
  projectId: string;
  stage: string;
  currentUrl: string;
  timeline: string;
  budget: string;
  company: string;
  teamSize: string;
  description: string;
  source: string;
}

export const emptyAnswers: Answers = {
  projectId: "",
  stage: "",
  currentUrl: "",
  timeline: "",
  budget: "",
  company: "",
  teamSize: "",
  description: "",
  source: "",
};

export const stages: Choice[] = [
  {
    id: "ideia",
    label: "É só uma ideia",
    detail: "Ainda não existe nada construído.",
    score: 0,
  },
  {
    id: "melhorar",
    label: "Já tenho algo e quero melhorar",
    detail: "Um site, planilha ou sistema que precisa evoluir.",
    score: 1,
  },
  {
    id: "substituir",
    label: "Preciso substituir algo que não funciona",
    detail: "O que existe hoje atrapalha a operação.",
    score: 2,
  },
];

export const timelines: Choice[] = [
  { id: "1-mes", label: "Até 1 mês", score: 2 },
  { id: "1-3-meses", label: "1 a 3 meses", score: 2 },
  { id: "3-meses", label: "Mais de 3 meses", score: 1 },
  { id: "sem-pressa", label: "Sem pressa", score: 0 },
];

export const budgets: Choice[] = [
  { id: "ate-5k", label: "Até R$ 5 mil", score: 0 },
  { id: "5-15k", label: "R$ 5 a 15 mil", score: 1 },
  { id: "15-40k", label: "R$ 15 a 40 mil", score: 2 },
  { id: "40k", label: "Acima de R$ 40 mil", score: 3 },
  { id: "nao-sei", label: "Ainda não sei", score: 1 },
];

export const teamSizes: Choice[] = [
  { id: "solo", label: "Só eu", score: 0 },
  { id: "2-10", label: "2 a 10 pessoas", score: 0 },
  { id: "11-50", label: "11 a 50 pessoas", score: 0 },
  { id: "50", label: "Mais de 50", score: 0 },
];

export const sources: Choice[] = [
  { id: "instagram", label: "Instagram", score: 0 },
  { id: "linkedin", label: "LinkedIn", score: 0 },
  { id: "google", label: "Google", score: 0 },
  { id: "indicacao", label: "Indicação", score: 0 },
  { id: "outro", label: "Outro", score: 0 },
];

export const contactChannels: Choice[] = [
  { id: "whatsapp", label: "WhatsApp", score: 0 },
  { id: "email", label: "Email", score: 0 },
  { id: "ligacao", label: "Ligação", score: 0 },
];

export function labelOf(choices: Choice[], id: string) {
  return choices.find((choice) => choice.id === id)?.label ?? "Não informado";
}

function scoreOf(choices: Choice[], id: string) {
  return choices.find((choice) => choice.id === id)?.score ?? 0;
}

// Rough triage so the team knows who to answer first.
export function priorityOf(answers: Answers) {
  const score =
    scoreOf(stages, answers.stage) +
    scoreOf(timelines, answers.timeline) +
    scoreOf(budgets, answers.budget);

  if (score >= 5) return "Alta";
  if (score >= 3) return "Média";
  return "Baixa";
}
