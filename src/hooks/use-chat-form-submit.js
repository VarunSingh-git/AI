import { useState } from "react";

/**
 * Centralizes all chat state: the message history, the loading flag
 * while waiting on the LLM, the current input value, and the submit
 * handler that ties them together.
 *
 * @param {(messages: Array) => Promise<string>} getAssistantResponse(messages, onChunk)
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

    console.log("nextMessages", nextMessages)

    setMessages(nextMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      {
        nextMessages && setMessages([
          ...nextMessages,
          {
            role: "assistant",
            content: "",
          },
        ]);
      }

      await getAssistantResponse(nextMessages, (chunk) => {
        setMessages((prev) => {
          const lastIndex = prev.length - 1;

          return prev.map((msg, index) =>
            index === lastIndex
              ? { ...msg, content: msg.content + chunk }
              : msg
          );
        });
      })

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
