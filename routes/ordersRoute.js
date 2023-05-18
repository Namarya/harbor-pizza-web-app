const express = require("express");
require("dotenv").config();
const router = express.Router();
const Order = require("../models/orderModel");
const nodeMailer = require("nodemailer");

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
      subject: `Order Is Ready! ${ordernumber}`,
      html: `

      <h2>Dear ${order.name},</h2>
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

/* Routes */

router.post("/getuserorders", async (req, res) => {
  const { email } = req.body;
  try {
    const orders = await Order.find({ email: email }).sort({ _id: -1 });
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
