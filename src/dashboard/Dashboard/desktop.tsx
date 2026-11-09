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

        <Card className="relative overflow-hidden p-6 sm:p-8 bg-gradient-to-br from-[#1E1713] via-[#2A1E18] to-[#1E1713] text-white border border-[#3A2D25] shadow-2xl">
          <img
            src={dashPenthouse}
            alt="Penthouse"
            className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity animate-cinematic"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E1713]/95 via-[#1E1713]/85 to-transparent pointer-events-none" />
          <span className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#F85B01]/30 blur-3xl pointer-events-none" />
          <span className="absolute bottom-0 inset-x-0 h-px hairline-gold opacity-50" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <AvatarBadge size={68} dark={false} />
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#FFB074] text-[11px] font-semibold mb-2 tracking-wide uppercase">
                  <Sparkles className="w-3 h-3 text-[#F85B01]" />
                  Verified Buyer
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {dashboardData.welcomeCard.title}
                </h2>
                <p className="text-sm text-[#D1C6BC] font-medium mt-1">
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
                <p className="text-xs sm:text-[13px] font-semibold text-[#7A6D64] uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-[#1E1713] mt-2 tracking-tight">
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
                <h3 className="text-base sm:text-lg font-bold text-[#1E1713] tracking-tight">
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
