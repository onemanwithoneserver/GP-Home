import { useState } from "react";
import { motion } from "framer-motion";
import DashboardShell from "../Shell";
import { changePasswordData, Info, TriangleAlert, Eye, EyeOff } from "./data";

export default function ChangePasswordDesktop() {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showNew, setShowNew] = useState<boolean>(false);

  return (
    <DashboardShell activeTab="change-password" isMobile={false}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-5"
      >
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E1713] tracking-tight">
            {changePasswordData.title}
          </h1>
          <p className="text-sm text-[#6B5E57] font-medium mt-1">
            {changePasswordData.subtitle}
          </p>
        </div>

        <div className="w-full rounded-[6px] bg-[#E8F4FD] border border-[#CAE4FA] px-4 py-3 flex items-center gap-3 text-xs sm:text-[13px] text-[#0C517A]">
          <Info className="w-4 h-4 text-[#0284C7] shrink-0" />
          <p className="leading-relaxed">
            <span className="font-bold">{changePasswordData.previewNotice.prefix}</span>{" "}
            <span>{changePasswordData.previewNotice.body}</span>{" "}
            <span className="font-bold">{changePasswordData.previewNotice.suffix}</span>
          </p>
        </div>

        <div className="w-full rounded-[6px] bg-[#FFF4E5] border border-[#FADBB4] px-4 py-3 flex items-center gap-3 text-xs sm:text-[13px] text-[#7A3E00]">
          <TriangleAlert className="w-4 h-4 text-[#ED6C02] shrink-0" />
          <p className="font-semibold leading-relaxed">{changePasswordData.otpWarning}</p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-[465px] rounded-[8px] bg-white border border-[#E5DFD4] p-6 space-y-4 shadow-[0_2px_10px_rgba(50,40,34,0.04)]"
        >
          <div>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder={changePasswordData.fields.currentPasswordPlaceholder}
              className="w-full h-12 rounded-[6px] border border-[#D8D0C5] focus:border-[#F85B01] px-4 text-sm text-[#1E1713] placeholder-[#8C827A] outline-none transition-colors"
            />
          </div>

          <div>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={changePasswordData.fields.newPasswordPlaceholder}
                className="w-full h-12 rounded-[6px] border border-[#D8D0C5] focus:border-[#F85B01] pl-4 pr-11 text-sm text-[#1E1713] placeholder-[#8C827A] outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowNew((prev) => !prev)}
                aria-label="Toggle new password visibility"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C827A] hover:text-[#1E1713] cursor-pointer"
              >
                {showNew ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
            <p className="text-xs text-[#8C827A] mt-1.5 px-1">
              {changePasswordData.fields.newPasswordHelper}
            </p>
          </div>

          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={changePasswordData.fields.confirmPasswordPlaceholder}
              className="w-full h-12 rounded-[6px] border border-[#D8D0C5] focus:border-[#F85B01] px-4 text-sm text-[#1E1713] placeholder-[#8C827A] outline-none transition-colors"
            />
          </div>

          <button
            type="button"
            disabled
            className="w-full h-10.5 rounded-[6px] bg-[#E2DFDA] text-[#9C948C] text-xs sm:text-[13px] font-bold cursor-not-allowed"
          >
            {changePasswordData.submitLabel}
          </button>
        </form>
      </motion.div>
    </DashboardShell>
  );
}
