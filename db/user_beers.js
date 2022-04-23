const client = require("./");
const { getBeerById } = require("./beer");
const { getUserPurchasedCarts } = require("./cart");
const { getCartBeersByCartId } = require("./cart_beers");

async function createUserBeers({userId, beerId, favorite, score}) {

 try {
    const { rows: [userBeer] } = await client.query(
        `
            INSERT INTO user_beers("userId", "beerId", favorite, score)
            VALUES($1, $2, $3, $4)
            RETURNING *;
        `,
        [userId, beerId, favorite, score]
    );

    return userBeer;
 } catch(error) {
    throw error; 
 }
}

async function editUserBeer({userId, beerId, favorite, score}) {
  try {
    const {
      rows: [beer],
    } = await client.query(
      `
        SELECT * 
        FROM user_beers
        WHERE "userId"=$1
        AND "beerId"=$2
        RETURNING *
      `[userId, beerId]
    );

    if (!beer) {
      return false;
    }

    if(score) {
      await client.query(
        `
          UPDATE user_beers
          SET score=$1,
          WHERE "beerId"=$2
          AND "userId"=$3
          RETURNING *;
          `,
        [score, beerId, userId]
      );
    }

    if(favorite) {
      await client.query(
        `
          UPDATE user_beers
          SET favorite=$1,
          WHERE "beerId"=$2
          AND "userId"=$3
          RETURNING *;
          `,
        [favorite, beerId, userId]
      );
    }

    const {
      rows: [userBeer],
    } = await client.query(
      `
        SELECT * 
        FROM user_beers
        WHERE "userId"=$1
        AND "beerId"=$2
        RETURNING *
      `[userId, beerId]
    );
    return userBeer;
  } catch (error) {
    throw error;
  }
}

async function getABeersScore(beerId) {
 try {
    const { rows: beers } = await client.query(
      `
            SELECT *
            FROM user_beers
            WHERE "beerId"=$1;
          `,
      [beerId]
    );

    if (!beers) {
      throw Error("This beer has not been scored by any users yet!");
    }

    let avgScore = 0;
    let counter = 0;
    for(let i = 0; i < beers.length; i++) {
        if(beers[i]){
           avgScore += beers[i].score;
           counter++;
        } 
    }
    avgScore = avgScore / counter; 

    return avgScore;
  } catch (error) {
    throw error;
  }
}

async function getUserBeers(userId) {
 try {
    const { rows: userBeers } = await client.query(
      `
            SELECT *
            FROM user_beers
            WHERE "userId"=$1;
          `,
      [userId]
    );

    if (!userBeers) {
      throw Error("This user does not have any beers associated with their userId");
    }

    let beers = {
      favorite: [],
      scored: [],
      purchaced: []
    }

    for(let l = 0; l < userBeers.length; l++) {
      if(userBeers[l].favorite === true) {
        beers.favorite.push(await getBeerById(userBeers[l].beerId))
      }
      if(userBeers[l].score) {
        const beer = await getBeerById(userBeers[l].beerId)
        const score = userBeers[l].score
        beers.scored.push({beer, score})
      }
    }

    const purchasedCarts = await getUserPurchasedCarts(userId);
    let purchasedBeers = [];
    if(purchasedCarts) {
      for(let i = 0; i < purchasedCarts.length; i++) {
        purchasedBeers.push(await getCartBeersByCartId(purchasedCarts[i].id));
      }

      for(let j = 0; j < purchasedBeers.length; j++) {
        if(purchasedBeers[j].length === 1) {
          beers.purchaced.push(await getBeerById(purchasedBeers[j][0].beerId));
        } else {
          for(let k = 0; k < purchasedBeers[j].length; k++) {
            beers.purchaced.push(await getBeerById(purchasedBeers[j][k].beerId));
          }
        }
      }
    }
    
    return beers;
  } catch (error) {
    throw error;
  }
}


module.exports = {
    createUserBeers,
    editUserBeer,
    getUserBeers,
    getABeersScore
}