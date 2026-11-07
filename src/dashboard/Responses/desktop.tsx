import { useState } from "react";
import { motion } from "framer-motion";
import DashboardShell from "../Shell";
import { responsesData, Info, type BuilderResponseItem } from "./data";

export default function ResponsesDesktop() {
  const [items, setItems] = useState<BuilderResponseItem[]>(responsesData.defaultResponses);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const unreadCount = items.filter((i) => i.unread).length;
  const visibleItems = filter === "unread" ? items.filter((i) => i.unread) : items;
  const selectedItem = items.find((i) => i.id === selectedId) || null;

  return (
    <DashboardShell activeTab="responses" isMobile={false}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-5"
      >
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E1713] tracking-tight">
            {responsesData.title}
          </h1>
          <p className="text-sm text-[#6B5E57] font-medium mt-1">
            {responsesData.subtitle}
          </p>
        </div>

        <div className="w-full rounded-[6px] bg-[#E8F4FD] border border-[#CAE4FA] px-4 py-3 flex items-center gap-3 text-xs sm:text-[13px] text-[#0C517A]">
          <Info className="w-4 h-4 text-[#0284C7] shrink-0" />
          <p className="leading-relaxed">
            <span className="font-bold">{responsesData.previewNotice.prefix}</span>{" "}
            <span>{responsesData.previewNotice.body}</span>{" "}
            <span className="font-bold">{responsesData.previewNotice.suffix}</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => {
              setFilter("all");
              setSelectedId(null);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
              filter === "all"
                ? "bg-[#322822] text-white"
                : "bg-[#EBE6DE] text-[#322822] hover:bg-[#E2DBD0]"
            }`}
          >
            {responsesData.allFilterLabel}
          </button>

          <button
            type="button"
            onClick={() => {
              setFilter("unread");
              setSelectedId(null);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
              filter === "unread"
                ? "bg-[#322822] text-white"
                : "bg-[#EBE6DE] text-[#322822] hover:bg-[#E2DBD0]"
            }`}
          >
            {responsesData.unreadFilterPrefix} ({unreadCount})
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-4">
          <div className="w-full md:w-[375px] shrink-0 rounded-[8px] bg-white border border-[#E5DFD4] overflow-hidden divide-y divide-[#E5DFD4] shadow-[0_2px_10px_rgba(50,40,34,0.03)]">
            {visibleItems.map((item) => {
              const isSelected = selectedId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(item.id);
                    setItems((prev) =>
                      prev.map((r) => (r.id === item.id ? { ...r, unread: false } : r)),
                    );
                  }}
                  className={`w-full p-4 sm:p-5 text-left transition-colors cursor-pointer block ${
                    isSelected ? "bg-[#FFF8F3]" : "bg-white hover:bg-[#FAF8F5]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-extrabold text-[#1E1713]">
                      {item.senderName}
                    </span>
                    {item.unread && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#322822] text-white text-[11px] font-bold">
                        {responsesData.unreadBadge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#322822] mt-2">{item.subject}</p>
                  <p className="text-xs text-[#6B5E57] font-medium mt-1">
                    {item.propertyName}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="flex-1 w-full rounded-[8px] bg-white border border-[#E5DFD4] p-5 sm:p-6 min-h-[110px] shadow-[0_2px_10px_rgba(50,40,34,0.03)]">
            {selectedItem ? (
              <div className="space-y-3">
                <div className="border-b border-[#F1ECE4] pb-3">
                  <h2 className="text-base font-extrabold text-[#1E1713]">
                    {selectedItem.subject}
                  </h2>
                  <p className="text-xs text-[#6B5E57] font-medium mt-1">
                    {selectedItem.senderName} · {selectedItem.propertyName}
                  </p>
                </div>
                <p className="text-sm text-[#322822] leading-relaxed">
                  {selectedItem.message}
                </p>
              </div>
            ) : (
              <p className="text-sm text-[#6B5E57] font-medium">
                {responsesData.emptySelectionPrompt}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </DashboardShell>
  );
}
