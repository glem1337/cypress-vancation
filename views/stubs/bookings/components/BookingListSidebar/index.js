/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import { Button, Input } from 'antd';
import classNames from 'classnames';
import BookingListCard from './BookingListCard';

const BookingListSidebar = ({ changeFilterState, chatToggle }) => {
  const [openBtn, setOpenBtn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const chatListRef = useRef(null);
  useEffect(() => {
    const chatListEl = chatListRef.current;
    const scrollHandler = () => {
      setScrolled(chatListEl.scrollTop !== 0);
    };
    chatListEl.addEventListener('scroll', scrollHandler);
    scrollHandler();
    return () => chatListEl.removeEventListener('scroll', scrollHandler);
  });

  return (
    <div
      className={classNames('chat-list', scrolled && 'chat-list--scrolled')}
      ref={chatListRef}
    >
      <div className="chat-list__header">
        <div className="d-flex align-items-center mr-auto">
          <p className="text-headline mr-8">Inbox</p>
          <span className="main-account-header__item-counter">2</span>
        </div>
        <div>
          <Button
            size="small"
            icon={<i className="icon icon-search" />}
            className="chat-list-filter-btn"
            onClick={() => setOpenBtn(!openBtn)}
          />
          <div
            className={classNames('chat-list__search-input', {
              'chat-list__search-input--open': openBtn,
            })}
          >
            <Input prefix={<i className="icon icon-search" />} allowClear />
            <Button
              onClick={() => setOpenBtn(!openBtn)}
              size="large"
              className="chat-list__search-input-btn"
              icon={<i className="icon icon-cross in-gray-500" />}
            />
          </div>
          {/* TODO:
           if filter is selected, add type="secondary" to Button
            and new class "in-blue-1000 to icon"
          */}
          <Button
            size="small"
            icon={<i className="icon icon-filter" />}
            className="chat-list-filter-btn"
            onClick={() => changeFilterState()}
          />
        </div>
      </div>
      <div>
        <BookingListCard chatToggle={chatToggle} />
        <BookingListCard chatToggle={chatToggle} />
        <BookingListCard chatToggle={chatToggle} />
        <BookingListCard chatToggle={chatToggle} />
        <BookingListCard chatToggle={chatToggle} />
        <BookingListCard chatToggle={chatToggle} />
      </div>
      {/*
      Add this if empty
      <BookingListEmpty />
      */}
    </div>
  );
};

export default BookingListSidebar;
