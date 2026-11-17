import { Blocks, ChevronRight, Layers3, PanelTop, Smartphone } from "lucide-preact";
import { Github, Instagram, Linkedin } from "@/components/brand-icons";
import { Hero } from "./hero";
import { ManifestoOrbit } from "./manifesto-orbit";
import { WorkStack } from "./work-stack";
import { areaServed, defaultDescription, siteName, siteUrl, socialProfiles } from "@/lib/seo";

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

export function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD estático
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, websiteSchema]).replace(/</g, "\\u003c"),
        }}
      />

      <Hero />

      {/* MANIFESTO */}
      <section className="mz-manifesto" aria-labelledby="manifesto-title">
        <div className="mz-blob-wrap" aria-hidden="true" />
        <div className="mz-m-grid" aria-hidden="true" />
        <div className="mz-wrap">
          <div className="mz-rail">
            <a href={socialProfiles.instagram} target="_blank" rel="noopener noreferrer">
              INSTAGRAM
            </a>
            <a href={socialProfiles.linkedin} target="_blank" rel="noopener noreferrer">
              LINKEDIN
            </a>
          </div>
          <div className="mz-m-copy">
            <small>A melhor forma de conhecer a Morzen é acompanhar o caminho.</small>
            <h2 id="manifesto-title">
              Não
              <br />
              escondemos
              <br />o processo
            </h2>
            <p>
              Mostramos as decisões, as dúvidas e o trabalho que existe entre uma necessidade e uma
              solução que realmente funciona.
            </p>
          </div>
          <ManifestoOrbit />
        </div>
      </section>

      <WorkStack />

      {/* SERVIÇOS */}
      <section className="mz-services" id="servicos" aria-label="Serviços">
        <div className="mz-wrap">
          {services.map(({ title, description, href, icon: Icon }) => (
            <a key={href} className="mz-service" href={href}>
              <span className="ico">
                <Icon aria-hidden="true" />
              </span>
              <b>{title}</b>
              <p>{description}</p>
              <span className="more">
                Conhecer este serviço <ChevronRight aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* FUNDADORES */}
      <section className="mz-collage" id="fundadores" aria-labelledby="founders-title">
        <div className="mz-wrap" style={{ padding: "0" }}>
          <div className="mz-c-grid">
            <div className="mz-half" aria-hidden="true">
              <div className="mz-ph is-tint">
                <img className="mz-fill" src="/projects/app-eos-fit-desktop.webp" alt="" loading="lazy" decoding="async" />
              </div>
            </div>
            <div className="mz-c-head">
              <h2 id="founders-title" className="mz-ital">
                A identidade
                <br />
                nasce de quem
                <br />
                está construindo.
              </h2>
            </div>
            <div className="mz-half" aria-hidden="true">
              <div className="mz-ph is-tint2">
                <img className="mz-fill" src="/projects/landing-ana-julia.webp" alt="" loading="lazy" decoding="async" />
              </div>
            </div>

            <div className="mz-quote">
              <p className="q mz-ital">A Morzen também é essa construção diária.</p>
              <p className="by">Jean &amp; Diego</p>
            </div>
            <div className="mz-badge-cell">
              <span className="mz-vert">FUNDADORES</span>
              <a className="mz-badge" href="/new_project">
                Conversar
                <br />
                sobre um
                <br />
                projeto
              </a>
            </div>
            <div className="mz-quote">
              <p>
                Jean e Diego estão presentes nas escolhas, nos detalhes e na dedicação que cada
                projeto exige.
              </p>
            </div>

            <Founder founder={founders[0]} />
            <div className="mz-statement">
              <h2 className="mz-ital">
                <sup>*</sup>Acompanhe
                <br />
                nossa construção.
              </h2>
              <p>Bastidores, aprendizados, rotina e projetos reais. Entre na conversa e veja o que estamos construindo de perto.</p>
              <a className="mz-btn mz-btn-sq" href="/new_project">
                Conversar sobre um projeto <ChevronRight aria-hidden="true" />
              </a>
            </div>
            <Founder founder={founders[1]} />
          </div>
        </div>
      </section>

      <footer className="mz-footer">
        <div className="mz-wrap">
          <span>
            © {new Date().getFullYear()} Morzen · Produtos digitais construídos com contexto, transparência e
            proximidade. · <a href="mailto:contato@morzen.com.br">contato@morzen.com.br</a>
          </span>
          <nav aria-label="Redes sociais">
            <a href={socialProfiles.instagram} target="_blank" rel="noopener noreferrer">
              <Instagram aria-hidden="true" /> Instagram
            </a>
            <a href={socialProfiles.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin aria-hidden="true" /> LinkedIn
            </a>
            <a href={socialProfiles.github} target="_blank" rel="noopener noreferrer">
              <Github aria-hidden="true" /> GitHub
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}

function Founder({ founder }: { founder: (typeof founders)[number] }) {
  const pathId = `curve-${founder.short.toLowerCase()}`;
  return (
    <div className="mz-egg">
      <svg className="mz-curved" viewBox="0 0 170 90" aria-hidden="true">
        <path id={pathId} d="M10,80 Q60,0 160,30" fill="none" />
        <text>
          <textPath href={`#${pathId}`}>{founder.short} · cofundador</textPath>
        </text>
      </svg>
      <div className="mz-ph">
        <img className="mz-fill" src={founder.image} alt={founder.alt} loading="lazy" decoding="async" style="object-position: center" />
      </div>
      <p className="cap mz-ital">{founder.name}</p>
      <p className="role">{founder.role}</p>
      <p className="bio">{founder.copy}</p>
      <a className="in" href={founder.profile} target="_blank" rel="noopener noreferrer">
        <Linkedin aria-hidden="true" /> Ver perfil profissional <ChevronRight aria-hidden="true" />
      </a>
    </div>
  );
}

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
    icon: Smartphone,
  },
];

const founders = [
  {
    name: "Jean Patrick",
    short: "Jean",
    image: "/jean_about_pic.webp",
    alt: "Foto de Jean Patrick, fundador da Morzen",
    role: "Produto & interface",
    copy: "Produto, interface e detalhe para transformar contexto em uma experiência clara.",
    profile: socialProfiles.jeanLinkedin,
  },
  {
    name: "Diego Rezende",
    short: "Diego",
    image: "/diego_about_pic.webp",
    alt: "Foto de Diego Rezende, fundador da Morzen",
    role: "Tecnologia & execução",
    copy: "Tecnologia, execução e constância para construir algo que continue fazendo sentido.",
    profile: socialProfiles.diegoLinkedin,
  },
];
