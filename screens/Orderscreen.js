import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../actions/orderActions";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Orders from "../components/Orders";

export default function Orderscreen() {
  const dispatch = useDispatch();
  const orderstate = useSelector((state) => state.getUserOrdersReducer);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const { loading, error, orders } = orderstate;

  useEffect(() => {
    dispatch(getUserOrders(currentUser.email));
    setInterval(() => {
      dispatch(getUserOrders(currentUser.email));
    }, 5000);
  }, [currentUser, dispatch]);

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <div className="bg-img" style={{ marginTop: "3rem" }}>
        <h1 className="welcome">MY ORDERS</h1>
      </div>
      <div className="d-flex flex-column align-items-center">
        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {orders && <Orders orders={orders} />}
      </div>
    </div>
  );
}
