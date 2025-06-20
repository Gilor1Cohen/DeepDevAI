const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/Auth", require("./controllers-layer/Auth-Controllers"));
app.use("/Tools", require("./controllers-layer/Tools-Controllers"));

app.use((req, res) => {
  res.status(404).send(`Route not found: ${req.originalUrl}`);
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
