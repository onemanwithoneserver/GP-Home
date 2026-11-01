/**
 * Create Account mobile view: stacked compact hero with Gully Listings logo,
 * responsive property category cards, and centered CreateAccountCard.
 * High-contrast twilight blue backdrop ensures crisp readability.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import bg from "../Login/Bg.png";
import { CreateAccountCard } from "./desktop";
import { GullyLogo, categories, createAccountData } from "./data";

export default function CreateAccountMobile() {
  const [selectedCategory, setSelectedCategory] = useState("Apartment");

  return (
    <div
      className="relative w-full h-full min-h-full flex-1 overflow-x-hidden overflow-y-auto scrollbar-hide bg-cover bg-center flex flex-col justify-start"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* High-contrast dusk blue backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#061834]/95 via-[#0c2f60]/90 to-[#10386c]/85 pointer-events-none" />

      <div className="relative z-10 px-4 py-5 flex flex-col items-center gap-3.5 max-w-md mx-auto w-full">
        {/* Brand Wordmark Logo */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="pt-1"
        >
          <GullyLogo className="h-10 sm:h-11 w-auto drop-shadow-md" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="text-lg sm:text-xl font-black text-center leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        >
          {createAccountData.headline}{" "}
          <span>{createAccountData.headlineSub}</span>
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
                    ? "bg-[#0b2447]/90 border-2 border-[#F85B01] text-white shadow-xs ring-1 ring-[#F85B01]/40"
                    : "bg-[#091d3a]/75 border-white/20 text-white hover:bg-[#091d3a]/90"
                }`}
              >
                <Icon className="w-5 h-5 text-[#F85B01] shrink-0 drop-shadow-xs" />
                <span className="leading-tight truncate max-w-full text-white font-extrabold">{label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Create Account Card Component */}
        <div className="w-full">
          <CreateAccountCard />
        </div>
      </div>
    </div>
  );
}
