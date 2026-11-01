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
      navigate(`/${targetViewport}/home`);
    }, 900);
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
      className="w-full max-w-[385px] sm:max-w-[400px] lg:max-w-[410px] rounded-[4px] bg-white/95 backdrop-blur-2xl border border-[#E5DFD4] shadow-[0_24px_60px_rgba(50,40,34,0.14)] p-5 sm:p-6 lg:p-7 select-text"
    >
      <motion.h2
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.35 }}
        className="text-center text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#1E1713] tracking-tight leading-tight"
      >
        Welcome Back
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.35 }}
        className="text-center text-[11px] sm:text-xs text-[#6B5E57] mt-1 font-medium"
      >
        Log in to your Gully Listings account
      </motion.p>

      <div className="relative mt-3.5 sm:mt-4 p-1 w-full max-w-[220px] sm:max-w-[240px] mx-auto rounded-[4px] bg-[#F4EFE6] border border-[#E5DFD4] flex items-center h-8.5 sm:h-9">
        {(["email", "phone"] as Tab[]).map((t) => {
          const isActive = tab === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 h-full rounded-[2px] text-xs font-bold cursor-pointer transition-colors duration-200 select-none ${
                isActive ? "text-white" : "text-[#4A3E39] hover:text-[#1E1713]"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeLoginTabPill"
                  className="absolute inset-0 rounded-[2px] bg-gradient-to-r from-[#F85B01] to-[#FF7A00] shadow-xs shadow-orange-500/25"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
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

      <form className="mt-3.5 space-y-2.5 sm:space-y-3" onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {tab === "email" ? (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="space-y-1"
            >
              <label className="block text-xs font-bold text-[#1E1713]">
                Email Address
              </label>
              <div className="flex items-center gap-2.5 h-10 px-3 rounded-[4px] border border-[#D9D2C7] bg-white text-[#8C827A] hover:border-[#B8ADA4] focus-within:border-[#F85B01] focus-within:ring-2 focus-within:ring-[#F85B01]/25 focus-within:shadow-[0_0_12px_rgba(248,91,1,0.15)] focus-within:text-[#F85B01] transition-all duration-200 shadow-2xs">
                <MailIcon />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-transparent outline-none text-xs sm:text-[13px] text-[#1E1713] placeholder:text-[#8C827A] font-medium"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="phone"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="space-y-1"
            >
              <label className="block text-xs font-bold text-[#1E1713]">
                Phone Number
              </label>
              <div className="flex items-center rounded-[4px] border border-[#D9D2C7] bg-white overflow-hidden hover:border-[#B8ADA4] focus-within:border-[#F85B01] focus-within:ring-2 focus-within:ring-[#F85B01]/25 focus-within:shadow-[0_0_12px_rgba(248,91,1,0.15)] transition-all duration-200 shadow-2xs h-10">
                <span className="h-full px-2.5 bg-[#F9F7F2] border-r border-[#D9D2C7] flex items-center text-xs font-bold text-[#1E1713]">
                  +91
                </span>
                <div className="flex-1 flex items-center gap-2 px-2.5 text-[#8C827A] focus-within:text-[#F85B01]">
                  <PhoneIcon />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your mobile number"
                    className="flex-1 bg-transparent outline-none text-xs sm:text-[13px] text-[#1E1713] placeholder:text-[#8C827A] font-medium"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-[#1E1713]">
              Password
            </label>
            <a
              href="#forgot-password"
              onClick={(e) => e.preventDefault()}
              className="text-[11px] font-bold text-[#F85B01] hover:text-[#C94A00] underline underline-offset-4 decoration-[#F85B01]/70 hover:decoration-[#C94A00] transition"
            >
              Forgot password?
            </a>
          </div>
          <div className="flex items-center gap-2.5 h-10 px-3 rounded-[4px] border border-[#D9D2C7] bg-white text-[#8C827A] hover:border-[#B8ADA4] focus-within:border-[#F85B01] focus-within:ring-2 focus-within:ring-[#F85B01]/25 focus-within:shadow-[0_0_12px_rgba(248,91,1,0.15)] focus-within:text-[#F85B01] transition-all duration-200 shadow-2xs">
            <LockIcon />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
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

        <motion.button
          whileHover={{ scale: 1.015, y: -1 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          type="submit"
          className="sheen relative overflow-hidden w-full h-10 sm:h-10.5 rounded-[4px] bg-gradient-to-r from-[#F85B01] to-[#FF7A00] hover:from-[#E24E00] hover:to-[#F85B01] text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/25 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 mt-1"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <span>Log In</span>
          )}
        </motion.button>
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
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => navigate(`/${targetViewport}/create-account`)}
          className="font-bold text-[#F85B01] hover:text-[#C94A00] underline underline-offset-4 decoration-[#F85B01]/70 hover:decoration-[#C94A00] transition cursor-pointer"
        >
          Sign Up
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

export default function LoginDesktop() {
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
          <motion.div variants={itemVariants} className="pt-0.5">
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
              {loginData.tagline}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[46px] font-black leading-[1.12] text-[#1E1713] tracking-tight select-text"
          >
            {loginData.headline}
            <br />
            {loginData.headlineSub}{" "}
            <span className="text-[#F85B01] drop-shadow-xs">{loginData.brand}</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-xs sm:text-[13px] lg:text-[15px] text-[#3E342F] font-medium leading-relaxed select-text"
          >
            {loginData.subtitle}
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
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-7.5 lg:h-7.5 text-[#F85B01] group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200" />
                <span className="leading-tight px-1">{label}</span>
              </motion.button>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="pt-0.5 select-text">
            <div className="flex items-center divide-x divide-[#D9D2C7] max-w-xl py-2.5 px-3.5 bg-white/85 backdrop-blur-md rounded-[4px] border border-[#E5DFD4] shadow-2xs">
              {features.map(({ label, icon: FeatureIcon }) => (
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
          <LoginCard />
        </div>
      </div>
    </div>
  );
}
