/**
 * Home root component: coordinates header controls, light theme layout,
 * and desktop/mobile view switching.
 */
import { useState } from "react";
import Header, { type ViewMode } from "../Components/Header";
import MobileViewport from "../Components/MobileViewport";
import DesktopView from "./desktop";
import MobileView from "./mobile";

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>("mobile");
  const [view, setView] = useState<string>("Home");

  return (
    <div className="min-h-screen w-full bg-[#edf2f7] flex flex-col overflow-hidden text-slate-800">
      <Header
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        view={view}
        onViewChange={setView}
      />

      <div className="flex-1 w-full overflow-hidden flex flex-col">
        <MobileViewport isMobile={viewMode === "mobile"}>
          {viewMode === "mobile" ? <MobileView /> : <DesktopView />}
        </MobileViewport>
      </div>
    </div>
  );
}
