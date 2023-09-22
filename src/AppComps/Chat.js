
import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../Context/ChatContext";
import './style.css'


const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span className='header'>{data.user?.displayName}</span>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;