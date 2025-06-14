export interface btnProps {
  text: string;
  type: "submit" | "reset" | "button";
  isDisabled: boolean;
}

export interface FAQItemProps {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: (i: number) => void;
}

export interface ErrorMessageProps {
  error: string;
}
