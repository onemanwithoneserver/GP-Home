import { useState, type ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Maximize2, Minimize2, ArrowLeft } from "lucide-react";
import mapTexture from "../../Assets/Luxury/map_texture.jpg";

export interface MapPinPoint {
  id: string;
  xPercent: number;
  yPercent: number;
  isPrimary?: boolean;
}

export interface MapControl {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  isWhatsApp?: boolean;
}

interface MapCanvasProps {
  pins: MapPinPoint[];
  controls: MapControl[];
  popupUrl: string;
  isMobile?: boolean;
}

function HouseGlyph({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 3.2L3 10.5h2.5v8.8c0 .4.3.7.7.7h4.3v-5.5h3v5.5h4.3c.4 0 .7-.3.7-.7v-8.8H21L12 3.2z" />
    </svg>
  );
}

function WhatsAppGlyph({ className = "w-4 h-4" }: { className?: string }) {
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

export default function MapCanvas({ pins, controls, popupUrl, isMobile = false }: MapCanvasProps) {
  const [activePin, setActivePin] = useState<MapPinPoint | null>(null);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const toggleFullscreen = () => {
    setFullscreen((p) => !p);
    if (isMobile) return;
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  };

  const pinSize = isMobile ? "w-9 h-9" : "w-11 h-11";
  const glyphSize = isMobile ? "w-4 h-4" : "w-[18px] h-[18px]";

  return (
    <div className="relative flex-1 w-full bg-white overflow-hidden">
      <motion.div
        animate={{ scale: zoom }}
        transition={{ type: "spring", stiffness: 200, damping: 26 }}
        className="absolute inset-0"
      >
        <img
          src={mapTexture}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.07] pointer-events-none select-none mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(50,40,34,0.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]" />

        {pins.map((pin, i) => {
          const selected = activePin?.id === pin.id;
          const highlight = pin.isPrimary || selected;
          return (
            <div
              key={pin.id}
              style={{
                left: `${isMobile ? pin.xPercent - 3 : pin.xPercent}%`,
                top: `${isMobile ? pin.yPercent - 2 : pin.yPercent}%`,
              }}
              className="absolute z-20 -translate-x-1/2 -translate-y-full"
            >
              <motion.div
                animate={{ scale: 1 / zoom }}
                style={{ originX: 0.5, originY: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 26 }}
              >
                <motion.button
                  type="button"
                  aria-label="Property location pin"
                  initial={{ opacity: 0, y: -28, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: selected ? 1.14 : 1 }}
                  transition={{ delay: 0.15 + i * 0.1, type: "spring", stiffness: 420, damping: 18 }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePin(pin);
                  }}
                  className="relative flex flex-col items-center cursor-pointer"
                >
                  <span className="relative flex items-center justify-center">
                    {highlight && (
                      <>
                        <motion.span
                          className={`absolute ${pinSize} rounded-full ${
                            selected ? "bg-[#F85B01]/35" : "bg-[#423127]/25"
                          }`}
                          animate={{ scale: [1, 2.4], opacity: [0.55, 0] }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                        />
                        <motion.span
                          className={`absolute ${pinSize} rounded-full ${
                            selected ? "bg-[#F85B01]/35" : "bg-[#423127]/25"
                          }`}
                          animate={{ scale: [1, 2.4], opacity: [0.55, 0] }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
                        />
                      </>
                    )}
                    <span
                      className={`relative ${pinSize} rounded-[50%_50%_6px_50%] rotate-45 border-[2.5px] border-white flex items-center justify-center transition-all duration-300 ${
                        selected
                          ? "bg-gradient-to-br from-[#FF8A2A] to-[#E24E00] shadow-[0_12px_28px_-6px_rgba(248,91,1,0.75)] ring-2 ring-[#1E1713]"
                          : "bg-gradient-to-br from-[#423127] via-[#2E2018] to-[#1E1713] shadow-[0_10px_24px_-8px_rgba(30,23,19,0.7)]"
                      }`}
                    >
                      <span className="-rotate-45 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
                        <HouseGlyph className={glyphSize} />
                      </span>
                    </span>
                  </span>
                  <span className="mt-1.5 w-4 h-1.5 rounded-full bg-black/25 blur-[2px]" />
                </motion.button>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`absolute z-30 ${isMobile ? "left-3 bottom-4" : "left-6 bottom-6"} inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-xl border border-[#EEE6DB] shadow-[0_10px_30px_-14px_rgba(30,23,19,0.35)] ${
          isMobile ? "h-8 px-3 text-[11px]" : "h-10 px-4 text-[12.5px]"
        } font-bold text-[#322822]`}
      >
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-[#423127] animate-ping opacity-70" />
          <span className="relative w-2 h-2 rounded-full bg-[#423127]" />
        </span>
        <span>{pins.length} projects in view</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className={`absolute z-30 top-1/2 -translate-y-1/2 ${
          isMobile ? "right-3 p-1 gap-0.5" : "right-5 p-1.5 gap-1"
        } flex flex-col rounded-2xl bg-white/90 backdrop-blur-xl border border-[#EEE6DB] shadow-[0_18px_40px_-18px_rgba(30,23,19,0.4)]`}
      >
        {controls.map((ctrl) => {
          const Icon = ctrl.icon;
          const fav = ctrl.id === "favorite" && favorite;
          return (
            <motion.button
              key={ctrl.id}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              type="button"
              aria-label={ctrl.label}
              onClick={() => {
                if (ctrl.id === "favorite") setFavorite((p) => !p);
              }}
              className={`group relative ${
                isMobile ? "w-9 h-9" : "w-10 h-10"
              } rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                fav
                  ? "bg-[#FFF1E6] text-[#F85B01]"
                  : ctrl.isWhatsApp
                    ? "text-[#16A34A] hover:bg-[#ECFDF3]"
                    : "text-[#4A3E39] hover:bg-[#FAF6F1] hover:text-[#F85B01]"
              }`}
            >
              {ctrl.isWhatsApp ? (
                <WhatsAppGlyph className="w-[18px] h-[18px]" />
              ) : (
                <Icon className={`w-[18px] h-[18px] ${fav ? "fill-[#F85B01]" : ""}`} />
              )}
              {!isMobile && (
                <span className="pointer-events-none absolute right-full mr-3 px-2.5 py-1 rounded-lg bg-[#1E1713] text-white text-[11px] font-bold whitespace-nowrap opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                  {ctrl.label}
                </span>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className={`absolute z-30 ${isMobile ? "right-3 bottom-4" : "right-5 bottom-6"} flex items-center gap-2`}
      >
        <div className="flex items-center rounded-full bg-white/90 backdrop-blur-xl border border-[#EEE6DB] shadow-[0_10px_30px_-14px_rgba(30,23,19,0.35)] p-1">
          <button
            type="button"
            aria-label="Zoom out"
            onClick={() => setZoom((z) => Math.max(1, +(z - 0.2).toFixed(2)))}
            className={`${isMobile ? "w-7 h-7" : "w-8 h-8"} rounded-full flex items-center justify-center text-[#4A3E39] hover:bg-[#FAF6F1] hover:text-[#F85B01] cursor-pointer`}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-10 text-center text-[11px] font-semibold text-[#6B5E57] tabular-nums">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            aria-label="Zoom in"
            onClick={() => setZoom((z) => Math.min(1.8, +(z + 0.2).toFixed(2)))}
            className={`${isMobile ? "w-7 h-7" : "w-8 h-8"} rounded-full flex items-center justify-center text-[#4A3E39] hover:bg-[#FAF6F1] hover:text-[#F85B01] cursor-pointer`}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <motion.button
          whileTap={{ scale: 0.92 }}
          type="button"
          aria-label="Toggle Fullscreen"
          onClick={toggleFullscreen}
          className={`${isMobile ? "w-9 h-9" : "w-10 h-10"} rounded-full bg-[#1E1713] text-white flex items-center justify-center shadow-[0_10px_24px_-10px_rgba(30,23,19,0.7)] cursor-pointer`}
        >
          {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {activePin && (
          <motion.div
            key="popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActivePin(null)}
            className="absolute inset-0 z-50 bg-[#1E1713]/30 backdrop-blur-[3px] flex justify-end"
          >
            {isMobile ? (
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 320, damping: 36 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute inset-x-0 bottom-0 top-2 rounded-t-[4px] bg-white overflow-hidden flex flex-col shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.45)]"
              >
                <div className="relative h-11 shrink-0 flex items-center justify-center border-b border-[#F2ECE4]">
                  <span className="w-10 h-1 rounded-full bg-[#E2D9CD]" />
                  <button
                    type="button"
                    aria-label="Back to map"
                    onClick={() => setActivePin(null)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-[4px] bg-[#F6F1EA] hover:bg-[#F85B01] hover:text-white text-[#322822] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
                <div className="relative flex-1 overflow-hidden">
                  <button
                    type="button"
                    aria-label="Close property details"
                    onClick={() => setActivePin(null)}
                    className="absolute bottom-0 right-0 z-20 w-[76px] h-[64px] bg-transparent cursor-pointer"
                  />
                  <iframe
                    src={popupUrl}
                    title="Property Details"
                    className="w-[calc(100%+18px)] h-full border-0 block bg-white"
                    allow="fullscreen; geolocation"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 320, damping: 36 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-[390px] max-w-full h-full"
              >
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 }}
                  whileHover={{ x: -2 }}
                  whileTap={{ scale: 0.94 }}
                  type="button"
                  aria-label="Back to map"
                  onClick={() => setActivePin(null)}
                  className="absolute -left-13 top-4 z-20 w-10 h-10 rounded-[4px] bg-white text-[#1E1713] hover:bg-[#F85B01] hover:text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
                </motion.button>
                <div className="relative w-full h-full bg-white overflow-hidden rounded-l-[4px] shadow-[-30px_0_60px_-20px_rgba(0,0,0,0.45)]">
                  <button
                    type="button"
                    aria-label="Close property details"
                    onClick={() => setActivePin(null)}
                    className="absolute bottom-0 right-0 z-20 w-[76px] h-[64px] bg-transparent cursor-pointer"
                  />
                  <iframe
                    src={popupUrl}
                    title="Property Details"
                    className="w-[calc(100%+18px)] h-full border-0 block bg-white"
                    allow="fullscreen; geolocation"
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

