import type { SVGProps } from "react";

export default function ApartmentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="12" y="6" width="24" height="36" rx="2" fill="currentColor" fillOpacity="0.15" />
      <path d="M8 42h32M19 13h2M27 13h2M19 20h2M27 20h2M19 27h2M27 27h2M21 42v-7h6v7" />
    </svg>
  );
}
