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

export default function ChangePasswordDesktop() {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showNew, setShowNew] = useState<boolean>(false);

  return (
    <DashboardShell activeTab="change-password" isMobile={false}>
      <Page>
        <PageHeader
          title={changePasswordData.title}
          subtitle={changePasswordData.subtitle}
        />

        <Notice tone="warning">
          <span className="font-semibold">{changePasswordData.otpWarning}</span>
        </Notice>

        <Card className="max-w-[520px] p-6 sm:p-8">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <TextField
              label={changePasswordData.fields.currentPasswordPlaceholder}
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <TextField
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
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8C7F75] hover:text-[#1E1713] hover:bg-[#FAF6F1] transition-colors cursor-pointer"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            <TextField
              label={changePasswordData.fields.confirmPasswordPlaceholder}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="pt-2">
              <button
                type="button"
                disabled
                className="w-full h-11 rounded-xl bg-[#EBE5DC] text-[#A89C90] text-sm font-semibold cursor-not-allowed transition-colors"
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
