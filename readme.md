1. Create a .env file in the root directory with the below info replacing any values that have changed:

DB_PASSWORD=postgres
DB_USER=postgres
DB_NAME=grace-shopper

2. Create a local database called "grace-shopper"


3. Tables = beer, user, cart
possible tables to add: beer_carts(reording beer and purchance data(top ten), purchaseInfo(for users coming back to the site)


beer functions: 
beer table: id, name, description, image, brewery, style, abv, price, avgScore
db functions:
1. createBeer 
2. deleteBeer
3. editBeer
7. getBeerByName
8. getBeerById
9. getBeerByStyle
10. getBeerByBrewery
11. getAllBeers
12. getBeersByUser
13. averageScore * 

api:
1. get allBeers
2. post createBeer
3. delete deleteBeer
4. patch editBeer
5. get beerById

user:
user table: id, username(string), password(string), admin(boolean), profilePic(string)
1. createUser
2. verifyUser
3. getUserByUsername
4. getUserbyId

api: 
get User
post createUser
post login


cart:
cart table: id, userId, isPurchased
1. createCart
1. getCartById
2. getCartByUserId 
4. editCart
5. closeCart
6. deleteCart

api: 
2. get userCart
4. get userPastOrders
5. delete DeleteCart
6. patch purchaseCart

user_beers
tabel: id, userId, beerId, favorite, score
1. createUserBeers
    (
        favoriteBeer
        scoreBeer
    )
5. 
2. markBeersAsPurchased
3. getABeersScore
4. getUserBeers(these two should use this one function)
    (
      getUserFavorites
      getUserPurchased
    )
api: 
1. get userBeers
3. patch favorite, score
4. post. (createUserBeer) favorite, score
5. get scoreByBeerId

cart_beers 
table: id, cartId, beerId, quantity, price
2. changeBeerQuantity
3. addBeerToCart
4. removeBeerCart
4. getCartBeerById
5. getCartBeersByCartId
6. getCartBeersByBeerId 

api:
1. patch editQuantity
2. post addBeer
3. delete removeBeer
4. get beers in specific cart.
5. get  a specific beer in any cart (*)