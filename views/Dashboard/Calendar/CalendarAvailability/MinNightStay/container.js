import React from 'react';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as R from 'ramda';

import { PRICING_INFO_DEFAULT_VALUES } from 'constants/camperPricing';
import { selectedSlotsSelector, customMinNightStayForSingleDateSelector } from 'state/concepts/calendar/selectors';
import { camperPricingSelector } from 'state/concepts/camper/selectors';
import { handleSubmitWithProps } from 'utils/form/handleSubmit';
import { loadingSelector } from 'state/data/selectors';
import { createCustomMinNightStayPeriodEndpoint } from 'state/concepts/camper/endpoints';
import { createCustomMinNightStayPeriod } from 'state/concepts/camper/actions';
import withPopovers from 'utils/calendar/withPopovers';

import MinNightStayComponent from './component';

class MinNightStay extends React.Component {
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
      <MinNightStayComponent
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectedSlots: selectedSlotsSelector(state),
  pricingInfo: camperPricingSelector(state, ownProps?.camperId),
  isLoading: loadingSelector(state, createCustomMinNightStayPeriodEndpoint.endpoint),
  customMinNightStay: customMinNightStayForSingleDateSelector(state),
});

const mapDispatchToProps = {
  onSubmit: createCustomMinNightStayPeriod,
};

export { MinNightStay as MinNightStayContainer };
export default R.compose(
  withPopovers,
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ pricingInfo, customMinNightStay }) => ({
      isOpened: false,
      minimalNightStay: customMinNightStay
       || pricingInfo.minimalNightStay
       || PRICING_INFO_DEFAULT_VALUES.minimalNightStay,
    }),
    handleSubmit: handleSubmitWithProps(['camperId', 'selectedSlots']),
  }),
)(MinNightStay);
