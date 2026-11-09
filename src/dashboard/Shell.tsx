import { useEffect, useRef, useState, useCallback, type ComponentType, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  User,
  MapPin,
  Heart,
  SlidersHorizontal,
  MessageSquare,
  Lock,
  LogOut,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SiteHeader from "../Home/components/Header";
import { AvatarBadge } from "./ui";
import dashPenthouse from "../Assets/Luxury/dashboard_penthouse.jpg";

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
  icon: ComponentType<{ className?: string }>;
}

export const dashboardTabs: DashboardTabItem[] = [
  { id: "dashboard", label: "Dashboard", path: "dashboard", icon: LayoutGrid },
  { id: "profile", label: "Profile", path: "dashboard/profile", icon: User },
  { id: "saved-places", label: "Saved Places", path: "dashboard/saved-places", icon: MapPin },
  { id: "saved-properties", label: "Saved Properties", path: "dashboard/saved-properties", icon: Heart },
  {
    id: "preferred-interests",
    label: "Preferred Interests",
    path: "dashboard/preferred-interests",
    icon: SlidersHorizontal,
  },
  { id: "responses", label: "Responses", path: "dashboard/responses", icon: MessageSquare },
  { id: "change-password", label: "Change Password", path: "dashboard/change-password", icon: Lock },
];

const shellNavItems = [
  { id: "videos", label: "Videos" },
  { id: "shortlist", label: "Shortlist" },
];

interface DashboardShellProps {
  activeTab: DashboardTabId;
  isMobile?: boolean;
  children: ReactNode;
}

function Ambient({ isMobile }: { isMobile?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.span
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute rounded-full bg-[#FFD9BD]/60 blur-3xl ${
          isMobile ? "-top-20 -right-16 w-64 h-64" : "-top-32 right-[8%] w-[520px] h-[520px]"
        }`}
      />
      <motion.span
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute rounded-full bg-[#FFE9D6]/70 blur-3xl ${
          isMobile ? "top-[40%] -left-20 w-56 h-56" : "top-[35%] -left-40 w-[460px] h-[460px]"
        }`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(50,40,34,0.05)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
    </div>
  );
}

interface ScrollableChipBarProps {
  tabs: DashboardTabItem[];
  activeTab: DashboardTabId;
  onSelect: (tabId: string) => void;
  layoutId: string;
  compact?: boolean;
}

function ScrollableChipBar({
  tabs,
  activeTab,
  onSelect,
  layoutId,
  compact = false,
}: ScrollableChipBarProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const activeChipRef = useRef<HTMLButtonElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  useEffect(() => {
    if (activeChipRef.current) {
      activeChipRef.current.scrollIntoView({
        inline: "center",
        block: "nearest",
        behavior: "smooth",
      });
      const t = setTimeout(updateScrollState, 350);
      return () => clearTimeout(t);
    }
  }, [activeTab, updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = direction === "left" ? -190 : 190;
    el.scrollBy({ left: amount, behavior: "smooth" });
    setTimeout(updateScrollState, 260);
  };

  return (
    <div className="relative group/tabs flex items-center">
      <AnimatePresence>
        {canScrollLeft && (
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 top-0 bottom-0 z-10 flex items-center pr-5 pl-0 bg-gradient-to-r from-[#FBF8F4] via-[#FBF8F4]/90 to-transparent pointer-events-none"
          >
            <button
              type="button"
              aria-label="Scroll tabs left"
              onClick={() => scroll("left")}
              className="pointer-events-auto w-8 h-8 rounded-full bg-white/95 backdrop-blur-md border border-[#E5DFD4] shadow-[0_4px_12px_rgba(30,23,19,0.14)] text-[#322822] hover:text-[#F85B01] hover:border-[#F85B01]/50 active:scale-90 transition-all flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={scrollRef}
        className="flex items-center gap-1.5 overflow-x-auto scroll-smooth scrollbar-hide -mx-1 px-1 pb-1 w-full"
      >
        {tabs.map((tab) => {
          const active = tab.id === activeTab;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              ref={active ? activeChipRef : undefined}
              type="button"
              onClick={() => onSelect(tab.id)}
              className={`relative inline-flex items-center gap-1.5 rounded-full whitespace-nowrap font-bold transition-colors cursor-pointer shrink-0 ${
                compact ? "h-9 px-3.5 text-[12px]" : "h-10 px-4 text-[13px]"
              } ${
                active
                  ? "text-white"
                  : "text-[#4A3E39] bg-white/80 border border-[#EEE6DB] hover:text-[#F85B01] hover:border-[#F85B01]/40"
              }`}
            >
              {active && (
                <motion.span
                  layoutId={layoutId}
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-full bg-[#1E1713] shadow-[0_8px_20px_-8px_rgba(30,23,19,0.6)]"
                />
              )}
              <Icon className={`relative w-3.5 h-3.5 ${active ? "text-[#FFB074]" : ""}`} />
              <span className="relative">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {canScrollRight && (
          <motion.div
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-0 bottom-0 z-10 flex items-center pl-5 pr-0 bg-gradient-to-l from-[#FBF8F4] via-[#FBF8F4]/90 to-transparent pointer-events-none"
          >
            <button
              type="button"
              aria-label="Scroll tabs right"
              onClick={() => scroll("right")}
              className="pointer-events-auto w-8 h-8 rounded-full bg-white/95 backdrop-blur-md border border-[#E5DFD4] shadow-[0_4px_12px_rgba(30,23,19,0.14)] text-[#322822] hover:text-[#F85B01] hover:border-[#F85B01]/50 active:scale-90 transition-all flex items-center justify-center cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DashboardShell({ activeTab, isMobile = false, children }: DashboardShellProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const targetViewport = location.pathname.startsWith("/mobile") || isMobile ? "mobile" : "desktop";

  const handleTabSelect = (tabId: string) => {
    const found = dashboardTabs.find((t) => t.id === tabId);
    if (found) navigate(`/${targetViewport}/${found.path}`);
  };

  const header = (
    <SiteHeader
      isMobile={isMobile}
      variant="user"
      navItems={shellNavItems}
      activeNav=""
      onNavChange={(id) => {
        if (id === "shortlist") {
          navigate(`/${targetViewport}/shortlist`);
        } else {
          navigate(`/${targetViewport}/home-login`);
        }
      }}
      onLogoClick={() => navigate(`/${targetViewport}/home-login`)}
      searchPlaceholder="Search places, projects..."
      accountTitle="My Account"
      accountSubtitle="Buyer account"
      accountItems={dashboardTabs}
      activeAccountId={activeTab}
      onAccountSelect={handleTabSelect}
      signOutLabel="Sign out"
      onSignOut={() => navigate(`/${targetViewport}/home`)}
    />
  );

  if (isMobile) {
    return (
      <div className="relative w-full h-full min-h-[620px] flex-1 flex flex-col bg-[#FBF8F4] overflow-y-auto overflow-x-hidden scrollbar-hide select-text">
        {header}
        <div className="relative flex-1">
          <Ambient isMobile />
          <div className="relative px-3.5 pt-4 pb-10 space-y-4">
            <ScrollableChipBar
              tabs={dashboardTabs}
              activeTab={activeTab}
              onSelect={handleTabSelect}
              layoutId="dashChipMobile"
              compact
            />
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex-1 flex flex-col bg-[#FBF8F4] overflow-y-auto overflow-x-hidden scrollbar-hide select-text">
      {header}
      <div className="relative flex-1">
        <Ambient />
        <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10 pt-8 pb-16 grid grid-cols-1 lg:grid-cols-[272px_minmax(0,1fr)] gap-8 lg:gap-10 items-start">
          <aside className="hidden lg:block sticky top-[96px]">
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl bg-white/90 backdrop-blur-xl border border-[#EEE6DB] shadow-[0_1px_2px_rgba(50,40,34,0.04),0_20px_40px_-24px_rgba(50,40,34,0.3)] overflow-hidden"
            >
              <div className="relative h-24 bg-gradient-to-br from-[#1E1713] via-[#3A2A21] to-[#C24A0A] overflow-hidden">
                <img
                  src={dashPenthouse}
                  alt="Penthouse"
                  className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-luminosity animate-cinematic"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1713]/90 via-[#1E1713]/40 to-transparent" />
                <motion.span
                  animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6] }}
                  transition={{ duration: 7, repeat: Infinity }}
                  className="absolute -top-10 -right-6 w-32 h-32 rounded-full bg-[#F85B01]/50 blur-2xl"
                />
                <span className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
                <span className="absolute bottom-0 inset-x-0 h-px hairline-gold opacity-60" />
              </div>
              <div className="relative px-5 -mt-8">
                <AvatarBadge size={64} dark={false} />
                <h3 className="mt-3 text-[15px] font-bold text-[#1E1713] tracking-tight">My Account</h3>
                <p className="text-[12px] text-[#7A6D64] font-medium flex items-center gap-1 mt-0.5">
                  <BadgeCheck className="w-3.5 h-3.5 text-[#F85B01]" />
                  Buyer account
                </p>
              </div>

              <nav className="p-2.5 mt-3 space-y-0.5">
                {dashboardTabs.map((tab) => {
                  const active = tab.id === activeTab;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleTabSelect(tab.id)}
                      className="group relative w-full flex items-center gap-3 px-2.5 h-11 rounded-xl text-left cursor-pointer"
                    >
                      {active && (
                        <motion.span
                          layoutId="dashSideActive"
                          transition={{ type: "spring", stiffness: 420, damping: 36 }}
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FFF1E6] to-[#FFF8F2] border border-[#F85B01]/15"
                        />
                      )}
                      {!active && (
                        <span className="absolute inset-0 rounded-xl bg-[#FAF6F1] opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                      <span
                        className={`relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                          active
                            ? "bg-[#F85B01] text-white shadow-[0_6px_14px_-5px_rgba(248,91,1,0.7)]"
                            : "bg-[#F6F1EA] text-[#6B5E57] group-hover:text-[#F85B01]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                      <span
                        className={`relative text-[13px] font-bold ${
                          active ? "text-[#1E1713]" : "text-[#4A3E39] group-hover:text-[#1E1713]"
                        }`}
                      >
                        {tab.label}
                      </span>
                      {active && (
                        <motion.span
                          layoutId="dashSideDot"
                          className="relative ml-auto w-1.5 h-1.5 rounded-full bg-[#F85B01]"
                        />
                      )}
                    </button>
                  );
                })}
              </nav>

              <div className="p-2.5 border-t border-[#F2ECE4]">
                <button
                  type="button"
                  onClick={() => navigate(`/${targetViewport}/home`)}
                  className="w-full flex items-center gap-3 px-2.5 h-11 rounded-xl hover:bg-[#FEF2F2] transition-colors cursor-pointer"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center">
                    <LogOut className="w-4 h-4" />
                  </span>
                  <span className="text-[13px] font-bold text-[#DC2626]">Sign out</span>
                </button>
              </div>
            </motion.div>
          </aside>

          <main className="min-w-0 space-y-6">
            <div className="lg:hidden">
              <ScrollableChipBar
                tabs={dashboardTabs}
                activeTab={activeTab}
                onSelect={handleTabSelect}
                layoutId="dashChipDesktop"
              />
            </div>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
