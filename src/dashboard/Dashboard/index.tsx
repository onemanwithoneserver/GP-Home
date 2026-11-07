import { useEffect, useState } from "react";
import DashboardDesktop from "./desktop";
import DashboardMobile from "./mobile";

interface DashboardViewProps {
  isMobile?: boolean;
}

export default function DashboardView({ isMobile }: DashboardViewProps) {
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
  return resolvedMobile ? <DashboardMobile /> : <DashboardDesktop />;
}

