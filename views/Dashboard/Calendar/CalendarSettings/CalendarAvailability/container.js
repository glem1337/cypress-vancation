import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as R from 'ramda';
import { connect } from 'react-redux';

import { camperPricingSelector } from 'state/concepts/camper/selectors';
import { CALENDAR_AVAILABILITY_DEFAULT_VALUE } from 'constants/calendar';
import { selectedSlotsSelector } from 'state/concepts/calendar/selectors';
import { handleSubmitWithProps } from 'utils/form/handleSubmit';
import { updateCalendarAvailability } from 'state/concepts/camper/actions';
import { loadingSelector } from 'state/data/selectors';
import { updateCalendarAvailabilityEndpoint } from 'state/concepts/camper/endpoints';
import withPopovers from 'utils/calendar/withPopovers';

import CalendarAvailabilityComponent from './component';

class CalendarAvailability extends React.Component {
  static propTypes = {
    values: PropTypes.shape().isRequired,
    setFieldValue: PropTypes.func.isRequired,
    selectedSlots: PropTypes.shape().isRequired,
    isLoading: PropTypes.bool,
    checkOpenedState: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    isLoading: false,
    isSubmitting: false,
  }

  componentDidUpdate(prevProps) {
    const { checkOpenedState } = this.props;

    checkOpenedState(prevProps, this.props);
  }

  render() {
    return (
      <CalendarAvailabilityComponent
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectedSlots: selectedSlotsSelector(state),
  pricingInfo: camperPricingSelector(state, ownProps?.camperId),
  isLoading: loadingSelector(state, updateCalendarAvailabilityEndpoint.endpoint),
});

const mapDispatchToProps = {
  onSubmit: updateCalendarAvailability,
};

export { CalendarAvailability as CalendarAvailabilityContainer };
export default R.compose(
  withPopovers,
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ pricingInfo }) => ({
      countMonth: pricingInfo?.calendarAvailability || CALENDAR_AVAILABILITY_DEFAULT_VALUE.value,
    }),
    handleSubmit: handleSubmitWithProps(['camperId']),
  }),
)(CalendarAvailability);
