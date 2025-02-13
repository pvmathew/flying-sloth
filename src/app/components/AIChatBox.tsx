import { Avatar, Box, Button, Divider, Paper, Typography } from "@mui/material";
import { Message, useChat } from "@ai-sdk/react";
import { XCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";

interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
}

export const AIChatBox = ({ open, onClose }: AIChatBoxProps) => {
  // const {
  //   messages,
  //   input,
  //   handleInputChange,
  //   handleSubmit,
  //   setMessages,
  //   isLoading,
  //   error,
  // } = useChat();

  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat();

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

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
        variant="contained"
        size="small"
        color="info"
        sx={{ position: "absolute", top: 8, left: 8, mt: 2, ml: 2 }}
        onClick={() => setMessages([])}
      >
        Clear Chat
      </Button>
      <Button
        onClick={onClose}
        sx={{ position: "absolute", top: 8, right: 8, p: 0, mt: 2, mb: 10 }}
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
          pt: 7,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Add message display area here */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            marginBottom: 2,
            p: 2,
            overflow: "auto",
          }}
          ref={scrollRef}
        >
          {/* Messages would be displayed here */}
          {messages.map((msg, index) => (
            <ChatMessage message={msg} key={msg.id} />
          ))}
        </Box>

        {/* Add input area here */}
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <form onSubmit={handleSubmit}>
            <input
              className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
              style={{
                flexGrow: 1,
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginRight: "8px",
                background: "white",
                color: "black",
              }}
            />
            <Button type="submit" variant="contained" size="small">
              Send
            </Button>
          </form>
          {/* <form onSubmit={handleSubmit}>
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
                fontColor: "black"
              }}
              ref={inputRef}  
            />
            // <Button type="submit" variant="contained" size="small">
            //   Send
            // </Button>
          </form> */}
        </Box>
      </Paper>
    </Box>
  );
};

function ChatMessage({ message: { role, content } }: { message: Message }) {
  const { user } = useUser();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: role === "assistant" ? "row" : "row-reverse",
        alignItems: "flex-start",
        marginBottom: 2,
      }}
    >
      <Avatar
        sx={{
          bgcolor: role === "assistant" ? "primary.main" : "secondary.main",
          marginRight: 1,
          marginLeft: 1,
        }}
      >
        {role === "assistant" ? "🤖" : "👤"}
      </Avatar>
      <Paper
        sx={{
          padding: 2,
          maxWidth: "70%",
          backgroundColor: role === "assistant" ? "#f5f5f5" : "#e3f2fd",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginBottom: 1 }}
        >
          {role === "assistant" ? "DocMaster9000" : user?.fullName || "User"}
        </Typography>
        <Typography variant="body1">{content}</Typography>
      </Paper>
    </Box>
  );
}
