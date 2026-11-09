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

export default function ResponsesDesktop() {
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
    <DashboardShell activeTab="responses" isMobile={false}>
      <Page>
        <PageHeader
          title={responsesData.title}
          subtitle={responsesData.subtitle}
        />

        <div className="flex items-center gap-2 pt-0.5">
          <button
            type="button"
            onClick={() => {
              setActiveTab("unread");
              setExpandedId(null);
            }}
            className={`h-9 px-4 rounded-[4px] text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-2 ${
              activeTab === "unread"
                ? "bg-[#1E1713] text-white shadow-sm"
                : "bg-white border border-[#E2D9CD] text-[#4A3E39] hover:border-[#F85B01]/50 hover:text-[#F85B01]"
            }`}
          >
            <span>Unread</span>
            <span
              className={`px-1.5 py-0.2 rounded-[4px] text-[10.5px] font-semibold ${
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
            className={`h-9 px-4 rounded-[4px] text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-2 ${
              activeTab === "read"
                ? "bg-[#1E1713] text-white shadow-sm"
                : "bg-white border border-[#E2D9CD] text-[#4A3E39] hover:border-[#F85B01]/50 hover:text-[#F85B01]"
            }`}
          >
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#059669]" />
              Read
            </span>
            <span
              className={`px-1.5 py-0.2 rounded-[4px] text-[10.5px] font-semibold ${
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
            className={`h-9 px-4 rounded-[4px] text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
              activeTab === "all"
                ? "bg-[#1E1713] text-white shadow-sm"
                : "bg-white border border-[#E2D9CD] text-[#4A3E39] hover:border-[#F85B01]/50 hover:text-[#F85B01]"
            }`}
          >
            <span>All responses</span>
            <span
              className={`px-1.5 py-0.2 rounded-[4px] text-[10.5px] font-semibold ${
                activeTab === "all"
                  ? "bg-white/20 text-white"
                  : "bg-[#FAF6F1] text-[#7A6D64]"
              }`}
            >
              {items.length}
            </span>
          </button>
        </div>

        <div className="w-full space-y-3 pt-2">
          {filteredItems.length === 0 ? (
            <Card className="rounded-[4px] p-12 text-center border-[#EEE6DB] bg-white">
              <div className="w-12 h-12 rounded-[4px] bg-[#FAF6F1] text-[#A89C90] flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6 stroke-[1.8]" />
              </div>
              <h3 className="text-base font-bold text-[#1E1713]">
                {activeTab === "unread" ? responsesData.emptyUnreadMessage : responsesData.emptyReadMessage}
              </h3>
              <p className="text-xs text-[#7A6D64] font-medium mt-1">
                You can switch between the tabs above to review conversation history.
              </p>
            </Card>
          ) : (
            filteredItems.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  className={`w-full rounded-[4px] bg-white border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? "border-[#F85B01]/60 shadow-[0_12px_28px_-12px_rgba(248,91,1,0.2)] ring-1 ring-[#F85B01]/25"
                      : "border-[#EEE6DB] hover:border-[#D5C7B7] hover:shadow-sm"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(item.id)}
                    aria-expanded={isExpanded}
                    className="w-full p-5 text-left flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none transition-colors hover:bg-[#FFFBF7]/60"
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="w-11 h-11 rounded-[4px] bg-gradient-to-br from-[#1E1713] to-[#3A2A21] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                        {item.senderName
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")}
                      </div>

                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[14.5px] font-bold text-[#1E1713] tracking-tight">
                            {item.senderName}
                          </span>
                          {item.verified && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#F85B01]">
                              <BadgeCheck className="w-3.5 h-3.5 text-[#F85B01]" />
                              Verified
                            </span>
                          )}
                        </div>

                        <p className="text-[13.5px] font-semibold text-[#1E1713] leading-snug line-clamp-1">
                          {item.subject}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#F4EFEA]">
                      <span className="text-[11.5px] font-medium text-[#8C7F75] flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#A3968B]" />
                        <span>{item.date} · {item.time}</span>
                      </span>

                      {item.unread ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[4px] bg-[#1E1713] text-white text-[10.5px] font-semibold shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F85B01]" />
                          {responsesData.unreadBadge}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[4px] bg-[#ECFDF5] text-[#059669] text-[10.5px] font-semibold border border-[#A7F3D0]">
                          <CheckCheck className="w-3.5 h-3.5 text-[#059669] stroke-[2.5]" />
                          {responsesData.readBadge}
                        </span>
                      )}

                      <div className="w-7 h-7 rounded-[4px] bg-[#FAF6F1] text-[#7A6D64] flex items-center justify-center transition-transform">
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isExpanded ? "rotate-180 text-[#F85B01]" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border-t border-[#F2ECE4] bg-gradient-to-b from-[#FFFDFB] to-[#FAF7F2]"
                      >
                        <div className="p-6 sm:p-7 space-y-5">
                          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#EFE8DC]">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7F75]">
                                Enquiry Regarding
                              </span>
                              <span className="text-sm font-semibold text-[#1E1713]">
                                {item.propertyName}
                              </span>
                            </div>
                          </div>

                          <div className="p-5 rounded-[4px] bg-white border border-[#EEE6DB] shadow-inner text-[#322822] text-[14.5px] leading-relaxed font-medium">
                            {item.message}
                          </div>

                          <div className="flex flex-wrap items-center gap-3 pt-1">
                            <button
                              type="button"
                              className="h-9 px-4 rounded-[4px] bg-[#1E1713] hover:bg-[#F85B01] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer inline-flex items-center gap-2"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Reply to Builder</span>
                            </button>

                            <SecondaryButton
                              size="sm"
                              className="rounded-[4px]"
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
