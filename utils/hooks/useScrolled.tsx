// hook to check what direction the user is scrolling

import { useState, useEffect } from "react";
export const scrollDirections = {
  UP: "up",
  DOWN: "down",
  NONE: "none",
} as const;

export type scrollDirection =
  (typeof scrollDirections)[keyof typeof scrollDirections];

export const useScrolled = () => {
  const [scrollDirection, setScrollDirection] = useState<scrollDirection>(
    scrollDirections.NONE
  );
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop) {
        setScrollDirection(scrollDirections.DOWN);
      } else if (currentScrollTop < lastScrollTop) {
        setScrollDirection(scrollDirections.UP);
      }

      setLastScrollTop(currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return scrollDirection;
};
