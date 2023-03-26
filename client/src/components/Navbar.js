import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/userActions";

export default function Navbar() {
  const cartstate = useSelector((state) => state.cartReducer);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const dispatch = useDispatch();

  return (
    <div>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Harbor Pizza
            <i className="fa-solid fa-pizza-slice ms-1"></i>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <a className="nav-link" href="/menu">
                  <i className="fa fa-cutlery me-1" aria-hidden="true"></i>
                  Menu
                </a>
              </li>

              {currentUser ? (
                <div className="dropdown">
                  <a
                    className="dropdown-toggle ms-1 mx-1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ cursor: "pointer", textDecoration: "none" }}
                    href="/"
                  >
                    <i className="fa-solid fa-user me-1"></i>
                    {currentUser.name.indexOf(" ") === -1
                      ? currentUser.name.toUpperCase()
                      : currentUser.name
                          .substring(0, currentUser.name.indexOf(" "))
                          .toUpperCase()}
                  </a>
                  <ul className="dropdown-menu w-max">
                    <li>
                      <a className="dropdown-item" href="/orders">
                        Orders
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/login"
                        onClick={() => {
                          dispatch(logoutUser());
                        }}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
              )}

              <li className="nav-item">
                <a className="nav-link position-relative" href="/cart">
                  <i className="fa-solid fa-cart-shopping me-1"></i>
                  <span className="rounded-circle nav-cart cartitem-amount">
                    {cartstate.cartItems.length}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
