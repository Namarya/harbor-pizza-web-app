const express = require("express");
const router = express.Router();

const Pizza = require("../models/pizzaModel");

router.get("/getallpizzas", async (req, res) => {
  try {
    const pizzas = await Pizza.find({});
    res.send(pizzas);
  } catch (error) {
    res.error.status(400).json({ message: error });
  }
});

module.exports = router;
