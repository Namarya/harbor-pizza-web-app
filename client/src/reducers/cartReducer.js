export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const alreadyExists = state.cartItems.find(
        (item) =>
          item._id === action.payload._id && item.size === action.payload.size
      );

      if (alreadyExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload._id && item.size === action.payload.size
              ? action.payload
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }

    case "DELETE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) =>
            item._id !== action.payload._id || item.size !== action.payload.size
        ),
      };

    default:
      return state;
  }
};
