import { Box, Button, Paper } from "@mui/material";
import { Message, useChat } from "ai/react";
import { XCircle } from "lucide-react";

interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
}

export const AIChatBox = ({ open, onClose }: AIChatBoxProps) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        right: 0,
        zIndex: 10,
        maxWidth: "300px",
        p: 1,
        display: open ? "block" : "none", // Only show when open is true
      }}
    >
      <Button
        onClick={onClose}
        sx={{ position: "absolute", top: 8, right: 8, p: 0, mt: 2 }}
      >
        <XCircle size={30}></XCircle>
      </Button>
      <Paper
        sx={{
          width: "300px",
          height: "400px", // Fixed height for the chat box
          backgroundColor: "white", // White background
          boxShadow: 3, // Subtle shadow to make it stand out
          borderRadius: 2, // Rounded corners
          p: 2, // Padding inside the Paper
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Add message display area here */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", marginBottom: 2 }}>
          {/* Messages would be displayed here */}
          {messages.map((msg, index) => (
            <ChatMessage message={msg} key={msg.id} />
          ))}
        </Box>

        {/* Add input area here */}
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleSubmit}
              style={{
                flexGrow: 1,
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginRight: "8px",
                background: "white",
              }}
            />
            <Button type="submit" variant="contained" size="small">
              Send
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

function ChatMessage({ message: { role, content } }: { message: Message }) {
  return (
    <Box>
      <Box>{role}</Box>
      <Box>{content}</Box>
    </Box>
  );
}
