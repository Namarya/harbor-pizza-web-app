import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import AddToCartBtn from "./AddToCartBtn";

export default function Pizza({ pizza }) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("small (10 inches)");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  function addtocart() {
    dispatch(addToCart(pizza, quantity, size));
  }

  return (
    <div
      key={pizza._id}
      className="shadow-lg p-3 mb-5 bg-white rounded d-flex flex-column justify-content-center"
      style={{ width: "320px", height: "430px" }}
    >
      <div className="container" onClick={handleShow}>
        <h1>{pizza.name}</h1>
        <img
          src={pizza.image}
          alt=""
          className="img-fluid"
          style={{
            width: "20rem",
            height: "15rem",
            objectFit: "cover",
            cursor: "pointer",
          }}
        />
      </div>

      <div className="flex-container m-1">
        {pizza.sizes.length > 1 && (
          <div className="w-100 m-1">
            <p className="m-0">Sizes</p>
            <select
              className="form-select"
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            >
              {pizza.sizes.map((size) => {
                return (
                  <option key={pizza._id + JSON.stringify(size)} value={size}>
                    {size}
                  </option>
                );
              })}
            </select>
          </div>
        )}
        {pizza.sizes.length > 1 ? (
          <div className="w-100 m-1">
            <p className="m-0">Quantity</p>
            <select
              className="form-select"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            >
              {[...Array(10).keys()].map((x, i) => {
                return <option key={i}>{i + 1}</option>;
              })}
            </select>
          </div>
        ) : (
          <div className="w-100 m-1 d-flex gap-3 align-items-center">
            <p className="m-0">Quantity</p>
            <select
              className="form-select"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            >
              {[...Array(10).keys()].map((x, i) => {
                return (
                  <option key={i * 10} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </div>
      <div className="flex-container align-items-center">
        <div className="m-1 w-100">
          <h2 className="mt-1" style={{ fontSize: "1.2rem" }}>
            Price: ${(pizza.prices[0][size] * quantity).toFixed(2)}
          </h2>
        </div>
        <div className="m-1 w-100">
          <div onClick={addtocart}>
            <AddToCartBtn />
          </div>
        </div>
      </div>

      <Modal show={show}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>{pizza.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="text-center">
            <img
              src={pizza.image}
              className="img-fluid mb-3"
              style={{ width: "20rem", objectFit: "cover" }}
              alt=""
            />
            <p>{pizza.description}</p>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn" onClick={handleClose}>
            CLOSE
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
