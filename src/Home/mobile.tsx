import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Compass, Minimize2, X } from "lucide-react";
import {
  GullyLogo,
  navItems,
  mapFloatingControls,
  mapPins,
  homeData,
  SlidersHorizontal,
  Search,
  LogIn,
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

function WhatsAppSvg({ className = "w-4 h-4" }: { className?: string }) {
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

export default function HomeMobile() {
  const navigate = useNavigate();
  const location = useLocation();
  const targetViewport = location.pathname.startsWith("/mobile") ? "mobile" : "desktop";

  const [activeNav, setActiveNav] = useState<string>("home");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchFocused, setSearchFocused] = useState<boolean>(false);
  const [activePopupPin, setActivePopupPin] = useState<MapPinItem | null>(null);
  const [mapFavorite, setMapFavorite] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="relative w-full h-full min-h-[620px] flex-1 flex flex-col bg-white overflow-hidden select-text">
      <div className="relative z-30 bg-white border-b border-[#E5DFD4] px-3.5 pt-3 pb-2.5 shrink-0 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <GullyLogo className="h-8 w-auto" />

          <div className="flex items-center gap-1.5">
            {navItems.map((item) => {
              const active = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id)}
                  className={`px-2 py-1 rounded-[4px] text-[11px] font-bold transition-colors cursor-pointer ${
                    active
                      ? "bg-[#FFF3EB] text-[#F85B01]"
                      : "text-[#322822] hover:text-[#F85B01]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => navigate(`/${targetViewport}/login`)}
              className="sheen relative overflow-hidden h-8 px-3 rounded-[4px] bg-gradient-to-r from-[#F85B01] to-[#FF7A00] text-white font-bold text-[11px] shadow-[0_3px_12px_rgba(248,91,1,0.3)] flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{homeData.signInLabel}</span>
            </motion.button>
          </div>
        </div>

        <div
          className={`w-full h-9.5 rounded-[4px] bg-[#FAF8F5] border transition-colors flex items-center px-2 gap-1.5 ${
            searchFocused ? "border-[#F85B01] bg-white" : "border-[#E5DFD4]"
          }`}
        >
          <div className="w-6 h-6 rounded-[4px] bg-[#FFF3EB] text-[#F85B01] flex items-center justify-center shrink-0">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={homeData.searchPlaceholder}
            className="flex-1 bg-transparent text-xs text-[#1E1713] placeholder-[#9C9088] font-medium outline-none min-w-0"
          />
          <button
            type="button"
            aria-label="Filter"
            className="w-7 h-7 rounded-[4px] bg-[#F1ECE4] text-[#4A3E39] border border-[#E5DFD4] flex items-center justify-center cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            aria-label="Search"
            className="w-7 h-7 rounded-[4px] bg-[#F1ECE4] hover:bg-[#F85B01] text-[#4A3E39] hover:text-white border border-[#E5DFD4] flex items-center justify-center cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="relative flex-1 w-full bg-white overflow-hidden">
        {mapPins.map((pin) => {
          const isSelected = activePopupPin?.id === pin.id;
          return (
            <div
              key={pin.id}
              style={{ left: `${pin.xPercent - 2}%`, top: `${pin.yPercent - 2}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              {(pin.isPrimary || isSelected) && (
                <>
                  <motion.span
                    animate={{ scale: [1, 1.35, 1], opacity: [0.45, 0.15, 0.45] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute -inset-2.5 rounded-full bg-[#199A5E]/20 pointer-events-none"
                  />
                  <span className="absolute -inset-1.5 rounded-full border border-dashed border-[#199A5E]/70 pointer-events-none" />
                </>
              )}
              <motion.button
                whileTap={{ scale: 0.92 }}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePopupPin(pin);
                }}
                aria-label="Property location pin"
                className={`relative rounded-full flex items-center justify-center text-white border-2 border-white shadow-[0_5px_16px_rgba(22,136,84,0.4)] cursor-pointer ${
                  pin.isPrimary
                    ? "w-10 h-10 bg-gradient-to-br from-[#24B373] to-[#168854]"
                    : "w-9 h-9 bg-gradient-to-br from-[#24B373] to-[#168854]"
                }`}
              >
                <MapPinHouseSvg className={pin.isPrimary ? "w-4.5 h-4.5" : "w-4 h-4"} />
              </motion.button>
            </div>
          );
        })}

        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2">
          {mapFloatingControls.map((ctrl) => {
            const Icon = ctrl.icon;
            const isFavActive = ctrl.id === "favorite" && mapFavorite;
            return (
              <motion.button
                key={ctrl.id}
                whileTap={{ scale: 0.92 }}
                type="button"
                aria-label={ctrl.label}
                onClick={() => {
                  if (ctrl.id === "favorite") {
                    setMapFavorite((prev) => !prev);
                  }
                }}
                className={`w-9.5 h-9.5 rounded-full border shadow-[0_3px_10px_rgba(50,40,34,0.1)] flex items-center justify-center cursor-pointer ${
                  isFavActive
                    ? "bg-[#FFF3EB] border-[#F85B01] text-[#F85B01]"
                    : "bg-white border-[#E5DFD4] text-[#4A3E39]"
                }`}
              >
                {ctrl.isWhatsApp ? (
                  <WhatsAppSvg className="w-4 h-4 text-[#F85B01]" />
                ) : (
                  <Icon
                    className={`w-4 h-4 ${isFavActive ? "fill-[#F85B01] text-[#F85B01]" : ""}`}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Toggle Fullscreen"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="absolute right-3 bottom-4 z-20 w-9 h-9 rounded-[4px] bg-white border border-[#E5DFD4] text-[#4A3E39] shadow-[0_3px_10px_rgba(50,40,34,0.1)] flex items-center justify-center cursor-pointer"
        >
          {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
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
              className="relative w-[390px] max-w-full h-full bg-white overflow-hidden"
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
                src={homeData.propertyPopupUrl}
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
