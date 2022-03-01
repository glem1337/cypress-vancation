import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import CalendarAvailability from '../CalendarAvailability';
import CalendarSettings from '../CalendarSettings';

const RightSidebar = ({
  isAvailabilityVisible,
  isSettingsVisible,
  selectedDatesString,
  closeRightSidebar,
  camperId,
}) => (
  <>
    <div className="calendar-listing__side">
      <div className="calendar-listing__side-head">
        <div className="text-title">
          {isAvailabilityVisible && selectedDatesString}
          {isSettingsVisible && <FormattedMessage id="shared.defaultSettings" />}
        </div>
        <Button
          className="align-self-start ml-16"
          type="secondary"
          icon={<i className="icon icon-cross" />}
          shape="circle"
          size="large"
          onClick={closeRightSidebar}
        />
      </div>
      <div className="calendar-listing__side-main">
        {isAvailabilityVisible && <CalendarAvailability camperId={camperId} />}
        {isSettingsVisible && <CalendarSettings camperId={camperId} />}
      </div>
    </div>
    <div
      className="calendar-listing__side-overlay"
      role="button"
    />
  </>
);

RightSidebar.propTypes = {
  isAvailabilityVisible: PropTypes.bool.isRequired,
  isSettingsVisible: PropTypes.bool.isRequired,
  selectedDatesString: PropTypes.string.isRequired,
  closeRightSidebar: PropTypes.func.isRequired,
  camperId: PropTypes.string,
};

RightSidebar.defaultProps = {
  camperId: null,
};

export default RightSidebar;
