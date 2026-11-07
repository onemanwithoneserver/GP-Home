import { useState } from "react";
import { MessageSquare, Building2, Check } from "lucide-react";
import DashboardShell from "../Shell";
import { responsesData, type BuilderResponseItem } from "./data";
import {
  Page,
  PageHeader,
  Card,
  SecondaryButton,
  IconTile,
} from "../ui";

export default function ResponsesMobile() {
  const [items, setItems] = useState<BuilderResponseItem[]>(responsesData.defaultResponses);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const unreadCount = items.filter((i) => i.unread).length;
  const visibleItems = filter === "unread" ? items.filter((i) => i.unread) : items;
  const selectedItem = items.find((i) => i.id === selectedId) || null;

  return (
    <DashboardShell activeTab="responses" isMobile={true}>
      <Page isMobile>
        <PageHeader
          isMobile
          title={responsesData.title}
          subtitle={responsesData.subtitle}
        />

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setFilter("all");
              setSelectedId(null);
            }}
            className={`h-8 px-3.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filter === "all"
                ? "bg-[#1E1713] text-white"
                : "bg-white border border-[#E2D9CD] text-[#4A3E39]"
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
            className={`h-8 px-3.5 rounded-full text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
              filter === "unread"
                ? "bg-[#1E1713] text-white"
                : "bg-white border border-[#E2D9CD] text-[#4A3E39]"
            }`}
          >
            <span>{responsesData.unreadFilterPrefix}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                filter === "unread"
                  ? "bg-[#F85B01] text-white"
                  : "bg-[#FFF1E6] text-[#F85B01]"
              }`}
            >
              {unreadCount}
            </span>
          </button>
        </div>

        <div className="space-y-3">
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
                  className={`w-full p-4 text-left transition-all cursor-pointer block relative ${
                    isSelected ? "bg-[#FFF4EC]" : "bg-white"
                  }`}
                >
                  {isSelected && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#F85B01]" />
                  )}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-[#1E1713]">
                      {item.senderName}
                    </span>
                    {item.unread && (
                      <span className="px-2 py-0.5 rounded-full bg-[#1E1713] text-white text-[10px] font-extrabold">
                        {responsesData.unreadBadge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-[#322822] mt-1">{item.subject}</p>
                  <p className="text-[11px] text-[#7A6D64] font-medium mt-0.5 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-[#F85B01]" />
                    {item.propertyName}
                  </p>
                </button>
              );
            })}
          </Card>

          <Card className="p-4 min-h-[140px]">
            {selectedItem ? (
              <div className="space-y-3">
                <div className="flex items-start gap-2.5 pb-2.5 border-b border-[#F2ECE4]">
                  <IconTile icon={MessageSquare} tone="brand" size="sm" />
                  <div>
                    <h2 className="text-sm font-black text-[#1E1713] tracking-tight">
                      {selectedItem.subject}
                    </h2>
                    <p className="text-[11px] text-[#7A6D64] font-medium mt-0.5">
                      {selectedItem.senderName} · {selectedItem.propertyName}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#322822] leading-relaxed font-medium">
                  {selectedItem.message}
                </p>

                <div className="pt-2 flex items-center gap-2">
                  <SecondaryButton
                    size="sm"
                    icon={<Check className="w-3.5 h-3.5 text-[#16A34A]" />}
                  >
                    Reply received
                  </SecondaryButton>
                </div>
              </div>
            ) : (
              <div className="py-6 flex flex-col items-center justify-center text-center">
                <MessageSquare className="w-5 h-5 text-[#A89C90] mb-2" />
                <p className="text-xs text-[#7A6D64] font-medium">
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
