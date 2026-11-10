import { ChevronRight } from "lucide-react";
import type { Choice } from "../qualify";

interface ChoiceGroupProps {
  label: string;
  choices: Choice[];
  value: string;
  onChange: (id: string) => void;
  columns?: string;
  compact?: boolean;
}

export function ChoiceGroup({
  label,
  choices,
  value,
  onChange,
  columns = "sm:grid-cols-2",
  compact = false,
}: ChoiceGroupProps) {
  return (
    <fieldset className="w-full">
      <legend className="morzen-field-label text-[0.85rem] font-semibold text-black/75">{label}</legend>
      <div role="radiogroup" className={`mt-2 grid gap-2.5 ${columns}`}>
        {choices.map((choice, index) => (
          <button
            key={choice.id}
            type="button"
            role="radio"
            aria-checked={value === choice.id}
            onClick={() => onChange(choice.id)}
            className="morzen-choice"
          >
            {!compact && (
              <span className="morzen-choice-index">0{index + 1}</span>
            )}
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="morzen-choice-label">{choice.label}</span>
              {choice.detail && (
                <span className="morzen-choice-detail">
                  {choice.detail}
                </span>
              )}
            </span>
            {!compact && (
              <ChevronRight className="morzen-choice-arrow size-4" aria-hidden="true" />
            )}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
