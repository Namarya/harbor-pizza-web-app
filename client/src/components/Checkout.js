import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder, placeGuestOrder } from "../actions/orderActions";
import Success from "./Success";
import Loading from "./Loading";
import Error from "./Error";

export default function Checkout({ total }) {
  const orderstate = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderstate;
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const dispatch = useDispatch();

  function tokenHandler(token) {
    // console.log(token)
    dispatch(placeOrder(token, total));
  }
  function guestTokenHandler(token) {
    // console.log(token)
    dispatch(placeGuestOrder(token, total));
  }
  const handleOrderSuccess = () => {
    setTimeout(() => {
      Promise.resolve()
        .then(() => {
          localStorage.removeItem("cartItems");
        })
        .then(() => {
          if (currentUser) {
            window.location.href = "/orders";
          } else {
            window.location.href = "/success";
          }
        });
    }, 1000);
  };
  return (
    <div>
      {loading && <Loading />}
      {error && (
        <Error
        error={""+error.substring(7, error.length)}
        />
      )}
      {success && (
        <div>
          <Success success="Your order was placed successfully" />
          {handleOrderSuccess()}
        </div>
      )}

      {currentUser ? (
        <StripeCheckout
          amount={total * 100}
          billingAddress
          shippingAddress
          token={tokenHandler}
          currency="USD"
          stripeKey="pk_test_51MW4FAJH9w2Msobec3si6t36Ml126mM4bqwznNuOOu3oGn0lX3j5TNyQSu5w0xg7OV0RZfxRxsmnM7dZrORNiSmZ00DSTizaNt"
        >
          <button className="btn">PAY NOW</button>
        </StripeCheckout>
      ) : (
        <div className="d-flex flex-wrap align-items-center gap-3 justify-content-center">
          <a href="/login">
            <button className="btn" style={{ width: "15rem" }}>
              Login
            </button>
          </a>
          <StripeCheckout
            amount={total * 100}
            billingAddress
            shippingAddress
            token={guestTokenHandler}
            currency="USD"
            stripeKey="pk_test_51MW4FAJH9w2Msobec3si6t36Ml126mM4bqwznNuOOu3oGn0lX3j5TNyQSu5w0xg7OV0RZfxRxsmnM7dZrORNiSmZ00DSTizaNt"
          >
            <button className="alt-btn rounded" style={{ width: "15rem" }}>
              Checkout As Guest
            </button>
          </StripeCheckout>
        </div>
      )}
    </div>
  );
}
