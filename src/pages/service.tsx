import { Check, ChevronLeft, ChevronRight, Plus } from "lucide-preact";
import { useRoute } from "preact-iso";
import { IsoCube } from "@/components/iso";
import { areaServed, siteName, siteUrl } from "@/lib/seo";
import { getService, services } from "@/lib/services";
import { NotFound } from "./not-found";

export function ServicePage() {
  const { params } = useRoute();
  const service = getService(params.slug);

  if (!service) return <NotFound />;

  const serviceUrl = `${siteUrl}/servicos/${service.slug}`;
  const relatedServices = services.filter((item) => item.slug !== service.slug);
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${serviceUrl}#service`,
      name: service.title,
      description: service.description,
      url: serviceUrl,
      provider: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: siteName, url: siteUrl },
      areaServed,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Morzen", item: siteUrl },
        { "@type": "ListItem", position: 2, name: service.title, item: serviceUrl },
      ],
    },
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />

      <article>
        <header className="mz-svc-hero">
          <div className="mz-blob-wrap" aria-hidden="true" />
          <div className="mz-wrap">
            <a href="/#servicos" className="mz-back">
              <ChevronLeft aria-hidden="true" /> Todos os serviços
            </a>
            <div className="mz-svc-hero-grid">
              <div>
                <p className="mz-eyebrow">Software sob medida · {service.shortTitle}</p>
                <h1>{service.title}</h1>
              </div>
              <p className="mz-svc-intro">{service.introduction}</p>
            </div>
          </div>
          <svg className="mz-svc-cube" viewBox="-80 -90 160 160" aria-hidden="true">
            <g className="mz-bob">
              <IsoCube x={-0.5} y={-0.5} z={-0.5} size={64} color="v" label="MZ" />
            </g>
          </svg>
        </header>

        <section className="mz-svc-sec">
          <div className="mz-wrap mz-svc-split">
            <div>
              <p className="mz-eyebrow">O que buscamos melhorar</p>
              <h2 className="mz-ital">Menos ruído entre a necessidade e o resultado.</h2>
            </div>
            <ul className="mz-svc-list">
              {service.outcomes.map((outcome) => (
                <li key={outcome}>
                  <span className="ico">
                    <Check aria-hidden="true" />
                  </span>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mz-svc-sec is-lilac">
          <div className="mz-wrap">
            <p className="mz-eyebrow">Como construímos</p>
            <h2 className="mz-svc-big">O contexto vem antes da tecnologia.</h2>
            <ol className="mz-svc-steps">
              {service.approach.map((step, index) => (
                <li key={step}>
                  <span>0{index + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mz-svc-sec">
          <div className="mz-wrap mz-svc-split">
            <div>
              <p className="mz-eyebrow">Perguntas frequentes</p>
              <h2 className="mz-ital">O que costumam nos perguntar.</h2>
            </div>
            <div className="mz-faq">
              {service.faq.map((item) => (
                <details key={item.question}>
                  <summary>
                    {item.question}
                    <Plus aria-hidden="true" />
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="mz-svc-cta">
          <div className="mz-wrap">
            <p className="mz-eyebrow">Próximo passo</p>
            <h2 className="mz-ital">Conte o que precisa funcionar melhor.</h2>
            <p>A conversa começa pelo problema, pelo momento do negócio e por quem vai usar a solução.</p>
            <a href="/new_project" className="mz-btn">
              Conversar sobre um projeto <ChevronRight aria-hidden="true" />
            </a>
          </div>
        </section>

        <aside className="mz-svc-related" aria-labelledby="related-services">
          <div className="mz-wrap">
            <h2 id="related-services">Outros caminhos que podemos construir</h2>
            <nav>
              {relatedServices.map((item) => (
                <a key={item.slug} href={`/servicos/${item.slug}`}>
                  {item.title}
                  <ChevronRight aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </article>
      <Footer />
    </main>
  );
}

export function Footer() {
  return (
    <footer className="mz-footer">
      <div className="mz-wrap">
        <span>
          © {new Date().getFullYear()} Morzen · Produtos digitais construídos com contexto, transparência e
          proximidade. · <a href="mailto:contato@morzen.com.br">contato@morzen.com.br</a>
        </span>
      </div>
    </footer>
  );
}
