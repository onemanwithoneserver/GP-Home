import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SiteHeader from "./components/Header";
import MapCanvas from "../Components/site/MapCanvas";
import { navItems, mapFloatingControls, mapPins, homeData } from "./data";

export default function HomeDesktop() {
  const navigate = useNavigate();
  const location = useLocation();
  const targetViewport = location.pathname.startsWith("/mobile") ? "mobile" : "desktop";
  const [activeNav, setActiveNav] = useState<string>("");

  const handleNavChange = (id: string) => {
    setActiveNav(id);
    if (id === "shortlist") {
      navigate(`/${targetViewport}/shortlist`);
    }
  };

  return (
    <div className="relative w-full h-full flex-1 flex flex-col bg-white overflow-hidden select-text">
      <SiteHeader
        variant="guest"
        navItems={navItems}
        activeNav={activeNav}
        onNavChange={handleNavChange}
        onLogoClick={() => setActiveNav("")}
        searchPlaceholder={homeData.searchPlaceholder}
        signInLabel={homeData.signInLabel}
        onSignIn={() => navigate(`/${targetViewport}/login`)}
      />
      <MapCanvas pins={mapPins} controls={mapFloatingControls} popupUrl={homeData.propertyPopupUrl} />
    </div>
  );
}
