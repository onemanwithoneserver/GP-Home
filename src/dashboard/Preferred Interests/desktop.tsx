import { useState } from "react";
import DashboardShell from "../Shell";
import { preferredInterestsData } from "./data";
import {
  Page,
  PageHeader,
  Card,
  PrimaryButton,
  TextField,
  SelectField,
  Chip,
  SavedToast,
} from "../ui";

export default function PreferredInterestsDesktop() {
  const [selectedConfigs, setSelectedConfigs] = useState<string[]>([]);
  const [preferredArea, setPreferredArea] = useState<string>("");
  const [moveInStatus, setMoveInStatus] = useState<string>("Any status");
  const [saved, setSaved] = useState<boolean>(false);

  const toggleConfig = (cfg: string) => {
    setSelectedConfigs((prev) =>
      prev.includes(cfg) ? prev.filter((item) => item !== cfg) : [...prev, cfg],
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardShell activeTab="preferred-interests" isMobile={false}>
      <Page>
        <PageHeader
          title={preferredInterestsData.title}
          subtitle={preferredInterestsData.subtitle}
        />

        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSave} className="space-y-7">
            <div>
              <h2 className="text-base font-bold text-[#1E1713] tracking-tight">
                {preferredInterestsData.configTitle}
              </h2>
              <p className="text-xs text-[#7A6D64] font-medium mt-1">
                {preferredInterestsData.configSubtitle}
              </p>
              <div className="flex flex-wrap items-center gap-2.5 mt-4">
                {preferredInterestsData.configOptions.map((cfg) => {
                  const active = selectedConfigs.includes(cfg);
                  return (
                    <Chip
                      key={cfg}
                      active={active}
                      onClick={() => toggleConfig(cfg)}
                    >
                      {cfg}
                    </Chip>
                  );
                })}
              </div>
            </div>

            <div className="max-w-[420px] space-y-5">
              <TextField
                label={preferredInterestsData.areaPlaceholder}
                value={preferredArea}
                onChange={(e) => setPreferredArea(e.target.value)}
                helper={preferredInterestsData.areaHelper}
              />

              <SelectField
                label={preferredInterestsData.moveInLabel}
                value={moveInStatus}
                onChange={(e) => setMoveInStatus(e.target.value)}
                options={preferredInterestsData.moveInOptions}
              />
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-[#F2ECE4]">
              <PrimaryButton type="submit">
                {preferredInterestsData.saveButtonLabel}
              </PrimaryButton>
              <SavedToast show={saved} label={preferredInterestsData.savedNotice} />
            </div>
          </form>
        </Card>
      </Page>
    </DashboardShell>
  );
}
