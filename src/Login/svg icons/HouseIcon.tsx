import type { SVGProps } from "react";

export default function HouseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 24 24 8l18 16" />
      <path d="M12 21v21h24V21" fill="currentColor" fillOpacity="0.15" />
      <path d="M20 42V30h8v12" />
    </svg>
  );
}
