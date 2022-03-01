/* eslint-disable react/prop-types */
import { Button, DatePicker, Divider } from 'antd';
import classNames from 'classnames';

import MainBtnGradient from '../../shared/buttons/MainBtnGradient';
import TooltipIcon from '../../shared/TooltipIcon';

const { RangePicker } = DatePicker;

const StickyInfoCard = ({ cardHidden }) => (
  <div
    className={classNames(
      'van-details__sticky-card',
      cardHidden && 'van-details__sticky-card--hidden',
    )}
  >
    <div className="van-details__sticky-card-header">
      <div>
        <p className="text-title in-white mb-2">Mercedes-Benz</p>
        <p className="van-details__sticky-card-header-txt mb-2">
          Sprinter Winnebago Revel 4x4
        </p>
        <div className="d-flex align-items-center">
          <i className="icon icon-flash-f mr-8 in-yellow-1000" />
          <p className="text-title in-white">
            $375
            <span className="van-details__sticky-card-header-txt font-12 font-400">
              / night
            </span>
          </p>
        </div>
      </div>
      <div className="van-details__sticky-card-header-img">
        <img src="https://bit.ly/3iGoHBI" alt="" />
      </div>
    </div>
    <div className="van-details__sticky-card-body">
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
      <div className="d-flex align-items-center justify-content-space-between mb-16">
        <div className="d-flex align-items-center">
          $375.00 x 3 nights
          <TooltipIcon phrase="some text" iconClass="icon-info-f" />
        </div>
        <span>$1,125.00</span>
      </div>
      <div className="d-flex align-items-center justify-content-space-between">
        <a className="main-link" href="#">Owner fees and processing</a>
        <span>$537.30</span>
      </div>
      <Divider className="mt-16 mb-16" />
      <div className="d-flex align-items-center justify-content-space-between mb-16 text-title">
        <p>Est. Total</p>
        <p>$1,662.30</p>
      </div>
      <MainBtnGradient size="large" className="w-100" text="Instant book" />
    </div>
  </div>
);

export default StickyInfoCard;
