import type { SVGProps } from "react";

export default function VillaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 22 24 8l18 14" />
      <path d="M10 20v22h28V20" fill="currentColor" fillOpacity="0.15" />
      <path d="M20 42V30h8v12M15 26h2M31 26h2M4 42h40" />
    </svg>
  );
}
