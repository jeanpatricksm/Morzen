import { ChevronLeft, Clock, Eye, MapPin } from "lucide-preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import { IsoCube, type IsoColor } from "@/components/iso";
import { FormContactStep } from "./form-contact-step";
import { FormProjectStep } from "./form-project-step";
import { FormQualifyStep } from "./form-qualify-step";
import { type Project, projects, unknownProject } from "./projects";
import { type Answers, emptyAnswers } from "./qualify";

const storageKey = "morzen-new-project";
const totalSteps = 5;

// Progresso como pilha de blocos: uma camada por etapa concluída.
const PROGRESS: [number, number, IsoColor, string][] = [
  [-1.5, -0.6, "d", "IDEIA"],
  [-0.5, -0.6, "v", "FASE"],
  [0.5, -0.6, "d", "PRAZO"],
  [-1, 0.4, "l", "INFO"],
  [0, 0.4, "v", "OI!"],
];

function findProject(id: string): Project | undefined {
  if (id === unknownProject.id) return unknownProject;
  return projects.find((project) => project.id === id);
}

export function NewProjectPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (!saved) return;
      const { step, answers: savedAnswers } = JSON.parse(saved);
      setAnswers((prev) => ({ ...prev, ...savedAnswers }));
      if (step >= 1 && step <= totalSteps) setCurrentStep(step);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ step: currentStep, answers }));
    } catch {}
  }, [currentStep, answers]);

  const updateAnswers = (patch: Partial<Answers>) => setAnswers((prev) => ({ ...prev, ...patch }));

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const clearSaved = useCallback(() => {
    try {
      window.localStorage.removeItem(storageKey);
    } catch {}
  }, []);

  const selectedProject = findProject(answers.projectId);

  return (
    <main className="mz-np">
      <header className="mz-np-bar">
        <a className="mz-brand" href="/" aria-label="Voltar para o site da Morzen">
          <span className="mz-logo">
            <img src="/morzen_mark.png" alt="" width={26} height={18} />
          </span>
          Morzen
        </a>
        <div className="mz-steps-pill" aria-label={`Etapa ${currentStep} de ${totalSteps}`}>
          {Array.from({ length: totalSteps }, (_, i) => (
            <span key={i} className={i + 1 < currentStep ? "is-done" : i + 1 === currentStep ? "is-on" : ""}>
              {i + 1}
            </span>
          ))}
        </div>
        <a className="mz-np-back" href="/">
          <ChevronLeft aria-hidden="true" /> Voltar ao site
        </a>
      </header>

      <div className="mz-np-page">
        <aside className="mz-side">
          <div className="mz-blob" aria-hidden="true" />
          <small>Começar uma conversa</small>
          <h1>
            Vamos
            <br />
            construir <em>algo</em>
            <br />
            importante
          </h1>
          <p>Cinco passos rápidos, quase tudo com um clique. Assim a primeira conversa já começa no seu contexto.</p>
          <ul>
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

          <div className="mz-progress">
            <svg className="stack" viewBox="-110 -150 220 210" aria-hidden="true">
              {PROGRESS.map(([x, z, c, l], i) => (
                <g key={l} className={`mz-blk ${i >= currentStep - 1 ? "is-ghost" : ""}`}>
                  <IsoCube x={x} y={-0.5} z={z} size={44} color={c} label={l} labelSize={l.length > 5 ? 7.5 : 9.5} />
                </g>
              ))}
            </svg>
            <div className="mz-who">
              <div className="lbl">Quem vai te responder</div>
              <div className="mz-faces">
                <img src="/jean_about_pic.webp" alt="Jean" width={56} height={66} />
                <img src="/diego_about_pic.webp" alt="Diego" width={56} height={66} />
              </div>
              <p>Jean &amp; Diego</p>
              <span>Fundadores, sem intermediários</span>
            </div>
          </div>
        </aside>

        <section className="mz-main" aria-live="polite">
          {currentStep === 1 && (
            <FormProjectStep
              onProjectSelect={(project) => updateAnswers({ projectId: project.id })}
              selectedId={answers.projectId}
              handleNext={handleNext}
              total={totalSteps}
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
            />
          )}

          {currentStep === 5 && (
            <FormContactStep
              selectedProject={selectedProject}
              answers={answers}
              handleBack={handleBack}
              onSent={clearSaved}
              total={totalSteps}
            />
          )}
        </section>
      </div>
    </main>
  );
}
