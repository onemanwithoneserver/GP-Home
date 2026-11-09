import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, Trash2, X } from "lucide-react";
import DashboardShell from "../Shell";
import { savedPlacesData, type SavedPlaceItem } from "./data";
import {
  Page,
  PageHeader,
  Card,
  PrimaryButton,
  SecondaryButton,
  DangerButton,
  TextField,
  EmptyState,
  MapPicker,
  IconTile,
} from "../ui";

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
      <Page>
        <PageHeader
          title={savedPlacesData.title}
          subtitle={savedPlacesData.subtitle}
          actions={
            <PrimaryButton
              icon={<Plus className="w-4 h-4 stroke-[2.5]" />}
              onClick={openModal}
            >
              {savedPlacesData.addPlaceButton}
            </PrimaryButton>
          }
        />

        {places.length === 0 ? (
          <EmptyState
            icon={MapPin}
            title={savedPlacesData.emptyState.title}
            subtitle={savedPlacesData.emptyState.subtitle}
            action={
              <SecondaryButton
                icon={<Plus className="w-4 h-4 text-[#F85B01]" />}
                onClick={openModal}
              >
                {savedPlacesData.emptyState.ctaLabel}
              </SecondaryButton>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {places.map((place) => (
              <Card key={place.id} interactive className="p-5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5 min-w-0">
                  <IconTile icon={MapPin} tone="brand" size="md" />
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-[#1E1713] tracking-tight truncate">
                      {place.label}
                    </h3>
                    <p className="text-xs text-[#7A6D64] font-medium mt-1 leading-relaxed">
                      {place.address}
                    </p>
                  </div>
                </div>

                <DangerButton
                  icon={<Trash2 className="w-4 h-4" />}
                  onClick={() => setPlaces((prev) => prev.filter((p) => p.id !== place.id))}
                >
                  Remove
                </DangerButton>
              </Card>
            ))}
          </div>
        )}
      </Page>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 z-50 bg-[#1E1713]/50 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.form
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSavePlace}
              className="w-full max-w-[560px] rounded-3xl bg-white border border-[#EEE6DB] p-6 sm:p-7 shadow-[0_28px_60px_-20px_rgba(30,23,19,0.45)] space-y-4 max-h-[90vh] overflow-y-auto scrollbar-hide"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#F2ECE4]">
                <div>
                  <h2 className="text-lg font-bold text-[#1E1713] tracking-tight">
                    {savedPlacesData.modal.title}
                  </h2>
                  <p className="text-xs text-[#7A6D64] font-medium mt-0.5">
                    Save key landmarks for quick commuting calculations.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#FAF6F1] hover:bg-[#F2ECE4] text-[#6B5E57] flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <TextField
                  label={savedPlacesData.modal.labelPlaceholder}
                  value={placeLabel}
                  onChange={(e) => setPlaceLabel(e.target.value)}
                  helper={savedPlacesData.modal.labelHelper}
                />

                <div className="flex items-center gap-2 mt-2">
                  {savedPlacesData.modal.quickChips.map((chip) => {
                    const selected = placeLabel.toLowerCase() === chip.toLowerCase();
                    return (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => setPlaceLabel(chip)}
                        className={`h-8 px-3.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                          selected
                            ? "bg-[#FFF1E6] border-[#F85B01] text-[#E24E00]"
                            : "bg-[#FAF8F5] border-[#E2D9CD] text-[#4A3E39] hover:border-[#F85B01]/40"
                        }`}
                      >
                        {chip}
                      </button>
                    );
                  })}
                </div>
              </div>

              <TextField
                label={savedPlacesData.modal.addressPlaceholder}
                value={placeAddress}
                onChange={(e) => setPlaceAddress(e.target.value)}
                helper={savedPlacesData.modal.addressHelper}
              />

              <div>
                <div className="mb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E1713]">
                    {savedPlacesData.modal.mapTitle}
                  </h3>
                  <p className="text-xs text-[#7A6D64] font-medium">
                    {savedPlacesData.modal.mapSubtitle}
                  </p>
                </div>

                <MapPicker pinPos={pinPos} onChange={setPinPos} />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F2ECE4]">
                <SecondaryButton onClick={() => setModalOpen(false)}>
                  {savedPlacesData.modal.cancelLabel}
                </SecondaryButton>
                <PrimaryButton type="submit">
                  {savedPlacesData.modal.saveLabel}
                </PrimaryButton>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardShell>
  );
}
