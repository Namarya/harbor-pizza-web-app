import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../actions/cartActions";
import Checkout from "../components/Checkout";

export default function Cartscreen() {
  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;
  var gardenGroveTaxRate = 0.0875;
  var subtotal = cartItems.reduce((x, item) => x + item.price, 0);
  var tax = subtotal * gardenGroveTaxRate;
  var tmp = subtotal + tax;
  var total = Number(tmp.toFixed(2));
  const dispatch = useDispatch();
  function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }
  return (
    <div style={{ marginTop: "5rem" }}>
      <div className="d-flex justify-content-center">
        <div
          className=" p-3 m-5 mt-0 bg-white"
          style={{
            backgroundColor: "white",
            width: "45rem",
            boxShadow: "0px 0px 20px 1px #333",
            borderRadius: "10px",
          }}
        >
          {cartItems.length ? (
            <div>
              <p
                style={{
                  fontSize: "3rem",
                  backgroundColor: "rgba(10,10,10,.10)",
                  borderRadius: "5px",
                }}
              >
                Cart
              </p>
              {cartItems.map((item) => {
                return (
                  <div
                    className="flex-container align-items-center"
                    style={{ borderBottom: "solid 1px #999" }}
                  >
                    <div className="text-start m-1 w-100">
                      <h1>{item.name}</h1>
                      {item.name.toLowerCase().indexOf("pizza") === -1 ? (
                        console.log()
                      ) : (
                        <p style={{ margin: "0px" }}>
                          Size: {capitalize(item.size)}
                        </p>
                      )}

                      <p style={{ margin: "0px" }}>
                        Price: ${item.price.toFixed(2)}
                      </p>
                      <p style={{ display: "inline" }}>Qty: </p>
                      <i
                        className="fa fa-plus"
                        aria-hidden="true"
                        onClick={() => {
                          dispatch(
                            addToCart(item, item.quantity + 1, item.size)
                          );
                        }}
                      ></i>

                      <b>{item.quantity}</b>
                      <i
                        className="fa fa-minus"
                        aria-hidden="true"
                        onClick={() => {
                          dispatch(
                            addToCart(item, item.quantity - 1, item.size)
                          );
                        }}
                      ></i>
                    </div>

                    <div className="m-1">
                      <img
                        src={item.image}
                        alt=""
                        style={{
                          height: "100px",
                          width: "100px",
                          objectFit: "cover",
                        }}
                      ></img>
                    </div>

                    <div className="m-1">
                      <i
                        className="fa fa-trash"
                        aria-hidden="true"
                        onClick={() => {
                          dispatch(deleteFromCart(item));
                        }}
                      ></i>
                    </div>
                  </div>
                );
              })}
              <div
                className="text-end rounded"
                style={{ backgroundColor: "white" }}
              >
                <p className="mb-0 mt-3" style={{ fontSize: ".8rem" }}>
                  Subtotal: ${subtotal.toFixed(2)}
                </p>
                <p className="mb-0" style={{ fontSize: ".8rem" }}>
                  Tax: ${tax.toFixed(2)}
                </p>
                <h5>Order Total: ${total.toFixed(2)}</h5>
                <Checkout total={total} />
              </div>
            </div>
          ) : (
            <div className="p-3">
              <svg
                width="100"
                height="100"
                viewBox="40 0 360 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="emptyCart">
                  <path
                    id="Vector"
                    d="M213.894 25.6142C210.122 21.9711 205.07 19.9552 199.826 20.0008C194.582 20.0463 189.566 22.1497 185.858 25.8579C182.15 29.566 180.046 34.5823 180.001 39.8262C179.955 45.0701 181.971 50.1222 185.614 53.8942L211.474 79.7542L185.614 105.614C181.971 109.386 179.955 114.438 180.001 119.682C180.046 124.926 182.15 129.942 185.858 133.651C189.566 137.359 194.582 139.462 199.826 139.508C205.07 139.553 210.122 137.537 213.894 133.894L239.754 108.034L265.614 133.894C267.459 135.804 269.666 137.328 272.106 138.376C274.546 139.424 277.171 139.976 279.826 139.999C282.482 140.022 285.115 139.516 287.573 138.511C290.031 137.505 292.264 136.02 294.142 134.142C296.02 132.264 297.505 130.031 298.511 127.573C299.516 125.115 300.022 122.482 299.999 119.826C299.976 117.171 299.424 114.546 298.376 112.106C297.328 109.666 295.804 107.459 293.894 105.614L268.034 79.7542L293.894 53.8942C297.537 50.1222 299.553 45.0701 299.508 39.8262C299.462 34.5823 297.359 29.566 293.651 25.8579C289.942 22.1497 284.926 20.0463 279.682 20.0008C274.438 19.9552 269.386 21.9711 265.614 25.6142L239.754 51.4742L213.894 25.6142Z"
                    fill="#000000"
                  />
                  <path
                    id="Vector_2"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M40 20C40 14.6957 42.1071 9.60859 45.8577 5.85786C49.6083 2.10714 54.6952 0 59.9993 0L89.9983 0C97.9545 0 105.585 3.1607 111.211 8.7868C116.837 14.4129 119.997 22.0435 119.997 30V200H342.65L360.189 77.18C360.549 74.5709 361.421 72.0587 362.754 69.7875C364.088 67.5162 365.857 65.5307 367.959 63.945C370.062 62.3592 372.458 61.2045 375.008 60.547C377.558 59.8894 380.213 59.7421 382.821 60.1135C385.428 60.4849 387.936 61.3676 390.202 62.711C392.467 64.0544 394.445 65.832 396.021 67.9418C397.598 70.0516 398.742 72.452 399.388 75.0052C400.035 77.5584 400.17 80.2142 399.788 82.82L381.008 214.24C379.988 221.39 376.422 227.931 370.966 232.663C365.511 237.395 358.531 240 351.309 240H119.997V280H319.99C332.725 280.007 345.128 284.065 355.403 291.589C365.678 299.112 373.293 309.71 377.145 321.848C380.998 333.987 380.889 347.036 376.833 359.108C372.777 371.18 364.986 381.649 354.586 388.999C344.186 396.349 331.717 400.199 318.984 399.992C306.251 399.785 293.914 395.532 283.759 387.848C273.603 380.164 266.156 369.448 262.494 357.251C258.833 345.053 259.147 332.007 263.392 320H156.596C160.543 331.188 161.085 343.296 158.152 354.792C155.22 366.288 148.945 376.657 140.121 384.588C131.297 392.519 120.32 397.655 108.578 399.348C96.8352 401.041 84.8544 399.215 74.1496 394.1C63.4448 388.985 54.4968 380.811 48.4364 370.611C42.3761 360.412 39.4757 348.644 40.1017 336.796C40.7277 324.948 44.852 313.552 51.9534 304.048C59.0548 294.544 68.8145 287.358 79.9986 283.4V40H59.9993C54.6952 40 49.6083 37.8929 45.8577 34.1421C42.1071 30.3914 40 25.3043 40 20ZM299.991 340C299.991 334.696 302.098 329.609 305.849 325.858C309.599 322.107 314.686 320 319.99 320C325.295 320 330.381 322.107 334.132 325.858C337.883 329.609 339.99 334.696 339.99 340C339.99 345.304 337.883 350.391 334.132 354.142C330.381 357.893 325.295 360 319.99 360C314.686 360 309.599 357.893 305.849 354.142C302.098 350.391 299.991 345.304 299.991 340ZM79.9986 340C79.9986 334.696 82.1057 329.609 85.8563 325.858C89.6069 322.107 94.6938 320 99.998 320C105.302 320 110.389 322.107 114.14 325.858C117.89 329.609 119.997 334.696 119.997 340C119.997 345.304 117.89 350.391 114.14 354.142C110.389 357.893 105.302 360 99.998 360C94.6938 360 89.6069 357.893 85.8563 354.142C82.1057 350.391 79.9986 345.304 79.9986 340Z"
                    fill="#000000"
                  />
                </g>
              </svg>
              <p className="m-3">
                Your cart is currently{" "}
                <b style={{ color: "#FF0000" }}>empty!</b>
              </p>
              <a href="/menu">
                <button className="btn">
                  <i className="fa-solid fa-cart-shopping me-1"></i>GO TO MENU
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
