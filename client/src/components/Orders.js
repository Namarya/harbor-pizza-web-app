import React from "react";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
function formatUSNumber(entry = "") {
  const match = entry
    .replace(/\D+/g, "")
    .replace(/^1/, "")
    .match(/([^\d]*\d[^\d]*){1,10}$/)[0];
  const part1 = match.length > 2 ? `(${match.substring(0, 3)})` : match;
  const part2 = match.length > 3 ? ` ${match.substring(3, 6)}` : "";
  const part3 = match.length > 6 ? `-${match.substring(6, 10)}` : "";
  return `${part1}${part2}${part3}`;
}
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
      <div className="order rounded shadow-lg" key={order._id}>
        <div className="orderdetails">
          <div className="on text-center">
            <b>
              Order:{" "}
              {order._id
                .substring(order._id.length - 10, order._id.length)
                .toUpperCase()}
            </b>
          </div>
          <hr />
          <div>
            <b>Name:</b> {order.name}
          </div>
          <div>
            <b>Phone Number:</b> {formatUSNumber(order.phoneNumber)}
          </div>
          <div>
            <b>Email:</b> {order.email}
          </div>
          <div>
            <b>Order Date:</b> {getPST(order.createdAt)}
          </div>
          <div>
            <b>Amount Paid:</b>{" "}
            {formatter.format(Number(order.orderAmount / 100))}
          </div>
        </div>
        <hr />
        <div className="orderitems">
          <div className="Item Names">
            <div>
              <b>Items</b>
              {order.orderItems[0].name.map((i) => {
                return <div>{i}</div>;
              })}
            </div>
          </div>
          <div className="text-center">
            <div>
              <b>Qty</b>
              {order.orderItems[0].quantity.map((i) => {
                return <div>{i}</div>;
              })}
            </div>
          </div>
          <div className="text-center">
            <div>
              <b>Price</b>
              {order.orderItems[0].prices.map((i) => {
                return <div>{i}</div>;
              })}
            </div>
          </div>
        </div>
        {order.readyForPickup ? (
          <div>
            <hr />
            <span>
              {" "}
              <b>Status: </b>Ready For Pickup{" "}
              <i className="fa-solid fa-square-check fa-bounce"></i>
            </span>
          </div>
        ) : (
          <div>
            <hr />
            <span>
              {" "}
              <b>Status: </b>In Progress{" "}
              <i class="fa-solid fa-arrow-rotate-right fa-spin"></i>
            </span>
          </div>
        )}
      </div>
    );
  });
}
