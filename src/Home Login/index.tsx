import HomeLoginDesktop from "./desktop";
import HomeLoginMobile from "./mobile";

export default function HomeLoginView({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <div className="w-full h-full min-h-full flex flex-col">
      {isMobile ? <HomeLoginMobile /> : <HomeLoginDesktop />}
    </div>
  );
}

