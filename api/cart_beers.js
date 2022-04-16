const express = require("express");
const productRouter = express.Router();
const {
  addBeerToCart,
  removeBeerFromCart,
  getSpecificBeerFromCart,
} = require("../db");

productRouter.post("/:beerId", async (req, res, next) => {
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

productRouter.delete("/:beerId", async (req, res, next) => {
  const userId = req.user.id;
  const { beerId } = req.params;
  try {
    if (!req.user) {
      return next({
        name: "userVerificationError",
        message: "Only a logged in user can delete a beer!",
      });
    }

    const removedBeer = await removeBeerFromCart(beerId);
    res.send(removedBeer);
  } catch (error) {
    next(error);
  }
});

productRouter.get("/:cartId", async (req, res) => {
  const beer = await getSpecificBeerFromCart();
  res.send(beer);
});

productRouter.patch("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return next({
        name: "userVerificationError",
        message: "Only an logged in user can update a quantity!",
      });
    }

    const userId = req.user.id;
    const { beerId, quantity } = req.body;
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