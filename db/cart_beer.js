const client = require("./client");

async function getCartBeerById(id) {
  try {
    const {
      rows: [cart_beers],
    } = await client.query(
      `
        SELECT *
        FROM cart_beers
        WHERE id=$1;
      `,
      [id]
    );

    if (!cart_beers) {
      throw Error("cart_beers with that id does not exist");
    }

    return cart_beers;
  } catch (error) {
    throw error;
  }
}

async function getCartsByBeerId(beerId) {
  try {
    const { rows: cart_beers } = await client.query(
      `
          SELECT *
          FROM cart_beers
          WHERE "beerId"=$1;
        `,
      [beerId]
    );

    if (!cart_beers) {
      throw Error("no carts contain a beer with that id");
    }

    return cart_beers;
  } catch (error) {
    throw error;
  }
}

async function getCartBeersByCartId(cartId) {
  try {
    const { rows: cart_beers } = await client.query(
      `
            SELECT *
            FROM cart_beers
            WHERE "cartId"=$1;
          `,
      [cartId]
    );

    if (!cart_beers) {
      throw Error("no carts contain a beer with that id");
    }

    return cart_beers;
  } catch (error) {
    throw error;
  }
}

async function addBeerToCart({ beerId, cartId, quantity, price }) {
  try {
    const {
      rows: [cart_beer],
    } = await client.query(
      `
        INSERT INTO cart_beers("beerId", "cartId", quantity, price) 
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `,
      [beerId, cartId, quantity, price]
    );

    return cart_beer;
  } catch (error) {
    throw error;
  }
}

async function removeBeerFromCart(beerId) {
  try {
    const {
      rows: [cart_beer],
    } = await client.query(
      `
            DELETE
            FROM cart_beers
            WHERE "beerId"=$1
            RETURNING *;
        `,
      [beerId]
    );

    return cart_beer;
  } catch (error) {
    throw error;
  }
}

async function changeBeerQuantity({ beerId, quantity }) {
  try {
    let beer_quantity = await getCartBeerByBeerId(beerId);

    if (!beer_quantity) {
      throw Error("beer_quantity does not exist with that id");
    }

    await client.query(
      `
        UPDATE cart_beers
        SET quantity=$1,
        WHERE "beerId"=$2
        RETURNING *;
        `,
      [beerId, quantity]
    );

    return beer_quantity;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getCartBeerById,
  addBeerToCart,
  removeBeerFromCart,
  getCartBeersByCartId,
  changeBeerQuantity,
  getCartBeerByBeerId,
  getCartsByBeerId,
};
