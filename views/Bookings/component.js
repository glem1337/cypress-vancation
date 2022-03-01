import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import HeaderUser from 'views/shared/UserHeader';
import SearchSection from 'views/Index/SearchSection';
import useSearchDestinationsHeader from 'utils/hooks/useSearchDestinationsHeader';

import useContainer, { getInitialProps } from './hook';
import BookingsList from './BookingsList';
import Messages from './Messages';
import BookingDetails from './BookingDetails';

const Bookings = () => {
  const {
    isChatSectionVisible,
    isDetailsSectionVisible,
    isEmptyState,
  } = useContainer();

  const {
    headerRef,
    isStartInputVisible,
    isChooseDestinationSmallVisible,
    onStartInputFocus,
  } = useSearchDestinationsHeader();

  return (
    <>
      <HeaderUser
        SearchSection={(
          <SearchSection
            isStartInputVisible={isStartInputVisible}
            isChooseDestinationVisible={isChooseDestinationSmallVisible}
            onStartInputFocus={onStartInputFocus}
          />
      )}
        ref={headerRef}
      />
      {isEmptyState && (
        <div
          className="chat-wrap--empty"
        >
          <img className="mb-24" src="/images/Empty.svg" alt="" />
          <p className="mb-24">
            <FormattedMessage id="bookings.youDontHaveAnyBookingsYet" />
          </p>
        </div>
      )}
      {!isEmptyState && (
        <div
          className={classNames(
          'chat-wrap',
          isChatSectionVisible && 'chat-wrap--side-open',
          isDetailsSectionVisible && 'chat-wrap--chat-open',
        )}
        >
          <BookingsList />
          <Messages />
          <BookingDetails />
        </div>
      )}
    </>
  );
};

Bookings.getInitialProps = getInitialProps;

export default Bookings;
