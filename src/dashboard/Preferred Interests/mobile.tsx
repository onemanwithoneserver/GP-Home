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

export default function PreferredInterestsMobile() {
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
    <DashboardShell activeTab="preferred-interests" isMobile={true}>
      <Page isMobile>
        <PageHeader
          isMobile
          title={preferredInterestsData.title}
          subtitle={preferredInterestsData.subtitle}
        />

        <Card className="p-4 sm:p-5">
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <h2 className="text-sm font-bold text-[#1E1713] tracking-tight">
                {preferredInterestsData.configTitle}
              </h2>
              <p className="text-[11.5px] text-[#7A6D64] font-medium mt-0.5">
                {preferredInterestsData.configSubtitle}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {preferredInterestsData.configOptions.map((cfg) => {
                  const active = selectedConfigs.includes(cfg);
                  return (
                    <Chip
                      key={cfg}
                      isMobile
                      active={active}
                      onClick={() => toggleConfig(cfg)}
                    >
                      {cfg}
                    </Chip>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3.5">
              <TextField
                isMobile
                label={preferredInterestsData.areaPlaceholder}
                value={preferredArea}
                onChange={(e) => setPreferredArea(e.target.value)}
                helper={preferredInterestsData.areaHelper}
              />

              <SelectField
                isMobile
                label={preferredInterestsData.moveInLabel}
                value={moveInStatus}
                onChange={(e) => setMoveInStatus(e.target.value)}
                options={preferredInterestsData.moveInOptions}
              />
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-[#F2ECE4]">
              <PrimaryButton size="sm" type="submit">
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
