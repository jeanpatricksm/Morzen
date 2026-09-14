import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services } from "@/lib/services";
import { siteName, siteUrl } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return {};

  const url = `/servicos/${service.slug}`;

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url,
      title: `${service.title} | ${siteName}`,
      description: service.description,
      siteName,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "Morzen — software sob medida, construído com transparência",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | ${siteName}`,
      description: service.description,
      images: ["/og.png"],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

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
      provider: {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
      },
      areaServed: "BR",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Morzen",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: service.title,
          item: serviceUrl,
        },
      ],
    },
  ];

  return (
    <main className="morzen-site bg-[#f7f7f4] text-[#17151b]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />

      <article>
        <header className="morzen-editorial-hero border-b border-[#17151b]/10 px-6 pb-24 pt-36 sm:px-10 sm:pb-32 sm:pt-44 lg:px-16">
          <div className="mx-auto max-w-[1440px]">
            <Link href="/#software" className="morzen-text-link">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Todos os serviços
            </Link>
            <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-24">
              <div>
                <p className="morzen-eyebrow">Software sob medida</p>
                <h1 className="mt-6 max-w-4xl text-5xl font-medium leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[5.5rem]">
                  {service.title}
                </h1>
              </div>
              <p className="max-w-xl text-xl leading-8 text-[#17151b]/65 lg:justify-self-end">
                {service.introduction}
              </p>
            </div>
          </div>
        </header>

        <section className="border-b border-[#17151b]/10 px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
          <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div>
              <p className="morzen-eyebrow">O que buscamos melhorar</p>
              <h2 className="mt-6 max-w-md text-4xl font-medium leading-[1.02] tracking-[-0.04em] sm:text-5xl">
                Menos ruído entre a necessidade e o resultado.
              </h2>
            </div>
            <ul className="border-t border-[#17151b]/12">
              {service.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex items-start gap-4 border-b border-[#17151b]/12 py-6 text-xl leading-8"
                >
                  <Check
                    className="mt-1 size-5 shrink-0 text-[#6445d8]"
                    aria-hidden="true"
                  />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-[#ebe9f4] px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
          <div className="mx-auto max-w-[1440px]">
            <p className="morzen-eyebrow">Como construímos</p>
            <h2 className="mt-6 max-w-3xl text-4xl font-medium leading-[1.02] tracking-[-0.04em] sm:text-5xl">
              O contexto vem antes da tecnologia.
            </h2>
            <ol className="mt-14 grid border-y border-[#17151b]/12 md:grid-cols-3">
              {service.approach.map((step, index) => (
                <li
                  key={step}
                  className="border-b border-[#17151b]/12 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
                >
                  <span className="text-xs font-semibold text-[#6445d8]">
                    0{index + 1}
                  </span>
                  <p className="mt-8 text-lg leading-8 text-[#17151b]/70">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <p className="morzen-eyebrow">Próximo passo</p>
              <h2 className="mt-6 max-w-3xl text-5xl font-medium leading-[0.98] tracking-[-0.04em] sm:text-6xl">
                Conte o que precisa funcionar melhor.
              </h2>
            </div>
            <div className="lg:justify-self-end">
              <p className="max-w-md text-lg leading-8 text-[#17151b]/62">
                A conversa começa pelo problema, pelo momento do negócio e por
                quem vai usar a solução.
              </p>
              <Link
                href="/new_project"
                className="morzen-editorial-button morzen-editorial-button-primary mt-8"
              >
                Conversar sobre um projeto
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <aside
          className="border-t border-[#17151b]/10 px-6 py-16 sm:px-10 lg:px-16"
          aria-labelledby="related-services"
        >
          <div className="mx-auto max-w-[1440px]">
            <h2 id="related-services" className="text-sm font-semibold">
              Outros caminhos que podemos construir
            </h2>
            <nav className="mt-8 flex flex-col border-t border-[#17151b]/12">
              {relatedServices.map((item) => (
                <Link
                  key={item.slug}
                  href={`/servicos/${item.slug}`}
                  className="flex items-center justify-between gap-5 border-b border-[#17151b]/12 py-5 text-lg transition hover:text-[#6445d8]"
                >
                  {item.title}
                  <ArrowUpRight
                    className="size-4 shrink-0"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </nav>
          </div>
        </aside>
      </article>
    </main>
  );
}
