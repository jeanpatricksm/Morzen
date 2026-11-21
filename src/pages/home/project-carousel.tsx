import { ChevronLeft, ChevronRight } from "lucide-preact";
import { useEffect, useRef, useState } from "preact/hooks";

// Projetos em cascata animada (referência: "Loop Carousel Animation").
// Foco na capacidade; o cliente aparece só como "Exemplo · …" (AGENTS.md, regra 7).
const PROJECTS = [
  {
    id: "landing",
    tag: "Web · Presença digital",
    title: "Sites profissionais e landing pages",
    text: "Sites e landing pages com clareza, personalidade e uma presença que representa a realidade do seu negócio, com desempenho e SEO técnico.",
    example: "Exemplo · Ana Júlia Advogada",
    kind: "web" as const,
    url: "anajuliavilelaadvogada.com",
    src: "/projects/landing-ana-julia.webp",
    alt: "Landing page feita pela Morzen para Ana Júlia Advogada",
    width: 1440,
    height: 900,
    href: "https://anajuliavilelaadvogada.com/",
    cta: "Ver exemplo",
    service: "/servicos/sites-e-landing-pages",
  },
  {
    id: "ios",
    tag: "Mobile · Produtos digitais",
    title: "Apps iOS pensados para o uso real",
    text: "Aplicativos e MVPs desenhados para validar ideias com usuários reais, evoluir com evidência e acompanhar o ritmo do negócio.",
    example: "Exemplo · EOS Fit",
    kind: "ios" as const,
    url: "",
    src: "/projects/app-eos-fit.webp",
    alt: "App iOS EOS Fit feito pela Morzen exibido em um iPhone",
    width: 390,
    height: 844,
    href: "https://eosfit.com.br/",
    cta: "Ver exemplo",
    service: "/servicos/aplicativos-e-produtos-digitais",
  },
  {
    id: "dashboard",
    tag: "Operação · Gestão sob medida",
    title: "Dashboards e sistemas que substituem planilhas",
    text: "Painéis e sistemas internos construídos a partir da rotina que já existe na sua empresa, reduzindo retrabalho e deixando decisões mais claras.",
    example: "Painel sob medida · visão operacional",
    kind: "web" as const,
    url: "painel.seunegocio.com",
    src: "/dashboard_example.webp",
    alt: "Exemplo de dashboard operacional desenvolvido sob medida",
    width: 1280,
    height: 720,
    href: "/servicos/dashboards-e-interfaces",
    cta: "Conhecer o serviço",
    service: "/servicos/sistemas-internos",
  },
];

const N = PROJECTS.length;
const INTERVAL = 3600; // ms entre trocas
const EXIT = 520; // ms da saída do card da frente

export function ProjectCarousel() {
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [snapping, setSnapping] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const busy = useRef(false);

  const front = ((step % N) + N) % N;
  const current = PROJECTS[front];

  // avança: o card da frente sai pela direita, os de trás andam uma casa e ele reaparece no fundo
  const advance = () => {
    if (busy.current) return;
    if (reduced) {
      setStep((s) => s + 1);
      return;
    }
    busy.current = true;
    const leavingIdx = front;
    setLeaving(leavingIdx);
    window.setTimeout(() => {
      setSnapping(leavingIdx);
      setLeaving(null);
      setStep((s) => s + 1);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setSnapping(null);
          busy.current = false;
        }),
      );
    }, EXIT);
  };

  const goTo = (idx: number) => {
    if (busy.current) return;
    setStep((s) => s + ((idx - front + N) % N));
  };

  const back = () => goTo((front - 1 + N) % N);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const t = window.setInterval(advance, INTERVAL);
    return () => window.clearInterval(t);
  });

  return (
    <section className="mz-pc-sec" id="projetos" aria-labelledby="work-title">
      <div className="mz-wrap">
        <div className="mz-sec-center">
          <h2 id="work-title">Software que respeita o problema antes de escolher a tecnologia.</h2>
          <p>
            Mostramos o que construímos na prática, com foco na capacidade de resolver cada desafio com clareza, sem
            exagerar promessas.
          </p>
        </div>

        <div
          className="mz-pc"
          aria-roledescription="carrossel"
          aria-label="O que conseguimos fazer"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusIn={() => setPaused(true)}
          onFocusOut={() => setPaused(false)}
        >
          <div className="mz-pc-copy">
            <div key={current.id} className="mz-pc-copy-inner" aria-live={paused ? "polite" : "off"}>
              <p className="mz-feature-tag">{current.tag}</p>
              <h3>{current.title}</h3>
              <p>{current.text}</p>
              <span className="mz-pc-example">{current.example}</span>
              <div className="mz-feature-actions">
                <a
                  className="mz-btn"
                  href={current.href}
                  target={current.href.startsWith("http") ? "_blank" : undefined}
                  rel={current.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {current.cta} <ChevronRight aria-hidden="true" />
                </a>
                <a className="mz-link-inline" href={current.service}>
                  Conhecer serviço <ChevronRight aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="mz-pc-controls">
              <button type="button" className="mz-pc-arrow" aria-label="Projeto anterior" onClick={back}>
                <ChevronLeft aria-hidden="true" />
              </button>
              <div className="mz-pc-dots" role="group" aria-label="Escolher projeto">
                {PROJECTS.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    className={idx === front ? "is-on" : ""}
                    aria-label={p.title}
                    aria-pressed={idx === front}
                    onClick={() => goTo(idx)}
                  >
                    <i style={idx === front && !paused && !reduced ? { animationDuration: `${INTERVAL}ms` } : undefined} />
                  </button>
                ))}
              </div>
              <button type="button" className="mz-pc-arrow" aria-label="Próximo projeto" onClick={advance}>
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mz-pc-stage" aria-hidden="true">
            {PROJECTS.map((p, idx) => {
              const depth = (idx - front + N) % N;
              const cls = [
                "mz-pc-card",
                idx === leaving ? "is-leaving" : "",
                idx === snapping ? "is-snapping" : "",
              ].join(" ");
              return (
                <div key={p.id} className={cls} style={{ "--k": String(depth), zIndex: String(N - depth) }}>
                  {p.kind === "ios" ? (
                    <div className="mz-pc-ios">
                      <div className="mz-pc-phone">
                        <span className="mz-iphone-island" />
                        <img src={p.src} alt="" width={p.width} height={p.height} loading="lazy" decoding="async" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mz-pc-bar">
                        <i />
                        <i />
                        <i />
                        <span>{p.url}</span>
                      </div>
                      <img src={p.src} alt="" width={p.width} height={p.height} loading="lazy" decoding="async" />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
