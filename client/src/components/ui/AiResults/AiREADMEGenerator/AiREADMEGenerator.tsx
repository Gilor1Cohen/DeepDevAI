import type { ReadmePreview } from "../../../../types/tools.types";
import { generateReadmeMarkdown } from "../../../helpers/generateReadmeMarkdown";
import "./AiREADMEGenerator.css";

export default function AiREADMEGenerator({ data }: { data: ReadmePreview }) {
  return (
    <article id="AiREADMEGenerator">
      <button
        id="BtnCopyMd"
        onClick={() => {
          navigator.clipboard.writeText(generateReadmeMarkdown(data));
        }}
      >
        Copy
      </button>
      <div id="ProjectTitle">
        <h1>{data.projectName}</h1>
      </div>

      <div id="ProjectDescription">
        <h2>Description</h2>
        <p>{data.description}</p>
      </div>

      <div id="ProjectTechnologies">
        <h2>Technologies</h2>
        <ul>
          {data.technologies.map((tech: string, idx: number) => (
            <li key={idx}>{tech}</li>
          ))}
        </ul>
      </div>

      {data.features && (
        <div id="ProjectFeatures">
          <h2>Features</h2>
          <ul>
            {data.features.map((f: string, idx: number) => (
              <li key={idx}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      <div id="ProjectInstallation">
        <h2>Installation</h2>
        <pre>{data.installation}</pre>
      </div>

      <div id="ProjectUsage">
        <h2>Usage</h2>
        <pre>{data.usage}</pre>
      </div>

      {data.examples && (
        <div id="ProjectExamples">
          <h2>Examples</h2>
          <pre>{data.examples}</pre>
        </div>
      )}

      {data.license && (
        <div id="ProjectLicense">
          <h2>License</h2>
          <p>{data.license}</p>
        </div>
      )}
    </article>
  );
}
