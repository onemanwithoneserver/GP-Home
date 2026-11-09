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

export default function SavedPropertiesMobile() {
  const [properties, setProperties] = useState<SavedPropertyItem[]>(
    savedPropertiesData.defaultProperties,
  );
  const [confirmRemoveProperty, setConfirmRemoveProperty] = useState<SavedPropertyItem | null>(null);

  return (
    <DashboardShell activeTab="saved-properties" isMobile={true}>
      <Page isMobile>
        <PageHeader
          isMobile
          title={savedPropertiesData.title}
          subtitle={savedPropertiesData.subtitle}
        />

        {properties.length === 0 ? (
          <EmptyState
            isMobile
            icon={Heart}
            title="No saved properties"
            subtitle="Explore projects on the map or restore the sample properties."
            action={
              <SecondaryButton
                size="sm"
                icon={<RotateCcw className="w-3.5 h-3.5 text-[#F85B01]" />}
                onClick={() => setProperties(savedPropertiesData.defaultProperties)}
              >
                Restore sample properties
              </SecondaryButton>
            }
          />
        ) : (
          <div className="space-y-4">
            {properties.map((prop) => (
              <Card key={prop.id} className="overflow-hidden">
                <div className="bg-gradient-to-r from-[#1E1713] to-[#3A2A20] text-white px-4 py-3.5 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#FFB074] shrink-0">
                    <Building2 className="w-4 h-4" />
                  </span>
                  <h2 className="text-sm font-bold tracking-tight truncate">{prop.name}</h2>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <p className="text-[11px] text-[#7A6D64] font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#F85B01]" />
                      {prop.location}
                    </p>
                    <p className="text-xl font-bold text-[#1E1713] mt-1 tracking-tight">
                      {prop.price}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                      <span className="h-6 px-2.5 rounded-full bg-[#FAF6F1] text-[#322822] text-[11px] font-semibold inline-flex items-center">
                        {prop.bhk}
                      </span>
                      <span className="h-6 px-2.5 rounded-full bg-[#FAF6F1] text-[#322822] text-[11px] font-semibold inline-flex items-center">
                        {prop.area}
                      </span>
                      <span className="h-6 px-2.5 rounded-full bg-white border border-[#E2D9CD] text-[#7A6D64] text-[11px] font-medium inline-flex items-center">
                        {prop.status}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#F2ECE4] flex items-center justify-end">
                    <DangerButton
                      size="sm"
                      icon={<Trash2 className="w-3.5 h-3.5" />}
                      onClick={() => setConfirmRemoveProperty(prop)}
                    >
                      {savedPropertiesData.removeLabel}
                    </DangerButton>
                  </div>
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
            className="fixed inset-0 z-50 bg-[#1E1713]/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 80 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-t-[4px] sm:rounded-[4px] bg-white shadow-2xl border-t sm:border border-[#EEE6DB] p-5 space-y-4"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-bold text-[#1E1713] tracking-tight">
                  Remove Saved Property?
                </h3>
                <button
                  type="button"
                  aria-label="Close dialog"
                  onClick={() => setConfirmRemoveProperty(null)}
                  className="w-8 h-8 rounded-[4px] bg-[#FAF6F1] hover:bg-[#F2ECE4] text-[#6B5E57] hover:text-[#1E1713] flex items-center justify-center cursor-pointer transition-colors shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11.5px] text-[#7A6D64] font-medium leading-relaxed -mt-1.5">
                Are you sure you want to remove <span className="font-semibold text-[#1E1713]">{confirmRemoveProperty.name}</span>?
              </p>

              <div className="flex items-center gap-2 pt-1">
                <SecondaryButton size="sm" onClick={() => setConfirmRemoveProperty(null)} className="flex-1">
                  Cancel
                </SecondaryButton>
                <DangerButton
                  size="sm"
                  icon={<Trash2 className="w-3.5 h-3.5" />}
                  onClick={() => {
                    setProperties((prev) => prev.filter((item) => item.id !== confirmRemoveProperty.id));
                    setConfirmRemoveProperty(null);
                  }}
                  className="flex-1"
                >
                  Remove
                </DangerButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardShell>
  );
}
