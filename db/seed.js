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
      DROP TABLE IF EXISTS beers_users;
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
      
      beers_users(
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
    console.log("activities created:");
    //console.log(activities);
    console.log("Finished creating activities!");
  } catch (error) {
    console.error("Error creating activities!");
    throw error;
  }
}

