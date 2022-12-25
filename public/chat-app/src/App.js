import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Avatar from "./pages/Avatar";
import ChatContainer from "./components/ChatContainer";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Chat />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/avatar" element={<Avatar />} />
          <Route exact path="/chatContainer" element={<ChatContainer />} />
        </Routes> 
      </BrowserRouter>
    </div>
  );
};

export default App;
