import React, { useEffect, useState } from "react";
import styles from "./Brands.module.css";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
export default function Brands() {
  const [allBrands, setallBrands] = useState(null);

  async function getAllBrands() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
    setallBrands(data.data);
  }

  useEffect(function () {
    getAllBrands();
  }, []);

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      {allBrands ? (
        <div className="container">
          <div className="row  d-flex align-items-center">
            <div className="col-md-3">
              <div className="title">
                <h4>Our Brands</h4>
                <h5>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Corporis, voluptatum.
                </h5>
              </div>
            </div>

            {allBrands.map(function (brandd, idx) {
              return (
                <div key={idx} className="col-md-3 text-center bg-light">
                  <Link to={`/BrandsProducts/${brandd._id}`}>
                    <img
                      className="w-100"
                      src={brandd.image}
                      alt={brandd.name}
                    />
                    <h4>{brandd.name}</h4>
                  </Link>
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
