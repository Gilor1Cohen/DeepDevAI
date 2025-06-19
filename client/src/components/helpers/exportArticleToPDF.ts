import { jsPDF } from "jspdf";
import type { Article } from "../../types/tools.types";

export function exportArticleToPDF(data: Article): void {
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - margin * 2;
  const lineHeight = 7;
  let y = margin;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(data.title, margin, y);
  y += lineHeight;
  doc.setDrawColor(100);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += lineHeight;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  data.paragraphs.forEach((p) => {
    const lines = doc.splitTextToSize(p, maxWidth);
    lines.forEach((line: any) => {
      if (y > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });
    y += lineHeight / 2;
  });

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150);
    const footer = `Page ${i} of ${pageCount}`;
    const textWidth = doc.getTextWidth(footer);
    doc.text(footer, pageWidth - margin - textWidth, pageHeight - margin / 2);
  }

  doc.save(`${data.title}.pdf`);
}
