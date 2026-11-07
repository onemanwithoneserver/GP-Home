import { MapPin, Plus, Trash2, Maximize2, Minus } from "lucide-react";

export interface SavedPlaceItem {
  id: string;
  label: string;
  address: string;
  pinX: number;
  pinY: number;
}

export const savedPlacesData = {
  title: "Saved Places",
  subtitle: "Keep your home, workplace, and other important locations in one place.",
  addPlaceButton: "Add Place",
  emptyState: {
    title: "Your important places, saved here",
    subtitle: "Add a place you visit often, such as your office or your child’s school.",
    ctaLabel: "Add your first place",
  },
  modal: {
    title: "Add a place",
    labelPlaceholder: "Place label *",
    labelHelper: "For example, My Office or Parents’ Home.",
    quickChips: ["Home", "Office", "School"],
    addressPlaceholder: "Search address or landmark *",
    addressHelper: "Search for an address or use the map below.",
    mapTitle: "Pick a location on the map",
    mapSubtitle: "Click the map or drag the pin to choose the exact location.",
    cancelLabel: "Cancel",
    saveLabel: "Save Place",
  },
};

export { MapPin, Plus, Trash2, Maximize2, Minus };

