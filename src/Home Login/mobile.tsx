import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SiteHeader from "../Home/components/Header";
import MapCanvas from "../Components/site/MapCanvas";
import {
  navItems,
  accountMenuItems,
  mapFloatingControls,
  mapPins,
  homeLoginData,
} from "./data";

export default function HomeLoginMobile() {
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
    <div className="relative w-full h-full min-h-[620px] flex-1 flex flex-col bg-white overflow-hidden select-text">
      <SiteHeader
        isMobile
        variant="user"
        navItems={navItems}
        activeNav={activeNav}
        onNavChange={handleNavChange}
        onLogoClick={() => setActiveNav("")}
        searchPlaceholder={homeLoginData.searchPlaceholder}
        accountTitle={homeLoginData.accountTitle}
        accountSubtitle={homeLoginData.accountSubtitle}
        accountItems={accountMenuItems}
        onAccountSelect={(id) =>
          navigate(
            id === "dashboard"
              ? `/${targetViewport}/dashboard`
              : `/${targetViewport}/dashboard/${id}`,
          )
        }
        signOutLabel={homeLoginData.signOutLabel}
        onSignOut={() => navigate(`/${targetViewport}/home`)}
      />
      <MapCanvas
        isMobile
        pins={mapPins}
        controls={mapFloatingControls}
        popupUrl={homeLoginData.propertyPopupUrl}
      />
    </div>
  );
}
