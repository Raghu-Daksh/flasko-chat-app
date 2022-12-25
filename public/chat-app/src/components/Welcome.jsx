import React from "react";
import robot from  '../asset/robot.gif'
import './welcome.css'
const Welcome = ({currentUser})=>{
    return (
    <section className="welcome-section">
        <img src= {robot} className= "welcome-logo" />
        <h1>Welcome, <span>{currentUser.username}!</span> </h1>
        <h3>Please select a chat to start messaging</h3>
    </section>
    )
}

export default Welcome;