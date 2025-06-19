const express = require("express");
const router = express.Router();

const checkUserAccess = require("../middlewares/Auth");

const {
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
} = require("../business-logic-layer/Tools-BL");

router.post("/api-explainer", checkUserAccess, async (req, res) => {
  try {
    const { input } = req.body;

    if (!input || typeof input !== "string" || !input.trim()) {
      return res
        .status(400)
        .json({ error: "Input is required and must be a non-empty string." });
    }

    const data = await apiExplainer(input);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error || "Server error." });
  }
});

router.post("/database-designer", checkUserAccess, async (req, res) => {
  try {
    const { input } = req.body;

    if (!input || typeof input !== "string" || !input.trim()) {
      return res
        .status(400)
        .json({ error: "Input is required and must be a non-empty string." });
    }

    const data = await databaseDesigner(input);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error || "Server error." });
  }
});

router.post("/documentation-helper", checkUserAccess, async (req, res) => {
  try {
    const { input } = req.body;

    if (!input || typeof input !== "string" || !input.trim()) {
      return res
        .status(400)
        .json({ error: "Input is required and must be a non-empty string." });
    }

    const data = await documentationHelper(input);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error || "Server error." });
  }
});

router.post(
  "/interview-questions-generator",
  checkUserAccess,
  async (req, res) => {
    try {
      const { Topic } = req.body;

      if (!Topic || typeof Topic !== "string" || !Topic.trim()) {
        return res
          .status(400)
          .json({ error: "Topic is required and must be a non-empty string." });
      }

      const data = await interviewQuestionsGenerator(Topic);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error || "Server error." });
    }
  }
);

router.post("/code-reviewer", checkUserAccess, async (req, res) => {
  try {
    const { input } = req.body;

    if (!input || typeof input !== "string" || !input.trim()) {
      return res
        .status(400)
        .json({ error: "Input is required and must be a non-empty string." });
    }

    const data = await codeReviewer(input);

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: error || "Server error." });
  }
});

router.post("/code-generator", checkUserAccess, async (req, res) => {
  try {
    const { input } = req.body;

    if (!input || typeof input !== "string" || !input.trim()) {
      return res
        .status(400)
        .json({ error: "Input is required and must be a non-empty string." });
    }

    const data = await codeGenerator(input);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error || "Server error." });
  }
});

router.post("/ui-image-generator", checkUserAccess, async (req, res) => {
  try {
    const { input } = req.body;

    if (!input || typeof input !== "string" || !input.trim()) {
      return res
        .status(400)
        .json({ error: "Input is required and must be a non-empty string." });
    }

    const data = await uiImageGenerator(input);

    return res.status(200).json(data.url);
  } catch (error) {
    return res.status(500).json({ message: error || "Server error." });
  }
});

router.post("/ai-article-writer", checkUserAccess, async (req, res) => {
  try {
    const { input } = req.body;

    if (!input || typeof input !== "string" || !input.trim()) {
      return res
        .status(400)
        .json({ error: "Input is required and must be a non-empty string." });
    }

    const data = await aiArticleWriter(input);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error || "Server error." });
  }
});

router.post("/prompt-improver", checkUserAccess, async (req, res) => {
  try {
    const { input } = req.body;

    if (!input || typeof input !== "string" || !input.trim()) {
      return res
        .status(400)
        .json({ error: "Input is required and must be a non-empty string." });
    }

    const data = await promptImprover(input);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error || "Server error." });
  }
});

router.post("/ai-readme-generator", checkUserAccess, async (req, res) => {
  try {
    const { input } = req.body;

    if (!input || typeof input !== "string" || !input.trim()) {
      return res
        .status(400)
        .json({ error: "Input is required and must be a non-empty string." });
    }

    const data = await aiReadmeGenerator(input);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error || "Server error." });
  }
});

module.exports = router;
