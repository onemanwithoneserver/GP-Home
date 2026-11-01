/**
 * Header component: provides warm light-themed top navigation for Gully Properties
 * matching Figma-GP design tokens, desktop/mobile view toggling, view selection dropdown,
 * and header close control (Ctrl+M to reopen).
 */
import { Monitor, Smartphone, X } from "lucide-react";
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
  const isMobile = viewMode === "mobile";
  const dropdownOptions: DropdownOption[] = [
    { value: "Home", label: "Home" },
    { value: "Login", label: "Login" },
    { value: "Create Account", label: "Create Account" },
  ];

  return (
    <header className="h-[60px] glass-surface border-b border-[#E5DFD4] px-3 sm:px-4 md:px-6 flex items-center justify-between shrink-0 shadow-xs relative z-[100] gap-2 sm:gap-4 pointer-events-auto backdrop-blur-xl">
      <div className="flex items-center gap-3 md:gap-6 shrink-0">
        <div className="text-[#322822] font-black text-lg md:text-xl tracking-wide flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F85B01] animate-pulse" />
          <span>Gully Properties</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <div className="flex p-0.5 md:p-1 rounded-xl glass-pill border border-[#E5DFD4] shadow-xs">
          <button
            onClick={() => onViewModeChange("desktop")}
            title="Desktop View"
            className={`flex items-center gap-1.5 px-2.5 sm:px-4 md:px-5 py-1 md:py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              !isMobile
                ? "bg-gradient-to-r from-[#F85B01] to-[#C94A00] text-white shadow-sm shadow-[#F85B01]/30"
                : "text-[#6B5E57] hover:text-[#322822] hover:bg-[#FAF7F2]"
            }`}
          >
            <Monitor className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => onViewModeChange("mobile")}
            title="Mobile View"
            className={`flex items-center gap-1.5 px-2.5 sm:px-4 md:px-5 py-1 md:py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              isMobile
                ? "bg-gradient-to-r from-[#F85B01] to-[#C94A00] text-white shadow-sm shadow-[#F85B01]/30"
                : "text-[#6B5E57] hover:text-[#322822] hover:bg-[#FAF7F2]"
            }`}
          >
            <Smartphone className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
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
          <button
            onClick={onClose}
            title="Close header (Press Ctrl+M to reopen)"
            aria-label="Close header"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-[#E5DFD4] text-[#6B5E57] hover:text-[#322822] hover:bg-[#FAF7F2] flex items-center justify-center shadow-xs cursor-pointer shrink-0 transition-all duration-200"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>
    </header>
  );
}
