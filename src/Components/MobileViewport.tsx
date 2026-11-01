/**
 * MobileViewport component: renders either a full desktop container
 * or a centered smartphone device frame with a 4px border radius and light-theme styling.
 */
import { forwardRef, type HTMLAttributes, type ReactNode, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export interface MobileViewportProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isMobile?: boolean;
}

const MobileViewport = forwardRef<HTMLDivElement, MobileViewportProps>(
  ({ children, isMobile = false, className = "", ...props }, forwardedRef) => {
    const location = useLocation();
    const internalRef = useRef<HTMLDivElement>(null);
    const mobileInnerRef = useRef<HTMLDivElement>(null);

    const setRef = (node: HTMLDivElement | null) => {
      internalRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.scrollTo(0, 0);
      }
      if (mobileInnerRef.current) {
        mobileInnerRef.current.scrollTo(0, 0);
      }
    }, [location.pathname]);

    if (!isMobile) {
      return (
        <div
          ref={setRef}
          role="main"
          aria-label="Desktop Viewport"
          className={`h-full w-full overflow-y-auto scrollbar-hide flex flex-col bg-white ${className}`}
          {...props}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        role="region"
        aria-label="Mobile Preview Environment"
        className="flex items-center justify-center h-full w-full overflow-hidden box-border bg-[#edf2f7] p-2 sm:p-4 md:p-6 transition-all"
      >
        <div
          ref={setRef}
          role="region"
          aria-label="Mobile Viewport Device"
          className={`
            relative shrink-0 overflow-hidden bg-white
            w-full h-[calc(100vh-84px)] max-w-[430px] sm:max-w-[450px]
            max-h-[890px] min-h-[620px]
            rounded-[4px] border border-slate-300/90
            shadow-[0_20px_50px_rgba(0,0,0,0.12)]
            flex flex-col transition-all duration-300 ease-out
            ${className}
          `}
          {...props}
        >
          <div
            ref={mobileInnerRef}
            className="h-full w-full overflow-y-auto overflow-x-hidden scrollbar-hide flex flex-col bg-white rounded-[4px]"
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);

MobileViewport.displayName = "MobileViewport";
export default MobileViewport;
