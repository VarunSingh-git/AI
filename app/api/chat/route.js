const OLLAMA_HOST = "https://ollama.com";
const MODEL = "gpt-oss:120b"; // swap for any model from `curl https://ollama.com/api/tags`

export async function POST(req) {
  const { messages } = await req.json();

  const res = await fetch(`${OLLAMA_HOST}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      stream: false,
    }),
  });
console.log("res",res)
  if (!res.ok) {
    const text = await res.text();
    return Response.json(
      { error: `Ollama Cloud error: ${text}` },
      { status: res.status }
    );
  }

  const data = await res.json();
  return Response.json({ reply: data.message.content });
}
