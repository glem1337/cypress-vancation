import React from 'react';
import PropTypes from 'prop-types';

import DefaultNightRate from './DefaultNightRate';
import BaseDiscounts from './BaseDiscounts';
import DefaultMinNightStay from './DefaultMinNightStay';
import CalendarAvailability from './CalendarAvailability';
import PreparationTime from './PreparationTime';
import PickUpDropOffTime from './PickUpDropOffTime';

const CalendarSettingsComponent = ({ camperId }) => (
  <>
    <DefaultNightRate camperId={camperId} />
    <BaseDiscounts camperId={camperId} />
    <DefaultMinNightStay camperId={camperId} />
    <CalendarAvailability camperId={camperId} />
    <PreparationTime camperId={camperId} />
    <PickUpDropOffTime camperId={camperId} />
  </>
);

CalendarSettingsComponent.propTypes = {
  camperId: PropTypes.string.isRequired,
};

export default CalendarSettingsComponent;
