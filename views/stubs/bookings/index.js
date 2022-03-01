import { useState } from 'react';
import classNames from 'classnames';
import Header from 'views/stubs/layout/headers/mainHeader/Header';
import BookingList from './components/BookingListSidebar';
import FilterSidebar from './components/FilterSidebar';
import BookingDetailsSidebar from './components/BookingDetailsSidebar/BookingDetailsSidebar';
import Chat from './components/Chat';

const Booking = () => {
  const [sideOpen, setSideOpen] = useState(false);
  const sideToggle = () => setSideOpen((prev) => !prev);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const changeFilterState = () => setIsFilterVisible((prev) => !prev);
  const [chatOpen, setChatOpen] = useState(false);
  const chatToggle = () => setChatOpen((prev) => !prev);

  return (
    <>
      <Header />
      <div
        className={classNames(
          'chat-wrap',
          sideOpen && 'chat-wrap--side-open',
          chatOpen && 'chat-wrap--chat-open',
        )}
      >
        <BookingList
          changeFilterState={changeFilterState}
          chatToggle={chatToggle}
        />
        <FilterSidebar
          isVisible={isFilterVisible}
          changeFilterState={changeFilterState}
        />
        <Chat chatToggle={chatToggle} sideToggle={sideToggle} />
        {/* State of type: inquiry, upcoming, pending, current, past, cancelled */}
        <BookingDetailsSidebar sidebarType="past" sideToggle={sideToggle} />
      </div>
    </>
  );
};

export default Booking;
