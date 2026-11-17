import { ChevronRight, Globe, Rocket, Smartphone } from "lucide-preact";
import { useEffect, useRef } from "preact/hooks";
import { IsoCube } from "@/components/iso";

// Foco na capacidade ("o que fazemos"), não no cliente. Ver AGENTS.md.
export function WorkStack() {
  const stackRef = useRef<HTMLDivElement>(null);

  // o card de trás encolhe e escurece quando o próximo chega
  useEffect(() => {
    const cards = Array.from(stackRef.current?.querySelectorAll<HTMLElement>(".mz-card") ?? []);
    let frame = 0;
    const update = () =>
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const d = next.getBoundingClientRect().top - card.getBoundingClientRect().top;
        const t = Math.min(1, Math.max(0, 1 - d / card.offsetHeight));
        card.style.transform = `scale(${1 - t * 0.06})`;
        card.style.filter = `brightness(${1 - t * 0.12})`;
      });
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(() => ((frame = 0), update()));
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="mz-work" id="projetos" aria-labelledby="work-title">
      <div className="mz-wrap mz-work-head">
        <small>
          <Rocket aria-hidden="true" /> O que fazemos
        </small>
        <h2 id="work-title" className="mz-ital">
          Software que respeita o problema antes de escolher a tecnologia.
        </h2>
      </div>

      <div className="mz-wrap mz-stack" ref={stackRef}>
        <article className="mz-card" style="--i: 0">
          <div className="info">
            <span className="mz-num">
              <Globe aria-hidden="true" /> 01
            </span>
            <div className="mz-meta">
              <span>O que fazemos</span>
              <span>Web</span>
            </div>
            <h3 className="mz-ital">Landing pages</h3>
            <p>
              Sites e landing pages com clareza, personalidade e uma presença que representa o seu
              negócio.
            </p>
            <a
              className="mz-case"
              href="https://anajuliavilelaadvogada.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver exemplo <ChevronRight aria-hidden="true" />
            </a>
          </div>
          <div className="mz-shot">
            <img className="mz-fill" src="/projects/landing-ana-julia.webp" alt="Landing page feita pela Morzen para Ana Júlia Advogada" width={1440} height={900} loading="lazy" decoding="async" />
            <span className="mz-tag">
              <Globe aria-hidden="true" /> Exemplo · Ana Júlia Advogada
            </span>
          </div>
        </article>

        <article className="mz-card" style="--i: 1">
          <div className="info">
            <span className="mz-num">
              <Smartphone aria-hidden="true" /> 02
            </span>
            <div className="mz-meta">
              <span>O que fazemos</span>
              <span>Mobile</span>
            </div>
            <h3 className="mz-ital">Apps iOS</h3>
            <p>
              Aplicativos e produtos digitais pensados para validar, evoluir e acompanhar o seu
              negócio — do iPhone à App Store.
            </p>
            <a className="mz-case" href="https://eosfit.com.br/" target="_blank" rel="noopener noreferrer">
              Ver exemplo <ChevronRight aria-hidden="true" />
            </a>
          </div>
          <div className="mz-shot is-phone">
            <img src="/projects/app-eos-fit.webp" alt="App iOS EOS Fit feito pela Morzen" width={390} height={844} loading="lazy" decoding="async" />
            <span className="mz-tag">
              <Smartphone aria-hidden="true" /> Exemplo · EOS Fit
            </span>
          </div>
        </article>

        <article className="mz-card" style="--i: 2">
          <div className="info">
            <span className="mz-num">
              <Rocket aria-hidden="true" /> 03
            </span>
            <div className="mz-meta">
              <span>Próximo</span>
              <span>Seu projeto</span>
            </div>
            <h3 className="mz-ital">O próximo pode ser o seu.</h3>
            <p>Sistemas, sites e aplicativos para empresas, construídos com você — com contexto e transparência em cada etapa.</p>
            <a className="mz-case" href="/new_project">
              Conversar sobre um projeto <ChevronRight aria-hidden="true" />
            </a>
          </div>
          <div className="mz-shot is-cta" aria-hidden="true">
            <svg viewBox="-80 -90 160 160">
              <g className="mz-bob">
                <IsoCube x={-0.5} y={-0.5} z={-0.5} size={70} color="v" label="MZ" />
              </g>
            </svg>
          </div>
        </article>
      </div>
    </section>
  );
}
