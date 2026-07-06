/**
 * Sends the full message history to our Next.js API route and returns
 * the assistant's reply. Keeping this in one place means ChatPage never
 * needs to know which LLM provider is behind /api/chat.
 */
export async function getAssistantResponse(messages) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
console.log("response",response)
if (!response.ok) {
  throw new Error(`Chat request failed with status ${response.status}`);
}

const data = await response.json();
console.log("data",data)
  return data.reply;
}
