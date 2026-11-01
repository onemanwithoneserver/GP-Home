/**
 * CreateAccount root component: routes to desktop or mobile layout
 * based on the active viewport container.
 */
import CreateAccountDesktop from "./desktop";
import CreateAccountMobile from "./mobile";

export default function CreateAccount({ isMobile }: { isMobile: boolean }) {
  return (
    <div className="w-full h-full min-h-full flex flex-col">
      {isMobile ? <CreateAccountMobile /> : <CreateAccountDesktop />}
    </div>
  );
}

