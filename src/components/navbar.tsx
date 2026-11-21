import { ChevronRight, Menu, X } from "lucide-preact";
import type { TargetedMouseEvent } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { useLocation } from "preact-iso";
import { socialProfiles } from "@/lib/seo";

interface NavLink {
  id: string;
  href: string;
  title: string;
  external?: boolean;
}

const LINKS: NavLink[] = [
  { id: "inicio", href: "/", title: "Início" },
  { id: "servicos", href: "/#servicos", title: "Serviços" },
  { id: "projetos", href: "/#projetos", title: "Projetos" },
  { id: "fundadores", href: "/#fundadores", title: "Fundadores" },
  { id: "bastidores", href: socialProfiles.instagram, title: "Bastidores", external: true },
];

export function Navbar() {
  const { path: pathname } = useLocation();
  const isHome = pathname === "/";
  const [stuck, setStuck] = useState(!isHome);
  const [active, setActive] = useState("inicio");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeMenu = () => dialogRef.current?.close();

  // Único listener de scroll limitado por requestAnimationFrame (AGENTS.md).
  useEffect(() => {
    const sectionIds = ["servicos", "projetos", "fundadores"];
    let frame = 0;

    const update = () => {
      frame = 0;
      const nextStuck = !isHome || window.scrollY > 36;
      setStuck((prev) => (prev === nextStuck ? prev : nextStuck));

      if (!isHome) return;
      let current = "inicio";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) current = id;
      }
      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome]);

  if (pathname === "/new_project") return null;

  const handleSamePageNav = (href: string, e: TargetedMouseEvent<HTMLAnchorElement>) => {
    if (!isHome) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduced ? "auto" : "smooth";

    if (href === "/") {
      e.preventDefault();
      if (window.location.hash) window.history.pushState(null, "", "/");
      window.scrollTo({ top: 0, behavior });
      setActive("inicio");
      return;
    }

    if (href.startsWith("/#")) {
      const id = href.slice(2);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        window.history.pushState(null, "", href);
        target.scrollIntoView({ behavior });
        setActive(id);
      }
    }
  };

  return (
    <header className={`mz-header ${stuck || !isHome ? "is-stuck" : "is-hero-top"}`}>
      <div className="mz-bar">
        <a
          className="mz-brand"
          href="/"
          aria-label="Morzen, página inicial"
          onClick={(e) => handleSamePageNav("/", e)}
        >
          <span className="mz-logo">
            <img src="/morzen_mark.png" alt="" width={42} height={27} />
          </span>
          <span className="mz-brand-name">Morzen</span>
        </a>

        <nav className="mz-menu" aria-label="Principal">
          {LINKS.map((link) => {
            const isCurrent =
              (isHome && active === link.id) || (pathname.startsWith("/servicos") && link.id === "servicos");
            return (
              <a
                key={link.id}
                href={link.href}
                className={isCurrent ? "is-active" : ""}
                aria-current={isCurrent ? "location" : undefined}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={link.external ? undefined : (e) => handleSamePageNav(link.href, e)}
              >
                {link.title}
              </a>
            );
          })}
        </nav>

        <div className="mz-bar-right">
          <a
            className="mz-live-pill"
            href={socialProfiles.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i aria-hidden="true" />
            Construindo ao vivo
          </a>
          <a className="mz-btn mz-nav-cta" href="/new_project">
            <span className="mz-cta-full">Iniciar projeto</span>
            <span className="mz-cta-short" aria-hidden="true">
              Projeto
            </span>
            <ChevronRight aria-hidden="true" />
          </a>
          <button
            type="button"
            className="mz-burger"
            aria-label="Abrir menu"
            onClick={() => dialogRef.current?.showModal()}
          >
            <Menu aria-hidden="true" />
          </button>
          <dialog
            ref={dialogRef}
            className="mz-drawer"
            aria-label="Menu"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeMenu();
            }}
          >
            <div className="mz-drawer-head">
              <span>Morzen</span>
              <button type="button" className="mz-burger" aria-label="Fechar menu" onClick={closeMenu}>
                <X aria-hidden="true" />
              </button>
            </div>
            <nav className="mz-mobile-menu" aria-label="Menu mobile">
              {LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    closeMenu();
                    if (!link.external) handleSamePageNav(link.href, e);
                  }}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  {link.title}
                  <ChevronRight aria-hidden="true" />
                </a>
              ))}
            </nav>
            <div className="mz-drawer-foot">
              <span className="mz-live-pill is-drawer">
                <i aria-hidden="true" />
                Construindo ao vivo
              </span>
              <a className="mz-btn" href="/new_project" onClick={closeMenu}>
                Conversar sobre um projeto <ChevronRight aria-hidden="true" />
              </a>
            </div>
          </dialog>
        </div>
      </div>
    </header>
  );
}
