import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

const Register = () => {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      console.log("validation", registerRoute);
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      console.log('datar', data);
      if (data?.status === false) {
        toast.error(data?.msg, toastOptions);
      }
      if (data?.status === true) {
        console.log("test pass"); 
        localStorage.setItem("chat-app-user", JSON.stringify(data?.User));
         navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;

    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same", toastOptions);
      return false;
    } else if (username?.length < 3) {
      toast.error(
        "username should be greater then or equal to 3 character ",
        toastOptions
      );
      return false;
    } else if (password?.length < 8) {
      toast.error(
        "password should be greater then or equal to 8 character ",
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
          type="text"
          placeholder="username"
          name="username"
          onChange={(e) => handleChange(e)}
          className="register-inp"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChange(e)}
          className="register-inp"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
          className="register-inp"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={(e) => handleChange(e)}
          className="register-inp"
        />
        <button type="submit" className="register-btn">
          Create User
        </button>
        <span>
          Already have an account ? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </>
  );
};

export default Register;
