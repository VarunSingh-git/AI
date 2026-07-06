import { useEffect, useRef } from "react";

/**
 * Focuses the chat input whenever the user presses "/" from anywhere
 * on the page (as long as they aren't already typing in a field).
 */
export default function useFocusOnSlashPress() {
  const inputRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (event) => {
      const tag = document.activeElement?.tagName;
      const isTyping = tag === "INPUT" || tag === "TEXTAREA";

      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return inputRef;
}
