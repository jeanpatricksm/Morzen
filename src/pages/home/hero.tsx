import { ChevronRight } from "lucide-preact";
import { Github, Instagram, Linkedin } from "@/components/brand-icons";
import { useEffect, useRef, useState } from "preact/hooks";
import { IsoCube, type IsoColor } from "@/components/iso";
import { socialProfiles } from "@/lib/seo";

// Pilha "building blocks da web": camadas de um produto + bloco MZ encaixando no topo.
const STACK: [number, number, IsoColor, string][] = [
  [0, 0, "d", "DB"],
  [1, 0, "v", "API"],
  [2, 0, "d", "AUTH"],
  [0.5, 1, "l", "UI"],
  [1.5, 1, "v", "DATA"],
];

const SINGLES: { size: number; color: IsoColor; label: string; depth: number; left: string; top: string }[] = [
  { size: 44, color: "v", label: "01", depth: 18, left: "14%", top: "16%" },
  { size: 38, color: "l", label: "›", depth: 26, left: "70%", top: "6%" },
  { size: 46, color: "d", label: "</>", depth: 14, left: "82%", top: "20%" },
  { size: 30, color: "l", label: "", depth: 34, left: "28%", top: "4%" },
];

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const stackRef = useRef<SVGGElement>(null);
  const [size, setSize] = useState(56);
  const [top, setTop] = useState<number | null>(null);

  // tamanho dos blocos acompanha a largura da tela
  useEffect(() => {
    const onResize = () => setSize(Math.max(36, Math.min(72, window.innerWidth * 0.05)));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // apoia a base da pilha no topo do "MORZEN" (nada pode tampar o nome)
  useEffect(() => {
    const seat = () => {
      const h1 = h1Ref.current;
      const g = stackRef.current;
      if (!h1 || !g) return;
      const bb = g.getBBox();
      const W = size * 6;
      setTop(h1.offsetTop + h1.offsetHeight * 0.1 - 30 - (bb.y + bb.height + W / 2));
    };
    seat();
    document.fonts?.ready.then(seat);
    window.addEventListener("resize", seat);
    return () => window.removeEventListener("resize", seat);
  }, [size]);

  // parallax: só atualiza variáveis CSS (sem re-renderizar), no máximo 1x por quadro
  useEffect(() => {
    const el = heroRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        el.style.setProperty("--mx", String(e.clientX / window.innerWidth - 0.5));
        el.style.setProperty("--my", String(e.clientY / window.innerHeight - 0.5));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const W = size * 6;

  return (
    <section className="mz-wrap" aria-labelledby="hero-title">
      <div className="mz-hero" ref={heroRef}>
        <div className="mz-orb" aria-hidden="true" />
        <h1 id="hero-title" ref={h1Ref} className="mz-anton">
          Morzen<sup>®</sup>
          <span className="sr-only"> — sistemas, sites e aplicativos para empresas, construídos com você</span>
        </h1>
        <div className="mz-scene" aria-hidden="true">
          <svg
            className="mz-iso"
            width={W}
            height={W}
            viewBox={`${-W / 2} ${-W / 2} ${W} ${W}`}
            style={{
              left: "50%",
              marginLeft: `${-W / 2}px`,
              top: `${top ?? 0}px`,
              opacity: top === null ? 0 : 1,
              "--d": "8",
            }}
          >
            <g className="mz-bob" ref={stackRef}>
              {STACK.map(([x, z, c, l]) => (
                <IsoCube key={l} x={x - 1.5} y={-0.5} z={z - 1.2} size={size} color={c} label={l} />
              ))}
              <g className="mz-pop">
                <IsoCube x={-0.5} y={-0.5} z={1.15} size={size} color="v" label="MZ" />
              </g>
            </g>
          </svg>
          {SINGLES.map((c, i) => (
            <svg
              key={c.left}
              className="mz-iso is-single"
              width={c.size * 2}
              height={c.size * 2.2}
              viewBox={`${-c.size} ${-c.size * 1.2} ${c.size * 2} ${c.size * 2.2}`}
              style={{ left: c.left, top: c.top, "--d": String(c.depth) }}
            >
              <g className="mz-bob" style={{ animationDelay: `${-i * 1.3}s`, animationDuration: `${5 + i}s` }}>
                <IsoCube x={-0.5} y={-0.5} z={-0.5} size={c.size} color={c.color} label={c.label} />
              </g>
            </svg>
          ))}
          <div className="mz-glass" style={{ width: "74px", height: "74px", left: "22%", top: "24%" }} />
          <div className="mz-glass" style={{ width: "60px", height: "60px", left: "62%", top: "22%" }} />
        </div>
      </div>
      <div className="mz-hero-sub mz-rise mz-r2">
        <p>Sistemas, sites e aplicativos para empresas, construídos com você.</p>
        <p className="mz-hero-lead">
          Desenvolvemos sites, sistemas e produtos digitais com contexto e transparência em cada etapa.
          Atendemos todo o Brasil e, presencialmente, o Vale do Paraíba.
        </p>
      </div>
      <div className="mz-hero-foot mz-rise mz-r3">
        <span aria-hidden="true" />
        <a className="mz-btn" href="/new_project">
          Conversar sobre um projeto <ChevronRight aria-hidden="true" />
        </a>
        <div className="mz-socials">
          <a href={socialProfiles.instagram} target="_blank" rel="noopener noreferrer">
            <Instagram aria-hidden="true" /> Instagram
          </a>
          <a href={socialProfiles.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin aria-hidden="true" /> LinkedIn
          </a>
          <a href={socialProfiles.github} target="_blank" rel="noopener noreferrer">
            <Github aria-hidden="true" /> GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
