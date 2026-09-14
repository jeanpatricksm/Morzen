import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteName } from "@/lib/seo";

const title = "Converse sobre seu projeto";
const description =
  "Conte à Morzen o que seu negócio precisa resolver e dê o primeiro passo para construir uma solução digital sob medida.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/new_project" },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/new_project",
    title: `${title} | ${siteName}`,
    description,
    siteName,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Morzen — software sob medida, construído com transparência",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${siteName}`,
    description,
    images: ["/og.png"],
  },
};

export default function NewProjectLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
