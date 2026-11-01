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
    className={`w-3 h-3 shrink-0 transition-colors duration-200 ${
      active ? "text-[#16A34A]" : "text-[#8C827A]"
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
      }, 800);
    }, 600);
  };

  const handleGoogleSignIn = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
      navigate(`/${targetViewport}/home`);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[400px] sm:max-w-[420px] rounded-[4px] bg-white/95 backdrop-blur-2xl border border-[#E5DFD4] shadow-[0_24px_60px_rgba(50,40,34,0.14)] p-6 sm:p-7 select-text"
    >
      <div className="flex items-center justify-center gap-1.5 mb-2">
        {[0, 1, 2, 3].map((idx) => {
          const isDone = idx < screen || completed;
          const isCurrent = idx === screen && !completed;
          return (
            <motion.div
              key={idx}
              layout
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              className={`h-1 rounded-full transition-colors duration-200 ${
                isCurrent
                  ? "w-6 bg-[#F85B01]"
                  : isDone
                    ? "w-2.5 bg-[#16A34A]"
                    : "w-2.5 bg-[#E5DFD4]"
              }`}
            />
          );
        })}
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06, duration: 0.3 }}
        className="text-center text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#1E1713] tracking-tight leading-tight"
      >
        Create Account
      </motion.h2>
      <motion.p
        key={screen}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="text-center text-xs text-[#6B5E57] mt-1 font-medium leading-relaxed min-h-[30px] flex items-center justify-center"
      >
        {completed ? "Account created successfully!" : SCREEN_DESCRIPTIONS[screen]}
      </motion.p>

      <form className="mt-3.5" onSubmit={handleNextOrSubmit} noValidate>
        <div className="min-h-[124px] flex flex-col justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            {completed ? (
              <motion.div
                key="completed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="py-5 px-3 rounded-[4px] bg-[#ECFDF5] border border-[#A7F3D0] flex flex-col items-center justify-center text-center gap-1.5 shadow-sm"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  className="w-10 h-10 rounded-[4px] bg-[#16A34A] text-white flex items-center justify-center shadow-xs"
                >
                  <Check className="w-5 h-5 stroke-[3]" />
                </motion.div>
                <p className="text-sm font-extrabold text-[#15803D]">
                  Account Created Successfully!
                </p>
                <p className="text-xs text-[#166534] font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#16A34A] animate-pulse" />
                  <span>Redirecting you to Log In...</span>
                </p>
              </motion.div>
            ) : screen === 0 ? (
              <motion.div
                key="screen-name"
                custom={direction}
                initial={{ opacity: 0, x: direction * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -20 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-1.5"
              >
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-[#322822]">
                    Full Name
                  </label>
                  {touched && !isNameValid && (
                    <motion.span
                      initial={{ opacity: 0, x: 4 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-[10px] text-[#d4183d] font-semibold"
                    >
                      Please enter at least 2 characters
                    </motion.span>
                  )}
                </div>
                <div
                  className={`flex items-center gap-2.5 h-10.5 px-3.5 rounded-[4px] border bg-white text-[#8C827A] transition-all duration-200 shadow-2xs ${
                    touched && !isNameValid
                      ? "border-[#d4183d] focus-within:border-[#d4183d] focus-within:ring-2 focus-within:ring-[#d4183d]/15"
                      : "border-[#D9D2C7] hover:border-[#B8ADA4] focus-within:border-[#F85B01] focus-within:ring-2 focus-within:ring-[#F85B01]/25 focus-within:shadow-[0_0_12px_rgba(248,91,1,0.15)] focus-within:text-[#F85B01]"
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
                    className="flex-1 bg-transparent outline-none text-xs sm:text-[13px] text-[#1E1713] placeholder:text-[#8C827A] font-medium"
                  />
                </div>
                <p className="text-[11px] text-[#8C827A] font-medium">
                  This will be shown on your property inquiries and profile.
                </p>
              </motion.div>
            ) : screen === 1 ? (
              <motion.div
                key="screen-email"
                custom={direction}
                initial={{ opacity: 0, x: direction * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -20 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-1.5"
              >
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-[#322822]">
                    Email Address
                  </label>
                  {touched && !isEmailValid && (
                    <motion.span
                      initial={{ opacity: 0, x: 4 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-[10px] text-[#d4183d] font-semibold"
                    >
                      Please enter a valid email address
                    </motion.span>
                  )}
                </div>
                <div
                  className={`flex items-center gap-2.5 h-10.5 px-3.5 rounded-[4px] border bg-white text-[#8C827A] transition-all duration-200 shadow-2xs ${
                    touched && !isEmailValid
                      ? "border-[#d4183d] focus-within:border-[#d4183d] focus-within:ring-2 focus-within:ring-[#d4183d]/15"
                      : "border-[#D9D2C7] hover:border-[#B8ADA4] focus-within:border-[#F85B01] focus-within:ring-2 focus-within:ring-[#F85B01]/25 focus-within:shadow-[0_0_12px_rgba(248,91,1,0.15)] focus-within:text-[#F85B01]"
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
                    className="flex-1 bg-transparent outline-none text-xs sm:text-[13px] text-[#1E1713] placeholder:text-[#8C827A] font-medium"
                  />
                </div>
                <p className="text-[11px] text-[#8C827A] font-medium">
                  We'll send property notifications and saved listing updates.
                </p>
              </motion.div>
            ) : screen === 2 ? (
              <motion.div
                key="screen-phone"
                custom={direction}
                initial={{ opacity: 0, x: direction * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -20 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-1.5"
              >
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-[#322822]">
                    Mobile Number
                  </label>
                  {touched && !isPhoneValid && (
                    <motion.span
                      initial={{ opacity: 0, x: 4 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-[10px] text-[#d4183d] font-semibold"
                    >
                      Enter a valid 7–15 digit phone number
                    </motion.span>
                  )}
                </div>
                <div
                  className={`flex items-center rounded-[4px] border bg-white overflow-hidden transition-all duration-200 shadow-2xs h-10.5 ${
                    touched && !isPhoneValid
                      ? "border-[#d4183d] focus-within:border-[#d4183d] focus-within:ring-2 focus-within:ring-[#d4183d]/15"
                      : "border-[#D9D2C7] hover:border-[#B8ADA4] focus-within:border-[#F85B01] focus-within:ring-2 focus-within:ring-[#F85B01]/25 focus-within:shadow-[0_0_12px_rgba(248,91,1,0.15)]"
                  }`}
                >
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    aria-label="Country Code"
                    className="h-full px-2.5 bg-[#F9F7F2] border-r border-[#D9D2C7] text-xs font-bold text-[#322822] outline-none cursor-pointer"
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
                      className="flex-1 bg-transparent outline-none text-xs sm:text-[13px] text-[#1E1713] placeholder:text-[#8C827A] font-medium"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-[#8C827A] font-medium">
                  Direct connection with verified buyers and property owners.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="screen-password"
                custom={direction}
                initial={{ opacity: 0, x: direction * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -20 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-2.5"
              >
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#322822]">
                    Create Password
                  </label>
                  <div
                    className={`flex items-center gap-2.5 h-10 px-3 rounded-[4px] border bg-white text-[#8C827A] transition-all duration-200 shadow-2xs ${
                      touched && !isPasswordValid
                        ? "border-[#d4183d] focus-within:border-[#d4183d] focus-within:ring-2 focus-within:ring-[#d4183d]/15"
                        : "border-[#D9D2C7] hover:border-[#B8ADA4] focus-within:border-[#F85B01] focus-within:ring-2 focus-within:ring-[#F85B01]/25 focus-within:shadow-[0_0_12px_rgba(248,91,1,0.15)] focus-within:text-[#F85B01]"
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
                      className="flex-1 bg-transparent outline-none text-xs sm:text-[13px] text-[#1E1713] placeholder:text-[#8C827A] font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label="Toggle password visibility"
                      className="cursor-pointer hover:text-[#F85B01] transition-colors p-0.5 rounded-[2px]"
                    >
                      <EyeIcon off={!showPassword} />
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-bold text-[#322822]">
                      Confirm Password
                    </label>
                    {confirmPassword.length > 0 && !doPasswordsMatch && (
                      <motion.span
                        initial={{ opacity: 0, x: 4 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-[10px] text-[#d4183d] font-semibold"
                      >
                        Passwords do not match
                      </motion.span>
                    )}
                  </div>
                  <div
                    className={`flex items-center gap-2.5 h-10 px-3 rounded-[4px] border bg-white text-[#8C827A] transition-all duration-200 shadow-2xs ${
                      confirmPassword.length > 0 && !doPasswordsMatch
                        ? "border-[#d4183d] focus-within:border-[#d4183d] focus-within:ring-2 focus-within:ring-[#d4183d]/15"
                        : doPasswordsMatch
                          ? "border-[#16A34A] focus-within:border-[#16A34A] focus-within:ring-2 focus-within:ring-[#16A34A]/25"
                          : "border-[#D9D2C7] hover:border-[#B8ADA4] focus-within:border-[#F85B01] focus-within:ring-2 focus-within:ring-[#F85B01]/25 focus-within:shadow-[0_0_12px_rgba(248,91,1,0.15)] focus-within:text-[#F85B01]"
                    }`}
                  >
                    <LockIcon />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="flex-1 bg-transparent outline-none text-xs sm:text-[13px] text-[#1E1713] placeholder:text-[#8C827A] font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      aria-label="Toggle confirm password visibility"
                      className="cursor-pointer hover:text-[#F85B01] transition-colors p-0.5 rounded-[2px]"
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
                        scale: req.met ? [1, 1.05, 1] : 1,
                      }}
                      transition={{ duration: 0.22 }}
                      className={`flex items-center justify-center gap-1.5 py-1 px-2 rounded-[2px] border text-[10px] font-bold transition-all duration-200 ${
                        req.met
                          ? "bg-[#ECFDF5] border-[#A7F3D0] text-[#15803D]"
                          : "bg-[#F9F7F2] border-[#E5DFD4] text-[#6B5E57]"
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

        <div className="mt-4 flex items-center gap-2.5">
          {screen > 0 && !completed && (
            <motion.button
              whileHover={{ scale: 1.015, x: -1 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => goToScreen(screen - 1)}
              className="h-10.5 px-3.5 rounded-[4px] border border-[#D9D2C7] bg-white hover:bg-[#FAF7F2] hover:border-[#B8ADA4] text-xs font-bold text-[#322822] flex items-center justify-center gap-1.5 transition cursor-pointer shrink-0 shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </motion.button>
          )}

          <motion.button
            whileHover={isCurrentScreenValid && !loading && !completed ? { scale: 1.015, y: -1 } : {}}
            whileTap={isCurrentScreenValid && !loading && !completed ? { scale: 0.98 } : {}}
            disabled={!isCurrentScreenValid || loading || completed}
            type="submit"
            className={`sheen relative overflow-hidden flex-1 h-10.5 rounded-[4px] font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
              isCurrentScreenValid && !completed
                ? "bg-gradient-to-r from-[#F85B01] to-[#FF7A00] hover:from-[#E24E00] hover:to-[#F85B01] text-white shadow-md shadow-orange-500/25 cursor-pointer"
                : "bg-[#E5DFD4] text-[#8C827A] cursor-not-allowed"
            }`}
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : screen < 3 ? (
              <>
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <span>Complete Account</span>
            )}
          </motion.button>
        </div>
      </form>

      <div className="flex items-center gap-2.5 my-3 text-[10px] sm:text-[11px] text-[#8C827A] font-semibold uppercase">
        <span className="flex-1 h-px bg-[#E5DFD4]" />
        <span>or</span>
        <span className="flex-1 h-px bg-[#E5DFD4]" />
      </div>

      <motion.button
        whileHover={{ scale: 1.015, y: -1 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        disabled={googleLoading}
        onClick={handleGoogleSignIn}
        className="w-full h-10 rounded-[4px] border border-[#D9D2C7] bg-white hover:bg-[#FAF7F2] hover:border-[#B8ADA4] flex items-center justify-center gap-2 text-xs sm:text-[13px] font-bold text-[#1E1713] transition-all duration-200 shadow-2xs cursor-pointer"
      >
        {googleLoading ? (
          <span className="w-4 h-4 border-2 border-[#322822] border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <GoogleIcon />
            <span>Continue with Google</span>
          </>
        )}
      </motion.button>

      <p className="text-center text-[11px] sm:text-xs text-[#6B5E57] mt-3.5 font-medium">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => navigate(`/${targetViewport}/login`)}
          className="font-bold text-[#F85B01] hover:text-[#C94A00] underline underline-offset-4 decoration-[#F85B01]/70 hover:decoration-[#C94A00] transition cursor-pointer"
        >
          Log In
        </button>
      </p>
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function CreateAccountDesktop() {
  return (
    <div
      className="relative w-full h-full min-h-0 flex-1 overflow-hidden bg-cover bg-center flex flex-col justify-center select-text"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF8]/75 via-[#FDFBF8]/40 to-transparent pointer-events-none" />
      <motion.div
        animate={{ y: [0, -16, 0], scale: [1, 1.05, 1], opacity: [0.15, 0.22, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-32 -bottom-32 w-[500px] h-[500px] rounded-full bg-[#F85B01]/20 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-[1380px] w-full mx-auto h-full max-h-full flex-1 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 xl:gap-16 items-center px-8 sm:px-12 lg:px-16 xl:px-20 py-6 lg:py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-center space-y-3.5 sm:space-y-4 lg:space-y-5 xl:space-y-6 pr-0 lg:pr-4"
        >
          <motion.div variants={itemVariants}>
            <GullyLogo className="h-10 sm:h-11 lg:h-12 xl:h-13 w-auto drop-shadow-xs" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-2.5">
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 28 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="h-0.5 bg-[#F85B01]"
            />
            <span className="text-[11px] lg:text-xs tracking-[0.22em] uppercase text-[#F85B01] font-extrabold select-text">
              {createAccountData.tagline}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[46px] font-black leading-[1.12] text-[#1E1713] tracking-tight select-text"
          >
            {createAccountData.headline}<br /><span className="text-[#F85B01] drop-shadow-xs">{createAccountData.brand}</span> {createAccountData.headlineSub}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-xs sm:text-[13px] lg:text-[15px] text-[#3E342F] font-medium leading-relaxed select-text"
          >
            {createAccountData.subtitle}
          </motion.p>

          <motion.div variants={itemVariants} className="grid grid-cols-4 gap-2.5 sm:gap-3 max-w-xl pt-1">
            {categories.map(({ id, label, Icon }) => (
              <motion.button
                key={id}
                type="button"
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="group relative h-20 sm:h-22 lg:h-[92px] rounded-[4px] flex flex-col items-center justify-center gap-1.5 text-center text-[11px] lg:text-xs font-extrabold cursor-pointer transition-all duration-200 border shadow-xs backdrop-blur-md bg-white/88 border-[#E5DFD4] text-[#1E1713] hover:bg-[#FFF4ED] hover:border-[#F85B01] hover:text-[#C94A00] hover:ring-2 hover:ring-[#F85B01]/25 hover:shadow-orange-500/10 select-text"
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#F85B01] group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200" />
                <span className="leading-tight px-1">{label}</span>
              </motion.button>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="pt-1 select-text">
            <div className="flex items-center divide-x divide-[#D9D2C7] max-w-xl py-2.5 px-3.5 bg-white/85 backdrop-blur-md rounded-[4px] border border-[#E5DFD4] shadow-2xs">
              {onboardingFeatures.map(({ label, icon: FeatureIcon }) => (
                <div
                  key={label}
                  className="flex-1 px-2 sm:px-3 flex flex-col items-center justify-center text-center gap-1 group"
                >
                  <div className="text-[#F85B01] group-hover:scale-115 transition-transform duration-200">
                    <FeatureIcon size={15} />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#1E1713] leading-tight">
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
