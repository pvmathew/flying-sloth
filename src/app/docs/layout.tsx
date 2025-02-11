import { Box } from "@mui/material";
import NavBar from "./NavBar";

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar></NavBar>
      <Box>{children}</Box>
    </>
  );
}
