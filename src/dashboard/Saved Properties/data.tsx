import { Info, Building2, Trash2, RotateCcw } from "lucide-react";

export interface SavedPropertyItem {
  id: string;
  name: string;
  location: string;
  price: string;
  bhk: string;
  area: string;
  status: string;
}

export const savedPropertiesData = {
  title: "Saved Properties",
  subtitle: "Keep the homes you like together as you plan your next move.",
  previewNotice: {
    prefix: "Preview: properties and builder replies are examples.",
    body: "Interest changes are saved only in this browser.",
    suffix: "Saved Places uses your connected account.",
  },
  removeLabel: "Remove",
  defaultProperties: [
    {
      id: "prop-1",
      name: "Sample Garden Residences",
      location: "Kondapur, Hyderabad",
      price: "₹1.2 Cr",
      bhk: "2 BHK",
      area: "1,600 sq ft",
      status: "Ready to occupy",
    },
    {
      id: "prop-2",
      name: "Sample Lakeview Homes",
      location: "Kokapet, Hyderabad",
      price: "₹1.8 Cr",
      bhk: "3 BHK",
      area: "2,100 sq ft",
      status: "Under construction",
    },
  ] as SavedPropertyItem[],
};

export { Info, Building2, Trash2, RotateCcw };

