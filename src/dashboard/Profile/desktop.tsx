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
      <Page>
        <PageHeader
          title={profileData.title}
          subtitle={profileData.subtitle}
        />

        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex items-center gap-5 pb-6 border-b border-[#F2ECE4]">
              <AvatarBadge photoUrl={photoUrl} size={76} dark={true} />

              <div className="space-y-1.5">
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
                  icon={<Camera className="w-4 h-4 text-[#F85B01]" />}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {profileData.changePhotoLabel}
                </SecondaryButton>
                <p className="text-xs text-[#7A6D64] font-medium">
                  {profileData.photoHelperText}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <TextField
                label={profileData.fields.fullNamePlaceholder}
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />

              <TextField
                label={profileData.fields.emailPlaceholder}
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                helper={profileData.fields.emailHelper}
              />

              <TextField
                label={profileData.fields.mobileLabel}
                type="tel"
                value={form.mobileNumber}
                onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}
                helper={profileData.fields.mobileHelper}
              />

              <TextField
                label={profileData.fields.cityPlaceholder}
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                helper={profileData.fields.cityHelper}
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <PrimaryButton type="submit">
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
