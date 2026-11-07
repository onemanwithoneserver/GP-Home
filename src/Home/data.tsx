import type { ComponentType } from "react";
import { GullyLogo } from "../Login/svg icons";
import {
  Heart,
  Share2,
  Layers,
  Phone,
  LocateFixed,
  Maximize2,
  SlidersHorizontal,
  Search,
  LogIn,
} from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
}

export interface MapControlItem {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string; size?: number }>;
  isWhatsApp?: boolean;
}

export interface MapPinItem {
  id: string;
  xPercent: number;
  yPercent: number;
  isPrimary?: boolean;
}

export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "videos", label: "Videos" },
  { id: "shortlist", label: "Shortlist" },
];

export const mapFloatingControls: MapControlItem[] = [
  { id: "favorite", label: "Shortlist", icon: Heart },
  { id: "share", label: "Share", icon: Share2 },
  { id: "layers", label: "Layers", icon: Layers },
  { id: "call", label: "Call", icon: Phone },
  { id: "locate", label: "Locate", icon: LocateFixed },
  { id: "whatsapp", label: "WhatsApp", icon: Phone, isWhatsApp: true },
];

export const mapPins: MapPinItem[] = [
  { id: "pin-1", xPercent: 51.0, yPercent: 58.0, isPrimary: true },
  { id: "pin-2", xPercent: 55.6, yPercent: 62.5, isPrimary: false },
  { id: "pin-3", xPercent: 41.8, yPercent: 89.5, isPrimary: false },
];

export const homeData = {
  searchPlaceholder: "Search places, projects...",
  signInLabel: "Sign In",
  propertyPopupUrl: "https://onemanwithoneserver.github.io/Figma-GP/",
};

export {
  GullyLogo,
  SlidersHorizontal,
  Search,
  LogIn,
  Maximize2,
};
