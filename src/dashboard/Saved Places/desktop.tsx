import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardShell from "../Shell";
import {
  savedPlacesData,
  MapPin,
  Plus,
  Trash2,
  Maximize2,
  Minus,
  type SavedPlaceItem,
} from "./data";

export default function SavedPlacesDesktop() {
  const [places, setPlaces] = useState<SavedPlaceItem[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [placeLabel, setPlaceLabel] = useState<string>("");
  const [placeAddress, setPlaceAddress] = useState<string>("");
  const [pinPos, setPinPos] = useState<{ x: number; y: number }>({ x: 48, y: 46 });

  const openModal = () => {
    setPlaceLabel("");
    setPlaceAddress("");
    setPinPos({ x: 48, y: 46 });
    setModalOpen(true);
  };

  const handleSavePlace = (e: React.FormEvent) => {
    e.preventDefault();
    const finalLabel = placeLabel.trim() || "Home";
    const finalAddress = placeAddress.trim() || "Madhapur, Hyderabad";
    setPlaces((prev) => [
      ...prev,
      {
        id: `place-${Date.now()}`,
        label: finalLabel,
        address: finalAddress,
        pinX: pinPos.x,
        pinY: pinPos.y,
      },
    ]);
    setModalOpen(false);
  };

  return (
    <DashboardShell activeTab="saved-places" isMobile={false}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#1E1713] tracking-tight">
              {savedPlacesData.title}
            </h1>
            <p className="text-sm text-[#6B5E57] font-medium mt-1">
              {savedPlacesData.subtitle}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={openModal}
            className="sheen relative overflow-hidden px-4 py-2.5 rounded-[6px] bg-gradient-to-r from-[#F85B01] to-[#FF7A00] hover:from-[#E24E00] hover:to-[#F85B01] text-white text-xs sm:text-[13px] font-bold shadow-[0_4px_14px_rgba(248,91,1,0.28)] inline-flex items-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>{savedPlacesData.addPlaceButton}</span>
          </motion.button>
        </div>

        {places.length === 0 ? (
          <div className="w-full rounded-[8px] bg-white border border-[#E5DFD4] py-16 px-6 flex flex-col items-center justify-center text-center shadow-[0_2px_10px_rgba(50,40,34,0.04)]">
            <div className="w-12 h-12 rounded-full bg-[#FFF3EB] text-[#F85B01] flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h2 className="text-base font-extrabold text-[#1E1713]">
              {savedPlacesData.emptyState.title}
            </h2>
            <p className="text-sm text-[#6B5E57] font-medium mt-1.5 max-w-[440px]">
              {savedPlacesData.emptyState.subtitle}
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={openModal}
              className="mt-6 px-4 py-2.5 rounded-[6px] bg-white border border-[#D8D0C5] hover:border-[#F85B01] text-[#322822] hover:text-[#F85B01] text-xs sm:text-[13px] font-bold inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{savedPlacesData.emptyState.ctaLabel}</span>
            </motion.button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {places.map((place) => (
              <div
                key={place.id}
                className="rounded-[8px] bg-white border border-[#E5DFD4] p-5 flex items-start justify-between gap-4 shadow-[0_2px_10px_rgba(50,40,34,0.04)]"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#FFF3EB] text-[#F85B01] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#1E1713]">{place.label}</h3>
                    <p className="text-xs text-[#6B5E57] font-medium mt-1">{place.address}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPlaces((prev) => prev.filter((p) => p.id !== place.id))}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DC2626] hover:text-[#B91C1C] px-2.5 py-1.5 rounded-[6px] hover:bg-[#FEF2F2] transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          >
            <motion.form
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSavePlace}
              className="w-full max-w-[540px] rounded-[12px] bg-white border border-[#E5DFD4] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] space-y-4 max-h-[90vh] overflow-y-auto scrollbar-hide"
            >
              <h2 className="text-lg font-extrabold text-[#1E1713]">
                {savedPlacesData.modal.title}
              </h2>

              <div>
                <input
                  type="text"
                  value={placeLabel}
                  onChange={(e) => setPlaceLabel(e.target.value)}
                  placeholder={savedPlacesData.modal.labelPlaceholder}
                  className="w-full h-12 rounded-[6px] border border-[#D8D0C5] focus:border-[#F85B01] px-4 text-sm text-[#1E1713] placeholder-[#6B5E57] outline-none transition-colors"
                />
                <p className="text-xs text-[#6B5E57] mt-1.5 px-1">
                  {savedPlacesData.modal.labelHelper}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {savedPlacesData.modal.quickChips.map((chip) => {
                  const selected = placeLabel.toLowerCase() === chip.toLowerCase();
                  return (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setPlaceLabel(chip)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                        selected
                          ? "bg-[#FFF3EB] border-[#F85B01] text-[#F85B01]"
                          : "bg-white border-[#D8D0C5] text-[#322822] hover:border-[#F85B01]/50"
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>

              <div>
                <input
                  type="text"
                  value={placeAddress}
                  onChange={(e) => setPlaceAddress(e.target.value)}
                  placeholder={savedPlacesData.modal.addressPlaceholder}
                  className="w-full h-12 rounded-[6px] border border-[#D8D0C5] focus:border-[#F85B01] px-4 text-sm text-[#1E1713] placeholder-[#6B5E57] outline-none transition-colors"
                />
                <p className="text-xs text-[#6B5E57] mt-1.5 px-1">
                  {savedPlacesData.modal.addressHelper}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-[#1E1713]">
                  {savedPlacesData.modal.mapTitle}
                </h3>
                <p className="text-xs text-[#6B5E57] font-medium mt-0.5">
                  {savedPlacesData.modal.mapSubtitle}
                </p>

                <div
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = Math.min(90, Math.max(10, ((e.clientX - rect.left) / rect.width) * 100));
                    const y = Math.min(88, Math.max(12, ((e.clientY - rect.top) / rect.height) * 100));
                    setPinPos({ x, y });
                  }}
                  className="relative mt-2.5 w-full h-[210px] rounded-[10px] bg-white border border-[#E5DFD4] overflow-hidden cursor-crosshair select-none"
                >
                  <div
                    style={{ left: `${pinPos.x}%`, top: `${pinPos.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-full pointer-events-none"
                  >
                    <svg viewBox="0 0 24 32" className="w-8 h-10 drop-shadow-md">
                      <path
                        d="M12 0C5.37 0 0 5.37 0 12c0 9 12 20 12 20s12-11 12-20c0-6.63-5.37-12-12-12z"
                        fill="#EA4335"
                      />
                      <circle cx="12" cy="12" r="4.5" fill="#8E1B13" />
                    </svg>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Expand map"
                    className="absolute right-3 top-1/2 -translate-y-8 w-8 h-8 rounded-full bg-white border border-[#E5DFD4] shadow-sm flex items-center justify-center text-[#4A3E39] cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-3 bottom-3 rounded-[4px] bg-white border border-[#E5DFD4] shadow-sm flex flex-col overflow-hidden"
                  >
                    <button
                      type="button"
                      aria-label="Zoom in"
                      className="w-8 h-8 flex items-center justify-center text-[#4A3E39] hover:bg-[#FAF8F5] border-b border-[#E5DFD4] cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Zoom out"
                      className="w-8 h-8 flex items-center justify-center text-[#4A3E39] hover:bg-[#FAF8F5] cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-[6px] text-xs sm:text-[13px] font-bold text-[#4A3E39] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                >
                  {savedPlacesData.modal.cancelLabel}
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="sheen relative overflow-hidden px-5 py-2.5 rounded-[6px] bg-gradient-to-r from-[#F85B01] to-[#FF7A00] hover:from-[#E24E00] hover:to-[#F85B01] text-white text-xs sm:text-[13px] font-bold shadow-[0_4px_14px_rgba(248,91,1,0.28)] cursor-pointer"
                >
                  {savedPlacesData.modal.saveLabel}
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardShell>
  );
}

