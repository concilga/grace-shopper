import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Cart = ({ token, user }) => {
  if(!token) {
    return (
      <h1>Please Log In To Access a Cart!</h1>
    )
  }

  const [userCart, setUserCart] = useState([]);
  const [error, setError] = useState('');
  const [totalPrice, setTotalPrice] = useState(null);
  const history = useNavigate();

  async function fetchCartBeers() {
    try {
      const response = await fetch("/api/cart_beers/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const info = await response.json();

      if (info.name) {
        setError(info.name);
      }

      setUserCart(info);
      return(info);
    } catch(error) {
      setError(error);
    }
  }
  //Use the Cart.js via api for the requests on buttons.

  async function removeBeerFromCart(beerId) {
    try {
      const response = await fetch(`/api/cart_beers/${beerId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const info = await response.json();
          console.log(info, "remove beer");
          await fetchCartBeers();
          getTotalPrice();
    } catch(error) {
      setError(error)
    }
  }
  //Also helper functions and console logs to test.

  async function updateItemQuantity(beerId, quantity) {
    try {
      const response = await fetch(`/api/cart_beers/${beerId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              quantity: quantity,
            }),
          });
          const info = await response.json();
          await fetchCartBeers();
          getTotalPrice();
    } catch(error) {
      setError(error);
    }
    
  }

  async function handelPurchaseClick() {
    try {
      console.log(userCart);
      const response = await fetch(`/api/cart/${userCart[0].cartId}`, {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const info = await response.json();
          fetchCartBeers();
          history("/");
    } catch(error) {
      setError(error)
    }
  }

  async function getTotalPrice(){
    const cartBeers = await fetchCartBeers();
    if(cartBeers[0].price) {
      let cartTotal = 0;

      cartBeers.map((beer) => {
        cartTotal += (beer.price * beer.quantity);
      })

      setTotalPrice(cartTotal);
    }
  }

  useEffect(() => {
    fetchCartBeers();
    getTotalPrice();
  }, [token]);
  
  if(!userCart[0]) {
    return(
      <div id="empty-cart">
        <div id="empty-message">
          <h1 >You do not have any beers in your cart yet!!!</h1>
          <p>Hit the button below to explore our amazing selection of beers!</p>
          <button className="button1">
            <Link id="link" to="/Beer">Explore</Link>
          </button>
        </div>
      </div>
      
    )
  }
  const { username } = user;
  return (
    <section className="cart-container">
      <div className="COL-3">
        <h1>{username}'s Cart: </h1>
        <table className="table">
          <tbody>
            {userCart.map((beer) => {
              return (
                <tr key={beer.beer.id}>
                  <td>
                    <img src={beer.beer.image} style={{ height: "8rem" }} />
                  </td>
                  <td id="cart_beer_name">{beer.beer.name}</td>
                  <td>${beer.price}</td>
                  <td id="cart_beer_qnt">Quantity ({beer.quantity})</td>
                  <td>
                    <button
                      className="btn-update-quanity"
                      id="btn-quanity"
                      onClick={() =>
                        updateItemQuantity(beer.beer.id, beer.quantity + 1)
                      }
                    >
                      +
                    </button>
                    {beer.quantity !== 1 ? (
                      <button
                        className="btn-update-quanity"
                        id="btn-quanity"
                        onClick={() =>
                          updateItemQuantity(beer.beer.id, beer.quantity - 1)
                        }
                      >
                        -
                      </button>
                    ) : (
                      null
                    ) 
                    }
                    
                    <button
                      className="btn-remove-item"
                      onClick={() => removeBeerFromCart(beer.beer.id)}
                    >
                      Remove Item
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="cart-total-price">
        <h2>Total Price: {totalPrice}</h2>
      </div>
      <button className="button1" onClick={() => handelPurchaseClick()}>
        Purchase Cart
      </button>
    </section>
  );
};

export default Cart;
