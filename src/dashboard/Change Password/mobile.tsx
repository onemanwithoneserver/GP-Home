import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import DashboardShell from "../Shell";
import { changePasswordData } from "./data";
import {
  Page,
  PageHeader,
  Notice,
  Card,
  TextField,
} from "../ui";

export default function ChangePasswordMobile() {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showNew, setShowNew] = useState<boolean>(false);

  return (
    <DashboardShell activeTab="change-password" isMobile={true}>
      <Page isMobile>
        <PageHeader
          isMobile
          title={changePasswordData.title}
          subtitle={changePasswordData.subtitle}
        />

        <Notice isMobile tone="warning">
          <span className="font-semibold">{changePasswordData.otpWarning}</span>
        </Notice>

        <Card className="p-4 sm:p-5">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <TextField
              isMobile
              label={changePasswordData.fields.currentPasswordPlaceholder}
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <TextField
              isMobile
              label={changePasswordData.fields.newPasswordPlaceholder}
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              helper={changePasswordData.fields.newPasswordHelper}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowNew((prev) => !prev)}
                  aria-label="Toggle new password visibility"
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[#8C7F75] hover:text-[#1E1713] transition-colors"
                >
                  {showNew ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              }
            />

            <TextField
              isMobile
              label={changePasswordData.fields.confirmPasswordPlaceholder}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="pt-1">
              <button
                type="button"
                disabled
                className="w-full h-10 rounded-xl bg-[#EBE5DC] text-[#A89C90] text-xs font-black cursor-not-allowed"
              >
                {changePasswordData.submitLabel}
              </button>
            </div>
          </form>
        </Card>
      </Page>
    </DashboardShell>
  );
}
