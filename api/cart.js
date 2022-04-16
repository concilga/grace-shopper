// 1. patch editCart
// 2. get userCart Done
// 3. get carts
// 4. get userPastOrders
// 5. delete DeleteCart
// 6. patch purchaseCart

const express = require("express");
const cartRouter = express.Router();
const {
  getCart,
  getCartById,
  getUserOpenCart,
  deleteCart,
  getUserPurchasedCarts,
} = require("../db/cart");

const {
  userCart,
  carts,
  userPastOrders,
  closeCart,
  markCartPurchased,
  userId,
} = require("..db/cart");
const {
  changeBeerQuantity,
  getCartBeersByCartId,
} = require("../db/cart_beers");

//getuserCart throw req in
cartRouter.get("/me", async (req, res, next) => {
  const userId = req.user.id;
  try {
    const uCart = await getCartBeersByUserId(userId);
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
    const deletedCart = await deleteCart(cartId);
    res.send({
      cart: updatedCart,
    });
  } catch (error) {
    next();
  }
});

//patch purchaseCart
cartRouter.patch("/:cartId", async (req, res, next) => {
  const { cartId } = req.params;
  // console.log(req.body)
  try {
    const PurchasedCart = await PurchasedCart(userId);
    res.send({
      cart: PurchasedCart,
    });
  } catch (error) {
    next();
  }
});

module.exports = cartRouter;
