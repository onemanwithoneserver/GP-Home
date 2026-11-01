import DesktopView from "./desktop";
import MobileView from "./mobile";

export default function HomeView({ isMobile = false }: { isMobile?: boolean }) {
  return isMobile ? <MobileView /> : <DesktopView />;
}
