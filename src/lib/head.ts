// Metadados por rota (title, description, canonical, Open Graph, Twitter).
// Usado no prerender (HTML estático) e atualizado no cliente ao navegar.
import { defaultDescription, siteName, siteUrl } from "./seo";
import { getService } from "./services";

export interface HeadElement {
  type: string;
  props: Record<string, string>;
}

export interface RouteHead {
  title: string;
  description: string;
  elements: HeadElement[];
}

const meta = (name: string, content: string): HeadElement => ({ type: "meta", props: { name, content } });
const prop = (property: string, content: string): HeadElement => ({ type: "meta", props: { property, content } });

interface HeadInput {
  title: string;
  fullTitle: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
  robots?: string;
  canonical?: boolean;
}

function build({ title, fullTitle, description, path, image, imageAlt, robots, canonical = true }: HeadInput): RouteHead {
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  const img = image.startsWith("http") ? image : `${siteUrl}${image}`;
  const elements: HeadElement[] = [
    meta("description", description),
    meta("application-name", siteName),
    meta("author", siteName),
    meta("creator", siteName),
    meta("publisher", siteName),
    meta("category", "technology"),
    prop("og:type", "website"),
    prop("og:locale", "pt_BR"),
    prop("og:site_name", siteName),
    prop("og:url", url),
    prop("og:title", fullTitle),
    prop("og:description", description),
    prop("og:image", img),
    prop("og:image:width", "1200"),
    prop("og:image:height", "630"),
    prop("og:image:alt", imageAlt),
    meta("twitter:card", "summary_large_image"),
    meta("twitter:title", fullTitle),
    meta("twitter:description", description),
    meta("twitter:image", img),
  ];
  if (canonical) elements.push({ type: "link", props: { rel: "canonical", href: url } });
  if (robots) elements.push(meta("robots", robots));
  return { title, description, elements };
}

const withSite = (t: string) => `${t} | ${siteName}`;

export function getHead(rawPath: string): RouteHead {
  const path = rawPath.split(/[?#]/)[0].replace(/\/+$/, "") || "/";

  if (path === "/") {
    const t = withSite("Empresa de desenvolvimento de software e sistemas");
    return build({
      title: t,
      fullTitle: t,
      description: defaultDescription,
      path,
      image: "/og.png",
      imageAlt: "Morzen — software construído com transparência",
    });
  }

  if (path === "/new_project") {
    const t = withSite("Converse sobre seu projeto");
    return build({
      title: t,
      fullTitle: t,
      description:
        "Conte à Morzen o que seu negócio precisa resolver e dê o primeiro passo para construir uma solução digital sob medida.",
      path,
      image: "/og.png",
      imageAlt: "Morzen — software sob medida, construído com transparência",
      robots: "noindex, follow",
    });
  }

  const match = path.match(/^\/servicos\/([^/]+)$/);
  const service = match ? getService(match[1]) : undefined;
  if (service) {
    const t = withSite(service.title);
    return build({
      title: t,
      fullTitle: t,
      description: service.description,
      path,
      image: `/og/servicos/${service.slug}.png`,
      imageAlt: "Serviço da Morzen — software sob medida",
    });
  }

  const t = withSite("Página não encontrada");
  return build({
    title: t,
    fullTitle: t,
    description: defaultDescription,
    path,
    image: "/og.png",
    imageAlt: "Morzen",
    robots: "noindex",
    canonical: false,
  });
}
