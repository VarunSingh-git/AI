"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowDown } from "lucide-react";
import ChatMessage from "@/components/chat/ChatMessage";

function LoadingBubble() {
  return (
    <div className="flex items-center gap-2 text-sm text-stone-400">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/90 text-[10px] font-semibold text-white">
        A
      </span>
      <span className="inline-flex items-center gap-1">
        Astra is thinking
        <span className="flex gap-0.5">
          <span className="h-1 w-1 animate-bounce rounded-full bg-stone-400 [animation-delay:-0.2s]" />
          <span className="h-1 w-1 animate-bounce rounded-full bg-stone-400 [animation-delay:-0.1s]" />
          <span className="h-1 w-1 animate-bounce rounded-full bg-stone-400" />
        </span>
      </span>
    </div>
  );
}

export default function ChatList({ messages, isLoading }) {
  const containerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const checkIsAtBottom = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setIsAtBottom(distanceFromBottom <= 48);
  }, []);

  // Track the container's own scroll position (not the window's).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    checkIsAtBottom();
    el.addEventListener("scroll", checkIsAtBottom, { passive: true });
    return () => el.removeEventListener("scroll", checkIsAtBottom);
  }, [checkIsAtBottom]);

  // Only auto-scroll to the newest message if the user was already
  // at the bottom — never yank them down while reading older messages.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (isAtBottom) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages.length, isLoading, isAtBottom]);

  const scrollToLatest = () => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div
        ref={containerRef}
        className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-4 py-6 md:px-0"
      >
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            role={message.role}
            content={message.content}
            isError={message.isError}
          />
        ))}

        {isLoading && <LoadingBubble />}
      </div>

      {!isAtBottom && (
        <button
          type="button"
          onClick={scrollToLatest}
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-stone-700 bg-stone-900/95 px-3.5 py-1.5 text-xs font-medium text-stone-200 shadow-lg shadow-black/30 backdrop-blur transition hover:bg-stone-800"
        >
          <ArrowDown size={14} />
          Scroll to latest
        </button>
      )}
    </div>
  );
}