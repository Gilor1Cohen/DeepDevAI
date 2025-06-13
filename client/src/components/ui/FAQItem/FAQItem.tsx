import type { FAQItemProps } from "../../../types/ui.types";
import "./FAQItem.css";

export default function FAQItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
}: FAQItemProps) {
  return (
    <div className="faq-item">
      <button
        id="faq-item-btn"
        aria-expanded={isOpen}
        aria-controls={`answer-${id}`}
        className="faq-question"
        onClick={() => onToggle(id)}
      >
        <span id="faq-item-span">{question}</span>
        <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
      </button>
      {isOpen && (
        <div id={`answer-${id}`} className="faq-answer">
          {answer}
        </div>
      )}
    </div>
  );
}
