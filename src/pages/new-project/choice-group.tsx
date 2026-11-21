import type { LucideIcon } from "lucide-preact";
import type { Choice } from "./qualify";

interface ChoiceGroupProps {
  name: string;
  label: string;
  optional?: boolean;
  choices: Choice[];
  value: string;
  onChange: (id: string) => void;
  /** "rows" = lista com ícone e detalhe; "pills" = botões em pill. */
  variant?: "pills" | "rows";
  icons?: Record<string, LucideIcon>;
}

export function ChoiceGroup({
  name,
  label,
  optional,
  choices,
  value,
  onChange,
  variant = "pills",
  icons,
}: ChoiceGroupProps) {
  return (
    <fieldset className="mz-fieldset">
      <legend className="mz-legend">
        {label} {optional ? <i>opcional</i> : null}
      </legend>
      <div className={variant === "rows" ? "mz-rows" : "mz-pills"}>
        {choices.map((choice) => {
          const Icon = icons?.[choice.id];
          const selected = value === choice.id;
          if (variant === "rows") {
            return (
              <label key={choice.id} className={`mz-row ${selected ? "is-sel" : ""}`}>
                <input
                  className="sr-only"
                  type="radio"
                  name={name}
                  value={choice.id}
                  checked={selected}
                  onChange={() => onChange(choice.id)}
                />
                <span className="n" aria-hidden="true">
                  {Icon ? <Icon /> : null}
                </span>
                <span>
                  <b>{choice.label}</b>
                  {choice.detail ? <small>{choice.detail}</small> : null}
                </span>
                <span className="dot" aria-hidden="true" />
              </label>
            );
          }
          return (
            <label key={choice.id} className={`mz-pill ${selected ? "is-sel" : ""}`}>
              <input
                className="sr-only"
                type="radio"
                name={name}
                value={choice.id}
                checked={selected}
                onChange={() => onChange(choice.id)}
              />
              {Icon ? <Icon aria-hidden="true" /> : null}
              <span>{choice.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
