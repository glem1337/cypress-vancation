import MainBtnGradient from 'views/stubs/shared/buttons/MainBtnGradient';

const BookingListEmpty = () => (
  <div className="chat-list__empty">
    <div className="text-align-center">
      <p className="mb-16 text-headline">
        No Bookings and Inquiries found.
      </p>
      <p className="mb-24">
        Try another search criteria or clear your filters.
      </p>
      <MainBtnGradient
        className="min-w-140"
        size="large"
        text="Clear filters"
      />
    </div>
  </div>
);

export default BookingListEmpty;
