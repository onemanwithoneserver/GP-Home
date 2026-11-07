import type { ComponentType } from "react";
import { GullyLogo } from "../Login/svg icons";
import {
  LayoutGrid,
  User,
  MapPin,
  Heart,
  SlidersHorizontal,
  MessageSquare,
  Lock,
  LogOut,
  Share2,
  Layers,
  Phone,
  LocateFixed,
  Maximize2,
  Search,
} from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
}

export interface AccountMenuItem {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string; size?: number }>;
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
];

export const accountMenuItems: AccountMenuItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "profile", label: "Profile", icon: User },
  { id: "saved-places", label: "Saved Places", icon: MapPin },
  { id: "saved-properties", label: "Saved Properties", icon: Heart },
  { id: "preferred-interests", label: "Preferred Interests", icon: SlidersHorizontal },
  { id: "responses", label: "Responses", icon: MessageSquare },
  { id: "change-password", label: "Change Password", icon: Lock },
];

export const mapFloatingControls: MapControlItem[] = [
  { id: "favorite", label: "Saved Properties", icon: Heart },
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

export const homeLoginData = {
  accountTitle: "My Account",
  accountSubtitle: "Buyer account",
  signOutLabel: "Sign out",
  searchPlaceholder: "Search places, projects...",
  propertyPopupUrl: "https://onemanwithoneserver.github.io/Figma-GP/",
};

export {
  GullyLogo,
  User,
  LogOut,
  SlidersHorizontal,
  Search,
  Maximize2,
};
