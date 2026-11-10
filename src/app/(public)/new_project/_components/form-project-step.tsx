import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
    CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Project, projects, unknownProject } from "../projects";

interface ProjectSelectionStepProps {
  onProjectSelect: (project: Project) => void;
  selectedProject?: Project;
  handleNext: VoidFunction;
}

export function FormProjectStep({
  onProjectSelect,
  selectedProject = projects[0],
  handleNext,
}: ProjectSelectionStepProps) {
  return (
    <div className="morzen-project-step flex h-full flex-col gap-6">
      <div className="w-full">
        <p className="morzen-eyebrow">Etapa 01</p>
        <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
          O que você quer construir?
        </h2>
        <p className="mt-2 max-w-2xl leading-7 text-black/58">
          Escolha o ponto de partida mais próximo do seu desafio.
        </p>
      </div>
      <section role="radiogroup" aria-label="O que você quer construir" className="morzen-project-options grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Card
            // biome-ignore lint/suspicious/noArrayIndexKey: <idk>
            key={index}
            role="radio"
            tabIndex={0}
            aria-checked={selectedProject.id === project.id}
            onClick={() => onProjectSelect(project)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onProjectSelect(project);
              }
            }}
            className={`morzen-project-option flex h-full cursor-pointer flex-col overflow-hidden rounded-none border-0 p-0 shadow-none transition duration-500 hover:-translate-y-1 ${
              selectedProject.id === project.id
                ? "morzen-project-option-selected"
                : ""
            }`}
          >
            <CardHeader className="flex flex-col justify-between p-4 pb-0">
              <CardTitle className="mb-3 flex items-center justify-between gap-2 text-xl font-medium tracking-[-0.04em]">
                {project.title}
                <span className="morzen-project-option-check" aria-hidden="true">
                  <Check className="size-3.5" />
                </span>
              </CardTitle>
              <div className="relative mb-3 aspect-[16/8] w-full overflow-hidden">
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-700 ease-out hover:scale-[1.035]"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-grow px-4 pb-4 pt-0 [@media(max-height:52rem)]:hidden">
              <ul className="morzen-project-option-list space-y-1 text-sm leading-6">
                {project.description.map((item, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <idk>
                  <li key={i} className="flex items-start gap-2">
                    <Check className="mt-1 size-4 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </section>
      <div className="flex w-full flex-col-reverse items-center gap-3 pt-2 sm:flex-row sm:justify-between">
        <button
          type="button"
          className="text-sm font-semibold text-black/60 underline decoration-black/25 underline-offset-4 transition hover:text-black"
          onClick={() => {
            onProjectSelect(unknownProject);
            handleNext();
          }}
        >
          Ainda não sei o que preciso
        </button>
        <Button
          variant="ghost"
          size="lg"
          className="morzen-project-next rounded-full px-6 text-white"
          onClick={handleNext}
        >
          Continuar para contar mais
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
