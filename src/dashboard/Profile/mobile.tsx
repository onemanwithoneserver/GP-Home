import { useState, useRef } from "react";
import { motion } from "framer-motion";
import DashboardShell from "../Shell";
import { profileData, Info, User, Camera, CheckCircle2, type ProfileFormValues } from "./data";

export default function ProfileMobile() {
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
    <DashboardShell activeTab="profile" isMobile={true}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="space-y-4"
      >
        <div>
          <h1 className="text-xl font-extrabold text-[#1E1713] tracking-tight">
            {profileData.title}
          </h1>
          <p className="text-xs text-[#6B5E57] font-medium mt-0.5">
            {profileData.subtitle}
          </p>
        </div>

        <div className="w-full rounded-[6px] bg-[#E8F4FD] border border-[#CAE4FA] px-3.5 py-2.5 flex items-start gap-2.5 text-xs text-[#0C517A]">
          <Info className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
          <p className="font-bold leading-relaxed">{profileData.previewNotice}</p>
        </div>

        <form
          onSubmit={handleSave}
          className="w-full rounded-[8px] bg-white border border-[#E5DFD4] p-4 space-y-4 shadow-[0_2px_8px_rgba(50,40,34,0.04)]"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-full bg-[#322822] text-white flex items-center justify-center overflow-hidden shrink-0">
              {photoUrl ? (
                <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-6 h-6 stroke-[1.8]" />
              )}
            </div>

            <div className="min-w-0">
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
                className="px-3 py-1.5 rounded-[6px] bg-white border border-[#D8D0C5] text-[#322822] text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-[#6B5E57]" />
                <span>{profileData.changePhotoLabel}</span>
              </button>
              <p className="text-[11px] text-[#6B5E57] mt-1.5 leading-snug">
                {profileData.photoHelperText}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder={profileData.fields.fullNamePlaceholder}
                className="w-full h-11 rounded-[6px] border border-[#D8D0C5] focus:border-[#F85B01] px-3.5 text-xs text-[#1E1713] placeholder-[#6B5E57] outline-none"
              />
            </div>

            <div>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={profileData.fields.emailPlaceholder}
                className="w-full h-11 rounded-[6px] border border-[#D8D0C5] focus:border-[#F85B01] px-3.5 text-xs text-[#1E1713] placeholder-[#6B5E57] outline-none"
              />
              <p className="text-[11px] text-[#6B5E57] mt-1 px-1">
                {profileData.fields.emailHelper}
              </p>
            </div>

            <div className="relative">
              <span className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-medium text-[#6B5E57]">
                {profileData.fields.mobileLabel}
              </span>
              <input
                type="tel"
                value={form.mobileNumber}
                onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}
                className="w-full h-11 rounded-[6px] border border-[#D8D0C5] focus:border-[#F85B01] px-3.5 text-xs text-[#1E1713] outline-none"
              />
              <p className="text-[11px] text-[#6B5E57] mt-1 px-1">
                {profileData.fields.mobileHelper}
              </p>
            </div>

            <div>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder={profileData.fields.cityPlaceholder}
                className="w-full h-11 rounded-[6px] border border-[#D8D0C5] focus:border-[#F85B01] px-3.5 text-xs text-[#1E1713] placeholder-[#6B5E57] outline-none"
              />
              <p className="text-[11px] text-[#6B5E57] mt-1 px-1">
                {profileData.fields.cityHelper}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="sheen relative overflow-hidden px-4 py-2.5 rounded-[6px] bg-gradient-to-r from-[#F85B01] to-[#FF7A00] text-white text-xs font-bold shadow-[0_3px_12px_rgba(248,91,1,0.28)] cursor-pointer"
            >
              {profileData.saveButtonLabel}
            </motion.button>

            {saved && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#168854]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {profileData.savedNotice}
              </span>
            )}
          </div>
        </form>
      </motion.div>
    </DashboardShell>
  );
}

