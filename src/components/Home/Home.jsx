import React, { useContext, useEffect } from "react";
import styles from "./Home.module.css";
import axios from "axios";
import { useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";
import $ from "jquery";
import Sliderr from "./../Sliderr/Slider";
import { CartContext } from "../../context/CartContext";
import { Helmet } from "react-helmet";

export default function Home() {
  const [allProducts, setAllProducts] = useState(null);

  const { addProductToCart } = useContext(CartContext);
  async function getAllProducts() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setAllProducts(data.data);
    } catch (e) {
      console.log("error", e);
    }
  }

  useEffect(function () {
    getAllProducts();
  }, []);

  async function addMyProduct(id, idx) {
    if ((await addProductToCart(id)) == true) {
      $("#successMsg").fadeIn(500, function () {
        setTimeout(() => {
          $("#successMsg").fadeOut(500);
        }, 2000);
      });

      $(`#addBtn${idx}`).fadeOut(500);
      $(`#removeBtn${idx}`).fadeIn(500);
    } else {
    }
  }

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <Sliderr />

      <div
        style={{ zIndex: "9999", display: "none" }}
        className="position-fixed bottom-0 start-0 end-0  alert alert-success text-center "
        id="successMsg"
      >
        {" "}
        Product Added Successfully{" "}
      </div>

      {allProducts ? (
        <div className="container my-5">
          <div className="row">
            {allProducts.map(function (proooo, idx) {
              return (
                <div key={idx} className="col-md-3 bg-light">
                  <div className="item .bg-secondary rounded-3 position-relative my-3 text-center">
                    <Link to={`/ProductsDetails/${proooo.id}`}>
                      <div className="upper">
                        <img
                          src={proooo.imageCover}
                          className="w-100"
                          alt={proooo.tile}
                        />
                        <h6 className="text-center text-black">
                          {proooo.title.slice(0, proooo.title.indexOf("", 20))}
                        </h6>
                        <h6 className="text-black">
                          {proooo.subcategory.name}
                        </h6>
                        <h6>
                          price:{" "}
                          {proooo.priceAfterDiscount ? (
                            <>
                              <span className="text-decoration-line-through">
                                {proooo.price}
                              </span>
                              <span className="ms-3">
                                {proooo.priceAfterDiscount}
                              </span>
                            </>
                          ) : (
                            <span>{proooo.price}</span>
                          )}
                        </h6>
                        <div className="  position-absolute text-black top-0 end-0 bg-danger ">
                          {proooo.ratingsAverage}
                        </div>
                      </div>
                    </Link>

                    <div className="lower">
                      <button
                        id={`addBtn${idx}`}
                        onClick={function () {
                          addMyProduct(proooo.id, idx);
                        }}
                        className="btn btn-danger"
                      >
                        {" "}
                        +
                      </button>
                      <button
                        id={`removeBtn${idx}`}
                        style={{ display: " none" }}
                        className="btn btn-danger"
                      >
                        {" "}
                        -{" "}
                      </button>
                    </div>
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
