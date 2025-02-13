import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { NoteCard } from "../components/NoteCard";

export default async function DocsPage() {
  const { userId } = await auth();
  if (!userId) {
    return <div>Loading</div>;
  }

  const allDocs = await prisma.doc.findMany({ where: { userId } });

  return (
    <Container sx={{ p: 4 }}>
      <title>AI Doc Chat</title>
      <Typography>Current User: {userId}</Typography>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Past Texts
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        {allDocs.map((doc) => (
          <NoteCard doc={doc}></NoteCard>
        ))}
      </Box>
    </Container>
  );
}
