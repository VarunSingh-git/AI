import { forwardRef } from "react";

const Textarea = forwardRef(function Textarea(
  { className = "", ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      rows={1}
      className={`w-full resize-none bg-transparent px-4 py-3.5 text-[15px] leading-relaxed
        text-stone-100 placeholder:text-stone-500 outline-none ${className}`}
      {...props}
    />
  );
});

export default Textarea;
