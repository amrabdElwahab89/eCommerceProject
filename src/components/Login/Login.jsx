import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import $, { error } from "jquery";
import { useNavigate } from "react-router-dom";
import Home from "../Home/Home";
import { Helmet } from "react-helmet";

export default function Login({ getUserData }) {
  let user = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  async function logInUser(newUser) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",

        newUser
      );
      console.log(data);

      if (data.message === "success") {
        navigate("/Home");
        $(".success-msg").fadeIn(10000, function () {});
        localStorage.setItem("tkn", data.token);
        getUserData();
      }
    } catch (error) {
      console.log(error);
      $(".error-msg").html(error.response.data.message);
      $(".error-msg").fadeIn(500, function () {
        $(".error-msg").fadeOut(5000);
      });
    }
  }

  let formik = useFormik({
    initialValues: user,
    onSubmit: function (values) {
      logInUser(values);
    },

    validate: function (values) {
      let erros = {};

      if (!values.email.includes("@") || !values.email.includes(".com")) {
        erros.email = "Incorrect Email";
      }

      if (
        values.password.includes("@") == false ||
        values.password.length < 3
      ) {
        erros.password = "invalid password";
      }

      return erros;
    },
  });

  return (
    <>
      <Helmet>
        <title>Log In</title>
      </Helmet>
      <div className="container py-5">
        <div
          style={{ display: "none" }}
          className="alert alert-danger text-center error-msg"
        ></div>

        <div
          style={{ display: "none" }}
          className="alert alert-success text-center success-msg"
        >
          Log In successfull
        </div>

        <h3>Sign IN</h3>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">E-mail</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            id="email"
            className="form-control mb-3"
          />

          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger text-center">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="password">Password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type="password"
            id="password"
            className="form-control mb-3"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger text-center">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}

          <button className="btn btn-success" type="submit">
            Log In
          </button>
        </form>
      </div>
    </>
  );
}
