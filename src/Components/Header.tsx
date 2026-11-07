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
    { value: "Login", label: "Login" },
    { value: "Create Account", label: "Create Account" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="h-[60px] glass-surface border-b border-[#E5DFD4] px-3 sm:px-4 md:px-6 flex items-center justify-between shrink-0 shadow-xs relative z-[100] gap-2 sm:gap-4 pointer-events-auto backdrop-blur-xl"
    >
      <div className="flex items-center gap-3 md:gap-6 shrink-0">
        <div className="text-[#322822] font-black text-lg md:text-xl tracking-wide flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F85B01] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F85B01]" />
          </span>
          <span>Gully Properties</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <div className="flex p-1 rounded-[4px] glass-pill border border-[#E5DFD4] shadow-2xs relative">
          {(["desktop", "mobile"] as ViewMode[]).map((mode) => {
            const active = viewMode === mode;
            return (
              <button
                key={mode}
                onClick={() => onViewModeChange(mode)}
                title={mode === "desktop" ? "Desktop View" : "Mobile View"}
                className={`relative z-10 flex items-center gap-1.5 px-2.5 sm:px-4 md:px-5 py-1 md:py-1.5 rounded-[2px] text-xs md:text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                  active
                    ? "text-white"
                    : "text-[#6B5E57] hover:text-[#322822]"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="headerViewportPill"
                    className="absolute inset-0 rounded-[2px] bg-gradient-to-r from-[#F85B01] to-[#C94A00] shadow-xs shadow-[#F85B01]/30"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {mode === "desktop" ? (
                    <Monitor className="w-4 h-4 shrink-0" />
                  ) : (
                    <Smartphone className="w-4 h-4 shrink-0" />
                  )}
                  <span className="hidden sm:inline capitalize">{mode}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold tracking-widest text-[#8C827A] uppercase hidden md:block">
            View
          </span>
          <div className="w-[135px] sm:w-[155px] md:w-[170px]">
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            title="Close header (Press Ctrl+M to reopen)"
            aria-label="Close header"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-[4px] border border-[#E5DFD4] bg-white text-[#6B5E57] hover:text-[#322822] hover:border-[#F85B01]/40 hover:bg-[#FAF7F2] flex items-center justify-center shadow-2xs cursor-pointer shrink-0 transition-colors duration-200"
          >
            <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </motion.button>
        )}
      </div>
    </motion.header>
  );
}
