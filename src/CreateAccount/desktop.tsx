import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";
import bg from "./Bg.png";
import {
  GullyLogo,
  categories,
  onboardingFeatures,
  createAccountData,
} from "./data";

const UserIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

const EyeIcon = ({ off }: { off: boolean }) => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
    {off && <path d="m4 4 16 16" />}
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
  </svg>
);

const CheckIcon = ({ active }: { active: boolean }) => (
  <svg
    className={`w-3 h-3 shrink-0 transition-colors duration-300 ${
      active ? "text-[#16A34A]" : "text-[#A49890]"
    }`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

function BackgroundWaves() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <div className="absolute inset-x-0 bottom-0 h-48 sm:h-64 lg:h-80 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[200%] h-full flex"
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 2880 280"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient id="caWaveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F85B01" stopOpacity="0.09" />
                <stop offset="35%" stopColor="#FF7A00" stopOpacity="0.15" />
                <stop offset="70%" stopColor="#F85B01" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#FF7A00" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <path
              d="M0 130 C 400 50, 800 210, 1200 130 C 1600 50, 2000 210, 2400 130 C 2800 50, 3200 210, 3600 130 L 3600 280 L 0 280 Z"
              fill="url(#caWaveGrad1)"
            />
          </svg>
        </motion.div>

        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[200%] h-full flex"
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 2880 280"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient id="caWaveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF7A00" stopOpacity="0.07" />
                <stop offset="45%" stopColor="#F85B01" stopOpacity="0.12" />
                <stop offset="85%" stopColor="#FF9E40" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#F85B01" stopOpacity="0.12" />
              </linearGradient>
            </defs>
            <path
              d="M0 170 C 450 90, 900 230, 1350 160 C 1800 90, 2250 230, 2700 160 C 3150 90, 3600 230, 4050 160 L 4050 280 L 0 280 Z"
              fill="url(#caWaveGrad2)"
            />
          </svg>
        </motion.div>

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[200%] h-full flex"
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 2880 280"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient id="caContourGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F85B01" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#FF7A00" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#F85B01" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              d="M0 120 C 400 40, 800 200, 1200 120 C 1600 40, 2000 200, 2400 120 C 2800 40, 3200 200, 3600 120"
              stroke="url(#caContourGrad)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
            />
            <path
              d="M0 160 C 450 80, 900 220, 1350 150 C 1800 80, 2250 220, 2700 150 C 3150 80, 3600 220, 4050 150"
              stroke="url(#caContourGrad)"
              strokeWidth="1"
              strokeOpacity="0.75"
            />
          </svg>
        </motion.div>
      </div>

      <div className="absolute inset-0">
        {[
          { top: "18%", left: "15%", size: 5, delay: 0.5, duration: 6.5 },
          { top: "32%", left: "38%", size: 4, delay: 2, duration: 8 },
          { top: "68%", left: "20%", size: 6, delay: 1, duration: 7 },
          { top: "42%", left: "82%", size: 5, delay: 2.8, duration: 7.5 },
          { top: "75%", left: "72%", size: 4, delay: 0.2, duration: 6 },
        ].map((pt, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -18, 0],
              opacity: [0.25, 0.65, 0.25],
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: pt.duration,
              delay: pt.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              top: pt.top,
              left: pt.left,
              width: pt.size,
              height: pt.size,
            }}
            className="absolute rounded-full bg-[#F85B01]/30 blur-[0.5px]"
          />
        ))}
      </div>
    </div>
  );
}

const COUNTRY_CODES = [
  { code: "+91", label: "+91" },
  { code: "+1", label: "+1" },
  { code: "+44", label: "+44" },
  { code: "+971", label: "+971" },
];

const SCREEN_DESCRIPTIONS = [
  "Enter your full name to set up your profile.",
  "Enter your email address to receive property updates.",
  "Add your mobile number for verified property inquiries.",
  "Create and confirm a secure password for your account.",
];

export function CreateAccountCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobilePath = location.pathname.toLowerCase().includes("/mobile");
  const targetViewport = isMobilePath ? "mobile" : "desktop";

  const [screen, setScreen] = useState(0);
  const [direction, setDirection] = useState(1);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const isNameValid = fullName.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPhoneValid = /^\d{7,15}$/.test(phone.replace(/[\s-]/g, ""));

  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  const isPasswordValid = hasMinLength && hasNumber && hasLetter;
  const doPasswordsMatch = password.length > 0 && password === confirmPassword;

  const isCurrentScreenValid =
    screen === 0
      ? isNameValid
      : screen === 1
        ? isEmailValid
        : screen === 2
          ? isPhoneValid
          : isPasswordValid && doPasswordsMatch;

  const goToScreen = (nextScreen: number) => {
    setDirection(nextScreen > screen ? 1 : -1);
    setTouched(false);
    setScreen(nextScreen);
  };

  const handleNextOrSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isCurrentScreenValid) return;

    if (screen < 3) {
      goToScreen(screen + 1);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
      setTimeout(() => {
        navigate(`/${targetViewport}/login`);
      }, 1200);
    }, 700);
  };

  const handleGoogleSignIn = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
      navigate(`/${targetViewport}/home`);
    }, 800);
  };

  const progressWidth = completed ? 100 : ((screen + 1) / 4) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative group/card w-full max-w-[400px] sm:max-w-[420px] rounded-[4px] bg-white/97 backdrop-blur-2xl border border-[#E5DFD4]/70 shadow-[0_12px_44px_rgba(50,40,34,0.12),0_2px_12px_rgba(50,40,34,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] overflow-hidden select-text"
    >
      <div className="absolute -inset-[1px] rounded-[5px] bg-gradient-to-br from-[#F85B01]/20 via-transparent to-[#FF7A00]/15 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 h-[3px] bg-[#E5DFD4]/40 overflow-hidden">
        <motion.div
          className={`absolute inset-y-0 left-0 ${
            completed
              ? "bg-gradient-to-r from-[#16A34A] to-[#22C55E]"
              : "bg-gradient-to-r from-[#F85B01] to-[#FF7A00]"
          }`}
          animate={{ width: `${progressWidth}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>

      <div className="relative z-10 p-6 sm:p-7">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-[22px] sm:text-2xl lg:text-[26px] font-extrabold text-[#1E1713] tracking-[-0.02em] leading-tight"
        >
          Create Account
        </motion.h2>
        <AnimatePresence mode="wait">
          <motion.p
            key={completed ? "done" : screen}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-center text-[11px] sm:text-xs text-[#8C827A] mt-1.5 font-medium tracking-wide leading-relaxed min-h-[28px] flex items-center justify-center"
          >
            {completed ? "Your account has been created!" : SCREEN_DESCRIPTIONS[screen]}
          </motion.p>
        </AnimatePresence>

        <form className="mt-4" onSubmit={handleNextOrSubmit} noValidate>
          <div className="min-h-[128px] flex flex-col justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              {completed ? (
                <motion.div
                  key="completed"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="py-6 px-4 rounded-[4px] bg-gradient-to-b from-[#ECFDF5] to-[#F0FDF4] border border-[#A7F3D0]/60 flex flex-col items-center justify-center text-center gap-2 shadow-[0_2px_8px_rgba(22,163,74,0.08)]"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: [0, 1.25, 1], rotate: [-45, 5, 0] }}
                    transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-11 h-11 rounded-[4px] bg-gradient-to-br from-[#16A34A] to-[#22C55E] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(22,163,74,0.25)]"
                  >
                    <Check className="w-5 h-5 stroke-[3]" />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm font-extrabold text-[#15803D]"
                  >
                    Account Created Successfully!
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xs text-[#166534] font-medium flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-[#16A34A] animate-pulse" />
                    <span>Redirecting you to Log In...</span>
                  </motion.p>
                </motion.div>
              ) : screen === 0 ? (
                <motion.div
                  key="screen-name"
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -24 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-1.5"
                >
                  <div className="flex justify-between items-center">
                    <label className="block text-[11px] sm:text-xs font-bold text-[#322822] tracking-wide">
                      Full Name
                    </label>
                    {touched && !isNameValid && (
                      <motion.span
                        initial={{ opacity: 0, x: 6 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-[10px] text-[#d4183d] font-semibold"
                      >
                        At least 2 characters required
                      </motion.span>
                    )}
                  </div>
                  <div
                    className={`flex items-center gap-2.5 h-10.5 sm:h-11 px-3.5 rounded-[4px] border bg-white text-[#8C827A] transition-all duration-300 ${
                      touched && !isNameValid
                        ? "border-[#d4183d] focus-within:border-[#d4183d] focus-within:ring-[2.5px] focus-within:ring-[#d4183d]/12"
                        : "border-[#D9D2C7] hover:border-[#C4BAB0] focus-within:border-[#F85B01] focus-within:ring-[2.5px] focus-within:ring-[#F85B01]/15 focus-within:shadow-[0_0_0_4px_rgba(248,91,1,0.06)] focus-within:text-[#F85B01]"
                    }`}
                  >
                    <UserIcon />
                    <input
                      type="text"
                      autoFocus
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="flex-1 bg-transparent outline-none text-xs sm:text-[13px] text-[#1E1713] placeholder:text-[#A49890] font-medium"
                    />
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#A49890] font-medium leading-relaxed">
                    This will be shown on your property inquiries and profile.
                  </p>
                </motion.div>
              ) : screen === 1 ? (
                <motion.div
                  key="screen-email"
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -24 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-1.5"
                >
                  <div className="flex justify-between items-center">
                    <label className="block text-[11px] sm:text-xs font-bold text-[#322822] tracking-wide">
                      Email Address
                    </label>
                    {touched && !isEmailValid && (
                      <motion.span
                        initial={{ opacity: 0, x: 6 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-[10px] text-[#d4183d] font-semibold"
                      >
                        Enter a valid email address
                      </motion.span>
                    )}
                  </div>
                  <div
                    className={`flex items-center gap-2.5 h-10.5 sm:h-11 px-3.5 rounded-[4px] border bg-white text-[#8C827A] transition-all duration-300 ${
                      touched && !isEmailValid
                        ? "border-[#d4183d] focus-within:border-[#d4183d] focus-within:ring-[2.5px] focus-within:ring-[#d4183d]/12"
                        : "border-[#D9D2C7] hover:border-[#C4BAB0] focus-within:border-[#F85B01] focus-within:ring-[2.5px] focus-within:ring-[#F85B01]/15 focus-within:shadow-[0_0_0_4px_rgba(248,91,1,0.06)] focus-within:text-[#F85B01]"
                    }`}
                  >
                    <MailIcon />
                    <input
                      type="email"
                      autoFocus
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 bg-transparent outline-none text-xs sm:text-[13px] text-[#1E1713] placeholder:text-[#A49890] font-medium"
                    />
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#A49890] font-medium leading-relaxed">
                    We'll send property notifications and saved listing updates.
                  </p>
                </motion.div>
              ) : screen === 2 ? (
                <motion.div
                  key="screen-phone"
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -24 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-1.5"
                >
                  <div className="flex justify-between items-center">
                    <label className="block text-[11px] sm:text-xs font-bold text-[#322822] tracking-wide">
                      Mobile Number
                    </label>
                    {touched && !isPhoneValid && (
                      <motion.span
                        initial={{ opacity: 0, x: 6 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-[10px] text-[#d4183d] font-semibold"
                      >
                        Enter a valid 7-15 digit number
                      </motion.span>
                    )}
                  </div>
                  <div
                    className={`flex items-center rounded-[4px] border bg-white overflow-hidden transition-all duration-300 h-10.5 sm:h-11 ${
                      touched && !isPhoneValid
                        ? "border-[#d4183d] focus-within:border-[#d4183d] focus-within:ring-[2.5px] focus-within:ring-[#d4183d]/12"
                        : "border-[#D9D2C7] hover:border-[#C4BAB0] focus-within:border-[#F85B01] focus-within:ring-[2.5px] focus-within:ring-[#F85B01]/15 focus-within:shadow-[0_0_0_4px_rgba(248,91,1,0.06)]"
                    }`}
                  >
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      aria-label="Country Code"
                      className="h-full px-2.5 bg-[#F4EFE6]/50 border-r border-[#D9D2C7] text-xs font-bold text-[#322822] outline-none cursor-pointer"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <div className="flex-1 flex items-center gap-2.5 px-3 text-[#8C827A] focus-within:text-[#F85B01]">
                      <PhoneIcon />
                      <input
                        type="tel"
                        autoFocus
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your mobile number"
                        className="flex-1 bg-transparent outline-none text-xs sm:text-[13px] text-[#1E1713] placeholder:text-[#A49890] font-medium"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#A49890] font-medium leading-relaxed">
                    Direct connection with verified buyers and property owners.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="screen-password"
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -24 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-3"
                >
                  <div className="space-y-1.5">
                    <label className="block text-[11px] sm:text-xs font-bold text-[#322822] tracking-wide">
                      Create Password
                    </label>
                    <div
                      className={`flex items-center gap-2.5 h-10.5 sm:h-11 px-3.5 rounded-[4px] border bg-white text-[#8C827A] transition-all duration-300 ${
                        touched && !isPasswordValid
                          ? "border-[#d4183d] focus-within:border-[#d4183d] focus-within:ring-[2.5px] focus-within:ring-[#d4183d]/12"
                          : "border-[#D9D2C7] hover:border-[#C4BAB0] focus-within:border-[#F85B01] focus-within:ring-[2.5px] focus-within:ring-[#F85B01]/15 focus-within:shadow-[0_0_0_4px_rgba(248,91,1,0.06)] focus-within:text-[#F85B01]"
                      }`}
                    >
                      <LockIcon />
                      <input
                        type={showPassword ? "text" : "password"}
                        autoFocus
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter a secure password"
                        className="flex-1 bg-transparent outline-none text-xs sm:text-[13px] text-[#1E1713] placeholder:text-[#A49890] font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label="Toggle password visibility"
                        className="cursor-pointer hover:text-[#F85B01] active:scale-90 transition-all duration-200 p-0.5 rounded-[2px]"
                      >
                        <EyeIcon off={!showPassword} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="block text-[11px] sm:text-xs font-bold text-[#322822] tracking-wide">
                        Confirm Password
                      </label>
                      {confirmPassword.length > 0 && !doPasswordsMatch && (
                        <motion.span
                          initial={{ opacity: 0, x: 6 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-[10px] text-[#d4183d] font-semibold"
                        >
                          Passwords do not match
                        </motion.span>
                      )}
                    </div>
                    <div
                      className={`flex items-center gap-2.5 h-10.5 sm:h-11 px-3.5 rounded-[4px] border bg-white text-[#8C827A] transition-all duration-300 ${
                        confirmPassword.length > 0 && !doPasswordsMatch
                          ? "border-[#d4183d] focus-within:border-[#d4183d] focus-within:ring-[2.5px] focus-within:ring-[#d4183d]/12"
                          : doPasswordsMatch
                            ? "border-[#16A34A]/60 focus-within:border-[#16A34A] focus-within:ring-[2.5px] focus-within:ring-[#16A34A]/15"
                            : "border-[#D9D2C7] hover:border-[#C4BAB0] focus-within:border-[#F85B01] focus-within:ring-[2.5px] focus-within:ring-[#F85B01]/15 focus-within:shadow-[0_0_0_4px_rgba(248,91,1,0.06)] focus-within:text-[#F85B01]"
                      }`}
                    >
                      <LockIcon />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        className="flex-1 bg-transparent outline-none text-xs sm:text-[13px] text-[#1E1713] placeholder:text-[#A49890] font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        aria-label="Toggle confirm password visibility"
                        className="cursor-pointer hover:text-[#F85B01] active:scale-90 transition-all duration-200 p-0.5 rounded-[2px]"
                      >
                        <EyeIcon off={!showConfirmPassword} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                    {[
                      { label: "8+ characters", met: hasMinLength },
                      { label: "1+ number", met: hasNumber },
                      { label: "1+ letter", met: hasLetter },
                      { label: "Passwords match", met: doPasswordsMatch },
                    ].map((req) => (
                      <motion.div
                        key={req.label}
                        animate={{
                          scale: req.met ? [1, 1.06, 1] : 1,
                        }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-[2px] border text-[10px] font-bold transition-all duration-300 ${
                          req.met
                            ? "bg-[#ECFDF5] border-[#A7F3D0]/60 text-[#15803D] shadow-[0_1px_3px_rgba(22,163,74,0.06)]"
                            : "bg-[#F9F7F2] border-[#E5DFD4]/60 text-[#8C827A]"
                        }`}
                      >
                        <CheckIcon active={req.met} />
                        <span className="truncate">{req.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4 sm:mt-5 flex items-center gap-2.5">
            {screen > 0 && !completed && (
              <motion.button
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                whileHover={{ scale: 1.02, x: -1 }}
                whileTap={{ scale: 0.975 }}
                type="button"
                onClick={() => goToScreen(screen - 1)}
                className="h-10.5 sm:h-11 px-4 rounded-[4px] border border-[#D9D2C7] bg-white hover:bg-[#FDFBF8] hover:border-[#C4BAB0] hover:shadow-sm text-xs font-bold text-[#322822] flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </motion.button>
            )}

            <motion.button
              whileHover={isCurrentScreenValid && !loading && !completed ? { scale: 1.02, y: -1 } : {}}
              whileTap={isCurrentScreenValid && !loading && !completed ? { scale: 0.975 } : {}}
              disabled={!isCurrentScreenValid || loading || completed}
              type="submit"
              className={`sheen relative overflow-hidden flex-1 h-10.5 sm:h-11 rounded-[4px] font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                isCurrentScreenValid && !completed
                  ? "bg-gradient-to-r from-[#F85B01] to-[#FF7A00] hover:from-[#E24E00] hover:to-[#F85B01] text-white shadow-[0_4px_16px_rgba(248,91,1,0.3),0_1px_4px_rgba(248,91,1,0.15)] hover:shadow-[0_6px_24px_rgba(248,91,1,0.35),0_2px_6px_rgba(248,91,1,0.2)] cursor-pointer"
                  : "bg-[#E5DFD4]/60 text-[#A49890] cursor-not-allowed"
              }`}
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.span
                    key="spinner"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                  />
                ) : screen < 3 ? (
                  <motion.span
                    key="continue"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-2"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="complete"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                  >
                    Complete Account
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </form>

        <div className="flex items-center gap-3 my-4 sm:my-5">
          <span className="flex-1 h-px bg-gradient-to-r from-transparent via-[#E5DFD4] to-transparent" />
          <span className="text-[10px] sm:text-[11px] text-[#A49890] font-semibold uppercase tracking-widest">or</span>
          <span className="flex-1 h-px bg-gradient-to-r from-transparent via-[#E5DFD4] to-transparent" />
        </div>

        <motion.button
          whileHover={{ scale: 1.015, y: -1 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          disabled={googleLoading}
          onClick={handleGoogleSignIn}
          className="w-full h-10.5 sm:h-11 rounded-[4px] border border-[#D9D2C7] bg-white hover:bg-[#FDFBF8] hover:border-[#C4BAB0] hover:shadow-[0_2px_8px_rgba(50,40,34,0.06)] flex items-center justify-center gap-2.5 text-xs sm:text-[13px] font-bold text-[#1E1713] transition-all duration-300 cursor-pointer"
        >
          <AnimatePresence mode="wait">
            {googleLoading ? (
              <motion.span
                key="g-spinner"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15 }}
                className="w-4 h-4 border-2 border-[#322822] border-t-transparent rounded-full animate-spin"
              />
            ) : (
              <motion.span
                key="g-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2.5"
              >
                <GoogleIcon />
                <span>Continue with Google</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <p className="text-center text-[11px] sm:text-xs text-[#8C827A] mt-4 sm:mt-5 font-medium">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate(`/${targetViewport}/login`)}
            className="font-bold text-[#F85B01] hover:text-[#C94A00] underline underline-offset-4 decoration-[#F85B01]/40 hover:decoration-[#C94A00] transition-all duration-200 cursor-pointer"
          >
            Log In
          </button>
        </p>
      </div>
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function CreateAccountDesktop() {
  return (
    <div
      className="relative w-full h-full min-h-0 flex-1 overflow-hidden bg-cover bg-center flex flex-col justify-center select-text"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF8]/88 via-[#FDFBF8]/55 to-[#FDFBF8]/15 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF8]/15 via-transparent to-[#FDFBF8]/30 pointer-events-none" />

      <BackgroundWaves />

      <motion.div
        animate={{ y: [0, -22, 0], scale: [1, 1.06, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-36 -bottom-36 w-[600px] h-[600px] rounded-full bg-[#F85B01]/14 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 16, 0], scale: [1, 1.04, 1], opacity: [0.06, 0.14, 0.06] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute -left-28 -top-28 w-[400px] h-[400px] rounded-full bg-[#FF7A00]/10 blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 max-w-[1400px] w-full mx-auto h-full max-h-full flex-1 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-14 xl:gap-18 items-center px-8 sm:px-12 lg:px-16 xl:px-20 py-6 lg:py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-center space-y-4 sm:space-y-5 lg:space-y-6 xl:space-y-7 pr-0 lg:pr-6"
        >
          <motion.div variants={itemVariants}>
            <GullyLogo className="h-10 sm:h-11 lg:h-12 xl:h-14 w-auto drop-shadow-sm" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-[2px] bg-gradient-to-r from-[#F85B01] to-[#FF7A00] rounded-full"
            />
            <span className="text-[11px] lg:text-xs tracking-[0.25em] uppercase text-[#F85B01] font-extrabold select-text">
              {createAccountData.tagline}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[48px] font-black leading-[1.08] text-[#1E1713] tracking-[-0.025em] select-text"
          >
            {createAccountData.headline}
            <br />
            <span className="text-[#F85B01] drop-shadow-sm">{createAccountData.brand}</span>{" "}
            {createAccountData.headlineSub}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-[13px] sm:text-sm lg:text-[15px] text-[#4A3E39] font-medium leading-[1.7] select-text"
          >
            {createAccountData.subtitle}
          </motion.p>

          <motion.div variants={itemVariants} className="grid grid-cols-4 gap-2.5 sm:gap-3 max-w-xl pt-1">
            {categories.map(({ id, label, Icon }) => (
              <motion.button
                key={id}
                type="button"
                whileHover={{ y: -5, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group relative h-[82px] sm:h-[90px] lg:h-[96px] rounded-[4px] flex flex-col items-center justify-center gap-2 text-center text-[10px] sm:text-[11px] lg:text-xs font-extrabold cursor-pointer transition-all duration-300 border bg-white/90 backdrop-blur-lg border-[#E5DFD4]/80 text-[#322822] shadow-[0_1px_3px_rgba(50,40,34,0.04)] hover:bg-[#FFF8F3] hover:border-[#F85B01]/50 hover:text-[#C94A00] hover:ring-[2px] hover:ring-[#F85B01]/12 hover:shadow-[0_8px_24px_rgba(248,91,1,0.1)] select-text"
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#F85B01] group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300" />
                <span className="leading-tight px-1">{label}</span>
              </motion.button>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="pt-0.5 select-text">
            <div className="flex items-center divide-x divide-[#E5DFD4]/50 max-w-xl py-3 px-4 bg-white/85 backdrop-blur-lg rounded-[4px] border border-[#E5DFD4]/60 shadow-[0_2px_8px_rgba(50,40,34,0.04)]">
              {onboardingFeatures.map(({ label, icon: FeatureIcon }) => (
                <div
                  key={label}
                  className="flex-1 px-2 sm:px-3 flex flex-col items-center justify-center text-center gap-1.5 group"
                >
                  <div className="text-[#F85B01] group-hover:scale-115 transition-transform duration-300">
                    <FeatureIcon size={16} />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#322822] leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="w-full flex items-center justify-center lg:justify-end">
          <CreateAccountCard />
        </div>
      </div>
    </div>
  );
}
