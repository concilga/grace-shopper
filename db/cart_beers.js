const { use } = require("bcrypt/promises");
const client = require(".");
const { createCart } = require("./cart");

async function getCartBeerByUserId(userId) {
  try {
    let { rows: [cart] } = await client.query(
      `
        SELECT * FROM carts
        WHERE "userId"=${userId}
        AND "isPurchased"=${false};
      `);

    if (!cart) {
      throw Error("This User does not have an open cart");
    }

    const cartId = cart.id;

    const {
      rows: cart_beers,
    } = await client.query(
      `
        SELECT *
        FROM cart_beers
        WHERE "cartId"=$1;
      `,
      [cartId]
    );

    if (!cart_beers) {
      throw Error("This cart does not contain any beers");
    }

    return cart_beers;
  } catch (error) {
    console.log(error);
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
      throw Error("No carts contain a beer with that id");
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
      throw Error("There are no carts with that Id");
    }

    return cart_beers;
  } catch (error) {
    throw error;
  }
}

async function getSpecificBeerFromCart(beerId, cartId) {
  try {
    const { rows: [cart_beer] } = await client.query(
      `
        SELECT * FROM "cart_beers"
        WHERE "cartId"=${cartId}
        AND "beerId"=${beerId}; 
      `
    );

    if (!cart_beer) {
      return false;
    }

    return cart_beer;
  } catch (error) {
    throw error;
  }
}

async function addBeerToCart({ beerId, userId, quantity, price }) {
  try {
    let { rows: [cart] } = await client.query(
      `
        SELECT * FROM carts
        WHERE "userId"=${userId}
        AND "isPurchased"=${false};
      `);

    if (!cart) {
      console.log("if working")
      cart = await client.query(
        `
          INSERT INTO carts("userId", "isPurchased")
          VALUES($1, $2)
          RETURNING *;
        `,
        [userId, false]
      );
    }
    
    if(!cart) {
      throw Error("Error Creating Cart");
    }

    const cartId = cart.id;
    const existingBeer = await getSpecificBeerFromCart(beerId, cartId)

    if(existingBeer) {
      const newQuantity = existingBeer.quantity + 1;
      return await changeBeerQuantity({userId, beerId, newQuantity});
    }

    const {
      rows: [cart_beer]
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
    console.log(error);
  }
}

async function seedCarts({ beerId, cartId, quantity, price }) {
  try {
    const {
      rows: [cart_beer]
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

async function removeBeerFromCart({beerId, userId}) {
  try {
    let { rows: [cart] } = await client.query(
      `
        SELECT * FROM carts
        WHERE "userId"=${userId}
        AND "isPurchased"=${false};
      `);

    if (!cart) {
      throw Error("This cart does not exist!");
    }

    const cartId = cart.id;

    const {
      rows: [cart_beer],
    } = await client.query(
      `
            DELETE
            FROM cart_beers
            WHERE "beerId"=$1
            AND "cartId"=$2
            RETURNING *;
        `,
      [beerId, cartId]
    );

    return cart_beer;
  } catch (error) {
    throw error;
  }
}

async function changeBeerQuantity({ userId, beerId, newQuantity }) {
  try {
    console.log(userId, beerId, newQuantity)
    let { rows: [cart] } = await client.query(
      `
        SELECT * FROM carts
        WHERE "userId"=${userId}
        AND "isPurchased"=${false};
      `);

    if (!cart) {
      throw Error("This cart does not exist!");
    }

    const cartId = cart.id;

    const {
      rows: [cart_beer],
    } = await client.query(
      `
        UPDATE cart_beers
        SET quantity=$1
        WHERE "beerId"=$2
        AND "cartId"=$3
        RETURNING *;
        `,
      [newQuantity, beerId, cartId]
    );

    return cart_beer;
  } catch (error) {
    throw error;
  }
}

async function deleteBeersbyCartId() {
  try{
    const {
      rows: cart_beers,
    } = await client.query(
      `
            DELETE
            FROM cart_beers
            WHERE "cartId"=$1
            RETURNING *;
        `,
      [cartId]
    );
    return cart_beers;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getCartBeerByUserId,
  addBeerToCart,
  removeBeerFromCart,
  getCartBeersByCartId,
  changeBeerQuantity,
  getCartsByBeerId,
  deleteBeersbyCartId,
  seedCarts
};
