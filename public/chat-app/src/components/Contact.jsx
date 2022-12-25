import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./contact.css";
import styled from "styled-components";
import logo from "../asset/logo.svg";
import ChatContainer from "./ChatContainer";

const Contact = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [change, setChange] = useState(false);


  console.log(contacts,"contacts");

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser?.username);
      setCurrentUserImage(currentUser?.avtarImage);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  console.log(change);
  return (
    <>
      {currentUserImage && currentUserName && (
        <section className= "contact-section mob-contact-section"> 
          <div className="brand">
            <div className="contact-logo">
              <img src={logo} alt="logo" />
              <h3>Flasko</h3>
            </div>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={index}
                  className={`contact ${
                    currentSelected === index
                      ? "contact-selected "
                      : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="contact-avatar">
                    <img
                      src={`data:image/svg+xml;base64, ${contact?.avtarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="contact-username">
                    <h3>{contact?.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="cu-avatar">
              <img
                src={`data:image/svg+xml;base64, ${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="cu-username">
              <h1>{currentUserName}</h1>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Contact;
