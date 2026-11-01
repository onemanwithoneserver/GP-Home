import { motion } from "framer-motion";
import bg from "./Bg.png";
import { CreateAccountCard } from "./desktop";
import {
  GullyLogo,
  categories,
  onboardingFeatures,
  createAccountData,
} from "./data";

export default function CreateAccountMobile() {
  return (
    <div
      className="relative w-full h-full min-h-full flex-1 overflow-x-hidden overflow-y-auto scrollbar-hide bg-cover bg-center flex flex-col justify-start select-text"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF8]/70 via-[#FDFBF8]/40 to-transparent pointer-events-none" />

      <div className="relative z-10 px-4 py-5 flex flex-col items-center gap-3.5 max-w-md mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="pt-1"
        >
          <GullyLogo className="h-10 sm:h-11 w-auto drop-shadow-xs" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="text-lg sm:text-xl font-black text-center leading-tight text-[#1E1713]"
        >
          {createAccountData.headline}{" "}
          <span className="text-[#F85B01]">{createAccountData.brand}</span>{" "}
          <span>{createAccountData.headlineSub}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.12 }}
          className="grid grid-cols-4 gap-2 w-full"
        >
          {categories.map(({ id, label, Icon }) => (
            <motion.button
              key={id}
              type="button"
              whileTap={{ scale: 0.96 }}
              className="rounded-[4px] backdrop-blur-md flex flex-col items-center justify-center gap-1 py-2 px-1 text-[10px] font-extrabold text-center transition-all duration-200 cursor-pointer border bg-white/88 border-[#E5DFD4] text-[#1E1713] hover:bg-[#FFF4ED] hover:border-[#F85B01] hover:text-[#C94A00] hover:shadow-xs hover:ring-1 hover:ring-[#F85B01]/30"
            >
              <Icon className="w-5 h-5 text-[#F85B01] shrink-0" />
              <span className="leading-tight truncate max-w-full">{label}</span>
            </motion.button>
          ))}
        </motion.div>

        <div className="w-full">
          <CreateAccountCard />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.18 }}
          className="w-full grid grid-cols-2 gap-2 p-2.5 bg-white/80 backdrop-blur-md rounded-[4px] border border-[#E5DFD4] text-[10px] font-bold text-[#1E1713]"
        >
          {onboardingFeatures.map(({ label, icon: FeatureIcon }) => (
            <div key={label} className="flex items-center gap-1.5 px-1 py-0.5">
              <span className="text-[#F85B01]">
                <FeatureIcon size={12} />
              </span>
              <span className="truncate">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
