require("dotenv").config();
const { getBeerSeed } = require("./beerSeed");
const { createUser } = require("./users");
const { seedCarts } = require("./cart_beers");
const client = require("./");
const { createBeer } = require("./beer");
const { createCart } = require("./cart");
const { createUserBeers } = require("./user_beers");
const { getUserBeers } = require("./user_beers");


const dropTables = async () => {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
      DROP TABLE IF EXISTS cart_beers;
      DROP TABLE IF EXISTS user_beers;
      DROP TABLE IF EXISTS carts;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS beers; 
    `)
    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error while dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to construct tables...");
    await client.query(`
      CREATE TABLE beers (
        id SERIAL PRIMARY KEY, name VARCHAR(255) UNIQUE, 
        description VARCHAR(1000), image VARCHAR(255), background VARCHAR (255),
        brewery VARCHAR(255), style VARCHAR(255), catagories VARCHAR(255), abv FLOAT,
        price FLOAT
      );

      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        admin BOOLEAN DEFAULT false,
        "profilePic" VARCHAR(255)
      );

      CREATE TABLE carts(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "isPurchased" BOOLEAN DEFAULT false
      );
      
      CREATE TABLE user_beers(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "beerId" INTEGER REFERENCES beers(id),
        "favorite" BOOLEAN DEFAULT false,
        "score" INTEGER
      );

      CREATE TABLE cart_beers(
        id SERIAL PRIMARY KEY,
        "cartId" INTEGER REFERENCES carts(id),
        "beerId" INTEGER REFERENCES beers(id),
        quantity INTEGER,
        price FLOAT
      );
    `);
    console.log("Finished constructing tables!");
  } catch (error) {
    console.error("Error constructing tables!");
    throw error;
  }
}

async function createInitialUsers() {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
      { 
        username: "colton", 
        password: "password123", 
      },
      { 
        username: "Ty", 
        password: "password321",
      },
      { 
        username: "Greg", 
        password: "123password",
      },
      { 
        username: "Bob", 
        password: "321password",
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log("Users created:");
    //console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialBeers() {
  try {
    const beersToCreate = getBeerSeed();
    console.log("Starting to create beers...");
    const beers = await Promise.all(
      beersToCreate.map(createBeer)
    );

    console.log("beers created:");
    //console.log(beers);
    console.log("Finished creating beers!");
  } catch (error) {
    console.error("Error creating beers!");
    throw error;
  }
}

async function createInitialCarts() {
  console.log("Starting to create Carts...");
  try {
    const cartsToCreate = [
      { 
        userId: 1,
        isPurchased: false
      },
      { 
        userId: 1,
        isPurchased: true
      },
      { 
        userId: 2,
        isPurchased: true
      },
      { 
        userId: 2,
        isPurchased: false
      },
      { 
        userId: 3,
        isPurchased: true
      },
      { 
        userId: 3,
        isPurchased: true
      },
      { 
        userId: 3,
        isPurchased: false
      },
      { 
        userId: 4,
        isPurchased: true
      },
      { 
        userId: 4,
        isPurchased: false
      },
    ];
    const carts = await Promise.all(cartsToCreate.map(createCart));
    console.log("Carts created:");
    //console.log(carts);
    console.log("Finished creating Carts!");
  } catch (error) {
    console.error("Error creating Carts!")
    throw error;
  }
}

async function createInitialUserBeers() {
  console.log("Starting to create userBeers...");
  try {
    const userBeersToCreate = [
      { 
        userId: 1,
        beerId: 3,
        favorite: false,
        score: 75
      },
      { 
        userId: 1,
        beerId: 7,
        favorite: true,
        score: 95
      },
      { 
        userId: 1,
        beerId: 13,
        favorite: true,
        score: null
      },
      { 
        userId: 1,
        beerId: 10,
        favorite: true,
        score: 90
      },
      { 
        userId: 2,
        beerId: 23,
        favorite: false,
        score: 50
      },
      { 
        userId: 2,
        beerId: 2,
        favorite: true,
        score: 87
      },
      { 
        userId: 2,
        beerId: 15,
        favorite: true,
        score: null
      },
      { 
        userId: 3,
        beerId: 6,
        favorite: true,
        score: null
      },
      { 
        userId: 3,
        beerId: 12,
        favorite: false,
        score: 85
      },
      { 
        userId: 3,
        beerId: 14,
        favorite: true,
        score: 97
      },
      { 
        userId: 3,
        beerId: 19,
        favorite: true,
        score: 93
      },
      { 
        userId: 4,
        beerId: 22,
        favorite: false,
        score: 91
      },
      { 
        userId: 4,
        beerId: 4,
        favorite: true,
        score: null
      },
      { 
        userId: 4,
        beerId: 20,
        favorite: true,
        score: null
      },
    ];
    const userBeers = await Promise.all(userBeersToCreate.map(createUserBeers));
    console.log("User Beers created:");
    //console.log(userBeers);
    console.log("Finished creating User Beers!");
  } catch (error) {
    console.error("Error creating User Beers!")
    throw error;
  }
}

async function createInitialCartBeers() {
  console.log("Starting to create Cart Beers...");
  try {
    const cartBeersToCreate = [
      { 
        cartId: 1,
        beerId: 13,
        quantity: 2,
        price: 10.97
      },
      { 
        cartId: 2,
        beerId: 3,
        quantity: 1,
        price: 12.99
      },
      { 
        cartId: 2,
        beerId: 7,
        quantity: 1,
        price: 13.99
      },
      { 
        cartId: 2,
        beerId: 10,
        quantity: 1,
        price: 12.79
      },
      { 
        cartId: 3,
        beerId: 23,
        quantity: 1,
        price: 500
      },
      { 
        cartId: 3,
        beerId: 2,
        quantity: 2,
        price: 11.99
      },
      { 
        cartId: 4,
        beerId: 15,
        quantity: 2,
        price: 20.99
      },
      { 
        cartId: 5,
        beerId: 19,
        quantity: 1,
        price: 13.99
      },
      { 
        cartId: 5,
        beerId: 12,
        quantity: 3,
        price: 9.99
      },
      { 
        cartId: 6,
        beerId: 14,
        quantity: 3,
        price: 9.97
      },
      { 
        cartId: 7,
        beerId: 6,
        quantity: 1,
        price: 12.99
      },
      { 
        cartId: 8,
        beerId: 22,
        quantity: 2,
        price: 10.99
      },
      { 
        cartId: 9,
        beerId: 20,
        quantity: 1,
        price: 17.99
      },
      { 
        cartId: 9,
        beerId: 4,
        quantity: 1,
        price: 12.99
      },
    ];
    const cartBeers = await Promise.all(cartBeersToCreate.map(seedCarts));
    console.log("Cart Beers created:");
    //console.log(cartBeers);
    console.log("Finished creating Cart Beers!");
    //console.log(await getUserBeers(3));
  } catch (error) {
    console.error("Error creating Cart Beers!")
    throw error;
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialBeers();
    await createInitialCarts();
    await createInitialUserBeers();
    await createInitialCartBeers();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

rebuildDB();
