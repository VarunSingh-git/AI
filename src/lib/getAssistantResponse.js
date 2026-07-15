export async function getAssistantResponse(messages, onChunk) {
    const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
    });

    console.log("response", response)
    if (!response.ok) {
        throw new Error(`Chat request failed with status ${response.status}`);
    }

    const reader = response.body.getReader()
    console.log("reader",reader)
    const decoder = new TextDecoder()
    
    while (true) {
        const a = await reader.read()
        console.log("reader.read() value ---------------->",a)
        const { done, value } = a

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        onChunk(chunk)
    }
}