import type {
  interviewQuestionsGeneratorInputs,
  ToolsInputs,
} from "./tools.types";

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

export interface FormUiProps {
  placeholder: string;
  onSubmit: (data: ToolsInputs | interviewQuestionsGeneratorInputs) => void;
  loading: boolean;
  error: string | null;
}
