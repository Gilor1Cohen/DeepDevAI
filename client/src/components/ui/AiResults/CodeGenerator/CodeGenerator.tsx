import type { GenerateCodeRes } from "../../../../types/tools.types";
import "./CodeGenerator.css";

export default function CodeGenerator({ data }: { data: GenerateCodeRes }) {
  return (
    <article id="CodeGenerator">
      <button
        id="CopyBtn"
        onClick={() => {
          navigator.clipboard.writeText(data.code);
        }}
      >
        Copy
      </button>
      <code id="Code">{data.code}</code>
    </article>
  );
}
