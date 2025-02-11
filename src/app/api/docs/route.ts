import prisma from "@/lib/db/prisma";
import { getEmbedding } from "@/lib/openai";
import { createDocSchema } from "@/lib/validation/doc";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parseResult = createDocSchema.safeParse(body);
    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { title, content } = parseResult.data;

    const { userId } = await auth();

    if (!userId) {
      return Response.json({ error: "Lacking auth" }, { status: 401 });
    }

    const doc = await prisma.doc.create({
      data: {
        title,
        content,
        userId,
      },
    });

    return Response.json({ doc }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}

async function getEmbeddingForNote(title: string, content: string | undefined) {
  return getEmbedding(title + "\n\n" + content);
}
