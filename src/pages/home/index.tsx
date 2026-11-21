import {
  Blocks,
  BookOpen,
  ChevronRight,
  Eye,
  HeartHandshake,
  Layers3,
  PanelTop,
  Puzzle,
  Smartphone,
} from "lucide-preact";
import { Github, Instagram, Linkedin } from "@/components/brand-icons";
import { Footer } from "@/components/footer";
import { areaServed, defaultDescription, siteName, siteUrl, socialProfiles } from "@/lib/seo";
import { ProjectCarousel } from "./project-carousel";
import { Hero } from "./hero";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/favicon-192.png`,
  description: defaultDescription,
  email: "contato@morzen.com.br",
  areaServed,
  sameAs: [socialProfiles.instagram, socialProfiles.linkedin, socialProfiles.github],
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

const SERVICES = [
  {
    title: "Presença digital",
    subtitle: "Sites e landing pages",
    description: "Sites e landing pages com clareza, personalidade e uma presença que representa o seu negócio.",
    href: "/servicos/sites-e-landing-pages",
    icon: PanelTop,
  },
  {
    title: "Operação mais clara",
    subtitle: "Dashboards e painéis",
    description: "Dashboards e interfaces que organizam informações para ajudar sua equipe a decidir melhor.",
    href: "/servicos/dashboards-e-interfaces",
    icon: Blocks,
  },
  {
    title: "Processos que fluem",
    subtitle: "Sistemas de gestão",
    description: "Sistemas internos que reduzem o improviso e tornam tarefas importantes mais simples.",
    href: "/servicos/sistemas-internos",
    icon: Layers3,
  },
  {
    title: "Produtos para crescer",
    subtitle: "Aplicativos e MVPs",
    description: "Aplicativos e produtos digitais pensados para validar, evoluir e acompanhar o seu negócio.",
    href: "/servicos/aplicativos-e-produtos-digitais",
    icon: Smartphone,
  },
];

const PILLARS = [
  {
    title: "Transparência no processo",
    description: "Você entende o que está sendo decidido, testado e ajustado em cada etapa.",
    icon: Eye,
  },
  {
    title: "Conhecimento compartilhado",
    description: "Tecnologia, estratégia e aprendizados práticos para quem também quer construir algo próprio.",
    icon: BookOpen,
  },
  {
    title: "Soluções com contexto",
    description: "Cada projeto parte da dor, da rotina e das particularidades de quem precisa da solução.",
    icon: Puzzle,
  },
  {
    title: "Uma relação próxima",
    description: "Clientes e pessoas que acompanham a Morzen fazem parte da conversa, não apenas do resultado.",
    icon: HeartHandshake,
  },
];

const FOUNDERS = [
  {
    name: "Jean Patrick",
    image: "/jean_about_pic.webp",
    width: 420,
    height: 424,
    alt: "Foto de Jean Patrick, fundador da Morzen",
    role: "Produto & interface",
    copy: "Produto, interface e detalhe para transformar contexto em uma experiência clara.",
    profile: socialProfiles.jeanLinkedin,
  },
  {
    name: "Diego Rezende",
    image: "/diego_about_pic.webp",
    width: 420,
    height: 525,
    alt: "Foto de Diego Rezende, fundador da Morzen",
    role: "Tecnologia & execução",
    copy: "Tecnologia, execução e constância para construir algo que continue fazendo sentido.",
    profile: socialProfiles.diegoLinkedin,
  },
];

export function Home() {
  return (
    <>
      <main id="conteudo">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema]).replace(/</g, "\\u003c"),
          }}
        />

        <Hero />

        {/* SERVIÇOS — ritmo Codex "Começar" */}
        <section className="mz-services-sec" id="servicos" aria-labelledby="services-title">
          <div className="mz-wrap">
            <div className="mz-sec-center">
              <h2 id="services-title">Caminhos que construímos com você</h2>
              <p>
                Quatro frentes sob medida — cada página explica o que buscamos melhorar, como trabalhamos e as dúvidas
                mais comuns antes de começar.
              </p>
            </div>

            <div className="mz-services-cards">
              {SERVICES.map(({ title, subtitle, description, href, icon: Icon }) => (
                <article key={href} className="mz-svc-card">
                  <div className="mz-svc-card-top">
                    <span className="mz-svc-card-ico" aria-hidden="true">
                      <Icon />
                    </span>
                    <span className="mz-svc-card-sub">{subtitle}</span>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                  <a className="mz-svc-card-btn" href={href}>
                    Conhecer este serviço <ChevronRight aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CAPACIDADES — linhas alternadas sobre degradês roxos atmosféricos */}
        <ProjectCarousel />

        {/* MANIFESTO — faixa escura limpa em roxo profundo */}
        <section className="mz-manifesto-sec" aria-labelledby="manifesto-title">
          <div className="mz-wrap">
            <div className="mz-manifesto-head">
              <p className="mz-manifesto-kicker">A melhor forma de conhecer a Morzen é acompanhar o caminho.</p>
              <h2 id="manifesto-title">Não escondemos o processo</h2>
              <p className="mz-manifesto-lead">
                Mostramos as decisões, as dúvidas e o trabalho que existe entre uma necessidade e uma solução que
                realmente funciona.
              </p>
            </div>

            <ul className="mz-manifesto-grid" aria-label="Como a Morzen trabalha">
              {PILLARS.map(({ title, description, icon: Icon }) => (
                <li key={title}>
                  <span className="mz-manifesto-ico" aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FUNDADORES */}
        <section className="mz-founders-sec" id="fundadores" aria-labelledby="founders-title">
          <div className="mz-wrap">
            <div className="mz-sec-center">
              <h2 id="founders-title">A identidade nasce de quem está construindo.</h2>
              <p>
                A Morzen também é essa construção diária. Jean e Diego estão presentes nas escolhas, nos detalhes e na
                dedicação que cada projeto exige.
              </p>
            </div>

            <div className="mz-founders-grid">
              {FOUNDERS.map((founder) => (
                <article key={founder.name} className="mz-founder-card">
                  <div className="mz-founder-photo">
                    <img
                      src={founder.image}
                      alt={founder.alt}
                      width={founder.width}
                      height={founder.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="mz-founder-info">
                    <p className="mz-founder-role">{founder.role}</p>
                    <h3>{founder.name}</h3>
                    <p className="mz-founder-bio">{founder.copy}</p>
                    <a
                      className="mz-link-inline"
                      href={founder.profile}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver perfil profissional de ${founder.name} no LinkedIn`}
                    >
                      <Linkedin aria-hidden="true" /> Ver perfil profissional <ChevronRight aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FECHAMENTO ATMOSFÉRICO */}
        <section className="mz-close-sec" aria-labelledby="close-title">
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
                <div className="mz-hero-badge is-sm" aria-hidden="true">
                  <img src="/morzen_mark.png" alt="" width={28} height={18} />
                </div>
                <h2 id="close-title">Acompanhe nossa construção.</h2>
                <p>
                  Bastidores, aprendizados, rotina e projetos reais. Entre na conversa pelas redes ou conte o que o seu
                  negócio precisa resolver.
                </p>
                <div className="mz-close-actions">
                  <a className="mz-btn-light" href="/new_project">
                    Conversar sobre um projeto <ChevronRight aria-hidden="true" />
                  </a>
                  <div className="mz-close-socials">
                    <a
                      className="mz-btn-glass"
                      href={socialProfiles.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram aria-hidden="true" /> Instagram
                    </a>
                    <a
                      className="mz-btn-glass"
                      href={socialProfiles.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin aria-hidden="true" /> LinkedIn
                    </a>
                    <a className="mz-btn-glass" href={socialProfiles.github} target="_blank" rel="noopener noreferrer">
                      <Github aria-hidden="true" /> GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
