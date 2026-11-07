import { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Compass,
  SlidersHorizontal,
  Search,
  User,
  LogOut,
  LayoutGrid,
  MapPin,
  Heart,
  MessageSquare,
  Lock,
} from "lucide-react";
import { GullyLogo } from "../Login/svg icons";

export type DashboardTabId =
  | "dashboard"
  | "profile"
  | "saved-places"
  | "saved-properties"
  | "preferred-interests"
  | "responses"
  | "change-password";

export interface DashboardTabItem {
  id: DashboardTabId;
  label: string;
  path: string;
}

export const dashboardTabs: DashboardTabItem[] = [
  { id: "dashboard", label: "Dashboard", path: "dashboard" },
  { id: "profile", label: "Profile", path: "dashboard/profile" },
  { id: "saved-places", label: "Saved Places", path: "dashboard/saved-places" },
  { id: "saved-properties", label: "Saved Properties", path: "dashboard/saved-properties" },
  { id: "preferred-interests", label: "Preferred Interests", path: "dashboard/preferred-interests" },
  { id: "responses", label: "Responses", path: "dashboard/responses" },
  { id: "change-password", label: "Change Password", path: "dashboard/change-password" },
];

const accountDropdownItems = [
  { id: "dashboard" as DashboardTabId, label: "Dashboard", icon: LayoutGrid },
  { id: "profile" as DashboardTabId, label: "Profile", icon: User },
  { id: "saved-places" as DashboardTabId, label: "Saved Places", icon: MapPin },
  { id: "saved-properties" as DashboardTabId, label: "Saved Properties", icon: Heart },
  { id: "preferred-interests" as DashboardTabId, label: "Preferred Interests", icon: SlidersHorizontal },
  { id: "responses" as DashboardTabId, label: "Responses", icon: MessageSquare },
  { id: "change-password" as DashboardTabId, label: "Change Password", icon: Lock },
];

interface DashboardShellProps {
  activeTab: DashboardTabId;
  isMobile?: boolean;
  children: ReactNode;
}

export default function DashboardShell({
  activeTab,
  isMobile = false,
  children,
}: DashboardShellProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const targetViewport = location.pathname.startsWith("/mobile") || isMobile ? "mobile" : "desktop";

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchFocused, setSearchFocused] = useState<boolean>(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAccountMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleTabSelect = (tabId: DashboardTabId) => {
    const found = dashboardTabs.find((t) => t.id === tabId);
    if (found) {
      setAccountMenuOpen(false);
      navigate(`/${targetViewport}/${found.path}`);
    }
  };

  if (isMobile) {
    return (
      <div
        onClick={() => setAccountMenuOpen(false)}
        className="relative w-full h-full min-h-[620px] flex-1 flex flex-col bg-[#FDFBF8] overflow-y-auto overflow-x-hidden scrollbar-hide select-text"
      >
        <div className="sticky top-0 z-30 bg-white border-b border-[#E5DFD4] px-3.5 pt-3 pb-2.5 shrink-0 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => navigate(`/${targetViewport}/home-login`)}
              className="flex items-center shrink-0 cursor-pointer"
            >
              <GullyLogo className="h-8 w-auto" />
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate(`/${targetViewport}/home-login`)}
                className="px-2 py-1 rounded-[4px] text-[11px] font-bold text-[#322822] hover:text-[#F85B01] transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => navigate(`/${targetViewport}/home-login`)}
                className="px-2 py-1 rounded-[4px] text-[11px] font-bold text-[#322822] hover:text-[#F85B01] transition-colors cursor-pointer"
              >
                Videos
              </button>

              <motion.button
                whileTap={{ scale: 0.94 }}
                type="button"
                aria-label="My Account Menu"
                onClick={(e) => {
                  e.stopPropagation();
                  setAccountMenuOpen((prev) => !prev);
                }}
                className={`w-8.5 h-8.5 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                  accountMenuOpen
                    ? "bg-[#F85B01] text-white ring-2 ring-[#F85B01]/35"
                    : "bg-[#322822] text-white"
                }`}
              >
                <User className="w-4 h-4 stroke-[2]" />
              </motion.button>
            </div>
          </div>

          <div
            className={`w-full h-9 rounded-[4px] bg-[#FAF8F5] border transition-colors flex items-center px-2 gap-1.5 ${
              searchFocused ? "border-[#F85B01] bg-white" : "border-[#E5DFD4]"
            }`}
          >
            <div className="w-6 h-6 rounded-[4px] bg-[#FFF3EB] text-[#F85B01] flex items-center justify-center shrink-0">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search places, projects..."
              className="flex-1 bg-transparent text-xs text-[#1E1713] placeholder-[#9C9088] font-medium outline-none min-w-0"
            />
            <button
              type="button"
              aria-label="Filter"
              className="w-6.5 h-6.5 rounded-[4px] bg-[#F1ECE4] text-[#4A3E39] border border-[#E5DFD4] flex items-center justify-center cursor-pointer"
            >
              <SlidersHorizontal className="w-3 h-3" />
            </button>
            <button
              type="button"
              aria-label="Search"
              className="w-6.5 h-6.5 rounded-[4px] bg-[#F1ECE4] hover:bg-[#F85B01] text-[#4A3E39] hover:text-white border border-[#E5DFD4] flex items-center justify-center cursor-pointer"
            >
              <Search className="w-3 h-3" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {accountMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-14 right-3 z-40 w-[235px] rounded-[4px] bg-white border border-[#E5DFD4] shadow-[0_12px_32px_rgba(50,40,34,0.16)] overflow-hidden"
            >
              <div className="p-3 flex items-center gap-2.5 border-b border-[#F1ECE4]">
                <div className="w-8.5 h-8.5 rounded-full bg-[#322822] text-white flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 stroke-[2]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-extrabold text-[#1E1713] truncate">My Account</h3>
                  <p className="text-[11px] text-[#8C827A] font-medium truncate">Buyer account</p>
                </div>
              </div>
              <div className="py-1 px-1 space-y-0.5">
                {accountDropdownItems.map((item) => {
                  const Icon = item.icon;
                  const isCurrent = item.id === activeTab;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleTabSelect(item.id)}
                      className={`group w-full px-2.5 py-2 rounded-[4px] flex items-center gap-2.5 text-left transition-colors cursor-pointer ${
                        isCurrent
                          ? "bg-[#FFF3EB] text-[#F85B01]"
                          : "text-[#322822] hover:bg-[#FFF8F3] hover:text-[#F85B01]"
                      }`}
                    >
                      <Icon
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isCurrent ? "text-[#F85B01]" : "text-[#6B5E57] group-hover:text-[#F85B01]"
                        }`}
                      />
                      <span className="text-xs font-semibold truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="p-1 border-t border-[#F1ECE4]">
                <button
                  type="button"
                  onClick={() => navigate(`/${targetViewport}/home`)}
                  className="w-full px-2.5 py-2 rounded-[4px] flex items-center gap-2.5 text-left text-[#E24E00] hover:bg-[#FFF3EB] font-bold text-xs transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-[#F85B01] shrink-0" />
                  <span>Sign out</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full px-3.5 pt-4 pb-8 flex-1">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide pb-2 mb-4">
            {dashboardTabs.map((tab) => {
              const active = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabSelect(tab.id)}
                  className={`relative px-3 py-2 rounded-[6px] text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                    active
                      ? "bg-[#322822] text-white shadow-[0_3px_10px_rgba(50,40,34,0.18)]"
                      : "bg-white text-[#4A3E39] border border-[#E5DFD4] hover:border-[#F85B01]/40 hover:text-[#F85B01]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setAccountMenuOpen(false)}
      className="relative w-full h-full flex-1 flex flex-col bg-[#FDFBF8] overflow-y-auto overflow-x-hidden scrollbar-hide select-text"
    >
      <header className="sticky top-0 z-30 h-[68px] lg:h-[74px] w-full bg-white border-b border-[#E5DFD4] px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-4 shrink-0">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(`/${targetViewport}/home-login`)}
          className="flex items-center shrink-0 cursor-pointer"
        >
          <GullyLogo className="h-9 sm:h-10 lg:h-11 w-auto" />
        </motion.div>

        <div className="relative flex-1 max-w-[520px] xl:max-w-[560px] mx-2 sm:mx-4">
          <div
            className={`w-full h-11 rounded-[4px] bg-[#FAF8F5] border transition-colors duration-200 flex items-center px-2 gap-2 ${
              searchFocused
                ? "border-[#F85B01] bg-white shadow-[0_0_0_2px_rgba(248,91,1,0.12)]"
                : "border-[#E5DFD4] hover:border-[#D5CCC0]"
            }`}
          >
            <div className="w-7 h-7 rounded-[4px] bg-[#FFF3EB] border border-[#F85B01]/20 flex items-center justify-center text-[#F85B01] shrink-0">
              <Compass className="w-4 h-4" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search places, projects..."
              className="flex-1 bg-transparent text-xs sm:text-sm text-[#1E1713] placeholder-[#9C9088] font-medium outline-none min-w-0 select-text"
            />

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                aria-label="Filter properties"
                className="w-8 h-8 rounded-[4px] bg-[#F1ECE4]/90 hover:bg-[#FFF3EB] text-[#4A3E39] hover:text-[#F85B01] border border-[#E5DFD4]/80 hover:border-[#F85B01]/30 flex items-center justify-center transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                aria-label="Search"
                className="w-8 h-8 rounded-[4px] bg-[#F1ECE4]/90 hover:bg-[#F85B01] text-[#4A3E39] hover:text-white border border-[#E5DFD4]/80 hover:border-[#F85B01] flex items-center justify-center transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 lg:gap-9 shrink-0">
          <nav className="flex items-center gap-6 lg:gap-8">
            <button
              type="button"
              onClick={() => navigate(`/${targetViewport}/home-login`)}
              className="py-1.5 text-xs lg:text-sm font-bold text-[#1E1713] hover:text-[#F85B01] transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => navigate(`/${targetViewport}/home-login`)}
              className="py-1.5 text-xs lg:text-sm font-bold text-[#1E1713] hover:text-[#F85B01] transition-colors cursor-pointer"
            >
              Videos
            </button>
          </nav>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            aria-label="My Account Menu"
            onClick={(e) => {
              e.stopPropagation();
              setAccountMenuOpen((prev) => !prev);
            }}
            className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
              accountMenuOpen
                ? "bg-[#F85B01] text-white ring-3 ring-[#F85B01]/25 shadow-sm"
                : "bg-[#322822] hover:bg-[#F85B01] text-white"
            }`}
          >
            <User className="w-5 h-5 stroke-[2]" />
          </motion.button>
        </div>
      </header>

      <AnimatePresence>
        {accountMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="fixed top-[78px] right-8 sm:right-12 z-40 w-[260px] rounded-[4px] bg-white border border-[#E5DFD4] shadow-[0_14px_38px_rgba(50,40,34,0.14)] overflow-hidden"
          >
            <div className="p-4 flex items-center gap-3 border-b border-[#F1ECE4]">
              <div className="w-10 h-10 rounded-full bg-[#322822] text-white flex items-center justify-center shrink-0">
                <User className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-extrabold text-[#1E1713] leading-tight truncate">
                  My Account
                </h3>
                <p className="text-xs text-[#8C827A] font-medium mt-0.5 truncate">
                  Buyer account
                </p>
              </div>
            </div>

            <div className="py-1.5 px-1.5 space-y-0.5">
              {accountDropdownItems.map((item) => {
                const Icon = item.icon;
                const isCurrent = item.id === activeTab;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleTabSelect(item.id)}
                    className={`group w-full px-3 py-2.5 rounded-[4px] flex items-center gap-3.5 text-left transition-colors cursor-pointer ${
                      isCurrent
                        ? "bg-[#FFF3EB] text-[#F85B01]"
                        : "text-[#322822] hover:bg-[#FFF8F3] hover:text-[#F85B01]"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isCurrent ? "text-[#F85B01]" : "text-[#6B5E57] group-hover:text-[#F85B01]"
                      }`}
                    />
                    <span className="text-[13px] font-semibold truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="p-1.5 border-t border-[#F1ECE4]">
              <button
                type="button"
                onClick={() => navigate(`/${targetViewport}/home`)}
                className="w-full px-3 py-2.5 rounded-[4px] flex items-center gap-3.5 text-left text-[#E24E00] hover:bg-[#FFF3EB] font-bold text-[13px] transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-[#F85B01] shrink-0" />
                <span>Sign out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-[1040px] mx-auto px-6 sm:px-10 pt-7 pb-14 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-7">
          {dashboardTabs.map((tab) => {
            const active = tab.id === activeTab;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => handleTabSelect(tab.id)}
                className={`relative px-4 py-2.5 rounded-[6px] text-xs sm:text-[13px] font-bold transition-all duration-200 cursor-pointer ${
                  active
                    ? "bg-[#322822] text-white shadow-[0_4px_14px_rgba(50,40,34,0.18)]"
                    : "bg-white text-[#4A3E39] border border-[#D8D0C5] hover:border-[#F85B01]/50 hover:text-[#F85B01]"
                }`}
              >
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {children}
      </div>
    </div>
  );
}

