import ShortlistDesktop from "./desktop";
import ShortlistMobile from "./mobile";

export default function ShortlistView({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <div className="w-full h-full min-h-full flex flex-col">
      {isMobile ? <ShortlistMobile /> : <ShortlistDesktop />}
    </div>
  );
}

export { default as ShortlistDesktop } from "./desktop";
export { default as ShortlistMobile } from "./mobile";
