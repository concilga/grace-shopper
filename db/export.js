// require and re-export all files in this db directory (users, activities...)
const client = require("./index");

// require and re-export all files in this db directory (users, activities...)

module.exports = {
  ...require("./users"), // adds key/values from users.js
  ...require("./beer"), // adds key/values from activites.js
  ...require("./cart"), // etc
  ...require("./cart_beers"), // etc
  ...require("./user_beers"), // etc
};