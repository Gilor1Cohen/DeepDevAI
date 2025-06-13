import { Link } from "react-router-dom";
import type { ToolBox } from "../../../types/tools.types";
import "./ToolBox.css";

export default function ToolBox({ data, link }: ToolBox) {
  return (
    <Link id="link" to={link}>
      <div id="ToolBox">
        <div id="textTool">
          <h1 id="textTool-h">{data.name}</h1>
          <p id="textTool-p">{data.description}</p>
        </div>

        <img id="ToolBox-img" src={data.image} />
      </div>
    </Link>
  );
}
