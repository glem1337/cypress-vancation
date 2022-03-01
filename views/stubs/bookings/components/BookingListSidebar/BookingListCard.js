/* eslint-disable react/prop-types */
import { Divider, Tag, Avatar, Badge } from 'antd';

const BookingListCard = ({ chatToggle }) => (
  <div role="button" className="chat-list__card" onClick={chatToggle}>
    <p className="mb-16 in-black font-600">
      {/* TODO: Truncate this text */}
      Forest River Grey Wolf 2020 Ford Econoline…
    </p>
    <div className="d-flex align-items-center justify-content-space-between">
      <div className="d-flex align-items-center">
        <i className="icon icon-calendar mr-8 in-gray-500" />
        <p className="in-black">Dec 1 - Dec 4, 2020</p>
      </div>
      <Tag color="success">Current</Tag>
    </div>
    <Divider />
    <div className="d-flex">
      {/* TODO: Remove user-online if user offline */}
      <Badge dot className="ant-badge--user mr-16 user-online">
        <Avatar
          className="flex-shrink-0"
          size="large"
          src="https://randomuser.me/api/portraits/women/87.jpg"
        />
      </Badge>
      <div className="flex-grow-1">
        <div className="d-flex align-items-center justify-content-space-between mb-8">
          <p className="in-black font-600">Dean Joseph</p>
          <p className="text-caption in-gray-700">2 days ago</p>
        </div>
        <div className="d-flex align-items-center justify-content-space-between">
          {/* TODO: Truncate this text */}
          {/* When chat have new message remove class "text-color-gray" */}
          <p className="mr-8 text-color-gray">
            The camper is currently available and ready for your trip. So you…
          </p>
          <span className="main-account-header__item-counter flex-shrink-0">
            2
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default BookingListCard;
