import HomeDesktop from "./desktop";
import HomeMobile from "./mobile";

export default function HomeView({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <div className="w-full h-full min-h-full flex flex-col">
      {isMobile ? <HomeMobile /> : <HomeDesktop />}
    </div>
  );
}
