import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as R from 'ramda';
import { connect } from 'react-redux';

import yup from 'lib/yupLocalised';
import { camperPricingSelector } from 'state/concepts/camper/selectors';
import { selectedSlotsSelector } from 'state/concepts/calendar/selectors';
import {
  WEEKLY_DISCOUNT_BOUNDARIES,
  MONTHLY_DISCOUNT_BOUNDARIES,
} from 'constants/camperPricing';
import { handleSubmitWithProps } from 'utils/form/handleSubmit';
import { loadingSelector } from 'state/data/selectors';
import { updateBaseDiscountsEndpoint } from 'state/concepts/camper/endpoints';
import { updateBaseDiscounts } from 'state/concepts/camper/actions';
import withPopovers from 'utils/calendar/withPopovers';

import BaseDiscountComponent from './component';

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

class BaseDiscount extends React.Component {
  static propTypes = {
    values: PropTypes.shape().isRequired,
    setFieldValue: PropTypes.func.isRequired,
    selectedSlots: PropTypes.shape().isRequired,
    setFormikState: PropTypes.func.isRequired,
    pricingInfo: PropTypes.shape().isRequired,
    dirty: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    errors: PropTypes.shape().isRequired,
    touched: PropTypes.shape().isRequired,
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

  get weekCost() {
    const {
      values: { costPerNight, costomizialeNightCost, weekNightPrice },
    } = this.props;

    return costomizialeNightCost
      ? R.sum(Object.values(weekNightPrice))
      : costPerNight * 7;
  }

  get weeklyDiscountPercentPrice() {
    const {
      values: { weeklyDiscountPercent },
    } = this.props;

    return Math.round((this.weekCost / 100) * weeklyDiscountPercent);
  }

  get monthlyDiscountPercentPrice() {
    const {
      values: { monthlyDiscountPercent },
    } = this.props;

    const monthCost = this.weekCost * 4;

    return Math.round((monthCost / 100) * monthlyDiscountPercent);
  }

  onWeeklyDiscountChange = (isChecked) => {
    const {
      errors, touched, values, setFormikState, pricingInfo, closeAllPopovers,
    } = this.props;

    const formikState = {
      errors: R.omit(['weeklyDiscountPercent'], errors),
      touched: R.omit(['weeklyDiscountPercent'], touched),
      values: {
        ...values,
        weeklyDiscount: isChecked,
        weeklyDiscountPercent: values.weeklyDiscountPercent,
      },
    };

    if (!isChecked) {
      formikState.values.weeklyDiscountPercent = pricingInfo.weeklyDiscountPercent;
    }

    setFormikState(formikState);

    closeAllPopovers();

    return formikState;
  };

  onMonthlyDiscountChange = (isChecked) => {
    const {
      errors, touched, values, setFormikState, pricingInfo, closeAllPopovers,
    } = this.props;

    const formikState = {
      errors: R.omit(['monthlyDiscountPercent'], errors),
      touched: R.omit(['monthlyDiscountPercent'], touched),
      values: {
        ...values,
        monthlyDiscount: isChecked,
        monthlyDiscountPercent: values.monthlyDiscountPercent,
      },
    };

    if (!isChecked) {
      formikState.values.monthlyDiscountPercent = pricingInfo.monthlyDiscountPercent;
    }

    setFormikState(formikState);

    closeAllPopovers();

    return formikState;
  };

  render() {
    return (
      <BaseDiscountComponent
        {...this.props}
        weeklyDiscountPercentPrice={this.weeklyDiscountPercentPrice}
        monthlyDiscountPercentPrice={this.monthlyDiscountPercentPrice}
        onWeeklyDiscountChange={this.onWeeklyDiscountChange}
        onMonthlyDiscountChange={this.onMonthlyDiscountChange}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  pricingInfo: camperPricingSelector(state, ownProps?.camperId),
  selectedSlots: selectedSlotsSelector(state),
  isLoading: loadingSelector(state, updateBaseDiscountsEndpoint.endpoint),
});

const mapDispatchToProps = {
  onSubmit: updateBaseDiscounts,
};

export { BaseDiscount as BaseDiscountContainer };
export default R.compose(
  withPopovers,
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ pricingInfo }) => ({
      costPerNight: pricingInfo.costPerNight,
      costomizialeNightCost: pricingInfo.costomizialeNightCost,
      weekNightPrice: pricingInfo.weekNightPrice,
      weeklyDiscount: pricingInfo.weeklyDiscount,
      weeklyDiscountPercent: pricingInfo.weeklyDiscountPercent,
      monthlyDiscount: pricingInfo.monthlyDiscount,
      monthlyDiscountPercent: pricingInfo.monthlyDiscountPercent,
    }),
    validationSchema: yup.object().shape({
      weeklyDiscountPercent: yup.number().when('weeklyDiscount', {
        is: true,
        then: yupNumberRange(
          'Offer weekly discount',
          WEEKLY_DISCOUNT_BOUNDARIES.MIN,
          WEEKLY_DISCOUNT_BOUNDARIES.MAX,
        ),
      }),
      monthlyDiscountPercent: yup.number().when('monthlyDiscount', {
        is: true,
        then: yupNumberRange(
          'Offer monthly discount',
          MONTHLY_DISCOUNT_BOUNDARIES.MIN,
          MONTHLY_DISCOUNT_BOUNDARIES.MAX,
        ),
      }),
    }),
    handleSubmit: handleSubmitWithProps(['camperId']),
  }),
)(BaseDiscount);
