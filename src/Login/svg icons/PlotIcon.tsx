import type { SVGProps } from "react";

export default function PlotIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M24 4a8 8 0 0 0-8 8c0 6 8 14 8 14s8-8 8-14a8 8 0 0 0-8-8Z" fill="currentColor" fillOpacity="0.15" />
      <circle cx="24" cy="12" r="3" />
      <path d="M14 28 6 40h36l-8-12" />
      <path d="M12 34h24" />
    </svg>
  );
}
