import type { ComponentType } from "react";

export interface ToolBox {
  data: ToolsListItem;
  link: string;
}

export interface ToolsListItem {
  name: string;
  description: string;
  image: string;
  url: string;
  placeholder: string;
  FormComponent: ComponentType<{
    placeholder: string;
    onSubmit: (data: interviewQuestionsGeneratorInputs | ToolsInputs) => void;
    loading: boolean;
    error: string | null;
  }>;

  ResultComponent?: ComponentType<{
    data: ApiDescription | DatabaseDesigner | any;
  }>;
}

export interface ToolsInputs {
  input: string;
}

export interface interviewQuestionsGeneratorInputs {
  Topic: string;
}

export interface ApiDescription {
  apiName: string;
  overview: string;
  endpoints: Endpoint[];
  parameters: Parameter[];
  errors: ErrorResponse[];
}

interface Endpoint {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
}

interface Parameter {
  name: string;
  in: "path" | "query" | "body";
  required: boolean;
  type: "string" | "number" | "integer" | "boolean";
  description: string;
}

interface ErrorResponse {
  code: number;
  message: string;
}

export interface Field {
  name: string;
  type: string;
  constraints?: string;
  description?: string;
}

export interface Table {
  name: string;
  description?: string;
  fields: Field[];
}

export interface DatabaseDesigner {
  dbName: string;
  tables: Table[];
  error?: undefined;
}

export interface DocumentationData {
  repoName: string;
  overview: string;
  technologies: string[];
  features: string[];
  author?: string;
}

export interface InterviewQuestion {
  question: string;
  answer: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface InterviewQuestionSet {
  questions: InterviewQuestion[];
}

export interface CodeAnalysisData {
  code: string;
  language: string;
  explanation: string;
  complexity: string;
  notes: string[];
  suggestions: string[];
  refactoredCode: string;
  framework: string;
  unitTests: string;
  summary: string;
}

export interface GenerateCodeRes {
  code: string;
}

export interface Article {
  title: string;
  paragraphs: string[];
}

export interface RefinedPromptRes {
  refinedPrompt: string;
  explanation: string;
}

export interface ReadmePreview {
  projectName: string;
  description: string;
  technologies: string[];
  features?: string[];
  installation: string;
  usage: string;
  examples?: string;
  license?: string;
}

export interface UiGenerator {
  data: string;
}
