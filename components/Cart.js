import React from "react";
import { useSelector } from "react-redux";

export default function Cart() {
  const cartstate = useSelector((state) => state.cartReducer);
  return (
    <div
      className=" d-flex justify-content-center align-items-center position-fixed rounded-circle bg-white shadow-lg"
      style={{ width: "3rem", height: "3rem", bottom: "5%", right: "2%" }}
    >
      <a className="cart-link mt-1" href="/cart">
        <i className="fa-solid fa-cart-shopping fa-lg me-1"></i>
        <span className="rounded-circle cartitem-amount">
          {cartstate.cartItems.length}
        </span>
      </a>
    </div>
  );
}
