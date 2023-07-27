import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Categories from "./components/Categories/Categories";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Brands from "./components/Brands/Brands";
import BrandsProducts from "./components/BrandsProducts/BrandsProducts";
import ProductDetails from "./components/ProductsDetails/ProductDetails";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Logout from "./components/Logout/Logout";
import Profile from "./components/Profile/Profile";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import CartContext from "./context/CartContext";
import CartContextProvider from "./context/CartContext";
import Payment from "./components/Payment/Payment";
import AllOrders from "./components/AllOrders/AllOrders";
import Notfound from "./components/Notfound/Notfound";
import Navbar from "./components/Navbar/Navbar";

function App() {
  function ProtectedRoute({ children }) {
    if (crrUser == null) {
      return <Navigate to="/Login" />;
    } else {
      return <> {children} </>;
    }
  }

  const [crrUser, setcrrUser] = useState(null);

  function getUserData() {
    const userData = jwtDecode(localStorage.getItem("tkn"));
    setcrrUser(userData);
  }

  function clearUserData() {
    localStorage.removeItem("tkn");
    setcrrUser(null);
  }

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout clearUserData={clearUserData} crrUser={crrUser} />,
      children: [
        {
          index: true,
          element: (
            <CartContextProvider>
              <Home />
            </CartContextProvider>
          ),
        },
        {
          path: "Home",
          element: (
            <CartContextProvider>
              {" "}
              <Home />
            </CartContextProvider>
          ),
        },

        { path: "Categories", element: <Categories name="mizoo" age="33" /> },
        {
          path: "Cart",
          element: (
            <CartContextProvider>
              {" "}
              <Cart />{" "}
            </CartContextProvider>
          ),
        },
        { path: "Profile", element: <Profile crrUser={crrUser} /> },
        { path: "Brands", element: <Brands /> },
        {
          path: "AllOrders",
          element: (
            <ProtectedRoute>
              {" "}
              <AllOrders crrUser={crrUser} />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "Payment",
          element: (
            <CartContextProvider>
              {" "}
              <Payment />{" "}
            </CartContextProvider>
          ),
        },
        { path: "BrandsProducts/:id", element: <BrandsProducts /> },
        {
          path: "ProductsDetails/:id",
          element: (
            <CartContextProvider>
              {" "}
              <ProductDetails />{" "}
            </CartContextProvider>
          ),
        },
        { path: "Login", element: <Login getUserData={getUserData} /> },
        { path: "Logout", element: <Logout /> },
        { path: "Register", element: <Register /> },
      ],
    },
    // { path: "*", element: <Notfound /> },
  ]);

  useEffect(function () {
    if (localStorage.getItem("tkn") != null && crrUser == null) {
      getUserData();
    }
  }, []);

  return (
    <>
      {
        <RouterProvider
          router={router}
          crrUser={crrUser}
          getUserData={getUserData}
        ></RouterProvider>
      }
    </>
  );
}

export default App;
