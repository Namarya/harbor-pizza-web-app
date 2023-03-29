const express = require("express");
require("dotenv").config();
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const Order = require("../models/orderModel");
const nodeMailer = require("nodemailer");

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

// Send user an email that the order was received and include their order number and details
function orderConfirmationEmail(order, cartItems, user) {
  const temp = JSON.stringify(order._id);
  const ordernumber = temp
    .substring(temp.length - 11, temp.length - 1)
    .toUpperCase();
  var date = new Date();
  var pstDate = date.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  });
  const orderamount = order.orderAmount;

  async function main() {
    const transporter = nodeMailer.createTransport({
      service: "hotmail",
      auth: {
        user: "harborpizza@outlook.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: "Harbor Pizza <harborpizza@outlook.com>",
      to: order.email,
      subject: `Order Confirmation (${capitalize(ordernumber)})`,
      html: `

      <h2>Dear ${capitalize(user.name)},</h2>
      <p>Thank you for your recent order at harborpizza.app! Your order should be ready in 20 to 30 minutes. You will receive an email once your order is ready for pickup.</p> 
      <hr>   
      <div>
        <div>
          <h3>Order Details</h3>
          <div>Order #: <b>${ordernumber}</b></div>
          <div>Date Ordered: ${pstDate} (Pacific Standard Time)</div>
          <div>Amount Paid: $${(orderamount / 100).toFixed(2)}</div>
        </div>
        <br>
        <div style="display:flex; justify-content:space-evenly;">
          <div><b>Items</b>${cartItems
            .map((item) => {
              return `<div>${capitalize(item.name.toLowerCase())}</div>`;
            })
            .join("")}
          </div>
          <div style="margin-left: 1.2rem;"><b>Qty</b>${cartItems
            .map((item) => {
              return `<div>${item.quantity}</div>`;
            })
            .join("")}
          </div>
          <div style="margin-left: 1.2rem;"><b>Price</b>${cartItems
            .map((item) => {
              return `<div>$${item.price.toFixed(2)}</div>`;
            })
            .join("")}
          </div>             
        </div>
        <br>
        <hr>  
        <div>
            <h2>Thank you!</h2>
            <div><b>Harbor Pizza</b></div>
            <div>13917 Harbor Blvd, Garden Grove, CA 92843</div>
            <div>(714)554-0084</div>
        </div>
      </div>

      `,
    });

    console.log("Message Sent: " + info.messageId);
  }

  main().catch((e) => console.log(e));
}

// Send guest an email that the order was received and include their order number and details
function orderConfirmationGuestEmail(order, cartItems) {
  const temp = JSON.stringify(order._id);
  const ordernumber = temp
    .substring(temp.length - 11, temp.length - 1)
    .toUpperCase();
  var date = new Date();
  var pstDate = date.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  });
  const orderamount = order.orderAmount;

  async function main() {
    const transporter = nodeMailer.createTransport({
      service: "hotmail",
      auth: {
        user: "harborpizza@outlook.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: "Harbor Pizza <harborpizza@outlook.com>",
      to: order.email,
      subject: `Order Confirmation (${capitalize(ordernumber)})`,
      html: `

      <h2>Dear Guest,</h2>
      <p>Thank you for your recent order at harborpizza.app! Your order should be ready in 20 to 30 minutes. You will receive an email once your order is ready for pickup.</p> 
      <hr>   
      <div>
        <div>
          <h3>Order Details</h3>
          <div>Order #: <b>${ordernumber}</b></div>
          <div>Date Ordered: ${pstDate} (Pacific Standard Time)</div>
          <div>Amount Paid: $${(orderamount / 100).toFixed(2)}</div>
        </div>
        <br>
        <div style="display:flex; justify-content:space-evenly;">
          <div><b>Items</b>${cartItems
            .map((item) => {
              return `<div>${capitalize(item.name.toLowerCase())}</div>`;
            })
            .join("")}
          </div>
          <div style="margin-left: 1.2rem;"><b>Qty</b>${cartItems
            .map((item) => {
              return `<div>${item.quantity}</div>`;
            })
            .join("")}
          </div>
          <div style="margin-left: 1.2rem;"><b>Price</b>${cartItems
            .map((item) => {
              return `<div>$${item.price.toFixed(2)}</div>`;
            })
            .join("")}
          </div>             
        </div>
        <br>
        <hr>  
        <div>
            <h2>Thank you!</h2>
            <div><b>Harbor Pizza</b></div>
            <div>13917 Harbor Blvd, Garden Grove, CA 92843</div>
            <div>(714)554-0084</div>
        </div>
      </div>

      `,
    });

    console.log("Message Sent: " + info.messageId);
  }

  main().catch((e) => console.log(e));
}

// Send user an email that their order is ready for pick up
function orderReadyEmail(order) {
  const temp = JSON.stringify(order._id);
  const ordernumber = temp
    .substring(temp.length - 11, temp.length - 1)
    .toUpperCase();

  async function main() {
    const transporter = nodeMailer.createTransport({
      service: "hotmail",
      auth: {
        user: "harborpizza@outlook.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: "Harbor Pizza <harborpizza@outlook.com>",
      to: order.email,
      subject: `Order Is Ready! (${capitalize(ordernumber)})`,
      html: `

      <h2>Dear Customer,</h2>
      <p>Thank you for ordering at harborpizza.app! Order <b>${ordernumber}</b> is now ready for pickup!</p>

      <br>
      <br>
        <div>
            <h2>Thank you!</h2>
            <div><b>Harbor Pizza</b></div>
            <div>13917 Harbor Blvd, Garden Grove, CA 92843</div>
            <div>(714)554-0084</div>
        </div>
      </div>

      `,
    });

    console.log("Message Sent: " + info.messageId);
  }

  main().catch((e) => console.log(e));
}

function sendOrderEmailUpdate(order, cartItems, user) {
  const temp = JSON.stringify(order._id);
  const ordernumber = temp
    .substring(temp.length - 11, temp.length - 1)
    .toUpperCase();

  async function main() {
    const transporter = nodeMailer.createTransport({
      service: "hotmail",
      auth: {
        user: "harborpizza@outlook.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const info = await transporter.sendMail({
      from: "Harbor Pizza <harborpizza@outlook.com>",
      to: "harborpizza@outlook.com",
      subject: "New Order!",
      html: `<h2>Order # ${ordernumber}</h2>
              <div>
                <p>Customer Name: ${capitalize(user.name)}</p>
                <p>Customer Email: ${order.email}</p>
              </div>
              <br>
              <div style="display:flex; justify-content:space-evenly;">
          <div><b>Items</b>${cartItems
            .map((item) => {
              return `<div>${capitalize(item.name.toLowerCase())}</div>`;
            })
            .join("")}
          </div>
          <div style="margin-left: 1.2rem;"><b>Size</b>${cartItems
            .map((item) => {
              return `<div>${item.size}</div>`;
            })
            .join("")}
          </div>  
          <div style="margin-left: 1.2rem;"><b>Qty</b>${cartItems
            .map((item) => {
              return `<div>${item.quantity}</div>`;
            })
            .join("")}
          </div>
          <div style="margin-left: 1.2rem;"><b>Price</b>${cartItems
            .map((item) => {
              return `<div>$${item.price.toFixed(2)}</div>`;
            })
            .join("")}
          </div>             
        </div>
        `,
    });
  }
  main().catch((e) => console.log(e));
}

function sendGuestOrderEmailUpdate(order, cartItems) {
  const temp = JSON.stringify(order._id);
  const ordernumber = temp
    .substring(temp.length - 11, temp.length - 1)
    .toUpperCase();

  async function main() {
    const transporter = nodeMailer.createTransport({
      service: "hotmail",
      auth: {
        user: "harborpizza@outlook.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const info = await transporter.sendMail({
      from: "Harbor Pizza <harborpizza@outlook.com>",
      to: "harborpizza@outlook.com",
      subject: "New Order!",
      html: `<h2>Order # ${ordernumber}</h2>
              <div>
                <p>Customer Email: ${order.email}</p>
              </div>
              <br>
              <div style="display:flex; justify-content:space-evenly;">
          <div><b>Items</b>${cartItems
            .map((item) => {
              return `<div>${capitalize(item.name.toLowerCase())}</div>`;
            })
            .join("")}
          </div>
          <div style="margin-left: 1.2rem;"><b>Size</b>${cartItems
            .map((item) => {
              return `<div>${item.size}</div>`;
            })
            .join("")}
          </div>  
          <div style="margin-left: 1.2rem;"><b>Qty</b>${cartItems
            .map((item) => {
              return `<div>${item.quantity}</div>`;
            })
            .join("")}
          </div>
          <div style="margin-left: 1.2rem;"><b>Price</b>${cartItems
            .map((item) => {
              return `<div>$${item.price.toFixed(2)}</div>`;
            })
            .join("")}
          </div>             
        </div>
        `,
    });
  }
  main().catch((e) => console.log(e));
}
/* Routes */
router.post("/placeorder", async (req, res) => {
  const { token, total, currentUser, cartItems } = req.body;
  var totalAmount = Math.round(total.toFixed(2) * 100);
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.charges.create(
      {
        amount: totalAmount,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    if (payment) {
      const neworder = new Order({
        name: token.name,
        email: token.email,
        userid: currentUser._id,
        orderItems: cartItems,
        orderAmount: totalAmount,
        transactionId: payment.source.id,
      });
      neworder.save();

      orderConfirmationEmail(neworder, cartItems, currentUser);
      res.send("Order was placed successfully");
      setTimeout(() => {
        sendOrderEmailUpdate(neworder, cartItems, currentUser);
      }, 1000);
    } else {
      res.send("Payment Failed");
    }
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" + error });
  }
});

router.post("/placeguestorder", async (req, res) => {
  const { token, total, cartItems } = req.body;
  var totalAmount = Math.round(total.toFixed(2) * 100);
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.charges.create(
      {
        amount: totalAmount,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    if (payment) {
      const neworder = new Order({
        name: token.name,
        email: token.email,
        userid: null,
        orderItems: cartItems,
        orderAmount: totalAmount,
        transactionId: payment.source.id,
      });
      neworder.save();

      res.send("Order was placed successfully");
      orderConfirmationGuestEmail(neworder, cartItems);
      setTimeout(() => {
        sendGuestOrderEmailUpdate(neworder, cartItems);
      }, 1000);
    } else {
      res.send("Payment Failed");
    }
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" + error });
  }
});

router.post("/getuserorders", async (req, res) => {
  const { userid } = req.body;
  try {
    const orders = await Order.find({ userid: userid }).sort({ _id: -1 });
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" + error });
  }
});

router.post("/getallorders", async (req, res) => {
  const { userid } = req.body;
  if (userid === process.env.ADMIN_ID) {
    try {
      const orders = await Order.find({}).sort({ _id: -1 });
      res.send(orders);
    } catch (error) {
      return res.status(400).json({ message: "Something went wrong" + error });
    }
  } else {
    return res.status(400).json({
      message: "Hold your horses buckaroo 🤠. You're not an authorized user!",
    });
  }
});

router.put("/:id/readyForPickup", async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.readyForPickup = true;
    const updatedOrder = await order.save();

    orderReadyEmail(updatedOrder);

    res.send({
      message: "Order marked as ready for pickup",
      order: updatedOrder,
    });
  } else {
    res.status(404).send({ message: "Order not found" });
  }
});

module.exports = router;
