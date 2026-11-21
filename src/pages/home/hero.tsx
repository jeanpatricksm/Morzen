import { ChevronRight } from "lucide-preact";
import { Github, Instagram, Linkedin } from "@/components/brand-icons";
import { socialProfiles } from "@/lib/seo";

const SOCIALS = [
  { label: "Instagram", href: socialProfiles.instagram, icon: Instagram },
  { label: "LinkedIn", href: socialProfiles.linkedin, icon: Linkedin },
  { label: "GitHub", href: socialProfiles.github, icon: Github },
];

export function Hero() {
  return (
    <section className="mz-hero" aria-labelledby="hero-title">
      <div className="mz-hero-bg" aria-hidden="true">
        <img src="/art/codex-sky.webp" alt="" width={1600} height={894} decoding="async" fetchPriority="high" />
        <div className="mz-hero-veil" />
        {/* refração do liquid glass (usada só onde o navegador aceita backdrop-filter com url()) */}
        <svg className="mz-glass-defs" width="0" height="0" focusable="false">
          <filter id="mz-liquid" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="7" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
            <feDisplacementMap in="SourceGraphic" in2="soft" scale="26" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
      </div>

      <div className="mz-wrap mz-hero-inner">
        <div className="mz-hero-icon mz-glass" aria-hidden="true">
          <img src="/morzen_mark.png" alt="" width={48} height={31} />
        </div>

        <h1 id="hero-title">Sistemas, sites e aplicativos para empresas, construídos com você.</h1>

        <p className="mz-hero-lead">Entendemos o problema, construímos junto e mostramos cada etapa.</p>

        <div className="mz-hero-actions">
          <a className="mz-btn-light mz-glass is-light" href="/new_project">
            Conversar sobre um projeto <ChevronRight aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="mz-hero-social">
        <ul aria-label="Redes da Morzen">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer">
                <Icon aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
