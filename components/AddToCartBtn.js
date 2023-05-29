import React, { useState, useEffect } from "react";

const AddToCartBtn = () => {
  const initialState = "Add to Cart";
  const [buttonText, setButtonText] = useState("Add to Cart"); //same as creating your state variable where "Next" is the default value for buttonText and setButtonText is the setter function for your state variable instead of setState

  // the effect
  useEffect(() => {
    if (buttonText !== initialState) {
      setTimeout(() => setButtonText(initialState), [1000]);
    }
  }, [buttonText]);

  const changeText = (text) => setButtonText(text);

  return (
    <button
      type="button"
      className="btn"
      onClick={() => changeText("Added 🍕")}
    >
      {buttonText}
    </button>
  );
};
export default AddToCartBtn;
