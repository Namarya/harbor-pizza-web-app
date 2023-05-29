import { useEffect, useState } from "react";
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
  const [isPastaVisible, setPastaVisible] = useState(false);
  const [isPizzaVisible, setPizzaVisible] = useState(false);
  const [isSandwichVisible, setSandwichVisible] = useState(false);
  const [isExtraVisible, setExtraVisible] = useState(false);

  const togglePasta = () => {
    setPastaVisible(!isPastaVisible);
  };
  const togglePizza = () => {
    setPizzaVisible(!isPizzaVisible);
  };
  const toggleSandwich = () => {
    setSandwichVisible(!isSandwichVisible);
  };
  const toggleExtra = () => {
    setExtraVisible(!isExtraVisible);
  };
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
                <div className="header" onClick={togglePizza}>
                  <p className="m-0">Pizza</p>
                  <i
                    id="pizza-down"
                    className={`fa-solid fa-caret-right ms-1 mt-1 ${
                      isPizzaVisible ? "rotate-down" : ""
                    }`}
                  ></i>
                </div>
                <div
                  id="pizzas"
                  className={isPizzaVisible ? "show-items" : "hide-items"}
                >
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
                      return null;
                    }
                  })}
                </div>
              </div>
              <div className=" d-flex flex-column align-items-center bg-white">
                <div className="header" onClick={togglePasta}>
                  <p className="m-0">Pasta</p>
                  <i
                    id="pasta-down"
                    className={`fa-solid fa-caret-right ms-1 mt-1 ${
                      isPastaVisible ? "rotate-down" : ""
                    }`}
                  ></i>
                </div>
                <div
                  id="pastas"
                  className={isPastaVisible ? "show-items" : "hide-items"}
                >
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
                      return null;
                    }
                  })}
                </div>
              </div>
              <div className="d-flex flex-column align-items-center bg-white">
                <div className="header" onClick={toggleSandwich}>
                  <p className="m-0">Sandwiches</p>
                  <i
                    id="sand-down"
                    className={`fa-solid fa-caret-right ms-1 mt-1 ${
                      isSandwichVisible ? "rotate-down" : ""
                    }`}
                  ></i>
                </div>
                <div
                  id="sandwiches"
                  className={isSandwichVisible ? "show-items" : "hide-items"}
                >
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
                      return null;
                    }
                  })}
                </div>
              </div>
              <div className=" d-flex flex-column align-items-center bg-white">
                <div className="header" onClick={toggleExtra}>
                  <p className="m-0">Extras</p>
                  <i
                    id="extra-down"
                    className={`fa-solid fa-caret-right ms-1 mt-1 ${
                      isExtraVisible ? "rotate-down" : ""
                    }`}
                  ></i>
                </div>
                <div
                  id="extras"
                  className={isExtraVisible ? "show-items" : "hide-items"}
                >
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
                      return null;
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
