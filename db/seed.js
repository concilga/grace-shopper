require("dotenv").config();
const client = require("./");
const { getBeerSeed } = require("./beerSeed");
const { createUser } = require("./users");

const dropTables = async () => {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
      DROP TABLE IF EXISTS beers;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS carts;
      DROP TABLE IF EXISTS user_beers;
      DROP TABLE IF EXISTS carts_beers;
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
        discription VARCHAR(255), image VARCHAR(255), 
        brewery VARCHAR(255), style VARCHAR(255), abv INTEGER,
        price INTEGER
      );

      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "cartCheck" BOOLEAN DEFAULT false
      );

      CREATE TABLE carts(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "isPurchased" BOOLEAN DEFAULT false
      );
      
      user_beers(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "beerId" INTEGER REFERENCES beers(id),
        "favorite" BOOLEAN DEFAULT false,
        "purchased" BOOLEAN DEFAULT false,
        "score" INTEGER
      );

      carts_beers(
        id SERIAL PRIMARY KEY,
        "cartId" INTEGER REFERENCES carts(id),
        "beerId" INTEGER REFERENCES beers(id),
        quantity INTEGER,
        price INTEGER
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
        cartCheck: true
      },
      { 
        username: "Ty", 
        password: "password321",
        cartCheck: true
      },
      { 
        username: "Greg", 
        password: "123password",
        cartCheck: true
      },
      { 
        username: "Bob", 
        password: "321password",
        cartCheck: false 
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialBeers() {
  try {
    console.log("Starting to create beers...");
    const beers = await Promise.all(
      beersToCreate.map(getBeerSeed())
    );

    console.log("beers created:");
    console.log(beers);
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
        isPurchased: false
      },
      { 
        userId: 2,
        isPurchased: false
      },
      { 
        userId: 3,
        isPurchased: false
      },
      { 
        userId: 3,
        isPurchased: true
      },
    ];
    const carts = await Promise.all(cartsToCreate.map(createCart));
    console.log("Carts created:");
    console.log(carts);
    console.log("Finished creating Carts!");
  } catch (error) {
    console.error("Error creating Carts!")
    throw error;
  }
}

async function createInitialuserBeers() {
  console.log("Starting to create userBeers...");
  try {
    const usersBeersToCreate = [
      { 
        userId: 1,
        beerId: 3,
        favorite: false,
        purchased: true,
        score: 75
      },
      { 
        userId: 1,
        beerId: 7,
        favorite: true,
        purchased: true,
        score: 95
      },
      { 
        userId: 1,
        beerId: 13,
        favorite: true,
        purchased: false,
        score: null
      },
      { 
        userId: 1,
        beerId: 10,
        favorite: true,
        purchased: true,
        score: 90
      },
      { 
        userId: 2,
        beerId: 24,
        favorite: false,
        purchased: true,
        score: 50
      },
      { 
        userId: 2,
        beerId: 2,
        favorite: true,
        purchased: true,
        score: 87
      },
      { 
        userId: 2,
        beerId: 15,
        favorite: true,
        purchased: false,
        score: null
      },
      { 
        userId: 3,
        beerId: 6,
        favorite: true,
        purchased: false,
        score: null
      },
      { 
        userId: 3,
        beerId: 12,
        favorite: false,
        purchased: true,
        score: 85
      },
      { 
        userId: 3,
        beerId: 14,
        favorite: true,
        purchased: true,
        score: 97
      },
      { 
        userId: 3,
        beerId: 19,
        favorite: true,
        purchased: true,
        score: 93
      },
      { 
        userId: 4,
        beerId: 22,
        favorite: false,
        purchased: true,
        score: 91
      },
      { 
        userId: 4,
        beerId: 4,
        favorite: true,
        purchased: false,
        score: null
      },
      { 
        userId: 4,
        beerId: 20,
        favorite: true,
        purchased: false,
        score: null
      },
    ];
    const userBeers = await Promise.all(userBeersToCreate.map(createUserBeers));
    console.log("User Beers created:");
    console.log(userBeers);
    console.log("Finished creating User Beers!");
  } catch (error) {
    console.error("Error creating UserBeers!")
    throw error;
  }
}
