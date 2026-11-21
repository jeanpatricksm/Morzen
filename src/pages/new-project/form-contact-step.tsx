import { Check, ChevronRight, ClipboardList, Mail, MessageCircle, Phone } from "lucide-preact";
import type { TargetedSubmitEvent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { ChoiceGroup } from "./choice-group";
import type { Project } from "./projects";
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
} from "./qualify";
import { StepNav } from "./step-nav";

const FORMSPREE_URL = "https://formspree.io/f/mbgjrgwq";

interface FormError {
  field?: string;
  message: string;
}

interface FormState {
  submitting: boolean;
  succeeded: boolean;
  errors: FormError[];
}

function FieldError({ message }: { message?: string }) {
  return message ? (
    <span className="mz-err" role="alert">
      {message}
    </span>
  ) : null;
}

interface FormContactProps {
  selectedProject?: Project;
  answers: Answers;
  handleBack: VoidFunction;
  onSent: VoidFunction;
  total: number;
  headingRef: { current: HTMLHeadingElement | null };
}

function formatPhone(value: string) {
  let digits = value.replace(/\D/g, "");
  // Remove código do país (+55) caso venha de autofill ou colagem.
  if (digits.length > 11 && digits.startsWith("55")) {
    digits = digits.slice(2);
  }
  digits = digits.slice(0, 11);

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
  total,
  headingRef,
}: FormContactProps) {
  const [formState, setFormState] = useState<FormState>({ submitting: false, succeeded: false, errors: [] });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [channel, setChannel] = useState("whatsapp");
  const [honeyPot, setHoneyPot] = useState("");

  useEffect(() => {
    if (!formState.succeeded) return;
    onSent();
  }, [formState.succeeded, onSent]);

  const phoneRequired = channel !== "email";

  const handleFormSubmit = async (e: TargetedSubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeyPot || formState.submitting) return;
    setFormState({ submitting: true, succeeded: false, errors: [] });
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });
      if (res.ok) {
        setFormState({ submitting: false, succeeded: true, errors: [] });
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { errors?: FormError[] };
      setFormState({
        submitting: false,
        succeeded: false,
        errors: data.errors?.length ? data.errors : [{ message: "Não foi possível enviar agora. Tente de novo." }],
      });
    } catch {
      setFormState({
        submitting: false,
        succeeded: false,
        errors: [{ message: "Sem conexão. Verifique a internet e tente de novo." }],
      });
    }
  };

  const fieldError = (field: string) => formState.errors.find((err) => err.field === field)?.message;
  const generalErrors = formState.errors.filter((err) => !err.field);

  if (formState.succeeded) {
    return (
      <div className="mz-step">
        <div className="mz-done" role="status">
          <div>
            <div className="mz-done-badge" aria-hidden="true">
              <Check />
            </div>
            <h2>Recebemos. Obrigado!</h2>
            <p className="mz-lead">
              Jean ou Diego vai te responder em até 1 dia útil — já sabendo do seu contexto.
            </p>
            <a className="mz-btn" href="/">
              Voltar ao site <ChevronRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  const summary: [string, string][] = [
    ["Projeto", selectedProject?.title ?? "Não informado"],
    ["Momento", labelOf(stages, answers.stage)],
    ["Prazo", labelOf(timelines, answers.timeline)],
    ["Investimento", labelOf(budgets, answers.budget)],
    ["Equipe", labelOf(teamSizes, answers.teamSize)],
  ];

  return (
    <form className="mz-step" onSubmit={handleFormSubmit}>
      <p className="mz-kicker">Etapa 05</p>
      <h2 ref={headingRef} tabIndex={-1}>
        Para onde a gente responde?
      </h2>
      <p className="mz-lead">Último passo. Com isso, já chegamos na conversa sabendo do seu contexto.</p>

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

      <div className="mz-body mz-contact-grid">
        <div className="mz-contact-fields">
          <div className="mz-grid2">
            <label className="mz-field" htmlFor="nome">
              <span className="mz-flabel">Nome</span>
              <input
                id="nome"
                name="name"
                placeholder="Seu nome"
                value={name}
                minLength={1}
                maxLength={128}
                autoComplete="name"
                onInput={(e) => setName(e.currentTarget.value)}
                aria-invalid={Boolean(fieldError("name"))}
                required
              />
              <FieldError message={fieldError("name")} />
            </label>
            <label className="mz-field" htmlFor="email">
              <span className="mz-flabel">Email</span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Seu melhor email"
                value={email}
                autoComplete="email"
                onInput={(e) => setEmail(e.currentTarget.value)}
                maxLength={512}
                aria-invalid={Boolean(fieldError("email"))}
                required
              />
              <FieldError message={fieldError("email")} />
            </label>
          </div>
          <ChoiceGroup
            name="channel"
            label="Como prefere ser contatado?"
            choices={contactChannels}
            value={channel}
            onChange={setChannel}
            icons={{ whatsapp: MessageCircle, email: Mail, ligacao: Phone }}
          />
          <label className="mz-field" htmlFor="telefone">
            <span className="mz-flabel">
              WhatsApp {!phoneRequired ? <i>opcional</i> : null}
            </span>
            <input
              id="telefone"
              name="phone"
              type="tel"
              placeholder="(11) 91234-5678"
              value={phone}
              onInput={(e) => setPhone(formatPhone(e.currentTarget.value))}
              maxLength={15}
              inputMode="tel"
              pattern="\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}"
              title="Use o formato (xx) xxxxx-xxxx"
              autoComplete="tel-national"
              aria-invalid={Boolean(fieldError("phone"))}
              required={phoneRequired}
            />
            <span className="mz-hint">Use o formato (xx) xxxxx-xxxx</span>
            <FieldError message={fieldError("phone")} />
          </label>
          <div className="mz-honey" aria-hidden="true">
            <label htmlFor="honey">Deixe este campo em branco</label>
            <input
              type="text"
              id="honey"
              name="honey"
              value={honeyPot}
              onInput={(e) => setHoneyPot(e.currentTarget.value)}
              autoComplete="off"
              tabIndex={-1}
            />
          </div>
          {generalErrors.map((err) => (
            <span key={err.message} className="mz-err" role="alert">
              {err.message}
            </span>
          ))}
        </div>

        <aside className="mz-summary" aria-label="Resumo do projeto">
          <p>
            <ClipboardList aria-hidden="true" /> Seu projeto
          </p>
          <dl>
            {summary.map(([k, v]) => (
              <div key={k} className="mz-summary-row">
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <StepNav
        step={5}
        total={total}
        onBack={handleBack}
        nextType="submit"
        busy={formState.submitting}
        nextLabel={formState.submitting ? "Enviando..." : "Enviar projeto"}
      />
    </form>
  );
}
