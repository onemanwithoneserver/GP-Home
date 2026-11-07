import { useEffect, useState } from "react";
import SavedPlacesDesktop from "./desktop";
import SavedPlacesMobile from "./mobile";

interface SavedPlacesViewProps {
  isMobile?: boolean;
}

export default function SavedPlacesView({ isMobile }: SavedPlacesViewProps) {
  const [autoMobile, setAutoMobile] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );

  useEffect(() => {
    if (isMobile !== undefined) return;
    const handleResize = () => setAutoMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const resolvedMobile = isMobile !== undefined ? isMobile : autoMobile;
  return resolvedMobile ? <SavedPlacesMobile /> : <SavedPlacesDesktop />;
}

