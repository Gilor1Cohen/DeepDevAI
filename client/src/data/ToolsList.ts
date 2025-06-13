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
import codeTranslator from "../images/code-translator.png";
import readmeGenerator from "../images/readme-generator.png";

export const ToolsList: ToolsListItem[] = [
  {
    name: "API Explainer",
    description:
      "Get clear, concise explanations for any API endpoint or response.",
    image: apiExplainer,
    url: "/api-explainer",
  },
  {
    name: "Database Designer",
    description:
      "Automatically generate database schema and ERDs based on your needs.",
    image: databaseDesigner,
    url: "/database-designer",
  },
  {
    name: "Documentation Helper",
    description:
      "Summarize and understand complex technical documentation with ease.",
    image: documentationHelper,
    url: "/documentation-helper",
  },
  {
    name: "Interview Questions Generator",
    description:
      "Create role-specific interview questions and practice answers.",
    image: interviewGenerator,
    url: "/interview-questions-generator",
  },
  {
    name: "Code Reviewer",
    description: "Get feedback and suggestions on your code using AI.",
    image: codeReviewer,
    url: "/code-reviewer",
  },
  {
    name: "Code Generator",
    description:
      "Generate complete code snippets or full modules from natural language.",
    image: codeGenerator,
    url: "/code-generator",
  },
  {
    name: "UI Image Generator",
    description:
      "Generate beautiful UI concepts and wireframes using text prompts.",
    image: uiImageGenerator,
    url: "/ui-image-generator",
  },
  {
    name: "AI Article Writer",
    description: "Create engaging articles or blog posts in seconds using AI.",
    image: articleWriter,
    url: "/ai-article-writer",
  },
  {
    name: "Prompt Improver",
    description: "Improve and rewrite prompts to get better AI results",
    image: promptImprover,
    url: "/prompt-improver",
  },
  {
    name: "Code Translator",
    description:
      "Translate code between different programming languages accurately.",
    image: codeTranslator,
    url: "/code-translator",
  },
  {
    name: "AI README Generator",
    description:
      "Generate professional README files based on your project description.",
    image: readmeGenerator,
    url: "/ai-readme-generator",
  },
];
