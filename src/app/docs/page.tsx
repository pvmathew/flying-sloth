import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs/server";
import { Box, Container, Typography, Card, CardContent } from "@mui/material";

export default async function DocsPage() {
  const { userId } = await auth();
  if (!userId) {
    throw Error("userId undefined");
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
          <Card key={doc.id} sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6">{doc.title}</Typography>

              <Typography variant="body2" color="text.secondary">
                {doc.content}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(doc.createdAt).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
