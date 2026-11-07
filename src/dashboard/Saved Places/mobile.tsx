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

export default function SavedPlacesMobile() {
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
    <DashboardShell activeTab="saved-places" isMobile={true}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="space-y-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-extrabold text-[#1E1713] tracking-tight">
              {savedPlacesData.title}
            </h1>
            <p className="text-xs text-[#6B5E57] font-medium mt-0.5">
              {savedPlacesData.subtitle}
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={openModal}
            className="sheen relative overflow-hidden px-3 py-2 rounded-[6px] bg-gradient-to-r from-[#F85B01] to-[#FF7A00] text-white text-xs font-bold shadow-[0_3px_10px_rgba(248,91,1,0.28)] inline-flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{savedPlacesData.addPlaceButton}</span>
          </motion.button>
        </div>

        {places.length === 0 ? (
          <div className="w-full rounded-[8px] bg-white border border-[#E5DFD4] py-12 px-4 flex flex-col items-center justify-center text-center shadow-[0_2px_8px_rgba(50,40,34,0.04)]">
            <div className="w-11 h-11 rounded-full bg-[#FFF3EB] text-[#F85B01] flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h2 className="text-sm font-extrabold text-[#1E1713]">
              {savedPlacesData.emptyState.title}
            </h2>
            <p className="text-xs text-[#6B5E57] font-medium mt-1 max-w-[300px]">
              {savedPlacesData.emptyState.subtitle}
            </p>
            <button
              type="button"
              onClick={openModal}
              className="mt-4 px-3.5 py-2 rounded-[6px] bg-white border border-[#D8D0C5] text-[#322822] text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{savedPlacesData.emptyState.ctaLabel}</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {places.map((place) => (
              <div
                key={place.id}
                className="rounded-[8px] bg-white border border-[#E5DFD4] p-4 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-[#FFF3EB] text-[#F85B01] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-extrabold text-[#1E1713] truncate">
                      {place.label}
                    </h3>
                    <p className="text-[11px] text-[#6B5E57] font-medium truncate">
                      {place.address}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPlaces((prev) => prev.filter((p) => p.id !== place.id))}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#DC2626] px-2 py-1 rounded-[4px] cursor-pointer shrink-0"
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
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-3"
          >
            <motion.form
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSavePlace}
              className="w-full max-w-[360px] rounded-[10px] bg-white border border-[#E5DFD4] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.25)] space-y-3.5 max-h-[86vh] overflow-y-auto scrollbar-hide"
            >
              <h2 className="text-base font-extrabold text-[#1E1713]">
                {savedPlacesData.modal.title}
              </h2>

              <div>
                <input
                  type="text"
                  value={placeLabel}
                  onChange={(e) => setPlaceLabel(e.target.value)}
                  placeholder={savedPlacesData.modal.labelPlaceholder}
                  className="w-full h-10.5 rounded-[6px] border border-[#D8D0C5] focus:border-[#F85B01] px-3 text-xs text-[#1E1713] placeholder-[#6B5E57] outline-none"
                />
                <p className="text-[11px] text-[#6B5E57] mt-1">
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
                      className={`px-3 py-1 rounded-full text-xs font-semibold border cursor-pointer ${
                        selected
                          ? "bg-[#FFF3EB] border-[#F85B01] text-[#F85B01]"
                          : "bg-white border-[#D8D0C5] text-[#322822]"
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
                  className="w-full h-10.5 rounded-[6px] border border-[#D8D0C5] focus:border-[#F85B01] px-3 text-xs text-[#1E1713] placeholder-[#6B5E57] outline-none"
                />
                <p className="text-[11px] text-[#6B5E57] mt-1">
                  {savedPlacesData.modal.addressHelper}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-extrabold text-[#1E1713]">
                  {savedPlacesData.modal.mapTitle}
                </h3>
                <p className="text-[11px] text-[#6B5E57] font-medium mt-0.5">
                  {savedPlacesData.modal.mapSubtitle}
                </p>

                <div
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = Math.min(88, Math.max(12, ((e.clientX - rect.left) / rect.width) * 100));
                    const y = Math.min(86, Math.max(14, ((e.clientY - rect.top) / rect.height) * 100));
                    setPinPos({ x, y });
                  }}
                  className="relative mt-2 w-full h-[170px] rounded-[8px] bg-white border border-[#E5DFD4] overflow-hidden cursor-crosshair select-none"
                >
                  <div
                    style={{ left: `${pinPos.x}%`, top: `${pinPos.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-full pointer-events-none"
                  >
                    <svg viewBox="0 0 24 32" className="w-7 h-9 drop-shadow-md">
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
                    className="absolute right-2.5 top-1/2 -translate-y-7 w-7 h-7 rounded-full bg-white border border-[#E5DFD4] shadow-sm flex items-center justify-center text-[#4A3E39]"
                  >
                    <Maximize2 className="w-3 h-3" />
                  </button>

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-2.5 bottom-2.5 rounded-[4px] bg-white border border-[#E5DFD4] shadow-sm flex flex-col overflow-hidden"
                  >
                    <button
                      type="button"
                      aria-label="Zoom in"
                      className="w-7 h-7 flex items-center justify-center text-[#4A3E39] border-b border-[#E5DFD4]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Zoom out"
                      className="w-7 h-7 flex items-center justify-center text-[#4A3E39]"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3.5 py-2 rounded-[6px] text-xs font-bold text-[#4A3E39] cursor-pointer"
                >
                  {savedPlacesData.modal.cancelLabel}
                </button>
                <button
                  type="submit"
                  className="sheen relative overflow-hidden px-4 py-2 rounded-[6px] bg-gradient-to-r from-[#F85B01] to-[#FF7A00] text-white text-xs font-bold shadow-[0_3px_10px_rgba(248,91,1,0.28)] cursor-pointer"
                >
                  {savedPlacesData.modal.saveLabel}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardShell>
  );
}

