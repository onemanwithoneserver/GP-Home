import { motion } from "framer-motion";
import bg from "./Bg.png";
import { LoginCard } from "./desktop";
import { GullyLogo, categories, features, loginData } from "./data";

export default function LoginMobile() {
  return (
    <div
      className="relative w-full h-full min-h-full flex-1 overflow-x-hidden overflow-y-auto scrollbar-hide bg-cover bg-center flex flex-col justify-start select-text"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF8]/85 via-[#FDFBF8]/55 to-[#FDFBF8]/30 pointer-events-none" />

      <motion.div
        animate={{ y: [0, -15, 0], scale: [1, 1.05, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-[#F85B01]/15 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 px-4 py-6 flex flex-col items-center gap-4 max-w-md mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="pt-1"
        >
          <GullyLogo className="h-10 sm:h-11 w-auto drop-shadow-sm" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-1"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="h-[2px] w-5 bg-gradient-to-r from-[#F85B01] to-[#FF7A00] rounded-full" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#F85B01] font-extrabold">
              {loginData.tagline}
            </span>
            <span className="h-[2px] w-5 bg-gradient-to-l from-[#F85B01] to-[#FF7A00] rounded-full" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-center leading-tight text-[#1E1713] tracking-tight">
            {loginData.headline}{" "}
            <span className="text-[#F85B01] drop-shadow-sm">{loginData.brand}</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-4 gap-2 w-full"
        >
          {categories.map(({ id, label, Icon }) => (
            <motion.button
              key={id}
              type="button"
              whileTap={{ scale: 0.94 }}
              className="group rounded-[4px] backdrop-blur-lg flex flex-col items-center justify-center gap-1.5 py-2.5 px-1.5 text-[10px] font-extrabold text-center transition-all duration-300 cursor-pointer border bg-white/92 border-[#E5DFD4]/80 text-[#322822] shadow-[0_1px_3px_rgba(50,40,34,0.04)] hover:bg-[#FFF8F3] hover:border-[#F85B01]/50 hover:text-[#C94A00] hover:ring-[1.5px] hover:ring-[#F85B01]/15 active:bg-[#FFF4ED]"
            >
              <Icon className="w-5 h-5 text-[#F85B01] shrink-0 group-hover:scale-110 transition-transform duration-200" />
              <span className="leading-tight truncate max-w-full">{label}</span>
            </motion.button>
          ))}
        </motion.div>

        <div className="w-full">
          <LoginCard />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="w-full grid grid-cols-2 gap-2 p-3 bg-white/85 backdrop-blur-lg rounded-[4px] border border-[#E5DFD4]/70 shadow-[0_2px_8px_rgba(50,40,34,0.04)] text-[10px] font-bold text-[#322822]"
        >
          {features.map(({ label, icon: FeatureIcon }) => (
            <div key={label} className="flex items-center gap-2 px-1 py-0.5">
              <span className="text-[#F85B01]">
                <FeatureIcon size={14} />
              </span>
              <span className="truncate">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
