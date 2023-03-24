import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../actions/orderActions";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function Orderscreen() {
  const dispatch = useDispatch();
  const orderstate = useSelector((state) => state.getUserOrdersReducer);
  const { loading, error, orders } = orderstate;
  function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }
  const getPST = (time) => {
    var timestamp = time; // given timestamp in UTC
    var date = new Date(timestamp);
    var pstDate = date.toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    });
    return pstDate;
  };
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  
  useEffect(() => {
    dispatch(getUserOrders());
    setInterval(() => {
      dispatch(getUserOrders());
    }, 10000);
  }, [dispatch]);
  return (
    <div style={{ marginTop: "3rem", backgroundColor: "#fff" }}>
      <div style={{ padding: "1rem 0rem 0rem 0rem" }}>
        <h2 style={{ fontWeight: "bold", marginBottom: "0px" }}>My Orders</h2>
      </div>
      {orders.length ? (
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
          {orders &&
            orders.map((order) => {
              return (
                <div
                  className="col"
                  style={{
                    
                    padding: "1rem",
                    margin: "3px",
                    backgroundColor: "#eeeeee",
                    width: "42rem",
                  }}
                >
                  {/* Order */}
                  <div
                    className="flex-container flex-row"
                    style={{ width: "100%", justifyContent: "space-evenly" }}
                  >
                    <div style={{ textAlign: "start", padding: "1rem" }}>
                      <h2
                        style={{
                          padding: "1rem",
                          backgroundColor: "#dcdcdc",
                        }}
                      >
                        Items
                      </h2>
                      <div
                        className="flex-container flex-column"
                        style={{ gap: "1em" }}
                      >
                        {order.orderItems.map((item) => {
                          return (
                            <div
                              style={{ textAlign: "start", marginLeft: "1rem" }}
                            >
                              {item.name.toLowerCase().indexOf("pizza") ===
                              -1 ? (
                                <p className="m-0">
                                  <b>{item.name}</b>
                                </p>
                              ) : (
                                <div>
                                  <p className="m-0">
                                    <b>{item.name}</b>
                                  </p>
                                  <p className="m-0">
                                    Size: {capitalize(item.size)}
                                  </p>
                                </div>
                              )}
                              <p className="m-0">
                                Price: ${item.price.toFixed(2)}
                              </p>
                              <p className="m-0">Qty: {item.quantity}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div style={{ textAlign: "start", padding: "1rem" }}>
                      <h2
                        style={{
                          padding: "1rem",
                          backgroundColor: "#dcdcdc",
                        }}
                      >
                        Order Details
                      </h2>
                      <div style={{ textAlign: "start", marginLeft: "1rem" }}>
                        <p className="m-0">Order #: <b>{order._id.substring(order._id.length-10).toUpperCase()}</b></p>
                        <p className="m-0">
                          Order Date: {getPST(order.createdAt)}
                        </p>
                        <p className="m-0">
                          Total Amount:{" "}
                          {formatter.format(Number(order.orderAmount / 100))}
                        </p>
                        <p>
                          Order Status:{" "}
                          {order.readyForPickup ? (
                            <span>
                              Ready <i class="fa-solid fa-square-check"></i>
                            </span>
                          ) : (
                            <span>
                              In progress <i className="fa-solid fa-clock"></i>
                            </span>
                          )}
                        </p>
                      </div>
                      {/* <p>Transaction ID: {order.transactionId}</p> */}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="p-5">
          <svg className="svg-icon" viewBox="0 0 1024 1024" width={"100px"}>
            <path d="M386.592 690.656h320a16 16 0 1 1 0 32h-320a16 16 0 1 1 0-32zM306.592 690.656a16 16 0 1 1 0 32 16 16 0 1 1 0-32zM386.592 530.656h320a16 16 0 1 1 0 32h-320a16 16 0 1 1 0-32zM306.592 530.656a16 16 0 1 1 0 32 16 16 0 1 1 0-32zM386.592 370.656h320a16 16 0 1 1 0 32h-320a16 16 0 1 1 0-32zM306.592 370.656a16 16 0 1 1 0 32 16 16 0 0 1 0-32z" />
            <path d="M568.336 242.656h-128c-30.88 0-56-25.12-56-56v-48c0-30.88 25.12-56 56-56h128c30.88 0 56 25.12 56 56v48c0 30.864-25.136 56-56 56z m-128-128c-13.232 0-24 10.768-24 24v48c0 13.232 10.768 24 24 24h128c13.232 0 24-10.768 24-24v-48c0-13.232-10.768-24-24-24h-128z" />
            <path d="M706.48 915.28H306.672c-79.504 0-144.192-62.304-144.192-138.88v-491.52c0-76.576 64.672-138.88 144.192-138.88h31.152a16 16 0 0 1 0 32h-31.152c-61.856 0-112.192 47.952-112.192 106.88v491.52c0 58.944 50.336 106.88 112.192 106.88h399.808c61.856 0 112.192-47.936 112.192-106.88v-491.52c0-58.928-50.336-106.88-112.192-106.88h-31.408a16 16 0 1 1 0-32h31.408c79.504 0 144.192 62.304 144.192 138.88v491.52c0 76.592-64.688 138.88-144.192 138.88z" />
          </svg>
          <h1>Place an order to see your past orders!</h1>
          <a href="/menu">
            <button className="btn">
              <i className="fa-solid fa-cart-shopping me-1"></i>GO TO MENU
            </button>
          </a>
        </div>
      )}
    </div>
  );
}
