import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardShell from "../Shell";
import { dashboardData, Info, User } from "./data";

export default function DashboardMobile() {
  const navigate = useNavigate();
  const location = useLocation();
  const targetViewport = location.pathname.startsWith("/mobile") ? "mobile" : "desktop";

  return (
    <DashboardShell activeTab="dashboard" isMobile={true}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="space-y-4"
      >
        <div>
          <h1 className="text-xl font-extrabold text-[#1E1713] tracking-tight">
            {dashboardData.title}
          </h1>
          <p className="text-xs text-[#6B5E57] font-medium mt-0.5">
            {dashboardData.subtitle}
          </p>
        </div>

        <div className="w-full rounded-[6px] bg-[#E8F4FD] border border-[#CAE4FA] px-3.5 py-2.5 flex items-start gap-2.5 text-xs text-[#0C517A]">
          <Info className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-bold">{dashboardData.previewNotice.prefix}</span>{" "}
            <span>{dashboardData.previewNotice.body}</span>{" "}
            <span className="font-bold">{dashboardData.previewNotice.suffix}</span>
          </p>
        </div>

        <div className="w-full rounded-[8px] bg-white border border-[#E5DFD4] p-4 space-y-3.5 shadow-[0_2px_8px_rgba(50,40,34,0.04)]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#322822] text-white flex items-center justify-center shrink-0">
              <User className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-[#1E1713]">
                {dashboardData.welcomeCard.title}
              </h2>
              <p className="text-xs text-[#6B5E57] font-medium mt-0.5">
                {dashboardData.welcomeCard.subtitle}
              </p>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => navigate(`/${targetViewport}/home-login`)}
            className="sheen relative overflow-hidden w-full py-2.5 rounded-[6px] bg-gradient-to-r from-[#F85B01] to-[#FF7A00] text-white text-xs font-bold shadow-[0_3px_12px_rgba(248,91,1,0.28)] cursor-pointer"
          >
            {dashboardData.welcomeCard.ctaLabel}
          </motion.button>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {dashboardData.stats.map((stat) => (
            <button
              key={stat.id}
              type="button"
              onClick={() => navigate(`/${targetViewport}/dashboard/${stat.targetTab}`)}
              className="rounded-[8px] bg-white border border-[#E5DFD4] p-3 text-left cursor-pointer"
            >
              <p className="text-[11px] font-medium text-[#6B5E57] leading-tight">
                {stat.label}
              </p>
              <p className="text-xl font-extrabold text-[#1E1713] mt-1.5">
                {stat.value}
              </p>
            </button>
          ))}
        </div>

        <div className="w-full rounded-[8px] bg-white border border-[#E5DFD4] p-4 shadow-[0_2px_8px_rgba(50,40,34,0.04)]">
          <h3 className="text-sm font-extrabold text-[#1E1713]">
            {dashboardData.interestsCard.title}
          </h3>
          <p className="text-xs text-[#6B5E57] font-medium mt-1.5">
            {dashboardData.interestsCard.subtitle}
          </p>
          <button
            type="button"
            onClick={() =>
              navigate(`/${targetViewport}/dashboard/${dashboardData.interestsCard.targetTab}`)
            }
            className="mt-3 inline-flex items-center px-2.5 py-1.5 rounded-[6px] text-xs font-bold text-[#F85B01] bg-[#FFF3EB] cursor-pointer"
          >
            {dashboardData.interestsCard.actionLabel}
          </button>
        </div>
      </motion.div>
    </DashboardShell>
  );
}

