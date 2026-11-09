import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import bg from "./Bg.png";
import { GullyLogo, categories, features, loginData } from "./data";

type Tab = "email" | "phone";

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

function BackgroundWaves() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <div className="absolute inset-x-0 bottom-0 h-48 sm:h-64 lg:h-80 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[200%] h-full flex"
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 2880 280"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient id="loginWaveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F85B01" stopOpacity="0.08" />
                <stop offset="30%" stopColor="#FF7A00" stopOpacity="0.14" />
                <stop offset="60%" stopColor="#F85B01" stopOpacity="0.09" />
                <stop offset="100%" stopColor="#FF7A00" stopOpacity="0.14" />
              </linearGradient>
            </defs>
            <path
              d="M0 120 C 360 40, 720 200, 1080 120 C 1440 40, 1800 200, 2160 120 C 2520 40, 2880 200, 3240 120 L 3240 280 L 0 280 Z"
              fill="url(#loginWaveGrad1)"
            />
          </svg>
        </motion.div>

        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[200%] h-full flex"
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 2880 280"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient id="loginWaveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF7A00" stopOpacity="0.06" />
                <stop offset="40%" stopColor="#F85B01" stopOpacity="0.10" />
                <stop offset="80%" stopColor="#FF9E40" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#F85B01" stopOpacity="0.10" />
              </linearGradient>
            </defs>
            <path
              d="M0 160 C 480 80, 960 220, 1440 150 C 1920 80, 2400 220, 2880 150 C 3360 80, 3840 220, 4320 150 L 4320 280 L 0 280 Z"
              fill="url(#loginWaveGrad2)"
            />
          </svg>
        </motion.div>

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[200%] h-full flex"
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 2880 280"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient id="loginContourGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F85B01" stopOpacity="0.18" />
                <stop offset="50%" stopColor="#FF7A00" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#F85B01" stopOpacity="0.18" />
              </linearGradient>
            </defs>
            <path
              d="M0 110 C 360 30, 720 190, 1080 110 C 1440 30, 1800 190, 2160 110 C 2520 30, 2880 190, 3240 110"
              stroke="url(#loginContourGrad)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
            />
            <path
              d="M0 150 C 480 70, 960 210, 1440 140 C 1920 70, 2400 210, 2880 140 C 3360 70, 3840 210, 4320 140"
              stroke="url(#loginContourGrad)"
              strokeWidth="1"
              strokeOpacity="0.7"
            />
          </svg>
        </motion.div>
      </div>

      <div className="absolute inset-0">
        {[
          { top: "15%", left: "12%", size: 6, delay: 0, duration: 6 },
          { top: "28%", left: "42%", size: 4, delay: 1.5, duration: 8 },
          { top: "65%", left: "22%", size: 5, delay: 3, duration: 7 },
          { top: "45%", left: "85%", size: 5, delay: 0.8, duration: 6.5 },
          { top: "78%", left: "68%", size: 4, delay: 2.2, duration: 7.5 },
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

export function LoginCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobilePath = location.pathname.toLowerCase().includes("/mobile");
  const targetViewport = isMobilePath ? "mobile" : "desktop";

  const [tab, setTab] = useState<Tab>("email");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(`/${targetViewport}/home-login`);
    }, 900);
  };

  const handleGoogleSignIn = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
      navigate(`/${targetViewport}/home-login`);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative group/card w-full max-w-[390px] sm:max-w-[410px] lg:max-w-[420px] rounded-[4px] bg-white/97 backdrop-blur-2xl border border-[#E5DFD4]/70 shadow-[0_12px_44px_rgba(50,40,34,0.12),0_2px_12px_rgba(50,40,34,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] overflow-hidden select-text"
    >
      <div className="absolute -inset-[1px] rounded-[5px] bg-gradient-to-br from-[#F85B01]/20 via-transparent to-[#FF7A00]/15 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left" }}
        className="relative z-10 h-[3px] bg-gradient-to-r from-[#F85B01] via-[#FF7A00] to-[#F85B01]"
      />

      <div className="relative z-10 p-5 sm:p-6 lg:p-7">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-[22px] sm:text-2xl lg:text-[26px] font-bold text-[#1E1713] tracking-[-0.02em] leading-tight"
        >
          Welcome Back
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-[11px] sm:text-xs text-[#8C827A] mt-1.5 font-medium tracking-wide"
        >
          Log in to your Gully Listings account
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative mt-4 sm:mt-5 p-1 w-full max-w-[230px] sm:max-w-[250px] mx-auto rounded-[4px] bg-[#F4EFE6]/70 border border-[#E5DFD4]/80 flex items-center h-9 sm:h-9.5 shadow-[inset_0_1px_2px_rgba(50,40,34,0.04)]">
            {(["email", "phone"] as Tab[]).map((t) => {
              const isActive = tab === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 h-full rounded-[2px] text-xs font-bold cursor-pointer transition-colors duration-200 select-none ${
                    isActive ? "text-white" : "text-[#6B5E57] hover:text-[#1E1713]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeLoginTabPill"
                      className="absolute inset-0 rounded-[2px] bg-gradient-to-r from-[#F85B01] to-[#FF7A00] shadow-[0_2px_8px_rgba(248,91,1,0.25)]"
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {t === "email" ? <MailIcon /> : <PhoneIcon />}
                    <span>{t === "email" ? "Email" : "Phone"}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <form className="mt-4 sm:mt-5 space-y-3 sm:space-y-3.5" onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {tab === "email" ? (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 14 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-1.5"
              >
                <label className="block text-[11px] sm:text-xs font-bold text-[#322822] tracking-wide">
                  Email Address
                </label>
                <div className="group flex items-center gap-2.5 h-10.5 sm:h-11 px-3.5 rounded-[4px] border border-[#D9D2C7] bg-white text-[#8C827A] hover:border-[#C4BAB0] focus-within:border-[#F85B01] focus-within:ring-[2.5px] focus-within:ring-[#F85B01]/15 focus-within:shadow-[0_0_0_4px_rgba(248,91,1,0.06)] focus-within:text-[#F85B01] transition-all duration-300">
                  <MailIcon />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-transparent outline-none text-xs sm:text-[13px] text-[#1E1713] placeholder:text-[#A49890] font-medium"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="phone"
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-1.5"
              >
                <label className="block text-[11px] sm:text-xs font-bold text-[#322822] tracking-wide">
                  Phone Number
                </label>
                <div className="flex items-center rounded-[4px] border border-[#D9D2C7] bg-white overflow-hidden hover:border-[#C4BAB0] focus-within:border-[#F85B01] focus-within:ring-[2.5px] focus-within:ring-[#F85B01]/15 focus-within:shadow-[0_0_0_4px_rgba(248,91,1,0.06)] transition-all duration-300 h-10.5 sm:h-11">
                  <span className="h-full px-3 bg-[#F4EFE6]/50 border-r border-[#D9D2C7] flex items-center text-xs font-bold text-[#322822]">
                    +91
                  </span>
                  <div className="flex-1 flex items-center gap-2.5 px-3 text-[#8C827A] focus-within:text-[#F85B01]">
                    <PhoneIcon />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your mobile number"
                      className="flex-1 bg-transparent outline-none text-xs sm:text-[13px] text-[#1E1713] placeholder:text-[#A49890] font-medium"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[11px] sm:text-xs font-bold text-[#322822] tracking-wide">
                Password
              </label>
              <a
                href="#forgot-password"
                onClick={(e) => e.preventDefault()}
                className="text-[10px] sm:text-[11px] font-bold text-[#F85B01] hover:text-[#C94A00] underline underline-offset-4 decoration-[#F85B01]/40 hover:decoration-[#C94A00] transition-all duration-200"
              >
                Forgot password?
              </a>
            </div>
            <div className="flex items-center gap-2.5 h-10.5 sm:h-11 px-3.5 rounded-[4px] border border-[#D9D2C7] bg-white text-[#8C827A] hover:border-[#C4BAB0] focus-within:border-[#F85B01] focus-within:ring-[2.5px] focus-within:ring-[#F85B01]/15 focus-within:shadow-[0_0_0_4px_rgba(248,91,1,0.06)] focus-within:text-[#F85B01] transition-all duration-300">
              <LockIcon />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
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

          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.975 }}
            disabled={loading}
            type="submit"
            className="sheen relative overflow-hidden w-1/2 mx-auto h-10.5 sm:h-11 rounded-[4px] bg-gradient-to-r from-[#F85B01] to-[#FF7A00] hover:from-[#E24E00] hover:to-[#F85B01] text-white font-bold text-xs sm:text-sm shadow-[0_4px_16px_rgba(248,91,1,0.3),0_1px_4px_rgba(248,91,1,0.15)] hover:shadow-[0_6px_24px_rgba(248,91,1,0.35),0_2px_6px_rgba(248,91,1,0.2)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 mt-1"
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
              ) : (
                <motion.span
                  key="text"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                >
                  Log In
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
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
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate(`/${targetViewport}/create-account`)}
            className="font-bold text-[#F85B01] hover:text-[#C94A00] underline underline-offset-4 decoration-[#F85B01]/40 hover:decoration-[#C94A00] transition-all duration-200 cursor-pointer"
          >
            Sign Up
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

export default function LoginDesktop() {
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
            <GullyLogo className="h-11 sm:h-12 lg:h-14 xl:h-16 w-auto drop-shadow-sm" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-[2px] bg-gradient-to-r from-[#F85B01] to-[#FF7A00] rounded-full"
            />
            <span className="text-[11px] lg:text-xs tracking-[0.25em] uppercase text-[#F85B01] font-semibold select-text">
              {loginData.tagline}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[48px] font-bold leading-[1.08] text-[#1E1713] tracking-[-0.025em] select-text"
          >
            {loginData.headline}
            <br />
            {loginData.headlineSub}{" "}
            <span className="text-[#F85B01] drop-shadow-sm">{loginData.brand}</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-[13px] sm:text-sm lg:text-[15px] text-[#4A3E39] font-medium leading-[1.7] select-text"
          >
            {loginData.subtitle}
          </motion.p>

          <motion.div variants={itemVariants} className="grid grid-cols-4 gap-2.5 sm:gap-3 max-w-xl pt-1">
            {categories.map(({ id, label, Icon }) => (
              <motion.button
                key={id}
                type="button"
                whileHover={{ y: -5, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group relative h-[82px] sm:h-[90px] lg:h-[96px] rounded-[4px] flex flex-col items-center justify-center gap-2 text-center text-[10px] sm:text-[11px] lg:text-xs font-semibold cursor-pointer transition-all duration-300 border bg-white/90 backdrop-blur-lg border-[#E5DFD4]/80 text-[#322822] shadow-[0_1px_3px_rgba(50,40,34,0.04)] hover:bg-[#FFF8F3] hover:border-[#F85B01]/50 hover:text-[#C94A00] hover:ring-[2px] hover:ring-[#F85B01]/12 hover:shadow-[0_8px_24px_rgba(248,91,1,0.1)] select-text"
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#F85B01] group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300" />
                <span className="leading-tight px-1">{label}</span>
              </motion.button>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="pt-0.5 select-text">
            <div className="flex items-center divide-x divide-[#E5DFD4]/50 max-w-xl py-3 px-4 bg-white/85 backdrop-blur-lg rounded-[4px] border border-[#E5DFD4]/60 shadow-[0_2px_8px_rgba(50,40,34,0.04)]">
              {features.map(({ label, icon: FeatureIcon }) => (
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
          <LoginCard />
        </div>
      </div>
    </div>
  );
}
