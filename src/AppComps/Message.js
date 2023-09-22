
import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import './style.css'

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message 
      ${message.senderId === currentUser.uid 
        && "owner"}`}
    >
      <div className="messInfo">
        <img className="img-icon"
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span className="time">just now</span>
      </div>
      <div className="messCont">
        <p className='mess-t'>{message.text}</p>
        {message.img && <img className='icons' src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;