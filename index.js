require("dotenv").config();
const express = require("express");
const apiRouter = require("./api");
const cors = require("cors");

let PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.use(express.static("build"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(PORT, () => {
  console.log("Server is up on port: " + PORT);
});
