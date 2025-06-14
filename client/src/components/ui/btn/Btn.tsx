import "./Btn.css";
import type { btnProps } from "../../../types/ui.types";

export default function Btn({ text, type, isDisabled }: btnProps) {
  return (
    <button id="Btn" type={type} disabled={isDisabled}>
      {text}
    </button>
  );
}
