import { Navigate, Route, Routes } from "react-router-dom";
import ToolsListPage from "../pages/ToolsList/ToolsList";
import { ToolsList } from "../../data/ToolsList";
import type { ToolsListItem } from "../../types/tools.types";
import ToolsPage from "../pages/ToolsPage/ToolsPage";
import type { AuthPageProps } from "../../types/Auth.types";

export default function AuthenticatedRoute({ setAuth }: AuthPageProps) {
  return (
    <Routes>
      <Route path="/" element={<ToolsListPage setAuth={setAuth} />} />
      {ToolsList.map((tool: ToolsListItem) => (
        <Route path={`${tool.url}`} element={<ToolsPage />} />
      ))}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
