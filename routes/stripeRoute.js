const express = require("express");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const taxRate = await stripe.taxRates.create({
    display_name: "Sales Tax",
    inclusive: false,
    percentage: 7.25,
    country: "US",
    state: "CA",
    jurisdiction: "US - CA",
    description: "CA Sales Tax",
  });
  const line_items = req.body.cartItems.map((item) => {
    const isPizza = item.name.includes("PIZZA");

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
          description: isPizza ? item.size : " ",
          metadata: {
            id: item._id,
            description: item.size,
            name: item.size,
          },
        },
        unit_amount: parseInt((item.price * 100) / item.quantity),
      },
      quantity: item.quantity,
      tax_rates: [taxRate.id],
    };
  });
  const Itemsizedata = req.body.cartItems.map((item) => {
    let size;
    if (item.name.includes("PIZZA")) {
      size = JSON.stringify(item.size);
    } else size = '"  "';
    return {
      size,
    };
  });

  const sizeString = Itemsizedata.map((item) => item.size).join(",");

  const Itemnamedata = req.body.cartItems.map((item) => {
    const name = JSON.stringify(item.name);
    return {
      name,
    };
  });

  const nameString = Itemnamedata.map((item) => item.name).join(",");

  const Itemqtydata = req.body.cartItems.map((item) => {
    const quantity = JSON.stringify(item.quantity);
    return {
      quantity,
    };
  });

  const qtyString = Itemqtydata.map((item) => item.quantity).join(",");

  const Itempricedata = req.body.cartItems.map((item) => {
    const price = JSON.stringify(item.price);
    return {
      price,
    };
  });

  const priceString = Itempricedata.map((item) =>
    Number(item.price).toFixed(2)
  ).join(",");

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    phone_number_collection: {
      enabled: true,
    },
    mode: "payment",
    success_url: "https://www.harborpizza.app/success",
    cancel_url: "https://www.harborpizza.app/cart",
    metadata: {
      items: nameString,
      sizes: sizeString,
      quantity: qtyString,
      prices: priceString,
    },
  });
  res.send({ url: session.url });
});

module.exports = router;
