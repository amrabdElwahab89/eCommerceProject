import React, { useContext } from "react";
import styles from "./Cart.module.css";
import { CartContext } from "../../context/CartContext";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";
import Home from "../Home/Home";
import { Helmet } from "react-helmet";

export default function Cart() {
  const { cartProducts, totalCartPrice, removeCardItem } =
    useContext(CartContext);

  return (
    <>
      <Helmet>
        <title>Cart </title>
      </Helmet>

      {cartProducts ? (
        <div className="container">
          <div className="eldaf3 d-flex justify-content-between ">
            <h2 className="mx-5">
              total Card Price : <span>{totalCartPrice}</span>{" "}
            </h2>

            <Link to="/Payment">
              {" "}
              <button className="btn btn-danger mx-5"> Confirm Payment </button>
            </Link>
          </div>

          <div className="row">
            {cartProducts.map(function (proooo, idx) {
              return (
                <div key={idx} className="col-md-3 bg-light">
                  <div className="products bg-secondary rounded-3 position-relative my-3 text-center">
                    <img
                      className="w-100"
                      src={proooo.product.imageCover}
                      alt="proooo.product.title"
                    />
                    <h2> {proooo.product.title} </h2>
                    <h5> count : {proooo.count} </h5>
                    <h5>Price : {proooo.price} </h5>
                    <h6>ID : {proooo.product.id} </h6>
                    <button
                      onClick={function () {
                        removeCardItem(proooo.product._id);
                      }}
                      className="btn btn-danger "
                    >
                      -
                    </button>
                    {console.log(proooo)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
