import { TextField, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NoteForm({ setOpen }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Title:", title);
    console.log("Content:", content);
    try {
      const response = await fetch("/api/docs", {
        method: "POST",
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) throw Error("Status code: " + response.status);

      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("something went wrong :'(");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "auto",
      }}
    >
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Content"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
}
