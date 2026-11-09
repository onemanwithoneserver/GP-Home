import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  LogIn,
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
      setScrolled(top > 10);
    };
    read();
    target.addEventListener("scroll", read, { passive: true });
    return () => target.removeEventListener("scroll", read);
  }, [ref]);
  return scrolled;
}

export default function MobileHeader({
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

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement | null>(null);

  const activeFilterCount =
    (selectedType !== "All Types" ? 1 : 0) +
    (selectedPrice !== "Any Price" ? 1 : 0) +
    (selectedBed !== "Any Beds" ? 1 : 0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
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
    }, 3400);
    return () => window.clearInterval(timer);
  }, []);

  const showSearchHint = !searchQuery && !isSearchFocused;

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-40 shrink-0 w-full select-none"
    >
      <div
        className={`relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "bg-white/92 backdrop-blur-2xl backdrop-saturate-[1.8] shadow-[0_12px_28px_-16px_rgba(30,23,19,0.25)]"
            : "bg-white/95 backdrop-blur-xl"
        } border-b border-[#EFE7DC]`}
      >
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#F85B01]/30 via-[#FFD2A8]/50 to-transparent opacity-80" />

        <div className={`px-4 space-y-2.5 transition-all duration-500 ${scrolled ? "pt-2 pb-2.5" : "pt-3 pb-3"}`}>
          <div className="flex items-center justify-between gap-2">
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={onLogoClick}
              className="shrink-0 cursor-pointer focus:outline-none"
            >
              <GullyLogo
                className={`w-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  scrolled ? "h-7" : "h-8"
                }`}
              />
            </motion.button>

            {variant === "guest" ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={onSignIn}
                className="group sheen relative overflow-hidden inline-flex items-center gap-1.5 h-9 pl-3.5 pr-1 text-[12px] rounded-full bg-[#1E1713] text-white font-bold shadow-[0_8px_20px_-8px_rgba(30,23,19,0.7)] cursor-pointer shrink-0"
              >
                <span className="relative">{signInLabel}</span>
                <span className="relative w-7 h-7 rounded-full bg-gradient-to-br from-[#FF7A1A] to-[#E24E00] flex items-center justify-center shadow-[0_3px_8px_-2px_rgba(248,91,1,0.7)]">
                  <LogIn className="w-3.5 h-3.5" />
                </span>
              </motion.button>
            ) : (
              <div ref={accountRef} className="relative shrink-0">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  aria-label="My Account"
                  aria-expanded={isAccountOpen}
                  onClick={() => setIsAccountOpen((p) => !p)}
                  className={`flex items-center gap-1.5 p-0.5 rounded-full bg-white border transition-all cursor-pointer shadow-2xs ${
                    isAccountOpen ? "border-[#F85B01] ring-2 ring-[#F85B01]/20" : "border-[#EDE5DA]"
                  }`}
                >
                  <AvatarRing size="sm" />
                  <ChevronDown
                    className={`w-3.5 h-3.5 mr-1 text-[#6B5E57] transition-transform duration-300 ${
                      isAccountOpen ? "rotate-180 text-[#F85B01]" : ""
                    }`}
                  />
                </motion.button>

                <AnimatePresence>
                  {isAccountOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: "top right" }}
                      className="absolute right-0 top-[calc(100%+8px)] z-50 w-[280px] rounded-2xl bg-white border border-[#EEE6DB] shadow-[0_32px_64px_-20px_rgba(30,23,19,0.4)] overflow-hidden"
                    >
                      <div className="grain relative p-4 bg-[radial-gradient(120%_140%_at_100%_0%,#5A3524_0%,#2E1E17_45%,#1E1713_100%)] text-white overflow-hidden">
                        <span className="absolute -top-10 -right-8 w-28 h-28 rounded-full bg-[#F85B01]/40 blur-2xl animate-aurora" />
                        <span className="absolute bottom-0 inset-x-0 h-px hairline-gold" />
                        <div className="relative z-[2] flex items-center gap-3">
                          <AvatarRing size="md" />
                          <div className="min-w-0">
                            <p className="text-[15px] font-bold leading-tight truncate tracking-tight">{accountTitle}</p>
                            <p className="text-[10px] uppercase tracking-[0.18em] text-[#FFB074] font-bold mt-0.5 truncate">
                              {accountSubtitle}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-1.5 max-h-[280px] overflow-y-auto scrollbar-hide">
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
                              className={`group relative w-full flex items-center gap-2.5 px-3 h-10 rounded-xl text-left cursor-pointer transition-colors ${
                                active
                                  ? "bg-[#FFF4EC] text-[#F85B01] font-bold"
                                  : "text-[#322822] hover:bg-[#FAF6F1] font-medium"
                              }`}
                            >
                              <span
                                className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                                  active
                                    ? "bg-[#F85B01] text-white"
                                    : "bg-[#F4ECE3] text-[#6B5E57] group-hover:bg-[#1E1713] group-hover:text-white"
                                }`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                              </span>
                              <span className="text-[12.5px] flex-1 truncate">{item.label}</span>
                              <ChevronRight className="w-3.5 h-3.5 text-[#C4B7AA]" />
                            </button>
                          );
                        })}
                      </div>

                      <div className="p-1.5 border-t border-[#F2ECE4] bg-[#FAF7F2]">
                        <button
                          type="button"
                          onClick={() => {
                            setIsAccountOpen(false);
                            onSignOut?.();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 h-9 rounded-xl hover:bg-[#FEF2F2] transition-colors cursor-pointer text-[#DC2626] font-bold text-[12px]"
                        >
                          <span className="w-6 h-6 rounded-lg bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center">
                            <LogOut className="w-3 h-3" />
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

          <div className="relative">
            <div
              className={`relative rounded-full transition-all duration-300 ${
                isSearchFocused || isFilterOpen
                  ? "ring-2 ring-[#F85B01]/30 shadow-[0_12px_28px_-12px_rgba(248,91,1,0.4)]"
                  : "shadow-2xs"
              }`}
            >
              <div
                className={`relative rounded-full border transition-all duration-300 flex items-center gap-2 h-10 pl-3.5 pr-1 ${
                  isSearchFocused || isFilterOpen
                    ? "bg-white border-[#F85B01]"
                    : "bg-[#FAF7F2] border-[#E8E0D4] hover:border-[#D8CCBD]"
                }`}
              >
                <Search
                  className={`shrink-0 w-3.5 h-3.5 transition-colors ${
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
                    onBlur={() => window.setTimeout(() => setIsSearchFocused(false), 180)}
                    placeholder={isSearchFocused ? searchPlaceholder : ""}
                    className="w-full bg-transparent outline-none font-medium text-[12.5px] text-[#1E1713] placeholder-[#A3968B] select-text"
                  />

                  {showSearchHint && (
                    <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden text-[12.5px] text-[#8C7F75] font-medium">
                      <span className="shrink-0 mr-1 text-[#A3968B]">Search</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={hintIndex}
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          transition={{ duration: 0.3 }}
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
                    onClick={() => setSearchQuery("")}
                    className="w-5 h-5 rounded-full bg-[#EAE1D3] text-[#6B5E57] flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}

                <button
                  type="button"
                  aria-label="Filters"
                  onClick={() => {
                    setIsFilterOpen((prev) => !prev);
                    setIsSearchFocused(false);
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 border relative ${
                    activeFilterCount > 0 || isFilterOpen
                      ? "bg-[#1E1713] text-white border-[#1E1713]"
                      : "bg-white hover:bg-[#1E1713] text-[#4A3E39] hover:text-white border-[#E4DDD3]"
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#F85B01] text-white text-[8.5px] font-bold flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {isSearchFocused && !isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 rounded-2xl bg-white border border-[#EEE6DB] shadow-xl p-3 overflow-hidden"
                >
                  <div className="flex items-center gap-1.5 px-1 pb-2 border-b border-[#F2ECE4] text-[10.5px] font-semibold uppercase tracking-wider text-[#8C7F75]">
                    <Sparkles className="w-3 h-3 text-[#F85B01]" />
                    Curated Luxury Searches
                  </div>
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {luxurySearchTags.slice(0, 6).map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onMouseDown={() => setSearchQuery(tag)}
                        className="px-2.5 py-1 rounded-full bg-[#FAF7F2] hover:bg-[#FFF4EC] hover:text-[#F85B01] text-[11.5px] font-medium text-[#4A3E39] border border-[#EFE8DC] transition-colors cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.22 }}
                  className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 rounded-2xl bg-white border border-[#EEE6DB] shadow-2xl p-4 overflow-hidden"
                >
                  <div className="flex items-center justify-between pb-2.5 border-b border-[#F2ECE4]">
                    <div className="flex items-center gap-1.5">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#F85B01]" />
                      <h4 className="text-[13px] font-semibold text-[#1E1713]">Refine Properties</h4>
                    </div>
                    {activeFilterCount > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedType("All Types");
                          setSelectedPrice("Any Price");
                          setSelectedBed("Any Beds");
                        }}
                        className="text-[11px] font-semibold text-[#8C7F75] hover:text-[#F85B01] flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-2.5 h-2.5" />
                        Reset
                      </button>
                    )}
                  </div>

                  <div className="space-y-3 pt-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8C7F75] mb-1.5">
                        Property Type
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {filterPropertyTypes.slice(0, 4).map((type) => {
                          const active = selectedType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setSelectedType(type)}
                              className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                                active
                                  ? "bg-[#1E1713] text-white border-[#1E1713]"
                                  : "bg-[#FAF7F2] text-[#4A3E39] border-[#EFE8DC]"
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8C7F75] mb-1.5">
                        Price Range
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {filterPriceRanges.map((price) => {
                          const active = selectedPrice === price;
                          return (
                            <button
                              key={price}
                              type="button"
                              onClick={() => setSelectedPrice(price)}
                              className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                                active
                                  ? "bg-[#1E1713] text-white border-[#1E1713]"
                                  : "bg-[#FAF7F2] text-[#4A3E39] border-[#EFE8DC]"
                              }`}
                            >
                              {price}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8C7F75] mb-1.5">
                        Bedrooms
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {filterBedrooms.map((bed) => {
                          const active = selectedBed === bed;
                          return (
                            <button
                              key={bed}
                              type="button"
                              onClick={() => setSelectedBed(bed)}
                              className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                                active
                                  ? "bg-[#1E1713] text-white border-[#1E1713]"
                                  : "bg-[#FAF7F2] text-[#4A3E39] border-[#EFE8DC]"
                              }`}
                            >
                              {bed}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#F2ECE4] flex items-center justify-between">
                    <span className="text-[11px] text-[#6B5E57] font-medium">
                      {activeFilterCount > 0 ? `${activeFilterCount} filter active` : "No filters"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsFilterOpen(false)}
                      className="px-3 py-1.5 rounded-full bg-[#F85B01] text-white font-bold text-[11px] flex items-center gap-1 shadow-sm cursor-pointer"
                    >
                      <Check className="w-3 h-3 stroke-[2.5]" />
                      Apply
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <nav className="flex items-center justify-center gap-8 py-1">
            {navItems.map((item) => {
              const active = item.id === activeNav;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavChange?.(item.id)}
                  className={`relative py-1 text-[13px] font-semibold tracking-tight transition-colors cursor-pointer ${
                    active
                      ? "text-[#F85B01] font-bold"
                      : "text-[#5C4D44] hover:text-[#1E1713]"
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <motion.span
                      layoutId="siteNavMobileUnderline"
                      className="absolute -bottom-1 inset-x-0 h-[2px] bg-[#F85B01] rounded-full"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
