import type { HeaderProps } from "./data";
import DesktopHeader from "./desktop";
import MobileHeader from "./mobile";

export default function SiteHeader(props: HeaderProps) {
  if (props.isMobile) {
    return <MobileHeader {...props} />;
  }
  return <DesktopHeader {...props} />;
}

export { SiteHeader, DesktopHeader, MobileHeader };
export type { SiteNavItem, SiteAccountItem, HeaderProps } from "./data";
