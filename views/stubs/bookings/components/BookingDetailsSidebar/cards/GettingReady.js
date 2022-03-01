import { Divider } from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';
import MainBtnGradient from '../../../../shared/buttons/MainBtnGradient';
import TooltipIcon from '../../../../shared/TooltipIcon';

const GettingReady = ({ sidebarType }) => {
  const [showDocuments, setShowDocuments] = useState(false);

  return (
    <div className="chat-details-sidebar__inner-block d-flex">
      <div className="chat-details-sidebar__icon">
        <img src="/images/booking/booking_details/Key_Exchange.svg" alt="" />
      </div>
      <div>
        {{
          upcoming: (
            <>
              <p className="mb-8 in-black text-subheader font-700">
                Getting ready for the trip
              </p>
              <p className="mb-24">
                Your trip starts soon! You can manage your trip documents here.
              </p>
              <MainBtnGradient
                className="w-100"
                size="large"
                text="Start key exchange"
              />
            </>
          ),
          current: (
            <>
              <p className="mb-8 in-black text-subheader font-700">
                Getting ready for the trip
              </p>
              <p className="mb-24">
                The trip has started. You can manage your trip documents here.
              </p>
              <MainBtnGradient
                className="w-100"
                size="large"
                text="Start vehicle return"
              />
            </>
          ),
          past: (
            <>
              <p className="mb-8 in-black text-subheader font-700">
                We hope you had a fun Vancation!
              </p>
              <p className="mb-24">
                The trip has ended. You can manage your documents here.
              </p>
              <MainBtnGradient
                className="w-100"
                size="large"
                text="Leave a review"
              />
            </>
          ),
          cancelled: (
            <>
              <p className="mb-8 in-black text-subheader font-700">
                This trip has been cancelled
              </p>
              <p>
                The trip has been cancelled. You can manage your documents here.
              </p>
            </>
          ),
        }[sidebarType]}
        <div className={`expand-txt ${showDocuments ? 'expand-txt--open' : ''}`}>
          <Divider className="mt-16 mb-0" />
          <div className="mt-16">
            <button
              type="button"
              className="main-link in-blue-1000"
            >
              Photos before the trip
            </button>
          </div>
          <div className="d-flex align-items-center mt-16">
            <button
              type="button"
              className="main-link in-blue-1000"
            >
              Rental contract
            </button>
            <TooltipIcon
              phrase="Signed by owner"
              iconClass="icon-signed-f in-green-1000"
            />
          </div>
          <div className="mt-16">
            <button
              type="button"
              className="main-link in-blue-1000"
            >
              Departure form checklist
            </button>
          </div>
          <div className="mt-16">
            <button
              type="button"
              className="main-link in-blue-1000"
            >
              Booking receipt, insurance card, and membership details
            </button>
          </div>
          <Divider className="mt-16 mb-0" />
          <p className="mt-16 in-black font-600">
            Additional Documents
          </p>
          <div className="mt-16">
            <a href="" className="main-link in-blue-1000">
              Checklist.pdf
            </a>
          </div>
          <div className="d-flex align-items-center mt-16">
            <a href="" className="main-link in-blue-1000">
              Booking receipt.pdf
            </a>
            <TooltipIcon
              phrase="Not signed by owner"
              iconClass="icon-not-signed-f in-gray-500"
            />
          </div>
        </div>
        <button
          onClick={() => setShowDocuments(!showDocuments)}
          type="button"
          className="main-link mt-16 in-blue-1000 font-600"
        >
          {
            showDocuments ? 'Hide ' : 'View '
          }
          documents
        </button>
      </div>
    </div>
  );
};

GettingReady.propTypes = {
  sidebarType: PropTypes.string.isRequired,
};

export default GettingReady;
