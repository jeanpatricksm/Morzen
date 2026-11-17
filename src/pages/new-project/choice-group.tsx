import type { LucideIcon } from "lucide-preact";
import type { Choice } from "./qualify";

interface ChoiceGroupProps {
  label: string;
  choices: Choice[];
  value: string;
  onChange: (id: string) => void;
  /** "rows" = lista com ícone e detalhe; "pills" = botões em pill. */
  variant?: "pills" | "rows";
  icons?: Record<string, LucideIcon>;
}

export function ChoiceGroup({ label, choices, value, onChange, variant = "pills", icons }: ChoiceGroupProps) {
  return (
    <fieldset className="mz-fieldset">
      <legend className="mz-legend">{label}</legend>
      <div className={variant === "rows" ? "mz-rows" : "mz-pills"} role="radiogroup" aria-label={label}>
        {choices.map((choice) => {
          const Icon = icons?.[choice.id];
          const selected = value === choice.id;
          if (variant === "rows") {
            return (
              <button
                key={choice.id}
                type="button"
                role="radio"
                aria-checked={selected}
                className={`mz-row ${selected ? "is-sel" : ""}`}
                onClick={() => onChange(choice.id)}
              >
                <span className="n">{Icon ? <Icon aria-hidden="true" /> : null}</span>
                <span>
                  <b>{choice.label}</b>
                  {choice.detail ? <small>{choice.detail}</small> : null}
                </span>
                <span className="dot" aria-hidden="true" />
              </button>
            );
          }
          return (
            <button
              key={choice.id}
              type="button"
              role="radio"
              aria-checked={selected}
              className={`mz-pill ${selected ? "is-sel" : ""}`}
              onClick={() => onChange(choice.id)}
            >
              {Icon ? <Icon aria-hidden="true" /> : null}
              {choice.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
