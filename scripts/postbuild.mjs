// Pós-build: sitemap, robots, imagens Open Graph das páginas de serviço e 404.html.
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

const require = createRequire(import.meta.url);
const dist = new URL("../dist/", import.meta.url);
const SITE = "https://morzen.com.br";
// Atualize quando o conteúdo das páginas mudar.
const LAST_MODIFIED = "2026-11-16";

// services.ts é TypeScript; extraímos slug/título com uma leitura simples.
const servicesSrc = await readFile(new URL("../src/lib/services.ts", import.meta.url), "utf8");
const services = [...servicesSrc.matchAll(/slug:\s*"([^"]+)",\s*title:\s*"([^"]+)"/g)].map(([, slug, title]) => ({ slug, title }));
if (services.length === 0) throw new Error("Nenhum serviço encontrado em services.ts");

// sitemap.xml
const urls = [
  { loc: SITE, priority: "1.0" },
  ...services.map((s) => ({ loc: `${SITE}/servicos/${s.slug}`, priority: "0.8" })),
];
await writeFile(
  new URL("sitemap.xml", dist),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${LAST_MODIFIED}</lastmod><changefreq>monthly</changefreq><priority>${u.priority}</priority></url>`)
    .join("\n")}\n</urlset>\n`,
);

// robots.txt
await writeFile(new URL("robots.txt", dist), `User-Agent: *\nAllow: /\nDisallow: /api/\n\nHost: ${SITE}\nSitemap: ${SITE}/sitemap.xml\n`);

// 404.html na raiz (hosts estáticos procuram esse arquivo)
await copyFile(new URL("404/index.html", dist), new URL("404.html", dist));

// Imagens OG (1200x630) — mesmo layout da versão Next, na paleta da marca.
const font = (w) => readFile(require.resolve(`@fontsource/archivo/files/archivo-latin-${w}-normal.woff`));
const fonts = [
  { name: "Archivo", data: await font(500), weight: 500, style: "normal" },
  { name: "Archivo", data: await font(800), weight: 800, style: "normal" },
];
const h = (type, style, children) => ({ type, props: { style, children } });

await mkdir(new URL("og/servicos/", dist), { recursive: true });
for (const s of services) {
  const tree = h(
    "div",
    {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "72px 80px",
      background: "linear-gradient(115deg, #ebe9f4 0%, #f7f7f4 45%, #b9a8ff 100%)",
      color: "#17151b",
      fontFamily: "Archivo",
    },
    [
      h("div", { fontSize: 36, fontWeight: 800 }, "Morzen"),
      h("div", { display: "flex", flexDirection: "column" }, [
        h("div", { fontSize: 28, color: "#6445d8", fontWeight: 500 }, "Software sob medida"),
        h("div", { marginTop: 20, fontSize: 76, fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.03em", maxWidth: 980 }, s.title),
      ]),
      h("div", { fontSize: 26, color: "rgba(23,21,27,0.6)" }, "morzen.com.br"),
    ],
  );
  const svg = await satori(tree, { width: 1200, height: 630, fonts });
  const png = new Resvg(svg).render().asPng();
  await writeFile(new URL(`og/servicos/${s.slug}.png`, dist), png);
}

console.log(`postbuild: sitemap (${urls.length} urls), robots, 404.html, ${services.length} imagens OG`);
