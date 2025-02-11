import {
  Box,
  Container,
  createTheme,
  Divider,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { PDFViewer } from "./components/PDFViewer";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <Container sx={{ my: 2 }}>
      <title>GenAI Doc Chat (PoC)</title>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4">GenAI Doc Reader</Typography>
        <Divider />

        {/* <Box sx={{ p: 3 }}>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Box>
        <PDFViewer /> */}
      </Paper>
    </Container>
  );
}
