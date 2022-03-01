import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as R from 'ramda';
import { connect } from 'react-redux';
import moment from 'moment';

import { selectedSlotsSelector } from 'state/concepts/calendar/selectors';
import { handleSubmitWithProps } from 'utils/form/handleSubmit';
import withPopovers from 'utils/calendar/withPopovers';
import { updatePickupDropOffTime } from 'state/concepts/camper/actions';
import { loadingSelector } from 'state/data/selectors';
import { updatePickupDropOffEndpoint } from 'state/concepts/camper/endpoints';
import { camperPricingSelector } from 'state/concepts/camper/selectors';
import {
  PICK_UP_TIME_FORMAT,
  DROP_OFF_TIME_FORMAT,
  CALENDAR_PICKUP_TIME_DEFAULT_OPTION,
  CALENDAR_DROP_OFF_DEFAULT_OPTION,
} from 'utils/calendar/createDayRange';

import PickUpTimeComponent from './component';

class PickUpTime extends React.Component {
  static propTypes = {
    values: PropTypes.shape().isRequired,
    setFieldValue: PropTypes.func.isRequired,
    selectedSlots: PropTypes.shape().isRequired,
    isLoading: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    checkOpenedState: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isLoading: false,
    isSubmitting: false,
  }

  static detectDeliveryTimeValues = (filedName, props) => {
    const deliveryDropOff = R.path(['pricingInfo', 'deliveryDropoff'], props);
    const deliveryPickup = R.path(['pricingInfo', 'deliveryPickup'], props);

    const values = {
      dropOffTime: deliveryDropOff
        ? moment.utc(deliveryDropOff).format(DROP_OFF_TIME_FORMAT)
        : CALENDAR_DROP_OFF_DEFAULT_OPTION.value,
      pickupTime: deliveryPickup
        ? moment.utc(deliveryPickup).format(PICK_UP_TIME_FORMAT)
        : CALENDAR_PICKUP_TIME_DEFAULT_OPTION.value,
    };

    return values[filedName];
  }

  componentDidUpdate(prevProps) {
    const { checkOpenedState } = this.props;

    checkOpenedState(prevProps, this.props);
  }

  render() {
    return (
      <PickUpTimeComponent
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectedSlots: selectedSlotsSelector(state),
  pricingInfo: camperPricingSelector(state, ownProps?.camperId),
  isLoading: loadingSelector(state, updatePickupDropOffEndpoint.endpoint),
});

const mapDispatchToProps = {
  onSubmit: updatePickupDropOffTime,
};

export { PickUpTime as PickUpTimeContainer };
export default R.compose(
  withPopovers,
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => ({
      pickupTime: PickUpTime.detectDeliveryTimeValues('pickupTime', props),
      dropOffTime: PickUpTime.detectDeliveryTimeValues('dropOffTime', props),
    }),
    handleSubmit: handleSubmitWithProps(['camperId']),
  }),
)(PickUpTime);
