import React from "react";
import styles from "./Notfound.module.css";
import { Helmet } from "react-helmet";
import imgg from "../../Assets/images/notFound.jpg=.webp";
export default function Notfound() {
  return (
    <>
      <Helmet>
        <title>All Orders</title>
      </Helmet>
      <div className="container">
        <img src={imgg} alt="Not Found" />
      </div>
    </>
  );
}
