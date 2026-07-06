# Astra — Generative AI Chat UI (Next.js)

A dark-themed chat interface with Markdown rendering, an Enter-to-submit
textarea, a `/`-to-focus shortcut, and conditional autoscrolling — talking
to Ollama Cloud on the backend.

## 1. Install the extra dependencies

Your base `create-next-app` project already has React, Next.js, and
Tailwind. This UI additionally needs:

```bash
npm install react-markdown lucide-react
npm install -D @tailwindcss/typography
```

## 2. Copy these files into your project

Merge the files below into your existing project (they replace the
`app/page.jsx`, `app/layout.jsx`, `app/globals.css`, and
`app/api/chat/route.js` you built earlier, and add a new `src/` folder).

## 3. Environment variable

`.env.local` (already set up from the previous step):

```
OLLAMA_API_KEY=your_key_here
```

## 4. Path alias

If your project uses `tsconfig.json` instead of `jsconfig.json` (default
when you chose TypeScript during `create-next-app`), add this `paths`
entry to it instead of using the included `jsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 5. Run it

```bash
npm run dev
```

## Folder structure

```
genai-chat-app/
├── app/
│   ├── page.jsx              # Mounts <ChatPage/> at "/"
│   ├── layout.jsx            # Fonts + global shell
│   ├── globals.css           # Tailwind layers + scrollbar styling
│   └── api/
│       └── chat/
│           └── route.js      # POST handler → forwards to Ollama Cloud
│
├── src/
│   ├── components/
│   │   ├── chat/
│   │   │   ├── ChatPage.jsx     # Top-level page: input + message list
│   │   │   ├── ChatList.jsx     # Renders message history + AutoScroll
│   │   │   └── ChatMessage.jsx  # Single bubble, Markdown-rendered
│   │   ├── ui/
│   │   │   └── Textarea.jsx     # Styled textarea primitive
│   │   └── AutoScroll.jsx       # Scroll-to-bottom sentinel component
│   │
│   ├── hooks/
│   │   ├── use-enter-submit.js        # Enter submits, Shift+Enter = newline
│   │   ├── use-focus-on-slash-press.js# "/" focuses the input
│   │   ├── use-chat-form-submit.js    # messages, isLoading, handleSubmit
│   │   ├── use-is-at-bottom.js        # Is the window scrolled to bottom?
│   │   └── use-in-view.js             # Is an element currently visible?
│   │
│   └── lib/
│       └── getAssistantResponse.js    # fetch() wrapper around /api/chat
│
├── jsconfig.json             # "@/..." → "./src/..." path alias
├── tailwind.config.js        # Content paths + typography plugin
└── .env.local                # OLLAMA_API_KEY (not committed)
```

## How the pieces fit together

- **`ChatPage`** is the route-level component (per-screen state lives
  here via `useChatFormSubmit`).
- **`ChatList`** is a reusable component: it just renders whatever
  `messages` array it's given, plus the loading indicator.
- **`ChatMessage`** renders Markdown (bold, code blocks, lists) instead
  of a flat wall of text, using `react-markdown` + Tailwind's
  `@tailwindcss/typography` plugin.
- **`AutoScroll`** is a sentinel `<div>` at the end of the list. It uses
  `useIsAtBottom` (is the *window* scrolled to the bottom?) and
  `useInView` (is *this element* currently visible?) together: it only
  auto-scrolls when the user is already near the bottom, so scrolling
  up to reread history won't get yanked back down.

## Where to go next

- **Streaming**: switch `stream: false` → `true` in `route.js` and
  consume the response as a `ReadableStream` on the client so text
  appears token-by-token.
- **"Scroll to latest" button**: show a floating button when
  `isAtBottom` is `false` and a new message arrives, so users who
  scrolled up can jump back down on demand.
- **Markdown extras**: add `remark-gfm` to `react-markdown` for tables
  and strikethrough.
