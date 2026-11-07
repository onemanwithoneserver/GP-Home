import { Info, User, Camera, CheckCircle2 } from "lucide-react";

export interface ProfileFormValues {
  fullName: string;
  email: string;
  mobileNumber: string;
  city: string;
}

export const profileData = {
  title: "Profile",
  subtitle: "Manage your photo and personal details.",
  changePhotoLabel: "Change photo",
  photoHelperText: "JPG, PNG, or WebP · Up to 1 MB. Save your profile to apply changes.",
  fields: {
    fullNamePlaceholder: "Full name *",
    emailPlaceholder: "Email address",
    emailHelper: "Optional contact email.",
    mobileLabel: "Mobile number",
    mobileHelper: "Your current sign-in profile did not provide a mobile number.",
    cityPlaceholder: "City",
    cityHelper: "Optional.",
  },
  saveButtonLabel: "Save profile",
  savedNotice: "Profile saved.",
  defaultValues: {
    fullName: "",
    email: "",
    mobileNumber: "",
    city: "",
  } as ProfileFormValues,
};

export { Info, User, Camera, CheckCircle2 };

