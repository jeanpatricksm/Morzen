import "@fontsource/anton/400.css";
import "@fontsource/archivo/400.css";
import "@fontsource/archivo/500.css";
import "@fontsource/archivo/800.css";
import "@fontsource/italiana/400.css";
import "./styles/mz.css";

import { useEffect, useRef } from "preact/hooks";
import { hydrate, LocationProvider, prerender as ssr, Route, Router, useLocation } from "preact-iso";
import { Navbar } from "./components/navbar";
import { getHead } from "./lib/head";
import { Home } from "./pages/home";
import { NewProjectPage } from "./pages/new-project";
import { NotFound } from "./pages/not-found";
import { ServicePage } from "./pages/service";

/** Rolagem e <title> ao navegar no cliente (o HTML inicial já vem pronto do prerender). */
function RouteEffects() {
  const { url } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    const head = getHead(url);
    document.title = head.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", head.description);

    const hash = window.location.hash.slice(1);
    if (first.current) {
      first.current = false;
      if (!hash) return;
    }
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }));
    } else {
      window.scrollTo(0, 0);
    }
  }, [url]);

  return null;
}

export function App() {
  return (
    <LocationProvider>
      <div class="mz">
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
