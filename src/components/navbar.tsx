import { ChevronRight, Menu, X } from "lucide-preact";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { useLocation } from "preact-iso";
import { socialProfiles } from "@/lib/seo";

const LINKS = [
  { id: "inicio", href: "/", title: "Início" },
  { id: "projetos", href: "/#projetos", title: "Projetos" },
  { id: "servicos", href: "/#servicos", title: "Serviços" },
  { id: "fundadores", href: "/#fundadores", title: "Fundadores" },
  { id: "bastidores", href: socialProfiles.instagram, title: "Bastidores", external: true },
];

export function Navbar() {
  const { path: pathname } = useLocation();
  const isHome = pathname === "/";
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState("inicio");
  const [hover, setHover] = useState<string | null>(null);
  const menuRef = useRef<HTMLElement>(null);
  const indRef = useRef<HTMLSpanElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeMenu = () => dialogRef.current?.close();

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // destaca a seção visível na home
  useEffect(() => {
    if (!isHome) return;
    const ids = ["projetos", "servicos", "fundadores"]; // ordem do DOM
    const onScroll = () => {
      let current = "inicio";
      for (const id of ids) {
        const el = document.getElementById(id);
        // a seção ativa é a que passou pela linha logo abaixo da navbar
        if (el && el.getBoundingClientRect().top <= 160) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const target = hover ?? (isHome ? active : null);

  const place = useCallback(() => {
    const ind = indRef.current;
    const menu = menuRef.current;
    if (!ind || !menu) return;
    const link = target ? menu.querySelector<HTMLAnchorElement>(`[data-id="${target}"]`) : null;
    if (!link) {
      ind.style.opacity = "0";
      return;
    }
    ind.style.opacity = "1";
    ind.style.left = `${link.offsetLeft}px`;
    ind.style.width = `${link.offsetWidth}px`;
  }, [target]);

  useEffect(() => {
    place();
    document.fonts?.ready.then(place);
    const menu = menuRef.current;
    const ro = menu ? new ResizeObserver(place) : null;
    if (menu && ro) {
      ro.observe(menu);
      menu.querySelectorAll("a").forEach((a) => ro.observe(a));
    }
    window.addEventListener("resize", place);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", place);
    };
  }, [place]);

  if (pathname === "/new_project") return null;

  return (
    <header className={`mz-header ${stuck || !isHome ? "is-stuck" : ""}`}>
      <div className="mz-bar">
        <a className="mz-brand" href="/" aria-label="Morzen, página inicial">
          <span className="mz-logo">
            <img src="/morzen_mark.png" alt="" width={26} height={18} />
          </span>
          Morzen
        </a>

        <nav className="mz-menu" ref={menuRef} onMouseLeave={() => setHover(null)} aria-label="Principal">
          <span className="mz-menu-ind" ref={indRef} aria-hidden="true" />
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              data-id={link.id}
              className={[target === link.id ? "is-hl" : "", isHome && active === link.id ? "is-active" : ""].join(" ").trim() || undefined}
              onMouseEnter={() => setHover(link.id)}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
            >
              {link.title}
            </a>
          ))}
        </nav>

        <div className="mz-bar-right">
          <span className="mz-live">Construindo ao vivo</span>
          <a className="mz-btn" href="/new_project" aria-label="Iniciar projeto">
            <span>Iniciar projeto</span>
            <ChevronRight aria-hidden="true" />
          </a>
          <button type="button" className="mz-burger" aria-label="Abrir menu" onClick={() => dialogRef.current?.showModal()}>
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
              <span>Menu</span>
              <button type="button" className="mz-burger" aria-label="Fechar menu" onClick={closeMenu}>
                <X aria-hidden="true" />
              </button>
            </div>
            <nav className="mz-mobile-menu">
              {LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={closeMenu}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  {link.title}
                  <ChevronRight aria-hidden="true" />
                </a>
              ))}
            </nav>
            <a className="mz-btn" href="/new_project" onClick={closeMenu}>
              Iniciar projeto <ChevronRight aria-hidden="true" />
            </a>
          </dialog>
        </div>
      </div>
    </header>
  );
}
