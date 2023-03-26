import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPizzas } from "../actions/pizzaActions.js";
import Loading from "../components/Loading.js";
import Pizza from "../components/Pizza.js";
import Error from "../components/Error.js";
import Cart from "../components/Cart.js";

export default function Menuscreen() {
  const dispatch = useDispatch();
  const pizzasstate = useSelector((state) => state.getAllPizzasReducer);
  const { pizzas, error, loading } = pizzasstate;
  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  return (
    <div id="top">
      <div className="bg-img" style={{ marginTop: "3rem" }}>
        <h1 className="welcome">MENU</h1>
      </div>
      <div className="">
        <div className="">
          {loading ? (
            <Loading />
          ) : error ? (
            <Error error="Something went wrong" />
          ) : (
            <div>
              <div className="d-flex flex-column align-items-center bg-white">
                <div
                  className="header"
                  onClick={() => {
                    var items = document.getElementById("pizzas");
                    if (items.classList.contains("show-items")) {
                      items.classList.remove("show-items");
                      items.classList.add("hide-items");
                    } else if (items.classList.contains("hide-items")) {
                      items.classList.remove("hide-items");
                      items.classList.add("show-items");
                    }
                    var angle = document.getElementById("pizza-down");
                    if (angle.classList.contains("fa-angle-up")) {
                      angle.classList.remove("fa-angle-up");
                      angle.classList.add("fa-angle-down");
                    } else if (angle.classList.contains("fa-angle-down")) {
                      angle.classList.remove("fa-angle-down");
                      angle.classList.add("fa-angle-up");
                    }
                  }}
                >
                  <p className="m-0">Pizza</p>
                  <i
                    id="pizza-down"
                    className="fa-solid fa-angle-up ms-1 mt-1"
                  ></i>
                </div>
                <div id="pizzas" className="show-items">
                  {pizzas.map((pizza) => {
                    if (pizza.category.includes("pizza")) {
                      return (
                        <div key={pizza._id} className="m-5 mb-0 mt-0">
                          <div>
                            <Pizza pizza={pizza} />
                          </div>
                        </div>
                      );
                    } else {
                      return console.log("not a pizza");
                    }
                  })}
                </div>
              </div>
              <div className=" d-flex flex-column align-items-center bg-white">
                <div
                  className="header"
                  onClick={() => {
                    document
                      .getElementById("pastas")
                      .classList.toggle("hide-items");
                    var angle = document.getElementById("pasta-down");
                    if (angle.classList.contains("fa-angle-up")) {
                      angle.classList.remove("fa-angle-up");
                      angle.classList.add("fa-angle-down");
                    } else if (angle.classList.contains("fa-angle-down")) {
                      angle.classList.remove("fa-angle-down");
                      angle.classList.add("fa-angle-up");
                    }
                  }}
                >
                  <p className="m-0">Pasta</p>
                  <i
                    id="pasta-down"
                    className="fa-solid fa-angle-down ms-1 mt-1"
                  ></i>
                </div>
                <div id="pastas" className="show-items hide-items">
                  {pizzas.map((pizza) => {
                    if (pizza.category.includes("pasta")) {
                      return (
                        <div key={pizza._id} className="m-5 mb-0 mt-0">
                          <div>
                            <Pizza pizza={pizza} />
                          </div>
                        </div>
                      );
                    } else {
                      return console.log("not a pasta");
                    }
                  })}
                </div>
              </div>
              <div className="d-flex flex-column align-items-center bg-white">
                <div
                  className="header"
                  onClick={() => {
                    document
                      .getElementById("sandwiches")
                      .classList.toggle("hide-items");
                    var angle = document.getElementById("sand-down");
                    if (angle.classList.contains("fa-angle-up")) {
                      angle.classList.remove("fa-angle-up");
                      angle.classList.add("fa-angle-down");
                    } else if (angle.classList.contains("fa-angle-down")) {
                      angle.classList.remove("fa-angle-down");
                      angle.classList.add("fa-angle-up");
                    }
                  }}
                >
                  <p className="m-0">Sandwich</p>
                  <i
                    id="sand-down"
                    className="fa-solid fa-angle-down ms-1 mt-1"
                  ></i>
                </div>
                <div id="sandwiches" className="show-items hide-items">
                  {pizzas.map((pizza) => {
                    if (pizza.category.includes("sandwich")) {
                      return (
                        <div key={pizza._id} className="m-5 mb-0 mt-0">
                          <div>
                            <Pizza pizza={pizza} />
                          </div>
                        </div>
                      );
                    } else {
                      return console.log("not a sandwich");
                    }
                  })}
                </div>
              </div>
              <div className=" d-flex flex-column align-items-center bg-white">
                <div
                  className="header"
                  onClick={() => {
                    document
                      .getElementById("extras")
                      .classList.toggle("hide-items");
                    var angle = document.getElementById("extra-down");
                    if (angle.classList.contains("fa-angle-up")) {
                      angle.classList.remove("fa-angle-up");
                      angle.classList.add("fa-angle-down");
                    } else if (angle.classList.contains("fa-angle-down")) {
                      angle.classList.remove("fa-angle-down");
                      angle.classList.add("fa-angle-up");
                    }
                  }}
                >
                  <p className="m-0">Extra</p>
                  <i
                    id="extra-down"
                    className="fa-solid fa-angle-down ms-1 mt-1"
                  ></i>
                </div>
                <div id="extras" className="show-items hide-items">
                  {pizzas.map((pizza) => {
                    if (pizza.category.includes("extra")) {
                      return (
                        <div key={pizza._id} className="m-5 mb-0 mt-0">
                          <div>
                            <Pizza pizza={pizza} />
                          </div>
                        </div>
                      );
                    } else {
                      return console.log("not an extra");
                    }
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Cart />
    </div>
  );
}
