import { useState } from "react";
import { motion } from "framer-motion";
import DashboardShell from "../Shell";
import { changePasswordData, Info, TriangleAlert, Eye, EyeOff } from "./data";

export default function ChangePasswordMobile() {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showNew, setShowNew] = useState<boolean>(false);

  return (
    <DashboardShell activeTab="change-password" isMobile={true}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="space-y-4"
      >
        <div>
          <h1 className="text-xl font-extrabold text-[#1E1713] tracking-tight">
            {changePasswordData.title}
          </h1>
          <p className="text-xs text-[#6B5E57] font-medium mt-0.5">
            {changePasswordData.subtitle}
          </p>
        </div>

        <div className="w-full rounded-[6px] bg-[#E8F4FD] border border-[#CAE4FA] px-3.5 py-2.5 flex items-start gap-2.5 text-xs text-[#0C517A]">
          <Info className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-bold">{changePasswordData.previewNotice.prefix}</span>{" "}
            <span>{changePasswordData.previewNotice.body}</span>{" "}
            <span className="font-bold">{changePasswordData.previewNotice.suffix}</span>
          </p>
        </div>

        <div className="w-full rounded-[6px] bg-[#FFF4E5] border border-[#FADBB4] px-3.5 py-2.5 flex items-start gap-2.5 text-xs text-[#7A3E00]">
          <TriangleAlert className="w-4 h-4 text-[#ED6C02] shrink-0 mt-0.5" />
          <p className="font-semibold leading-relaxed">{changePasswordData.otpWarning}</p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full rounded-[8px] bg-white border border-[#E5DFD4] p-4 space-y-3.5 shadow-[0_2px_8px_rgba(50,40,34,0.04)]"
        >
          <div>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder={changePasswordData.fields.currentPasswordPlaceholder}
              className="w-full h-11 rounded-[6px] border border-[#D8D0C5] focus:border-[#F85B01] px-3.5 text-xs text-[#1E1713] placeholder-[#8C827A] outline-none"
            />
          </div>

          <div>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={changePasswordData.fields.newPasswordPlaceholder}
                className="w-full h-11 rounded-[6px] border border-[#D8D0C5] focus:border-[#F85B01] pl-3.5 pr-10 text-xs text-[#1E1713] placeholder-[#8C827A] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowNew((prev) => !prev)}
                aria-label="Toggle new password visibility"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C827A] cursor-pointer"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-[#8C827A] mt-1 px-1">
              {changePasswordData.fields.newPasswordHelper}
            </p>
          </div>

          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={changePasswordData.fields.confirmPasswordPlaceholder}
              className="w-full h-11 rounded-[6px] border border-[#D8D0C5] focus:border-[#F85B01] px-3.5 text-xs text-[#1E1713] placeholder-[#8C827A] outline-none"
            />
          </div>

          <button
            type="button"
            disabled
            className="w-full h-10 rounded-[6px] bg-[#E2DFDA] text-[#9C948C] text-xs font-bold cursor-not-allowed"
          >
            {changePasswordData.submitLabel}
          </button>
        </form>
      </motion.div>
    </DashboardShell>
  );
}
