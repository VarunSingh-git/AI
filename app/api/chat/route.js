import { model } from "@/lib/ollama"



export async function POST(req) {
  const { messages } = await req.json();

  const response = await model.invoke(messages)

  console.log("response111", response)
  return Response.json({
    reply: response.content
  })
}