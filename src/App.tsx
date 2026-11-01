/**
 * Main application component: configures viewport-based routes (/desktop/:view and /mobile/:view),
 * synchronizes header controls (Desktop/Mobile mode and View dropdown) directly with router URLs,
 * supports Home, Login, and Create Account views, and handles Ctrl+M shortcut for header toggling.
 */
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Header, { type ViewMode } from "./Components/Header";
import MobileViewport from "./Components/MobileViewport";
import HomeView from "./Home";
import Login from "./Login";
import CreateAccount from "./CreateAccount";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showHeader, setShowHeader] = useState<boolean>(true);

  // Parse viewport mode ("desktop" | "mobile") and active view ("Home" | "Login" | "Create Account") from URL
  const pathParts = location.pathname.toLowerCase().split("/").filter(Boolean);
  const currentViewport: ViewMode = pathParts[0] === "mobile" ? "mobile" : "desktop";

  let currentView = "Login";
  if (pathParts.some((p) => p.includes("home"))) {
    currentView = "Home";
  } else if (pathParts.some((p) => p.includes("create") || p.includes("signup"))) {
    currentView = "Create Account";
  }

  // Device-aware default viewport for initial landing redirects
  const defaultViewport: ViewMode =
    typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop";

  // Helper to map view name to URL slug
  const getViewSlug = (viewName: string): string => {
    if (viewName === "Home") return "home";
    if (viewName === "Create Account") return "create-account";
    return "login";
  };

  // Handle switching between Desktop and Mobile viewports via URL routing
  const handleViewModeChange = (mode: ViewMode) => {
    navigate(`/${mode}/${getViewSlug(currentView)}`);
  };

  // Handle switching views (Home / Login / Create Account) via URL routing
  const handleViewChange = (newView: string) => {
    navigate(`/${currentViewport}/${getViewSlug(newView)}`);
  };

  // Seamlessly migrate any legacy hash URLs to clean browser history paths
  useEffect(() => {
    if (window.location.hash && window.location.hash.startsWith("#/")) {
      const hashPath = window.location.hash.replace(/^#/, "");
      window.history.replaceState(null, "", window.location.pathname);
      navigate(hashPath, { replace: true });
    }
  }, [navigate]);

  // Keyboard shortcut Ctrl+M (or Cmd+M) to cleanly toggle header visibility
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
      {/* Top Navigation Bar with Viewport toggles and View Dropdown synced to router */}
      {showHeader && (
        <Header
          viewMode={currentViewport}
          onViewModeChange={handleViewModeChange}
          view={currentView}
          onViewChange={handleViewChange}
          onClose={() => setShowHeader(false)}
        />
      )}

      {/* Main Viewport Container with Routes - dynamically occupies 100% available space */}
      <div className="flex-1 w-full h-full min-h-0 overflow-hidden flex flex-col">
        <MobileViewport isMobile={currentViewport === "mobile"}>
          <Routes>
            {/* Desktop routes: /desktop/:view */}
            <Route path="/desktop/home" element={<HomeView isMobile={false} />} />
            <Route path="/desktop/login" element={<Login isMobile={false} />} />
            <Route path="/desktop/create-account" element={<CreateAccount isMobile={false} />} />
            <Route path="/desktop/signup" element={<Navigate to="/desktop/create-account" replace />} />

            {/* Mobile routes: /mobile/:view */}
            <Route path="/mobile/home" element={<HomeView isMobile={true} />} />
            <Route path="/mobile/login" element={<Login isMobile={true} />} />
            <Route path="/mobile/create-account" element={<CreateAccount isMobile={true} />} />
            <Route path="/mobile/signup" element={<Navigate to="/mobile/create-account" replace />} />

            {/* Viewport root aliases */}
            <Route path="/desktop" element={<Navigate to="/desktop/login" replace />} />
            <Route path="/mobile" element={<Navigate to="/mobile/login" replace />} />

            {/* Legacy & direct aliases */}
            <Route path="/home" element={<Navigate to={`/${defaultViewport}/home`} replace />} />
            <Route path="/login" element={<Navigate to={`/${defaultViewport}/login`} replace />} />
            <Route path="/create-account" element={<Navigate to={`/${defaultViewport}/create-account`} replace />} />
            <Route path="/signup" element={<Navigate to={`/${defaultViewport}/create-account`} replace />} />

            {/* Root & catch-all fallbacks */}
            <Route path="/" element={<Navigate to={`/${defaultViewport}/login`} replace />} />
            <Route path="*" element={<Navigate to={`/${defaultViewport}/login`} replace />} />
          </Routes>
        </MobileViewport>
      </div>
    </div>
  );
}
