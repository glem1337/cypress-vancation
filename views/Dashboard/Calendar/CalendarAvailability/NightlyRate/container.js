import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as R from 'ramda';
import yup from 'lib/yupLocalised';

import { MAX_COST_PER_NIGHT, MIN_COST_PER_NIGHT } from 'constants/camperPricing';
import { selectedSlotsSelector } from 'state/concepts/calendar/selectors';
import { camperPricingSelector } from 'state/concepts/camper/selectors';
import { handleSubmitWithProps } from 'utils/form/handleSubmit';
import { loadingSelector } from 'state/data/selectors';
import { createCustomNightRatePeriodEndpoint } from 'state/concepts/camper/endpoints';
import { createCustomNightRatePeriod } from 'state/concepts/camper/actions';
import withPopovers from 'utils/calendar/withPopovers';
import isRange from 'utils/calendar/isRange';

import NightlyRateComponent from './component';

const yupNumberRange = (pref, min, max) => yup
  .number()
  .required({
    id: 'validations.cantBeBlank',
    values: { pref },
  })
  .min(min, {
    id: 'validations.min',
    values: {
      pref,
      value: min,
    },
  })
  .max(max, {
    id: 'validations.max',
    values: {
      pref,
      value: max,
    },
  });

class NightlyRate extends React.Component {
  static propTypes = {
    selectedSlots: PropTypes.shape().isRequired,
    setFieldValue: PropTypes.func.isRequired,
    values: PropTypes.shape().isRequired,
    setFormikState: PropTypes.func.isRequired,
    setValues: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool,
    checkOpenedState: PropTypes.func.isRequired,
    closeAllPopovers: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isLoading: false,
  }

  componentDidUpdate(prevProps) {
    const { checkOpenedState } = this.props;

    checkOpenedState(prevProps, this.props);
  }

  toggleCustomPrice = (isChecked) => {
    const { values, setFormikState, closeAllPopovers } = this.props;

    const formikState = {
      errors: {},
      touched: {},
      values: {
        ...values,
        isCustomCost: isChecked,
        weeklyPrice: {
          ...values.weeklyPrice,
        },
      },
    };

    if (!isChecked) {
      formikState.values.weeklyPrice = {};
    }

    setFormikState(formikState);

    closeAllPopovers();

    return formikState;
  };

  isRange = isRange.bind(this)

  render() {
    return (
      <NightlyRateComponent
        {...this.props}
        isRange={this.isRange()}
        toggleCustomPrice={this.toggleCustomPrice}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectedSlots: selectedSlotsSelector(state),
  pricingInfo: camperPricingSelector(state, ownProps?.camperId),
  isLoading: loadingSelector(state, createCustomNightRatePeriodEndpoint.endpoint),
});

const mapDispatchToProps = {
  onSubmit: createCustomNightRatePeriod,
};

export { NightlyRate as NightlyRateContainer };
export default R.compose(
  withPopovers,
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    enableReinitialize: true,
    validateOnChange: true,
    mapPropsToValues: () => ({
      costPerNight: '',
    }),
    validationSchema: yup.object().shape({
      costPerNight: yupNumberRange(
        'Cost per night',
        MIN_COST_PER_NIGHT,
        MAX_COST_PER_NIGHT,
      ),
    }),
    handleSubmit: handleSubmitWithProps(['camperId', 'selectedSlots']),
  }),
)(NightlyRate);
