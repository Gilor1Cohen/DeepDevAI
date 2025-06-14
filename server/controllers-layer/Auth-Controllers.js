const express = require("express");
const router = express.Router();
const { SignIn, LogIn } = require("../business-logic-layer/Auth-BL");

router.post("/SignUp", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.log(data.message);

      return res.status(400).json({ message: "All fields are required." });
    }

    const data = await SignIn(name, email, password);

    if (!data.status) {
      return res.status(400).json({ message: data.message || "Action failed" });
    }

    res.cookie("token", data.token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1800000,
    });

    return res.status(200).json({ data: data.data });
  } catch (error) {
    return res.status(500).json({ message: "Server error during SignIn." });
  }
});

router.post("/LogIn", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const data = await LogIn(email, password);

    if (!data.status) {
      return res.status(400).json({ message: data.message || "Action failed" });
    }

    res.cookie("token", data.token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1800000,
    });

    return res.status(200).json({ data: data.data });
  } catch (error) {
    return res.status(500).json({ message: "Server error during LogIn." });
  }
});

router.get("/GetToken", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token found." });
    }
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
});

router.delete("/RemoveToken", async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Token removed successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
