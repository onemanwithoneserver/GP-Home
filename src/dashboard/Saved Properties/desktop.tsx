import { useState } from "react";
import { motion } from "framer-motion";
import DashboardShell from "../Shell";
import {
  savedPropertiesData,
  Info,
  Building2,
  Trash2,
  RotateCcw,
  type SavedPropertyItem,
} from "./data";

export default function SavedPropertiesDesktop() {
  const [properties, setProperties] = useState<SavedPropertyItem[]>(
    savedPropertiesData.defaultProperties,
  );

  return (
    <DashboardShell activeTab="saved-properties" isMobile={false}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-5"
      >
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E1713] tracking-tight">
            {savedPropertiesData.title}
          </h1>
          <p className="text-sm text-[#6B5E57] font-medium mt-1">
            {savedPropertiesData.subtitle}
          </p>
        </div>

        <div className="w-full rounded-[6px] bg-[#E8F4FD] border border-[#CAE4FA] px-4 py-3 flex items-center gap-3 text-xs sm:text-[13px] text-[#0C517A]">
          <Info className="w-4 h-4 text-[#0284C7] shrink-0" />
          <p className="leading-relaxed">
            <span className="font-bold">{savedPropertiesData.previewNotice.prefix}</span>{" "}
            <span>{savedPropertiesData.previewNotice.body}</span>{" "}
            <span className="font-bold">{savedPropertiesData.previewNotice.suffix}</span>
          </p>
        </div>

        {properties.length === 0 ? (
          <div className="w-full rounded-[8px] bg-white border border-[#E5DFD4] py-14 px-6 flex flex-col items-center justify-center text-center shadow-[0_2px_10px_rgba(50,40,34,0.04)]">
            <p className="text-sm font-bold text-[#322822]">No saved properties right now.</p>
            <button
              type="button"
              onClick={() => setProperties(savedPropertiesData.defaultProperties)}
              className="mt-4 px-4 py-2 rounded-[6px] bg-[#FFF3EB] text-[#F85B01] text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restore sample properties</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {properties.map((prop) => (
              <motion.div
                key={prop.id}
                layout
                whileHover={{ y: -2 }}
                className="rounded-[10px] bg-white border border-[#E5DFD4] overflow-hidden shadow-[0_2px_12px_rgba(50,40,34,0.05)] flex flex-col"
              >
                <div className="bg-[#322822] text-white px-5 py-6 flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-[#F85B01] shrink-0" />
                  <h2 className="text-base font-extrabold tracking-tight">{prop.name}</h2>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-sm text-[#6B5E57] font-medium">{prop.location}</p>
                    <p className="text-xl font-extrabold text-[#1E1713] mt-2">{prop.price}</p>

                    <div className="flex flex-wrap items-center gap-2 mt-3.5">
                      <span className="px-3 py-1 rounded-full bg-[#F1ECE4] text-[#322822] text-xs font-semibold">
                        {prop.bhk}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#F1ECE4] text-[#322822] text-xs font-semibold">
                        {prop.area}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white border border-[#D8D0C5] text-[#322822] text-xs font-semibold">
                        {prop.status}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() =>
                        setProperties((prev) => prev.filter((item) => item.id !== prop.id))
                      }
                      className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold text-[#DC2626] hover:text-[#B91C1C] px-2.5 py-1.5 rounded-[6px] hover:bg-[#FEF2F2] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>{savedPropertiesData.removeLabel}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </DashboardShell>
  );
}

