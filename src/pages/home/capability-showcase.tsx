import { ChevronRight } from "lucide-preact";

export function CapabilityShowcase() {
  return (
    <section className="mz-features" id="projetos" aria-labelledby="work-title">
      <div className="mz-wrap">
        <div className="mz-sec-center">
          <h2 id="work-title">Software que respeita o problema antes de escolher a tecnologia.</h2>
          <p>
            Mostramos o que construímos na prática — focando na capacidade de resolver cada desafio com clareza, sem
            exagerar promessas.
          </p>
        </div>

        <div className="mz-feature-list">
          {/* Linha 1: Landing pages (texto à esquerda, mockup sobre degradê roxo à direita) */}
          <article className="mz-feature-row">
            <div className="mz-feature-copy">
              <p className="mz-feature-tag">Web · Presença digital</p>
              <h3>Sites profissionais e landing pages</h3>
              <p>
                Sites e landing pages com clareza, personalidade e uma presença que representa a realidade do seu
                negócio — com desempenho, SEO técnico e estrutura pronta para evoluir.
              </p>
              <div className="mz-feature-actions">
                <a
                  className="mz-btn"
                  href="https://anajuliavilelaadvogada.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir exemplo de landing page feita pela Morzen para Ana Júlia Advogada"
                >
                  Ver exemplo <ChevronRight aria-hidden="true" />
                </a>
                <a className="mz-link-inline" href="/servicos/sites-e-landing-pages">
                  Conhecer serviço <ChevronRight aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="mz-feature-stage">
              <img
                className="mz-stage-bg"
                src="/art/codex-backdrop.webp"
                alt=""
                width={1200}
                height={896}
                loading="lazy"
                decoding="async"
                aria-hidden="true"
              />
              <div className="mz-stage-browser">
                <div className="mz-chrome" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <span>anajuliavilelaadvogada.com</span>
                </div>
                <div className="mz-stage-screen">
                  <img
                    src="/projects/landing-ana-julia.webp"
                    alt="Landing page feita pela Morzen para Ana Júlia Advogada"
                    width={1440}
                    height={900}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <span className="mz-stage-pill">Exemplo · Ana Júlia Advogada</span>
            </div>
          </article>

          {/* Linha 2: Apps iOS (alternada — iPhone sobre degradê roxo à esquerda, texto à direita) */}
          <article className="mz-feature-row is-reverse">
            <div className="mz-feature-copy">
              <p className="mz-feature-tag">Mobile · Produtos digitais</p>
              <h3>Apps iOS pensados para o uso real</h3>
              <p>
                Aplicativos e MVPs desenhados para validar ideias com usuários reais, evoluir com evidência e acompanhar
                o ritmo do negócio — do iPhone à App Store.
              </p>
              <div className="mz-feature-actions">
                <a
                  className="mz-btn"
                  href="https://eosfit.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir exemplo do aplicativo iOS EOS Fit feito pela Morzen"
                >
                  Ver exemplo <ChevronRight aria-hidden="true" />
                </a>
                <a className="mz-link-inline" href="/servicos/aplicativos-e-produtos-digitais">
                  Conhecer serviço <ChevronRight aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="mz-feature-stage is-deep">
              <img
                className="mz-stage-bg is-flip"
                src="/art/codex-backdrop.webp"
                alt=""
                width={1200}
                height={896}
                loading="lazy"
                decoding="async"
                aria-hidden="true"
              />
              <div className="mz-stage-iphone">
                <span className="mz-iphone-island" aria-hidden="true" />
                <img
                  src="/projects/app-eos-fit.webp"
                  alt="App iOS EOS Fit feito pela Morzen exibido em um iPhone"
                  width={390}
                  height={844}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="mz-stage-pill">Exemplo · EOS Fit</span>
            </div>
          </article>

          {/* Linha 3: Dashboards e Sistemas internos */}
          <article className="mz-feature-row">
            <div className="mz-feature-copy">
              <p className="mz-feature-tag">Operação · Gestão sob medida</p>
              <h3>Dashboards e sistemas que substituem planilhas</h3>
              <p>
                Painéis de indicadores e sistemas internos construídos a partir da rotina que já existe na sua empresa —
                conectando dados espalhados, reduzindo retrabalho manual e deixando decisões mais claras.
              </p>
              <div className="mz-feature-actions">
                <a className="mz-btn" href="/new_project">
                  Conversar sobre um projeto <ChevronRight aria-hidden="true" />
                </a>
                <a className="mz-link-inline" href="/servicos/dashboards-e-interfaces">
                  Dashboards <ChevronRight aria-hidden="true" />
                </a>
                <a className="mz-link-inline" href="/servicos/sistemas-internos">
                  Sistemas <ChevronRight aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="mz-feature-stage">
              <img
                className="mz-stage-bg"
                src="/art/codex-backdrop.webp"
                alt=""
                width={1200}
                height={896}
                loading="lazy"
                decoding="async"
                aria-hidden="true"
              />
              <div className="mz-stage-browser">
                <div className="mz-chrome" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <span>painel.seunegocio.com</span>
                </div>
                <div className="mz-stage-screen">
                  <img
                    src="/dashboard_example.webp"
                    alt="Exemplo de interface de dashboard operacional desenvolvido sob medida"
                    width={1280}
                    height={720}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <span className="mz-stage-pill">Painel sob medida · Visão operacional</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
