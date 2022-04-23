import React from "react";
import { Link } from "react-router-dom";
import { getUserOpenCart } from "../../db/cart";
const Cart = () => {
  const {
    items,
    totalUniqueItems,
    totalItems,
    updateItemQuanity,
    removeItem,
    emptyCart,
  } = getUserOpenCart();
  if (isEmpty) return <h1 className="cart-text">Your Cart is Empty</h1>;
  return (
    <section className="cart-container">
      <div className="COL-3">
        <h5>
          Cart ({totalUniqueItems}) total Items: ({totalItems}){" "}
        </h5>
        <table className="table">
          <tbody>
            {items.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img src={item.image} style={{ height: "6rem" }} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>Quantity ({item.quanity})</td>
                  <td>
                    <button
                      className="btn-update-quanity"
                      onClick={() =>
                        updateItemQuanity(item.id, item.quanity + 1)
                      }
                    >
                      +
                    </button>
                    <button
                      className="btn-update-quanity"
                      onClick={() =>
                        updateItemQuanity(item.id, item.quanity - 1)
                      }
                    >
                      -
                    </button>
                    <button
                      className="btn-remove-item"
                      onClick={() => removeItem(item.id)}
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
        <h2>Total Price ${cartTotal}</h2>
      </div>
      <div className="clear-Cart" onClick={() => emptyCart()}>
        Clear Cart
      </div>
    </section>
  );
};
export default Cart;
