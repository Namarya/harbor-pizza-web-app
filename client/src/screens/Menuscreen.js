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
    <div id="top">
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
      <a href="#top"><div id="gtt" className=" d-none position-fixed bottom-0 end-0 mx-3 mb-5 rounded-circle bg-white" style={{width: "2rem", height: "2rem", placeItems: "center"}}><i className="fa-solid fa-angle-up" style={{color:"#000"}}></i></div></a>
    </div>
  );
}
