import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header, { type ViewMode } from "./Components/Header";
import MobileViewport from "./Components/MobileViewport";
import HomeView from "./Home";
import HomeLoginView from "./Home Login";
import ShortlistView from "./Shortlist";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import {
  DashboardTabView,
  ProfileTabView,
  SavedPlacesTabView,
  SavedPropertiesTabView,
  PreferredInterestsTabView,
  ResponsesTabView,
  ChangePasswordTabView,
} from "./dashboard";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showHeader, setShowHeader] = useState<boolean>(true);

  const pathParts = location.pathname.toLowerCase().split("/").filter(Boolean);
  const currentViewport: ViewMode = pathParts[0] === "mobile" ? "mobile" : "desktop";

  let currentView = "Login";
  if (pathParts.some((p) => p === "dashboard")) {
    currentView = "Dashboard";
  } else if (pathParts.some((p) => p === "shortlist")) {
    currentView = "Shortlist";
  } else if (pathParts.some((p) => p === "home-login" || p === "homelogin")) {
    currentView = "Home Login";
  } else if (pathParts.some((p) => p.includes("home"))) {
    currentView = "Home";
  } else if (pathParts.some((p) => p.includes("create") || p.includes("signup"))) {
    currentView = "Create Account";
  }

  const defaultViewport: ViewMode =
    typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop";

  const getViewSlug = (viewName: string): string => {
    if (viewName === "Dashboard") return "dashboard";
    if (viewName === "Shortlist") return "shortlist";
    if (viewName === "Home Login") return "home-login";
    if (viewName === "Home") return "home";
    if (viewName === "Create Account") return "create-account";
    return "login";
  };

  const handleViewModeChange = (mode: ViewMode) => {
    if (pathParts.includes("dashboard") && pathParts.length >= 3) {
      const subTab = pathParts.slice(2).join("/");
      navigate(`/${mode}/dashboard/${subTab}`);
      return;
    }
    navigate(`/${mode}/${getViewSlug(currentView)}`);
  };

  const handleViewChange = (newView: string) => {
    navigate(`/${currentViewport}/${getViewSlug(newView)}`);
  };

  useEffect(() => {
    if (window.location.hash && window.location.hash.startsWith("#/")) {
      const hashPath = window.location.hash.replace(/^#/, "");
      window.history.replaceState(null, "", window.location.pathname);
      navigate(hashPath, { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "m") {
        e.preventDefault();
        setShowHeader((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full h-screen min-h-screen bg-[#F4EFE6] flex flex-col overflow-hidden text-[#322822]">
      <AnimatePresence initial={false}>
        {showHeader && (
          <Header
            viewMode={currentViewport}
            onViewModeChange={handleViewModeChange}
            view={currentView}
            onViewChange={handleViewChange}
            onClose={() => setShowHeader(false)}
          />
        )}
      </AnimatePresence>

      <div className="flex-1 w-full h-full min-h-0 overflow-hidden flex flex-col">
        <MobileViewport isMobile={currentViewport === "mobile"}>
          <Routes>
            <Route path="/desktop/home" element={<HomeView isMobile={false} />} />
            <Route path="/desktop/home-login" element={<HomeLoginView isMobile={false} />} />
            <Route path="/desktop/dashboard" element={<DashboardTabView isMobile={false} />} />
            <Route path="/desktop/dashboard/dashboard" element={<DashboardTabView isMobile={false} />} />
            <Route path="/desktop/dashboard/profile" element={<ProfileTabView isMobile={false} />} />
            <Route path="/desktop/dashboard/saved-places" element={<SavedPlacesTabView isMobile={false} />} />
            <Route path="/desktop/dashboard/saved-properties" element={<SavedPropertiesTabView isMobile={false} />} />
            <Route path="/desktop/dashboard/preferred-interests" element={<PreferredInterestsTabView isMobile={false} />} />
            <Route path="/desktop/dashboard/responses" element={<ResponsesTabView isMobile={false} />} />
            <Route path="/desktop/dashboard/change-password" element={<ChangePasswordTabView isMobile={false} />} />
            <Route path="/desktop/shortlist" element={<ShortlistView isMobile={false} />} />
            <Route path="/desktop/login" element={<Login isMobile={false} />} />
            <Route path="/desktop/create-account" element={<CreateAccount isMobile={false} />} />
            <Route path="/desktop/signup" element={<Navigate to="/desktop/create-account" replace />} />

            <Route path="/mobile/home" element={<HomeView isMobile={true} />} />
            <Route path="/mobile/home-login" element={<HomeLoginView isMobile={true} />} />
            <Route path="/mobile/dashboard" element={<DashboardTabView isMobile={true} />} />
            <Route path="/mobile/dashboard/dashboard" element={<DashboardTabView isMobile={true} />} />
            <Route path="/mobile/dashboard/profile" element={<ProfileTabView isMobile={true} />} />
            <Route path="/mobile/dashboard/saved-places" element={<SavedPlacesTabView isMobile={true} />} />
            <Route path="/mobile/dashboard/saved-properties" element={<SavedPropertiesTabView isMobile={true} />} />
            <Route path="/mobile/dashboard/preferred-interests" element={<PreferredInterestsTabView isMobile={true} />} />
            <Route path="/mobile/dashboard/responses" element={<ResponsesTabView isMobile={true} />} />
            <Route path="/mobile/dashboard/change-password" element={<ChangePasswordTabView isMobile={true} />} />
            <Route path="/mobile/shortlist" element={<ShortlistView isMobile={true} />} />
            <Route path="/mobile/login" element={<Login isMobile={true} />} />
            <Route path="/mobile/create-account" element={<CreateAccount isMobile={true} />} />
            <Route path="/mobile/signup" element={<Navigate to="/mobile/create-account" replace />} />

            <Route path="/desktop" element={<Navigate to="/desktop/login" replace />} />
            <Route path="/mobile" element={<Navigate to="/mobile/login" replace />} />

            <Route path="/home" element={<Navigate to={`/${defaultViewport}/home`} replace />} />
            <Route path="/home-login" element={<Navigate to={`/${defaultViewport}/home-login`} replace />} />
            <Route path="/dashboard" element={<Navigate to={`/${defaultViewport}/dashboard`} replace />} />
            <Route path="/shortlist" element={<Navigate to={`/${defaultViewport}/shortlist`} replace />} />
            <Route path="/login" element={<Navigate to={`/${defaultViewport}/login`} replace />} />
            <Route path="/create-account" element={<Navigate to={`/${defaultViewport}/create-account`} replace />} />
            <Route path="/signup" element={<Navigate to={`/${defaultViewport}/create-account`} replace />} />

            <Route path="/" element={<Navigate to={`/${defaultViewport}/login`} replace />} />
            <Route path="*" element={<Navigate to={`/${defaultViewport}/login`} replace />} />
          </Routes>
        </MobileViewport>
      </div>
    </div>
  );
}
