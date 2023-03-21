const express = require("express");
require("dotenv").config();
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const Order = require("../models/orderModel");

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

      res.send("Order was placed successfully");
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
  if(userid === process.env.ADMIN_ID){
    try {
      const orders = await Order.find({}).sort({ _id: -1 });
      res.send(orders);
    } catch (error) {
      return res.status(400).json({ message: "Something went wrong" + error });
    }
  }else{
    return res.status(400).json({ message: "Something went wrong: " + userid });
  }
  
});

router.put("/:id/readyForPickup", async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.readyForPickup = true;
    const updatedOrder = await order.save();
    res.send({
      message: "Order marked as ready for pickup",
      order: updatedOrder,
    });
  } else {
    res.status(404).send({ message: "Order not found" });
  }
});

module.exports = router;
