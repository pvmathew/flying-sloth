"use client";

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
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div>
      PDF Loader
      <PdfLoader pdfFile={pdfFile} setPdfFile={setPdfFile}></PdfLoader>
      PDF Viewer
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from({ length: numPages }).map((_, index) => {
          return (
            <Page
              key={index}
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          );
        })}
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};
