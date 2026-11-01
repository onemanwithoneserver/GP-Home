import CreateAccountDesktop from "./desktop";
import CreateAccountMobile from "./mobile";

export default function CreateAccount({ isMobile }: { isMobile: boolean }) {
  return (
    <div className="w-full h-full min-h-full flex flex-col">
      {isMobile ? <CreateAccountMobile /> : <CreateAccountDesktop />}
    </div>
  );
}
