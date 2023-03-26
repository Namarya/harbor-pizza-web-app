export const addToCart = (pizza, quantity, size) => (dispatch, getState) => {
  var cartItem = {
    name: pizza.name,
    _id: pizza._id,
    image: pizza.image,
    size: size,
    quantity: Number(quantity),
    prices: pizza.prices,
    price: pizza.prices[0][size] * quantity,
  };

  if (cartItem.quantity > 10) {
    alert("You've reached the limit (10)");
  } else {
    if (cartItem.quantity <= 0) {
      dispatch({ type: "DELETE_FROM_CART", payload: cartItem });
    } else {
      dispatch({ type: "ADD_TO_CART", payload: cartItem });
    }
  }

  const cartItems = getState().cartReducer.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const deleteFromCart = (pizza) => (dispatch, getState) => {
  dispatch({ type: "DELETE_FROM_CART", payload: pizza });
  const cartItems = getState().cartReducer.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
