/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
 Button, Divider, Space, Tooltip, DatePicker,
} from 'antd';
import CollapsibleText from 'views/stubs/search/components/CollapsibleText';
import DateModal from './DateModal';
import RulesModal from './RulesModal';
import AddonsModal from './AddonsModal';
import FeesModal from './FeesModal';
import PlanModal from './PlanModal';

const { RangePicker } = DatePicker;

const Details = ({ detailsToggle }) => {
  const [dateVisible, setDateVisible] = useState(false);
  const dateVisibleToggle = () => setDateVisible((prev) => !prev);
  const [rulesVisible, setRulesVisible] = useState(false);
  const rulesVisibleToggle = () => setRulesVisible((prev) => !prev);
  const [addonsVisible, setAddonsVisible] = useState(false);
  const addonsVisibleToggle = () => setAddonsVisible((prev) => !prev);
  const [feesVisible, setFeesVisible] = useState(false);
  const feesVisibleToggle = () => setFeesVisible((prev) => !prev);
  const [planVisible, setPlanVisible] = useState(false);
  const planVisibleToggle = () => setPlanVisible((prev) => !prev);

  return (
    <>
      <div className="checkout__details-header">
        <span className="text-title">Details</span>
        <Button
          icon={<i className="icon icon-cross" />}
          type="secondary"
          shape="circle"
          size="large"
          onClick={detailsToggle}
        />
      </div>
      <div className="checkout__details-main">
        <div className="checkout__details-info">
          <div className="checkout__details-img">
            <img src="https://bit.ly/3iGoHBI" alt="" />
          </div>
          <div className="flex-1 overflow-down-lg-hidden ml-16 ml-lg-0 mt-lg-16">
            <div className="text-subheader text-truncate mb-8">
              Forest River Grey Wolf 2020 Ford Econoline 150
            </div>
            <div className="text-uppercase mb-16">
              <p>Unique camper in Los Angeles</p>
              <p>Ford Econoline 150</p>
            </div>
            <div className="d-flex align-items-center">
              <div>
                <i className="icon icon-bed in-gray-500 mr-12" />
                <span className="mr-4">Sleeps</span>
                <span className="in-black">2</span>
              </div>
              <div className="mr-8 ml-8">•</div>
              <div>
                <i className="icon icon-seats in-gray-500 mr-12" />
                <span className="mr-4">Seats</span>
                <span className="in-black">2</span>
              </div>
            </div>
          </div>
        </div>
        <Divider className="mt-16 mb-16" />
        <div
          className="checkout__details-dates d-md-none mb-16"
          role="button"
          onClick={dateVisibleToggle}
        >
          <div className="checkout__details-dates-item">
            <div className="text-caption mb-4">Departure</div>
            <div className="in-black">Wed, Nov 16</div>
          </div>
          <div className="checkout__details-dates-divider" />
          <div className="checkout__details-dates-item">
            <div className="text-caption mb-4">Departure</div>
            <div className="in-black">Thu, Dec 8</div>
          </div>
        </div>
        <div className="d-none d-md-flex mb-16">
          <RangePicker
            className="two-section-rangepicker"
            suffixIcon={false}
            renderExtraFooter={() => (
              <Button type="link" className="pl-0">
                Clear
              </Button>
            )}
            format="MMM D, YYYY"
          />
        </div>
        <Space direction="vertical" size={16} className="w-100">
          <div className="d-flex align-items-center justify-content-space-between">
            <div className="d-flex align-items-center">
              <span className="in-black">$375.00 x 3 nights</span>
              <Tooltip title="some info">
                <i className="icon icon-info-f main-tooltip-icon font-18" />
              </Tooltip>
            </div>
            <span className="in-black">$1,125.00</span>
          </div>
          <div className="d-flex align-items-center justify-content-space-between">
            <span className="in-black">Delivery</span>
            <span className="in-black">$100.00</span>
          </div>
          <div className="d-flex align-items-center justify-content-space-between">
            <Button
              className="ant-btn-main-link font-400"
              onClick={addonsVisibleToggle}
            >
              Add-ons
            </Button>
            <span className="in-black">$115.00</span>
          </div>
          <div className="d-flex align-items-center justify-content-space-between">
            <Button
              className="ant-btn-main-link font-400"
              onClick={feesVisibleToggle}
            >
              Owner fees and processing
            </Button>
            <span className="in-black">$537.30</span>
          </div>
          <div className="d-flex align-items-center justify-content-space-between">
            <div className="d-flex align-items-center">
              <Button
                className="ant-btn-main-link font-400"
                onClick={planVisibleToggle}
              >
                Protection plan
              </Button>
              <Tooltip title="some info">
                <i className="icon icon-info-f main-tooltip-icon font-18" />
              </Tooltip>
            </div>
            <span className="in-black">$28.00/day</span>
          </div>
        </Space>
        <Divider className="mt-16 mb-16" />
        <div className="d-flex justify-content-space-between">
          <span className="text-title">Total</span>
          <span className="text-title">$1,662.30</span>
        </div>
        <div className="d-flex justify-content-space-between mt-32">
          <div className="d-flex align-items-center">
            <span className="in-black">Due to reserve</span>
            <Tooltip title="some info">
              <i className="icon icon-info-f main-tooltip-icon font-18" />
            </Tooltip>
          </div>
          <span className="in-black">$363.71</span>
        </div>
        <div className="checkout__details-warning">
          <div className="text-subheader mb-8">
            Cancellation policy - Easy Going
          </div>
          <CollapsibleText className="checkout__details-warning-text">
            Travelers who cancel at least 14 days before check-in will get back
            100% of the amount paid. If you cancel between 7 and 14 days before
            check-in, you&apos;ll get back 50%. Otherwise, you won&apos;t get a
            refund.
          </CollapsibleText>
        </div>
        <Button className="ant-btn-main-link" onClick={rulesVisibleToggle}>
          View Owner Rules &#38; Policies
        </Button>
      </div>
      <DateModal visible={dateVisible} onClose={dateVisibleToggle} />
      <RulesModal visible={rulesVisible} onClose={rulesVisibleToggle} />
      <AddonsModal visible={addonsVisible} onClose={addonsVisibleToggle} />
      <FeesModal visible={feesVisible} onClose={feesVisibleToggle} />
      <PlanModal visible={planVisible} onClose={planVisibleToggle} />
    </>
  );
};

export default Details;
