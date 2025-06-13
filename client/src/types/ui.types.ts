export interface btnProps {
  text: string;
  link: string;
}

export interface FAQItemProps {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: (i: number) => void;
}
