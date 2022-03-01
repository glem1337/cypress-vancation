/* eslint-disable react/prop-types */
import React from 'react';
import ChatHeaderOwner from './ChatHeaderOwner';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const Chat = ({ sideToggle, chatToggle }) => (
  <div className="chat">
    <ChatHeaderOwner chatToggle={chatToggle} sideToggle={sideToggle} />
    <ChatBody />
    <ChatFooter />
  </div>
);

export default Chat;
