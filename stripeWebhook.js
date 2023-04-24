const express = require("express");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const router = express.Router();
const Order = require("./models/orderModel");
const nodeMailer = require("nodemailer");
// Send guest an email that the order was received and include their order number and details
function orderConfirmationGuestEmail(order) {
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
      subject: `Order Confirmation (${JSON.stringify(
        ordernumber
      ).toUpperCase()})`,
      html: `

      <h2>Dear ${order.name},</h2>
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
          <div><b>Items</b>${order.orderItems[0].name
            .map((item) => {
              return `<div>${item.toLowerCase()}</div>`;
            })
            .join("")}
          </div>
          <div style="margin-left: 1.2rem;"><b>Qty</b>${order.orderItems[0].quantity
            .map((item) => {
              return `<div>${item}</div>`;
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
function createOrder(
  name,
  email,
  phone,
  itemName,
  itemSizes,
  quantity,
  orderAmount,
  id
) {
  items = itemName.split(",").map((item) => item.replace(/"/g, "").trim());
  sizes = itemSizes.split(",").map((item) => item.replace(/"/g, "").trim());
  itemqty = quantity.split(",").map((item) => item.trim());
  const orderItems = {
    name: items,
    sizes: sizes,
    quantity: itemqty,
  };
  const neworder = new Order({
    name: name,
    email: email,
    phoneNumber: phone,
    userid: null,
    orderItems: orderItems,
    orderAmount: orderAmount,
    transactionId: id,
  });
  console.log("New order saved: " + JSON.stringify(neworder));
  neworder.save();
  orderConfirmationGuestEmail(neworder);
}
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    let data;
    let eventType;

    // Check if webhook signing is configured.
    let webhookSecret;
    webhookSecret = process.env.WEBHOOK_SECRET;

    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers["stripe-signature"];

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        );
        console.log("Webhook Verified: ");
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed:  ${err}`);
        return res.sendStatus(400);
      }
      // Extract the object from the event.
      data = event.data.object;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the event
    switch (eventType) {
      case "payment_intent.succeeded":
        // handle payment success event
        const paymentIntent = data;
        console.log("Payment Intent: " + paymentIntent);
        console.log("");
        paymentIntentId = paymentIntent.id;
        break;
      case "checkout.session.completed":
        const session = data;
        const customer_email = session.customer_details.email;

        const customer_name = session.customer_details.name;

        const customer_phone = session.customer_details.phone;

        const totalAmount = session.amount_total;

        // Access metadata values
        const sizes = session.metadata.sizes;
        const items = session.metadata.items;
        const quantity = session.metadata.quantity;
        // Wait until payment_intent.succeeded event is handled and paymentIntentId is set
        await new Promise((resolve) => {
          const intervalId = setInterval(() => {
            if (paymentIntentId) {
              clearInterval(intervalId);
              resolve();
            }
          }, 100);
        });

        createOrder(
          customer_name,
          customer_email,
          customer_phone,
          items,
          sizes,
          quantity,
          totalAmount,
          paymentIntentId
        );
        break;
      default:
      // handle other event types
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send().end();
  }
);

module.exports = router;
