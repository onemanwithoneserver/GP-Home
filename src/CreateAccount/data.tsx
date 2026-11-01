import type { ComponentType, SVGProps } from "react";
import {
  ApartmentIcon,
  VillaIcon,
  PlotIcon,
  HouseIcon,
  GullyLogo,
} from "../Login/svg icons";
import { UserCheck, Home, Sparkles, ShieldCheck } from "lucide-react";

export interface Category {
  id: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface OnboardingFeature {
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}

export const createAccountData = {
  tagline: "YOUR TRUSTED REAL ESTATE PLATFORM",
  headline: "Create Your",
  brand: "Gully Listings",
  headlineSub: "Account",
  subtitle:
    "List, discover, and manage properties — flats, villas, plots and independent houses, all in one place.",
};

export const categories: Category[] = [
  { id: "Apartment", label: "Apartment", Icon: ApartmentIcon },
  { id: "Villa", label: "Villa", Icon: VillaIcon },
  { id: "Plot", label: "Plot", Icon: PlotIcon },
  { id: "Independent House", label: "Independent House", Icon: HouseIcon },
];

export const onboardingFeatures: OnboardingFeature[] = [
  { label: "Quick Setup", icon: UserCheck },
  { label: "Zero Brokerage", icon: Sparkles },
  { label: "Direct Connect", icon: Home },
  { label: "Verified Listings", icon: ShieldCheck },
];

export { GullyLogo };
