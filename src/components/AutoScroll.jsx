import { useEffect } from "react";
import useIsAtBottom from "@/hooks/use-is-at-bottom";
import useInView from "@/hooks/use-in-view";

/**
 * Invisible sentinel placed at the end of the message list. When
 * trackVisibility is true, and this element is at the bottom of the
 * page but not currently in view (i.e., new content pushed it below
 * the fold), it smoothly scrolls itself into view.
 */
export default function AutoScroll({ trackVisibility = false, deps = [] }) {
  const isAtBottom = useIsAtBottom();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (trackVisibility && isAtBottom && !inView) {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackVisibility, isAtBottom, inView, ...deps]);

  return <div ref={ref} className="h-px w-full" aria-hidden="true" />;
}
