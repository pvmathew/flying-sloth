import { Button } from "@mui/material";
import { useState } from "react";
import { AIChatBox } from "./AIChatBox";

export default function AIChatButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setChatBoxOpen(true)}>Open AI Chat</Button>
      <AIChatBox
        open={chatBoxOpen}
        onClose={() => setChatBoxOpen(false)}
      ></AIChatBox>
    </>
  );
}
