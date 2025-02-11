import {
  Container,
  createTheme,
  Divider,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { PDFViewer } from "./components/PDFViewer";

export default function Home() {
  return (
    <Container sx={{ my: 2 }}>
      <title>GenAI Doc Chat (PoC)</title>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4">GenAI Doc Reader</Typography>
        <Divider />
        <PDFViewer />
      </Paper>
    </Container>
  );
}
