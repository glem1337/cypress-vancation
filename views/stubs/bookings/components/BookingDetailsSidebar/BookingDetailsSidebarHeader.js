/* eslint-disable react/prop-types */
import { Button } from 'antd';
import Dropdown from '../../../shared/dropdowns/Dropdown';

const BookingDetailsSidebarHeader = ({ sidebarType, sideToggle }) => (
  <div className="chat-details-sidebar__header">
    <p className="mr-auto text-title">
      {
        sidebarType !== 'inquiry'
        ? 'Booking Details'
        : 'Inquiry Details'
      }
    </p>
    <Dropdown
      className="mr-24"
      icon={(<i className="icon icon-overflow in-gray-500 c-pointer" />)}
      placement="bottomRight"
      overlayClassName="min-w-160"
    >
      <div className="main-dropdown-wrap">
        <div className="main-dropdown__body">
          <div className="main-dropdown__item in-black c-pointer">
            Cancel Booking
          </div>
        </div>
      </div>
    </Dropdown>
    <Button
      type="secondary"
      shape="circle"
      size="large"
      icon={<i className="icon icon-right" />}
      onClick={sideToggle}
    />
  </div>
);

export default BookingDetailsSidebarHeader;
