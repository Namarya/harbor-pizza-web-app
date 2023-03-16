import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPizzas } from "../actions/pizzaActions.js";
import Loading from "../components/Loading.js";
import Pizza from "../components/Pizza.js";
import Error from "../components/Error.js";

export default function Menuscreen() {
  const dispatch = useDispatch();
  const pizzasstate = useSelector((state) => state.getAllPizzasReducer);
  const { pizzas, error, loading } = pizzasstate;
  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  return (
    <div>
      <div
        className=" d-flex justify-content-center"
        style={{ marginTop: "5rem" }}
      >
        <div className=" d-flex justify-content-center flex-wrap">
          {loading ? (
            <Loading />
          ) : error ? (
            <Error error="Something went wrong" />
          ) : (
            pizzas.map((pizza) => {
              return (
                <div key={pizza._id} className="m-5 mb-0 mt-0">
                  <div>
                    <Pizza pizza={pizza} />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      
    </div>
  );
}
