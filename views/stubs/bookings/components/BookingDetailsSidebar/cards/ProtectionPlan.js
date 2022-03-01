const ProtectionPlan = () => (
  <div className="chat-details-sidebar__inner-block d-flex">
    <div className="chat-details-sidebar__icon">
      <img src="/images/booking/booking_details/Insurance_Coverage.svg" alt="" />
    </div>
    <div>
      <p className="mb-8 in-black text-subheader font-700">
        Protection plan
      </p>
      <p className="mb-8 text-subheader font-400">
        Basic
      </p>
      <ul className="simple-list">
        <li>
          State-minimum liability coverage
        </li>
        <li>
          Collision and comp up to $1M
        </li>
        <li>
          Deductibles from $2,000 - $4,000 depending on vehicle
        </li>
      </ul>
    </div>
  </div>
);

export default ProtectionPlan;
