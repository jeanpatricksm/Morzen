"use client";

import { useState } from "react";
import { FormDescriptionStep } from "./_components/form-description-step";
import { FormProjectStep } from "./_components/form-project-step";
import { type Project, projects } from "./projects";

export default function NewProjectPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
  const totalSteps = 2;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <main className="morzen-project-page relative min-h-[100dvh] overflow-hidden px-5 pb-24 pt-28 text-black sm:px-8 sm:pt-36">
      <div className="morzen-project-glow morzen-project-glow-left" aria-hidden="true" />
      <div className="morzen-project-glow morzen-project-glow-right" aria-hidden="true" />

      <div className="morzen-project-layout relative z-10 mx-auto max-w-[1440px]">
        <header className="morzen-project-intro">
          <p className="morzen-eyebrow">Começar uma conversa</p>
          <h1 className="mt-6 max-w-2xl text-5xl font-medium leading-[0.96] tracking-[-0.065em] sm:text-7xl">
            Vamos construir algo importante para o seu negócio.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-black/62">
            Conte o que você precisa resolver. A Morzen entra na conversa para
            entender o contexto e construir o caminho com você.
          </p>
          <div className="morzen-project-aside-note mt-16 hidden border-t border-black/12 pt-5 text-sm leading-6 text-black/52 lg:block">
            <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#6445d8]">Como funciona</span>
            <span className="mt-4 block max-w-xs">Você compartilha o contexto. A gente escuta, entende e responde com os próximos passos.</span>
          </div>
        </header>

        <div className="morzen-project-flow">
          <div className="morzen-project-progress mb-10">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-black/45">
              <span>{currentStep === 1 ? "Escolha uma direção" : "Conte mais sobre ela"}</span>
              <span>0{currentStep} / 02</span>
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
              onProjectSelect={setSelectedProject}
              selectedProject={selectedProject}
              handleNext={handleNext}
            />
          )}

          {currentStep === 2 && (
            <FormDescriptionStep
              selectedProject={selectedProject}
              handleBack={handleBack}
            />
          )}
        </div>
      </div>
    </main>
  );
}
