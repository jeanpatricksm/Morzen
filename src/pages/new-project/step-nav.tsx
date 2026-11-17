import { ChevronLeft, ChevronRight } from "lucide-preact";
import type { ComponentChildren } from "preact";

interface StepNavProps {
  step: number;
  total: number;
  onBack?: VoidFunction;
  onNext?: VoidFunction;
  nextDisabled?: boolean;
  nextLabel?: ComponentChildren;
  nextType?: "button" | "submit";
  busy?: boolean;
}

export function StepNav({
  step,
  total,
  onBack,
  onNext,
  nextDisabled,
  nextLabel = "Continuar",
  nextType = "button",
  busy,
}: StepNavProps) {
  return (
    <div className="mz-np-nav">
      <div className="mz-count" aria-label={`Etapa ${step} de ${total}`}>
        <span>{String(step).padStart(2, "0")}</span>
        <i />
        <span>{String(total).padStart(2, "0")}</span>
      </div>
      <div className="mz-acts">
        {onBack ? (
          <button type="button" className="mz-ghost" onClick={onBack} disabled={busy}>
            <ChevronLeft aria-hidden="true" /> Voltar
          </button>
        ) : null}
        <button type={nextType} className="mz-btn" onClick={onNext} disabled={nextDisabled || busy}>
          {nextLabel} <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
