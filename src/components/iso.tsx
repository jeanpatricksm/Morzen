// Cubos isométricos em SVG ("os building blocks da web"). Ver AGENTS.md.

const C30 = Math.cos(Math.PI / 6);
const S30 = 0.5;

export type IsoColor = "l" | "v" | "d";

const PALETTE: Record<IsoColor, [string, string, string]> = {
  l: ["#d9cfff", "#b9a8ff", "#9a86f2"],
  v: ["#8a70ee", "#6445d8", "#4a30b4"],
  d: ["#3a2c63", "#201835", "#120d20"],
};

type P3 = [number, number, number];

function iso([x, y, z]: P3, s: number) {
  return [(x - y) * C30 * s, (x + y) * S30 * s - z * s] as const;
}

function quad(points: P3[], s: number) {
  return points.map((p) => iso(p, s).join(",")).join(" ");
}

interface IsoCubeProps {
  x: number;
  y: number;
  z: number;
  size: number;
  color: IsoColor;
  label?: string;
  labelSize?: number;
}

export function IsoCube({ x, y, z, size: s, color, label, labelSize }: IsoCubeProps) {
  const [top, left, right] = PALETTE[color];
  const [ox, oy] = iso([x + 0.5, y + 1, z + 0.5], s);
  const fontSize =
    labelSize ?? s * (!label ? 0.26 : label.length === 1 ? 0.45 : label.length > 3 ? 0.2 : 0.26);

  return (
    <g>
      <polygon
        points={quad([[x, y, z + 1], [x + 1, y, z + 1], [x + 1, y + 1, z + 1], [x, y + 1, z + 1]], s)}
        fill={top}
      />
      <polygon
        points={quad([[x, y + 1, z], [x + 1, y + 1, z], [x + 1, y + 1, z + 1], [x, y + 1, z + 1]], s)}
        fill={left}
      />
      <polygon
        points={quad([[x + 1, y, z], [x + 1, y + 1, z], [x + 1, y + 1, z + 1], [x + 1, y, z + 1]], s)}
        fill={right}
      />
      {label ? (
        <text
          transform={`translate(${ox},${oy}) matrix(${C30},${S30},0,1,0,0)`}
          text-anchor="middle"
          dominant-baseline="central"
          font-size={fontSize}
          fill={color === "l" ? "#17151b" : "#fff"}
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}
