const CancellationPolicy = () => (
  <div className="chat-details-sidebar__inner-block d-flex">
    <div className="chat-details-sidebar__icon">
      <img src="/images/booking/booking_details/Cancellation_Policy.svg" alt="" />
    </div>
    <div>
      <p className="mb-8 in-black text-subheader font-700">
        Cancellation policy
      </p>
      <div className="mb-8">
        <a href="" className="main-link in-blue-1000 text-subheader font-400">
          Easy Going
        </a>
      </div>
      <p>
        Travelers who cancel at least 14 days before check-in will get back
        100% of the amount paid. If you cancel between 7 and 14 days before
        check-in, you&lsquo;ll get back 50%. Otherwise,
        you won&lsquo;t get a refund.
      </p>
    </div>
  </div>
);

export default CancellationPolicy;
