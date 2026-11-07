import { useState, useRef } from "react";
import { motion } from "framer-motion";
import DashboardShell from "../Shell";
import { profileData, Info, User, Camera, CheckCircle2, type ProfileFormValues } from "./data";

export default function ProfileDesktop() {
  const [form, setForm] = useState<ProfileFormValues>(profileData.defaultValues);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [saved, setSaved] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardShell activeTab="profile" isMobile={false}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-5"
      >
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E1713] tracking-tight">
            {profileData.title}
          </h1>
          <p className="text-sm text-[#6B5E57] font-medium mt-1">
            {profileData.subtitle}
          </p>
        </div>

        <div className="w-full rounded-[6px] bg-[#E8F4FD] border border-[#CAE4FA] px-4 py-3 flex items-center gap-3 text-xs sm:text-[13px] text-[#0C517A]">
          <Info className="w-4 h-4 text-[#0284C7] shrink-0" />
          <p className="font-bold">{profileData.previewNotice}</p>
        </div>

        <form
          onSubmit={handleSave}
          className="w-full rounded-[8px] bg-white border border-[#E5DFD4] p-6 sm:p-8 space-y-6 shadow-[0_2px_10px_rgba(50,40,34,0.04)]"
        >
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[#322822] text-white flex items-center justify-center overflow-hidden shrink-0">
              {photoUrl ? (
                <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-7 h-7 stroke-[1.8]" />
              )}
            </div>

            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setPhotoUrl(URL.createObjectURL(file));
                  }
                }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-[6px] bg-white border border-[#D8D0C5] hover:border-[#F85B01] text-[#322822] hover:text-[#F85B01] text-xs sm:text-[13px] font-bold inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Camera className="w-4 h-4 text-[#6B5E57]" />
                <span>{profileData.changePhotoLabel}</span>
              </button>
              <p className="text-xs text-[#6B5E57] mt-2">
                {profileData.photoHelperText}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
            <div>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder={profileData.fields.fullNamePlaceholder}
                className="w-full h-12 rounded-[6px] border border-[#D8D0C5] focus:border-[#F85B01] px-4 text-sm text-[#1E1713] placeholder-[#6B5E57] outline-none transition-colors"
              />
            </div>

            <div>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={profileData.fields.emailPlaceholder}
                className="w-full h-12 rounded-[6px] border border-[#D8D0C5] focus:border-[#F85B01] px-4 text-sm text-[#1E1713] placeholder-[#6B5E57] outline-none transition-colors"
              />
              <p className="text-xs text-[#6B5E57] mt-1.5 px-1">
                {profileData.fields.emailHelper}
              </p>
            </div>

            <div className="relative">
              <span className="absolute -top-2 left-3 bg-white px-1 text-[11px] font-medium text-[#6B5E57]">
                {profileData.fields.mobileLabel}
              </span>
              <input
                type="tel"
                value={form.mobileNumber}
                onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}
                className="w-full h-12 rounded-[6px] border border-[#D8D0C5] focus:border-[#F85B01] px-4 text-sm text-[#1E1713] outline-none transition-colors"
              />
              <p className="text-xs text-[#6B5E57] mt-1.5 px-1">
                {profileData.fields.mobileHelper}
              </p>
            </div>

            <div>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder={profileData.fields.cityPlaceholder}
                className="w-full h-12 rounded-[6px] border border-[#D8D0C5] focus:border-[#F85B01] px-4 text-sm text-[#1E1713] placeholder-[#6B5E57] outline-none transition-colors"
              />
              <p className="text-xs text-[#6B5E57] mt-1.5 px-1">
                {profileData.fields.cityHelper}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="sheen relative overflow-hidden px-5 py-2.5 rounded-[6px] bg-gradient-to-r from-[#F85B01] to-[#FF7A00] hover:from-[#E24E00] hover:to-[#F85B01] text-white text-xs sm:text-[13px] font-bold shadow-[0_4px_14px_rgba(248,91,1,0.28)] transition-all cursor-pointer"
            >
              {profileData.saveButtonLabel}
            </motion.button>

            {saved && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#168854]">
                <CheckCircle2 className="w-4 h-4" />
                {profileData.savedNotice}
              </span>
            )}
          </div>
        </form>
      </motion.div>
    </DashboardShell>
  );
}

