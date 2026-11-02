import type { SVGProps } from "react";

export default function VillaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 16 17 9l11 7v10h12v16H8V16Z" fill="currentColor" fillOpacity="0.15" />
      <path d="M5 16 17 7l12 9" />
      <path d="M8 16v26h32V26H28V16" />
      <path d="M28 20h12" />
      <path d="M34 20v6M40 20v6" />
      <path d="M13 22h8" />
      <path d="M14 42v-9h8v9" />
      <path d="M18 33v9" />
      <path d="M32 33h4" />
      <path d="M4 42h40" />
    </svg>
  );
}
