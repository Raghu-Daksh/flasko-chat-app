import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {BiPowerOff} from 'react-icons/bi'
import "./logout.css";

const LogOut = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div className="logout-btn" onClick={handleClick}> 
        {/* <ion-icon name="log-out-outline"></ion-icon> */}
        <BiPowerOff />
      </div>
    </>
  );
};
export default LogOut;
