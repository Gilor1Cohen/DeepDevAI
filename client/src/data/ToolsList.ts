import type { ToolsListItem } from "../types/tools.types";

import apiExplainer from "../images/api-explainer.png";
import databaseDesigner from "../images/database-designer.png";
import documentationHelper from "../images/documentation-helper.png";
import interviewGenerator from "../images/interview-generator.png";
import codeReviewer from "../images/code-reviewer.png";
import codeGenerator from "../images/code-generator.png";
import uiImageGenerator from "../images/ui-image-generator.png";
import articleWriter from "../images/article-writer.png";
import promptImprover from "../images/prompt-improver.png";
import readmeGenerator from "../images/readme-generator.png";
import { GenericForm } from "../components/ui/ToolsForms/GenericForm";
import { InterviewForm } from "../components/ui/ToolsForms/InterviewForm";
import ApiExplainerResult from "../components/ui/AiResults/ApiExplainerResult/ApiExplainerResult";
import DatabaseDesigner from "../components/ui/AiResults/DatabaseDesigner/DatabaseDesigner";
import DocumentationHelper from "../components/ui/AiResults/DocumentationHelper/DocumentationHelper";
import InterviewQuestions from "../components/ui/AiResults/InterviewQuestions/InterviewQuestions";
import CodeReviewer from "../components/ui/AiResults/CodeReviewer/CodeReviewer";
import CodeGenerator from "../components/ui/AiResults/CodeGenerator/CodeGenerator";
import AIArticleWriter from "../components/ui/AiResults/AIArticleWriter/AIArticleWriter";
import PromptImprover from "../components/ui/AiResults/PromptImprover/PromptImprover";
import AiREADMEGenerator from "../components/ui/AiResults/AiREADMEGenerator/AiREADMEGenerator";
import UiGenerator from "../components/ui/AiResults/UiGenerator/UiGenerator";

export const ToolsList: ToolsListItem[] = [
  {
    name: "API Explainer",
    description: "Explain how an API works given its name.",
    image: apiExplainer,
    url: "/api-explainer",
    placeholder: "Enter the API Name/Link here...",
    FormComponent: GenericForm,
    ResultComponent: ApiExplainerResult,
  },
  {
    name: "Database Designer",
    description: "Automatically generate database schema based on your needs.",
    image: databaseDesigner,
    url: "/database-designer",
    placeholder: "Describe your data model requirements (tables, fields)...",
    FormComponent: GenericForm,
    ResultComponent: DatabaseDesigner,
  },
  {
    name: "Documentation Helper",
    description: "Summarize and clarify GitHub-hosted technical documentation.",
    image: documentationHelper,
    url: "/documentation-helper",
    placeholder: "Paste the GitHub repo URL here...",
    FormComponent: GenericForm,
    ResultComponent: DocumentationHelper,
  },
  {
    name: "Interview Questions Generator",
    description:
      "Create role-specific interview questions and practice answers.",
    image: interviewGenerator,
    url: "/interview-questions-generator",
    placeholder: "",
    FormComponent: InterviewForm,
    ResultComponent: InterviewQuestions,
  },
  {
    name: "Code Reviewer",
    description:
      "Analyze and explain your code snippet, offering feedback and suggestions.",
    image: codeReviewer,
    url: "/code-reviewer",
    placeholder: "Paste your code here for review...",
    FormComponent: GenericForm,
    ResultComponent: CodeReviewer,
  },
  {
    name: "Code Generator",
    description: "Generate code based on your natural-language description.",
    image: codeGenerator,
    url: "/code-generator",
    placeholder: "Describe the functionality you need...",
    FormComponent: GenericForm,
    ResultComponent: CodeGenerator,
  },
  {
    name: "UI Image Generator",
    description: "Generate UI image from your text prompt.",
    image: uiImageGenerator,
    url: "/ui-image-generator",
    placeholder: "Describe the UI design you want...",
    FormComponent: GenericForm,
    ResultComponent: UiGenerator,
  },
  {
    name: "AI Article Writer",
    description:
      "Write articles or blog posts based on your topic description.",
    image: articleWriter,
    url: "/ai-article-writer",
    placeholder: "Describe the article topic and key points...",
    FormComponent: GenericForm,
    ResultComponent: AIArticleWriter,
  },
  {
    name: "Prompt Improver",
    description: "Refine and rewrite your prompt to get better AI results.",
    image: promptImprover,
    url: "/prompt-improver",
    placeholder: "Paste the prompt you want to improve...",
    FormComponent: GenericForm,
    ResultComponent: PromptImprover,
  },
  {
    name: "AI README Generator",
    description: "Generate a professional README.",
    image: readmeGenerator,
    url: "/ai-readme-generator",
    placeholder: "Explain about the GitHub repo here...",
    FormComponent: GenericForm,
    ResultComponent: AiREADMEGenerator,
  },
];
