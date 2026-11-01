/**
 * HomeView component: renders the clean empty canvas for the Home view
 * in both desktop and mobile modes.
 */
import DesktopView from "./desktop";
import MobileView from "./mobile";

export default function HomeView({ isMobile = false }: { isMobile?: boolean }) {
  return isMobile ? <MobileView /> : <DesktopView />;
}
