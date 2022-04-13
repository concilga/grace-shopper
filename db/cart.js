const client = require("./");

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
async function getCartByUserId(userId) {
  try {
    const { rows: carts } = await client.query(`
        SELECT * FROM carts
        WHERE "userId"=${userId};
      `);
    return carts;
  } catch (error) {
    throw error;
  }
}

async function editCart(isPurchased, cartId) {
  try {
    const {
      rows: [cart],
    } = await client.query(`
        UPDATE carts
        SET "isPurchased" = ${isPurchased}
        WHERE id= ${cartId};
      `);
    return cart;
  } catch (error) {
    throw error;
  }
}

async function closeCart(cartId) {
  try {
    const {
      rows: [cart],
    } = await client.query(`
        DELETE
        FROM carts
        WHERE id= ${cartId};
      `);
    return cart;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  closeCart,
  editCart,
  getCartByUserId,
  getCartById,
  createCart
}