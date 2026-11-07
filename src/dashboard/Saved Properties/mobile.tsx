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

export default function SavedPropertiesMobile() {
  const [properties, setProperties] = useState<SavedPropertyItem[]>(
    savedPropertiesData.defaultProperties,
  );

  return (
    <DashboardShell activeTab="saved-properties" isMobile={true}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="space-y-4"
      >
        <div>
          <h1 className="text-xl font-extrabold text-[#1E1713] tracking-tight">
            {savedPropertiesData.title}
          </h1>
          <p className="text-xs text-[#6B5E57] font-medium mt-0.5">
            {savedPropertiesData.subtitle}
          </p>
        </div>

        <div className="w-full rounded-[6px] bg-[#E8F4FD] border border-[#CAE4FA] px-3.5 py-2.5 flex items-start gap-2.5 text-xs text-[#0C517A]">
          <Info className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-bold">{savedPropertiesData.previewNotice.prefix}</span>{" "}
            <span>{savedPropertiesData.previewNotice.body}</span>{" "}
            <span className="font-bold">{savedPropertiesData.previewNotice.suffix}</span>
          </p>
        </div>

        {properties.length === 0 ? (
          <div className="w-full rounded-[8px] bg-white border border-[#E5DFD4] py-10 px-4 flex flex-col items-center justify-center text-center">
            <p className="text-xs font-bold text-[#322822]">No saved properties right now.</p>
            <button
              type="button"
              onClick={() => setProperties(savedPropertiesData.defaultProperties)}
              className="mt-3 px-3.5 py-2 rounded-[6px] bg-[#FFF3EB] text-[#F85B01] text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restore sample properties</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {properties.map((prop) => (
              <div
                key={prop.id}
                className="rounded-[10px] bg-white border border-[#E5DFD4] overflow-hidden shadow-[0_2px_8px_rgba(50,40,34,0.04)]"
              >
                <div className="bg-[#322822] text-white px-4 py-4 flex items-center gap-2.5">
                  <Building2 className="w-5 h-5 text-[#F85B01] shrink-0" />
                  <h2 className="text-sm font-extrabold">{prop.name}</h2>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <p className="text-xs text-[#6B5E57] font-medium">{prop.location}</p>
                    <p className="text-lg font-extrabold text-[#1E1713] mt-1">{prop.price}</p>

                    <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                      <span className="px-2.5 py-1 rounded-full bg-[#F1ECE4] text-[#322822] text-[11px] font-semibold">
                        {prop.bhk}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#F1ECE4] text-[#322822] text-[11px] font-semibold">
                        {prop.area}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-white border border-[#D8D0C5] text-[#322822] text-[11px] font-semibold">
                        {prop.status}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setProperties((prev) => prev.filter((item) => item.id !== prop.id))
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DC2626] px-2 py-1 rounded-[4px] cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{savedPropertiesData.removeLabel}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </DashboardShell>
  );
}

