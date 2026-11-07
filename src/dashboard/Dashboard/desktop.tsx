import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardShell from "../Shell";
import { dashboardData, Info, User } from "./data";

export default function DashboardDesktop() {
  const navigate = useNavigate();
  const location = useLocation();
  const targetViewport = location.pathname.startsWith("/mobile") ? "mobile" : "desktop";

  return (
    <DashboardShell activeTab="dashboard" isMobile={false}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-5"
      >
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E1713] tracking-tight">
            {dashboardData.title}
          </h1>
          <p className="text-sm text-[#6B5E57] font-medium mt-1">
            {dashboardData.subtitle}
          </p>
        </div>

        <div className="w-full rounded-[6px] bg-[#E8F4FD] border border-[#CAE4FA] px-4 py-3 flex items-center gap-3 text-xs sm:text-[13px] text-[#0C517A]">
          <Info className="w-4 h-4 text-[#0284C7] shrink-0" />
          <p className="leading-relaxed">
            <span className="font-bold">{dashboardData.previewNotice.prefix}</span>{" "}
            <span>{dashboardData.previewNotice.body}</span>{" "}
            <span className="font-bold">{dashboardData.previewNotice.suffix}</span>
          </p>
        </div>

        <div className="w-full rounded-[8px] bg-white border border-[#E5DFD4] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_2px_10px_rgba(50,40,34,0.04)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#322822] text-white flex items-center justify-center shrink-0">
              <User className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#1E1713]">
                {dashboardData.welcomeCard.title}
              </h2>
              <p className="text-sm text-[#6B5E57] font-medium mt-0.5">
                {dashboardData.welcomeCard.subtitle}
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => navigate(`/${targetViewport}/home-login`)}
            className="sheen relative overflow-hidden px-4 py-2.5 rounded-[6px] bg-gradient-to-r from-[#F85B01] to-[#FF7A00] hover:from-[#E24E00] hover:to-[#F85B01] text-white text-xs sm:text-[13px] font-bold shadow-[0_4px_14px_rgba(248,91,1,0.28)] transition-all cursor-pointer shrink-0"
          >
            {dashboardData.welcomeCard.ctaLabel}
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {dashboardData.stats.map((stat) => (
            <motion.button
              key={stat.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              type="button"
              onClick={() => navigate(`/${targetViewport}/dashboard/${stat.targetTab}`)}
              className="rounded-[8px] bg-white border border-[#E5DFD4] hover:border-[#F85B01]/40 p-5 text-left transition-all shadow-[0_2px_10px_rgba(50,40,34,0.03)] cursor-pointer"
            >
              <p className="text-xs sm:text-[13px] font-medium text-[#6B5E57]">
                {stat.label}
              </p>
              <p className="text-2xl font-extrabold text-[#1E1713] mt-2">
                {stat.value}
              </p>
            </motion.button>
          ))}
        </div>

        <div className="w-full rounded-[8px] bg-white border border-[#E5DFD4] p-6 shadow-[0_2px_10px_rgba(50,40,34,0.04)]">
          <h3 className="text-sm sm:text-base font-extrabold text-[#1E1713]">
            {dashboardData.interestsCard.title}
          </h3>
          <p className="text-sm text-[#6B5E57] font-medium mt-2">
            {dashboardData.interestsCard.subtitle}
          </p>
          <button
            type="button"
            onClick={() =>
              navigate(`/${targetViewport}/dashboard/${dashboardData.interestsCard.targetTab}`)
            }
            className="mt-4 inline-flex items-center px-3 py-1.5 rounded-[6px] text-xs sm:text-[13px] font-bold text-[#322822] hover:text-[#F85B01] hover:bg-[#FFF8F3] transition-colors cursor-pointer"
          >
            {dashboardData.interestsCard.actionLabel}
          </button>
        </div>
      </motion.div>
    </DashboardShell>
  );
}

