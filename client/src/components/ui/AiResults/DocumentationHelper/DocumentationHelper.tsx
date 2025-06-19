import type { DocumentationData } from "../../../../types/tools.types";
import "./DocumentationHelper.css";

export default function DocumentationHelper({
  data,
}: {
  data: DocumentationData;
}) {
  return (
    <article id="DocumentationHelper">
      <h1 className="repoName">{data.repoName}</h1>

      <div className="div overview">
        <h2>📄 README Summary</h2>
        <p>{data.overview}</p>
      </div>

      <div className="div technologies">
        <h2>⚙️ Technologies</h2>
        <ul>
          {data.technologies.map((tech: string) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>

      <div className="div features">
        <h2>✨ Features</h2>
        <ul>
          {data.features.map((feature: string) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>

      {data.author && (
        <div className="div author">
          <h2>👤 Author</h2>
          <p>{data.author}</p>
        </div>
      )}
    </article>
  );
}
