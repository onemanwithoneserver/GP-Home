import { Monitor, Smartphone, X } from "lucide-react";
import { motion } from "framer-motion";
import Dropdown, { type DropdownOption } from "./elements/Dropdown";

export type ViewMode = "desktop" | "mobile";

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  view: string;
  onViewChange: (view: string) => void;
  onClose?: () => void;
}

export default function Header({
  viewMode,
  onViewModeChange,
  view,
  onViewChange,
  onClose,
}: HeaderProps) {
  const dropdownOptions: DropdownOption[] = [
    { value: "Home", label: "Home" },
    { value: "Home Login", label: "Home Login" },
    { value: "Dashboard", label: "Dashboard" },
    { value: "Shortlist", label: "Shortlist" },
    { value: "Login", label: "Login" },
    { value: "Create Account", label: "Create Account" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="h-[58px] bg-white/80 backdrop-blur-2xl backdrop-saturate-150 border-b border-[#EEE6DB] px-4 sm:px-6 md:px-8 flex items-center justify-between shrink-0 shadow-[0_4px_24px_-10px_rgba(50,40,34,0.12)] relative z-[100] gap-3 sm:gap-6 pointer-events-auto select-none"
    >
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#F85B01]/35 to-transparent" />

      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F85B01] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F85B01]" />
          </span>
          <span className="text-[#1E1713] font-bold text-base sm:text-lg tracking-tight flex items-center gap-1.5">
            Gully Properties
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex p-1 rounded-full bg-[#F6F1EA] border border-[#EDE5DA] shadow-inner relative">
          {(["desktop", "mobile"] as ViewMode[]).map((mode) => {
            const active = viewMode === mode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => onViewModeChange(mode)}
                title={mode === "desktop" ? "Desktop View" : "Mobile View"}
                className={`relative z-10 flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                  active ? "text-white" : "text-[#6B5E57] hover:text-[#1E1713]"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="headerViewportPill"
                    className="absolute inset-0 rounded-full bg-[#1E1713] shadow-[0_6px_16px_-6px_rgba(30,23,19,0.7)]"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {mode === "desktop" ? (
                    <Monitor className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <Smartphone className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span className="hidden sm:inline capitalize">{mode}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold tracking-widest text-[#8C7F75] uppercase hidden md:block">
            View
          </span>
          <div className="w-[140px] sm:w-[160px] md:w-[175px]">
            <Dropdown
              options={dropdownOptions}
              value={view}
              onChange={onViewChange}
              size="sm"
            />
          </div>
        </div>

        {onClose && (
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            type="button"
            onClick={onClose}
            title="Hide bar (Press Ctrl+M to reopen)"
            aria-label="Hide bar"
            className="w-8 h-8 rounded-full border border-[#EDE5DA] bg-white text-[#6B5E57] hover:text-[#1E1713] hover:border-[#F85B01]/40 hover:bg-[#FFF8F3] flex items-center justify-center shadow-xs cursor-pointer shrink-0 transition-colors"
          >
            <X className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </motion.header>
  );
}
