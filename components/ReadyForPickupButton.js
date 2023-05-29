import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { markOrderAsReady } from "../actions/orderActions";

export default function ReadyForPickupButton({ orderId }) {
  const [buttonText, setButtonText] = useState("Mark Order Ready");

  const dispatch = useDispatch();

  const handleMarkOrderAsReady = () => {
    setButtonText(
      <>
        <i className="fa-solid fa-spinner fa-spin fa-xl"></i>
      </>
    );
    dispatch(markOrderAsReady(orderId));
  };

  return (
    <button className="btn" style={{width:"15rem"}} onClick={handleMarkOrderAsReady}>
      {buttonText}
    </button>
  );
}
