import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  CheckCheck,
  BadgeCheck,
  ChevronDown,
  Phone,
  Calendar,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import DashboardShell from "../Shell";
import { responsesData, type BuilderResponseItem } from "./data";
import { Page, PageHeader, Card, SecondaryButton } from "../ui";

export default function ResponsesMobile() {
  const [items, setItems] = useState<BuilderResponseItem[]>(responsesData.defaultResponses);
  const [activeTab, setActiveTab] = useState<"unread" | "read" | "all">("unread");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const unreadCount = items.filter((i) => i.unread).length;
  const readCount = items.filter((i) => !i.unread).length;

  const filteredItems =
    activeTab === "unread"
      ? items.filter((i) => i.unread)
      : activeTab === "read"
        ? items.filter((i) => !i.unread)
        : items;

  const handleToggle = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      const isUnread = items.find((r) => r.id === id)?.unread;
      if (isUnread) {
        setItems((prev) =>
          prev.map((r) => (r.id === id ? { ...r, unread: false } : r)),
        );
        setActiveTab("read");
      }
    }
  };

  return (
    <DashboardShell activeTab="responses" isMobile={true}>
      <Page isMobile>
        <PageHeader
          isMobile
          title={responsesData.title}
          subtitle={responsesData.subtitle}
        />

        <div className="flex items-center gap-1.5 pt-0.5">
          <button
            type="button"
            onClick={() => {
              setActiveTab("unread");
              setExpandedId(null);
            }}
            className={`h-8 px-3 rounded-[4px] text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
              activeTab === "unread"
                ? "bg-[#1E1713] text-white shadow-xs"
                : "bg-white border border-[#E2D9CD] text-[#4A3E39]"
            }`}
          >
            <span>Unread</span>
            <span
              className={`px-1.5 py-0.2 rounded-[4px] text-[10px] font-semibold ${
                activeTab === "unread"
                  ? "bg-[#F85B01] text-white"
                  : "bg-[#FFF1E6] text-[#F85B01]"
              }`}
            >
              {unreadCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("read");
              setExpandedId(null);
            }}
            className={`h-8 px-3 rounded-[4px] text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
              activeTab === "read"
                ? "bg-[#1E1713] text-white shadow-xs"
                : "bg-white border border-[#E2D9CD] text-[#4A3E39]"
            }`}
          >
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-[#059669]" />
              Read
            </span>
            <span
              className={`px-1.5 py-0.2 rounded-[4px] text-[10px] font-semibold ${
                activeTab === "read"
                  ? "bg-[#059669] text-white"
                  : "bg-[#ECFDF5] text-[#059669]"
              }`}
            >
              {readCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("all");
              setExpandedId(null);
            }}
            className={`h-8 px-3 rounded-[4px] text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1 ${
              activeTab === "all"
                ? "bg-[#1E1713] text-white shadow-xs"
                : "bg-white border border-[#E2D9CD] text-[#4A3E39]"
            }`}
          >
            <span>All</span>
            <span
              className={`px-1.5 py-0.2 rounded-[4px] text-[10px] font-semibold ${
                activeTab === "all"
                  ? "bg-white/20 text-white"
                  : "bg-[#FAF6F1] text-[#7A6D64]"
              }`}
            >
              {items.length}
            </span>
          </button>
        </div>

        <div className="w-full space-y-2.5 pt-1">
          {filteredItems.length === 0 ? (
            <Card className="rounded-[4px] p-8 text-center border-[#EEE6DB] bg-white">
              <div className="w-10 h-10 rounded-[4px] bg-[#FAF6F1] text-[#A89C90] flex items-center justify-center mx-auto mb-2.5">
                <MessageSquare className="w-5 h-5 stroke-[1.8]" />
              </div>
              <h3 className="text-sm font-bold text-[#1E1713]">
                {activeTab === "unread" ? responsesData.emptyUnreadMessage : responsesData.emptyReadMessage}
              </h3>
            </Card>
          ) : (
            filteredItems.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  className={`w-full rounded-[4px] bg-white border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? "border-[#F85B01]/60 shadow-sm ring-1 ring-[#F85B01]/25"
                      : "border-[#EEE6DB]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(item.id)}
                    aria-expanded={isExpanded}
                    className="w-full p-3.5 text-left flex flex-col gap-2.5 cursor-pointer select-none transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-[4px] bg-[#FAF6F1] text-[#4A3E39] flex items-center justify-center font-semibold text-xs shrink-0">
                          {item.senderName
                            .split(" ")
                            .map((w) => w[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-[#1E1713] truncate">
                              {item.senderName}
                            </span>
                            {item.verified && (
                              <BadgeCheck className="w-3.5 h-3.5 text-[#F85B01] shrink-0" />
                            )}
                          </div>
                          <span className="text-[10px] text-[#8C7F75] font-medium flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#A3968B]" />
                            {item.date} · {item.time}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5">
                        {item.unread ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] bg-[#1E1713] text-white text-[10px] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F85B01]" />
                            {responsesData.unreadBadge}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] bg-[#ECFDF5] text-[#059669] text-[10px] font-semibold border border-[#A7F3D0]">
                            <CheckCheck className="w-3 h-3 text-[#059669] stroke-[2.5]" />
                            {responsesData.readBadge}
                          </span>
                        )}
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-[#8C7F75] transition-transform duration-300 ${
                            isExpanded ? "rotate-180 text-[#F85B01]" : ""
                          }`}
                        />
                      </div>
                    </div>

                    <h4 className="text-[12.5px] font-semibold text-[#1E1713] leading-snug line-clamp-1">
                      {item.subject}
                    </h4>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border-t border-[#F2ECE4] bg-[#FAF8F5]"
                      >
                        <div className="p-4 space-y-3.5">
                          <div className="p-3.5 rounded-[4px] bg-white border border-[#EEE6DB] text-[#322822] text-[12.5px] leading-relaxed font-medium">
                            {item.message}
                          </div>

                          <div className="space-y-2">
                            <button
                              type="button"
                              className="w-full h-9 rounded-[4px] bg-[#1E1713] text-white text-xs font-semibold shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-[#FFB074]" />
                              <span>Reply to Builder</span>
                            </button>

                            <SecondaryButton
                              size="sm"
                              className="w-full rounded-[4px]"
                              icon={<Phone className="w-3.5 h-3.5 text-[#F85B01]" />}
                            >
                              Call Representative
                            </SecondaryButton>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </Page>
    </DashboardShell>
  );
}
