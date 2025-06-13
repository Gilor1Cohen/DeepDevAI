import { Link } from "react-router-dom";
import "./Btn.css";
import type { btnProps } from "../../../types/ui.types";

export default function Btn({ text, link }: btnProps) {
  return (
    <Link id="Btn-link" to={link}>
      <button id="Btn">{text}</button>
    </Link>
  );
}
