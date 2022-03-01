/* eslint-disable react/prop-types */
import BookingDetailsSidebarHeader from './BookingDetailsSidebarHeader';
import BookingDetailsContent from './BookingDetailsContent';

const BookingDetailsSidebar = ({ sidebarType, sideToggle }) => (
  <>
    <div className="chat-details-sidebar">
      <BookingDetailsSidebarHeader
        sidebarType={sidebarType}
        sideToggle={sideToggle}
      />
      <BookingDetailsContent sidebarType={sidebarType} />
    </div>
    <div
      role="button"
      className="chat-details-sidebar__overlay"
      onClick={sideToggle}
    />
  </>
);

export default BookingDetailsSidebar;
