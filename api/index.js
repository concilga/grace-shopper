const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getUserById } = require("../db");
const { JWT_SECRET } = process.env;

// set `req.user` if possible
apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }

  next();
});

const beerRouter = require("./beer");
apiRouter.use("/beer", beerRouter);

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const cartRouter = require("./cart");
apiRouter.use("/cart", cartRouter);

const cartBeersRouter = require("./cart_beers");
apiRouter.use("/cart_beers", cartBeersRouter);

const userBeersRouter = require("./user_beers");
apiRouter.use("/user_beers", userBeersRouter);

module.exports = apiRouter;