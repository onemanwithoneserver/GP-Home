import { useEffect, useState } from "react";
import ResponsesDesktop from "./desktop";
import ResponsesMobile from "./mobile";

interface ResponsesViewProps {
  isMobile?: boolean;
}

export default function ResponsesView({ isMobile }: ResponsesViewProps) {
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
  return resolvedMobile ? <ResponsesMobile /> : <ResponsesDesktop />;
}

