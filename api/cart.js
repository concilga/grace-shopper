const express = require("express");
const cartRouter = express.Router();
const {
  deleteCart,
  getUserPurchasedCarts,
  purchaseCart,
} = require("../db/cart");

const {
  getCartBeerByUserId 
} = require("../db/cart_beers");

//getuserCart throw req in
cartRouter.get("/me", async (req, res, next) => {
  const userId = req.user.id;
  try {
    if (!req.user) {
      return next({
        name: "userVerificationError",
        message: "Only a logged in user can access their user information!",
      });
    }
    const uCart = await getCartBeerByUserId(userId);
    res.send({
      uCart,
    });
  } catch (error) {
    next();
  }
});

//get carts come back to this for admin page
// cartRouter.get("/", async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const Cart = await getCartById({ id });
//     res.send({
//       Cart,
//     });
//   } catch (error) {
//     next();
//   }
// });

//userPastOrders throw req in (if not req.user)
cartRouter.get("/", async (req, res) => {
  try {
    if (!req.user) {
      return next({
        name: "userVerificationError",
        message: "Only a logged in user can access their user information!",
      });
    }
    const userId = req.user.id;
    const UPO = await getUserPurchasedCarts(userId);
    res.send(UPO);
  } catch (error) {
    throw error;
  }
});

//Delete DeleteCart

cartRouter.patch("/:cartId", async (req, res, next) => {
  const { cartId } = req.params;
  // console.log(req.body)
  try {
    if (!req.user) {
      return next({
        name: "userVerificationError",
        message: "Only a logged in user can access their user information!",
      });
    }
    const deletedCart = await deleteCart(cartId);
    res.send({
      cart: deletedCart,
    });
  } catch (error) {
    next();
  }
});

//patch purchaseCart
cartRouter.patch("/:cartId", async (req, res, next) => {
  const { cartId } = req.params;

  try {
    if (!req.user) {
      return next({
        name: "userVerificationError",
        message: "Only a logged in user can access their user information!",
      });
    }
    const PurchasedCart = await purchaseCart(cartId)
    res.send({
      cart: PurchasedCart
    });
  } catch (error) {
    next();
  }
});

module.exports = cartRouter;
