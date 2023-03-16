import React from "react";

export default function Welcome() {
  return (
    <div>
      <div className="bg-img">
        <h1 className="welcome">Welcome to Harbor Pizza</h1>
      </div>

      <div className="d-flex row justify-content-center text-white">
        <div className=" pp text-center message pt-3 pb-3">
          <p>
            Are you craving a mouth-watering pizza that's hot, savory, and
            packed with flavor? Look no further than Harbor Pizza, where we
            pride ourselves on offering the freshest, most delicious pizzas
            around. Our hand-tossed crust is crispy and golden, our toppings are
            always fresh and flavorful, and our tangy tomato sauce is the
            perfect complement to every bite.So why settle for ordinary pizza
            when you can experience the unbeatable taste and quality of Harbor
            Pizza? Stop by today and taste the difference for yourself!
          </p>
        </div>
        <div className="order-container d-flex justify-content-center align-items-center p-3">
          <div className="d-flex justify-content-evenly flex-wrap align-items-center pt-3 pb-3">
            <div className="start-order">START YOUR ONLINE ORDER TODAY!</div>
            <a href="/menu">
              <button
                type="submit"
                className=" rounded p-3 mx-5 px-5 orderBtn btn"
              >
                Order Now
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
