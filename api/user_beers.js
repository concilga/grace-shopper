const express = require("express");
const userBeersRouter = express.Router();
const {
    createUserBeers,
    editUserBeer,
    getUserBeers,
    getABeersScore
} = require("../db/export");

userBeersRouter.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return next({
        name: "userVerificationError",
        message: "Only a logged in user can access their user information!",
      });
    }

    const userId = req.user.id;

    const usersBeers = getUserBeers(userId);
    res.send(usersBeers);
  } catch (error) {
    next(error);
  }
});

userBeersRouter.post("/", async (req, res, next) => {
    try {
      if (!req.user) {
        return next({
          name: "userVerificationError",
          message: "Only a logged in user can access their user information!",
        });
      }

      const userId = req.user.id;
      const { beerId, score, favorite } = req.body;

      if(!score) {
        score = null;
      }
      if(!favorite) {
        favorite = false;
      }
  
      const newUserBeer = await createUserBeers({ userId, beerId, score, favorite });
  
      res.send(newUserBeer);
    } catch (error) {
      next(error);
    }
});

userBeersRouter.patch("/", async (req, res, next) => {
    try {
        if (!req.user) {
          return next({
            name: "userVerificationError",
            message: "Only a logged in user can edit user information!",
          });
        }
  
        const userId = req.user.id;
        const { beerId, score, favorite } = req.body;
  
        if(!score) {
          score = null;
        }
        if(!favorite) {
          favorite = undefined;
        }
    
        const newUserBeer = await editUserBeer({ userId, beerId, score, favorite });
    
        res.send(newUserBeer);
      } catch (error) {
        next(error);
      }
});