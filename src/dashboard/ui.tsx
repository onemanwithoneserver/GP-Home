import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentType,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { motion, AnimatePresence, useMotionValue, type HTMLMotionProps, type Variants } from "framer-motion";
import { Info, TriangleAlert, ChevronDown, Check, CheckCircle2, User, Plus, Minus, Maximize2 } from "lucide-react";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.03 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
};

export function Page({ children, isMobile }: { children: ReactNode; isMobile?: boolean }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className={isMobile ? "space-y-4" : "space-y-6"}
    >
      {children}
    </motion.div>
  );
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
  isMobile,
}: {
  title: string;
  subtitle: string;
  actions?: ReactNode;
  isMobile?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={`flex ${isMobile ? "items-start justify-between gap-3" : "items-end justify-between gap-6"}`}
    >
      <div className="min-w-0">
        <h1
          className={`${
            isMobile ? "text-[22px]" : "text-[32px]"
          } font-black tracking-[-0.025em] text-[#1E1713] leading-[1.08]`}
        >
          {title}
        </h1>
        <p
          className={`${
            isMobile ? "text-[12px] mt-1" : "text-[14.5px] mt-2"
          } text-[#7A6D64] font-medium leading-relaxed`}
        >
          {subtitle}
        </p>
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </motion.div>
  );
}

export function Notice({
  tone = "info",
  children,
  isMobile,
}: {
  tone?: "info" | "warning";
  children: ReactNode;
  isMobile?: boolean;
}) {
  const s =
    tone === "info"
      ? {
          wrap: "from-[#EEF6FD] to-[#F7FBFE] border-[#D4E7F8] text-[#124A6E]",
          icon: "bg-[#0284C7]/10 text-[#0284C7]",
          bar: "bg-[#0284C7]",
          Icon: Info,
        }
      : {
          wrap: "from-[#FFF5EA] to-[#FFFBF6] border-[#F8DDBC] text-[#7A3E00]",
          icon: "bg-[#ED6C02]/12 text-[#ED6C02]",
          bar: "bg-[#ED6C02]",
          Icon: TriangleAlert,
        };
  return (
    <motion.div
      variants={fadeUp}
      className={`relative overflow-hidden rounded-xl border bg-gradient-to-r ${s.wrap} ${
        isMobile ? "pl-3.5 pr-3 py-2.5 text-[11.5px] gap-2.5" : "pl-5 pr-4 py-3 text-[13px] gap-3"
      } flex items-start`}
    >
      <span className={`absolute left-0 top-0 bottom-0 w-[3px] ${s.bar}`} />
      <span
        className={`shrink-0 rounded-lg flex items-center justify-center ${s.icon} ${
          isMobile ? "w-6 h-6" : "w-7 h-7"
        }`}
      >
        <s.Icon className="w-3.5 h-3.5" />
      </span>
      <div className={`leading-relaxed ${isMobile ? "pt-0.5" : "pt-1"}`}>{children}</div>
    </motion.div>
  );
}

type CardProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children?: ReactNode;
  interactive?: boolean;
};

export function Card({ children, className = "", interactive = false, ...rest }: CardProps) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={interactive ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`relative rounded-2xl bg-white border border-[#EEE6DB] shadow-[0_1px_2px_rgba(50,40,34,0.04),0_14px_34px_-20px_rgba(50,40,34,0.22)] ${
        interactive
          ? "transition-[box-shadow,border-color] duration-300 hover:border-[#F85B01]/25 hover:shadow-[0_2px_4px_rgba(50,40,34,0.05),0_26px_50px_-22px_rgba(50,40,34,0.35)]"
          : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type BtnProps = Omit<HTMLMotionProps<"button">, "children"> & {
  children?: ReactNode;
  size?: "sm" | "md";
  icon?: ReactNode;
  iconRight?: ReactNode;
};

export function PrimaryButton({
  children,
  className = "",
  size = "md",
  icon,
  iconRight,
  type = "button",
  ...rest
}: BtnProps) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      type={type}
      className={`sheen relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F85B01] via-[#FF6A10] to-[#FF8A2A] text-white font-extrabold shadow-[0_10px_22px_-8px_rgba(248,91,1,0.6),inset_0_1px_0_rgba(255,255,255,0.28)] hover:shadow-[0_14px_30px_-10px_rgba(248,91,1,0.7),inset_0_1px_0_rgba(255,255,255,0.32)] transition-shadow cursor-pointer ${
        size === "sm" ? "h-9 px-3.5 text-[12px]" : "h-11 px-5 text-[13px]"
      } ${className}`}
      {...rest}
    >
      {icon}
      <span className="relative">{children}</span>
      {iconRight}
    </motion.button>
  );
}

export function SecondaryButton({
  children,
  className = "",
  size = "md",
  icon,
  iconRight,
  type = "button",
  ...rest
}: BtnProps) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      type={type}
      className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-[#E2D9CD] text-[#322822] font-bold hover:border-[#F85B01]/50 hover:text-[#F85B01] hover:shadow-[0_8px_20px_-12px_rgba(248,91,1,0.5)] transition-all cursor-pointer ${
        size === "sm" ? "h-9 px-3.5 text-[12px]" : "h-11 px-5 text-[13px]"
      } ${className}`}
      {...rest}
    >
      {icon}
      <span>{children}</span>
      {iconRight}
    </motion.button>
  );
}

export function DangerButton({ children, className = "", icon, type = "button", ...rest }: BtnProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      type={type}
      className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-[12.5px] font-bold text-[#DC2626] hover:bg-[#FEF2F2] transition-colors cursor-pointer ${className}`}
      {...rest}
    >
      {icon}
      <span>{children}</span>
    </motion.button>
  );
}

type FieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label: string;
  helper?: string;
  rightSlot?: ReactNode;
  isMobile?: boolean;
  wrapperClassName?: string;
};

export function TextField({
  label,
  helper,
  rightSlot,
  isMobile,
  wrapperClassName = "",
  id,
  ...rest
}: FieldProps) {
  const autoId = useId();
  const fid = id ?? autoId;
  return (
    <div className={wrapperClassName}>
      <div className="relative">
        <input
          id={fid}
          placeholder=" "
          {...rest}
          className={`peer w-full rounded-xl border border-[#E2D9CD] bg-[#FDFBF8] hover:border-[#CFC3B4] focus:border-[#F85B01] focus:bg-white focus:shadow-[0_0_0_4px_rgba(248,91,1,0.12)] outline-none transition-all text-[#1E1713] font-semibold ${
            isMobile ? "h-[50px] text-[13px] px-3.5 pt-4" : "h-[56px] text-sm px-4 pt-4"
          } ${rightSlot ? "pr-12" : ""}`}
        />
        <label
          htmlFor={fid}
          className={`pointer-events-none absolute -translate-y-1/2 transition-all duration-200 font-semibold ${
            isMobile ? "left-3.5" : "left-4"
          } top-[15px] text-[10.5px] text-[#8C7F75] peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-[13.5px] peer-focus:top-[15px] peer-focus:text-[10.5px] peer-focus:text-[#F85B01]`}
        >
          {label}
        </label>
        {rightSlot && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">{rightSlot}</div>
        )}
      </div>
      {helper && (
        <p className={`text-[#8C7F75] font-medium mt-1.5 px-1 ${isMobile ? "text-[11px]" : "text-xs"}`}>
          {helper}
        </p>
      )}
    </div>
  );
}

export interface SelectFieldProps {
  label: string;
  options: string[];
  value?: string | number | readonly string[];
  onChange?: (e: { target: { value: string } }) => void;
  isMobile?: boolean;
  disabled?: boolean;
  className?: string;
  helper?: string;
  id?: string;
}

export function SelectField({
  label,
  options,
  value,
  onChange,
  isMobile,
  disabled = false,
  className = "",
  helper,
}: SelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedValue = (typeof value === "string" ? value : undefined) ?? options[0] ?? "";

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

  const handleSelect = (val: string) => {
    onChange?.({ target: { value: val } });
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative select-none ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`relative w-full rounded-xl border bg-[#FDFBF8] text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
          isMobile ? "h-[50px] px-3.5" : "h-[56px] px-4"
        } ${
          isOpen
            ? "border-[#F85B01] bg-white shadow-[0_0_0_4px_rgba(248,91,1,0.12)]"
            : "border-[#E2D9CD] hover:border-[#CFC3B4]"
        } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        <div className="flex flex-col justify-center min-w-0 pr-3">
          <span className="text-[10px] sm:text-[10.5px] font-semibold text-[#8C7F75] leading-tight">
            {label}
          </span>
          <span
            className={`font-bold text-[#1E1713] truncate ${
              isMobile ? "text-[12.5px] mt-0.5" : "text-sm mt-0.5"
            }`}
          >
            {selectedValue || "Select option"}
          </span>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0 flex items-center justify-center text-[#8C7F75]"
        >
          <ChevronDown className={`w-4 h-4 ${isOpen ? "text-[#F85B01]" : ""}`} />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top center" }}
            className="absolute left-0 right-0 z-50 mt-1.5 rounded-2xl border border-[#EEE6DB] bg-white/98 backdrop-blur-2xl shadow-[0_22px_45px_-12px_rgba(30,23,19,0.22),0_2px_8px_rgba(30,23,19,0.04)] p-1.5 space-y-0.5 max-h-60 overflow-y-auto scrollbar-hide"
          >
            {options.map((opt) => {
              const isSelected = opt === selectedValue;
              return (
                <button
                  key={opt}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt)}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl font-bold transition-colors cursor-pointer select-none text-left ${
                    isMobile ? "text-xs" : "text-[13px]"
                  } ${
                    isSelected
                      ? "bg-[#FFF1E6] text-[#E24E00]"
                      : "text-[#322822] hover:bg-[#FAF6F1] hover:text-[#1E1713]"
                  }`}
                >
                  <span className="truncate">{opt}</span>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-[#F85B01] text-white flex items-center justify-center shrink-0 shadow-[0_2px_6px_rgba(248,91,1,0.4)]">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {helper && (
        <p className={`text-[#8C7F75] font-medium mt-1.5 px-1 ${isMobile ? "text-[11px]" : "text-xs"}`}>
          {helper}
        </p>
      )}
    </div>
  );
}

export function Chip({
  active,
  onClick,
  children,
  isMobile,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  isMobile?: boolean;
}) {
  return (
    <motion.button
      layout
      type="button"
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border font-bold transition-colors cursor-pointer ${
        isMobile ? "h-8 px-3 text-[11.5px]" : "h-9 px-4 text-[12.5px]"
      } ${
        active
          ? "bg-[#FFF1E6] border-[#F85B01] text-[#E24E00] shadow-[0_6px_16px_-8px_rgba(248,91,1,0.55)]"
          : "bg-white border-[#E2D9CD] text-[#4A3E39] hover:border-[#F85B01]/50 hover:text-[#F85B01]"
      }`}
    >
      <AnimatePresence initial={false}>
        {active && (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="overflow-hidden flex"
          >
            <Check className="w-3.5 h-3.5" strokeWidth={3} />
          </motion.span>
        )}
      </AnimatePresence>
      {children}
    </motion.button>
  );
}

export function CountUp({ value, duration = 900 }: { value: number; duration?: number }) {
  const [n, setN] = useState<number>(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <>{n}</>;
}

export function IconTile({
  icon: Icon,
  tone = "brand",
  size = "md",
}: {
  icon: ComponentType<{ className?: string }>;
  tone?: "brand" | "dark" | "soft";
  size?: "sm" | "md" | "lg";
}) {
  const dims = size === "lg" ? "w-12 h-12 rounded-2xl" : size === "sm" ? "w-9 h-9 rounded-xl" : "w-11 h-11 rounded-xl";
  const icon = size === "lg" ? "w-5.5 h-5.5" : size === "sm" ? "w-4 h-4" : "w-5 h-5";
  const tones = {
    brand: "bg-gradient-to-br from-[#FFF1E6] to-[#FFE0C8] text-[#F85B01] ring-1 ring-[#F85B01]/10",
    dark: "bg-gradient-to-br from-[#2E231D] to-[#1E1713] text-white shadow-[0_8px_18px_-8px_rgba(30,23,19,0.6)]",
    soft: "bg-[#F6F1EA] text-[#6B5E57]",
  };
  return (
    <span className={`${dims} ${tones[tone]} flex items-center justify-center shrink-0`}>
      <Icon className={icon} />
    </span>
  );
}

export function AvatarBadge({
  photoUrl,
  size = 64,
  dark = true,
}: {
  photoUrl?: string | null;
  size?: number;
  dark?: boolean;
}) {
  return (
    <span
      style={{ width: size, height: size }}
      className="relative rounded-full p-[3px] bg-[conic-gradient(from_200deg,#F85B01,#FFB074,#FFE3CC,#F85B01)] shrink-0 block"
    >
      <span
        className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center ring-[3px] ${
          dark ? "bg-[#1E1713] ring-[#1E1713]/0 text-white" : "bg-[#1E1713] ring-white text-white"
        }`}
      >
        {photoUrl ? (
          <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <User style={{ width: size * 0.4, height: size * 0.4 }} className="stroke-[1.8]" />
        )}
      </span>
    </span>
  );
}

export function SavedToast({ show, label }: { show: boolean; label: string }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          initial={{ opacity: 0, x: -8, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -8, scale: 0.9 }}
          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-[#ECFDF3] border border-[#BBF7D0] text-[12px] font-bold text-[#15803D]"
        >
          <CheckCircle2 className="w-4 h-4" />
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  subtitle,
  action,
  isMobile,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  action?: ReactNode;
  isMobile?: boolean;
}) {
  return (
    <Card className={`overflow-hidden ${isMobile ? "py-10 px-5" : "py-16 px-8"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(rgba(50,40,34,0.06)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="relative flex flex-col items-center text-center">
        <div className="relative flex items-center justify-center mb-5">
          <motion.span
            className="absolute w-14 h-14 rounded-full bg-[#F85B01]/15"
            animate={{ scale: [1, 2], opacity: [0.6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            className="absolute w-14 h-14 rounded-full bg-[#F85B01]/15"
            animate={{ scale: [1, 2], opacity: [0.6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
          />
          <motion.span
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF8A2A] to-[#E24E00] text-white flex items-center justify-center shadow-[0_14px_30px_-10px_rgba(248,91,1,0.7)]"
          >
            <Icon className="w-6 h-6" />
          </motion.span>
        </div>
        <h2 className={`${isMobile ? "text-[15px]" : "text-lg"} font-black text-[#1E1713] tracking-tight`}>
          {title}
        </h2>
        <p
          className={`${
            isMobile ? "text-[12px] max-w-[280px]" : "text-sm max-w-[420px]"
          } text-[#7A6D64] font-medium mt-1.5`}
        >
          {subtitle}
        </p>
        {action && <div className={isMobile ? "mt-5" : "mt-6"}>{action}</div>}
      </div>
    </Card>
  );
}

export function Skyline({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 120" fill="currentColor" className={className} aria-hidden="true">
      <path d="M0 120V80h20V60h18v20h12V40h22v80h10V70h16V30l14-10 14 10v90h12V55h20v65h8V85h18V50h12V35h16v85h10V65h22v55h14V45l12-8 12 8v75h10V75h18v45h14V58h16v62h12V90h20v30z" />
    </svg>
  );
}

export function MapPicker({
  pinPos,
  onChange,
  isMobile,
}: {
  pinPos: { x: number; y: number };
  onChange: (pos: { x: number; y: number }) => void;
  isMobile?: boolean;
}) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const [zoom, setZoom] = useState<number>(1);

  const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

  return (
    <div
      ref={mapRef}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        onChange({
          x: clamp(((e.clientX - rect.left) / rect.width) * 100, 8, 92),
          y: clamp(((e.clientY - rect.top) / rect.height) * 100, 18, 94),
        });
      }}
      className={`relative w-full ${
        isMobile ? "h-[170px]" : "h-[220px]"
      } rounded-2xl bg-white border border-[#E8DFD3] overflow-hidden cursor-crosshair select-none`}
    >
      <motion.div
        animate={{ scale: zoom }}
        className="absolute inset-0 bg-[radial-gradient(rgba(50,40,34,0.08)_1px,transparent_1px)] [background-size:18px_18px]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(253,251,248,0.9)_100%)] pointer-events-none" />

      <motion.div
        ref={pinRef}
        drag
        dragMomentum={false}
        dragConstraints={mapRef}
        dragElastic={0}
        style={{ left: `${pinPos.x}%`, top: `${pinPos.y}%`, x: px, y: py }}
        onClick={(e) => e.stopPropagation()}
        onDragEnd={() => {
          if (!mapRef.current || !pinRef.current) return;
          const c = mapRef.current.getBoundingClientRect();
          const r = pinRef.current.getBoundingClientRect();
          const nx = clamp(((r.left + r.width / 2 - c.left) / c.width) * 100, 8, 92);
          const ny = clamp(((r.bottom - c.top) / c.height) * 100, 18, 94);
          px.set(0);
          py.set(0);
          onChange({ x: nx, y: ny });
        }}
        className="absolute -translate-x-1/2 -translate-y-full cursor-grab active:cursor-grabbing z-10"
      >
        <motion.div
          key={`${Math.round(pinPos.x)}-${Math.round(pinPos.y)}`}
          initial={{ y: -14, scale: 0.85 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 16 }}
          className="flex flex-col items-center"
        >
          <svg viewBox="0 0 24 32" className={isMobile ? "w-7 h-9" : "w-8 h-10"}>
            <path
              d="M12 0C5.37 0 0 5.37 0 12c0 9 12 20 12 20s12-11 12-20c0-6.63-5.37-12-12-12z"
              fill="url(#pinGrad)"
            />
            <defs>
              <linearGradient id="pinGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF8A2A" />
                <stop offset="100%" stopColor="#E24E00" />
              </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="4.5" fill="#fff" />
          </svg>
          <span className="w-3 h-1 rounded-full bg-black/25 blur-[1.5px] -mt-0.5" />
        </motion.div>
      </motion.div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute right-2.5 top-2.5 w-8 h-8 rounded-full bg-white border border-[#E8DFD3] shadow-sm flex items-center justify-center text-[#4A3E39]"
      >
        <Maximize2 className="w-3.5 h-3.5" />
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute right-2.5 bottom-2.5 rounded-xl bg-white border border-[#E8DFD3] shadow-sm flex flex-col overflow-hidden"
      >
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => setZoom((z) => Math.min(1.6, z + 0.2))}
          className="w-8 h-8 flex items-center justify-center text-[#4A3E39] hover:bg-[#FAF6F1] border-b border-[#E8DFD3] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => setZoom((z) => Math.max(1, z - 0.2))}
          className="w-8 h-8 flex items-center justify-center text-[#4A3E39] hover:bg-[#FAF6F1] cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

