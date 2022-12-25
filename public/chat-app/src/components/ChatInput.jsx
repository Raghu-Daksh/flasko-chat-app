import React from "react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import "./ChatInput.css";
import { useState } from "react";

const ChatInput = ({handleSendMessage}) => {
  const [showEmojiPikcer, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handelEmojiPickHideShow = () => {
    setShowEmojiPicker(!showEmojiPikcer);
  };

  const handleEmojiClick = (event, emoji) => {
    let message = msg;
    message = message + emoji.emoji;
    setMsg(message);
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMessage(msg);
      setMsg("");
    }
  };

  return (
    <section className="ChatInput">
      <div className="btn-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handelEmojiPickHideShow} />
          {showEmojiPikcer && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="inp-container" onSubmit={(e)=>{sendChat(e)}}>
        <input
          className="inp-chatInput"
          type="text"
          placeholder="type your text here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit-btn" type="submit">
          <IoMdSend />
        </button>
      </form>
    </section>
  );
};

export default ChatInput;
