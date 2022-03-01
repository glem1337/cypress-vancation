import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as R from 'ramda';
import { connect } from 'react-redux';

import { CALENDAR_PREPARATION_TIME_DEFAULT_VALUE } from 'constants/calendar';
import { selectedSlotsSelector } from 'state/concepts/calendar/selectors';
import { handleSubmitWithProps } from 'utils/form/handleSubmit';
import withPopovers from 'utils/calendar/withPopovers';
import { updateCalendarPreparationTime } from 'state/concepts/camper/actions';
import { loadingSelector } from 'state/data/selectors';
import { updatePreparationTimeEndpoint } from 'state/concepts/camper/endpoints';
import { camperPricingSelector } from 'state/concepts/camper/selectors';

import PreparationTimeComponent from './component';

class PreparationTime extends React.Component {
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

  componentDidUpdate(prevProps) {
    const { checkOpenedState } = this.props;

    checkOpenedState(prevProps, this.props);
  }

  render() {
    return (
      <PreparationTimeComponent
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectedSlots: selectedSlotsSelector(state),
  pricingInfo: camperPricingSelector(state, ownProps?.camperId),
  isLoading: loadingSelector(state, updatePreparationTimeEndpoint.endpoint),
});

const mapDispatchToProps = {
  onSubmit: updateCalendarPreparationTime,
};

export { PreparationTime as PreparationTimeContainer };
export default R.compose(
  withPopovers,
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ pricingInfo }) => ({
      time: pricingInfo.preparationTime || CALENDAR_PREPARATION_TIME_DEFAULT_VALUE.value,
    }),
    handleSubmit: handleSubmitWithProps(['camperId']),
  }),
)(PreparationTime);
