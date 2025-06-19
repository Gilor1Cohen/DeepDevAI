import type { CodeAnalysisData } from "../../../../types/tools.types";
import "./CodeReviewer.css";

export default function CodeReviewer({ data }: { data: CodeAnalysisData }) {
  console.log(data);

  return (
    <article id="CodeReviewer">
      <header className="summary">
        <h1>Summary</h1>
        <p>{data.summary}</p>
      </header>

      <section className="overview">
        <h2>Overview</h2>
        <p>
          <strong>Language:</strong> {data.language}
        </p>
        <p>
          <strong>Framework:</strong> {data.framework}
        </p>
        <p>
          <strong>Complexity:</strong> {data.complexity}
        </p>
      </section>

      <section className="original-code">
        <h2>Original Code</h2>
        <pre>
          <code>{data.code}</code>
        </pre>
      </section>

      <section className="explanation">
        <h2>Explanation</h2>
        <p>{data.explanation}</p>
      </section>

      <section className="notes">
        <h2>Notes</h2>
        <ul>
          {data.notes.map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
        </ul>
      </section>

      <section className="suggestions">
        <h2>Suggestions</h2>
        <ul>
          {data.suggestions.map((suggestion, idx) => (
            <li key={idx}>{suggestion}</li>
          ))}
        </ul>
      </section>

      <section className="refactored-code">
        <h2>Refactored Code</h2>
        <button
          className="CopyBtn"
          onClick={() => {
            navigator.clipboard.writeText(data.refactoredCode);
          }}
        >
          Copy
        </button>
        <pre>
          <code>{data.refactoredCode}</code>
        </pre>
      </section>

      <section className="unit-tests">
        <h2>Unit Tests</h2>
        <button
          className="CopyBtn"
          onClick={() => {
            navigator.clipboard.writeText(data.unitTests);
          }}
        >
          Copy
        </button>
        <pre>
          <code>{data.unitTests}</code>
        </pre>
      </section>
    </article>
  );
}
