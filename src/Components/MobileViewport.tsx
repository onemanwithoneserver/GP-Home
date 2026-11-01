/**
 * MobileViewport component: renders either a full desktop container
 * or an adaptive smartphone viewport frame that adjusts seamlessly to full height/width on mobile screens.
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
          className={`h-full w-full flex-1 overflow-hidden flex flex-col bg-[#FDFBF8] ${className}`}
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
        className="flex items-center justify-center h-full w-full flex-1 overflow-hidden box-border bg-[#F4EFE6] p-0 sm:p-4 transition-all"
      >
        <div
          ref={setRef}
          role="region"
          aria-label="Mobile Viewport Device"
          className={`
            relative shrink-0 overflow-hidden bg-white
            w-full h-full sm:h-[min(900px,calc(100%-16px))] sm:max-w-[440px]
            sm:rounded-[4px] sm:border sm:border-[#E5DFD4]
            sm:shadow-[0_16px_40px_rgba(50,40,34,0.08)]
            flex flex-col transition-all duration-300 ease-out
            ${className}
          `}
          {...props}
        >
          <div
            ref={mobileInnerRef}
            className="h-full w-full overflow-y-auto overflow-x-hidden scrollbar-hide flex flex-col bg-white sm:rounded-[4px]"
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
