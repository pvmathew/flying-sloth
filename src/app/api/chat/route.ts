import { docsIndex } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";
import { getEmbedding } from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
import { ChatCompletionMessage } from "openai/resources/index.mjs";
// import { OpenAIStream, StreamingTextResponse } from "ai";
import { CoreMessage, streamText } from "ai";
import { openai } from "@ai-sdk/openai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: CoreMessage[] } = await req.json();

    const messagesTruncated = messages.slice(-6);

    const result = streamText({
      model: openai("gpt-4o"),
      messages,
    });

    return result.toDataStreamResponse();

    // // Creates an embedding from the 6 most recent mesages
    // const embedding = await getEmbedding(
    //   messagesTruncated.map((msg) => msg.content).join("\n")
    // );

    // // Embedding of the below: (ie)
    // // Hey, my favorite color is.. what again?
    // // Your favorite color is red
    // // Thank you! What is my favorite car?

    // const { userId } = await auth();

    // // Vector embeddings from pinecone
    // const vectorQueryResponse = await docsIndex.query({
    //   vector: embedding,
    //   topK: 1, //Asking pinecone to return the top 1 most relevant note to this embedding
    //   filter: [userId],
    // });

    // const relevantnotes = await prisma.doc.findMany({
    //   where: {
    //     id: {
    //       in: vectorQueryResponse.matches.map((match) => match.id),
    //     },
    //   },
    // });

    // console.log("Relevant notes found:", relevantnotes);

    // const systemMessage: ChatCompletionMessage = {
    //   role: "assistant",
    //   content:
    //     "You are an intelligent note-taking app. You answer the user's question based on their existing notes. " +
    //     "The relevant notes for this query are: \n" +
    //     relevantnotes
    //       .map((note) => `title: ${note.title}\n\ncontent:\n${note.content}`)
    //       .join("\n\n"),
    // };

    // const response = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   stream: true,
    //   messages: [systemMessage, ...messagesTruncated],
    // });

    // const stream = OpenAIStream(response);
    // return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
