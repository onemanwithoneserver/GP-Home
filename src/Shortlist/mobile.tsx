import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Trash2,
  Heart,
  LayoutGrid,
  List,
  RotateCcw,
  ChevronDown,
  ChevronRight,
  Check,
  X,
  Phone,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import SiteHeader from "../Home/components/Header";
import {
  shortlistData,
  type PropertyCategory,
  type SortOption,
  type ViewType,
  type ShortlistPropertyItem,
} from "./data";
import { dashboardTabs } from "../dashboard/Shell";

export default function ShortlistMobile() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState<ShortlistPropertyItem[]>(shortlistData.defaultProperties);
  const [selectedCategory, setSelectedCategory] = useState<PropertyCategory>("All");
  const [selectedSort, setSelectedSort] = useState<SortOption>("Recently Added");
  const [viewMode, setViewMode] = useState<ViewType>("grid");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [activeModalProperty, setActiveModalProperty] = useState<ShortlistPropertyItem | null>(null);
  const [confirmRemoveProperty, setConfirmRemoveProperty] = useState<ShortlistPropertyItem | null>(null);
  const [recentlyRemoved, setRecentlyRemoved] = useState<ShortlistPropertyItem | null>(null);

  const filteredProperties = useMemo(() => {
    let result = [...properties];
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (selectedSort === "Price: Low to High") {
      result.sort((a, b) => a.numericPricePerSqFt - b.numericPricePerSqFt);
    } else if (selectedSort === "Price: High to Low") {
      result.sort((a, b) => b.numericPricePerSqFt - a.numericPricePerSqFt);
    } else if (selectedSort === "Area: Large to Small") {
      result.sort((a, b) => parseFloat(b.acres) - parseFloat(a.acres));
    }
    return result;
  }, [properties, selectedCategory, selectedSort]);

  const avgPrice = useMemo(() => {
    if (properties.length === 0) return 0;
    const sum = properties.reduce((acc, curr) => acc + curr.numericPricePerSqFt, 0);
    return Math.round(sum / properties.length);
  }, [properties]);

  const handleRemove = (prop: ShortlistPropertyItem) => {
    setRecentlyRemoved(prop);
    setProperties((prev) => prev.filter((p) => p.id !== prop.id));
  };

  const handleUndoRemove = () => {
    if (recentlyRemoved) {
      setProperties((prev) => [recentlyRemoved, ...prev]);
      setRecentlyRemoved(null);
    }
  };

  const toggleHeart = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isShortlisted: !p.isShortlisted } : p)),
    );
  };

  const header = (
    <SiteHeader
      isMobile={true}
      variant="user"
      navItems={[
        { id: "videos", label: "Videos" },
        { id: "shortlist", label: "Shortlist" },
      ]}
      activeNav="shortlist"
      onNavChange={(id) => {
        if (id === "videos") {
          navigate("/mobile/home-login");
        }
      }}
      onLogoClick={() => navigate("/mobile/home-login")}
      searchPlaceholder="Search places, projects..."
      accountTitle="My Account"
      accountSubtitle="Buyer account"
      accountItems={dashboardTabs}
      activeAccountId="saved-properties"
      onAccountSelect={(tabId) => navigate(`/mobile/dashboard/${tabId}`)}
      signOutLabel="Sign out"
      onSignOut={() => navigate("/mobile/home")}
    />
  );

  return (
    <div className="relative w-full min-h-screen flex-1 flex flex-col bg-white overflow-y-auto overflow-x-hidden scrollbar-hide select-text">
      {header}

      <div className="relative shrink-0 bg-gradient-to-br from-[#1E1713] via-[#2E1E17] to-[#452213] text-white pt-6 pb-12 px-4 shadow-sm">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-[#F85B01]/30 blur-2xl pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:14px_14px] pointer-events-none" />
        </div>

        <div className="relative space-y-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF1E6]/15 backdrop-blur-md text-[#FFB074] border border-[#F85B01]/30 text-[10px] font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-2.5 h-2.5 text-[#F85B01]" />
              Buyer Shortlist
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">{shortlistData.title}</h1>
            <p className="text-[#D6C7BC] text-xs font-medium mt-1 leading-relaxed">
              {shortlistData.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="rounded-xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.14] p-2.5 text-white flex flex-col justify-between">
              <span className="text-[#D4C5B8] text-[10px] font-medium">Saved</span>
              <span className="text-xl font-bold mt-1 text-white">{properties.length}</span>
            </div>
            <div className="rounded-xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.14] p-2.5 text-white flex flex-col justify-between">
              <span className="text-[#D4C5B8] text-[10px] font-medium">Avg /sft</span>
              <span className="text-[13px] font-bold mt-1 text-[#FFB074] truncate">
                {avgPrice > 0 ? `₹${avgPrice.toLocaleString("en-IN")}` : "—"}
              </span>
            </div>
            <div className="rounded-xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.14] p-2.5 text-white flex flex-col justify-between">
              <span className="text-[#D4C5B8] text-[10px] font-medium">Region</span>
              <span className="text-[11px] font-bold mt-1 text-white truncate">West Zone</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 shrink-0 px-3.5 -mt-6">
        <div className="rounded-2xl bg-white/95 backdrop-blur-xl border border-[#EEE6DB] shadow-[0_8px_24px_-10px_rgba(30,23,19,0.12)] p-2 space-y-2.5">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-0.5 -mx-1 px-1">
            {shortlistData.categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`h-8 px-3.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                    active
                      ? "bg-[#1E1713] text-white shadow-xs"
                      : "bg-[#FAF6F1] text-[#4A3E39] border border-[#E8E1D5]"
                  }`}
                >
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#F4EFE6]">
            <div className="flex items-center p-0.5 rounded-lg bg-[#FAF6F1] border border-[#E8E1D5]">
              <div className="relative group/tooltip flex items-center">
                <button
                  type="button"
                  aria-label="Grid view"
                  onClick={() => setViewMode("grid")}
                  className={`w-7 h-7 rounded-md flex items-center justify-center transition-all cursor-pointer ${
                    viewMode === "grid" ? "bg-[#1E1713] text-white shadow-xs" : "text-[#7A6D64]"
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <div
                  role="tooltip"
                  className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-md bg-[#1E1713] text-white text-[10px] font-bold shadow-md border border-white/10 opacity-0 -translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-200 z-50 flex items-center gap-1"
                >
                  <span>Grid view</span>
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-[#1E1713] border-r border-b border-white/10" />
                </div>
              </div>

              <div className="relative group/tooltip flex items-center">
                <button
                  type="button"
                  aria-label="List view"
                  onClick={() => setViewMode("list")}
                  className={`w-7 h-7 rounded-md flex items-center justify-center transition-all cursor-pointer ${
                    viewMode === "list" ? "bg-[#1E1713] text-white shadow-xs" : "text-[#7A6D64]"
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <div
                  role="tooltip"
                  className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-md bg-[#1E1713] text-white text-[10px] font-bold shadow-md border border-white/10 opacity-0 -translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-200 z-50 flex items-center gap-1"
                >
                  <span>List view</span>
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-[#1E1713] border-r border-b border-white/10" />
                </div>
              </div>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSortOpen((p) => !p)}
                className="h-8 px-2.5 rounded-lg border border-[#E5DFD4] bg-white text-[11px] font-bold text-[#1E1713] flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span className="truncate max-w-[120px]">{selectedSort}</span>
                <ChevronDown
                  className={`w-3 h-3 text-[#8C7F75] transition-transform duration-200 ${
                    isSortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-1.5 w-44 rounded-2xl border border-[#EEE6DB] bg-white/98 backdrop-blur-2xl shadow-2xl p-1 space-y-0.5 z-30"
                  >
                    {shortlistData.sortOptions.map((opt) => {
                      const isSelected = opt === selectedSort;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setSelectedSort(opt);
                            setIsSortOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-[11px] font-bold transition-colors cursor-pointer text-left ${
                            isSelected
                              ? "bg-[#FFF1E6] text-[#E24E00]"
                              : "text-[#322822] hover:bg-[#FAF6F1]"
                          }`}
                        >
                          <span className="truncate">{opt}</span>
                          {isSelected && <Check className="w-3 h-3 text-[#F85B01]" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <main className="relative px-3.5 pt-5 pb-16 flex-1 space-y-4">
        {filteredProperties.length === 0 ? (
          <div className="relative rounded-2xl border border-dashed border-[#D9D0C4] bg-white/80 p-8 text-center space-y-3">
            <span className="w-12 h-12 rounded-xl bg-[#FFF1E6] text-[#F85B01] flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6" />
            </span>
            <div>
              <h3 className="text-base font-bold text-[#1E1713]">No saved properties</h3>
              <p className="text-[11px] text-[#7A6D64] font-medium mt-0.5">
                Switch filters or restore sample items.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setProperties(shortlistData.defaultProperties);
                setSelectedCategory("All");
              }}
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl bg-[#1E1713] text-white text-[11px] font-medium hover:bg-[#F85B01] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restore samples
            </button>
          </div>
        ) : viewMode === "list" ? (
          <div className="space-y-3">
            {filteredProperties.map((prop) => (
              <motion.article
                key={prop.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative rounded-2xl bg-white border border-[#EEE6DB] shadow-[0_1px_3px_rgba(50,40,34,0.05)] overflow-hidden flex h-[144px]"
              >
                <div className="relative w-[124px] h-full shrink-0 bg-[#EAE2D7] overflow-hidden">
                  <img src={prop.imageUrl} alt={prop.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                  <span className="absolute top-2 left-2 h-4.5 px-2 rounded-full bg-white/95 backdrop-blur-md text-[#1E1713] font-semibold text-[9px] flex items-center shadow-xs">
                    {prop.category}
                  </span>

                  <button
                    type="button"
                    aria-label="Toggle shortlist"
                    onClick={() => toggleHeart(prop.id)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center cursor-pointer"
                  >
                    <Heart
                      className={`w-3 h-3 ${
                        prop.isShortlisted ? "fill-[#F85B01] text-[#F85B01]" : "text-[#7A6D64]"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex-1 p-2.5 flex flex-col justify-between overflow-hidden min-w-0">
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="text-xs font-semibold text-[#1E1713] truncate">{prop.name}</h3>
                      <span className="shrink-0 text-[8.5px] font-semibold px-1.5 py-0.5 rounded-full bg-[#FFF1E6] text-[#E24E00] border border-[#F85B01]/20">
                        {prop.zone}
                      </span>
                    </div>

                    <p className="text-[10px] font-semibold text-[#7A6D64] flex items-center gap-1 truncate">
                      <MapPin className="w-2.5 h-2.5 text-[#F85B01] shrink-0" />
                      <span className="truncate">{prop.location}</span>
                    </p>

                    <div className="flex items-baseline gap-1.5 pt-0.5">
                      <span className="text-[12.5px] font-bold text-[#F85B01]">{prop.pricePerSqFt}</span>
                      <span className="text-[10px] font-medium text-[#8C7F75] bg-[#FAF6F1] px-1 py-0.2 rounded border border-[#EEE6DB]">
                        {prop.priceRange}
                      </span>
                    </div>

                    <p className="text-[10px] font-medium text-[#5C4D44] truncate">
                      {prop.bhk} • {prop.acres}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalProperty(prop)}
                      className="group/btn h-7 px-2.5 rounded-lg bg-[#1E1713] active:bg-[#F85B01] text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer shadow-xs transition-colors"
                    >
                      <span>View Details</span>
                      <span className="relative w-2.5 h-2.5 flex items-center justify-center overflow-hidden">
                        <ChevronRight className="w-2.5 h-2.5 transition-all duration-200 group-hover/btn:opacity-0 group-hover/btn:translate-x-1 absolute" />
                        <ArrowRight className="w-2.5 h-2.5 transition-all duration-200 opacity-0 -translate-x-1 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 absolute" />
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmRemoveProperty(prop)}
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-[#DC2626] cursor-pointer"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProperties.map((prop) => (
              <motion.article
                key={prop.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative rounded-[18px] bg-white border border-[#EFE7DC] shadow-[0_2px_10px_-3px_rgba(30,23,19,0.06)] overflow-hidden flex flex-col justify-between"
              >
                <div className="relative h-44 w-full shrink-0 bg-[#EAE2D7] overflow-hidden">
                  <img src={prop.imageUrl} alt={prop.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/25 pointer-events-none" />

                  <div className="absolute top-2.5 left-2.5 flex flex-wrap items-center gap-1 max-w-[80%]">
                    <span className="h-5 px-2.5 rounded-full bg-white/95 backdrop-blur-md text-[#1E1713] font-bold text-[9px] uppercase tracking-wider flex items-center shadow-xs">
                      {prop.category}
                    </span>
                    <span className="h-5 px-2 rounded-full bg-[#1E1713]/80 backdrop-blur-md text-[#FFD2A8] border border-white/15 font-semibold text-[9px] flex items-center shadow-xs">
                      {prop.status}
                    </span>
                  </div>

                  <button
                    type="button"
                    aria-label="Toggle shortlist"
                    onClick={() => toggleHeart(prop.id)}
                    className="absolute top-2.5 right-2.5 w-7.5 h-7.5 rounded-full bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center cursor-pointer text-[#F85B01]"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        prop.isShortlisted ? "fill-[#F85B01] text-[#F85B01]" : "text-[#7A6D64]"
                      }`}
                    />
                  </button>
                </div>

                <div className="p-3.5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[#1E1713] truncate">{prop.name}</h3>
                      <p className="text-[10.5px] font-medium text-[#7A6D64] flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 text-[#F85B01] shrink-0" />
                        <span className="truncate">{prop.location}</span>
                      </p>
                    </div>
                    <span className="shrink-0 text-[9px] font-semibold px-2 py-0.5 rounded-full bg-[#FAF5EE] text-[#6E4F3A] border border-[#E8DDCD]">
                      {prop.zone}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between pt-0.5">
                    <div>
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-[#A3968B] block">Price Guide</span>
                      <span className="text-[14px] font-bold text-[#1E1713] tracking-tight">{prop.priceRange}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-[#A3968B] block">Rate</span>
                      <span className="text-[11.5px] font-bold text-[#F85B01]">{prop.pricePerSqFt}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 divide-x divide-[#EFE7DC] py-1.5 px-1 rounded-lg bg-[#FAF7F2] border border-[#EFE7DC]">
                    <div className="flex flex-col items-center justify-center text-center px-1">
                      <span className="flex items-center gap-0.5 text-[8.5px] font-semibold uppercase tracking-wider text-[#8C7F75]">
                        <Bed className="w-2.5 h-2.5 text-[#F85B01]" />
                        BHK
                      </span>
                      <span className="text-[10.5px] font-semibold text-[#1E1713] mt-0.5 truncate">{prop.bhk}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center px-1">
                      <span className="flex items-center gap-0.5 text-[8.5px] font-semibold uppercase tracking-wider text-[#8C7F75]">
                        <Bath className="w-2.5 h-2.5 text-[#F85B01]" />
                        Baths
                      </span>
                      <span className="text-[10.5px] font-semibold text-[#1E1713] mt-0.5 truncate">{prop.baths}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center px-1">
                      <span className="flex items-center gap-0.5 text-[8.5px] font-semibold uppercase tracking-wider text-[#8C7F75]">
                        <Maximize2 className="w-2.5 h-2.5 text-[#F85B01]" />
                        Land
                      </span>
                      <span className="text-[10.5px] font-semibold text-[#1E1713] mt-0.5 truncate">{prop.acres}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {prop.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-medium px-2 py-0.5 rounded bg-white text-[#5A4D45] border border-[#E8E0D4]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-3.5 pb-3.5 pt-2 border-t border-[#F2ECE4] flex items-center justify-between gap-2 bg-[#FAF8F5]/60">
                  <button
                    type="button"
                    onClick={() => setActiveModalProperty(prop)}
                    className="group/btn h-8 px-3.5 rounded-lg bg-[#1E1713] active:bg-[#F85B01] text-white text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmRemoveProperty(prop)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8C7F75] hover:text-[#DC2626] cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </main>

      <AnimatePresence>
        {recentlyRemoved && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-4 left-4 right-4 z-50 rounded-xl bg-[#1E1713] text-white px-4 py-3 shadow-xl flex items-center justify-between border border-white/10"
          >
            <span className="text-[11px] font-bold truncate pr-2">
              Removed <strong>{recentlyRemoved.name}</strong>
            </span>
            <button
              type="button"
              onClick={handleUndoRemove}
              className="text-[11px] font-bold text-[#F85B01] hover:underline cursor-pointer shrink-0"
            >
              Undo
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmRemoveProperty && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmRemoveProperty(null)}
              className="absolute inset-0 bg-[#1E1713]/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm rounded-t-[4px] sm:rounded-[4px] bg-white shadow-2xl border-t sm:border border-[#EEE6DB] p-5 space-y-4 z-10 overflow-hidden"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-bold text-[#1E1713] tracking-tight">
                  Remove from Shortlist?
                </h3>
                <button
                  type="button"
                  aria-label="Close dialog"
                  onClick={() => setConfirmRemoveProperty(null)}
                  className="w-8 h-8 rounded-[4px] bg-[#FAF6F1] hover:bg-[#F2ECE4] text-[#6B5E57] hover:text-[#1E1713] flex items-center justify-center cursor-pointer transition-colors shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11.5px] text-[#7A6D64] font-medium leading-relaxed -mt-1.5">
                Are you sure you want to remove this property from your saved list?
              </p>

              <div className="p-2.5 rounded-2xl bg-[#FAF8F5] border border-[#EFE8DE] flex items-center gap-3">
                <img
                  src={confirmRemoveProperty.imageUrl}
                  alt={confirmRemoveProperty.name}
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-semibold text-[#1E1713] truncate">
                    {confirmRemoveProperty.name}
                  </h4>
                  <p className="text-[11px] text-[#7A6D64] font-medium flex items-center gap-1 truncate mt-0.5">
                    <MapPin className="w-3 h-3 text-[#F85B01] shrink-0" />
                    <span>{confirmRemoveProperty.location}</span>
                  </p>
                  <p className="text-[11.5px] font-bold text-[#F85B01] mt-0.5">
                    {confirmRemoveProperty.pricePerSqFt}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setConfirmRemoveProperty(null)}
                  className="flex-1 h-10 rounded-xl border border-[#E2D9CD] bg-white hover:bg-[#FAF8F5] text-xs font-semibold text-[#4A3E39] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleRemove(confirmRemoveProperty);
                    setConfirmRemoveProperty(null);
                  }}
                  className="flex-1 h-10 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold shadow-[0_4px_14px_-2px_rgba(220,38,38,0.4)] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeModalProperty && (
          <div className="fixed inset-0 z-50 flex items-end justify-center p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProperty(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="relative w-full rounded-t-[4px] bg-white shadow-2xl border-t border-[#EEE6DB] overflow-hidden z-10 max-h-[85vh] flex flex-col"
            >
              <div className="relative h-44 w-full bg-[#EAE2D7]">
                <img
                  src={activeModalProperty.imageUrl}
                  alt={activeModalProperty.name}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  aria-label="Back"
                  onClick={() => setActiveModalProperty(null)}
                  className="absolute top-3 left-3 w-8 h-8 rounded-[4px] bg-black/60 text-white flex items-center justify-center cursor-pointer shadow-md"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 overflow-y-auto space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-[#1E1713]">{activeModalProperty.name}</h2>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FFF1E6] text-[#E24E00] border border-[#F85B01]/20">
                      {activeModalProperty.zone}
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold text-[#7A6D64] flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-[#F85B01]" />
                    <span>{activeModalProperty.location}</span>
                  </p>
                </div>

                <div className="flex items-baseline justify-between p-3 rounded-xl bg-[#FAF6F1] border border-[#EEE6DB]">
                  <div>
                    <span className="text-[10px] text-[#8C7F75] font-semibold block">Rate</span>
                    <span className="text-sm font-bold text-[#F85B01]">
                      {activeModalProperty.pricePerSqFt}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#8C7F75] font-semibold block">Range</span>
                    <span className="text-xs font-semibold text-[#1E1713]">
                      {activeModalProperty.priceRange}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10.5px] font-semibold text-[#8C7F75] uppercase tracking-wider mb-1">
                    About Project
                  </h4>
                  <p className="text-xs text-[#4A3E39] leading-relaxed font-medium">
                    {activeModalProperty.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-[10.5px] font-semibold text-[#8C7F75] uppercase tracking-wider mb-1.5">
                    Amenities
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalProperty.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10.5px] font-medium px-2.5 py-0.5 rounded bg-[#FAF6F1] text-[#5C4D44] border border-[#E8E1D5]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveModalProperty(null)}
                    className="flex-1 h-10 rounded-xl border border-[#E5DFD4] font-semibold text-xs text-[#4A3E39] cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="flex-1 h-10 rounded-xl bg-gradient-to-r from-[#F85B01] via-[#FF6A10] to-[#FF8A2A] text-white text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Contact</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
