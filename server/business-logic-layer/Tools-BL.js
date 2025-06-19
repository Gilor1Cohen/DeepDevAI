const { openai } = require("../openai");

const USER_MESSAGES = {
  NO_CHOICES:
    "Sorry, we didn't get a response from the AI. Please try again in a few seconds.",
  NO_FUNC_CALL:
    "Sorry, the server response was unclear. Please refresh and try again.",
  INVALID_ARGS:
    "Sorry, the returned data is invalid. Please try again shortly.",
  PARSE_ERROR:
    "Sorry, we couldn't process the response. Please check your connection and try again.",
  MISSING_PARAM: "Required parameter is missing.",
  GENERIC:
    "An unexpected error occurred. Please try again later or contact support.",
};

async function apiExplainer(input) {
  try {
    const apiName = input.trim();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      top_p: 1,
      messages: [
        {
          role: "system",
          content:
            "You are an API documentation generator. If the API does not exist, return {'error': 'API not found'} only.",
        },
        {
          role: "user",
          content: `
    Please verify whether an API named "${apiName}" actually exists. 
    - If it does not exist, return a JSON object with an "error" field indicating "API not found" and do not include any other fields. 
    - If it does exist, generate a beginner-friendly explanation of the "${apiName}" API, 
    strictly as structured JSON matching our function schema: 
  • overview: a short description of the API's purpose  
  • endpoints: an array of objects each with method, path, description, exampleRequest, exampleResponse  
  • parameters: (optional) array of parameter definitions  
  • errors: (optional) array of possible error codes and messages  

      Do not include any free-form text outside of the JSON response.`,
        },
      ],
      functions: [
        {
          name: "api_explainer",
          description: "Returns structured API documentation",
          parameters: {
            type: "object",
            properties: {
              error: { type: "string" },
              apiName: { type: "string" },
              overview: { type: "string" },
              endpoints: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    method: { type: "string" },
                    path: { type: "string" },
                    description: { type: "string" },
                    exampleRequest: { type: "string" },
                    exampleResponse: { type: "string" },
                  },
                  required: ["method", "path", "description"],
                },
              },
              parameters: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    in: { type: "string" },
                    required: { type: "boolean" },
                    type: { type: "string" },
                    description: { type: "string" },
                  },
                  required: ["name", "in", "required", "type"],
                },
              },
              errors: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    code: { type: "number" },
                    message: { type: "string" },
                  },
                  required: ["code", "message"],
                },
              },
            },
            required: ["apiName", "overview", "endpoints"],
          },
        },
      ],
      function_call: "auto",
    });

    const choice = completion.choices?.[0];
    if (!choice) {
      throw new Error(USER_MESSAGES.NO_CHOICES);
    }

    if (choice.message.content) {
      const normalized = choice.message.content.replace(/'/g, '"');
      let payload;
      try {
        payload = JSON.parse(normalized);
      } catch {
        throw new Error("Invalid JSON from assistant");
      }
      if (payload.error) {
        throw new Error(payload.error);
      }
    }

    const funcCall = choice.message?.function_call;
    if (!funcCall) {
      throw new Error(USER_MESSAGES.NO_FUNC_CALL);
    }

    const args = funcCall.arguments;
    if (typeof args !== "string") {
      throw new Error(USER_MESSAGES.INVALID_ARGS);
    }

    let data;
    try {
      data = JSON.parse(args);
    } catch {
      throw new Error(USER_MESSAGES.PARSE_ERROR);
    }

    if (
      typeof data.apiName !== "string" ||
      typeof data.overview !== "string" ||
      !Array.isArray(data.endpoints) ||
      data.endpoints.length === 0
    ) {
      throw new Error(`API "${apiName}" not found or invalid response.`);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

async function databaseDesigner(input) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      top_p: 1,
      messages: [
        {
          role: "system",
          content:
            "You are a database designer for beginners, your job is to build a DB in SQL only based on the data the user brings to you. don't ask questions. In the event of an error or receiving incorrect information, you will return {'error': ''} with a custom error message only.",
        },
        {
          role: "user",
          content: input,
        },
      ],
      functions: [
        {
          name: "return_SQL_database_schema",
          description:
            "Return the SQL database schema structure in strict JSON format, or return an error message if input is invalid.",
          parameters: {
            type: "object",
            properties: {
              error: {
                type: "string",
                description:
                  "An error message if the input was not clear or valid enough to generate a database schema.",
              },
              dbName: { type: "string" },
              tables: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    description: { type: "string" },
                    fields: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          name: { type: "string" },
                          type: { type: "string" },
                          constraints: { type: "string" },
                          description: { type: "string" },
                        },
                        required: ["name", "type"],
                      },
                    },
                    errors: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          code: { type: "number" },
                          message: { type: "string" },
                        },
                        required: ["code", "message"],
                      },
                    },
                  },
                  required: ["name", "fields"],
                },
              },
            },
            required: ["dbName", "tables"],
          },
        },
      ],
      function_call: "auto",
    });

    const choice = completion.choices?.[0];
    if (!choice) {
      throw new Error(USER_MESSAGES.NO_CHOICES);
    }

    if (choice.message.content) {
      const normalized = choice.message.content.replace(/'/g, '"');
      let payload;
      try {
        payload = JSON.parse(normalized);
      } catch {
        throw new Error("Invalid JSON from assistant");
      }
      if (payload.error) {
        throw new Error(payload.error);
      }
    }

    const funcCall = choice.message?.function_call;
    if (!funcCall) {
      throw new Error(USER_MESSAGES.NO_FUNC_CALL);
    }

    const args = funcCall.arguments;
    if (typeof args !== "string") {
      throw new Error(USER_MESSAGES.INVALID_ARGS);
    }

    let data;
    try {
      data = JSON.parse(args);
    } catch {
      throw new Error(USER_MESSAGES.PARSE_ERROR);
    }

    if (
      typeof data.dbName !== "string" ||
      !Array.isArray(data.tables) ||
      data.tables.length === 0
    ) {
      throw new Error("Incomplete or malformed database schema.");
    }

    return data;
  } catch (error) {
    throw error.message;
  }
}

async function documentationHelper(input) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      top_p: 1,
      messages: [
        {
          role: "system",
          content:
            "You will receive either the name or URL of a GitHub repository. Before continuing, you must verify that the repository actually exists and can be accessed on GitHub. And check that the link to the repo exists. Your task is to: 1. Attempt to fetch and analyze the README or available documentation from the real repository. 2. If and only if the repository exists, return a professional JSON summary using the provided function schema, tailored for beginner programmers. 3. If the repository does not exist, is invalid, or cannot be found, respond ONLY with this exact JSON: { 'error': 'Repository not found or invalid' } Do NOT guess or invent repositories. If unsure, return the error JSON above. The explanation must be professional, accurate, and in formal English only. Do not include any free-form text outside of the structured JSON. Before continuing, you must verify that the repository actually exists and can be accessed on GitHub. And check that the link to the repo exists.",
        },
        {
          role: "user",
          content: input,
        },
      ],
      functions: [
        {
          name: "github_repo_doc",
          description:
            "Summarizes the documentation of a GitHub repository for beginner programmers.",
          parameters: {
            type: "object",
            properties: {
              repoName: {
                type: "string",
                description: "The name or URL of the GitHub repository.",
              },
              overview: {
                type: "string",
                description:
                  "A professional summary of the repository's README file.",
              },
              technologies: {
                type: "array",
                items: {
                  type: "string",
                },
                description:
                  "Technologies and programming languages used in the project.",
              },
              features: {
                type: "array",
                items: {
                  type: "string",
                },
                description:
                  "Main features or functionalities of the repository.",
              },
              author: {
                type: "string",
                description:
                  "The author or organization behind the repository.",
              },

              errors: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    code: { type: "number" },
                    message: { type: "string" },
                  },
                  required: ["code", "message"],
                },
              },
            },
            required: ["repoName", "overview", "technologies", "features"],
          },
        },
      ],
      function_call: "auto",
    });

    const choice = completion.choices?.[0];
    if (!choice) {
      throw new Error(USER_MESSAGES.NO_CHOICES);
    }

    if (choice.message.content) {
      const normalized = choice.message.content.replace(/'/g, '"');
      let payload;
      try {
        payload = JSON.parse(normalized);
      } catch {
        throw new Error("Invalid JSON from assistant");
      }
      if (payload.error) {
        throw new Error(payload.error);
      }
    }

    const funcCall = choice.message?.function_call;
    if (!funcCall) {
      throw new Error(USER_MESSAGES.NO_FUNC_CALL);
    }

    const args = funcCall.arguments;
    if (typeof args !== "string") {
      throw new Error(USER_MESSAGES.INVALID_ARGS);
    }

    let data;
    try {
      data = JSON.parse(args);
    } catch {
      throw new Error(USER_MESSAGES.PARSE_ERROR);
    }

    if (
      typeof data.repoName !== "string" ||
      typeof data.overview !== "string" ||
      !Array.isArray(data.technologies) ||
      !Array.isArray(data.features)
    ) {
      throw new Error("Invalid response.");
    }

    return data;
  } catch (error) {
    throw error.message;
  }
}

async function interviewQuestionsGenerator(Topic) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      top_p: 1,
      messages: [
        {
          role: "system",
          content: `You are a teacher of ${Topic}`,
        },
        {
          role: "user",
          content: `Hi, I'm a ${Topic} student, I have a job interview soon, create 20 job interview questions on ${Topic} of varying difficulty levels for me. Include the question, answer, and difficulty level only in professional English.`,
        },
      ],
      functions: [
        {
          name: "generateInterviewQuestions",
          description:
            "Generate 20 interview questions with answers and difficulty levels",
          parameters: {
            type: "object",
            properties: {
              questions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    question: { type: "string" },
                    answer: { type: "string" },
                    difficulty: {
                      type: "string",
                      enum: ["easy", "medium", "hard"],
                    },
                  },
                  required: ["question", "answer", "difficulty"],
                },
              },
              errors: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    code: { type: "number" },
                    message: { type: "string" },
                  },
                  required: ["code", "message"],
                },
              },
            },
            required: ["questions"],
          },
        },
      ],
      function_call: "auto",
    });

    const choice = completion.choices?.[0];
    if (!choice) {
      throw new Error(USER_MESSAGES.NO_CHOICES);
    }

    if (choice.message.content) {
      const normalized = choice.message.content.replace(/'/g, '"');
      let payload;
      try {
        payload = JSON.parse(normalized);
      } catch {
        throw new Error("Invalid JSON from assistant");
      }
      if (payload.error) {
        throw new Error(payload.error);
      }
    }

    const funcCall = choice.message?.function_call;
    if (!funcCall) {
      throw new Error(USER_MESSAGES.NO_FUNC_CALL);
    }

    const args = funcCall.arguments;
    if (typeof args !== "string") {
      throw new Error(USER_MESSAGES.INVALID_ARGS);
    }

    let data;
    try {
      data = JSON.parse(args);
    } catch {
      throw new Error(USER_MESSAGES.PARSE_ERROR);
    }

    if (
      !Array.isArray(data.questions) ||
      data.questions.length === 0 ||
      !data.questions.every(
        (q) =>
          typeof q.question === "string" &&
          typeof q.answer === "string" &&
          ["easy", "medium", "hard"].includes(q.difficulty)
      )
    ) {
      throw new Error("Invalid questions data structure");
    }

    return data;
  } catch (error) {
    throw error.message;
  }
}

async function codeReviewer(input) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      top_p: 1,
      messages: [
        {
          role: "system",
          content:
            "You are a Senior Programmer with 50 years of experience. The user is going to give you code, you need to analyze and explain the code snippet and then offering feedback and suggestions. In the event of an error or receiving incorrect information, you will return {'error': ''} with a custom error message only.",
        },
        {
          role: "user",
          content: input,
        },
      ],
      functions: [
        {
          name: "analyzeCode",
          description:
            "Analyze and explain your code snippet, offering feedback and suggestions.",
          parameters: {
            type: "object",
            properties: {
              code: {
                type: "string",
                description: "The code snippet to analyze",
              },
              language: {
                type: "string",
                description:
                  "Programming language of the snippet (e.g. JavaScript, TypeScript, Python)",
              },
              explanation: {
                type: "string",
                description: "Detailed explanation of what the code does",
              },
              complexity: {
                type: "string",
                description: "Time and space complexity analysis",
              },
              notes: {
                type: "array",
                items: { type: "string" },
                description: "Additional notes and observations",
              },
              suggestions: {
                type: "array",
                items: { type: "string" },
                description: "Best-practice improvement suggestions",
              },
              refactoredCode: {
                type: "string",
                description:
                  "Refactored version of the code following modern guidelines",
              },
              framework: {
                type: "string",
                description:
                  "Testing framework used (e.g. Jest, Mocha, PyTest)",
              },
              unitTests: {
                type: "string",
                description: "Generated unit tests for the code snippet",
              },
              summary: {
                type: "string",
                description: "Concise summary of the code snippet",
              },
              errors: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    code: { type: "number" },
                    message: { type: "string" },
                  },
                  required: ["code", "message"],
                },
              },
            },
            required: [
              "code",
              "language",
              "explanation",
              "complexity",
              "notes",
              "suggestions",
              "refactoredCode",
              "framework",
              "unitTests",
              "summary",
            ],
            additionalProperties: false,
          },
        },
      ],
      function_call: "auto",
    });

    const choice = completion.choices?.[0];
    if (!choice) {
      throw new Error(USER_MESSAGES.NO_CHOICES);
    }

    if (choice.message.content) {
      const normalized = choice.message.content.replace(/'/g, '"');
      let payload;
      try {
        payload = JSON.parse(normalized);
      } catch {
        throw new Error("Invalid JSON from assistant");
      }
      if (payload.error) {
        throw new Error(payload.error);
      }
    }

    const funcCall = choice.message?.function_call;
    if (!funcCall) {
      throw new Error(USER_MESSAGES.NO_FUNC_CALL);
    }

    const args = funcCall.arguments;
    if (typeof args !== "string") {
      throw new Error(USER_MESSAGES.INVALID_ARGS);
    }

    let data;
    try {
      data = JSON.parse(args);
    } catch {
      throw new Error(USER_MESSAGES.PARSE_ERROR);
    }

    if (
      funcCall.name === "generateUnitTests" &&
      typeof data.framework !== "string"
    ) {
      throw new Error(USER_MESSAGES.MISSING_PARAM);
    }

    return data;
  } catch (error) {
    throw error.message;
  }
}

async function codeGenerator(input) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      top_p: 1,
      messages: [
        {
          role: "system",
          content:
            "Your job is to generate code based on a natural-language description. I expect professional code without comments. In the event of an error or receiving incorrect information, you will return {'error': ''} with a custom error message only.",
        },
        {
          role: "user",
          content: input,
        },
      ],
      functions: [
        {
          name: "generateCode",
          description:
            "Generate only the code in the requested programming language based on the user's request",
          parameters: {
            type: "object",
            properties: {
              code: {
                type: "string",
                description: "The generated code",
              },
            },
            required: ["code"],
          },
        },
      ],
      function_call: "auto",
    });

    const choice = completion.choices?.[0];

    if (!choice) {
      throw new Error(USER_MESSAGES.NO_CHOICES);
    }

    if (choice.message.content) {
      const normalized = choice.message.content.replace(/'/g, '"');
      let payload;
      try {
        payload = JSON.parse(normalized);
      } catch {
        throw new Error("Invalid JSON from assistant");
      }
      if (payload.error) {
        throw new Error(payload.error);
      }
    }

    const funcCall = choice.message?.function_call;
    if (!funcCall) {
      throw new Error(USER_MESSAGES.NO_FUNC_CALL);
    }

    const args = funcCall.arguments;
    if (typeof args !== "string") {
      throw new Error(USER_MESSAGES.INVALID_ARGS);
    }

    let data;
    try {
      data = JSON.parse(args);
    } catch {
      throw new Error(USER_MESSAGES.PARSE_ERROR);
    }

    if (typeof data.code !== "string") {
      throw new Error("Invalid arguments from AI: missing 'code'");
    }

    return data;
  } catch (error) {
    throw error.message;
  }
}

async function uiImageGenerator(input) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      top_p: 1,
      messages: [
        {
          role: "system",
          content:
            "Your job is to generate UI image from a text prompt. Google and Apple design. In the event of an error or receiving incorrect information, you will return {'error': ''} with a custom error message only.",
        },
        {
          role: "user",
          content: input,
        },
      ],
      functions: [
        {
          name: "createImage",
          description: "Generates an image",
          parameters: {
            type: "object",
            properties: {
              prompt: { type: "string" },
              size: {
                type: "string",
                enum: ["256x256", "512x512", "1024x1024"],
              },
            },
            required: ["prompt"],
          },
        },
      ],
      function_call: {
        name: "createImage",
        arguments: JSON.stringify({ prompt: input, size: "1024x1024" }),
      },
    });

    const fc = completion.choices[0].message.function_call;
    if (!fc) return { error: "no function call" };
    const args = JSON.parse(fc.arguments);
    const img = await openai.images.generate({
      prompt: args.prompt,
      n: 1,
      size: args.size,
      response_format: "url",
    });
    return { url: img.data[0].url };
  } catch (error) {
    throw error.message;
  }
}

async function aiArticleWriter(input) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      top_p: 1,
      messages: [
        {
          role: "system",
          content:
            "Your job is to write professional articles based on a topic description. At least ≥2500 words. In the event of an error or receiving incorrect information, you will return {'error': ''} with a custom error message only.",
        },
        {
          role: "user",
          content: input,
        },
      ],
      functions: [
        {
          name: "planArticleUI",
          description:
            "Generate a UI plan for rendering a full-length article (≥2500 words) on the client. The article JSON must contain a title and an array of paragraphs, each paragraph as plain text (words only).",
          parameters: {
            type: "object",
            properties: {
              title: {
                type: "string",
                description: "The article's title",
              },
              paragraphs: {
                type: "array",
                description:
                  "An ordered list of paragraphs; each is plain text (words only)",
                items: {
                  type: "string",
                },
              },
            },
            required: ["title", "paragraphs"],
          },
        },
      ],
      function_call: "auto",
    });

    const choice = completion.choices?.[0];
    if (!choice) {
      throw new Error(USER_MESSAGES.NO_CHOICES);
    }

    if (choice.message.content) {
      const normalized = choice.message.content.replace(/'/g, '"');
      let payload;
      try {
        payload = JSON.parse(normalized);
      } catch {
        throw new Error("Invalid JSON from assistant");
      }
      if (payload.error) {
        throw new Error(payload.error);
      }
    }

    const funcCall = choice.message?.function_call;
    if (!funcCall) {
      throw new Error(USER_MESSAGES.NO_FUNC_CALL);
    }

    const args = funcCall.arguments;
    if (typeof args !== "string") {
      throw new Error(USER_MESSAGES.INVALID_ARGS);
    }

    let data;
    try {
      data = JSON.parse(args);
    } catch {
      throw new Error(USER_MESSAGES.PARSE_ERROR);
    }

    if (typeof data.title !== "string" || !Array.isArray(data.paragraphs)) {
      throw new Error("No Data");
    }

    return data;
  } catch (error) {
    throw error.message;
  }
}

async function promptImprover(input) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      top_p: 1,
      messages: [
        {
          role: "system",
          content:
            "Your job is to Refine and rewrite the user's prompt to get better AI results. Return a more professional prompt to get better AI results. In the event of an error or receiving incorrect information, you will return {'error': ''} with a custom error message only.",
        },
        {
          role: "user",
          content: input,
        },
      ],
      functions: [
        {
          name: "refinePrompt",
          description:
            "Refines and improves a user's AI prompt for optimal results.",
          parameters: {
            type: "object",
            properties: {
              refinedPrompt: {
                type: "string",
                description:
                  "A professionally refined and rewritten version of the original user prompt.",
              },
              explanation: {
                type: "string",
                description:
                  "Brief explanation of the improvements made to the original prompt.",
              },
            },
            required: ["refinedPrompt", "explanation"],
          },
        },
      ],
      function_call: "auto",
    });

    const choice = completion.choices?.[0];
    if (!choice) {
      throw new Error(USER_MESSAGES.NO_CHOICES);
    }

    if (choice.message.content) {
      const normalized = choice.message.content.replace(/'/g, '"');
      let payload;
      try {
        payload = JSON.parse(normalized);
      } catch {
        throw new Error("Invalid JSON from assistant");
      }
      if (payload.error) {
        throw new Error(payload.error);
      }
    }

    const funcCall = choice.message?.function_call;
    if (!funcCall) {
      throw new Error(USER_MESSAGES.NO_FUNC_CALL);
    }

    const args = funcCall.arguments;
    if (typeof args !== "string") {
      throw new Error(USER_MESSAGES.INVALID_ARGS);
    }

    let data;
    try {
      data = JSON.parse(args);
    } catch {
      throw new Error(USER_MESSAGES.PARSE_ERROR);
    }

    if (
      typeof data.refinedPrompt !== "string" ||
      typeof data.explanation !== "string"
    ) {
      throw new Error("No Data");
    }

    return data;
  } catch (error) {
    throw error.message;
  }
}

async function aiReadmeGenerator(input) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      top_p: 1,
      messages: [
        {
          role: "system",
          content:
            "You are going to get data on a repository, your job is to create a professional README file. In the event of an error or receiving incorrect information, you will return {'error': ''} with a custom error message only.",
        },
        {
          role: "user",
          content: "",
        },
      ],
      functions: [
        {
          name: "generateReadme",
          description:
            "Generate a professional README file for a project repository",
          parameters: {
            type: "object",
            properties: {
              projectName: {
                type: "string",
                description: "The name of the project",
              },
              description: {
                type: "string",
                description:
                  "A detailed and professional description of the project",
              },
              technologies: {
                type: "array",
                items: {
                  type: "string",
                },
                description:
                  "Technologies, libraries, and frameworks used in the project",
              },
              features: {
                type: "array",
                items: {
                  type: "string",
                },
                description: "Key features or capabilities of the project",
              },
              installation: {
                type: "string",
                description: "Step-by-step installation instructions",
              },
              usage: {
                type: "string",
                description: "Instructions on how to use the project",
              },
              examples: {
                type: "string",
                description: "Examples or code snippets demonstrating usage",
              },
              license: {
                type: "string",
                description: "License type for the project (e.g., MIT, GPL)",
              },
            },
            required: [
              "projectName",
              "description",
              "technologies",
              "installation",
              "usage",
            ],
          },
        },
      ],
      function_call: "auto",
    });

    const choice = completion.choices?.[0];

    if (!choice) {
      throw new Error(USER_MESSAGES.NO_CHOICES);
    }

    if (choice.message.content) {
      const normalized = choice.message.content.replace(/'/g, '"');
      let payload;
      try {
        payload = JSON.parse(normalized);
      } catch {
        throw new Error("Invalid JSON from assistant");
      }
      if (payload.error) {
        throw new Error(payload.error);
      }
    }

    const funcCall = choice.message?.function_call;

    if (!funcCall) {
      throw new Error(USER_MESSAGES.NO_FUNC_CALL);
    }

    const args = funcCall.arguments;

    if (typeof args !== "string") {
      throw new Error(USER_MESSAGES.INVALID_ARGS);
    }

    let data;
    try {
      data = JSON.parse(args);
    } catch {
      throw new Error(USER_MESSAGES.PARSE_ERROR);
    }

    if (
      typeof data.projectName !== "string" ||
      typeof data.description !== "string" ||
      !Array.isArray(data.technologies) ||
      data.technologies.length === 0 ||
      typeof data.installation !== "string" ||
      typeof data.usage !== "string"
    ) {
      throw new Error("Invalid data returned from AI");
    }

    return data;
  } catch (error) {
    throw error.message;
  }
}

module.exports = {
  apiExplainer,
  databaseDesigner,
  documentationHelper,
  interviewQuestionsGenerator,
  codeReviewer,
  codeGenerator,
  uiImageGenerator,
  aiArticleWriter,
  promptImprover,
  aiReadmeGenerator,
};
