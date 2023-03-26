import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../actions/userActions";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";
import DOMPurify from "dompurify";

export default function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const registerstate = useSelector((state) => state.registerUserReducer);
  const { error, loading, success } = registerstate;
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    }
  }, []);

  function register() {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#-_?&])[A-Za-z\d@$!%*#-_?&]{12,}$/;
    const isValidName = nameRegex.test(name);
    const isValidEmail = emailRegex.test(email);
    const isValidPassword = passwordRegex.test(password);

    if (!isValidName) {
      alert("Please enter a valid name!");
    } else if (!isValidEmail) {
      alert("Please enter a valid email address!");
    } else if (!isValidPassword) {
      alert(
        "Please enter a valid password! Your password must be at least 12 characters long, contain at least one letter, one number and one special character."
      );
    } else if (password !== cpassword) {
      alert("Passwords do not match!");
    } else {
      const user = {
        name: DOMPurify.sanitize(name),
        email: DOMPurify.sanitize(email.toLowerCase()),
        password: DOMPurify.sanitize(password),
      };
      dispatch(registerUser(user));
    }
  }

  return (
    <div style={{ marginTop: "4rem" }}>
      <div className="d-flex justify-content-center text-start  mb-5">
        <div
          className="mt-5 p-5 rounded"
          style={{ backgroundColor: "white", width: "50rem" }}
        >
          {loading && <Loading />}
          {success &&
            (<Success success="Registration was successful" />)(
              (window.location.href = "/login")
            )}
          {error && <Error error="An account with this email already exists" />}

          <h2 className="text-center mb-4" style={{ fontSize: "2.5rem" }}>
            Create Account
          </h2>
          <div>
            <input
              type="text"
              placeholder="name"
              className="form-control"
              value={name}
              required
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="email"
              className="form-control"
              value={email}
              required
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="password"
              className="form-control"
              value={password}
              required
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="confirm password"
              className="form-control"
              value={cpassword}
              required
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
            />
            <div className="d-flex mt-3 align-items-center">
              <button className="btn me-3" onClick={register}>
                REGISTER
              </button>
              <a href="/login" style={{ color: "black" }} className="link">
                Click here to log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
