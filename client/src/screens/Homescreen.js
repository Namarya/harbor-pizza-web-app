import React from "react";
import Slideshow from "../components/Slideshow";
import StoreInfo from "../components/StoreInfo";
import Welcome from "../components/Welcome";
import "../Homescreen.css";

export default function Homescreen() {
  return (
    <div style={{marginTop: "3rem"}}>
      <Welcome />
      <div className="d-flex flex-wrap justify-content-evenly align-items-center p-3">
        <Slideshow />
        <StoreInfo/>
      </div>
    </div>
  );
}
