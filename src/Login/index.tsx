/**
 * Login root: selects desktop or mobile layout with Framer Motion animations
 * and responsive full-screen coverage.
 */
import LoginDesktop from "./desktop";
import LoginMobile from "./mobile";

export default function Login({ isMobile }: { isMobile: boolean }) {
  return (
    <div className="w-full h-full min-h-full flex flex-col">
      {isMobile ? <LoginMobile /> : <LoginDesktop />}
    </div>
  );
}
