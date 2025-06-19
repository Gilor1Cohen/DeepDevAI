import { useLocation, useNavigate } from "react-router-dom";
import BackBtn from "../../ui/BackBtn/BackBtn";
import { useState } from "react";
import type {
  ApiDescription,
  DatabaseDesigner,
  DocumentationData,
  interviewQuestionsGeneratorInputs,
  ToolsInputs,
  ToolsListItem,
  InterviewQuestionSet,
  CodeAnalysisData,
  GenerateCodeRes,
  UiGenerator,
  ReadmePreview,
  Article,
  RefinedPromptRes,
} from "../../../types/tools.types";
import { ToolsList } from "../../../data/ToolsList";

import "./ToolsPage.css";
import axios from "axios";
import type { AuthPageProps } from "../../../types/Auth.types";

export default function ToolsPage({ setAuth }: AuthPageProps) {
  const [data, setData] = useState<
    | ApiDescription
    | DatabaseDesigner
    | DocumentationData
    | InterviewQuestionSet
    | CodeAnalysisData
    | GenerateCodeRes
    | Article
    | RefinedPromptRes
    | UiGenerator
    | ReadmePreview
    | null
  >(null);
  const [resError, setResError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const location: string = useLocation().pathname;

  const formattedTitle: string = location
    .replace(/^\//, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const tool: ToolsListItem = ToolsList.find(
    (item: ToolsListItem) => item.url === location
  )!;

  const Form = tool.FormComponent;
  const Result = tool.ResultComponent;

  const navigate = useNavigate();

  async function onFormSubmit(
    data: ToolsInputs | interviewQuestionsGeneratorInputs
  ) {
    setLoading(true);
    setResError(null);
    setData(null);

    try {
      const res = await axios.post<any>(
        `http://localhost:5174/Tools${tool.url}`,
        data,
        { withCredentials: true }
      );

      setData(res.data);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          if (err.response.status === 401) {
            setAuth(false);
            navigate("/");
          } else {
            setResError(`${err.response.data.message}`);
          }
        } else {
          setResError("Network error. Check your connection.");
        }
      } else {
        setResError("Unexpected error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="ToolsPage">
      <BackBtn />

      <h1>{formattedTitle}</h1>

      <Form
        placeholder={
          formattedTitle === "Interview Questions Generator"
            ? "Select Topic"
            : tool.placeholder
        }
        onSubmit={onFormSubmit}
        loading={loading}
        error={resError}
      />

      {data && Result && <Result data={data} />}
    </section>
  );
}
