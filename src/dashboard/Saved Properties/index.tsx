import { useEffect, useState } from "react";
import SavedPropertiesDesktop from "./desktop";
import SavedPropertiesMobile from "./mobile";

interface SavedPropertiesViewProps {
  isMobile?: boolean;
}

export default function SavedPropertiesView({ isMobile }: SavedPropertiesViewProps) {
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
  return resolvedMobile ? <SavedPropertiesMobile /> : <SavedPropertiesDesktop />;
}

