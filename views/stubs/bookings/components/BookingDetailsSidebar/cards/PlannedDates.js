import { useState } from 'react';
import { Button } from 'antd';
import EditDeliveryModal from '../../EditDeliveryModal';

const PlannedDates = () => {
  const [visible, setVisible] = useState(false);
  const visibleToggle = () => setVisible((prev) => !prev);

  return (
    <div className="chat-details-sidebar__inner-block d-flex">
      <div className="chat-details-sidebar__icon">
        <img src="/images/booking/booking_details/Pickup_Details.svg" alt="" />
      </div>
      <div>
        <div className="d-flex align-items-center justify-content-space-between mb-8">
          <p className="in-black text-subheader font-700">
            Edit delivery details
          </p>
          <Button
            type="secondary"
            icon={<i className="icon icon-edit-pencil font-18" />}
            shape="circle"
            size="small"
            onClick={visibleToggle}
          />
        </div>
        <p className="mb-4">Departure</p>
        <div className="mb-16 text-subheader font-400">
          Tuesday, December 1, 2020,
          <span className="ml-4 text-color-gray">4:00 PM</span>
          <p className="mt-4 text-color-gray text-caption">
            Address: 1352 Naped Street, Los Angeles
          </p>
        </div>
        <p className="mb-4">Return</p>
        <div className="text-subheader font-400">
          Friday, December 4, 2020,
          <span className="ml-4 text-color-gray">11:00 AM</span>
          <p className="mt-4 text-color-gray text-caption">
            Address: 1352 Naped Street, Los Angeles
          </p>
        </div>
      </div>
      <EditDeliveryModal visible={visible} onClose={visibleToggle} />
    </div>
  );
};

export default PlannedDates;
