import { Info, User } from "lucide-react";
import type { DashboardTabId } from "../Shell";

export interface DashboardStatCard {
  id: string;
  label: string;
  value: number;
  targetTab: DashboardTabId;
}

export const dashboardData = {
  title: "Dashboard",
  subtitle: "Your home search, all in one place.",
  welcomeCard: {
    title: "Welcome to your buyer account",
    subtitle: "Save what matters and keep up with your property enquiries.",
    ctaLabel: "Explore properties",
  },
  stats: [
    {
      id: "saved-places",
      label: "Saved Places",
      value: 0,
      targetTab: "saved-places" as DashboardTabId,
    },
    {
      id: "saved-properties",
      label: "Saved Properties",
      value: 2,
      targetTab: "saved-properties" as DashboardTabId,
    },
    {
      id: "unread-responses",
      label: "Unread Responses",
      value: 1,
      targetTab: "responses" as DashboardTabId,
    },
  ] as DashboardStatCard[],
  interestsCard: {
    title: "Your preferred interests",
    subtitle: "Tell us the home size and move-in status you prefer.",
    actionLabel: "Edit interests",
    targetTab: "preferred-interests" as DashboardTabId,
  },
};

export { Info, User };

