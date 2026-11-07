import { useState } from "react";
import { MessageSquare, Check, Building2 } from "lucide-react";
import DashboardShell from "../Shell";
import { responsesData, type BuilderResponseItem } from "./data";
import {
  Page,
  PageHeader,
  Card,
  SecondaryButton,
  IconTile,
} from "../ui";

export default function ResponsesDesktop() {
  const [items, setItems] = useState<BuilderResponseItem[]>(responsesData.defaultResponses);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const unreadCount = items.filter((i) => i.unread).length;
  const visibleItems = filter === "unread" ? items.filter((i) => i.unread) : items;
  const selectedItem = items.find((i) => i.id === selectedId) || null;

  return (
    <DashboardShell activeTab="responses" isMobile={false}>
      <Page>
        <PageHeader
          title={responsesData.title}
          subtitle={responsesData.subtitle}
        />

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => {
              setFilter("all");
              setSelectedId(null);
            }}
            className={`h-9 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filter === "all"
                ? "bg-[#1E1713] text-white shadow-[0_6px_16px_-6px_rgba(30,23,19,0.6)]"
                : "bg-white border border-[#E2D9CD] text-[#4A3E39] hover:border-[#F85B01]/50 hover:text-[#F85B01]"
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
            className={`h-9 px-4 rounded-full text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
              filter === "unread"
                ? "bg-[#1E1713] text-white shadow-[0_6px_16px_-6px_rgba(30,23,19,0.6)]"
                : "bg-white border border-[#E2D9CD] text-[#4A3E39] hover:border-[#F85B01]/50 hover:text-[#F85B01]"
            }`}
          >
            <span>{responsesData.unreadFilterPrefix}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10.5px] font-extrabold ${
                filter === "unread"
                  ? "bg-[#F85B01] text-white"
                  : "bg-[#FFF1E6] text-[#F85B01]"
              }`}
            >
              {unreadCount}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[380px_minmax(0,1fr)] gap-5 items-start">
          <Card className="overflow-hidden divide-y divide-[#F2ECE4]">
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
                  className={`w-full p-5 text-left transition-all cursor-pointer block relative ${
                    isSelected
                      ? "bg-gradient-to-r from-[#FFF4EC] to-white"
                      : "bg-white hover:bg-[#FAF6F1]"
                  }`}
                >
                  {isSelected && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#F85B01]" />
                  )}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-black text-[#1E1713] tracking-tight">
                      {item.senderName}
                    </span>
                    {item.unread && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#1E1713] text-white text-[10.5px] font-extrabold shadow-xs">
                        {responsesData.unreadBadge}
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] font-semibold text-[#322822] mt-1.5 leading-snug">
                    {item.subject}
                  </p>
                  <p className="text-xs text-[#7A6D64] font-medium mt-1 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-[#F85B01]" />
                    {item.propertyName}
                  </p>
                </button>
              );
            })}
          </Card>

          <Card className="p-6 sm:p-7 min-h-[220px]">
            {selectedItem ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#F2ECE4]">
                  <div className="flex items-start gap-3.5">
                    <IconTile icon={MessageSquare} tone="brand" size="md" />
                    <div>
                      <h2 className="text-lg font-black text-[#1E1713] tracking-tight">
                        {selectedItem.subject}
                      </h2>
                      <p className="text-xs text-[#7A6D64] font-semibold mt-1">
                        {selectedItem.senderName} · {selectedItem.propertyName}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#322822] leading-relaxed font-medium">
                  {selectedItem.message}
                </p>

                <div className="pt-3 flex items-center gap-3">
                  <SecondaryButton
                    size="sm"
                    icon={<Check className="w-4 h-4 text-[#16A34A]" />}
                  >
                    Reply received
                  </SecondaryButton>
                </div>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF6F1] text-[#A89C90] flex items-center justify-center mb-3">
                  <MessageSquare className="w-6 h-6 stroke-[1.8]" />
                </div>
                <p className="text-sm text-[#7A6D64] font-medium">
                  {responsesData.emptySelectionPrompt}
                </p>
              </div>
            )}
          </Card>
        </div>
      </Page>
    </DashboardShell>
  );
}
