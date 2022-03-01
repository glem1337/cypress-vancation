import { Alert, Divider, Tag } from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';
import CardDetailsPart from '../../../shared/CardDetailsPart';
import TooltipIcon from '../../../shared/TooltipIcon';
import DriversLicense from './cards/DriversLicense';
import GettingReady from './cards/GettingReady';
import PlannedDates from './cards/PlannedDates';
import Support from './cards/Support';
import MainBtnGradient from '../../../shared/buttons/MainBtnGradient';
import RoadsideAssistance from './cards/RoadsideAssistance';
import ProtectionPlan from './cards/ProtectionPlan';
import CancellationPolicy from './cards/CancellationPolicy';
import Claim from './cards/Claim';

const BookingDetailsContent = ({ sidebarType }) => {
  const [showPriceDetails, setPriceDetails] = useState(false);

  return (
    <div className="chat-details-sidebar__inner-wrap">
      <div className="chat-details-sidebar__inner-block pt-16">
        <div className="d-flex align-items-center justify-content-space-between mb-16">
          {
            {
              inquiry: (
                <Tag
                  color="blue"
                >
                  Inquiry
                </Tag>
              ),
              pending: (
                <Tag
                  color="processing"
                >
                  Pending
                </Tag>
              ),
              upcoming: (
                <Tag
                  color="warning"
                >
                  Upcoming
                </Tag>
              ),
              current: (
                <Tag
                  color="success"
                >
                  Current
                </Tag>
              ),
              past: (
                <Tag
                  color="default"
                >
                  Past
                </Tag>
              ),
              cancelled: (
                <Tag
                  color="error"
                >
                  Cancelled
                </Tag>
              ),
            }[sidebarType]
          }
          {
            sidebarType !== 'inquiry' && (
              <p>
                Booking number: 1411957
              </p>
            )
          }
        </div>
        {
          sidebarType === 'cancelled' && (
            <Alert
              type="warning"
              showIcon
              icon={<i className="icon icon-alert" />}
              message={(
                <>
                  <p className="mb-8">
                    Cancelled by me.
                  </p>
                  <p className="mb-4 text-caption font-400">
                    Cancellation reason:
                  </p>
                  <p className="in-black font-400">
                    Dear Joseph, our plans have changed. So we decided to cancel the booking. Sorry!
                  </p>
                </>
              )}
            />
          )
        }
        <img
          className="chat-details-sidebar__img"
          src="https://bit.ly/3hO1hK9"
          alt=""
        />
        <div>
          <CardDetailsPart />
        </div>
        {/*
        THIS BLOCK FOR OWNER
        <div className="d-flex">
          <img
            className="chat-details-sidebar__img chat-details-sidebar__img--small"
            src="https://bit.ly/3hO1hK9"
            alt=""
          />
          <div className="overflow-x-hidden">
            <CardDetailsPart />
          </div>
        </div>
        */}
        <Divider className="mt-16 mb-16" />
        { sidebarType === 'inquiry'
          ? (
            <MainBtnGradient
              className="w-100"
              text="Book now"
              size="large"
            />
          ) : (
            <>
              <div className="d-flex align-items-center justify-content-space-between">
                <p className="in-black text-title">
                  Total
                </p>
                <p className="in-black text-title">
                  $1,662.30
                </p>
              </div>
              <div className={`expand-txt ${showPriceDetails ? 'expand-txt--open' : ''}`}>
                <Divider className="mt-16 mb-0" />
                <div className="d-flex align-items-center justify-content-space-between mt-16">
                  <p className="in-black">
                    $375.00 x 3 nights
                    <TooltipIcon
                      phrase="some text"
                      iconClass="icon-info-f"
                    />
                  </p>
                  <p className="in-black">
                    $1,125.00
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-space-between mt-16">
                  <p className="in-black">
                    Delivery
                  </p>
                  <p className="in-black">
                    $100.00
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-space-between mt-16">
                  <button type="button" className="main-link in-blue-1000">
                    Add-ons
                  </button>
                  <p className="in-black">
                    $115.00
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-space-between mt-16">
                  <button type="button" className="main-link in-blue-1000">
                    Owner fees and processing
                  </button>
                  <p className="in-black">
                    $115.00
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-space-between mt-16">
                  <button type="button" className="main-link in-blue-1000">
                    Protection plan
                  </button>
                  <p className="in-black">
                    $28.00/day
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPriceDetails(!showPriceDetails)}
                type="button"
                className="main-link mt-16 in-blue-1000 font-600"
              >
                {
                  showPriceDetails ? 'Hide ' : 'Show '
                }
                price details
              </button>
            </>
          )
        }
      </div>
      {{
        inquiry: (
          <>
            <PlannedDates sidebarType={sidebarType} />
            <Support />
          </>
        ),
        upcoming: (
          <>
            <GettingReady sidebarType={sidebarType} />
            <DriversLicense />
            <PlannedDates sidebarType={sidebarType} />
            <ProtectionPlan />
            <Support />
            <RoadsideAssistance />
            <CancellationPolicy />
          </>
        ),
        pending: (
          <>
            <DriversLicense isVerified={false} />
            <PlannedDates sidebarType={sidebarType} />
            <ProtectionPlan />
            <Support />
            <RoadsideAssistance />
            <CancellationPolicy />
          </>
        ),
        current: (
          <>
            <GettingReady sidebarType={sidebarType} />
            <DriversLicense />
            <PlannedDates sidebarType={sidebarType} />
            <ProtectionPlan />
            <Support />
            <RoadsideAssistance />
            <CancellationPolicy />
          </>
        ),
        past: (
          <>
            <GettingReady sidebarType={sidebarType} />
            <DriversLicense />
            <PlannedDates sidebarType={sidebarType} />
            <ProtectionPlan />
            <Support />
            <CancellationPolicy />
            <Claim />
          </>
        ),
        cancelled: (
          <>
            <GettingReady sidebarType={sidebarType} />
            <DriversLicense isVerified={false} />
            <PlannedDates sidebarType={sidebarType} />
            <ProtectionPlan />
            <Support />
            <CancellationPolicy />
          </>
        ),
      }[sidebarType]}
    </div>
  );
};

BookingDetailsContent.propTypes = {
  sidebarType: PropTypes.string.isRequired,
};

export default BookingDetailsContent;
