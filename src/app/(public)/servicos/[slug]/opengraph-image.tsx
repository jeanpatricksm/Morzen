import { ImageResponse } from "next/og";
import { getService, services } from "@/lib/services";
import { siteName } from "@/lib/seo";

export const alt = "Serviço da Morzen — software sob medida";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  const title = service?.title ?? siteName;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(115deg, #eeeaff 0%, #f7f8ff 43%, #9894ff 100%)",
          color: "#17151b",
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 600 }}>{siteName}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, color: "#6445d8", fontWeight: 600 }}>
            Software sob medida
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              maxWidth: 980,
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ fontSize: 26, color: "rgba(23,21,27,0.6)" }}>
          morzen.com.br
        </div>
      </div>
    ),
    size,
  );
}
