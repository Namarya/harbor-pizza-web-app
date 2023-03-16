import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../actions/userActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";
import DOMPurify from "dompurify";

export default function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const loginstate = useSelector((state) => state.loginUserReducer);
  const { loading, success, error } = loginstate;
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    }
  }, []);

  function login() {
    // Validate and sanitize user input
    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#-_?&])[A-Za-z\d@$!%*#-_?&]{12,}$/;
    const validEmail = emailRegex.test(email);
    const validPassword = passwordRegex.test(password);

    if (!validEmail) {
      alert("Please enter a valid email address!");
    } else if (!validPassword) {
      alert("Please enter a valid password!");
    }

    if (validEmail && validPassword) {
      const user = {
        email: DOMPurify.sanitize(email),
        password: DOMPurify.sanitize(password),
      };
      dispatch(loginUser(user));
    }
  }

  return (
    <div style={{ marginTop: "4rem" }}>
      <div className="d-flex justify-content-center text-start mb-5">
        <div
          className="mt-5 p-5 rounded"
          style={{ backgroundColor: "white", width: "50rem" }}
        >
          <h2 className="text-center mb-4" style={{ fontSize: "2.5rem" }}>
            Login
          </h2>

          {loading && <Loading />}
          {error && <Error error="Invalid Credentials" />}
          {success && <Success success="Login Successfull" />}
          <div>
            <input
              type="email"
              placeholder="email"
              className="form-control"
              value={email}
              required
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="form-control"
              value={password}
              required
              onChange={(e) => setpassword(e.target.value)}
            />
            <div className="d-flex mt-3 align-items-center">
              <button className="btn me-3" onClick={login}>
                LOGIN
              </button>
              <a href="/register" style={{ color: "black" }} className="link">
                Click here to register
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
