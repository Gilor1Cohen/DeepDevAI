import type { RefinedPromptRes } from "../../../../types/tools.types";
import "./PromptImprover.css";

export default function PromptImprover({ data }: { data: RefinedPromptRes }) {
  return (
    <article id="PromptImprover">
      <div className="prompt-section">
        <h2>Refined Prompt</h2>
        <p>{data.refinedPrompt}</p>
      </div>

      <div className="explanation-section">
        <h3>Explanation</h3>
        <p>{data.explanation}</p>
      </div>
    </article>
  );
}
