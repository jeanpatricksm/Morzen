import { Check, ChevronLeft, Clock, Eye, MapPin } from "lucide-preact";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { FormContactStep } from "./form-contact-step";
import { FormProjectStep } from "./form-project-step";
import { FormQualifyStep } from "./form-qualify-step";
import { type Project, projects, unknownProject } from "./projects";
import { type Answers, emptyAnswers } from "./qualify";

const storageKey = "morzen-new-project";
const totalSteps = 5;

const STEP_LABELS = ["Ideia", "Momento", "Prazo", "Contexto", "Contato"] as const;

function findProject(id: string): Project | undefined {
  if (id === unknownProject.id) return unknownProject;
  return projects.find((project) => project.id === id);
}

export function NewProjectPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const hydratedRef = useRef(false);
  const didNavigateRef = useRef(false);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          if (parsed.answers && typeof parsed.answers === "object") {
            setAnswers((prev) => ({ ...prev, ...parsed.answers }));
          }
          if (typeof parsed.step === "number" && parsed.step >= 1 && parsed.step <= totalSteps) {
            setCurrentStep(parsed.step);
          }
        }
      }
    } catch {}
    hydratedRef.current = true;
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ step: currentStep, answers }));
    } catch {}
  }, [currentStep, answers]);

  // Move foco para o título da etapa ao avançar/voltar (acessibilidade sem aria-live ruidoso).
  useEffect(() => {
    if (!didNavigateRef.current) return;
    requestAnimationFrame(() => headingRef.current?.focus());
  }, [currentStep]);

  const updateAnswers = (patch: Partial<Answers>) => setAnswers((prev) => ({ ...prev, ...patch }));

  const goToStep = (next: number) => {
    didNavigateRef.current = true;
    setCurrentStep(next);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  const handleNext = () => goToStep(Math.min(currentStep + 1, totalSteps));
  const handleBack = () => goToStep(Math.max(currentStep - 1, 1));

  const clearSaved = useCallback(() => {
    try {
      window.localStorage.removeItem(storageKey);
    } catch {}
  }, []);

  const selectedProject = findProject(answers.projectId);

  return (
    <main id="conteudo" className="mz-np">
      <header className="mz-np-bar">
        <a className="mz-brand" href="/" aria-label="Voltar para o site da Morzen">
          <span className="mz-logo">
            <img src="/morzen_mark.png" alt="" width={26} height={18} />
          </span>
          <span>Morzen</span>
        </a>

        <div className="mz-steps-pill" role="navigation" aria-label={`Progresso: etapa ${currentStep} de ${totalSteps}`}>
          {STEP_LABELS.map((label, i) => {
            const num = i + 1;
            const isDone = num < currentStep;
            const isOn = num === currentStep;
            return (
              <button
                key={label}
                type="button"
                className={isDone ? "is-done" : isOn ? "is-on" : undefined}
                disabled={!isDone}
                aria-current={isOn ? "step" : undefined}
                aria-label={`Etapa ${num}: ${label}`}
                onClick={() => isDone && goToStep(num)}
              >
                {num}
              </button>
            );
          })}
        </div>

        <a className="mz-np-back" href="/">
          <ChevronLeft aria-hidden="true" />
          <span className="mz-np-back-full">Voltar ao site</span>
          <span className="mz-np-back-short" aria-hidden="true">
            Voltar
          </span>
        </a>
      </header>

      <div className="mz-np-page">
        <aside className="mz-side">
          <div className="mz-side-art" aria-hidden="true">
            <img src="/art/codex-sky.webp" alt="" width={1600} height={894} decoding="async" />
          </div>

          <div className="mz-side-body">
            <p className="mz-feature-tag">Começar uma conversa</p>
            <h1>
              Vamos construir <span>algo</span> importante
            </h1>
            <p className="mz-side-copy">
              Cinco passos rápidos, quase tudo com um clique. Assim a primeira conversa já começa no seu contexto.
            </p>
            <ul className="mz-side-list">
              <li>
                <Clock aria-hidden="true" /> Resposta em até 1 dia útil
              </li>
              <li>
                <MapPin aria-hidden="true" /> Todo o Brasil e, presencialmente, o Vale do Paraíba
              </li>
              <li>
                <Eye aria-hidden="true" /> Você acompanha cada etapa da construção
              </li>
            </ul>

            <ol className="mz-side-steps" aria-label="Etapas do formulário">
              {STEP_LABELS.map((label, i) => {
                const num = i + 1;
                const isDone = num < currentStep;
                const isOn = num === currentStep;
                return (
                  <li key={label} className={isDone ? "is-done" : isOn ? "is-on" : undefined}>
                    <span className="mz-side-dot" aria-hidden="true">
                      {isDone ? <Check /> : `0${num}`}
                    </span>
                    <span>{label}</span>
                  </li>
                );
              })}
            </ol>

            <div className="mz-who">
              <div className="mz-faces">
                <img src="/jean_about_pic.webp" alt="Jean Patrick" width={48} height={48} />
                <img src="/diego_about_pic.webp" alt="Diego Rezende" width={48} height={48} />
              </div>
              <div>
                <p>Jean &amp; Diego</p>
                <span>Fundadores, sem intermediários</span>
              </div>
            </div>
          </div>
        </aside>

        <section className="mz-main" aria-label={`Etapa ${currentStep} de ${totalSteps}`}>
          {currentStep === 1 && (
            <FormProjectStep
              onProjectSelect={(project) => updateAnswers({ projectId: project.id })}
              selectedId={answers.projectId}
              handleNext={handleNext}
              total={totalSteps}
              headingRef={headingRef}
            />
          )}

          {(currentStep === 2 || currentStep === 3 || currentStep === 4) && (
            <FormQualifyStep
              step={currentStep}
              total={totalSteps}
              answers={answers}
              onChange={updateAnswers}
              handleNext={handleNext}
              handleBack={handleBack}
              headingRef={headingRef}
            />
          )}

          {currentStep === 5 && (
            <FormContactStep
              selectedProject={selectedProject}
              answers={answers}
              handleBack={handleBack}
              onSent={clearSaved}
              total={totalSteps}
              headingRef={headingRef}
            />
          )}
        </section>
      </div>
    </main>
  );
}
