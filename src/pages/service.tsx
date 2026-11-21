import { Check, ChevronLeft, ChevronRight, Plus } from "lucide-preact";
import { useRoute } from "preact-iso";
import { Footer } from "@/components/footer";
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
    <>
      <main id="conteudo">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />

        <article>
          <header className="mz-svc-hero">
            <div className="mz-svc-art" aria-hidden="true">
              <img src="/art/codex-sky.webp" alt="" width={1600} height={894} decoding="async" />
              <div className="mz-svc-art-veil" />
            </div>
            <div className="mz-wrap mz-svc-hero-inner">
              <a href="/#servicos" className="mz-back">
                <ChevronLeft aria-hidden="true" /> Todos os serviços
              </a>
              <div className="mz-svc-hero-grid">
                <div>
                  <p className="mz-feature-tag">Software sob medida · {service.shortTitle}</p>
                  <h1>{service.title}</h1>
                </div>
                <p className="mz-svc-intro">{service.introduction}</p>
              </div>
            </div>
          </header>

          <section className="mz-svc-sec">
            <div className="mz-wrap mz-svc-split">
              <div>
                <p className="mz-feature-tag">O que buscamos melhorar</p>
                <h2>Menos ruído entre a necessidade e o resultado.</h2>
              </div>
              <ul className="mz-svc-list">
                {service.outcomes.map((outcome) => (
                  <li key={outcome}>
                    <span className="ico" aria-hidden="true">
                      <Check />
                    </span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mz-svc-sec is-lilac">
            <div className="mz-wrap">
              <p className="mz-feature-tag">Como construímos</p>
              <h2 className="mz-svc-big">O contexto vem antes da tecnologia.</h2>
              <ol className="mz-svc-steps">
                {service.approach.map((step, index) => (
                  <li key={step}>
                    <span className="mz-step-num">0{index + 1}</span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="mz-svc-sec">
            <div className="mz-wrap mz-svc-split">
              <div>
                <p className="mz-feature-tag">Perguntas frequentes</p>
                <h2>O que costumam nos perguntar.</h2>
              </div>
              <div className="mz-faq">
                {service.faq.map((item) => (
                  <details key={item.question}>
                    <summary>
                      <span>{item.question}</span>
                      <Plus aria-hidden="true" />
                    </summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="mz-close-sec">
            <div className="mz-wrap">
              <div className="mz-close-banner">
                <img
                  className="mz-close-bg"
                  src="/art/codex-sky.webp"
                  alt=""
                  width={1600}
                  height={894}
                  loading="lazy"
                  decoding="async"
                  aria-hidden="true"
                />
                <div className="mz-close-veil" aria-hidden="true" />
                <div className="mz-close-inner">
                  <h2>Conte o que precisa funcionar melhor.</h2>
                  <p>A conversa começa pelo problema, pelo momento do negócio e por quem vai usar a solução.</p>
                  <div className="mz-close-actions">
                    <a href="/new_project" className="mz-btn-light">
                      Conversar sobre um projeto <ChevronRight aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="mz-svc-related" aria-labelledby="related-services">
            <div className="mz-wrap">
              <h2 id="related-services">Outros caminhos que podemos construir</h2>
              <nav aria-label="Outros serviços">
                {relatedServices.map((item) => (
                  <a key={item.slug} href={`/servicos/${item.slug}`}>
                    <span>{item.title}</span>
                    <ChevronRight aria-hidden="true" />
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </article>
      </main>

      <Footer />
    </>
  );
}
