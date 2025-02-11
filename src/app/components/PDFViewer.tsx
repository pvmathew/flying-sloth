"use client";

import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PdfLoader({
  pdfFile,
  setPdfFile,
}: {
  pdfFile: File | null;
  setPdfFile: Dispatch<SetStateAction<File | null>>;
}) {
  useEffect(() => {
    const loadPdf = async () => {
      const response = await fetch("/dummy.pdf"); // Fetch from /public/dummy.pdf
      const blob = await response.blob();
      const file = new File([blob], "dummy.pdf", { type: "application/pdf" });
      setPdfFile(file);
    };

    loadPdf();
  }, []);

  return (
    <div>
      {pdfFile ? (
        <Button
          href={URL.createObjectURL(pdfFile)}
          download="dummy.pdf"
          variant="contained"
        >
          Download This PDF
        </Button>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
}

export const PDFViewer = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <Box sx={{ my: 2 }}>
      <PdfLoader pdfFile={pdfFile} setPdfFile={setPdfFile}></PdfLoader>
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from({ length: numPages }).map((_, index) => {
          return (
            <Box key={index + 1}>
              <Box display="flex">
                <Paper key={index} elevation={2} sx={{ py: 2, mt: 2, mb: 1 }}>
                  <Page
                    pageNumber={index + 1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Paper>
              </Box>
              <Typography>
                Page {index + 1} of {numPages}
              </Typography>
            </Box>
          );
        })}
      </Document>
    </Box>
  );
};
