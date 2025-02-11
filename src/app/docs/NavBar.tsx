import { UserButton } from "@clerk/nextjs";
import { Box, Button, Paper, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
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
          <Button variant="contained">Load another document</Button>
        </Box>
      </Box>
    </Paper>
  );
}
