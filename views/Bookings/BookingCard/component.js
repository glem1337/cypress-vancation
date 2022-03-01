import React from 'react';
import { Divider, Tag, Avatar, Badge } from 'antd';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';

import useContainer from './hook';

const BookingCard = (props) => {
  const {
    datesString,
    setActiveBookingId,
    camperName,
    lastMessage,
    lastMessageDate,
    unreadMessagesAmount,
    status,
    ownerInfo,
  } = useContainer(props);

  return (
    <div
      role="button"
      className="chat-list__card"
      onClick={setActiveBookingId}
    >
      <p className="mb-16 in-black font-600 chat-wrap__truncated-text">
        {camperName}
      </p>
      <div className="d-flex align-items-center justify-content-space-between">
        <div className="d-flex align-items-center">
          <i className="icon icon-calendar mr-8 in-gray-500" />
          <p className="in-black">{datesString}</p>
        </div>
        <Tag color={status.color}>
          <FormattedMessage id={status.id} />
        </Tag>
      </div>
      <Divider />
      <div className="d-flex">
        <Badge
          dot
          className={
            classnames(
              'ant-badge--user mr-16',
              { 'user-online': ownerInfo.isOnline },
            )
          }
        >
          <Avatar
            className="flex-shrink-0"
            size="large"
            src={ownerInfo.avatar}
          />
        </Badge>
        <div className="flex-grow-1">
          <div className="d-flex align-items-center justify-content-space-between mb-8">
            <p className="in-black font-600">{ownerInfo.name}</p>
            <p className="text-caption in-gray-700">{lastMessageDate}</p>
          </div>
          <div className="d-flex align-items-center justify-content-space-between">
            <p
              className={
                classnames(
                  'mr-8',
                  { 'text-color-gray': unreadMessagesAmount === 0 },
                )
              }
            >
              {lastMessage}
            </p>
            {unreadMessagesAmount > 0 && (
              <span className="main-account-header__item-counter flex-shrink-0">
                {unreadMessagesAmount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
