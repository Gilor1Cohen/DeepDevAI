import { jsPDF } from "jspdf";
import autoTable, { type UserOptions } from "jspdf-autotable";
import type {
  InterviewQuestion,
  InterviewQuestionSet,
} from "../../types/tools.types";

export function exportQuestionsToPDF(data: InterviewQuestionSet): void {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const margin = 40;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("Interview Questions", pageWidth / 2, margin, { align: "center" });

  const tableOptions: UserOptions = {
    startY: margin + 40,
    margin: { left: margin, right: margin },
    head: [["#", "Question", "Answer"]],
    body: data.questions.map((q: InterviewQuestion, idx: number) => [
      idx + 1,
      q.question,
      q.answer,
    ]),
    styles: {
      font: "helvetica",
      fontSize: 12,
      cellPadding: 8,
      textColor: "#333",
      halign: "left",
      valign: "middle",
    },
    headStyles: {
      fillColor: "#f0f0f0",
      textColor: "#000",
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: "#fbfbfb",
    },
    theme: "grid",
    didDrawPage: (): void => {
      const pageNumber = doc.getNumberOfPages();
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`Page ${pageNumber}`, pageWidth / 2, pageHeight - margin / 2, {
        align: "center",
      });
    },
  };

  autoTable(doc, tableOptions);
  doc.save("InterviewQuestions.pdf");
}
