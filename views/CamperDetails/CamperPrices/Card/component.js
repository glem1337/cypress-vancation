import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tooltip, Divider } from 'antd';
import { T as ramdaTrue } from 'ramda';
import { FormattedMessage } from 'react-intl';

import BtnGradient from 'views/shared/BtnGradient';
import SkeletonText from 'views/shared/SkeletonText';
import SkeletonTitle from 'views/shared/SkeletonTitle';
import useCamperPricesAndFees from 'utils/hooks/useCamperPricesAndFees';

import DepartureReturnWidget from '../../DepartureReturnWidget';

const CamperPricesCard = ({ isVisible }) => {
  const {
    campervanMake,
    campervanModel,
    mainPhotoUrl,
    isInstantBook,
    pricingData,
    viewFeesAndProcessing,
    isCamperPricingAndFeesFetching,
    tooltipData,
  } = useCamperPricesAndFees();

  return (
    <div
      className={classNames(
        'van-details__sticky-card',
        !isVisible && 'van-details__sticky-card--hidden',
      )}
    >
      <div className="van-details__sticky-card-header">
        <div>
          <p className="text-title in-white">
            {campervanMake}
          </p>
          <p className="van-details__sticky-card-header-txt mb-4">
            {campervanModel}
          </p>
          <div className="d-flex align-items-center">
            {isInstantBook && (
              <i className="icon icon-flash-f mr-8 in-yellow-1000" />
            )}
            {pricingData.costPerNight && (
              <p className="text-title in-white">
                {`$${pricingData.costPerNight}`}
                <span className="van-details__sticky-card-header-txt font-12 font-400">
                  {pricingData.nightString}
                </span>
              </p>
            )}
          </div>
        </div>
        <div className="van-details__sticky-card-header-img">
          <img src={mainPhotoUrl} alt="" />
        </div>
      </div>
      <div className="van-details__sticky-card-body">
        <DepartureReturnWidget
          wrapperClasses="mb-16"
          popupClasses="departure-return__calendar-widget"
        />
        {isCamperPricingAndFeesFetching && (
          <>
            <SkeletonText rows={2} />
            <Divider className="mt-16 mb-16" />
            <SkeletonTitle className="h-20" />
            <SkeletonTitle className="mb-0" />
          </>
        )}
        {!isCamperPricingAndFeesFetching && (
          <>
            <div className="d-flex align-items-center justify-content-space-between mb-16">
              <div className="d-flex align-items-center">
                {pricingData.bookingInfo?.string && (
                <>
                  {pricingData.bookingInfo.string}
                  <Tooltip
                    overlayClassName="main-tooltip"
                    placement="top"
                    trigger={['hover', 'click']}
                    title={tooltipData}
                  >
                    <i className="icon main-tooltip-icon icon-info-f" />
                  </Tooltip>
                </>
            )}
              </div>
              {pricingData.bookingInfo?.total && <span>{pricingData.bookingInfo.total}</span>}
            </div>
              {pricingData.feesProcessingPriceString && (
                <div className="d-flex align-items-center justify-content-space-between">
                  <a
                    className="main-link"
                    onClick={viewFeesAndProcessing}
                    href=""
                  >
                    <FormattedMessage id="shared.ownerFeesAndProcessing" />
                  </a>
                  <span>{pricingData.feesProcessingPriceString}</span>
                </div>
              )}
            {pricingData?.totalPrice && (
              <>
                <Divider className="mt-16 mb-16" />
                <div className="d-flex align-items-center justify-content-space-between mb-16 text-title">
                  <p>
                    <FormattedMessage id="shared.estTotal" />
                  </p>
                  <p>{`$${pricingData.totalPrice}`}</p>
                </div>
              </>
            )}
            <BtnGradient
              size="large"
              className="w-100"
              text={(
                isInstantBook
                  ? <FormattedMessage id="shared.instantBook" />
                  : <FormattedMessage id="shared.requestBooking" />
              )}
            />
          </>
        )}
      </div>
    </div>
  );
};

CamperPricesCard.propTypes = {
  isVisible: PropTypes.bool,
};

CamperPricesCard.defaultProps = {
  isVisible: true,
};

export default memo(CamperPricesCard, ramdaTrue);
