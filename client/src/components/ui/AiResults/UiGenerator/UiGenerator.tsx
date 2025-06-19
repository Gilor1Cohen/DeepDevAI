import type { UiGenerator } from "../../../../types/tools.types";
import "./UiGenerator.css";

export default function UiGenerator(data: UiGenerator) {
  return (
    <article id="UiGenerator">
      <button
        id="ImgDl"
        onClick={() => {
          const link = document.createElement("a");
          link.href = data.data;
          link.download = "downloaded.jpg";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
      >
        Download
      </button>
      <div className="UiGenerated-box">
        <img src={data.data} id="UiGenerated" />
      </div>
    </article>
  );
}
