const express = require("express");
const productRouter = require("./productRouter");

const apiRouter = express.Router();

apiRouter.use("/products", productRouter);

apiRouter.get("/", (req, res) => {
  res.send("api router working");
});

module.exports = apiRouter;
