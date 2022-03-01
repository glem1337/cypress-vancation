import React from 'react';
import { Button, Popover } from 'antd';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { AVAILABILITY_MODE } from 'constants/calendar';
import blockDatesPopoverContent from 'utils/calendar/blockDatesPopoverContent';
import unBlockDatesPopoverContent from 'utils/calendar/unBlockDatesPopoverContent';

import MinNightStay from './MinNightStay';
import BaseDiscounts from './BaseDiscounts';
import BaseDiscountsSingle from './BaseDiscountsSingle';
import NightlyRate from './NightlyRate';
import NightlyRateSingle from './NightlyRateSingle';

const CalendarAvailabilityComponent = ({
  availabilityMode,
  camperId,
  isBlockedPopoverVisible,
  isUnBlockedPopoverVisible,
  blockReject,
  blockConfirm,
  blockPrepare,
  isBlockedLoading,
  isUnBlockedLoading,
  unBlockReject,
  unBlockConfirm,
  unBlockPrepare,
}) => (
  <>
    <div className="btns-group mb-8">
      <Popover
        visible={isUnBlockedPopoverVisible}
        content={unBlockDatesPopoverContent({
          unBlockReject,
          unBlockConfirm,
        })}
        trigger="click"
        placement="bottom"
      >
        <Button
          className={classNames('dashboard-calendar__availability-button', {
            'btns-group-active': availabilityMode === AVAILABILITY_MODE.AVAILABLE,
          })}
          size="small"
          onClick={unBlockPrepare}
          loading={isUnBlockedLoading}
        >
          <FormattedMessage id="shared.available" />
        </Button>
      </Popover>
      <Popover
        visible={isBlockedPopoverVisible}
        content={blockDatesPopoverContent({
          blockReject,
          blockConfirm,
        })}
        trigger="click"
        placement="bottom"
      >
        <Button
          className={classNames('dashboard-calendar__availability-button', {
            'btns-group-active': availabilityMode === AVAILABILITY_MODE.BLOCKED,
          })}
          size="small"
          onClick={blockPrepare}
          loading={isBlockedLoading}
        >
          <FormattedMessage id="shared.blocked" />
        </Button>
      </Popover>
    </div>
    {(
      availabilityMode === AVAILABILITY_MODE.AVAILABLE
      || availabilityMode === AVAILABILITY_MODE.BLOCKED
    ) && (
      <>
        <NightlyRate camperId={camperId} />
        <NightlyRateSingle camperId={camperId} />
        <BaseDiscounts camperId={camperId} />
        <BaseDiscountsSingle camperId={camperId} />
        <MinNightStay camperId={camperId} />
      </>
    )}
  </>
);

CalendarAvailabilityComponent.propTypes = {
  availabilityMode: PropTypes.string.isRequired,
  camperId: PropTypes.string.isRequired,
  isBlockedPopoverVisible: PropTypes.bool.isRequired,
  isUnBlockedPopoverVisible: PropTypes.bool.isRequired,
  blockReject: PropTypes.func.isRequired,
  blockConfirm: PropTypes.func.isRequired,
  blockPrepare: PropTypes.func.isRequired,
  unBlockReject: PropTypes.func.isRequired,
  unBlockConfirm: PropTypes.func.isRequired,
  unBlockPrepare: PropTypes.func.isRequired,
  isBlockedLoading: PropTypes.bool.isRequired,
  isUnBlockedLoading: PropTypes.bool.isRequired,
};

export default CalendarAvailabilityComponent;
