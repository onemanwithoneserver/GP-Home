import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Command,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  LogOut,
  Sparkles,
  X,
  Check,
  RotateCcw,
} from "lucide-react";
import { GullyLogo } from "../../../Login/svg icons";
import {
  type HeaderProps,
  searchSuggestions,
  luxurySearchTags,
  filterPropertyTypes,
  filterPriceRanges,
  filterBedrooms,
  AvatarRing,
} from "./data";

function useScrolled(ref: React.RefObject<HTMLElement | null>) {
  const [scrolled, setScrolled] = useState<boolean>(false);
  useEffect(() => {
    let node: HTMLElement | null = ref.current?.parentElement ?? null;
    while (node) {
      const oy = getComputedStyle(node).overflowY;
      if (oy === "auto" || oy === "scroll") break;
      node = node.parentElement;
    }
    const target: HTMLElement | Window = node ?? window;
    const read = () => {
      const top = target instanceof Window ? target.scrollY : target.scrollTop;
      setScrolled(top > 12);
    };
    read();
    target.addEventListener("scroll", read, { passive: true });
    return () => target.removeEventListener("scroll", read);
  }, [ref]);
  return scrolled;
}

export default function DesktopHeader({
  variant,
  navItems,
  activeNav,
  onNavChange,
  onLogoClick,
  searchPlaceholder,
  signInLabel = "Sign In",
  onSignIn,
  accountTitle = "My Account",
  accountSubtitle = "Verified Buyer",
  accountItems = [],
  activeAccountId,
  onAccountSelect,
  signOutLabel = "Sign out",
  onSignOut,
}: HeaderProps) {
  const headerRef = useRef<HTMLElement | null>(null);
  const scrolled = useScrolled(headerRef);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedPrice, setSelectedPrice] = useState("Any Price");
  const [selectedBed, setSelectedBed] = useState("Any Beds");
  const filterRef = useRef<HTMLDivElement | null>(null);

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement | null>(null);

  const activeFilterCount =
    (selectedType !== "All Types" ? 1 : 0) +
    (selectedPrice !== "Any Price" ? 1 : 0) +
    (selectedBed !== "Any Beds" ? 1 : 0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setIsAccountOpen(false);
        setIsFilterOpen(false);
        setIsSearchFocused(false);
        searchInputRef.current?.blur();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setIsAccountOpen(false);
      }
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHintIndex((i) => (i + 1) % searchSuggestions.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  const showSearchHint = !searchQuery && !isSearchFocused;

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-40 w-full shrink-0 select-none"
    >
      <div
        className={`relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "bg-white/88 backdrop-blur-2xl backdrop-saturate-[1.8] shadow-[0_16px_40px_-20px_rgba(30,23,19,0.18)]"
            : "bg-white/95 backdrop-blur-xl"
        } border-b border-[#EFE7DC]`}
      >
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#F85B01]/30 via-[#FFD2A8]/50 to-transparent opacity-90" />

        <div
          className={`px-6 lg:px-12 flex items-center gap-6 lg:gap-10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled ? "h-[66px]" : "h-[76px]"
          }`}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onLogoClick}
            className="shrink-0 cursor-pointer focus:outline-none"
          >
            <GullyLogo
              className={`w-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                scrolled ? "h-9" : "h-10 lg:h-11"
              }`}
            />
          </motion.button>

          <div ref={filterRef} className="flex-1 max-w-[560px] relative">
            <div
              className={`relative rounded-full transition-all duration-300 ${
                isSearchFocused || isFilterOpen
                  ? "ring-4 ring-[#F85B01]/10 shadow-[0_16px_36px_-12px_rgba(248,91,1,0.3)]"
                  : "hover:shadow-xs"
              }`}
            >
              <div
                className={`relative rounded-full border transition-all duration-300 flex items-center gap-2.5 h-[46px] pl-4 pr-1.5 ${
                  isSearchFocused || isFilterOpen
                    ? "bg-white border-[#F85B01]"
                    : "bg-[#FAF7F2]/90 hover:bg-[#F4EFE6] border-[#E8E0D4] hover:border-[#D8CCBD]"
                }`}
              >
                <Search
                  className={`shrink-0 transition-colors duration-200 w-4 h-4 ${
                    isSearchFocused ? "text-[#F85B01]" : "text-[#8C7F75]"
                  }`}
                />

                <div className="relative flex-1 min-w-0 h-full flex items-center">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    aria-label={searchPlaceholder}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      setIsSearchFocused(true);
                      setIsFilterOpen(false);
                    }}
                    onBlur={() => window.setTimeout(() => setIsSearchFocused(false), 200)}
                    placeholder={isSearchFocused ? searchPlaceholder : ""}
                    className="w-full bg-transparent outline-none font-medium text-[13.5px] text-[#1E1713] placeholder-[#A3968B] select-text"
                  />

                  {showSearchHint && (
                    <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden text-[13.5px] text-[#8C7F75] font-medium">
                      <span className="shrink-0 mr-1.5 text-[#A3968B]">Search</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={hintIndex}
                          initial={{ y: 12, opacity: 0, filter: "blur(4px)" }}
                          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                          exit={{ y: -12, opacity: 0, filter: "blur(4px)" }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="truncate text-[#3A2F29] font-semibold"
                        >
                          “{searchSuggestions[hintIndex]}”
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                {searchQuery && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => {
                      setSearchQuery("");
                      searchInputRef.current?.focus();
                    }}
                    className="w-5 h-5 rounded-full bg-[#EAE1D3] hover:bg-[#1E1713] text-[#6B5E57] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-3 h-3 stroke-[2.5]" />
                  </button>
                )}

                {!isSearchFocused && !searchQuery && !isFilterOpen && (
                  <kbd className="hidden lg:inline-flex items-center gap-1 h-6 px-2 rounded-[4px] border border-[#E2D8CC] bg-white text-[10.5px] font-semibold text-[#7A6E65] shadow-2xs">
                    <Command className="w-3 h-3" />K
                  </kbd>
                )}

                <button
                  type="button"
                  aria-label="Filters"
                  onClick={() => {
                    setIsFilterOpen((prev) => !prev);
                    setIsSearchFocused(false);
                  }}
                  className={`relative group rounded-full font-semibold inline-flex items-center gap-1.5 h-8.5 px-3.5 text-[12px] transition-all duration-200 cursor-pointer shrink-0 border shadow-2xs ${
                    activeFilterCount > 0 || isFilterOpen
                      ? "bg-[#1E1713] text-white border-[#1E1713]"
                      : "bg-white hover:bg-[#1E1713] text-[#322822] hover:text-white border-[#E4DDD3] hover:border-[#1E1713]"
                  }`}
                >
                  <SlidersHorizontal
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      isFilterOpen ? "rotate-90 text-[#F85B01]" : ""
                    }`}
                  />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-[#F85B01] text-white text-[9.5px] font-bold flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {isSearchFocused && !isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 rounded-2xl bg-white/98 backdrop-blur-2xl border border-[#EEE6DB] shadow-[0_28px_60px_-16px_rgba(30,23,19,0.32)] p-4 overflow-hidden"
                >
                  <div className="flex items-center justify-between px-1 pb-3 border-b border-[#F2ECE4]">
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8C7F75] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#F85B01]" />
                      Curated Luxury Searches
                    </span>
                    <span className="text-[11px] text-[#A3968B] font-medium">Select to explore</span>
                  </div>

                  <div className="pt-3 flex flex-wrap gap-2">
                    {luxurySearchTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onMouseDown={() => {
                          setSearchQuery(tag);
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#FFF4EC] hover:text-[#F85B01] hover:border-[#F85B01]/40 text-[12px] font-medium text-[#4A3E39] border border-[#EFE8DC] transition-all cursor-pointer text-left shadow-2xs hover:shadow-xs hover:-translate-y-0.5"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 rounded-2xl bg-white border border-[#EEE6DB] shadow-[0_32px_64px_-16px_rgba(30,23,19,0.35)] p-5 overflow-hidden"
                >
                  <div className="flex items-center justify-between pb-3.5 border-b border-[#F2ECE4]">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-[#FFF4EC] text-[#F85B01] flex items-center justify-center">
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                      </span>
                      <h4 className="text-[14px] font-semibold text-[#1E1713]">Refine Properties</h4>
                    </div>
                    {activeFilterCount > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedType("All Types");
                          setSelectedPrice("Any Price");
                          setSelectedBed("Any Beds");
                        }}
                        className="text-[11.5px] font-semibold text-[#8C7F75] hover:text-[#F85B01] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Reset filters
                      </button>
                    )}
                  </div>

                  <div className="space-y-4 pt-3.5">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8C7F75] mb-2">
                        Property Type
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {filterPropertyTypes.map((type) => {
                          const active = selectedType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setSelectedType(type)}
                              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer border ${
                                active
                                  ? "bg-[#1E1713] text-white border-[#1E1713] shadow-xs"
                                  : "bg-[#FAF7F2] text-[#4A3E39] border-[#EFE8DC] hover:border-[#D6C7B2] hover:bg-[#F3EDE2]"
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8C7F75] mb-2">
                        Price Range
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {filterPriceRanges.map((price) => {
                          const active = selectedPrice === price;
                          return (
                            <button
                              key={price}
                              type="button"
                              onClick={() => setSelectedPrice(price)}
                              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer border ${
                                active
                                  ? "bg-[#1E1713] text-white border-[#1E1713] shadow-xs"
                                  : "bg-[#FAF7F2] text-[#4A3E39] border-[#EFE8DC] hover:border-[#D6C7B2] hover:bg-[#F3EDE2]"
                              }`}
                            >
                              {price}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8C7F75] mb-2">
                        Bedrooms
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {filterBedrooms.map((bed) => {
                          const active = selectedBed === bed;
                          return (
                            <button
                              key={bed}
                              type="button"
                              onClick={() => setSelectedBed(bed)}
                              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer border ${
                                active
                                  ? "bg-[#1E1713] text-white border-[#1E1713] shadow-xs"
                                  : "bg-[#FAF7F2] text-[#4A3E39] border-[#EFE8DC] hover:border-[#D6C7B2] hover:bg-[#F3EDE2]"
                              }`}
                            >
                              {bed}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#F2ECE4] flex items-center justify-between">
                    <span className="text-[12px] text-[#6B5E57] font-medium">
                      {activeFilterCount > 0 ? `${activeFilterCount} active filter applied` : "No filters applied"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsFilterOpen(false)}
                      className="px-4 py-2 rounded-full bg-[#F85B01] hover:bg-[#E24E00] text-white font-bold text-[12px] shadow-[0_6px_16px_-4px_rgba(248,91,1,0.5)] transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      Apply Filters
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="ml-auto flex items-center gap-4 lg:gap-6">
            <div className="hidden md:block">
              <nav className="flex items-center gap-6 lg:gap-8">
                {navItems.map((item) => {
                  const active = item.id === activeNav;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onNavChange?.(item.id)}
                      className={`relative py-1 text-[13.5px] font-semibold tracking-tight transition-colors duration-200 cursor-pointer ${
                        active
                          ? "text-[#F85B01] font-bold"
                          : "text-[#5C4D44] hover:text-[#1E1713]"
                      }`}
                    >
                      <span>{item.label}</span>
                      {active && (
                        <motion.span
                          layoutId="siteNavDesktopUnderline"
                          className="absolute -bottom-1 inset-x-0 h-[2px] bg-[#F85B01] rounded-full"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <span className="hidden md:block w-px h-7 bg-gradient-to-b from-transparent via-[#E2D7C9] to-transparent" />

            {variant === "guest" ? (
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={onSignIn}
                className="group sheen relative overflow-hidden inline-flex items-center gap-2.5 h-11 pl-5 pr-1.5 text-[13px] rounded-full bg-[#1E1713] text-white font-bold shadow-[0_10px_24px_-10px_rgba(30,23,19,0.8),inset_0_1px_0_rgba(255,255,255,0.14)] cursor-pointer shrink-0"
              >
                <span className="relative">{signInLabel}</span>
                <span className="relative w-8 h-8 rounded-full bg-gradient-to-br from-[#FF7A1A] to-[#E24E00] flex items-center justify-center shadow-[0_4px_10px_-2px_rgba(248,91,1,0.7)] transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </motion.button>
            ) : (
              <div ref={accountRef} className="relative shrink-0">
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  aria-label="My Account Menu"
                  aria-expanded={isAccountOpen}
                  onClick={() => setIsAccountOpen((p) => !p)}
                  className={`flex items-center gap-2.5 rounded-full bg-white/95 backdrop-blur-xl border transition-all cursor-pointer h-11 pl-1 pr-3.5 ${
                    isAccountOpen
                      ? "border-[#F85B01]/50 shadow-[0_0_0_4px_rgba(248,91,1,0.12)]"
                      : "border-[#EDE5DA] hover:border-[#F85B01]/40 hover:shadow-sm"
                  }`}
                >
                  <AvatarRing size="md" />
                  <span className="hidden lg:flex flex-col items-start leading-none">
                    <span className="text-[12.5px] font-bold text-[#1E1713]">{accountTitle}</span>
                    <span className="text-[10px] font-medium text-[#A3968B] mt-0.5">{accountSubtitle}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#6B5E57] transition-transform duration-300 ${
                      isAccountOpen ? "rotate-180 text-[#F85B01]" : ""
                    }`}
                  />
                </motion.button>

                <AnimatePresence>
                  {isAccountOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.96, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -8, scale: 0.97, filter: "blur(4px)" }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: "top right" }}
                      className="absolute right-0 top-[calc(100%+12px)] z-50 w-[312px] rounded-2xl bg-white border border-[#EEE6DB] shadow-[0_40px_80px_-28px_rgba(30,23,19,0.45),0_2px_6px_rgba(30,23,19,0.06)] overflow-hidden"
                    >
                      <div className="grain relative p-5 bg-[radial-gradient(120%_140%_at_100%_0%,#5A3524_0%,#2E1E17_45%,#1E1713_100%)] text-white overflow-hidden">
                        <span className="absolute -top-14 -right-12 w-40 h-40 rounded-full bg-[#F85B01]/40 blur-3xl animate-aurora" />
                        <span className="absolute bottom-0 inset-x-0 h-px hairline-gold" />
                        <div className="relative z-[2] flex items-center gap-3.5">
                          <AvatarRing size="lg" />
                          <div className="min-w-0">
                            <p className="text-[18px] font-bold leading-tight truncate tracking-tight">{accountTitle}</p>
                            <p className="text-[10.5px] uppercase tracking-[0.2em] text-[#FFB074] font-semibold mt-1 truncate">
                              {accountSubtitle}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2 max-h-[340px] overflow-y-auto scrollbar-hide">
                        {accountItems.map((item) => {
                          const Icon = item.icon;
                          const active = item.id === activeAccountId;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => {
                                setIsAccountOpen(false);
                                onAccountSelect?.(item.id);
                              }}
                              className={`group relative w-full flex items-center gap-3 px-3.5 h-11 rounded-xl text-left cursor-pointer transition-all duration-200 ${
                                active
                                  ? "bg-[#FFF4EC] text-[#F85B01] font-semibold"
                                  : "text-[#322822] hover:bg-[#FAF6F1] font-medium"
                              }`}
                            >
                              <span
                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                  active
                                    ? "bg-[#F85B01] text-white shadow-[0_4px_10px_-2px_rgba(248,91,1,0.6)]"
                                    : "bg-[#F4ECE3] text-[#6B5E57] group-hover:bg-[#1E1713] group-hover:text-white"
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </span>
                              <span className="text-[13px] flex-1 truncate">{item.label}</span>
                              <ChevronRight className="w-4 h-4 text-[#C4B7AA] group-hover:text-[#F85B01] group-hover:translate-x-0.5 transition-all" />
                            </button>
                          );
                        })}
                      </div>

                      <div className="p-2 border-t border-[#F2ECE4] bg-[#FAF7F2]">
                        <button
                          type="button"
                          onClick={() => {
                            setIsAccountOpen(false);
                            onSignOut?.();
                          }}
                          className="w-full flex items-center gap-3 px-3.5 h-10 rounded-xl hover:bg-[#FEF2F2] transition-colors cursor-pointer text-[#DC2626] font-semibold text-[13px]"
                        >
                          <span className="w-7 h-7 rounded-lg bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center">
                            <LogOut className="w-3.5 h-3.5" />
                          </span>
                          <span>{signOutLabel}</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
