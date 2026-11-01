/**
 * Modern custom dropdown component: features light-themed glassmorphism styling,
 * animated chevron rotation, click-outside dismissal, Escape key detection, and accessible listbox options.
 */
import { useState, useRef, useEffect, type ReactNode } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface DropdownOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

export interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  placeholder?: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  size = "md",
  className = "",
  placeholder = "Select...",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  const sizeClasses =
    size === "sm"
      ? "text-xs py-1.5 px-3 min-h-[32px]"
      : size === "lg"
      ? "text-base py-2.5 px-4 min-h-[44px]"
      : "text-sm py-2 px-3.5 min-h-[38px]";

  const iconSize = size === "sm" ? 14 : size === "lg" ? 18 : 16;

  return (
    <div ref={containerRef} className={`relative inline-block w-full ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold shadow-xs hover:border-blue-400 hover:bg-slate-50/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 cursor-pointer backdrop-blur-md select-none ${sizeClasses}`}
      >
        <span className="truncate flex items-center gap-2">
          {selectedOption?.icon && (
            <span className="shrink-0 text-slate-500">{selectedOption.icon}</span>
          )}
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
        </span>

        <ChevronDown
          size={iconSize}
          className={`shrink-0 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-blue-600" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute z-[120] mt-1.5 w-full min-w-[140px] rounded-xl border border-slate-200 bg-white/95 backdrop-blur-xl shadow-xl shadow-slate-900/10 p-1 space-y-0.5 animate-in fade-in-0 zoom-in-95 duration-150 origin-top"
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer select-none text-left ${
                  isSelected
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                }`}
              >
                <span className="truncate flex items-center gap-2">
                  {opt.icon && (
                    <span className="shrink-0 text-slate-400">{opt.icon}</span>
                  )}
                  <span>{opt.label}</span>
                </span>
                {isSelected && (
                  <Check
                    size={13}
                    className="shrink-0 text-blue-600 stroke-[2.5]"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
