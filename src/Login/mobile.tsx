/**
 * Login mobile view: stacked compact hero with Gully Listings logo,
 * responsive property categories, feature highlights, and centered LoginCard.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import bg from "./Bg.png";
import { LoginCard } from "./desktop";
import { GullyLogo, categories, features, loginData } from "./data";

export default function LoginMobile() {
  const [selectedCategory, setSelectedCategory] = useState("Apartment");

  return (
    <div
      className="relative w-full h-full min-h-full flex-1 overflow-x-hidden overflow-y-auto scrollbar-hide bg-cover bg-center flex flex-col justify-start"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="relative z-10 px-4 py-5 flex flex-col items-center gap-3.5 max-w-md mx-auto w-full">
        {/* Brand Wordmark Logo */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="pt-1"
        >
          <GullyLogo className="h-10 sm:h-11 w-auto drop-shadow-xs" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="text-lg sm:text-xl font-black text-center leading-tight text-[#141b3d]"
        >
          {loginData.headline}{" "}
          <span className="text-[#F85B01]">{loginData.brand}</span>
        </motion.h1>

        {/* 4 Category Cards */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.12 }}
          className="grid grid-cols-4 gap-2 w-full"
        >
          {categories.map(({ id, label, Icon }) => {
            const isSelected = selectedCategory === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedCategory(id)}
                className={`rounded-xl backdrop-blur-md flex flex-col items-center justify-center gap-1 py-2 px-1 text-[10px] font-extrabold text-center transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-[#FFF4ED] border-[#F85B01] text-[#C94A00] shadow-xs ring-1 ring-[#F85B01]/30"
                    : "bg-white/85 border-[#E5DFD4] text-[#141b3d] hover:bg-white"
                }`}
              >
                <Icon className="w-5 h-5 text-[#F85B01] shrink-0" />
                <span className="leading-tight truncate max-w-full">{label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Login Card Component */}
        <div className="w-full">
          <LoginCard />
        </div>

        {/* Feature Highlights on Mobile */}
        <div className="w-full grid grid-cols-2 gap-2 p-2.5 bg-white/75 backdrop-blur-md rounded-xl border border-[#E5DFD4]/80 text-[10px] font-bold text-[#141b3d]">
          {features.map(({ label, icon: FeatureIcon }) => (
            <div key={label} className="flex items-center gap-1.5 px-1 py-0.5">
              <span className="text-[#F85B01]">
                <FeatureIcon size={12} />
              </span>
              <span className="truncate">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
