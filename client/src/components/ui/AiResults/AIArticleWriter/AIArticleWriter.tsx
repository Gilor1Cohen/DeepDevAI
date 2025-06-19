import type { Article } from "../../../../types/tools.types";
import { exportArticleToPDF } from "../../../helpers/exportArticleToPDF";
import "./AIArticleWriter.css";

export default function AIArticleWriter({ data }: { data: Article }) {
  return (
    <article id="AIArticleWriter">
      <button
        id="DownloadArticle"
        onClick={() => {
          exportArticleToPDF(data);
        }}
      >
        Download
      </button>

      <div className="ai-header">
        <h1 className="ai-title">{data.title}</h1>
      </div>
      <div className="ai-content">
        {data.paragraphs.map((p: string, idx: number) => (
          <p key={idx} className="ai-paragraph">
            {p}
          </p>
        ))}
      </div>
    </article>
  );
}
