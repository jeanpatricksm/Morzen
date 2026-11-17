import { Check, CircleHelp, Globe, LayoutDashboard, type LucideIcon, Smartphone } from "lucide-preact";
import { type Project, projects, unknownProject } from "./projects";
import { StepNav } from "./step-nav";

const ICONS: Record<string, LucideIcon> = {
  "0": Globe,
  "1": LayoutDashboard,
  "2": Smartphone,
  unknown: CircleHelp,
};

interface ProjectSelectionStepProps {
  onProjectSelect: (project: Project) => void;
  selectedId: string;
  handleNext: VoidFunction;
  total: number;
}

export function FormProjectStep({ onProjectSelect, selectedId, handleNext, total }: ProjectSelectionStepProps) {
  const options = [...projects, unknownProject];

  return (
    <div className="mz-step">
      <p className="mz-eyebrow">Etapa 01</p>
      <h2>O que você quer construir?</h2>
      <p className="mz-lead">Escolha o ponto de partida mais próximo do seu desafio.</p>

      <div className="mz-body">
        <div className="mz-opts" role="radiogroup" aria-label="O que você quer construir">
          {options.map((project) => {
            const Icon = ICONS[project.id] ?? Globe;
            const selected = selectedId === project.id;
            return (
              <button
                key={project.id}
                type="button"
                role="radio"
                aria-checked={selected}
                className={`mz-opt ${selected ? "is-sel" : ""}`}
                onClick={() => {
                  onProjectSelect(project);
                  window.setTimeout(handleNext, 260);
                }}
              >
                {project.imageSrc ? (
                  <span className="mz-win">
                    <span className="mz-chrome" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                      <span>{project.url}</span>
                    </span>
                    <img src={project.imageSrc} alt={project.imageAlt} loading="lazy" decoding="async" />
                  </span>
                ) : (
                  <span className="mz-win is-q">
                    <CircleHelp aria-hidden="true" />
                  </span>
                )}
                <span className="t">
                  <Icon aria-hidden="true" />
                  {project.title}
                </span>
                <span className="ex">{project.kind}</span>
                <ul>
                  {project.description.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <span className="ok" aria-hidden="true">
                  <Check />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <StepNav step={1} total={total} onNext={handleNext} nextDisabled={!selectedId} />
    </div>
  );
}
