import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Avatar({ role }) {
  if (role === "user") {
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-700 text-[10px] font-semibold text-stone-200">
        U
      </span>
    );
  }
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/90 text-[10px] font-semibold text-white">
      A
    </span>
  );
}

export default function ChatMessage({ role, content, isError = false }) {
  const isUser = role === "user";

  return (
    <div className={`flex flex-col gap-1.5 ${isUser ? "items-end" : "items-start"}`}>
      <div className="flex items-center gap-2">
        {!isUser && <Avatar role={role} />}
        <span className="text-xs font-medium text-stone-400">
          {isUser ? "You" : "Astra"}
        </span>
        {isUser && <Avatar role={role} />}
      </div>

      <div
        className={`max-w-[75ch] rounded-2xl px-4 py-3 text-[15px] leading-relaxed
          ${isUser
            ? "bg-amber-500/10 border border-amber-500/20 text-stone-100"
            : isError
              ? "border border-red-500/30 bg-red-500/5 text-red-300"
              : "bg-stone-900/70 border border-stone-800 text-stone-100"
          }`}
      >
        <div className="prose prose-invert prose-sm max-w-none prose-p:my-1.5 prose-pre:bg-stone-950 prose-pre:border prose-pre:border-stone-800 prose-code:text-amber-300">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
