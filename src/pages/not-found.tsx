import { ChevronRight } from "lucide-preact";
import { IsoCube } from "@/components/iso";

export function NotFound() {
  return (
    <main className="mz-404">
      <svg viewBox="-110 -130 220 200" aria-hidden="true">
        <g className="mz-bob">
          <IsoCube x={-1} y={-0.5} z={-0.6} size={50} color="d" label="4" />
          <IsoCube x={0} y={-0.5} z={-0.6} size={50} color="v" label="0" />
          <g className="mz-pop">
            <IsoCube x={-0.5} y={-0.5} z={0.9} size={50} color="l" label="4" />
          </g>
        </g>
      </svg>
      <h1 className="mz-ital">Essa peça não encaixou.</h1>
      <p>A página que você procurou não existe ou mudou de lugar.</p>
      <a className="mz-btn" href="/">
        Voltar ao início <ChevronRight aria-hidden="true" />
      </a>
    </main>
  );
}
