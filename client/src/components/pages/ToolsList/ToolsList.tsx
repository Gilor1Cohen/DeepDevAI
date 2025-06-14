import axios from "axios";
import { ToolsList } from "../../../data/ToolsList";
import type { AuthPageProps } from "../../../types/Auth.types";
import type { ToolsListItem } from "../../../types/tools.types";
import BackBtn from "../../ui/BackBtn/BackBtn";
import ToolBox from "../../ui/ToolBox/ToolBox";
import "./ToolsList.css";

export default function ToolsListPage({ setAuth }: AuthPageProps) {
  async function RemoveToken() {
    try {
      await axios.delete("http://localhost:5174/Auth/RemoveToken", {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section id="ToolsListPage">
      <h1 id="ToolsListPage-h">Tools List</h1>

      <div
        onClick={() => {
          RemoveToken();
          setAuth(false);
        }}
      >
        <BackBtn />
      </div>

      <article id="ToolArea">
        {ToolsList.map((tool: ToolsListItem) => (
          <ToolBox key={tool.name} data={tool} link={`${tool.url}`} />
        ))}
      </article>
    </section>
  );
}
