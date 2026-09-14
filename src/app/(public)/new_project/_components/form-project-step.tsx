import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Project, projects } from "../projects";

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
    <div className="morzen-project-step flex h-full flex-col gap-8">
      <div className="w-full">
        <p className="morzen-eyebrow">Etapa 01</p>
        <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
          O que você quer construir?
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-black/58">
          Escolha o ponto de partida mais próximo do seu desafio. A solução
          será pensada a partir da sua realidade.
        </p>
      </div>
      <section className="morzen-project-options grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Card
            // biome-ignore lint/suspicious/noArrayIndexKey: <idk>
            key={index}
            className={`morzen-project-option flex h-full flex-col overflow-hidden rounded-none border-0 p-0 shadow-none transition duration-500 hover:-translate-y-1 ${
              selectedProject.id === project.id
                ? "ring-2 ring-[#6445d8]"
                : ""
            }`}
          >
            <CardHeader className="flex flex-col justify-between p-5 pb-0">
              <CardTitle className="mb-4 text-xl font-medium tracking-[-0.04em]">
                {project.title}
              </CardTitle>
              <div className="relative mb-4 aspect-video w-full overflow-hidden">
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-700 ease-out hover:scale-[1.035]"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-grow px-5 pb-5 pt-0">
              <ul className="space-y-2 text-sm leading-6 text-black/58">
                {project.description.map((item, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <idk>
                  <li key={i} className="flex items-start gap-2">
                    <Check className="mt-1 size-4 shrink-0 text-[#6445d8]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-center gap-3 p-5 pt-0">
              <Button
                variant="ghost"
                aria-pressed={selectedProject.id === project.id}
                className={`morzen-project-option-button w-full rounded-full text-sm font-semibold ${
                  selectedProject.id === project.id
                    ? "morzen-project-option-button-selected text-white"
                    : "morzen-project-option-button-quiet text-black"
                }`}
                onClick={() => onProjectSelect(project)}
              >
                {selectedProject.id === project.id
                  ? "Selecionado"
                  : "Selecionar"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
      <div className="flex w-full justify-end pt-2">
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
