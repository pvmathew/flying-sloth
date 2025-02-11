import { SignUp } from "@clerk/nextjs";
import { Container } from "@mui/material";

export default function SignInPage() {
  return (
    <Container sx={{ display: "flex", justifyContent: "center", my: 6 }}>
      <title>Doc Chat Signup</title>
      <SignUp />
    </Container>
  );
}
