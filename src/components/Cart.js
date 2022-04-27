import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Cart = ({ token }) => {
  const [userCart, setUserCart] = useState([]);

  async function fetchCartBeers() {
    const response = await fetch("/api/cart_beers/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const info = await response.json();
    console.log(info, "info test");
    if (info.name) {
      console.log(info.name);
    }

    setUserCart(info);
  }

  useEffect(() => {
    fetchCartBeers();
  }, [token]);

  //Use the Cart.js via api for the requests on buttons.

  async function removeBeerFromCart(beerId) {
    const response = await fetch(`/api/cart_beers/${beerId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await response.json();
    console.log(info);
  }
  //Also helper functions and console logs to test.

  async function updateItemQuanity(beerId, quanity) {
    const response = await fetch(`/api/cart_beers/${beerId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quanity: quanity,
      }),
    });
    const info = await response.json();
    console.log(info);
  }

  return (
    <section className="cart-container">
      <div className="COL-3">
        {/* <h5>Cart Total Items: ({quanity}) </h5> */}
        <table className="table">
          <tbody>
            {userCart.map((cartItem) => {
              return (
                <tr key={userId}>
                  <td>
                    <img src={beerId.image} style={{ height: "6rem" }} />
                  </td>
                  <td>{beerId.name}</td>
                  <td>{beerId.price}</td>
                  <td>Quantity ({beerId.quanity})</td>
                  <td>
                    <button
                      className="btn-update-quanity"
                      onClick={() =>
                        updateItemQuanity(beerId.id, beerId.quanity + 1)
                      }
                    >
                      +
                    </button>
                    <button
                      className="btn-update-quanity"
                      onClick={() =>
                        updateItemQuanity(beerId.id, beerId.quanity - 1)
                      }
                    >
                      -
                    </button>
                    <button
                      className="btn-remove-item"
                      onClick={() => removeBeerFromCart(beerId.id)}
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
        <h2>Total Price ${price}</h2>
      </div>
      <div className="clear-Cart" onClick={() => emptyCart()}>
        Clear Cart
      </div>
    </section>
  );
};

export default Cart;
