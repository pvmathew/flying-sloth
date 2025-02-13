import { docsIndex } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";
import { getEmbedding } from "@/lib/openai";
import { createDocSchema, deleteDocSchema } from "@/lib/validation/doc";
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

    // const doc = await prisma.doc.create({
    //   data: {
    //     title,
    //     content,
    //     userId,
    //   },
    // });

    const embedding = await getEmbeddingForNote(title, content);

    const doc = await prisma.$transaction(async (tx) => {
      const doc = await tx.doc.create({
        data: {
          title,
          content,
          userId,
        },
      });

      await docsIndex.upsert([
        {
          id: doc.id,
          values: embedding,
          metadata: { userId },
        },
      ]);

      return doc;
    });

    return Response.json({ doc }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const parseResult = deleteDocSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { id } = parseResult.data;

    const note = await prisma.doc.findUnique({ where: { id } });

    const { userId } = await auth();

    if (!userId || userId !== note?.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.doc.delete({ where: { id } });
      await docsIndex.deleteOne(id);
    });

    return Response.json({ message: "Doc deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function getEmbeddingForNote(title: string, content: string | undefined) {
  return getEmbedding(title + "\n\n" + content);
}
