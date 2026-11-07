import { useEffect, useState } from "react";
import ProfileDesktop from "./desktop";
import ProfileMobile from "./mobile";

interface ProfileViewProps {
  isMobile?: boolean;
}

export default function ProfileView({ isMobile }: ProfileViewProps) {
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
  return resolvedMobile ? <ProfileMobile /> : <ProfileDesktop />;
}

