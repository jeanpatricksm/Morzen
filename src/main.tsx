import "@fontsource/archivo/400.css";
import "@fontsource/archivo/500.css";
import "@fontsource/archivo/600.css";
import "@fontsource/archivo/800.css";
import "@fontsource/chakra-petch/latin-700.css";
import "./styles/mz.css";

import { useEffect, useRef } from "preact/hooks";
import { hydrate, LocationProvider, prerender as ssr, Route, Router, useLocation } from "preact-iso";
import { Navbar } from "./components/navbar";
import { getHead } from "./lib/head";
import { Home } from "./pages/home";
import { NewProjectPage } from "./pages/new-project";
import { NotFound } from "./pages/not-found";
import { ServicePage } from "./pages/service";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function upsertMeta(name: string, content: string | undefined) {
  const existing = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!content) {
    existing?.remove();
    return;
  }
  if (existing) {
    existing.setAttribute("content", content);
  } else {
    const el = document.createElement("meta");
    el.setAttribute("name", name);
    el.setAttribute("content", content);
    document.head.appendChild(el);
  }
}

function upsertCanonical(href: string | undefined) {
  const existing = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!href) {
    existing?.remove();
    return;
  }
  if (existing) {
    existing.setAttribute("href", href);
  } else {
    const el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    el.setAttribute("href", href);
    document.head.appendChild(el);
  }
}

/** Rolagem e metadados do <head> ao navegar no cliente (o HTML inicial já vem pronto do prerender). */
function RouteEffects() {
  const { url } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    const head = getHead(url);
    document.title = head.title;
    upsertMeta("description", head.description);

    const robots = head.elements.find((e) => e.type === "meta" && e.props.name === "robots")?.props.content;
    upsertMeta("robots", robots);

    const canonical = head.elements.find((e) => e.type === "link" && e.props.rel === "canonical")?.props.href;
    upsertCanonical(canonical);

    const hash = window.location.hash.slice(1);
    if (first.current) {
      first.current = false;
      if (!hash) return;
    }

    const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ behavior }));
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [url]);

  return null;
}

export function App() {
  return (
    <LocationProvider>
      <div class="mz">
        <a className="mz-skip" href="#conteudo">
          Pular para o conteúdo
        </a>
        <RouteEffects />
        <Navbar />
        <Router>
          <Route path="/" component={Home} />
          <Route path="/servicos/:slug" component={ServicePage} />
          <Route path="/new_project" component={NewProjectPage} />
          <Route default component={NotFound} />
        </Router>
      </div>
    </LocationProvider>
  );
}

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("app") as HTMLElement);
}

export async function prerender(data: { url: string }) {
  const { html, links } = await ssr(<App />);
  const head = getHead(data.url);
  return {
    html,
    links,
    head: { lang: "pt-BR", title: head.title, elements: new Set(head.elements) },
  };
}
