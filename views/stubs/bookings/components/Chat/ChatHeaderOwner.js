/* eslint-disable react/prop-types */
import { Avatar, Badge, Button, Tag } from 'antd';

const ChatHeaderOwner = ({ chatToggle, sideToggle }) => (
  <div className="chat-header">
    <Button
      className="ant-btn-link ant-btn-flat d-lg-none mr-8"
      icon={<i className="icon icon-left in-gray-500" />}
      onClick={chatToggle}
    />
    <Badge
      size={48}
      dot
      className="ant-badge--user badge-size mr-16 user-online"
    >
      <Avatar
        className="flex-shrink-0"
        size={48}
        src="https://randomuser.me/api/portraits/women/87.jpg"
      />
    </Badge>
    <div>
      <div className="d-flex align-items-center mb-md-4">
        <p className="text-title mr-8">Dean Joseph</p>
        <Tag
          className="d-none d-md-inline-flex"
          color="success"
          icon={
            <i className="icon icon-activate-f mr-4 in-green-1000 font-16" />
          }
        >
          Driver’s License verified
        </Tag>
        <i className="icon icon-info in-gray-500 d-md-none" />
      </div>
      <div className="d-none d-md-flex align-items-center">
        <div className="d-flex align-items-center mr-20">
          <img className="mr-4" src="/images/listing/Like-Green.svg" alt="" />
          <span className="in-green-300">98%</span>
        </div>
        <a
          className="d-inline-flex align-items-center mr-16 text-color-gray"
          href="tel:+1 766-732-6732"
        >
          <i className="icon icon-phone mr-4 in-gray-500 font-20" />
          +1 766-732-6732
        </a>
        <a
          className="d-inline-flex align-items-center mr-4 text-color-gray"
          href="mailto:dean.joseph@gmail.com"
        >
          <i className="icon icon-email mr-4 in-gray-500 font-20" />
          dean.joseph@gmail.com
        </a>
        <i className="icon icon-activate-f in-azure-1000 font-16" />
      </div>
    </div>
    <Button
      className="ml-auto"
      size="large"
      type="secondary"
      shape="circle"
      icon={<i className="icon icon-chat-back font-20" />}
      onClick={sideToggle}
    />
  </div>
);

export default ChatHeaderOwner;
