import { useState } from "react";

/**
 * Centralizes all chat state: the message history, the loading flag
 * while waiting on the LLM, the current input value, and the submit
 * handler that ties them together.
 *
 * @param {(messages: Array) => Promise<string>} getAssistantResponse
 */
export default function useChatFormSubmit(getAssistantResponse) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    const userMessage = { role: "user", content: trimmed };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const reply = await getAssistantResponse(nextMessages);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong reaching the model. Please try again.",
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, handleSubmit, inputValue, setInputValue };
}
