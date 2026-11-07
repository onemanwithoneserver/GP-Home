import { useState, useRef, useEffect, type ReactNode } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      ? "text-xs py-1.5 px-3 min-h-[34px] rounded-xl"
      : size === "lg"
      ? "text-base py-2.5 px-4 min-h-[46px] rounded-2xl"
      : "text-sm py-2 px-3.5 min-h-[40px] rounded-xl";

  const iconSize = size === "sm" ? 14 : size === "lg" ? 18 : 16;

  return (
    <div ref={containerRef} className={`relative inline-block w-full select-none ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between gap-2 border bg-white/90 backdrop-blur-md text-[#1E1713] font-bold transition-all duration-200 cursor-pointer ${
          isOpen
            ? "border-[#F85B01] shadow-[0_0_0_3px_rgba(248,91,1,0.15)] bg-white"
            : "border-[#E5DFD4] hover:border-[#F85B01]/50 hover:bg-[#FAF8F5] shadow-xs"
        } ${sizeClasses}`}
      >
        <span className="truncate flex items-center gap-2">
          {selectedOption?.icon && (
            <span className="shrink-0 text-[#8C827A]">{selectedOption.icon}</span>
          )}
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0 flex items-center justify-center text-[#8C827A]"
        >
          <ChevronDown size={iconSize} className={isOpen ? "text-[#F85B01]" : ""} />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top center" }}
            className="absolute z-[120] mt-1.5 w-full min-w-[160px] rounded-2xl border border-[#EEE6DB] bg-white/98 backdrop-blur-2xl shadow-[0_20px_45px_-12px_rgba(30,23,19,0.22),0_2px_6px_rgba(30,23,19,0.04)] p-1.5 space-y-0.5"
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <motion.button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-colors cursor-pointer select-none text-left ${
                    isSelected
                      ? "bg-[#FFF1E6] text-[#E24E00]"
                      : "text-[#322822] hover:bg-[#FAF6F1] hover:text-[#1E1713]"
                  }`}
                >
                  <span className="truncate flex items-center gap-2">
                    {opt.icon && (
                      <span className="shrink-0 text-[#8C827A]">{opt.icon}</span>
                    )}
                    <span>{opt.label}</span>
                  </span>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-[#F85B01] text-white flex items-center justify-center shrink-0 shadow-[0_2px_6px_rgba(248,91,1,0.4)]">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
