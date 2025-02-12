"use client";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export const NoteCard = ({ doc }) => {
  const router = useRouter();
  console.log(doc);
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch("/api/docs", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw Error("Status code: " + response.status);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("something went wrong :'(");
    }
  };
  return (
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
      <Button
        variant="outlined"
        color="error"
        onClick={() => handleDelete(doc.id)}
      >
        Delete
      </Button>
    </Card>
  );
};
