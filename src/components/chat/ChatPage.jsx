"use client";

import { ArrowUp } from "lucide-react";
import Textarea from "@/components/ui/Textarea";
import ChatList from "@/components/chat/ChatList";
import useEnterSubmit from "@/hooks/use-enter-submit";
import useFocusOnSlashPress from "@/hooks/use-focus-on-slash-press";
import useChatFormSubmit from "@/hooks/use-chat-form-submit";
import { getAssistantResponse } from "@/lib/getAssistantResponse";

export default function ChatPage() {
  // References from custom hooks.
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useFocusOnSlashPress();

  // Chat state and handlers: centralizes messages, loading state,
  // the submit handler, and the input value.
  const { messages, isLoading, handleSubmit, inputValue, setInputValue } =
    useChatFormSubmit(getAssistantResponse);

  const onInputChange = (event) => setInputValue(event.target.value);

  return (
    <div className="mx-auto flex h-dvh w-full max-w-3xl min-h-0 flex-col">
      {messages.length === 0 && (
        <div className="flex flex-1 min-h-0 flex-col items-center justify-center gap-2 px-6 text-center">
          <h1 className="font-display text-4xl font-medium text-stone-100">
            Hello, I&apos;m <span className="text-amber-400">Astra</span>
          </h1>
          <p className="text-stone-400">Ask me anything you want.</p>
        </div>
      )}

      {messages.length > 0 && (
        <ChatList messages={messages} isLoading={isLoading} />
      )}

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="sticky bottom-0 mb-6 mt-2 flex items-end gap-2 rounded-2xl border border-amber-500/30 bg-stone-900/90 shadow-lg shadow-black/30 backdrop-blur"
      >
        <Textarea
          ref={inputRef}
          placeholder="Type your message here..."
          value={inputValue}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          aria-label="Send message"
          className="m-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500 text-stone-950 transition disabled:cursor-not-allowed disabled:bg-stone-700 disabled:text-stone-500"
        >
          <ArrowUp size={18} />
        </button>
      </form>
    </div>
  );
}