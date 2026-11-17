import { BookOpen, Eye, HeartHandshake, Puzzle } from "lucide-preact";
import { useEffect, useState } from "preact/hooks";

// Os 4 pilares orbitam o gradiente do manifesto; o ativo aparece no centro.
const PILLARS = [
  {
    word: "Transparência",
    title: "Transparência no processo",
    description: "Você entende o que está sendo decidido, testado e ajustado em cada etapa.",
    icon: Eye,
  },
  {
    word: "Conhecimento",
    title: "Conhecimento compartilhado",
    description: "Tecnologia, estratégia e aprendizados práticos para quem também quer construir algo próprio.",
    icon: BookOpen,
  },
  {
    word: "Contexto",
    title: "Soluções com contexto",
    description: "Cada projeto parte da dor, da rotina e das particularidades de quem precisa da solução.",
    icon: Puzzle,
  },
  {
    word: "Proximidade",
    title: "Uma relação próxima",
    description: "Clientes e pessoas que acompanham a Morzen fazem parte da conversa, não apenas do resultado.",
    icon: HeartHandshake,
  },
];

export function ManifestoOrbit() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // depois que a pessoa escolhe um pilar (ou prefere menos movimento), não troca mais sozinho
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setManual(true);
  }, []);

  useEffect(() => {
    if (paused || manual) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % PILLARS.length), 3800);
    return () => window.clearInterval(id);
  }, [paused, manual]);

  const current = PILLARS[active];

  return (
    <div
      className={`mz-orbit ${paused ? "is-paused" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mz-orbit-blob" aria-hidden="true" />
      <div className="mz-orbit-ring" aria-hidden="true" />

      <div className="mz-orbit-center" aria-live="polite">
        <span className="n">0{active + 1} / 04</span>
        <p key={current.word} className="mz-orbit-copy">
          <b>{current.title}</b>
          <span className="d">{current.description}</span>
        </p>
      </div>

      <ul className="mz-orbit-track" aria-label="Como a Morzen trabalha">
        {PILLARS.map(({ word, icon: Icon }, i) => (
          <li key={word} style={`--a: ${i * 90 - 90}deg`}>
            <button
              type="button"
              className={`mz-orbit-chip ${i === active ? "is-on" : ""}`}
              onClick={() => {
                setActive(i);
                setManual(true);
              }}
              onFocus={() => {
                setActive(i);
                setPaused(true);
              }}
              onBlur={() => setPaused(false)}
              aria-pressed={i === active}
            >
              <span className="ico">
                <Icon aria-hidden="true" />
              </span>
              {word}
            </button>
          </li>
        ))}
      </ul>
      <p key={`m-${current.word}`} className="mz-orbit-mdesc">
        {current.description}
      </p>
    </div>
  );
}
