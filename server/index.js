const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use("*", (req, res) => {
  res.status(404).send(`Route not found ${req.originalUrl}`);
});

app
  .listen(5174, () => {
    console.log("Listening on 5174");
  })
  .on("error", (err) => {
    err.code === "EADDRINUSE"
      ? console.log("Error: Address in use")
      : console.log("Error: Unknown error");
  });
