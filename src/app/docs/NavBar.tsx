"use client";
import { UserButton } from "@clerk/nextjs";
import { Box, Button, Modal, Paper, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import AddDocDialog from "../components/AddDocDialog";
import NoteForm from "../components/AddDocForm";
import AIChatButton from "../components/AIChatButton";

export default function NavBar() {
  const [showAddDocDialog, setShowAddDocDialog] = useState(false);
  return (
    <>
      <Paper sx={{ p: 2 }} elevation={3}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "80%",
            m: "auto",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Image src={"/doc.png"} alt="doc logo" height={30} width={30} />
            <Link href="/docs">
              <Typography fontWeight={600}>AI Doc Reader</Typography>
            </Link>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: {
                    width: "2.5rem, height: 2.5rem",
                  },
                },
              }}
            ></UserButton>
            <Button
              variant="contained"
              onClick={() => setShowAddDocDialog(true)}
            >
              Upload Text
            </Button>
            <AIChatButton />
          </Box>
        </Box>
      </Paper>
      <Modal
        sx={{ w: "500px", h: "500px", p: 4 }}
        open={showAddDocDialog}
        onClose={() => {
          setShowAddDocDialog(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={{ w: "500px", h: "500px", p: 2 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a document
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Add a document to load into this app.
          </Typography>
          <NoteForm setOpen={setShowAddDocDialog}></NoteForm>
        </Paper>
      </Modal>
    </>
  );
}
