"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { animateScroll as scroll } from "react-scroll";

function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    scroll.scrollToTop({ behavior: "smooth", duration: 500 });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
