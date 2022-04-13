const client = require("./");

async function createUserBeers({userId, beerId, favorite, purchased, score}) {
    // if(!score) {
    //     score = null;
    // }
    // if(!favorite) {
    //     favorite = false;
    // }
 try {
    const { rows: [userBeer] } = await client.query(
        `
            INSERT INTO user_beers("userId", "beerId", favorite, purchased, score)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *;
        `,
        [userId, beerId, favorite, false, score]
    );

    return userBeer;
 } catch(error) {
    throw error; 
 }
}

async function favoriteBeer() {

}

async function scoreBeer() {

}

async function markBeerAsPurchased() {

}

async function getABeersScore(beerId) {
 try {
    const { rows: beers } = await client.query(
      `
            SELECT *
            FROM user_beers
            WHERE "userId"=$1;
          `,
      [beerId]
    );

    if (!beers) {
      throw Error("This beer has not been scored by any users yet!");
    }

    let avgScore = 0;
    let counter = 0;
    for(let i = 0; i < beers.rows.length; i++) {
        if(beers.rows[i]){
           avgScore += beers.rows[i].score;
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

    return userBeers;
  } catch (error) {
    throw error;
  }
}

module.exports = {
    favoriteBeer,
    createUserBeers,
    scoreBeer,
    markBeerAsPurchased,
    getABeersScore,
    getUserBeers
}