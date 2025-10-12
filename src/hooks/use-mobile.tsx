import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

// Enhanced hook to detect if device supports mouse interactions
export function useHasMouse() {
  const [hasMouse, setHasMouse] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Check if device has mouse pointer
    const checkMouseSupport = () => {
      const hasMousePointer = window.matchMedia('(pointer: fine)').matches;
      const isDesktop = window.innerWidth >= 1024; // Larger breakpoint for desktop
      const isTouchDevice = 'ontouchstart' in window;
      
      // Consider it has mouse if it's a desktop device with fine pointer and not primarily touch
      setHasMouse(hasMousePointer && isDesktop && !isTouchDevice);
    };

    checkMouseSupport();
    
    const resizeHandler = () => checkMouseSupport();
    window.addEventListener('resize', resizeHandler);
    
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return hasMouse;
}