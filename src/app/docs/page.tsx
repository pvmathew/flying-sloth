import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs/server";
import { Box, Container, Typography } from "@mui/material";

export default async function DocsPage() {
  const { userId } = await auth();
  if (!userId) {
    throw Error("userId undefined");
  }

  const allDocs = await prisma.doc.findMany({ where: { userId } });

  return (
    <Container sx={{ p: 4 }}>
      <title>AI Doc Chat</title>
      <Typography>User ID: {userId}</Typography>
      <Box>{JSON.stringify(allDocs)}</Box>
    </Container>
  );
}
