const express = require("express");
const { getProducts } = require("../db/products");

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const products = await getProducts();
  res.send({ products });
});

module.exports = productRouter;
