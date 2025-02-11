import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = process.env.PINECONE_API_KEY;

if (!apiKey) {
  throw Error("PINECONE_API_KEY not set");
}

const pinecone = new Pinecone({ apiKey });

export const docsIndex = pinecone.Index("flying-sloth");
