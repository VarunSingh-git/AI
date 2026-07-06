import { useRef } from "react";

/**
 * Lets users submit the chat form by pressing Enter, while Shift+Enter
 * still inserts a newline. Returns a form ref (to trigger requestSubmit)
 * and a keydown handler to attach to the textarea.
 */
export default function useEnterSubmit() {
  const formRef = useRef(null);

  const onKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return { formRef, onKeyDown };
}