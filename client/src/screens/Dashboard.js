import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../actions/orderActions";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Order from "../components/Order";

export default function Dashboard() {
  const dispatch = useDispatch();
  const orderstate = useSelector((state) => state.getAllOrdersReducer);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const { loading, error, orders } = orderstate;

  useEffect(() => {
    if (localStorage.getItem("currentUser") === null || !currentUser.isAdmin) {
      window.location.href = "/";
    }
    dispatch(getAllOrders());
    setInterval(() => {
      dispatch(getAllOrders());
    }, 5000);
  }, [currentUser, dispatch]);

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <div className="bg-img" style={{ marginTop: "3rem" }}>
        <h1 className="welcome">DASHBOARD</h1>
      </div>
      <div
      className="d-flex flex-column align-items-center"
      >
        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {orders && <Order orders={orders} />}
      </div>
    </div>
  );
}
