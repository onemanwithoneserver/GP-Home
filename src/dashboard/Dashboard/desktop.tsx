import { useNavigate, useLocation } from "react-router-dom";
import { ArrowUpRight, Compass, Heart, MapPin, MessageSquare, Sparkles } from "lucide-react";
import DashboardShell from "../Shell";
import { dashboardData } from "./data";
import {
  Page,
  PageHeader,
  Card,
  PrimaryButton,
  SecondaryButton,
  CountUp,
  IconTile,
  AvatarBadge,
  Skyline,
} from "../ui";

export default function DashboardDesktop() {
  const navigate = useNavigate();
  const location = useLocation();
  const targetViewport = location.pathname.startsWith("/mobile") ? "mobile" : "desktop";

  const statIcons = {
    "saved-places": MapPin,
    "saved-properties": Heart,
    "unread-responses": MessageSquare,
  };

  return (
    <DashboardShell activeTab="dashboard" isMobile={false}>
      <Page>
        <PageHeader
          title={dashboardData.title}
          subtitle={dashboardData.subtitle}
        />

        <Card className="overflow-hidden p-6 sm:p-8 bg-gradient-to-br from-white via-[#FCFAF7] to-[#FFF6EE]">
          <div className="absolute right-0 bottom-0 text-[#F85B01]/[0.06] pointer-events-none">
            <Skyline className="w-80 h-28" />
          </div>
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <AvatarBadge size={68} dark={true} />
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF1E6] text-[#F85B01] text-[11px] font-extrabold mb-1.5">
                  <Sparkles className="w-3 h-3" />
                  Verified Buyer
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#1E1713] tracking-tight">
                  {dashboardData.welcomeCard.title}
                </h2>
                <p className="text-sm text-[#7A6D64] font-medium mt-1">
                  {dashboardData.welcomeCard.subtitle}
                </p>
              </div>
            </div>

            <PrimaryButton
              size="md"
              icon={<Compass className="w-4 h-4" />}
              iconRight={<ArrowUpRight className="w-4 h-4" />}
              onClick={() => navigate(`/${targetViewport}/home-login`)}
            >
              {dashboardData.welcomeCard.ctaLabel}
            </PrimaryButton>
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {dashboardData.stats.map((stat) => {
            const Icon = statIcons[stat.id as keyof typeof statIcons] || Compass;
            return (
              <Card
                key={stat.id}
                interactive
                onClick={() => navigate(`/${targetViewport}/dashboard/${stat.targetTab}`)}
                className="p-6 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <IconTile icon={Icon} tone="brand" size="md" />
                  <span className="w-7 h-7 rounded-full bg-[#FAF6F1] group-hover:bg-[#FFF1E6] text-[#A89C90] group-hover:text-[#F85B01] flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] font-bold text-[#7A6D64] uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-3xl font-black text-[#1E1713] mt-2 tracking-tight">
                  <CountUp value={stat.value} />
                </p>
              </Card>
            );
          })}
        </div>

        <Card className="p-6 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F85B01]" />
                <h3 className="text-base sm:text-lg font-black text-[#1E1713] tracking-tight">
                  {dashboardData.interestsCard.title}
                </h3>
              </div>
              <p className="text-sm text-[#7A6D64] font-medium mt-1">
                {dashboardData.interestsCard.subtitle}
              </p>
            </div>
            <SecondaryButton
              size="sm"
              iconRight={<ArrowUpRight className="w-3.5 h-3.5" />}
              onClick={() =>
                navigate(`/${targetViewport}/dashboard/${dashboardData.interestsCard.targetTab}`)
              }
            >
              {dashboardData.interestsCard.actionLabel}
            </SecondaryButton>
          </div>
        </Card>
      </Page>
    </DashboardShell>
  );
}
