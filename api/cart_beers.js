const express = require("express");
const cartBeersRouter = express.Router();
const {
  addBeerToCart,
  removeBeerFromCart,
  getBeerById,
  getCartBeerByUserId,
  changeBeerQuantity
} = require("../db/export");

cartBeersRouter.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return next({
        name: "userVerificationError",
        message: "Only a logged in user can add beer to cart!",
      });
    }
    const userId = req.user.id;
    const { beerId, price } = req.body;
    const newCartBeer = await addBeerToCart({
      beerId,
      quantity: 1,
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
      res.send({
        name: "userVerificationError",
        message: "Only a logged in user can get a cart beer!",
      });
    }
    
    const userId = req.user.id;
    const cartbeers = await getCartBeerByUserId(userId);
    console.log(cartbeers, "get request test 1");
    let beers = []

    for(let i = 0; i < cartbeers.length; i++){
      beers.push({
        beer: await getBeerById(cartbeers[i].beerId),
        quantity: cartbeers[i].quantity,
        price: cartbeers[i].price,
        cartId: cartbeers[i].cartId
      })
    }

    console.log(beers);
    res.send(beers);
  } catch (error) {
    res.send(error);
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
      newQuantity: quantity,
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
