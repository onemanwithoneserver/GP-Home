import { useState } from "react";
import { motion } from "framer-motion";
import DashboardShell from "../Shell";
import { responsesData, Info, type BuilderResponseItem } from "./data";

export default function ResponsesMobile() {
  const [items, setItems] = useState<BuilderResponseItem[]>(responsesData.defaultResponses);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const unreadCount = items.filter((i) => i.unread).length;
  const visibleItems = filter === "unread" ? items.filter((i) => i.unread) : items;
  const selectedItem = items.find((i) => i.id === selectedId) || null;

  return (
    <DashboardShell activeTab="responses" isMobile={true}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="space-y-4"
      >
        <div>
          <h1 className="text-xl font-extrabold text-[#1E1713] tracking-tight">
            {responsesData.title}
          </h1>
          <p className="text-xs text-[#6B5E57] font-medium mt-0.5">
            {responsesData.subtitle}
          </p>
        </div>

        <div className="w-full rounded-[6px] bg-[#E8F4FD] border border-[#CAE4FA] px-3.5 py-2.5 flex items-start gap-2.5 text-xs text-[#0C517A]">
          <Info className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-bold">{responsesData.previewNotice.prefix}</span>{" "}
            <span>{responsesData.previewNotice.body}</span>{" "}
            <span className="font-bold">{responsesData.previewNotice.suffix}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setFilter("all");
              setSelectedId(null);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer ${
              filter === "all"
                ? "bg-[#322822] text-white"
                : "bg-[#EBE6DE] text-[#322822]"
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
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer ${
              filter === "unread"
                ? "bg-[#322822] text-white"
                : "bg-[#EBE6DE] text-[#322822]"
            }`}
          >
            {responsesData.unreadFilterPrefix} ({unreadCount})
          </button>
        </div>

        <div className="rounded-[8px] bg-white border border-[#E5DFD4] overflow-hidden divide-y divide-[#E5DFD4]">
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
                className={`w-full p-4 text-left cursor-pointer block ${
                  isSelected ? "bg-[#FFF8F3]" : "bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-[#1E1713]">
                    {item.senderName}
                  </span>
                  {item.unread && (
                    <span className="px-2 py-0.5 rounded-full bg-[#322822] text-white text-[10px] font-bold">
                      {responsesData.unreadBadge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#322822] mt-1.5">{item.subject}</p>
                <p className="text-[11px] text-[#6B5E57] font-medium mt-0.5">
                  {item.propertyName}
                </p>
              </button>
            );
          })}
        </div>

        <div className="w-full rounded-[8px] bg-white border border-[#E5DFD4] p-4">
          {selectedItem ? (
            <div className="space-y-2.5">
              <div className="border-b border-[#F1ECE4] pb-2">
                <h2 className="text-sm font-extrabold text-[#1E1713]">
                  {selectedItem.subject}
                </h2>
                <p className="text-[11px] text-[#6B5E57] font-medium mt-0.5">
                  {selectedItem.senderName} · {selectedItem.propertyName}
                </p>
              </div>
              <p className="text-xs text-[#322822] leading-relaxed">
                {selectedItem.message}
              </p>
            </div>
          ) : (
            <p className="text-xs text-[#6B5E57] font-medium">
              {responsesData.emptySelectionPrompt}
            </p>
          )}
        </div>
      </motion.div>
    </DashboardShell>
  );
}
