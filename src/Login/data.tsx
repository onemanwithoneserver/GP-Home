import type { ComponentType, SVGProps } from "react";
import { ApartmentIcon, VillaIcon, PlotIcon, HouseIcon, GullyLogo } from "./svg icons";
import { Search, PlusSquare, ArrowLeftRight, ShieldCheck } from "lucide-react";

export interface Category {
  id: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface Feature {
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}

export const categories: Category[] = [
  { id: "Apartment", label: "Apartment", Icon: ApartmentIcon },
  { id: "Villa", label: "Villa", Icon: VillaIcon },
  { id: "Plot", label: "Plot", Icon: PlotIcon },
  { id: "Independent House", label: "Independent House", Icon: HouseIcon },
];

export const features: Feature[] = [
  { label: "Search Properties", icon: Search },
  { label: "List Your Property", icon: PlusSquare },
  { label: "Buy / Sell / Rent", icon: ArrowLeftRight },
  { label: "Verified Listings", icon: ShieldCheck },
];

export const loginData = {
  tagline: "Your Trusted Real Estate Platform",
  headline: "Find, List & Manage",
  headlineSub: "Your Property on",
  brand: "Gully Listings",
  subtitle: "Explore flats, villas, plots and independent houses across top locations. Buy, sell or rent with ease.",
};

export { GullyLogo };
