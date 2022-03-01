import React from 'react';
import { Button, Input, Pagination } from 'antd';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { PAGINATION_SIZE } from 'constants/booking';

import BookingCard from '../BookingCard';

import useContainer from './hook';

const BookingsList = () => {
  const {
    containerRef,
    isContainerScrolled,
    isSearchExpanded,
    toggleSearchExpandCondition,
    setFiltersMenuVisibility,
    camperInquiries,
    camperInquiriesPage,
    camperInquiriesTotal,
    onPaginationChange,
  } = useContainer();

  return (
    <div
      className={classNames('chat-list', isContainerScrolled && 'chat-list--scrolled')}
      ref={containerRef}
    >
      <div className="chat-list__header">
        <div className="d-flex align-items-center mr-auto">
          <p className="text-headline mr-8">
            <FormattedMessage id="shared.inbox" />
          </p>
          <span className="main-account-header__item-counter">2</span>
        </div>
        <div>
          <Button
            size="small"
            icon={<i className="icon icon-search" />}
            className="chat-list-filter-btn"
            onClick={toggleSearchExpandCondition}
          />
          <div
            className={classNames('chat-list__search-input', {
              'chat-list__search-input--open': isSearchExpanded,
            })}
          >
            <Input prefix={<i className="icon icon-search" />} allowClear />
            <Button
              onClick={toggleSearchExpandCondition}
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
            onClick={setFiltersMenuVisibility(true)}
          />
        </div>
      </div>
      <div>
        {camperInquiries.map((item, index) => (
          <BookingCard
            key={item.id}
            isFirst={index === 0}
            id={item.id}
          />
        ))}
        {camperInquiriesTotal > PAGINATION_SIZE && (
          <div className="d-flex flex-column align-items-flex-end mt-24 mr-20 mt-md-40">
            <Pagination
              current={camperInquiriesPage}
              total={camperInquiriesTotal}
              pageSize={PAGINATION_SIZE}
              showSizeChanger={false}
              onChange={onPaginationChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsList;
