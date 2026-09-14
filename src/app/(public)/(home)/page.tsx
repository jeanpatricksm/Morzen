import {
  ArrowUpRight,
  Blocks,
  Code2,
  Github,
  Instagram,
  Layers3,
  Linkedin,
  MessageCircle,
  PanelTop,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  defaultDescription,
  siteName,
  siteUrl,
  socialProfiles,
} from "@/lib/seo";

const pageTitle = "Construindo software em público";

export const metadata: Metadata = {
  title: pageTitle,
  description: defaultDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: `${pageTitle} | ${siteName}`,
    description: defaultDescription,
    siteName,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Morzen — software construído com transparência",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | ${siteName}`,
    description: defaultDescription,
    images: ["/og.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/favicon-192.png`,
  description: defaultDescription,
  email: "contato@morzen.com.br",
  sameAs: [
    socialProfiles.instagram,
    socialProfiles.linkedin,
    socialProfiles.github,
  ],
  founder: [
    {
      "@type": "Person",
      name: "Jean Patrick",
      sameAs: socialProfiles.jeanLinkedin,
    },
    {
      "@type": "Person",
      name: "Diego Rezende",
      sameAs: socialProfiles.diegoLinkedin,
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: siteName,
  inLanguage: "pt-BR",
  publisher: { "@id": `${siteUrl}/#organization` },
};

export default function MorzenLanding() {
  return (
    <main className="morzen-site overflow-hidden bg-[#f7f7f4] text-[#17151b]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, websiteSchema]).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <section
        id="jornada"
        className="morzen-hero-interactive relative flex min-h-[100dvh] overflow-hidden bg-[linear-gradient(115deg,#eeeaff_0%,#f7f8ff_43%,#9894ff_100%)] px-6 pt-28 text-black"
      >
        <div className="morzen-hero-field absolute -inset-[8%] bg-[radial-gradient(circle_at_18%_18%,#6848f5_0%,rgba(116,86,245,0.66)_22%,rgba(240,239,255,0.74)_48%,transparent_68%),radial-gradient(circle_at_78%_10%,rgba(119,91,255,0.72)_0%,rgba(142,128,255,0.42)_26%,transparent_52%),radial-gradient(circle_at_12%_100%,#24106f_0%,rgba(78,55,163,0.7)_19%,transparent_42%),linear-gradient(115deg,#eeeaff_0%,#f7f8ff_43%,#9894ff_100%)]" />
        <div className="morzen-hero-light absolute inset-0 bg-[radial-gradient(ellipse_at_48%_34%,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.66)_22%,rgba(255,255,255,0)_58%)]" />
        <div className="morzen-hero-deep absolute -left-24 bottom-0 h-80 w-[36rem] rounded-[45%] bg-[#06145f]/80 blur-3xl" />
        <div className="morzen-hero-violet absolute right-[-10%] top-[-14%] h-[30rem] w-[46rem] rounded-[50%] bg-[#695cff]/34 blur-3xl" />
        <div className="morzen-hero-shade absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(8,13,44,0.34)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-7rem)] w-full max-w-7xl flex-col items-center justify-center pb-20">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="morzen-hero-title text-[4.35rem] font-medium leading-none tracking-[-0.03em] text-black sm:text-[5.7rem] md:text-[6rem]">
              Morzen
            </p>
            <h1 className="morzen-hero-copy mt-8 max-w-3xl text-xl font-medium leading-8 text-black sm:text-2xl">
              Construindo sua ideia em software, com você.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-black/70 sm:text-lg">
              Desenvolvemos sites, sistemas e produtos digitais com contexto e
              transparência em cada etapa.
            </p>
            <div className="morzen-hero-actions mt-9 flex flex-col items-center gap-3 sm:flex-row">
              <Link
                href="#visao"
                className="morzen-liquid-button morzen-liquid-button-dark inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-black transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
              >
                Acompanhar nossa construção{" "}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/new_project"
                className="morzen-liquid-button morzen-liquid-button-light inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold text-black transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
              >
                Conversar sobre um projeto
              </Link>
            </div>
          </div>
          <div className="morzen-social-band w-full pb-7 text-center text-white">
            <p className="text-base font-medium text-white/95">
              Acompanhe tudo de perto
            </p>
            <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 items-center gap-8 text-white sm:grid-cols-4">
              {socialLinks.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  style={{ animationDelay: `${980 + index * 90}ms` }}
                  className="morzen-social-link mx-auto inline-flex items-center gap-3 text-lg font-semibold text-white/92 transition hover:-translate-y-1 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  <item.icon className="size-6" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="visao"
        className="morzen-section border-t border-[#17151b]/10 px-6 py-28 sm:px-10 sm:py-36 lg:px-16"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="morzen-eyebrow">Por aqui / 01</p>
              <h2 className="mt-6 max-w-lg text-4xl font-medium leading-[0.98] tracking-[-0.06em] sm:text-6xl">
                A melhor forma de conhecer a Morzen é acompanhar o caminho.
              </h2>
            </div>
            <div className="max-w-2xl lg:pt-14">
              <p className="text-2xl leading-9 tracking-[-0.03em] text-[#17151b]/80 sm:text-3xl sm:leading-10">
                Não escondemos o processo. Mostramos as decisões, as dúvidas e o
                trabalho que existe entre uma necessidade e uma solução que
                realmente funciona.
              </p>
              <div className="mt-14 grid gap-x-8 gap-y-10 border-t border-[#17151b]/12 pt-8 sm:grid-cols-2">
                {journeyCards.slice(0, 4).map((card, index) => (
                  <article
                    key={card.title}
                    className="morzen-editorial-list-item"
                  >
                    <div className="flex items-center gap-3 text-[#6445d8]">
                      <span className="text-xs font-semibold">
                        0{index + 1}
                      </span>
                      <card.icon className="size-4" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-xl font-medium tracking-[-0.03em]">
                      {card.title}
                    </h3>
                    <p className="mt-3 leading-7 text-[#17151b]/58">
                      {card.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="software"
        className="morzen-section morzen-software-section border-t border-[#17151b]/10 bg-[#ebe9f4] px-6 py-28 sm:px-10 sm:py-36 lg:px-16"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="morzen-eyebrow">O que fazemos / 02</p>
              <h2 className="mt-6 text-4xl font-medium leading-[0.98] tracking-[-0.06em] sm:text-6xl">
                Software que respeita o problema antes de escolher a tecnologia.
              </h2>
            </div>
            <Link href="/new_project" className="morzen-text-link">
              Conversar sobre um projeto{" "}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-20 grid border-y border-[#17151b]/12 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <article
                key={service.title}
                className="group border-b border-[#17151b]/12 px-1 py-8 sm:border-r sm:px-7 sm:py-10 lg:border-b-0 lg:first:pl-0 lg:last:border-r-0"
              >
                <div className="flex items-center justify-between text-[#6445d8]">
                  <span className="text-xs font-semibold">0{index + 1}</span>
                  <service.icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-16 text-2xl font-medium tracking-[-0.04em] transition-colors group-hover:text-[#6445d8]">
                  <Link href={service.href}>{service.title}</Link>
                </h3>
                <p className="mt-4 leading-7 text-[#17151b]/60">
                  {service.description}
                </p>
                <Link href={service.href} className="morzen-text-link mt-7">
                  Conhecer este serviço{" "}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="fundadores"
        className="morzen-section border-t border-[#17151b]/10 px-6 py-28 sm:px-10 sm:py-36 lg:px-16"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
            <div>
              <p className="morzen-eyebrow">Pessoas / 03</p>
              <h2 className="mt-6 max-w-lg text-4xl font-medium leading-[0.98] tracking-[-0.06em] sm:text-6xl">
                A identidade nasce de quem está construindo.
              </h2>
            </div>
            <p className="max-w-xl text-xl leading-8 text-[#17151b]/62 lg:justify-self-end">
              Jean e Diego estão presentes nas escolhas, nos detalhes e na
              dedicação que cada projeto exige. A Morzen também é essa
              construção diária.
            </p>
          </div>
          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {founders.map((founder, index) => (
              <article
                key={founder.name}
                className="group relative overflow-hidden bg-[#d9d5e6]"
              >
                <div className="relative aspect-[1.25/1] overflow-hidden">
                  <Image
                    src={founder.image}
                    alt={founder.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(23,21,27,0.65))]" />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 text-white sm:p-8">
                  <div>
                    <h3 className="text-3xl font-medium tracking-[-0.04em]">
                      {founder.name}
                    </h3>
                    <p className="mt-2 max-w-sm leading-6 text-white/75">
                      {founder.copy}
                    </p>
                    <Link
                      href={founder.profile}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex text-sm font-semibold text-white underline decoration-white/45 underline-offset-4 transition hover:decoration-white"
                    >
                      Ver perfil profissional
                    </Link>
                  </div>
                  <span className="text-xs font-semibold">0{index + 1}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="acompanhar"
        className="morzen-follow-section px-6 py-24 text-white sm:px-10 sm:py-32 lg:px-16"
      >
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <div className="morzen-follow-mark flex size-12 items-center justify-center">
              <Image
                src="/morzen_mark_white.png"
                alt=""
                width={54}
                height={40}
                className="h-auto w-[46px] object-contain"
              />
            </div>
            <p className="morzen-eyebrow mt-8 text-white/65">
              Ficar por perto / 04
            </p>
            <h2 className="mt-7 max-w-3xl text-5xl font-medium leading-[0.95] tracking-[-0.065em] sm:text-7xl">
              Acompanhe nossa construção.
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-md text-lg leading-8 text-white/60">
              Bastidores, aprendizados, rotina e projetos reais. Entre na
              conversa e veja o que estamos construindo de perto.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              <Link
                href={socialProfiles.instagram}
                target="_blank"
                rel="noreferrer"
                className="morzen-follow-link"
              >
                <Instagram className="size-4" aria-hidden="true" /> Instagram
              </Link>
              <Link
                href={socialProfiles.linkedin}
                target="_blank"
                rel="noreferrer"
                className="morzen-follow-link"
              >
                <Linkedin className="size-4" aria-hidden="true" /> LinkedIn
              </Link>
              <Link
                href={socialProfiles.github}
                target="_blank"
                rel="noreferrer"
                className="morzen-follow-link"
              >
                <Github className="size-4" aria-hidden="true" /> GitHub
              </Link>
            </div>
            <Link href="/new_project" className="morzen-follow-cta mt-10">
              Conversar sobre um projeto{" "}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/15 bg-[#201835] px-6 py-10 text-white sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link href="/" className="text-xl font-semibold">
              Morzen
            </Link>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/65">
              Produtos digitais construídos com contexto, transparência e
              proximidade.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm sm:items-end">
            <a
              href="mailto:contato@morzen.com.br"
              className="font-semibold text-white underline decoration-white/35 underline-offset-4 hover:decoration-white"
            >
              contato@morzen.com.br
            </a>
            <div className="flex flex-wrap gap-4 text-white/65">
              <Link
                href={socialProfiles.instagram}
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </Link>
              <Link
                href={socialProfiles.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </Link>
              <Link
                href={socialProfiles.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

const socialLinks = [
  {
    label: "Instagram",
    href: socialProfiles.instagram,
    icon: Instagram,
    external: true,
  },
  {
    label: "LinkedIn",
    href: socialProfiles.linkedin,
    icon: Linkedin,
    external: true,
  },
  {
    label: "GitHub",
    href: socialProfiles.github,
    icon: Github,
    external: true,
  },
  {
    label: "Conversar",
    href: "/new_project",
    icon: MessageCircle,
    external: false,
  },
];

const journeyCards = [
  {
    title: "Transparência no processo",
    description:
      "Você entende o que está sendo decidido, testado e ajustado em cada etapa.",
    icon: Layers3,
  },
  {
    title: "Conhecimento compartilhado",
    description:
      "Tecnologia, estratégia e aprendizados práticos para quem também quer construir algo próprio.",
    icon: Blocks,
  },
  {
    title: "Soluções com contexto",
    description:
      "Cada projeto parte da dor, da rotina e das particularidades de quem precisa da solução.",
    icon: Code2,
  },
  {
    title: "Uma relação próxima",
    description:
      "Clientes e pessoas que acompanham a Morzen fazem parte da conversa, não apenas do resultado.",
    icon: MessageCircle,
  },
];

const services = [
  {
    title: "Presença digital",
    description:
      "Sites e landing pages com clareza, personalidade e uma presença que representa o seu negócio.",
    href: "/servicos/sites-e-landing-pages",
    icon: PanelTop,
  },
  {
    title: "Operação mais clara",
    description:
      "Dashboards e interfaces que organizam informações para ajudar sua equipe a decidir melhor.",
    href: "/servicos/dashboards-e-interfaces",
    icon: Blocks,
  },
  {
    title: "Processos que fluem",
    description:
      "Sistemas internos que reduzem o improviso e tornam tarefas importantes mais simples.",
    href: "/servicos/sistemas-internos",
    icon: Layers3,
  },
  {
    title: "Produtos para crescer",
    description:
      "Aplicativos e produtos digitais pensados para validar, evoluir e acompanhar o seu negócio.",
    href: "/servicos/aplicativos-e-produtos-digitais",
    icon: Code2,
  },
];

const founders = [
  {
    name: "Jean Patrick",
    image: "/jean_about_pic.webp",
    alt: "Foto de Jean Patrick, fundador da Morzen",
    copy: "Produto, interface e detalhe para transformar contexto em uma experiência clara.",
    profile: socialProfiles.jeanLinkedin,
  },
  {
    name: "Diego Rezende",
    image: "/diego_about_pic.webp",
    alt: "Foto de Diego Rezende, fundador da Morzen",
    copy: "Tecnologia, execução e constância para construir algo que continue fazendo sentido.",
    profile: socialProfiles.diegoLinkedin,
  },
];
