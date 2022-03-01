import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as R from 'ramda';
import yup from 'lib/yupLocalised';

import { MAX_COST_PER_NIGHT, MIN_COST_PER_NIGHT } from 'constants/camperPricing';
import { selectedSlotsSelector } from 'state/concepts/calendar/selectors';
import { camperPricingSelector } from 'state/concepts/camper/selectors';
import { updateDefaultNightRate } from 'state/concepts/camper/actions';
import { handleSubmitWithProps } from 'utils/form/handleSubmit';
import { loadingSelector } from 'state/data/selectors';
import { updateDefaultNightRateEndpoint } from 'state/concepts/camper/endpoints';
import withPopovers from 'utils/calendar/withPopovers';

import DefaultNightRateComponent from './component';

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

class DefaultNightRate extends React.Component {
  static propTypes = {
    selectedSlots: PropTypes.shape().isRequired,
    setFieldValue: PropTypes.func.isRequired,
    values: PropTypes.shape().isRequired,
    setFormikState: PropTypes.func.isRequired,
    setValues: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    checkOpenedState: PropTypes.func.isRequired,
    closeAllPopovers: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isLoading: false,
    isSubmitting: false,
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

  render() {
    return (
      <DefaultNightRateComponent
        {...this.props}
        isRange={this.isRange}
        toggleCustomPrice={this.toggleCustomPrice}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectedSlots: selectedSlotsSelector(state),
  pricingInfo: camperPricingSelector(state, ownProps?.camperId),
  isLoading: loadingSelector(state, updateDefaultNightRateEndpoint.endpoint),
});

const mapDispatchToProps = {
  onSubmit: updateDefaultNightRate,
};

export { DefaultNightRate as DefaultNightRateContainer };
export default R.compose(
  withPopovers,
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ pricingInfo }) => ({
      isOpened: false,
      costPerNight: pricingInfo.costPerNight,
      isCustomCost: pricingInfo.costomizialeNightCost,
      weeklyPrice: pricingInfo.weekNightPrice,
    }),
    validationSchema: yup.object().shape({
      costPerNight: yup.number().when('isCustomCost', {
        is: false,
        then: yupNumberRange(
          'Cost per night',
          MIN_COST_PER_NIGHT,
          MAX_COST_PER_NIGHT,
        ),
      }),
      weeklyPrice: yup.object().when('isCustomCost', {
        is: true,
        then: yup.object().shape({
          monday_price: yupNumberRange(
            'Monday cost',
            MIN_COST_PER_NIGHT,
            MAX_COST_PER_NIGHT,
          ),
          tuesday_price: yupNumberRange(
            'Tuesday cost',
            MIN_COST_PER_NIGHT,
            MAX_COST_PER_NIGHT,
          ),
          wednesday_price: yupNumberRange(
            'Wednesday cost',
            MIN_COST_PER_NIGHT,
            MAX_COST_PER_NIGHT,
          ),
          thursday_price: yupNumberRange(
            'Thursday cost',
            MIN_COST_PER_NIGHT,
            MAX_COST_PER_NIGHT,
          ),
          friday_price: yupNumberRange(
            'Friday cost',
            MIN_COST_PER_NIGHT,
            MAX_COST_PER_NIGHT,
          ),
          saturday_price: yupNumberRange(
            'Saturday cost',
            MIN_COST_PER_NIGHT,
            MAX_COST_PER_NIGHT,
          ),
          sunday_price: yupNumberRange(
            'Sunday cost',
            MIN_COST_PER_NIGHT,
            MAX_COST_PER_NIGHT,
          ),
        }),
      }),
    }),
    handleSubmit: handleSubmitWithProps(['camperId']),
  }),
)(DefaultNightRate);
