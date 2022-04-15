const client = require("./");
const { deleteBeersbyCartId } = require("./cart_beers");

/* */
async function createCart({ userId, isPurchased }) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
        INSERT INTO carts("userId", "isPurchased")
        VALUES($1, $2)
        RETURNING *;
      `,
      [userId, isPurchased]
    );
    return cart;
  } catch (error) {
    throw error;
  }
}

async function getCartById(id) {
  try {
    const {
      rows: [cart],
    } = await client.query(`
        SELECT *
        FROM carts
        WHERE id=${id};
      `);
    return cart;
  } catch (error) {
    throw error;
  }
}

async function getUserOpenCart(userId) {
  try {
    const { rows: [cart] } = await client.query(`
        SELECT * FROM carts
        WHERE "userId"=$1
        AND "isPurchased"=$2;
      `, [userId, false]);

    return [cart];
  } catch (error) {
    throw error;
  }
}

async function getUserPurchasedCarts(userId) {
  try {
    const { rows: carts } = await client.query(`
        SELECT * FROM carts
        WHERE "userId"=$1 
        AND "isPurchased"=$2;
      `, [userId, true]
      );

    return carts;
  } catch (error) {
    throw error;
  }
}

async function deleteCart(cartId) {
  try {
    await client.query(`
        DELETE
        FROM carts
        WHERE id= ${cartId};
      `);
    
    const cart_beers = deleteBeersbyCartId(cartId);
    if(!cart_beers) {
      return {
        success: false,
        error: "CartIdDoesNotExist",
        message: "Could not delete beers from cart!"
      }
    } 

    return {
      success: true,
      error: "none",
      message: "Cart Successfully Deleted"
    };
  } catch (error) {
    throw error;
  }
}

/* */
async function purchaseCart(cartId) {
  try {
    const {
      rows: [cart],
    } = await client.query(`
        UPDATE carts
        SET "isPurchased" = true
        WHERE id= ${cartId};
      `);
    return cart;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  purchaseCart,
  deleteCart,
  getUserOpenCart,
  getUserPurchasedCarts,
  getCartById,
  createCart
}