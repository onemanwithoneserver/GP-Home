/**
 * Header component: provides light-themed top navigation, desktop/mobile view toggling,
 * and view selection dropdown.
 */
import { Monitor, Smartphone } from "lucide-react";
import Dropdown, { type DropdownOption } from "./elements/Dropdown";

export type ViewMode = "desktop" | "mobile";

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  view: string;
  onViewChange: (view: string) => void;
}

export default function Header({
  viewMode,
  onViewModeChange,
  view,
  onViewChange,
}: HeaderProps) {
  const isMobile = viewMode === "mobile";
  const dropdownOptions: DropdownOption[] = [
    { value: "Home", label: "Home" },
  ];

  return (
    <header className="h-[60px] glass-surface border-b border-slate-200/90 px-3 sm:px-4 md:px-6 flex items-center justify-between shrink-0 shadow-xs relative z-[100] gap-2 sm:gap-4 pointer-events-auto backdrop-blur-xl">
      <div className="flex items-center gap-3 md:gap-6 shrink-0">
        <div className="text-slate-900 font-black text-lg md:text-xl tracking-wide flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <span>Admin YardStack</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <div className="flex p-0.5 md:p-1 rounded-xl glass-pill border border-slate-200/80 shadow-xs">
          <button
            onClick={() => onViewModeChange("desktop")}
            title="Desktop View"
            className={`flex items-center gap-1.5 px-2.5 sm:px-4 md:px-5 py-1 md:py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              !isMobile
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/25"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
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
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/25"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Smartphone className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase hidden md:block">
            View
          </span>
          <div className="w-[120px] sm:w-[145px] md:w-[160px]">
            <Dropdown
              options={dropdownOptions}
              value={view}
              onChange={onViewChange}
              size="sm"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
