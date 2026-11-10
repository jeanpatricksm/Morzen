import { type FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, ValidationError } from "@formspree/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Project } from "../projects";
import {
  type Answers,
  budgets,
  contactChannels,
  labelOf,
  priorityOf,
  sources,
  stages,
  teamSizes,
  timelines,
} from "../qualify";
import { ChoiceGroup } from "./choice-group";

type ProjectFormFields = {
  name: string;
  email: string;
  phone: string;
  honey?: string;
};

interface FormContactProps {
  selectedProject?: Project;
  answers: Answers;
  handleBack: VoidFunction;
  onSent: VoidFunction;
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) return digits;

  const areaCode = digits.slice(0, 2);
  const phoneNumber = digits.slice(2);

  if (phoneNumber.length <= 4) return `(${areaCode}) ${phoneNumber}`;

  if (digits.length <= 10) {
    return `(${areaCode}) ${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4)}`;
  }

  return `(${areaCode}) ${phoneNumber.slice(0, 5)}-${phoneNumber.slice(5)}`;
}

export function FormContactStep({
  selectedProject,
  answers,
  handleBack,
  onSent,
}: FormContactProps) {
  const router = useRouter();
  const [formState, submitToFormspree] =
    useForm<ProjectFormFields>("mbgjrgwq");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [channel, setChannel] = useState("whatsapp");
  const [honeyPot, setHoneyPot] = useState("");

  useEffect(() => {
    if (!formState.succeeded) return;

    toast("Recebemos sua ideia. Em breve a Morzen entra em contato.");
    onSent();

    const redirectTimeout = window.setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => window.clearTimeout(redirectTimeout);
  }, [formState.succeeded, router, onSent]);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (honeyPot) {
      e.preventDefault();
      return;
    }

    await submitToFormspree(e);
  };

  return (
    <div className="morzen-project-form flex w-full max-w-3xl flex-col items-start gap-6">
      <div className="w-full">
        <p className="morzen-eyebrow">Etapa 05</p>
        <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
          Para onde a gente responde?
        </h2>
        <p className="mt-2 leading-7 text-black/58">
          Último passo. Com isso, já chegamos na conversa sabendo do seu
          contexto.
        </p>
      </div>

      {selectedProject && (
        <div className="morzen-project-selected w-full border-t border-[#6445d8]/30 py-3 text-sm text-black/58">
          Você quer começar por:{" "}
          <span className="font-semibold text-black">
            {selectedProject.title}
          </span>
        </div>
      )}

      <form className="w-full space-y-5" onSubmit={handleFormSubmit}>
        {Object.entries({
          projeto: selectedProject?.title ?? "Não informado",
          momento: labelOf(stages, answers.stage),
          linkAtual: answers.currentUrl || "Não informado",
          prazo: labelOf(timelines, answers.timeline),
          investimento: labelOf(budgets, answers.budget),
          empresa: answers.company || "Não informado",
          equipe: labelOf(teamSizes, answers.teamSize),
          desafio: answers.description,
          origem: labelOf(sources, answers.source),
          canalPreferido: labelOf(contactChannels, channel),
          prioridade: priorityOf(answers),
          _subject: `[${priorityOf(answers)}] Novo projeto: ${selectedProject?.title ?? "Não informado"}`,
        }).map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={value} />
        ))}

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label className="morzen-field-label" htmlFor="nome">
              Nome
            </Label>
            <Input
              id="nome"
              name="name"
              className="morzen-form-control"
              placeholder="Seu nome"
              value={name}
              minLength={1}
              maxLength={128}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={Boolean(formState.errors?.getFieldErrors("name").length)}
              required
            />
            <ValidationError
              field="name"
              errors={formState.errors}
              className="text-sm leading-6 text-red-600"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="morzen-field-label" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              className="morzen-form-control"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={512}
              aria-invalid={Boolean(formState.errors?.getFieldErrors("email").length)}
              required
            />
            <ValidationError
              field="email"
              errors={formState.errors}
              className="text-sm leading-6 text-red-600"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="morzen-field-label" htmlFor="telefone">
            WhatsApp
          </Label>
          <Input
            id="telefone"
            name="phone"
            type="tel"
            className="morzen-form-control"
            placeholder="(11) 91234-5678"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            maxLength={15}
            inputMode="numeric"
            pattern="\\([0-9]{2}\\) [0-9]{4,5}-[0-9]{4}"
            title="Use o formato (xx) xxxxx-xxxx"
            autoComplete="tel"
            required
          />
          <ValidationError
            field="phone"
            errors={formState.errors}
            className="text-sm leading-6 text-red-600"
          />
        </div>
        <ChoiceGroup
          label="Como prefere ser contatado?"
          choices={contactChannels}
          value={channel}
          onChange={setChannel}
          columns="grid-cols-3"
          compact
        />
        <div className="hidden">
          <label htmlFor="honey">Deixe este campo em branco</label>
          <input
            type="text"
            id="honey"
            name="honey"
            value={honeyPot}
            onChange={(e) => setHoneyPot(e.target.value)}
            autoComplete="off"
            tabIndex={-1}
          />
        </div>
        <ValidationError
          errors={formState.errors}
          className="text-sm leading-6 text-red-600"
        />
        <div className="flex w-full flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
          <Button
            variant="ghost"
            className="morzen-project-back rounded-full px-5 text-black"
            onClick={handleBack}
            type="button"
            disabled={formState.submitting}
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar
          </Button>
          <Button
            type="submit"
            variant="ghost"
            className="morzen-project-submit rounded-full px-6 text-white"
            disabled={formState.submitting}
          >
            {formState.submitting
              ? "Enviando sua mensagem..."
              : "Quero conversar sobre isso"}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
        <p className="text-center text-sm leading-6 text-black/48">
          Respondemos em até 1 dia útil. Sem spam.
        </p>
      </form>
    </div>
  );
}
