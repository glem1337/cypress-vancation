import React from 'react';
import { Divider, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import BtnGradient from 'views/shared/BtnGradient';
import TooltipIcon from 'views/shared/TooltipIcon';
import isMobileView from 'utils/breakpoints/isMobileView';
import SkeletonText from 'views/shared/SkeletonText';
import SkeletonTitle from 'views/shared/SkeletonTitle';
import useCamperPricesAndFees from 'utils/hooks/useCamperPricesAndFees';

import DepartureReturnWidget from '../../DepartureReturnWidget';

const CamperPricesModal = (props) => {
  const { isVisible, closeCard } = props;

  const {
    campervanMake,
    campervanModel,
    containerRef,
    isInstantBook,
    mainPhotoUrl,
    pricingData,
    viewFeesAndProcessing,
    isCamperPricingAndFeesFetching,
  } = useCamperPricesAndFees();

  return (
    <aside
      className={classNames(
        'van-details__trip-details',
        isVisible && 'van-details__trip-details--open',
      )}
      ref={containerRef}
    >
      <div className="van-details__trip-details-header">
        <div className="d-flex align-items-center justify-content-space-between">
          <div className="text-title"><FormattedMessage id="shared.yourTrip" /></div>
          <Button
            icon={<i className="icon icon-cross" />}
            type="secondary"
            shape="circle"
            size="large"
            onClick={closeCard}
          />
        </div>
      </div>
      <div className="van-details__trip-details-body">
        <div className="van-details__sticky-card">
          <div className="van-details__sticky-card-header">
            <div>
              <p className="text-title in-white mb-2">
                {campervanMake}
              </p>
              <p className="van-details__sticky-card-header-txt mb-2">
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
              showPairMonth={!isMobileView()}
              showClearButton
              popupClasses="departure-return__calendar-modal"
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
                        <TooltipIcon phrase="some text" iconClass="icon-info-f" />
                      </>
                    )}
                  </div>
                  {pricingData.bookingInfo?.total && <span>{pricingData.bookingInfo.total}</span>}
                </div>
                <div className="d-flex align-items-center justify-content-space-between">
                  {pricingData.feesProcessingPriceString && (
                    <>
                      <a
                        className="main-link"
                        onClick={viewFeesAndProcessing}
                        href=""
                      >
                        <FormattedMessage id="shared.ownerFeesAndProcessing" />
                      </a>
                      <span>{pricingData.feesProcessingPriceString}</span>
                    </>
                  )}
                </div>
                <Divider className="mt-16 mb-16" />
                <div className="d-flex align-items-center justify-content-space-between text-title">
                  {pricingData?.totalPrice && (
                    <>
                      <p>
                        <FormattedMessage id="shared.estTotal" />
                      </p>
                      <p>{`$${pricingData.totalPrice}`}</p>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="van-details__trip-details-footer">
        <BtnGradient
          size="large"
          className="w-100"
          text={(
            isInstantBook
              ? <FormattedMessage id="shared.instantBook" />
              : <FormattedMessage id="shared.requestBooking" />
            )}
        />
      </div>
    </aside>
  );
};

CamperPricesModal.propTypes = {
  isVisible: PropTypes.bool,
  closeCard: PropTypes.func,
};

CamperPricesModal.defaultProps = {
  isVisible: true,
  closeCard: undefined,
};

export default CamperPricesModal;
