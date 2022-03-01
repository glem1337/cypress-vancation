import React from 'react';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as R from 'ramda';

import { PRICING_INFO_DEFAULT_VALUES } from 'constants/camperPricing';
import { selectedSlotsSelector } from 'state/concepts/calendar/selectors';
import { updateMinNightStay } from 'state/concepts/camper/actions';
import { handleSubmitWithProps } from 'utils/form/handleSubmit';
import { loadingSelector } from 'state/data/selectors';
import { updateMinNightStayEndpoint } from 'state/concepts/camper/endpoints';
import { camperPricingSelector } from 'state/concepts/camper/selectors';
import withPopovers from 'utils/calendar/withPopovers';

import DefaultMinNightStayComponent from './component';

class DefaultMinNightStay extends React.Component {
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
      <DefaultMinNightStayComponent
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  pricingInfo: camperPricingSelector(state, ownProps?.camperId),
  selectedSlots: selectedSlotsSelector(state),
  isLoading: loadingSelector(state, updateMinNightStayEndpoint.endpoint),
});

const mapDispatchToProps = {
  onSubmit: updateMinNightStay,
};

export { DefaultMinNightStay as DefaultMinNightStayContainer };
export default R.compose(
  withPopovers,
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ pricingInfo }) => ({
      minimalNightStay: pricingInfo?.minimalNightStay
      || PRICING_INFO_DEFAULT_VALUES.minimalNightStay,
    }),
    handleSubmit: handleSubmitWithProps(['camperId']),
  }),

)(DefaultMinNightStay);
