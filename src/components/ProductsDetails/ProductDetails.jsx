import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import $ from "jquery";
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
  async function addMyProduct(id) {
    if ((await addProductToCart(id)) == true) {
      $(".successMsg").fadeIn(1000, function () {
        $(".successMsg").fadeOut(1000);
      });

      $("#delButton").fadeIn(500);
      $("#addButton").fadeOut(500);
    }
  }

  async function removeMyProduct(id) {
    if ((await removeCardItem(id)) == true) {
      $(".deleteMsg").fadeIn(1000, function () {
        setTimeout(() => {
          $(".deleteMsg").fadeOut(100);
        }, 2000);
      });
      $("#delButton").fadeOut(500);
      $("#addButton").fadeIn(500);
    }
  }

  const { addProductToCart, removeCardItem } = useContext(CartContext);

  const { id } = useParams();

  const [productDetails, setproductDetails] = useState(null);

  async function getProductDetails() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setproductDetails(data.data);
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(function () {
    getProductDetails();
  }, []);

  return (
    <>
          <Helmet>
        <title>Product Details</title>
      </Helmet>
      {productDetails ? (
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <img
                className="w-100"
                src={productDetails.imageCover}
                alt={productDetails.title}
              />
            </div>

            <div className="col-md-9">
              <h6> {productDetails.title} </h6>
              <h6>{productDetails.description}</h6>
              <h6> Price : {productDetails.price}</h6>
              <h6>quantity: {productDetails.quantity}</h6>
              <h6>ID: {productDetails.id}</h6>

              <button
                onClick={function () {
                  addMyProduct(productDetails.id);
                }}
                className="btn btn-danger w-100"
                id="addButton"
              >
                Add Product to cart
              </button>
              <button
                onClick={function () {
                  removeMyProduct(productDetails.id);
                }}
                style={{ display: "none" }}
                className="btn btn-danger w-100"
                id="delButton"
              >
                {" "}
                Remove Product from cart
              </button>

              <div
                style={{ display: "none" }}
                className="alert alert-success text-center successMsg"
              >
                {" "}
                Product Added Successfully{" "}
              </div>
              <div
                style={{ display: "none" }}
                className="alert alert-danger text-center deleteMsg"
              >
                {" "}
                Product Removed Successfully{" "}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
