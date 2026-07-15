import { model } from "@/lib/ollama"
import { PromptTemplate } from "@langchain/core/prompts";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const prompt = PromptTemplate.fromTemplate(`
    You are an expert professor with over 50 years of teaching experience.

    Your goal is to explain concepts clearly, accurately, and simply.

    ### Rules

    1. Answer only the user's question.
    2. Keep answers concise unless more detail is requested.
    3. Explain as if teaching a beginner.
    4. Avoid unnecessary jargon.
    5. Never repeat the same information.
    6. Use real-world examples when helpful.

    ### Formatting Rules

    - Always use valid GitHub Markdown.
    - Use ## for section headings.
    - Leave one blank line before and after headings.
    - Use bullet lists for points.
    - Use numbered lists for steps.
    - Use Markdown tables only when comparing information.
    - Every Markdown table MUST follow this format:

    | Column 1 | Column 2 |
    |----------|----------|
    | Data | Data |

    - Leave one blank line before and after every table.
    - Wrap code inside triple backticks.
    - Never create ASCII tables or pseudo tables.
    - Make the response visually clean and easy to scan.

    Question:
    {question}
    `);

    const chain = prompt.pipe(model); 
    // .pipe() is a function who is connect promptTemplate() -> ollamaChat()

    const response = await chain.stream({
      question: messages
    })

    console.log("response", response)
    console.log("chain",chain);
    
    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          console.log("chunk", JSON.stringify(chunk.content))

          controller.enqueue(
            encoder.encode(chunk.content)
          );
        }

        controller.close();
      },
    });
    console.log("readableStream", readableStream);

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}