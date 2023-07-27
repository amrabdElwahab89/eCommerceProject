import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const nav = useNavigate();
  const [numOfCartItems, setnumOfCartItems] = useState(0);
  const [totalCartPrice, settotalCartPrice] = useState(0);
  const [cartProducts, setcartProducts] = useState(null);
  const [cardId, setcardId] = useState(null);

  async function addProductToCart(proId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: proId },
        { headers: { token: localStorage.getItem("tkn") } }
      );

      if (data.status === "success") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("error:", error);
    }
  }

  async function getCartProducts() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers: { token: localStorage.getItem("tkn") } }
      );

      if (data.status === "success") {
        setnumOfCartItems(data.numOfCartItems);
        settotalCartPrice(data.data.totalCartPrice);
        setcartProducts(data.data.products);
        setcardId(data.data._id);
      }
    } catch (error) {
      if (error.response.status == 404) {
        $(".errorCart").fadeIn(500, function () {
          setTimeout(() => {
            $(".errorCart").fadeOut(500);
            nav("/Home");
          }, 2000);
        });
      }
    }
  }

  async function removeCardItem(id) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { headers: { token: localStorage.getItem("tkn") } }
      );
      console.log(data);

      if (data.status == "success") {
        setnumOfCartItems(data.numOfCartItems);
        settotalCartPrice(data.data.totalCartPrice);
        setcartProducts(data.data.products);
        return true;
      }
    } catch (error) {
      console.log("error :", error);
    }
  }

  useEffect(function () {
    getCartProducts();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        numOfCartItems,
        totalCartPrice,
        cartProducts,
        removeCardItem,
        cardId,
      }}
    >
      <div style={{ display: "none" }} className="alert alert-danger errorCart">
        {" "}
        No Cart for this User{" "}
      </div>

      {children}
    </CartContext.Provider>
  );
}
