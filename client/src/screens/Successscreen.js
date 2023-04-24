import React from "react";
import { useSelector } from "react-redux";

export default function Successscreen() {
  localStorage.removeItem("cartItems");
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "#fff" }}
    >
      <div
        id="thankyou"
        className="shadow-lg rounded p-3"
        style={{ width: "25rem", backgroundColor: "#FFF" }}
      >
        <div>
          <h2 style={{ fontWeight: "700" }}>Thank you!</h2>
        </div>
        <div>
          <p>
            We have received your order and will start working on it right away!
            You should receive an email from{" "}
            <a href="mailto:harborpizza@outlook.com">harborpizza@outlook.com</a>{" "}
            with details about your order.{" "}
          </p>
        </div>
        {currentUser && (
          <div className="p-1">
            <a className="text-decoration-none" href="/orders">
              View Order
            </a>
          </div>
        )}
        <hr />
        <div>
          <p style={{ fontSize: ".8rem" }}>
            If you have any questions, you can contact us at{" "}
            <a href="tel:+17145540084">(714)554-0084</a>. Or send us an email at{" "}
            <a href="mailto:harborpizza@outlook.com">harborpizza@outlook.com</a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
