import { ChatOllama } from "@langchain/ollama";
const OLLAMA_HOST = "https://ollama.com";
const MODEL = "gpt-oss:120b"; // swap for any model from `curl https://ollama.com/api/tags`

export const model = new ChatOllama({
    baseUrl: OLLAMA_HOST,
    model: MODEL,
    headers: {
        Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`,
    }
}
);