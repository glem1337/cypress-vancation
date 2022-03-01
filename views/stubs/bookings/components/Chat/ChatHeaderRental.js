import { Avatar, Badge, Button } from 'antd';
import React from 'react';

const ChatHeaderRental = () => (
  <div className="chat-header">
    <Badge
      size={48}
      dot
      className="mr-16 user-online"
    >
      <Avatar
        className="flex-shrink-0"
        size={48}
        src="https://randomuser.me/api/portraits/women/87.jpg"
      />
    </Badge>
    <div>
      <div className="d-flex align-items-center">
        <p className="text-title mr-8">
          Dean Joseph
        </p>
      </div>
      <div>
        <a className="d-inline-flex align-items-center mr-16 text-color-gray" href="tel:+1 766-732-6732">
          <i className="icon icon-phone mr-4 in-gray-500 font-20" />
          +1 766-732-6732
        </a>
      </div>
    </div>
    <Button
      className="ml-auto"
      size="large"
      type="secondary"
      shape="circle"
      icon={<i className="icon icon-chat-back font-20" />}
    />
  </div>
);

export default ChatHeaderRental;
