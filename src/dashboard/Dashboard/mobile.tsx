import { useNavigate, useLocation } from "react-router-dom";
import { ArrowUpRight, Compass, Heart, MapPin, MessageSquare, Sparkles } from "lucide-react";
import DashboardShell from "../Shell";
import { dashboardData } from "./data";
import dashPenthouse from "../../Assets/Luxury/dashboard_penthouse.jpg";
import {
  Page,
  PageHeader,
  Card,
  PrimaryButton,
  SecondaryButton,
  CountUp,
  IconTile,
  AvatarBadge,
} from "../ui";

export default function DashboardMobile() {
  const navigate = useNavigate();
  const location = useLocation();
  const targetViewport = location.pathname.startsWith("/mobile") ? "mobile" : "desktop";

  const statIcons = {
    "saved-places": MapPin,
    "saved-properties": Heart,
    "unread-responses": MessageSquare,
  };

  return (
    <DashboardShell activeTab="dashboard" isMobile={true}>
      <Page isMobile>
        <PageHeader
          isMobile
          title={dashboardData.title}
          subtitle={dashboardData.subtitle}
        />

        <Card className="relative overflow-hidden p-4 sm:p-5 bg-gradient-to-br from-[#1E1713] via-[#2A1E18] to-[#1E1713] text-white border border-[#3A2D25] shadow-xl">
          <img
            src={dashPenthouse}
            alt="Penthouse"
            className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity animate-cinematic"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E1713]/95 via-[#1E1713]/85 to-transparent pointer-events-none" />
          <span className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#F85B01]/30 blur-2xl pointer-events-none" />
          <span className="absolute bottom-0 inset-x-0 h-px hairline-gold opacity-50" />
          <div className="relative z-10 space-y-3.5">
            <div className="flex items-center gap-3">
              <AvatarBadge size={52} dark={false} />
              <div className="min-w-0">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#FFB074] text-[10px] font-semibold mb-1">
                  <Sparkles className="w-2.5 h-2.5 text-[#F85B01]" />
                  Verified Buyer
                </div>
                <h2 className="text-sm font-bold text-white truncate">
                  {dashboardData.welcomeCard.title}
                </h2>
                <p className="text-[11.5px] text-[#D1C6BC] font-medium leading-tight truncate">
                  {dashboardData.welcomeCard.subtitle}
                </p>
              </div>
            </div>

            <PrimaryButton
              size="sm"
              className="w-full"
              icon={<Compass className="w-3.5 h-3.5" />}
              iconRight={<ArrowUpRight className="w-3.5 h-3.5" />}
              onClick={() => navigate(`/${targetViewport}/home-login`)}
            >
              {dashboardData.welcomeCard.ctaLabel}
            </PrimaryButton>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-2.5">
          {dashboardData.stats.map((stat) => {
            const Icon = statIcons[stat.id as keyof typeof statIcons] || Compass;
            return (
              <Card
                key={stat.id}
                interactive
                onClick={() => navigate(`/${targetViewport}/dashboard/${stat.targetTab}`)}
                className="p-3 text-center cursor-pointer"
              >
                <div className="flex justify-center mb-1.5">
                  <IconTile icon={Icon} tone="brand" size="sm" />
                </div>
                <p className="text-[10px] font-semibold text-[#7A6D64] uppercase tracking-wider leading-tight truncate">
                  {stat.label}
                </p>
                <p className="text-xl font-bold text-[#1E1713] mt-1 tracking-tight">
                  <CountUp value={stat.value} />
                </p>
              </Card>
            );
          })}
        </div>

        <Card className="p-4">
          <div className="space-y-2.5">
            <div>
              <h3 className="text-sm font-bold text-[#1E1713] tracking-tight">
                {dashboardData.interestsCard.title}
              </h3>
              <p className="text-[11.5px] text-[#7A6D64] font-medium mt-0.5 leading-snug">
                {dashboardData.interestsCard.subtitle}
              </p>
            </div>
            <SecondaryButton
              size="sm"
              className="w-full"
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
