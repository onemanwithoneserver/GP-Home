import type { ComponentType } from "react";
import { User } from "lucide-react";

export interface SiteNavItem {
  id: string;
  label: string;
  count?: number;
}

export interface SiteAccountItem {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

export interface HeaderProps {
  variant: "guest" | "user";
  isMobile?: boolean;
  navItems: SiteNavItem[];
  activeNav?: string;
  onNavChange?: (id: string) => void;
  onLogoClick?: () => void;
  searchPlaceholder: string;
  signInLabel?: string;
  onSignIn?: () => void;
  accountTitle?: string;
  accountSubtitle?: string;
  accountItems?: SiteAccountItem[];
  activeAccountId?: string;
  onAccountSelect?: (id: string) => void;
  signOutLabel?: string;
  onSignOut?: () => void;
  shortlistCount?: number;
}

export const searchSuggestions: string[] = [
  "Sky Villas in Jubilee Hills",
  "Lake Penthouses in Kokapet",
  "Gated Enclaves in Financial District",
  "Waterfront Residences in Gachibowli",
  "Duplex Penthouses in Hitec City",
];

export const luxurySearchTags: string[] = [
  "Sky Villas",
  "Lake Penthouses",
  "Gated Communities",
  "Kokapet Residences",
  "Jubilee Hills",
  "Financial District",
  "Private Estates",
  "Golf Course Views",
];

export const filterPropertyTypes: string[] = [
  "All Types",
  "Sky Villas",
  "Penthouses",
  "Luxury Estates",
  "Gated Plots",
];

export const filterPriceRanges: string[] = [
  "Any Price",
  "₹3 - ₹5 Cr",
  "₹5 - ₹10 Cr",
  "₹10 Cr+",
];

export const filterBedrooms: string[] = [
  "Any Beds",
  "3 BHK",
  "4 BHK",
  "5+ BHK",
];

export const defaultNavItems: SiteNavItem[] = [
  { id: "videos", label: "Videos" },
  { id: "shortlist", label: "Shortlist" },
];

export function AvatarRing({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims = size === "lg" ? "w-12 h-12" : size === "sm" ? "w-8 h-8" : "w-9 h-9";
  const icon = size === "lg" ? "w-5 h-5" : "w-4 h-4";
  return (
    <span className={`relative ${dims} shrink-0`}>
      <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_200deg,#F85B01,#FFD2A8,#FFF1E6,#FFB074,#F85B01)] animate-[spin_9s_linear_infinite]" />
      <span className="absolute inset-[2px] rounded-full bg-gradient-to-br from-[#2E231D] to-[#1E1713] text-[#FFD2A8] flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
        <User className={`${icon} stroke-[2]`} />
      </span>
      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#F85B01] ring-2 ring-white" />
    </span>
  );
}
