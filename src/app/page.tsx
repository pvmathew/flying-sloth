import { pdfjs } from "react-pdf";
import { PDFViewer } from "./components/PDFViewer";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function Home() {
  return (
    <main>
      <title>GenAI Doc Chat (PoC)</title>
      <div>This is text</div>
      <PDFViewer />
    </main>
  );
}
