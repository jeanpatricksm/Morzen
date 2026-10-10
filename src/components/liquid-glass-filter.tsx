// Filtro SVG que refrata o fundo atras dos elementos .morzen-liquid-*.
// Usado via `backdrop-filter: url(#morzen-liquid-glass)`: suportado no Chromium.
// Safari e Firefox ignoram essa declaracao e caem no blur do CSS.
export function LiquidGlassFilter() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute", pointerEvents: "none" }}
    >
      <defs>
        <filter
          id="morzen-liquid-glass"
          colorInterpolationFilters="sRGB"
          x="0"
          y="0"
          width="100%"
          height="100%"
        >
          <feImage href="/glass/lens-map.png" preserveAspectRatio="none" result="lens" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="lens"
            scale="48"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
