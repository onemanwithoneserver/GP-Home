import {
  Building2,
  Heart,
  Trash2,
  RotateCcw,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  LayoutGrid,
  List,
  Eye,
  SlidersHorizontal,
  Share2,
} from "lucide-react";
import prop1 from "../Assets/Luxury/property_1.jpg";
import prop2 from "../Assets/Luxury/property_2.jpg";
import prop3 from "../Assets/Luxury/property_3.jpg";
import prop4 from "../Assets/Luxury/property_4.jpg";

export type PropertyCategory = "All" | "Apartment" | "Villa" | "Plot" | "Independent House";
export type SortOption = "Recently Added" | "Price: Low to High" | "Price: High to Low" | "Area: Large to Small";
export type ViewType = "grid" | "list";

export interface ShortlistPropertyItem {
  id: string;
  name: string;
  category: "Apartment" | "Villa" | "Plot" | "Independent House";
  status: string;
  zone: string;
  location: string;
  pricePerSqFt: string;
  priceRange: string;
  numericPricePerSqFt: number;
  bhk: string;
  baths: string;
  acres: string;
  tags: string[];
  imageUrl: string;
  isShortlisted: boolean;
  addedAt: string;
  description?: string;
  developer?: string;
}

export interface ShortlistMetric {
  id: string;
  label: string;
  value: string;
}

export const shortlistData = {
  title: "Your Shortlist",
  subtitle: "Pick up where you left off. Compare, revisit, and act on your saved projects.",
  metrics: [
    { id: "saved", label: "Saved Projects", value: "4" },
    { id: "avg-price", label: "Avg Price per Sq Ft", value: "₹9,100" },
    { id: "regions", label: "Regions Covered", value: "Hyderabad • West Zone" },
  ] as ShortlistMetric[],
  categories: [
    "All",
    "Apartment",
    "Villa",
    "Plot",
    "Independent House",
  ] as PropertyCategory[],
  sortOptions: [
    "Recently Added",
    "Price: Low to High",
    "Price: High to Low",
    "Area: Large to Small",
  ] as SortOption[],
  defaultProperties: [
    {
      id: "sl-1",
      name: "Jayam Heights",
      category: "Apartment",
      status: "Under Construction - May 2027",
      zone: "West Zone",
      location: "Patrika Nagar, Hyderabad",
      pricePerSqFt: "₹9,500/sft",
      priceRange: "₹1.12Cr - ₹1.45Cr",
      numericPricePerSqFt: 9500,
      bhk: "2, 3, 4 BHK",
      baths: "2-4",
      acres: "12.5 Acres",
      tags: ["HMDA Approved", "Dual Clubhouses", "Vastu"],
      imageUrl: prop1,
      isShortlisted: true,
      addedAt: "2026-11-05",
      developer: "Jayam Infra Developers",
      description: "Ultra-luxury high-rise residences with panoramic views, dual clubhouses, and direct connectivity to Hitec City.",
    },
    {
      id: "sl-2",
      name: "Lakeview Villas",
      category: "Villa",
      status: "Ready to Move",
      zone: "Financial District",
      location: "Kokapet, Hyderabad",
      pricePerSqFt: "₹12,500/sft",
      priceRange: "₹3.5Cr - ₹4.1Cr",
      numericPricePerSqFt: 12500,
      bhk: "4, 5 BHK",
      baths: "4-5",
      acres: "6 Acres",
      tags: ["Gated Community", "Lake Facing", "Clubhouse"],
      imageUrl: prop2,
      isShortlisted: true,
      addedAt: "2026-11-04",
      developer: "Lakeview Luxury Estates",
      description: "Exclusive lake-facing signature villas crafted with private plunge pools, landscaped terraces, and serene green buffers.",
    },
    {
      id: "sl-3",
      name: "Skyline Enclave",
      category: "Apartment",
      status: "Dec 2026",
      zone: "Tech Corridor",
      location: "Gachibowli, Hyderabad",
      pricePerSqFt: "₹10,200/sft",
      priceRange: "₹1.8Cr - ₹2.3Cr",
      numericPricePerSqFt: 10200,
      bhk: "3, 4 BHK",
      baths: "3-4",
      acres: "8 Acres",
      tags: ["Sky Lounge", "Co-working", "EV Ready"],
      imageUrl: prop3,
      isShortlisted: true,
      addedAt: "2026-11-03",
      developer: "Skyline Prime Living",
      description: "Contemporary sky apartments featuring tech-enabled automation, infinity rooftop pool, and seamless expressway access.",
    },
    {
      id: "sl-4",
      name: "Greenfields",
      category: "Plot",
      status: "Handover in 2025",
      zone: "Outer West",
      location: "Shankarpally, Hyderabad",
      pricePerSqFt: "₹4,200/sft",
      priceRange: "₹42L - ₹70L",
      numericPricePerSqFt: 4200,
      bhk: "NA",
      baths: "NA",
      acres: "25 Acres",
      tags: ["DTCP", "Landscaped Parks", "Clubhouse"],
      imageUrl: prop4,
      isShortlisted: true,
      addedAt: "2026-11-01",
      developer: "Greenfield Lands & Resorts",
      description: "DTCP-approved gated villa plotting with 100ft wide avenue plantation, club membership, and rapid capital appreciation.",
    },
  ] as ShortlistPropertyItem[],
};

export {
  Building2,
  Heart,
  Trash2,
  RotateCcw,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  LayoutGrid,
  List,
  Eye,
  SlidersHorizontal,
  Share2,
};

