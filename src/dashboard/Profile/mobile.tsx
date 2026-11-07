import { useState, useRef } from "react";
import { Camera } from "lucide-react";
import DashboardShell from "../Shell";
import { profileData, type ProfileFormValues } from "./data";
import {
  Page,
  PageHeader,
  Card,
  PrimaryButton,
  SecondaryButton,
  TextField,
  AvatarBadge,
  SavedToast,
} from "../ui";

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
      <Page isMobile>
        <PageHeader
          isMobile
          title={profileData.title}
          subtitle={profileData.subtitle}
        />

        <Card className="p-4 sm:p-5">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex items-center gap-3.5 pb-4 border-b border-[#F2ECE4]">
              <AvatarBadge photoUrl={photoUrl} size={58} dark={true} />

              <div className="space-y-1 min-w-0">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setPhotoUrl(URL.createObjectURL(file));
                  }}
                />
                <SecondaryButton
                  size="sm"
                  icon={<Camera className="w-3.5 h-3.5 text-[#F85B01]" />}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {profileData.changePhotoLabel}
                </SecondaryButton>
                <p className="text-[11px] text-[#7A6D64] font-medium leading-tight">
                  {profileData.photoHelperText}
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              <TextField
                isMobile
                label={profileData.fields.fullNamePlaceholder}
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />

              <TextField
                isMobile
                label={profileData.fields.emailPlaceholder}
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                helper={profileData.fields.emailHelper}
              />

              <TextField
                isMobile
                label={profileData.fields.mobileLabel}
                type="tel"
                value={form.mobileNumber}
                onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}
                helper={profileData.fields.mobileHelper}
              />

              <TextField
                isMobile
                label={profileData.fields.cityPlaceholder}
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                helper={profileData.fields.cityHelper}
              />
            </div>

            <div className="flex items-center gap-3 pt-1">
              <PrimaryButton size="sm" type="submit">
                {profileData.saveButtonLabel}
              </PrimaryButton>
              <SavedToast show={saved} label={profileData.savedNotice} />
            </div>
          </form>
        </Card>
      </Page>
    </DashboardShell>
  );
}
