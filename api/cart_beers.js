const express = require("express");
const cartBeersRouter = express.Router();
const {
  addBeerToCart,
  removeBeerFromCart,
  getSpecificBeerFromCart,
} = require("../db/export");

cartBeersRouter.post("/:beerId", async (req, res, next) => {
  try {
    if (!req.user) {
      return next({
        name: "userVerificationError",
        message: "Only a logged in user can add beer to cart!",
      });
    }
    const userId = req.user.id;
    const { beerId } = req.params;
    const { quantity, price } = req.body;
    const newCartBeer = await addBeerToCart({
      beerId,
      quantity,
      price,
      userId,
    });

    res.send(newCartBeer);
  } catch (error) {
    next(error);
  }
});

cartBeersRouter.delete("/:beerId", async (req, res, next) => {
  try {
    if (!req.user) {
      return next({
        name: "userVerificationError",
        message: "Only a logged in user can delete a beer!",
      });
    }
    const userId = req.user.id;
    const { beerId } = req.params;
    const removedBeer = await removeBeerFromCart({ beerId, userId });
    res.send(removedBeer);
  } catch (error) {
    next(error);
  }
});

cartBeersRouter.get("/", async (req, res) => {
  try {
    if (!req.user) {
      return next({
        name: "userVerificationError",
        message: "Only a logged in user can get a cart beer!",
      });
    }
    const { userId } = req.user.id;
    const beer = await getCartBeerByUserId(userId);
    res.send(beer);
  } catch (error) {
    next(error);
  }
});

cartBeersRouter.patch("/:beerId", async (req, res, next) => {
  try {
    if (!req.user) {
      return next({
        name: "userVerificationError",
        message: "Only an logged in user can update a quantity!",
      });
    }

    const userId = req.user.id;
    const beerId = req.params.beerId;
    const { quantity } = req.body;
    const beer = {
      quantity,
      beerId,
      userId,
    };

    const updatedBeerQuantity = await changeBeerQuantity(beer);

    res.send(updatedBeerQuantity);
  } catch (error) {
    next(error);
  }
});

module.exports = cartBeersRouter;
