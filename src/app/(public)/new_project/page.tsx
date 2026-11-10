"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FormContactStep } from "./_components/form-contact-step";
import { FormProjectStep } from "./_components/form-project-step";
import { FormQualifyStep } from "./_components/form-qualify-step";
import { type Project, projects, unknownProject } from "./projects";
import { type Answers, emptyAnswers } from "./qualify";

const storageKey = "morzen-new-project";
const totalSteps = 5;
const stepLabels = [
  "Escolha uma direção",
  "Seu momento",
  "Prazo e investimento",
  "Contexto",
  "Contato",
];

function findProject(id: string): Project {
  if (id === unknownProject.id) return unknownProject;
  return projects.find((project) => project.id === id) ?? projects[0];
}

export default function NewProjectPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    ...emptyAnswers,
    projectId: projects[0].id,
  });

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
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({ step: currentStep, answers }),
      );
    } catch {}
  }, [currentStep, answers]);

  const updateAnswers = (patch: Partial<Answers>) =>
    setAnswers((prev) => ({ ...prev, ...patch }));

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const clearSaved = useCallback(() => {
    try {
      window.localStorage.removeItem(storageKey);
    } catch {}
  }, []);

  const selectedProject = findProject(answers.projectId);

  return (
    <main className="morzen-project-page relative min-h-[100dvh] text-black lg:grid lg:h-[100dvh] lg:overflow-hidden lg:grid-cols-[minmax(22rem,0.36fr)_minmax(0,0.64fr)]">
      <aside className="morzen-project-intro morzen-project-aside relative overflow-hidden px-5 pb-10 pt-6 text-white sm:px-8 lg:px-12 lg:py-10">
        <div className="morzen-project-aside-glow" aria-hidden="true" />
        <div className="relative flex h-full flex-col">
          <div className="flex items-center justify-between">
            <Link href="/" aria-label="Voltar para o site da Morzen">
              <Image
                src="/morzen_mark_white.png"
                alt="Morzen"
                width={54}
                height={40}
                priority
                className="h-auto w-[46px] object-contain"
              />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/65 transition hover:text-white"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Voltar ao site
            </Link>
          </div>
          <p className="morzen-eyebrow mt-12 !text-[#b9a8ff] lg:mt-auto">
            Começar uma conversa
          </p>
          <h1 className="mt-6 max-w-md text-4xl font-medium leading-[0.98] tracking-[-0.06em] sm:text-5xl xl:text-6xl">
            Vamos construir algo importante para o seu negócio.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
            Cinco passos rápidos, quase tudo com um clique. Assim a primeira
            conversa já começa no seu contexto.
          </p>

          <div className="mt-auto hidden pt-12 lg:block">
            <div className="border-t border-white/15 pt-6">
              <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#b9a8ff]">
                Quem vai te responder
              </span>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {["/jean_about_pic.webp", "/diego_about_pic.webp"].map((src) => (
                    <Image
                      key={src}
                      src={src}
                      alt=""
                      width={56}
                      height={56}
                      className="size-14 rounded-full object-cover ring-2 ring-[#201835]"
                    />
                  ))}
                </div>
                <span className="max-w-xs text-sm leading-6 text-white/75">
                  Jean e Diego, fundadores da Morzen. Sem intermediários.
                </span>
              </div>
            </div>
            <ul className="mt-8 space-y-3 text-sm leading-6 text-white/65">
              <li>Resposta em até 1 dia útil.</li>
              <li>Todo o Brasil e, presencialmente, o Vale do Paraíba.</li>
              <li>Você acompanha cada etapa da construção.</li>
            </ul>
          </div>
        </div>
      </aside>

      <div className="morzen-project-main px-5 pb-16 pt-10 sm:px-8 lg:flex lg:h-[100dvh] lg:flex-col lg:justify-center lg:px-14 lg:py-8 xl:px-20">
        <div className="morzen-project-flow mx-auto w-full max-w-5xl">
          <div className="morzen-project-progress mb-6">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-black/45">
              <span>{stepLabels[currentStep - 1]}</span>
              <span>0{currentStep} / 0{totalSteps}</span>
            </div>
            <div className="mt-4 h-1 w-full overflow-hidden bg-black/10">
              <div
                className="h-full bg-[#6445d8] transition-all duration-500 ease-in-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {currentStep === 1 && (
            <FormProjectStep
              onProjectSelect={(project) =>
                updateAnswers({ projectId: project.id })
              }
              selectedProject={selectedProject}
              handleNext={handleNext}
            />
          )}

          {(currentStep === 2 || currentStep === 3 || currentStep === 4) && (
            <FormQualifyStep
              step={currentStep}
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
            />
          )}
        </div>
      </div>
    </main>
  );
}
