import {
  Box,
  Button,
  Container,
  createTheme,
  Divider,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { PDFViewer } from "./components/PDFViewer";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        mt: 4,
      }}
    >
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image src={"/doc.png"} alt="doc logo" height={50} width={50} />
          <Link href="/docs">
            <Typography fontWeight={600} variant="h4">
              AI Doc Reader
            </Typography>
          </Link>
        </Box>
        <Divider></Divider>
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography>An AI-powered document reader by Pavin</Typography>

          {userId && userId.length > 0 ? (
            <>
              <Button href="/docs">Go To App</Button>
            </>
          ) : (
            <SignInButton>Login</SignInButton>
          )}
        </Box>
      </Paper>
    </Box>
  );

  // return (
  //   <Container sx={{ my: 3 }}>
  //     <title>Doc Chat Front</title>
  //     <Paper sx={{ p: 2 }}>
  //       <Typography variant="h4">GenAI Doc Reader</Typography>
  //       <Divider />

  //       {/* <Box sx={{ p: 3 }}>
  //         <SignedOut>
  //           <SignInButton />
  //         </SignedOut>
  //         <SignedIn>
  //           <UserButton />
  //         </SignedIn>
  //       </Box>
  //       <PDFViewer /> */}
  //     </Paper>
  //   </Container>
  // );
}
