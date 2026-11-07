import { useState } from "react";
import { motion } from "framer-motion";
import DashboardShell from "../Shell";
import { preferredInterestsData, Info, ChevronDown, CheckCircle2 } from "./data";

export default function PreferredInterestsDesktop() {
  const [selectedConfigs, setSelectedConfigs] = useState<string[]>([]);
  const [preferredArea, setPreferredArea] = useState<string>("");
  const [moveInStatus, setMoveInStatus] = useState<string>("Any status");
  const [saved, setSaved] = useState<boolean>(false);

  const toggleConfig = (cfg: string) => {
    setSelectedConfigs((prev) =>
      prev.includes(cfg) ? prev.filter((item) => item !== cfg) : [...prev, cfg],
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardShell activeTab="preferred-interests" isMobile={false}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-5"
      >
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E1713] tracking-tight">
            {preferredInterestsData.title}
          </h1>
          <p className="text-sm text-[#6B5E57] font-medium mt-1">
            {preferredInterestsData.subtitle}
          </p>
        </div>

        <div className="w-full rounded-[6px] bg-[#E8F4FD] border border-[#CAE4FA] px-4 py-3 flex items-center gap-3 text-xs sm:text-[13px] text-[#0C517A]">
          <Info className="w-4 h-4 text-[#0284C7] shrink-0" />
          <p className="leading-relaxed">
            <span className="font-bold">{preferredInterestsData.previewNotice.prefix}</span>{" "}
            <span>{preferredInterestsData.previewNotice.body}</span>{" "}
            <span className="font-bold">{preferredInterestsData.previewNotice.suffix}</span>
          </p>
        </div>

        <form
          onSubmit={handleSave}
          className="w-full rounded-[8px] bg-white border border-[#E5DFD4] p-6 sm:p-7 space-y-6 shadow-[0_2px_10px_rgba(50,40,34,0.04)]"
        >
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-[#1E1713]">
              {preferredInterestsData.configTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B5E57] font-medium mt-1">
              {preferredInterestsData.configSubtitle}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-3.5">
              {preferredInterestsData.configOptions.map((cfg) => {
                const active = selectedConfigs.includes(cfg);
                return (
                  <button
                    key={cfg}
                    type="button"
                    onClick={() => toggleConfig(cfg)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      active
                        ? "bg-[#322822] border-[#322822] text-white"
                        : "bg-white border-[#D8D0C5] text-[#322822] hover:border-[#F85B01]"
                    }`}
                  >
                    {cfg}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="max-w-[340px]">
            <input
              type="text"
              value={preferredArea}
              onChange={(e) => setPreferredArea(e.target.value)}
              placeholder={preferredInterestsData.areaPlaceholder}
              className="w-full h-12 rounded-[6px] border border-[#D8D0C5] focus:border-[#F85B01] px-4 text-sm text-[#1E1713] placeholder-[#6B5E57] outline-none transition-colors"
            />
            <p className="text-xs text-[#6B5E57] mt-1.5 px-1">
              {preferredInterestsData.areaHelper}
            </p>
          </div>

          <div className="relative max-w-[340px]">
            <span className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-[#6B5E57] z-10">
              {preferredInterestsData.moveInLabel}
            </span>
            <div className="relative">
              <select
                value={moveInStatus}
                onChange={(e) => setMoveInStatus(e.target.value)}
                className="w-full h-12 appearance-none rounded-[6px] border border-[#D8D0C5] focus:border-[#F85B01] bg-white pl-4 pr-10 text-sm text-[#1E1713] outline-none transition-colors cursor-pointer"
              >
                {preferredInterestsData.moveInOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#6B5E57] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="sheen relative overflow-hidden px-5 py-2.5 rounded-[6px] bg-gradient-to-r from-[#F85B01] to-[#FF7A00] hover:from-[#E24E00] hover:to-[#F85B01] text-white text-xs sm:text-[13px] font-bold shadow-[0_4px_14px_rgba(248,91,1,0.28)] cursor-pointer"
            >
              {preferredInterestsData.saveButtonLabel}
            </motion.button>

            {saved && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#168854]">
                <CheckCircle2 className="w-4 h-4" />
                {preferredInterestsData.savedNotice}
              </span>
            )}
          </div>
        </form>
      </motion.div>
    </DashboardShell>
  );
}
