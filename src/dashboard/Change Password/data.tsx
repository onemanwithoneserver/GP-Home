import { Info, TriangleAlert, Eye, EyeOff } from "lucide-react";

export const changePasswordData = {
  title: "Change Password",
  subtitle: "Manage the password for your buyer account.",
  previewNotice: {
    prefix: "Preview: properties and builder replies are examples.",
    body: "Interest changes are saved only in this browser.",
    suffix: "Saved Places uses your connected account.",
  },
  otpWarning:
    "You currently sign in with an OTP. Password changes will be available when password support is connected. No password is collected in preview.",
  fields: {
    currentPasswordPlaceholder: "Current password *",
    newPasswordPlaceholder: "New password *",
    newPasswordHelper: "At least 8 characters.",
    confirmPasswordPlaceholder: "Confirm new password *",
  },
  submitLabel: "Change password",
};

export { Info, TriangleAlert, Eye, EyeOff };
