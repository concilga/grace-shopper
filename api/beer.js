const express = require("express");
const beerRouter = express.Router();
const {
  createBeer,
  deleteBeer,
  editBeer,
  getAllBeers,
} = require("../db/export");

beerRouter.get("/", async (req, res) => {
  try {
    const beer = await getAllBeers();
    res.send(beer);
  } catch (error) {
    next(error);
  }
  
});

beerRouter.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return next({
        name: "userVerificationError",
        message: "Only an authorized user can create beer!",
      });
    }

    const { name, description, image, abv, brewery, style, price, score } =
      req.body;

    const newBeer = await createBeer({
      name,
      description,
      image,
      abv,
      brewery,
      style,
      price,
      score,
    });

    res.send(newBeer);
  } catch (error) {
    next(error);
  }
});

beerRouter.delete("/:beerId", async (req, res, next) => {
  const { beerId } = req.params;
  try {
    if (!req.user) {
      return next({
        name: "userVerificationError",
        message: "Only an authorized user can delete a beer!",
      });
    }

    const beer = await deleteBeer(beerId);
    res.send(beer);
  } catch (error) {
    next(error);
  }
});

beerRouter.patch("/:beerId", async (req, res, next) => {
  const { beerId } = req.params;
  const { name, description, image, abv, brewery, style, price, score } =
    req.body;
  const beer = {
    name,
    description,
    image,
    abv,
    brewery,
    style,
    price,
    score,
    beerId,
  };
  try {
    if (!req.user) {
      return next({
        name: "userVerificationError",
        message: "Only an authorized user can update a beer!",
      });
    }

    const updateBeer = await editBeer(beer);

    res.send(updateBeer);
  } catch (error) {
    next(error);
  }
});

module.exports = beerRouter;