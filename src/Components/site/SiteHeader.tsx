import { useEffect, useRef, useState, type ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  LogIn,
  LogOut,
  ChevronRight,
  ChevronDown,
  Command,
  User,
} from "lucide-react";
import { GullyLogo } from "../../Login/svg icons";

export interface SiteNavItem {
  id: string;
  label: string;
}

export interface SiteAccountItem {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

interface SiteHeaderProps {
  variant: "guest" | "user";
  isMobile?: boolean;
  navItems: SiteNavItem[];
  activeNav?: string;
  onNavChange?: (id: string) => void;
  onLogoClick?: () => void;
  searchPlaceholder: string;
  signInLabel?: string;
  onSignIn?: () => void;
  accountTitle?: string;
  accountSubtitle?: string;
  accountItems?: SiteAccountItem[];
  activeAccountId?: string;
  onAccountSelect?: (id: string) => void;
  signOutLabel?: string;
  onSignOut?: () => void;
}


function AvatarRing({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims = size === "lg" ? "w-11 h-11" : size === "sm" ? "w-8 h-8" : "w-9 h-9";
  const icon = size === "lg" ? "w-5 h-5" : "w-4 h-4";
  return (
    <span
      className={`relative ${dims} rounded-full p-[2px] bg-[conic-gradient(from_200deg,#F85B01,#FFB074,#FFE3CC,#F85B01)] shrink-0`}
    >
      <span className="w-full h-full rounded-full bg-[#1E1713] text-white flex items-center justify-center">
        <User className={`${icon} stroke-[2.2]`} />
      </span>
      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#22C55E] ring-2 ring-white" />
    </span>
  );
}

export default function SiteHeader({
  variant,
  isMobile = false,
  navItems,
  activeNav,
  onNavChange,
  onLogoClick,
  searchPlaceholder,
  signInLabel = "Sign In",
  onSignIn,
  accountTitle = "My Account",
  accountSubtitle = "Buyer account",
  accountItems = [],
  activeAccountId,
  onAccountSelect,
  signOutLabel = "Sign out",
  onSignOut,
}: SiteHeaderProps) {
  const [query, setQuery] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, []);

  const accountMenu = (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.97 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "top right" }}
          className={`absolute right-0 top-[calc(100%+10px)] z-50 ${
            isMobile ? "w-[264px]" : "w-[300px]"
          } rounded-2xl bg-white border border-[#EEE6DB] shadow-[0_28px_60px_-20px_rgba(30,23,19,0.38),0_2px_6px_rgba(30,23,19,0.06)] overflow-hidden`}
        >
          <div className="relative p-4 bg-gradient-to-br from-[#1E1713] via-[#2E231D] to-[#4A3226] text-white overflow-hidden">
            <span className="absolute -top-12 -right-10 w-36 h-36 rounded-full bg-[#F85B01]/45 blur-2xl" />
            <span className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
            <div className="relative flex items-center gap-3">
              <AvatarRing size="lg" />
              <div className="min-w-0">
                <p className="text-sm font-extrabold truncate">{accountTitle}</p>
                <p className="text-[11.5px] text-white/65 font-semibold truncate">
                  {accountSubtitle}
                </p>
              </div>
            </div>
          </div>

          <div className="p-1.5 max-h-[340px] overflow-y-auto scrollbar-hide">
            {accountItems.map((item, i) => {
              const Icon = item.icon;
              const active = item.id === activeAccountId;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.025 * i, duration: 0.2 }}
                  onClick={() => {
                    setMenuOpen(false);
                    onAccountSelect?.(item.id);
                  }}
                  className={`group w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                    active ? "bg-[#FFF1E6]" : "hover:bg-[#FAF6F1]"
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      active
                        ? "bg-[#F85B01] text-white shadow-[0_4px_10px_-3px_rgba(248,91,1,0.6)]"
                        : "bg-[#F6F1EA] text-[#6B5E57] group-hover:bg-[#FFE7D6] group-hover:text-[#F85B01]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  <span
                    className={`flex-1 text-[13px] font-bold truncate ${
                      active ? "text-[#E24E00]" : "text-[#322822]"
                    }`}
                  >
                    {item.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#C7BBAE] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </motion.button>
              );
            })}
          </div>

          <div className="p-1.5 border-t border-[#F2ECE4]">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onSignOut?.();
              }}
              className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-left hover:bg-[#FEF2F2] transition-colors cursor-pointer"
            >
              <span className="w-8 h-8 rounded-lg bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center">
                <LogOut className="w-4 h-4" />
              </span>
              <span className="text-[13px] font-bold text-[#DC2626]">{signOutLabel}</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const rightSlot =
    variant === "guest" ? (
      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.96 }}
        type="button"
        onClick={onSignIn}
        className={`sheen relative overflow-hidden inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F85B01] via-[#FF6A10] to-[#FF8A2A] text-white font-extrabold shadow-[0_8px_20px_-6px_rgba(248,91,1,0.6),inset_0_1px_0_rgba(255,255,255,0.3)] cursor-pointer shrink-0 ${
          isMobile ? "h-9 px-3.5 text-[12px]" : "h-11 px-5 text-[13px]"
        }`}
      >
        <LogIn className={isMobile ? "w-3.5 h-3.5" : "w-4 h-4"} />
        <span className="relative">{signInLabel}</span>
      </motion.button>
    ) : (
      <div ref={menuRef} className="relative shrink-0">
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.96 }}
          type="button"
          aria-label="My Account Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((p) => !p)}
          className={`flex items-center gap-1.5 rounded-full bg-white border transition-all cursor-pointer ${
            menuOpen
              ? "border-[#F85B01]/50 shadow-[0_0_0_4px_rgba(248,91,1,0.12)]"
              : "border-[#EDE5DA] hover:border-[#F85B01]/40 hover:shadow-[0_8px_20px_-10px_rgba(30,23,19,0.3)]"
          } ${isMobile ? "p-0.5" : "h-11 pl-1 pr-2.5"}`}
        >
          <AvatarRing size={isMobile ? "sm" : "md"} />
          {!isMobile && (
            <ChevronDown
              className={`w-4 h-4 text-[#6B5E57] transition-transform duration-300 ${
                menuOpen ? "rotate-180" : ""
              }`}
            />
          )}
        </motion.button>
        {accountMenu}
      </div>
    );

  const searchBox = (
    <div
      className={`relative rounded-full p-[1.5px] transition-all duration-300 ${
        focused
          ? "bg-gradient-to-r from-[#F85B01] via-[#FFB074] to-[#F85B01] shadow-[0_12px_30px_-14px_rgba(248,91,1,0.55)]"
          : "bg-[#EDE5DA] hover:bg-[#E2D7C9]"
      }`}
    >
      <div
        className={`rounded-full bg-white flex items-center gap-2 ${
          isMobile ? "h-10 pl-3.5 pr-1" : "h-11 pl-4 pr-1.5"
        }`}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={searchPlaceholder}
          className={`flex-1 min-w-0 bg-transparent outline-none font-medium text-[#1E1713] placeholder-[#9C9088] select-text ${
            isMobile ? "text-[12.5px]" : "text-sm"
          }`}
        />
        {!isMobile && !focused && !query && (
          <kbd className="hidden lg:inline-flex items-center gap-0.5 h-6 px-1.5 rounded-md border border-[#E5DCD0] bg-[#FAF7F2] text-[10.5px] font-bold text-[#8C7F75]">
            <Command className="w-3 h-3" />K
          </kbd>
        )}
        <button
          type="button"
          aria-label="Filters"
          className={`rounded-full bg-[#F6F1EA] hover:bg-[#FFF1E6] text-[#4A3E39] hover:text-[#F85B01] font-bold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
            isMobile ? "w-8 h-8" : "h-8 px-3 text-xs"
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          {!isMobile && <span>Filters</span>}
        </button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          type="button"
          aria-label="Search"
          className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F85B01] to-[#FF7A00] text-white flex items-center justify-center shadow-[0_4px_12px_-2px_rgba(248,91,1,0.55)] cursor-pointer shrink-0"
        >
          <Search className="w-3.5 h-3.5" strokeWidth={2.6} />
        </motion.button>
      </div>
    </div>
  );

  const navLinks = (layoutId: string, isMobileNav: boolean) => (
    <nav
      className={`flex items-center ${
        isMobileNav ? "justify-center gap-7 pt-1" : "gap-7 lg:gap-8"
      }`}
    >
      {navItems.map((item) => {
        const active = item.id === activeNav;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavChange?.(item.id)}
            className={`relative py-1 text-[13.5px] lg:text-[14px] font-bold tracking-tight transition-colors duration-200 cursor-pointer ${
              active ? "text-[#F85B01]" : "text-[#322822] hover:text-[#F85B01]"
            }`}
          >
            <span>{item.label}</span>
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-x-0 -bottom-1 h-[2.5px] rounded-full bg-gradient-to-r from-[#F85B01] to-[#FF7A00]"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );

  if (isMobile) {
    return (
      <header className="sticky top-0 z-40 shrink-0 bg-white/85 backdrop-blur-xl backdrop-saturate-150 border-b border-[#EFE7DC]">
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#F85B01]/40 to-transparent" />
        <div className="px-3.5 pt-3 pb-3 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={onLogoClick}
              className="shrink-0 cursor-pointer"
            >
              <GullyLogo className="h-8 w-auto" />
            </motion.button>
            {rightSlot}
          </div>
          {searchBox}
          {navLinks("siteNavMobile", true)}
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 w-full shrink-0">
      <div className="relative h-[72px] bg-white/80 backdrop-blur-xl backdrop-saturate-150 border-b border-[#EFE7DC] px-6 lg:px-10 flex items-center gap-5 lg:gap-8">
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#F85B01]/40 to-transparent" />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onLogoClick}
          className="shrink-0 cursor-pointer"
        >
          <GullyLogo className="h-10 lg:h-11 w-auto" />
        </motion.button>

        <div className="flex-1 max-w-[580px]">{searchBox}</div>

        <div className="ml-auto flex items-center gap-6 lg:gap-8">
          <div className="hidden md:block">{navLinks("siteNavDesktop", false)}</div>
          {rightSlot}
        </div>
      </div>
    </header>
  );
}

