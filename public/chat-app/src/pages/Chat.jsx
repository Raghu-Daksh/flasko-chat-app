import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";
import Contact from "../components/Contact";
import Welcome from "../components/Welcome";
import { allUserRoute, host } from "../utils/APIRoutes";
import io from "socket.io-client";
import "./chat.css";
import { useRef } from "react";

const Chat = () => {
    const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContact] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("chat-app-user")) navigate("/login");
      else {
        const getData = await JSON.parse(localStorage.getItem("chat-app-user"));
        setCurrentUser(getData);
        setIsLoaded(true);
        console.log("getdata", getData);
      }
    })();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

//  console.log("current user", currentUser);
  useEffect(() => {

    (async () => {
      if (currentUser) {
        console.log("test6");
        if (currentUser?.isAvtarImageSet) {
          console.log("test7");
          const data = await axios.get(`${allUserRoute}/${currentUser?._id}`);
          console.log("data ac", data);
          setContact(data?.data);
        } else {
          console.log("test8");
          navigate("/avatar");
        }
      }
    })();
  }, [currentUser]);
  
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <section className="chat-section">
      <div className="container">
        <Contact
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </section>
  );
};

export default Chat;
