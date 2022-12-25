import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './register.css'
import "./register.css";
import "react-toastify/dist/ReactToastify.css";
import {loginRoute } from "../utils/APIRoutes";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const toastOptions = {
    postion: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      // console.log("validation",loginRoute);
      const { password, email } = values;
      const { data } = await axios.post(loginRoute, {
        email,
        password,
      });
      console.log("login data",data);
      if (data?.status === false) {
        toast.error(data?.msg, toastOptions);
      }

      if (data?.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data?.User));
         navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { password, email } = values;

     if (email === "") {
      toast.error(
        "email and password should't be empty",
        toastOptions
      );
      return false;
    } else if (password === "") {
      toast.error(
        "email and password should't be empty",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("email is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className= "register-section">
        <div className="brand">
          <img src="" alt="" />
          <h1>Flasko</h1>
        </div>
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="register-inp"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password" 
          className="register-inp"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit" className="register-btn">
         Login
        </button>
        <span>
          Already have an account ? <Link to="/register">Register</Link>
        </span>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;
