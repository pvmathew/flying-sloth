"use client";

import { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";

export default function PdfLoader() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);

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
        <a href={URL.createObjectURL(pdfFile)} download="dummy.pdf">
          Download PDF
        </a>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
}

export const PDFViewer = () => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div>
      PDF Loader
      <PdfLoader></PdfLoader>
      PDF Viewer
      <Document file={""} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};
