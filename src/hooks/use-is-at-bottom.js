import { useEffect, useState } from "react";

/**
 * Tracks whether the page/window is currently scrolled to (or near)
 * the bottom. Used by <AutoScroll/> to decide whether it should pull
 * the view down to the latest message.
 */
export default function useIsAtBottom(offset = 40) {
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    const checkPosition = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      setIsAtBottom(scrollTop + viewportHeight >= fullHeight - offset);
    };

    checkPosition();
    window.addEventListener("scroll", checkPosition, { passive: true });
    window.addEventListener("resize", checkPosition);

    return () => {
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
    };
  }, [offset]);

  return isAtBottom;
}
