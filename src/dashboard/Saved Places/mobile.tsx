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
      <Page isMobile>
        <PageHeader
          isMobile
          title={savedPlacesData.title}
          subtitle={savedPlacesData.subtitle}
          actions={
            <PrimaryButton
              size="sm"
              icon={<Plus className="w-3.5 h-3.5 stroke-[2.5]" />}
              onClick={openModal}
            >
              {savedPlacesData.addPlaceButton}
            </PrimaryButton>
          }
        />

        {places.length === 0 ? (
          <EmptyState
            isMobile
            icon={MapPin}
            title={savedPlacesData.emptyState.title}
            subtitle={savedPlacesData.emptyState.subtitle}
            action={
              <SecondaryButton
                size="sm"
                icon={<Plus className="w-3.5 h-3.5 text-[#F85B01]" />}
                onClick={openModal}
              >
                {savedPlacesData.emptyState.ctaLabel}
              </SecondaryButton>
            }
          />
        ) : (
          <div className="space-y-3">
            {places.map((place) => (
              <Card key={place.id} className="p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <IconTile icon={MapPin} tone="brand" size="sm" />
                  <div className="min-w-0">
                    <h3 className="text-sm font-black text-[#1E1713] tracking-tight truncate">
                      {place.label}
                    </h3>
                    <p className="text-[11px] text-[#7A6D64] font-medium truncate">
                      {place.address}
                    </p>
                  </div>
                </div>

                <DangerButton
                  size="sm"
                  icon={<Trash2 className="w-3.5 h-3.5" />}
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
            className="fixed inset-0 z-50 bg-[#1E1713]/50 backdrop-blur-sm flex items-center justify-center p-3"
          >
            <motion.form
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSavePlace}
              className="w-full max-w-[370px] rounded-2xl bg-white border border-[#EEE6DB] p-4 shadow-[0_20px_45px_-15px_rgba(30,23,19,0.45)] space-y-3.5 max-h-[88vh] overflow-y-auto scrollbar-hide"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#F2ECE4]">
                <h2 className="text-base font-black text-[#1E1713] tracking-tight">
                  {savedPlacesData.modal.title}
                </h2>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-[#FAF6F1] text-[#6B5E57] flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <TextField
                  isMobile
                  label={savedPlacesData.modal.labelPlaceholder}
                  value={placeLabel}
                  onChange={(e) => setPlaceLabel(e.target.value)}
                  helper={savedPlacesData.modal.labelHelper}
                />

                <div className="flex items-center gap-1.5 mt-2">
                  {savedPlacesData.modal.quickChips.map((chip) => {
                    const selected = placeLabel.toLowerCase() === chip.toLowerCase();
                    return (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => setPlaceLabel(chip)}
                        className={`h-7 px-3 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                          selected
                            ? "bg-[#FFF1E6] border-[#F85B01] text-[#E24E00]"
                            : "bg-[#FAF8F5] border-[#E2D9CD] text-[#4A3E39]"
                        }`}
                      >
                        {chip}
                      </button>
                    );
                  })}
                </div>
              </div>

              <TextField
                isMobile
                label={savedPlacesData.modal.addressPlaceholder}
                value={placeAddress}
                onChange={(e) => setPlaceAddress(e.target.value)}
                helper={savedPlacesData.modal.addressHelper}
              />

              <div>
                <div className="mb-1.5">
                  <h3 className="text-[11px] font-black uppercase tracking-wider text-[#1E1713]">
                    {savedPlacesData.modal.mapTitle}
                  </h3>
                  <p className="text-[10.5px] text-[#7A6D64] font-medium leading-tight">
                    {savedPlacesData.modal.mapSubtitle}
                  </p>
                </div>

                <MapPicker isMobile pinPos={pinPos} onChange={setPinPos} />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#F2ECE4]">
                <SecondaryButton size="sm" onClick={() => setModalOpen(false)}>
                  {savedPlacesData.modal.cancelLabel}
                </SecondaryButton>
                <PrimaryButton size="sm" type="submit">
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
