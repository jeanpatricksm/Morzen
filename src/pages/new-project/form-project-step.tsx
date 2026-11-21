import { Check, CircleHelp, Globe, LayoutDashboard, type LucideIcon, Smartphone } from "lucide-preact";
import { useEffect, useRef } from "preact/hooks";
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
  headingRef: { current: HTMLHeadingElement | null };
}

export function FormProjectStep({
  onProjectSelect,
  selectedId,
  handleNext,
  total,
  headingRef,
}: ProjectSelectionStepProps) {
  const options = [...projects, unknownProject];
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const scheduleNext = () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      handleNext();
    }, 240);
  };

  return (
    <div className="mz-step">
      <p className="mz-kicker">Etapa 01</p>
      <h2 ref={headingRef} tabIndex={-1}>
        O que você quer construir?
      </h2>
      <p className="mz-lead">Escolha o ponto de partida mais próximo do seu desafio.</p>

      <div className="mz-body">
        <fieldset className="mz-fieldset">
          <legend className="sr-only">Tipo de projeto que você quer construir</legend>
          <div className="mz-opts">
            {options.map((project) => {
              const Icon = ICONS[project.id] ?? Globe;
              const selected = selectedId === project.id;
              return (
                <label
                  key={project.id}
                  className={`mz-opt ${selected ? "is-sel" : ""}`}
                  onPointerUp={() => {
                    onProjectSelect(project);
                    scheduleNext();
                  }}
                >
                  <input
                    className="sr-only"
                    type="radio"
                    name="projectType"
                    value={project.id}
                    checked={selected}
                    onChange={() => onProjectSelect(project)}
                  />
                  {project.imageSrc ? (
                    <span className="mz-win">
                      <span className="mz-chrome" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                        <span>{project.url}</span>
                      </span>
                      <img
                        src={project.imageSrc}
                        alt={project.imageAlt}
                        width={project.imageWidth}
                        height={project.imageHeight}
                        decoding="async"
                      />
                    </span>
                  ) : (
                    <span className="mz-win is-q" aria-hidden="true">
                      <CircleHelp />
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
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      <StepNav step={1} total={total} onNext={handleNext} nextDisabled={!selectedId} />
    </div>
  );
}
