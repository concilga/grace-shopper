const bcrypt = require("bcrypt");
const client = require("./");

async function getUserProfilePic() {
  const profilePicNum = Math.floor(Math.random() * 5);
  let profilePic = "";

  switch (profilePicNum) {
    case 0:
      profilePic = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80";
      break;
    case 1: 
      profilePic = "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80";
      break;
    case 2: 
      profilePic = "https://images.pexels.com/photos/2599245/pexels-photo-2599245.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
      break;
    case 3: 
      profilePic = "https://images.unsplash.com/photo-1485981133625-f1a03c887f0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
      break;
    case 4: 
      profilePic = "https://images.pexels.com/photos/220429/pexels-photo-220429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      break;
    default:
      console.log("There was an error!")
  }
  return profilePic;
}

async function createUser({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(username, password, "profilePic")
        VALUES($1, $2, $3)
        RETURNING *;
      `,
      [username, hashedPassword, await getUserProfilePic()]
    );
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username=$1;
      `,
      [username]
    );
    if (!user) return null;
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
      delete user.password;
      return user;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          SELECT *
          FROM users
          WHERE id=$1
        `,
      [id]
    );

    delete user.password;
    //console.log(user, "test getByID")
    return user;
  } catch (error) {
    throw error;
  }
}
async function getUserByUsername(username) {
  
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT *
        FROM users
        WHERE username=$1;
        `,
      [username]
    );
    
    return user;
  } catch (error) {
    throw error;
  }
}

async function makeUserAdmin() {

}

// async function editCartForUser(userId, checkCart) {
//     try {
//         let updatedUser = await getUserById(id);
//         // If it doesn't exist, throw an error with a useful message
//         if (!updatedUser) {
//         throw Error("User does not exist with that id");
//         }
//         //update the activity if there are no failures, as above
//     await client.query(
//         `
//         UPDATE users
//         SET "checkCart"=$1
//         WHERE id=$2
//         RETURNING *;
//         `,
//         [checkCart, userId]
//     );
    
//         updatedUser = await getUserById(id);
//         return updatedUser;
//     } catch (error) {
//         throw error;
//     }
// }

module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByUsername,
};