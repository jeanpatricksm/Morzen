import { CalendarClock, Coffee, Lightbulb, RefreshCw, Search, Users, Wrench } from "lucide-preact";
import { Instagram, Linkedin } from "@/components/brand-icons";
import type { ComponentChildren } from "preact";
import { type Answers, budgets, sources, stages, teamSizes, timelines } from "./qualify";
import { ChoiceGroup } from "./choice-group";
import { StepNav } from "./step-nav";

interface FormQualifyStepProps {
  step: 2 | 3 | 4;
  total: number;
  answers: Answers;
  onChange: (patch: Partial<Answers>) => void;
  handleNext: VoidFunction;
  handleBack: VoidFunction;
}

const copy = {
  2: { title: "Em que momento você está?", text: "Assim a gente entende de onde partir." },
  3: {
    title: "Prazo e investimento.",
    text: "Uma estimativa já ajuda a desenhar um caminho realista. Nada aqui é compromisso.",
  },
  4: { title: "Conte um pouco do contexto.", text: "Quem é o negócio e o que precisa melhorar." },
};

function isComplete(step: 2 | 3 | 4, answers: Answers) {
  if (step === 2) return Boolean(answers.stage);
  if (step === 3) return Boolean(answers.timeline && answers.budget);
  return Boolean(answers.teamSize && answers.description.trim().length >= 4);
}

export function FormQualifyStep({ step, total, answers, onChange, handleNext, handleBack }: FormQualifyStepProps) {
  let fields: ComponentChildren;

  if (step === 2) {
    fields = (
      <>
        <ChoiceGroup
          label="Qual frase descreve melhor sua situação?"
          choices={stages}
          value={answers.stage}
          onChange={(stage) => onChange({ stage })}
          variant="rows"
          icons={{ ideia: Lightbulb, melhorar: Wrench, substituir: RefreshCw }}
        />
        {answers.stage && answers.stage !== "ideia" ? (
          <label className="mz-field" htmlFor="url">
            <span className="mz-flabel">
              Link do que existe hoje <i>opcional</i>
            </span>
            <input
              id="url"
              type="url"
              placeholder="https://"
              value={answers.currentUrl}
              onInput={(e) => onChange({ currentUrl: e.currentTarget.value })}
              maxLength={300}
            />
          </label>
        ) : null}
      </>
    );
  } else if (step === 3) {
    fields = (
      <>
        <ChoiceGroup
          label="Para quando você precisa?"
          choices={timelines}
          value={answers.timeline}
          onChange={(timeline) => onChange({ timeline })}
          icons={{ "sem-pressa": Coffee, "1-mes": CalendarClock }}
        />
        <ChoiceGroup
          label="Quanto pretende investir?"
          choices={budgets}
          value={answers.budget}
          onChange={(budget) => onChange({ budget })}
        />
      </>
    );
  } else {
    fields = (
      <>
        <div className="mz-grid2">
          <label className="mz-field" htmlFor="empresa">
            <span className="mz-flabel">
              Empresa ou segmento <i>opcional</i>
            </span>
            <input
              id="empresa"
              placeholder="Ex.: clínica odontológica em Taubaté"
              value={answers.company}
              onInput={(e) => onChange({ company: e.currentTarget.value })}
              maxLength={200}
            />
          </label>
          <ChoiceGroup
            label="Tamanho da equipe"
            choices={teamSizes}
            value={answers.teamSize}
            onChange={(teamSize) => onChange({ teamSize })}
            icons={{ solo: Users }}
          />
        </div>
        <label className="mz-field" htmlFor="desc">
          <span className="mz-flabel">O que está acontecendo?</span>
          <textarea
            id="desc"
            placeholder="Conte o que está acontecendo e o que você gostaria de melhorar"
            value={answers.description}
            onInput={(e) => onChange({ description: e.currentTarget.value })}
            maxLength={2000}
          />
        </label>
        <ChoiceGroup
          label="Como conheceu a Morzen?"
          choices={sources}
          value={answers.source}
          onChange={(source) => onChange({ source })}
          icons={{ instagram: Instagram, linkedin: Linkedin, google: Search }}
        />
      </>
    );
  }

  return (
    <div className="mz-step" key={step}>
      <p className="mz-eyebrow">Etapa {String(step).padStart(2, "0")}</p>
      <h2>{copy[step].title}</h2>
      <p className="mz-lead">{copy[step].text}</p>
      <div className="mz-body">{fields}</div>
      <StepNav
        step={step}
        total={total}
        onBack={handleBack}
        onNext={handleNext}
        nextDisabled={!isComplete(step, answers)}
      />
    </div>
  );
}
