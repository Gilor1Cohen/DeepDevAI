import type { ErrorMessageProps } from "../../../types/ui.types";

import "./errorMessage.css";

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return <p className="error-message">{error}</p>;
}
