import { ToolsList } from "../../../data/ToolsList";
import type { ToolsListItem } from "../../../types/tools.types";
import ToolBox from "../../ui/ToolBox/ToolBox";
import "./ToolsList.css";

export default function ToolsListPage() {
  return (
    <section id="ToolsListPage">
      <h1 id="ToolsListPage-h">Tools List</h1>
      <article id="ToolArea">
        {ToolsList.map((tool: ToolsListItem) => (
          <ToolBox key={tool.name} data={tool} link={`${tool.url}`} />
        ))}
      </article>
    </section>
  );
}
