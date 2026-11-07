import { useEffect, useState } from "react";
import ChangePasswordDesktop from "./desktop";
import ChangePasswordMobile from "./mobile";

interface ChangePasswordViewProps {
  isMobile?: boolean;
}

export default function ChangePasswordView({ isMobile }: ChangePasswordViewProps) {
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
  return resolvedMobile ? <ChangePasswordMobile /> : <ChangePasswordDesktop />;
}

