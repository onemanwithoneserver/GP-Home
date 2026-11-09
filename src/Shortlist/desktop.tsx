import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

export default function ShortlistDesktop() {
  const navigate = useNavigate();
  const location = useLocation();
  const targetViewport = location.pathname.startsWith("/mobile") ? "mobile" : "desktop";

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
      isMobile={false}
      variant="user"
      navItems={[
        { id: "videos", label: "Videos" },
        { id: "shortlist", label: "Shortlist" },
      ]}
      activeNav="shortlist"
      onNavChange={(id) => {
        if (id === "videos") {
          navigate(`/${targetViewport}/home-login`);
        }
      }}
      onLogoClick={() => navigate(`/${targetViewport}/home-login`)}
      searchPlaceholder="Search places, projects..."
      accountTitle="My Account"
      accountSubtitle="Buyer account"
      accountItems={dashboardTabs}
      activeAccountId="saved-properties"
      onAccountSelect={(tabId) => navigate(`/${targetViewport}/dashboard/${tabId}`)}
      signOutLabel="Sign out"
      onSignOut={() => navigate(`/${targetViewport}/home`)}
    />
  );

  return (
    <div className="relative w-full min-h-screen flex-1 flex flex-col bg-white overflow-y-auto overflow-x-hidden scrollbar-hide select-text">
      {header}

      <div className="relative shrink-0 bg-gradient-to-br from-[#1E1713] via-[#2E1E17] to-[#452213] text-white pt-10 pb-16 lg:pb-20 px-6 lg:px-12 shadow-sm">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="absolute -top-24 -right-16 w-80 h-80 rounded-full bg-[#F85B01]/35 blur-3xl pointer-events-none" />
          <span className="absolute bottom-0 -left-16 w-72 h-72 rounded-full bg-[#C24A0A]/25 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.10] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        </div>

        <div className="relative max-w-[1240px] mx-auto space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF1E6]/15 backdrop-blur-md text-[#FFB074] border border-[#F85B01]/30 text-[11px] font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3 h-3 text-[#F85B01]" />
              Buyer Shortlist
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              {shortlistData.title}
            </h1>
            <p className="text-[#D6C7BC] text-sm lg:text-[15px] font-medium mt-1 max-w-2xl leading-relaxed">
              {shortlistData.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.14] p-5 text-white shadow-[0_12px_28px_-10px_rgba(0,0,0,0.35)] flex flex-col justify-between hover:border-[#F85B01]/40 transition-all">
              <span className="text-[#D4C5B8] text-xs font-semibold">Saved Projects</span>
              <span className="text-3xl font-bold mt-2 text-white">{properties.length}</span>
            </div>
            <div className="rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.14] p-5 text-white shadow-[0_12px_28px_-10px_rgba(0,0,0,0.35)] flex flex-col justify-between hover:border-[#F85B01]/40 transition-all">
              <span className="text-[#D4C5B8] text-xs font-semibold">Avg Price per Sq Ft</span>
              <span className="text-3xl font-bold mt-2 text-[#FFB074]">
                {avgPrice > 0 ? `₹${avgPrice.toLocaleString("en-IN")}` : "—"}
              </span>
            </div>
            <div className="rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.14] p-5 text-white shadow-[0_12px_28px_-10px_rgba(0,0,0,0.35)] flex flex-col justify-between hover:border-[#F85B01]/40 transition-all">
              <span className="text-[#D4C5B8] text-xs font-semibold">Regions Covered</span>
              <div className="flex items-center gap-2 mt-2 truncate">
                <span className="w-2 h-2 rounded-full bg-[#F85B01]" />
                <span className="text-xl lg:text-2xl font-bold text-white truncate">
                  Hyderabad • West Zone
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 shrink-0 max-w-[1240px] w-full mx-auto px-6 lg:px-12 -mt-8">
        <div className="rounded-2xl bg-white/95 backdrop-blur-xl border border-[#EEE6DB] shadow-[0_12px_36px_-12px_rgba(50,40,34,0.14)] p-2 sm:px-4 sm:py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-1">
            {shortlistData.categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`h-9 px-4 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center justify-center ${
                    active
                      ? "bg-[#1E1713] text-white shadow-[0_6px_16px_-6px_rgba(30,23,19,0.5)]"
                      : "bg-[#FAF6F1] text-[#4A3E39] hover:bg-[#FFF1E6] hover:text-[#F85B01] border border-[#E8E1D5]"
                  }`}
                >
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 shrink-0 ml-auto">
            <div className="flex items-center p-1 rounded-xl bg-[#FAF6F1] border border-[#E8E1D5]">
              <div className="relative group/tooltip flex items-center">
                <button
                  type="button"
                  aria-label="Grid view"
                  onClick={() => setViewMode("grid")}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-[#1E1713] text-white shadow-xs"
                      : "text-[#7A6D64] hover:text-[#1E1713]"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <div
                  role="tooltip"
                  className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-lg bg-[#1E1713] text-white text-[11px] font-bold shadow-[0_8px_20px_-4px_rgba(30,23,19,0.4)] border border-white/10 opacity-0 -translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-200 z-50 flex items-center gap-1"
                >
                  <span>Grid view</span>
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#1E1713] border-r border-b border-white/10" />
                </div>
              </div>

              <div className="relative group/tooltip flex items-center">
                <button
                  type="button"
                  aria-label="List view"
                  onClick={() => setViewMode("list")}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                    viewMode === "list"
                      ? "bg-[#1E1713] text-white shadow-xs"
                      : "text-[#7A6D64] hover:text-[#1E1713]"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
                <div
                  role="tooltip"
                  className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-lg bg-[#1E1713] text-white text-[11px] font-bold shadow-[0_8px_20px_-4px_rgba(30,23,19,0.4)] border border-white/10 opacity-0 -translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-200 z-50 flex items-center gap-1"
                >
                  <span>List view</span>
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#1E1713] border-r border-b border-white/10" />
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#8C7F75] hidden sm:inline">Sort by</span>
                <button
                  type="button"
                  onClick={() => setIsSortOpen((p) => !p)}
                  className="h-10 px-3.5 rounded-xl border border-[#E2D9CD] bg-[#FDFBF8] text-xs font-bold text-[#1E1713] flex items-center gap-2 hover:border-[#F85B01] hover:bg-white cursor-pointer shadow-xs transition-all"
                >
                  <span>{selectedSort}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#8C7F75] transition-transform duration-200 ${
                      isSortOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-1.5 w-48 rounded-2xl border border-[#EEE6DB] bg-white/98 backdrop-blur-2xl shadow-[0_22px_45px_-12px_rgba(30,23,19,0.22)] p-1.5 space-y-0.5 z-30"
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
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer text-left ${
                            isSelected
                              ? "bg-[#FFF1E6] text-[#E24E00]"
                              : "text-[#322822] hover:bg-[#FAF6F1]"
                          }`}
                        >
                          <span>{opt}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#F85B01]" />}
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

      <main className="relative max-w-[1240px] w-full mx-auto px-6 lg:px-12 pt-8 pb-20 flex-1">
        {filteredProperties.length === 0 ? (
          <div className="relative rounded-3xl border border-dashed border-[#D9D0C4] bg-white/80 backdrop-blur-sm p-12 text-center max-w-lg mx-auto space-y-4">
            <span className="w-14 h-14 rounded-2xl bg-[#FFF1E6] text-[#F85B01] flex items-center justify-center mx-auto shadow-inner">
              <Heart className="w-7 h-7" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-[#1E1713]">No saved properties in this category</h3>
              <p className="text-xs text-[#7A6D64] font-medium mt-1">
                Explore more listings or restore the sample properties to preview your shortlist.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setProperties(shortlistData.defaultProperties);
                setSelectedCategory("All");
              }}
              className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-[#1E1713] text-white text-xs font-semibold hover:bg-[#F85B01] transition-colors cursor-pointer shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restore sample properties
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProperties.map((prop) => (
              <motion.article
                key={prop.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative rounded-[20px] bg-white border border-[#EFE7DC] shadow-[0_2px_12px_-4px_rgba(30,23,19,0.06)] hover:shadow-[0_24px_50px_-14px_rgba(30,23,19,0.18)] hover:border-[#D6C7B2] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="relative h-52 w-full bg-[#EAE2D7] overflow-hidden">
                    <img
                      src={prop.imageUrl}
                      alt={prop.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/25 pointer-events-none" />

                    <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 max-w-[78%]">
                      <span className="h-6 px-3 rounded-full bg-white/95 backdrop-blur-md text-[#1E1713] font-semibold text-[10px] uppercase tracking-wider flex items-center shadow-xs">
                        {prop.category}
                      </span>
                      <span className="h-6 px-2.5 rounded-full bg-gradient-to-r from-[#1E1713]/85 to-[#2E231D]/85 backdrop-blur-md text-[#FFD2A8] border border-white/15 font-medium text-[10px] flex items-center shadow-xs">
                        {prop.status}
                      </span>
                    </div>

                    <button
                      type="button"
                      aria-label="Toggle shortlist"
                      onClick={() => toggleHeart(prop.id)}
                      className="absolute top-3 right-3 w-8.5 h-8.5 rounded-full bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer text-[#F85B01]"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          prop.isShortlisted ? "fill-[#F85B01] text-[#F85B01]" : "text-[#8C7F75]"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="p-4.5 space-y-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-[16px] font-bold text-[#1E1713] tracking-tight group-hover:text-[#F85B01] transition-colors truncate">
                          {prop.name}
                        </h3>
                        <p className="text-[11.5px] font-medium text-[#7A6D64] flex items-center gap-1 mt-0.5 truncate">
                          <MapPin className="w-3.5 h-3.5 text-[#F85B01] shrink-0" />
                          <span className="truncate">{prop.location}</span>
                        </p>
                      </div>
                      <span className="shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#FAF5EE] text-[#6E4F3A] border border-[#E8DDCD]">
                        {prop.zone}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between pt-0.5">
                      <div>
                        <span className="text-[9.5px] font-medium uppercase tracking-wider text-[#A3968B] block">Price Guide</span>
                        <span className="text-[16px] font-bold text-[#1E1713] tracking-tight">{prop.priceRange}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9.5px] font-medium uppercase tracking-wider text-[#A3968B] block">Rate</span>
                        <span className="text-[12.5px] font-bold text-[#F85B01]">{prop.pricePerSqFt}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 divide-x divide-[#EFE7DC] py-2 px-1.5 rounded-xl bg-[#FAF7F2] border border-[#EFE7DC]">
                      <div className="flex flex-col items-center justify-center text-center px-1">
                        <span className="flex items-center gap-1 text-[9.5px] font-medium uppercase tracking-wider text-[#8C7F75]">
                          <Bed className="w-3 h-3 text-[#F85B01]" />
                          BHK
                        </span>
                        <span className="text-[11.5px] font-semibold text-[#1E1713] mt-0.5 truncate">{prop.bhk}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center text-center px-1">
                        <span className="flex items-center gap-1 text-[9.5px] font-medium uppercase tracking-wider text-[#8C7F75]">
                          <Bath className="w-3 h-3 text-[#F85B01]" />
                          Baths
                        </span>
                        <span className="text-[11.5px] font-semibold text-[#1E1713] mt-0.5 truncate">{prop.baths}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center text-center px-1">
                        <span className="flex items-center gap-1 text-[9.5px] font-medium uppercase tracking-wider text-[#8C7F75]">
                          <Maximize2 className="w-3 h-3 text-[#F85B01]" />
                          Land
                        </span>
                        <span className="text-[11.5px] font-semibold text-[#1E1713] mt-0.5 truncate">{prop.acres}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      {prop.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-white hover:bg-[#FFF4EC] text-[#5A4D45] hover:text-[#F85B01] border border-[#E8E0D4] hover:border-[#F85B01]/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-4.5 pb-4.5 pt-3 border-t border-[#F2ECE4] flex items-center justify-between gap-2 bg-[#FAF8F5]/60">
                  <button
                    type="button"
                    onClick={() => setActiveModalProperty(prop)}
                    className="group/btn h-9.5 px-4 rounded-xl bg-[#1E1713] hover:bg-[#F85B01] text-white text-[12px] font-bold shadow-[0_4px_12px_-3px_rgba(30,23,19,0.3)] hover:shadow-[0_8px_18px_-4px_rgba(248,91,1,0.5)] transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>View Details</span>
                    <span className="relative w-3.5 h-3.5 flex items-center justify-center overflow-hidden">
                      <ChevronRight className="w-3.5 h-3.5 transition-all duration-200 group-hover/btn:opacity-0 group-hover/btn:translate-x-1 absolute" />
                      <ArrowRight className="w-3.5 h-3.5 transition-all duration-200 opacity-0 -translate-x-1 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 absolute" />
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmRemoveProperty(prop)}
                    className="inline-flex items-center gap-1 text-[11.5px] font-bold text-[#8C7F75] hover:text-[#DC2626] hover:bg-[#FEF2F2] px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="relative space-y-5">
            {filteredProperties.map((prop) => (
              <motion.article
                key={prop.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative rounded-[20px] bg-white border border-[#EFE7DC] shadow-[0_2px_12px_-4px_rgba(30,23,19,0.06)] hover:shadow-[0_24px_50px_-14px_rgba(30,23,19,0.18)] hover:border-[#D6C7B2] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col md:flex-row md:min-h-[250px] overflow-hidden"
              >
                <div className="relative w-full md:w-[320px] lg:w-[350px] h-56 md:h-auto shrink-0 bg-[#EAE2D7] overflow-hidden">
                  <img
                    src={prop.imageUrl}
                    alt={prop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/25 pointer-events-none" />

                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 max-w-[80%]">
                    <span className="h-6 px-3 rounded-full bg-white/95 backdrop-blur-md text-[#1E1713] font-semibold text-[10px] uppercase tracking-wider flex items-center shadow-xs">
                      {prop.category}
                    </span>
                    <span className="h-6 px-2.5 rounded-full bg-gradient-to-r from-[#1E1713]/85 to-[#2E231D]/85 backdrop-blur-md text-[#FFD2A8] border border-white/15 font-medium text-[10px] flex items-center shadow-xs">
                      {prop.status}
                    </span>
                  </div>

                  <button
                    type="button"
                    aria-label="Toggle shortlist"
                    onClick={() => toggleHeart(prop.id)}
                    className="absolute top-3 right-3 w-8.5 h-8.5 rounded-full bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer text-[#F85B01]"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        prop.isShortlisted ? "fill-[#F85B01] text-[#F85B01]" : "text-[#8C7F75]"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex-1 p-5 lg:p-6 flex flex-col justify-between min-w-0">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="text-lg lg:text-xl font-bold text-[#1E1713] tracking-tight group-hover:text-[#F85B01] transition-colors truncate">
                          {prop.name}
                        </h3>
                        <p className="text-xs font-semibold text-[#7A6D64] flex items-center gap-1.5 mt-0.5 truncate">
                          <MapPin className="w-3.5 h-3.5 text-[#F85B01] shrink-0" />
                          <span className="truncate">{prop.location}</span>
                        </p>
                      </div>
                      <span className="shrink-0 text-[10.5px] font-semibold px-2.5 py-1 rounded-full bg-[#FAF5EE] text-[#6E4F3A] border border-[#E8DDCD]">
                        {prop.zone}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-4 pt-0.5">
                      <div>
                        <span className="text-[10px] font-medium uppercase tracking-wider text-[#A3968B] block">Price Guide</span>
                        <span className="text-lg lg:text-xl font-bold text-[#1E1713] tracking-tight">{prop.priceRange}</span>
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] font-medium uppercase tracking-wider text-[#A3968B] block">Rate</span>
                        <span className="text-sm font-bold text-[#F85B01]">{prop.pricePerSqFt}</span>
                      </div>
                    </div>

                    <div className="inline-grid grid-cols-3 divide-x divide-[#EFE7DC] py-2 px-3 rounded-xl bg-[#FAF7F2] border border-[#EFE7DC] max-w-md">
                      <div className="flex flex-col items-center justify-center text-center px-2">
                        <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-[#8C7F75]">
                          <Bed className="w-3.5 h-3.5 text-[#F85B01]" />
                          BHK
                        </span>
                        <span className="text-[12.5px] font-semibold text-[#1E1713] mt-0.5 truncate">{prop.bhk}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center text-center px-2">
                        <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-[#8C7F75]">
                          <Bath className="w-3.5 h-3.5 text-[#F85B01]" />
                          Baths
                        </span>
                        <span className="text-[12.5px] font-semibold text-[#1E1713] mt-0.5 truncate">{prop.baths}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center text-center px-2">
                        <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-[#8C7F75]">
                          <Maximize2 className="w-3.5 h-3.5 text-[#F85B01]" />
                          Land
                        </span>
                        <span className="text-[12.5px] font-semibold text-[#1E1713] mt-0.5 truncate">{prop.acres}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      {prop.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium px-3 py-1 rounded-md bg-white hover:bg-[#FFF4EC] text-[#5A4D45] hover:text-[#F85B01] border border-[#E8E0D4] hover:border-[#F85B01]/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-4 mt-2 border-t border-[#F2ECE4]">
                    <button
                      type="button"
                      onClick={() => setActiveModalProperty(prop)}
                      className="group/btn h-10 px-5 rounded-xl bg-[#1E1713] hover:bg-[#F85B01] text-white text-xs font-bold shadow-[0_4px_12px_-3px_rgba(30,23,19,0.3)] hover:shadow-[0_8px_18px_-4px_rgba(248,91,1,0.5)] transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>View Details</span>
                      <span className="relative w-3.5 h-3.5 flex items-center justify-center overflow-hidden">
                        <ChevronRight className="w-3.5 h-3.5 transition-all duration-200 group-hover/btn:opacity-0 group-hover/btn:translate-x-1 absolute" />
                        <ArrowRight className="w-3.5 h-3.5 transition-all duration-200 opacity-0 -translate-x-1 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 absolute" />
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmRemoveProperty(prop)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C7F75] hover:text-[#DC2626] hover:bg-[#FEF2F2] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </main>

      <AnimatePresence>
        {recentlyRemoved && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 rounded-2xl bg-[#1E1713] text-white px-5 py-3.5 shadow-2xl flex items-center gap-4 border border-white/10"
          >
            <span className="text-xs font-bold">
              Removed <strong>{recentlyRemoved.name}</strong> from Shortlist
            </span>
            <button
              type="button"
              onClick={handleUndoRemove}
              className="text-xs font-bold text-[#F85B01] hover:underline cursor-pointer"
            >
              Undo
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmRemoveProperty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmRemoveProperty(null)}
              className="absolute inset-0 bg-[#1E1713]/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[420px] rounded-[4px] bg-white shadow-[0_25px_60px_-15px_rgba(30,23,19,0.4)] border border-[#EEE6DB] p-6 sm:p-7 space-y-5 z-10 overflow-hidden"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-[#1E1713] tracking-tight">
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

              <p className="text-xs text-[#7A6D64] font-medium leading-relaxed -mt-2">
                Are you sure you want to remove this property from your saved list? You can revisit and shortlist it again anytime.
              </p>

              <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EFE8DE] flex items-center gap-3">
                <img
                  src={confirmRemoveProperty.imageUrl}
                  alt={confirmRemoveProperty.name}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-[#1E1713] truncate">
                    {confirmRemoveProperty.name}
                  </h4>
                  <p className="text-xs text-[#7A6D64] font-medium flex items-center gap-1 truncate mt-0.5">
                    <MapPin className="w-3 h-3 text-[#F85B01] shrink-0" />
                    <span>{confirmRemoveProperty.location}</span>
                  </p>
                  <p className="text-xs font-bold text-[#F85B01] mt-1">
                    {confirmRemoveProperty.pricePerSqFt}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setConfirmRemoveProperty(null)}
                  className="h-10 px-4 rounded-xl border border-[#E2D9CD] bg-white hover:bg-[#FAF8F5] text-xs font-semibold text-[#4A3E39] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleRemove(confirmRemoveProperty);
                    setConfirmRemoveProperty(null);
                  }}
                  className="h-10 px-5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold shadow-[0_4px_14px_-2px_rgba(220,38,38,0.4)] flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Yes, Remove</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeModalProperty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProperty(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              className="relative w-full max-w-2xl rounded-[4px] bg-white shadow-2xl border border-[#EEE6DB] overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              <div className="relative h-60 w-full bg-[#EAE2D7]">
                <img
                  src={activeModalProperty.imageUrl}
                  alt={activeModalProperty.name}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  aria-label="Back"
                  onClick={() => setActiveModalProperty(null)}
                  className="absolute top-4 left-4 w-9 h-9 rounded-[4px] bg-black/60 text-white flex items-center justify-center hover:bg-[#F85B01] cursor-pointer transition-colors shadow-md"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="h-6.5 px-3 rounded-full bg-white text-[#1E1713] font-semibold text-xs shadow-md">
                    {activeModalProperty.category}
                  </span>
                  <span className="h-6.5 px-3 rounded-full bg-gradient-to-r from-[#F85B01] to-[#FF7A00] text-white font-medium text-xs shadow-md">
                    {activeModalProperty.status}
                  </span>
                </div>
              </div>

              <div className="p-6 overflow-y-auto space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1E1713]">
                      {activeModalProperty.name}
                    </h2>
                    <p className="text-xs font-semibold text-[#7A6D64] flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#F85B01]" />
                      <span>{activeModalProperty.location}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[#F85B01]">
                      {activeModalProperty.pricePerSqFt}
                    </p>
                    <p className="text-xs font-semibold text-[#8C7F75]">
                      {activeModalProperty.priceRange}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FAF6F1] border border-[#EEE6DB] text-center">
                  <div>
                    <span className="text-[11px] font-semibold text-[#8C7F75] block">Bedrooms</span>
                    <span className="text-sm font-semibold text-[#1E1713] mt-0.5 block">
                      {activeModalProperty.bhk}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-[#8C7F75] block">Bathrooms</span>
                    <span className="text-sm font-semibold text-[#1E1713] mt-0.5 block">
                      {activeModalProperty.baths}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-[#8C7F75] block">Project Area</span>
                    <span className="text-sm font-semibold text-[#1E1713] mt-0.5 block">
                      {activeModalProperty.acres}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-[#8C7F75] uppercase tracking-wider mb-2">
                    About Project
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#4A3E39] leading-relaxed font-medium">
                    {activeModalProperty.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-[#8C7F75] uppercase tracking-wider mb-2">
                    Highlights & Amenities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProperty.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-3 py-1 rounded-lg bg-[#FAF6F1] text-[#5C4D44] border border-[#E8E1D5]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EEE6DB] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveModalProperty(null)}
                    className="h-11 px-5 rounded-xl border border-[#E5DFD4] font-semibold text-xs text-[#4A3E39] hover:bg-[#FAF6F1] cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="h-11 px-6 rounded-xl bg-gradient-to-r from-[#F85B01] via-[#FF6A10] to-[#FF8A2A] text-white text-xs font-bold shadow-[0_8px_20px_-6px_rgba(248,91,1,0.6)] flex items-center gap-2 hover:shadow-[0_12px_26px_-8px_rgba(248,91,1,0.7)] cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Contact Builder</span>
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
