/**
 * Create Account desktop view & CreateAccountCard component:
 * Single-screen layout with hero content on the left and animated registration card on the right.
 * Proportioned to fit 100% within the screen height with zero vertical scrolling,
 * clean margins, high contrast typography against twilight background, and Framer Motion micro-interactions.
 */
import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import bg from "../Login/Bg.png";
import { GullyLogo, categories, createAccountData } from "./data";

type ContactMode = "email" | "phone";

const UserIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

const EyeIcon = ({ off }: { off: boolean }) => (
  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    className={`w-3.5 h-3.5 shrink-0 transition-colors duration-200 ${
      active ? "text-[#10B981]" : "text-[#B8ADA4]"
    }`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

/**
 * Shared CreateAccountCard component with live validation and interactive switcher.
 */
export function CreateAccountCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobilePath = location.pathname.toLowerCase().includes("/mobile");
  const targetViewport = isMobilePath ? "mobile" : "desktop";

  const [fullName, setFullName] = useState("");
  const [contactMode, setContactMode] = useState<ContactMode>("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Live Password Validation Criteria
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(`/${targetViewport}/login`);
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[400px] sm:max-w-[420px] lg:max-w-[440px] rounded-[24px] sm:rounded-[28px] bg-white/95 backdrop-blur-2xl border border-white/80 shadow-[0_20px_50px_rgba(30,23,19,0.12)] p-4 sm:p-5 lg:p-5.5"
    >
      {/* Heading */}
      <h2 className="text-center text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#141b3d] tracking-tight leading-tight">
        Create Account
      </h2>
      <p className="text-center text-[11px] sm:text-xs text-[#6B5E57] mt-0.5 sm:mt-1 font-medium">
        Get started with Gully Listings in just a few steps
      </p>

      <form className="mt-3 sm:mt-3.5 space-y-2.5" onSubmit={handleSubmit}>
        {/* Full Name Input Box */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-[#D9D2C7] bg-white focus-within:border-[#F85B01] focus-within:ring-2 focus-within:ring-[#F85B01]/20 transition-all shadow-2xs">
          <div className="text-[#8C827A] focus-within:text-[#F85B01]">
            <UserIcon />
          </div>
          <div className="flex-1 flex flex-col justify-center min-w-0">
            <span className="text-[10px] font-bold text-[#141b3d] leading-none">
              Full Name
            </span>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full bg-transparent outline-none text-xs sm:text-[13px] text-[#141b3d] placeholder:text-[#8C827A] font-medium pt-0.5"
            />
          </div>
        </div>

        {/* Dual Radio Selector: Email / Phone */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <button
            type="button"
            onClick={() => setContactMode("email")}
            className={`flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer select-none ${
              contactMode === "email"
                ? "border-[#F85B01] bg-[#FFF8F4] text-[#141b3d] ring-1 ring-[#F85B01]/30 shadow-2xs"
                : "border-[#E5DFD4] bg-white text-[#4A3E39] hover:bg-[#FAF7F2]"
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                contactMode === "email"
                  ? "border-[#F85B01]"
                  : "border-[#B8ADA4]"
              }`}
            >
              {contactMode === "email" && (
                <span className="w-2 h-2 rounded-full bg-[#F85B01]" />
              )}
            </span>
            <MailIcon />
            <span>Email</span>
          </button>

          <button
            type="button"
            onClick={() => setContactMode("phone")}
            className={`flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer select-none ${
              contactMode === "phone"
                ? "border-[#F85B01] bg-[#FFF8F4] text-[#141b3d] ring-1 ring-[#F85B01]/30 shadow-2xs"
                : "border-[#E5DFD4] bg-white text-[#4A3E39] hover:bg-[#FAF7F2]"
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                contactMode === "phone"
                  ? "border-[#F85B01]"
                  : "border-[#B8ADA4]"
              }`}
            >
              {contactMode === "phone" && (
                <span className="w-2 h-2 rounded-full bg-[#F85B01]" />
              )}
            </span>
            <PhoneIcon />
            <span>Phone</span>
          </button>
        </div>

        {/* Email or Phone Input */}
        <AnimatePresence mode="wait">
          {contactMode === "email" ? (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.16 }}
            >
              <div className="flex items-center gap-2.5 h-9.5 sm:h-10 px-3 rounded-xl border border-[#D9D2C7] bg-white text-[#8C827A] focus-within:border-[#F85B01] focus-within:ring-2 focus-within:ring-[#F85B01]/20 focus-within:text-[#F85B01] transition-all shadow-2xs">
                <MailIcon />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-transparent outline-none text-xs sm:text-[13px] text-[#141b3d] placeholder:text-[#8C827A] font-medium"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="phone"
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.16 }}
            >
              <div className="flex items-center rounded-xl border border-[#D9D2C7] bg-white overflow-hidden focus-within:border-[#F85B01] focus-within:ring-2 focus-within:ring-[#F85B01]/20 transition-all shadow-2xs h-9.5 sm:h-10">
                <span className="h-full px-2.5 bg-[#F9F7F2] border-r border-[#D9D2C7] flex items-center text-xs font-bold text-[#141b3d]">
                  +91
                </span>
                <div className="flex-1 flex items-center gap-2 px-2.5 text-[#8C827A] focus-within:text-[#F85B01]">
                  <PhoneIcon />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="flex-1 bg-transparent outline-none text-xs sm:text-[13px] text-[#141b3d] placeholder:text-[#8C827A] font-medium"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Password Input */}
        <div>
          <div className="flex items-center gap-2.5 h-9.5 sm:h-10 px-3 rounded-xl border border-[#D9D2C7] bg-white text-[#8C827A] focus-within:border-[#F85B01] focus-within:ring-2 focus-within:ring-[#F85B01]/20 focus-within:text-[#F85B01] transition-all shadow-2xs">
            <LockIcon />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="flex-1 bg-transparent outline-none text-xs sm:text-[13px] text-[#141b3d] placeholder:text-[#8C827A] font-medium"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label="Toggle password visibility"
              className="cursor-pointer hover:text-[#F85B01] transition-colors p-0.5"
            >
              <EyeIcon off={!showPassword} />
            </button>
          </div>

          {/* Password Requirements Checklist */}
          <div className="mt-2 space-y-1 pl-1">
            <div className="flex items-center gap-2 text-[11px] font-medium">
              <CheckIcon active={hasMinLength} />
              <span className={hasMinLength ? "text-[#141b3d] font-bold" : "text-[#6B5E57]"}>
                At least 8 characters
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-medium">
              <CheckIcon active={hasNumber} />
              <span className={hasNumber ? "text-[#141b3d] font-bold" : "text-[#6B5E57]"}>
                Include a number
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-medium">
              <CheckIcon active={hasLetter} />
              <span className={hasLetter ? "text-[#141b3d] font-bold" : "text-[#6B5E57]"}>
                Include a letter
              </span>
            </div>
          </div>
        </div>

        {/* Create Account Submit Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          disabled={loading}
          type="submit"
          className="w-full h-10 sm:h-10.5 rounded-xl bg-gradient-to-r from-[#F85B01] to-[#FF7A00] hover:from-[#E24E00] hover:to-[#F85B01] text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/25 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 mt-1"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <span>Create Account</span>
          )}
        </motion.button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-2.5 my-2.5 text-[10px] sm:text-[11px] text-[#8C827A] font-semibold uppercase">
        <span className="flex-1 h-px bg-[#E5DFD4]" />
        <span>or</span>
        <span className="flex-1 h-px bg-[#E5DFD4]" />
      </div>

      {/* Google Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="button"
        className="w-full h-9.5 sm:h-10 rounded-xl border border-[#D9D2C7] bg-white hover:bg-[#FAF7F2] flex items-center justify-center gap-2 text-xs sm:text-[13px] font-bold text-[#141b3d] transition shadow-2xs cursor-pointer"
      >
        <GoogleIcon />
        <span>Continue with Google</span>
      </motion.button>

      {/* Footer Log In Link */}
      <p className="text-center text-[11px] sm:text-xs text-[#6B5E57] mt-3 sm:mt-3.5">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => navigate(`/${targetViewport}/login`)}
          className="font-bold text-[#F85B01] hover:text-[#C94A00] hover:underline transition cursor-pointer"
        >
          Log In
        </button>
      </p>
    </motion.div>
  );
}

/**
 * Desktop layout component for Create Account.
 */
export default function CreateAccountDesktop() {
  const [selectedCategory, setSelectedCategory] = useState("Apartment");

  return (
    <div
      className="relative w-full h-full min-h-0 flex-1 overflow-hidden bg-cover bg-center flex flex-col justify-center select-none"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Deep twilight blue backdrop matching Create Account reference image for maximum contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#061834]/95 via-[#0c2f60]/85 via-55% to-[#15437a]/30 pointer-events-none" />

      {/* Top-left decorative orange swoosh curve */}
      <div className="absolute -top-16 -left-16 w-52 h-52 rounded-full border-[14px] border-[#F85B01]/90 pointer-events-none" />

      {/* Bottom-right ambient sunset glow */}
      <div className="absolute -right-28 -bottom-28 w-[500px] h-[500px] rounded-full bg-[#F85B01]/25 blur-3xl pointer-events-none" />

      {/* Main Container - fills 100% available viewport height with zero vertical overflow */}
      <div className="relative z-10 max-w-[1360px] w-full mx-auto h-full max-h-full flex-1 grid grid-cols-1 lg:grid-cols-[1.18fr_1fr] gap-6 lg:gap-10 xl:gap-14 items-center px-6 sm:px-8 lg:px-12 py-3 lg:py-4 xl:py-6">
        {/* Left Hero Section */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center space-y-2.5 sm:space-y-3 lg:space-y-3.5 xl:space-y-4"
        >
          {/* Gully Listings Primary Wordmark Logo */}
          <div className="pt-0.5">
            <GullyLogo className="h-9 sm:h-10 lg:h-11 xl:h-12 w-auto drop-shadow-md" />
          </div>

          {/* Eyebrow Tagline */}
          <div className="flex items-center gap-2.5">
            <span className="h-[1.5px] w-8 lg:w-10 bg-white/60" />
            <span className="text-[10px] lg:text-xs tracking-[0.24em] uppercase text-white font-black drop-shadow-sm">
              {createAccountData.tagline}
            </span>
            <span className="h-[1.5px] w-8 lg:w-10 bg-white/60" />
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[40px] font-black leading-[1.12] text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            {createAccountData.headline}
            <br />
            <span>{createAccountData.headlineSub}</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-lg text-xs sm:text-[13px] lg:text-[14px] text-white/95 font-medium leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]">
            {createAccountData.subtitle}
          </p>

          {/* Property Category Cards */}
          <div className="flex gap-2.5 sm:gap-3 pt-1">
            {categories.map(({ id, label, Icon }) => {
              const isSelected = selectedCategory === id;
              return (
                <motion.button
                  key={id}
                  type="button"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(id)}
                  className={`w-18 h-18 sm:w-20 sm:h-20 lg:w-[84px] lg:h-[84px] xl:w-22 xl:h-22 rounded-2xl flex flex-col items-center justify-center gap-1.5 text-center text-[11px] lg:text-xs font-extrabold cursor-pointer transition-all duration-200 border shadow-lg backdrop-blur-md ${
                    isSelected
                      ? "bg-[#0b2447]/90 border-2 border-[#F85B01] text-white ring-2 ring-[#F85B01]/40"
                      : "bg-[#091d3a]/75 hover:bg-[#091d3a]/90 border-white/25 text-white"
                  }`}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-7.5 lg:h-7.5 text-[#F85B01] drop-shadow-xs" />
                  <span className="leading-tight px-1 text-white font-extrabold">{label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Right Form Card Section */}
        <div className="w-full flex items-center justify-center lg:justify-end">
          <CreateAccountCard />
        </div>
      </div>
    </div>
  );
}
