import MainBtnGradient from '../../../../shared/buttons/MainBtnGradient';

const Claim = () => (
  <div className="chat-details-sidebar__inner-block d-flex">
    <div className="chat-details-sidebar__icon">
      <img src="/images/booking/booking_details/Claim.svg" alt="" />
    </div>
    <div>
      <p className="mb-8 in-black text-subheader font-700">
        Claim
      </p>
      <p>
        Feel like.. Start a claim and the Vancation team will investigate it on your behalf.
      </p>
      <MainBtnGradient
        className="w-100 mt-24"
        text="Start a claim"
        size="large"
      />
    </div>
  </div>
);

export default Claim;
