import { Github, Instagram, Linkedin } from "@/components/brand-icons";
import { socialProfiles } from "@/lib/seo";
import { services } from "@/lib/services";

export function Footer() {
  return (
    <footer className="mz-footer">
      <div className="mz-wrap mz-footer-inner">
        <div className="mz-footer-brand">
          <a className="mz-brand" href="/" aria-label="Morzen, página inicial">
            <span className="mz-logo">
              <img src="/morzen_mark.png" alt="" width={26} height={18} />
            </span>
            Morzen
          </a>
          <p>
            Produtos digitais construídos com contexto, transparência e proximidade. Atendimento em todo o Brasil e
            presencialmente no Vale do Paraíba.
          </p>
          <a className="mz-footer-mail" href="mailto:contato@morzen.com.br">
            contato@morzen.com.br
          </a>
        </div>

        <nav className="mz-footer-col" aria-label="Serviços">
          <h3>Serviços</h3>
          <ul>
            {services.map((service) => (
              <li key={service.slug}>
                <a href={`/servicos/${service.slug}`}>{service.shortTitle}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="mz-footer-col" aria-label="Redes sociais">
          <h3>Bastidores</h3>
          <ul>
            <li>
              <a href={socialProfiles.instagram} target="_blank" rel="noopener noreferrer">
                <Instagram aria-hidden="true" /> Instagram
              </a>
            </li>
            <li>
              <a href={socialProfiles.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin aria-hidden="true" /> LinkedIn
              </a>
            </li>
            <li>
              <a href={socialProfiles.github} target="_blank" rel="noopener noreferrer">
                <Github aria-hidden="true" /> GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mz-wrap mz-footer-copy">
        <span>© {new Date().getFullYear()} Morzen · Software sob medida, construído em público.</span>
        <span>Vale do Paraíba, SP · Brasil</span>
      </div>
    </footer>
  );
}
