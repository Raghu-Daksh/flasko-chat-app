import React, { useState } from "react";
import "./chatContainer.css";
import ChatInput from "./ChatInput";
import LogOut from "./Logout";
import axios from "axios";
import Message from "./message";
import { getAllMessageRoute, sendMessageRouter } from "../utils/APIRoutes";
import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMesages] = useState([]);
  const [arrivalMessages, setarrivaMessages] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    (async () => {
      if (currentChat) {
        const response = await axios.post(getAllMessageRoute, {
          from: currentUser?._id,
          to: currentChat?._id,
        });
        // console.log("res data", response.data);
        setMesages(response.data);
      }
    })();
  }, [currentChat]);

  const handleSendMessage = async (msg) => {
    await axios.post(sendMessageRouter, {
      from: currentUser?._id,
      to: currentChat?._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat?._id,
      from: currentUser?._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMesages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log("msg ", msg);
        setarrivaMessages({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessages && setMesages((prev) => [...prev, arrivalMessages]);
  }, [arrivalMessages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const deleteHandle = () => {};
  // console.log("messages ", messages);

  return (
    <>
      {currentChat && (
        <section className="chatcontainer">
          <div className="chat-header">
            <div className="user-details">
              <div className="back-btn">
              <ion-icon name="arrow-back-circle-outline"></ion-icon>
              </div>
              <div className="chatcontainer-avatar">
                <img
                  src={`data:image/svg+xml;base64, ${currentChat?.avtarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="chatcontainer-username">
                {currentChat.username}
              </div>
            </div>
            <LogOut />
          </div>
          <div className="chat-messages">
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "recieved"
                    }`}
                  >
                    <div className="content">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMessage={handleSendMessage} />
        </section>
      )}
    </>
  );
};

export default ChatContainer;
