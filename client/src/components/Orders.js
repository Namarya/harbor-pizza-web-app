import React from "react";
import ReadyForPickupButton from "./ReadyForPickupButton";

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const getPST = (time) => {
  var timestamp = time; // given timestamp in UTC
  var date = new Date(timestamp);
  var pstDate = date.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  });
  return pstDate;
};

export default function Orders({ orders }) {
  return orders.map((order) => {
    return (
      <div
        key={order._id}
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
          style={{
            width: "100%",
            gap: "1rem",
            justifyContent: "space-evenly",
          }}
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
            <div className="flex-container flex-column" style={{ gap: "1em" }}>
              {order.orderItems.map((item) => {
                return (
                  <div
                    key={item._id}
                    style={{ textAlign: "start", marginLeft: "1rem" }}
                  >
                    {item.name.toLowerCase().indexOf("pizza") === -1 ? (
                      <p className="m-0">
                        <b>{item.name}</b>
                      </p>
                    ) : (
                      <div>
                        <p className="m-0">
                          <b>{item.name}</b>
                        </p>
                        <p className="m-0">
                          Size:{" "}
                          {capitalize(
                            item.size.substring(0, item.size.indexOf("("))
                          )}
                        </p>
                      </div>
                    )}
                    <p className="m-0">Qty: {item.quantity}</p>
                    <p className="m-0">Price: ${item.price.toFixed(2)}</p>
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
              <p className="m-0">
                Order #:{" "}
                <b>
                  {order._id.substring(order._id.length - 10).toUpperCase()}
                </b>
              </p>
              <p className="m-0">Customer Email: {order.email}</p>
              <p className="m-0">Order Date: {getPST(order.createdAt)}</p>
              <p className="m-0">
                Total Amount Paid:{" "}
                {formatter.format(Number(order.orderAmount / 100))}
              </p>
              <ReadyForPickupButton orderId={order._id} />
              <p>
                Order Status:{" "}
                {order.readyForPickup ? (
                  <span>
                    Ready <i className="fa-solid fa-square-check"></i>
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
  });
}
