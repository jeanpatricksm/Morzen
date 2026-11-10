import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  type Answers,
  budgets,
  sources,
  stages,
  teamSizes,
  timelines,
} from "../qualify";
import { ChoiceGroup } from "./choice-group";

interface FormQualifyStepProps {
  step: 2 | 3 | 4;
  answers: Answers;
  onChange: (patch: Partial<Answers>) => void;
  handleNext: VoidFunction;
  handleBack: VoidFunction;
}

const copy = {
  2: {
    title: "Em que momento você está?",
    text: "Assim a gente entende de onde partir.",
  },
  3: {
    title: "Prazo e investimento.",
    text: "Uma estimativa já ajuda a desenhar um caminho realista. Nada aqui é compromisso.",
  },
  4: {
    title: "Conte um pouco do contexto.",
    text: "Quem é o negócio e o que precisa melhorar.",
  },
};

function isComplete(step: 2 | 3 | 4, answers: Answers) {
  if (step === 2) return Boolean(answers.stage);
  if (step === 3) return Boolean(answers.timeline && answers.budget);
  return Boolean(answers.teamSize && answers.description.trim().length >= 4);
}

export function FormQualifyStep({
  step,
  answers,
  onChange,
  handleNext,
  handleBack,
}: FormQualifyStepProps) {
  let fields: ReactNode;

  if (step === 2) {
    fields = (
      <>
        <ChoiceGroup
          label="Qual frase descreve melhor sua situação?"
          choices={stages}
          value={answers.stage}
          onChange={(stage) => onChange({ stage })}
          columns="grid-cols-1"
        />
        {answers.stage && answers.stage !== "ideia" && (
          <div className="flex w-full flex-col gap-2">
            <Label className="morzen-field-label" htmlFor="url">
              Link do que existe hoje{" "}
              <span className="text-black/42">opcional</span>
            </Label>
            <Input
              id="url"
              type="url"
              className="morzen-form-control"
              placeholder="https://"
              value={answers.currentUrl}
              maxLength={512}
              onChange={(e) => onChange({ currentUrl: e.target.value })}
            />
          </div>
        )}
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
          columns="grid-cols-2 sm:grid-cols-4"
          compact
        />
        <ChoiceGroup
          label="Quanto pretende investir?"
          choices={budgets}
          value={answers.budget}
          onChange={(budget) => onChange({ budget })}
          columns="grid-cols-2 sm:grid-cols-3"
          compact
        />
      </>
    );
  } else {
    fields = (
      <>
        <div className="flex w-full flex-col gap-2">
          <Label className="morzen-field-label" htmlFor="empresa">
            Empresa ou segmento <span className="text-black/42">opcional</span>
          </Label>
          <Input
            id="empresa"
            className="morzen-form-control"
            placeholder="Ex.: clínica odontológica em Taubaté"
            value={answers.company}
            maxLength={128}
            autoComplete="organization"
            onChange={(e) => onChange({ company: e.target.value })}
          />
        </div>
        <ChoiceGroup
          label="Tamanho da equipe"
          choices={teamSizes}
          value={answers.teamSize}
          onChange={(teamSize) => onChange({ teamSize })}
          columns="grid-cols-2 sm:grid-cols-4"
          compact
        />
        <div className="flex w-full flex-col gap-2">
          <Label className="morzen-field-label" htmlFor="desc">
            Qual desafio você quer resolver?
          </Label>
          <Textarea
            id="desc"
            rows={3}
            className="morzen-form-control min-h-24 resize-none"
            placeholder="Conte o que está acontecendo e o que você gostaria de melhorar"
            value={answers.description}
            maxLength={1024}
            onChange={(e) => onChange({ description: e.target.value })}
          />
        </div>
        <ChoiceGroup
          label="Como conheceu a Morzen?"
          choices={sources}
          value={answers.source}
          onChange={(source) => onChange({ source })}
          columns="grid-cols-3 sm:grid-cols-5"
          compact
        />
      </>
    );
  }

  return (
    <div className="morzen-project-form flex w-full max-w-3xl flex-col items-start gap-6">
      <div className="w-full">
        <p className="morzen-eyebrow">Etapa 0{step}</p>
        <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
          {copy[step].title}
        </h2>
        <p className="mt-2 leading-7 text-black/58">{copy[step].text}</p>
      </div>

      {fields}

      <div className="flex w-full flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
        <Button
          variant="ghost"
          className="morzen-project-back rounded-full px-5 text-black"
          onClick={handleBack}
          type="button"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Voltar
        </Button>
        <Button
          variant="ghost"
          className="morzen-project-next rounded-full px-6 text-white"
          onClick={handleNext}
          type="button"
          disabled={!isComplete(step, answers)}
        >
          Continuar
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
