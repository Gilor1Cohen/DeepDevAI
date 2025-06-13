import { Navigate, Route, Routes } from "react-router-dom";
import ToolsListPage from "../pages/ToolsList/ToolsList";
import { ToolsList } from "../../data/ToolsList";
import type { ToolsListItem } from "../../types/tools.types";
import ToolsPage from "../pages/ToolsPage/ToolsPage";

export default function AuthenticatedRoute() {
  return (
    <Routes>
      <Route path="/" element={<ToolsListPage />} />
      {ToolsList.map((tool: ToolsListItem) => (
        <Route path={`${tool.url}`} element={<ToolsPage />} />
      ))}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
