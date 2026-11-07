import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Heart, RotateCcw, Trash2, MapPin, X } from "lucide-react";
import DashboardShell from "../Shell";
import { savedPropertiesData, type SavedPropertyItem } from "./data";
import {
  Page,
  PageHeader,
  Card,
  DangerButton,
  SecondaryButton,
  EmptyState,
} from "../ui";

export default function SavedPropertiesDesktop() {
  const [properties, setProperties] = useState<SavedPropertyItem[]>(
    savedPropertiesData.defaultProperties,
  );
  const [confirmRemoveProperty, setConfirmRemoveProperty] = useState<SavedPropertyItem | null>(null);

  return (
    <DashboardShell activeTab="saved-properties" isMobile={false}>
      <Page>
        <PageHeader
          title={savedPropertiesData.title}
          subtitle={savedPropertiesData.subtitle}
        />

        {properties.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="No saved properties right now"
            subtitle="Explore projects on the map or restore the sample properties to preview your shortlist."
            action={
              <SecondaryButton
                icon={<RotateCcw className="w-4 h-4 text-[#F85B01]" />}
                onClick={() => setProperties(savedPropertiesData.defaultProperties)}
              >
                Restore sample properties
              </SecondaryButton>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map((prop) => (
              <Card
                key={prop.id}
                interactive
                className="overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative bg-gradient-to-r from-[#1E1713] via-[#2D231E] to-[#422F24] text-white px-6 py-5 flex items-center gap-3.5 overflow-hidden">
                    <span className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#F85B01]/30 blur-xl pointer-events-none" />
                    <span className="w-9 h-9 rounded-xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center text-[#FFB074] shrink-0">
                      <Building2 className="w-5 h-5" />
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-base font-black tracking-tight truncate">{prop.name}</h2>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <p className="text-xs text-[#7A6D64] font-semibold flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#F85B01]" />
                        {prop.location}
                      </p>
                      <p className="text-2xl font-black text-[#1E1713] mt-2 tracking-tight">
                        {prop.price}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="h-7 px-3 rounded-full bg-[#FAF6F1] text-[#322822] text-[11.5px] font-bold inline-flex items-center">
                        {prop.bhk}
                      </span>
                      <span className="h-7 px-3 rounded-full bg-[#FAF6F1] text-[#322822] text-[11.5px] font-bold inline-flex items-center">
                        {prop.area}
                      </span>
                      <span className="h-7 px-3 rounded-full bg-white border border-[#E2D9CD] text-[#7A6D64] text-[11.5px] font-bold inline-flex items-center">
                        {prop.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-5 pt-2 border-t border-[#F2ECE4] flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#A89C90]">
                    Saved Property
                  </span>
                  <DangerButton
                    icon={<Trash2 className="w-4 h-4" />}
                    onClick={() => setConfirmRemoveProperty(prop)}
                  >
                    {savedPropertiesData.removeLabel}
                  </DangerButton>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Page>

      <AnimatePresence>
        {confirmRemoveProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setConfirmRemoveProperty(null)}
            className="fixed inset-0 z-50 bg-[#1E1713]/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[420px] rounded-3xl bg-white shadow-2xl border border-[#EEE6DB] p-6 sm:p-7 space-y-5"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-black text-[#1E1713] tracking-tight">
                  Remove Saved Property?
                </h3>
                <button
                  type="button"
                  aria-label="Close dialog"
                  onClick={() => setConfirmRemoveProperty(null)}
                  className="w-8 h-8 rounded-full bg-[#FAF6F1] hover:bg-[#F2ECE4] text-[#6B5E57] hover:text-[#1E1713] flex items-center justify-center cursor-pointer transition-colors shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[#7A6D64] font-medium leading-relaxed -mt-2">
                Are you sure you want to remove <span className="font-bold text-[#1E1713]">{confirmRemoveProperty.name}</span>?
              </p>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <SecondaryButton onClick={() => setConfirmRemoveProperty(null)}>
                  Cancel
                </SecondaryButton>
                <DangerButton
                  icon={<Trash2 className="w-4 h-4" />}
                  onClick={() => {
                    setProperties((prev) => prev.filter((item) => item.id !== confirmRemoveProperty.id));
                    setConfirmRemoveProperty(null);
                  }}
                >
                  Yes, Remove
                </DangerButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardShell>
  );
}
