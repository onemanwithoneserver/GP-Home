import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Compass, Minimize2, X } from "lucide-react";
import {
  GullyLogo,
  navItems,
  accountMenuItems,
  mapFloatingControls,
  mapPins,
  homeLoginData,
  User,
  LogOut,
  SlidersHorizontal,
  Search,
  Maximize2,
  type MapPinItem,
} from "./data";

function MapPinHouseSvg({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3.2L3 10.5h2.5v8.8c0 .4.3.7.7.7h4.3v-5.5h3v5.5h4.3c.4 0 .7-.3.7-.7v-8.8H21L12 3.2z" />
    </svg>
  );
}

function WhatsAppSvg({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

export default function HomeLoginDesktop() {
  const navigate = useNavigate();
  const location = useLocation();
  const targetViewport = location.pathname.startsWith("/mobile") ? "mobile" : "desktop";

  const [activeNav, setActiveNav] = useState<string>("home");
  const [accountMenuOpen, setAccountMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchFocused, setSearchFocused] = useState<boolean>(false);
  const [activePopupPin, setActivePopupPin] = useState<MapPinItem | null>(null);
  const [mapFavorite, setMapFavorite] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePopupPin(null);
        setAccountMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full h-full flex-1 flex flex-col bg-white overflow-hidden select-text">
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 h-[68px] lg:h-[74px] w-full bg-white border-b border-[#E5DFD4] px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-4 shrink-0"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setActiveNav("home");
            setActivePopupPin(null);
            setAccountMenuOpen(false);
          }}
          className="flex items-center shrink-0 cursor-pointer"
        >
          <GullyLogo className="h-9 sm:h-10 lg:h-11 w-auto" />
        </motion.div>

        <div className="relative flex-1 max-w-[520px] xl:max-w-[560px] mx-2 sm:mx-4">
          <div
            className={`w-full h-11 rounded-[4px] bg-[#FAF8F5] border transition-colors duration-200 flex items-center px-2 gap-2 ${
              searchFocused
                ? "border-[#F85B01] bg-white shadow-[0_0_0_2px_rgba(248,91,1,0.12)]"
                : "border-[#E5DFD4] hover:border-[#D5CCC0]"
            }`}
          >
            <div className="w-7 h-7 rounded-[4px] bg-[#FFF3EB] border border-[#F85B01]/20 flex items-center justify-center text-[#F85B01] shrink-0">
              <Compass className="w-4 h-4" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={homeLoginData.searchPlaceholder}
              className="flex-1 bg-transparent text-xs sm:text-sm text-[#1E1713] placeholder-[#9C9088] font-medium outline-none min-w-0 select-text"
            />

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                aria-label="Filter properties"
                className="w-8 h-8 rounded-[4px] bg-[#F1ECE4]/90 hover:bg-[#FFF3EB] text-[#4A3E39] hover:text-[#F85B01] border border-[#E5DFD4]/80 hover:border-[#F85B01]/30 flex items-center justify-center transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                aria-label="Search"
                className="w-8 h-8 rounded-[4px] bg-[#F1ECE4]/90 hover:bg-[#F85B01] text-[#4A3E39] hover:text-white border border-[#E5DFD4]/80 hover:border-[#F85B01] flex items-center justify-center transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 lg:gap-9 shrink-0">
          <nav className="flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => {
              const active = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id)}
                  className={`relative py-1.5 text-xs lg:text-sm font-bold transition-colors duration-200 cursor-pointer ${
                    active
                      ? "text-[#F85B01]"
                      : "text-[#1E1713] hover:text-[#F85B01]"
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <motion.span
                      layoutId="homeLoginDesktopNavUnderline"
                      className="absolute inset-x-0 -bottom-1 h-[2.5px] rounded-full bg-gradient-to-r from-[#F85B01] to-[#FF7A00]"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            aria-label="My Account Menu"
            onClick={() => setAccountMenuOpen((prev) => !prev)}
            className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
              accountMenuOpen
                ? "bg-[#1E1713] text-white ring-3 ring-[#F85B01]/30 shadow-sm"
                : "bg-[#322822] hover:bg-[#F85B01] text-white"
            }`}
          >
            <User className="w-5 h-5 stroke-[2]" />
          </motion.button>
        </div>
      </motion.header>

      <div
        onClick={() => setAccountMenuOpen(false)}
        className="relative flex-1 w-full h-full bg-white overflow-hidden"
      >
        {mapPins.map((pin, index) => {
          const isSelected = activePopupPin?.id === pin.id;
          return (
            <div
              key={pin.id}
              style={{ left: `${pin.xPercent}%`, top: `${pin.yPercent}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              {(pin.isPrimary || isSelected) && (
                <>
                  <motion.span
                    animate={{ scale: [1, 1.35, 1], opacity: [0.45, 0.15, 0.45] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -inset-3 rounded-full bg-[#199A5E]/20 pointer-events-none"
                  />
                  <span className="absolute -inset-2 rounded-full border border-dashed border-[#199A5E]/70 pointer-events-none" />
                </>
              )}

              <motion.button
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: isSelected ? 1.1 : 1 }}
                transition={{
                  delay: 0.1 + index * 0.08,
                  type: "spring",
                  stiffness: 360,
                  damping: 22,
                }}
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.94 }}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setAccountMenuOpen(false);
                  setActivePopupPin(pin);
                }}
                aria-label="Property location pin"
                className={`relative rounded-full flex items-center justify-center text-white border-2 border-white cursor-pointer ${
                  pin.isPrimary
                    ? "w-11 h-11 bg-gradient-to-br from-[#24B373] to-[#168854] shadow-[0_6px_20px_rgba(22,136,84,0.45)]"
                    : "w-10 h-10 bg-gradient-to-br from-[#24B373] to-[#168854] shadow-[0_4px_14px_rgba(22,136,84,0.38)]"
                }`}
              >
                <MapPinHouseSvg className={pin.isPrimary ? "w-5 h-5" : "w-4.5 h-4.5"} />
              </motion.button>
            </div>
          );
        })}

        <AnimatePresence>
          {accountMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-2.5 right-8 sm:right-12 z-30 w-[260px] rounded-[4px] bg-white border border-[#E5DFD4] shadow-[0_14px_38px_rgba(50,40,34,0.14)] overflow-hidden"
            >
              <div className="p-4 flex items-center gap-3 border-b border-[#F1ECE4]">
                <div className="w-10 h-10 rounded-full bg-[#322822] text-white flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-extrabold text-[#1E1713] leading-tight truncate">
                    {homeLoginData.accountTitle}
                  </h3>
                  <p className="text-xs text-[#8C827A] font-medium mt-0.5 truncate">
                    {homeLoginData.accountSubtitle}
                  </p>
                </div>
              </div>

              <div className="py-1.5 px-1.5 space-y-0.5">
                {accountMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setAccountMenuOpen(false);
                        navigate(
                          item.id === "dashboard"
                            ? `/${targetViewport}/dashboard`
                            : `/${targetViewport}/dashboard/${item.id}`,
                        );
                      }}
                      className="group w-full px-3 py-2.5 rounded-[4px] flex items-center gap-3.5 text-left text-[#322822] hover:bg-[#FFF8F3] hover:text-[#F85B01] transition-colors cursor-pointer"
                    >
                      <Icon className="w-4 h-4 text-[#6B5E57] group-hover:text-[#F85B01] shrink-0 transition-colors" />
                      <span className="text-[13px] font-semibold truncate">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="p-1.5 border-t border-[#F1ECE4]">
                <button
                  type="button"
                  onClick={() => navigate(`/${targetViewport}/home`)}
                  className="w-full px-3 py-2.5 rounded-[4px] flex items-center gap-3.5 text-left text-[#E24E00] hover:bg-[#FFF3EB] font-bold text-[13px] transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-[#F85B01] shrink-0" />
                  <span>{homeLoginData.signOutLabel}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2.5">
          {mapFloatingControls.map((ctrl) => {
            const Icon = ctrl.icon;
            const isFavActive = ctrl.id === "favorite" && mapFavorite;
            return (
              <motion.button
                key={ctrl.id}
                whileHover={{ scale: 1.08, x: -2 }}
                whileTap={{ scale: 0.94 }}
                type="button"
                title={ctrl.label}
                aria-label={ctrl.label}
                onClick={() => {
                  if (ctrl.id === "favorite") {
                    setMapFavorite((prev) => !prev);
                  }
                }}
                className={`group relative w-11 h-11 rounded-full border transition-all duration-200 flex items-center justify-center cursor-pointer shadow-[0_4px_14px_rgba(50,40,34,0.1)] ${
                  isFavActive
                    ? "bg-[#FFF3EB] border-[#F85B01] text-[#F85B01]"
                    : "bg-white hover:bg-[#FFF8F3] border-[#E5DFD4] hover:border-[#F85B01]/50 text-[#4A3E39] hover:text-[#F85B01]"
                }`}
              >
                {ctrl.isWhatsApp ? (
                  <WhatsAppSvg className="w-5 h-5 text-[#F85B01]" />
                ) : (
                  <Icon
                    className={`w-[18px] h-[18px] ${
                      isFavActive ? "fill-[#F85B01] text-[#F85B01]" : ""
                    }`}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          type="button"
          aria-label="Toggle Fullscreen"
          onClick={() => {
            setIsFullscreen((prev) => !prev);
            if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
              document.documentElement.requestFullscreen().catch(() => {});
            } else if (document.fullscreenElement && document.exitFullscreen) {
              document.exitFullscreen().catch(() => {});
            }
          }}
          className="absolute right-4 sm:right-6 bottom-5 z-20 w-10 h-10 rounded-[4px] bg-white hover:bg-[#FFF8F3] border border-[#E5DFD4] hover:border-[#F85B01]/50 text-[#4A3E39] hover:text-[#F85B01] shadow-[0_4px_14px_rgba(50,40,34,0.1)] flex items-center justify-center cursor-pointer transition-all"
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {activePopupPin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActivePopupPin(null)}
            className="absolute inset-0 z-50 bg-black/45 flex justify-end"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 360, damping: 34 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[390px] max-w-full h-full bg-white shadow-[-10px_0_36px_rgba(0,0,0,0.22)] overflow-hidden"
            >
              <button
                type="button"
                aria-label="Close dialog"
                onClick={() => setActivePopupPin(null)}
                className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-[#1E1713]/80 hover:bg-[#F85B01] text-white backdrop-blur-md border border-white/25 shadow-[0_4px_12px_rgba(0,0,0,0.28)] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <button
                type="button"
                aria-label="Close property details"
                onClick={() => setActivePopupPin(null)}
                className="absolute bottom-0 right-0 z-20 w-[76px] h-[64px] bg-transparent cursor-pointer"
              />

              <iframe
                src={homeLoginData.propertyPopupUrl}
                title="Property Details"
                className="w-[calc(100%+18px)] h-full border-0 block p-0 m-0 bg-white"
                allow="fullscreen; geolocation"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
