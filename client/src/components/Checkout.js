import React from "react";
import { useSelector } from "react-redux";
import Success from "./Success";
import Loading from "./Loading";
import Error from "./Error";
import PayButton from "./PayButton";

export default function Checkout() {
  const orderstate = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderstate;
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const cartstate = useSelector((state) => state.cartReducer);

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
      {error && <Error error={"" + error.substring(7, error.length)} />}

      {success && (
        <div>
          <Success success="Your order was placed successfully" />
          {handleOrderSuccess()}
        </div>
      )}
      <PayButton cartItems={cartstate.cartItems} />
    </div>
  );
}
