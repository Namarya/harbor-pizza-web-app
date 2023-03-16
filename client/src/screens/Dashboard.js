import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../actions/orderActions";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Orders from "../components/Orders";

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
    }, 10000);
  }, [currentUser, dispatch]);

  return (
    <div style={{ marginTop: "3rem", backgroundColor: "#fff" }}>
      <div style={{ padding: "1rem 0rem 0rem 0rem" }}>
        <h2 style={{ fontWeight: "bold", marginBottom: "0px" }}>Dashboard</h2>
      </div>
      <div
        className="row"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {orders && <Orders orders = {orders}/>}
      </div>
    </div>
  );
}
