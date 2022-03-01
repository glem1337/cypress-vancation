import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as R from 'ramda';
import { connect } from 'react-redux';

import yup from 'lib/yupLocalised';
import {
  WEEKLY_DISCOUNT_BOUNDARIES,
  MONTHLY_DISCOUNT_BOUNDARIES,
} from 'constants/camperPricing';
import { camperPricingSelector } from 'state/concepts/camper/selectors';
import { createCustomDiscountPeriod } from 'state/concepts/camper/actions';
import { selectedSlotsSelector, customBaseDiscountsForSingleDate } from 'state/concepts/calendar/selectors';
import { handleSubmitWithProps } from 'utils/form/handleSubmit';
import { loadingSelector } from 'state/data/selectors';
import { createCustomDiscountPeriodEndpoint } from 'state/concepts/camper/endpoints';
import withPopovers from 'utils/calendar/withPopovers';
import isRange from 'utils/calendar/isRange';

import BaseDiscountSingleComponent from './component';

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

class BaseDiscountSingle extends React.Component {
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

  isRange = isRange.bind(this)

  render() {
    return (
      <BaseDiscountSingleComponent
        {...this.props}
        isRange={this.isRange()}
        weeklyDiscountPercentPrice={this.weeklyDiscountPercentPrice}
        monthlyDiscountPercentPrice={this.monthlyDiscountPercentPrice}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  pricingInfo: camperPricingSelector(state, ownProps?.camperId),
  selectedSlots: selectedSlotsSelector(state),
  isLoading: loadingSelector(state, createCustomDiscountPeriodEndpoint.endpoint),
  customBaseDiscounts: customBaseDiscountsForSingleDate(state),
});

const mapDispatchToProps = {
  onSubmit: createCustomDiscountPeriod,
};

export { BaseDiscountSingle as BaseDiscountSingleContainer };
export default R.compose(
  withPopovers,
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ pricingInfo, customBaseDiscounts }) => ({
      costPerNight: pricingInfo.costPerNight,
      costomizialeNightCost: pricingInfo.costomizialeNightCost,
      weekNightPrice: pricingInfo.weekNightPrice,
      weeklyDiscount: pricingInfo.weeklyDiscount,
      weeklyDiscountPercent: customBaseDiscounts.weeklyDiscountPercent
        || pricingInfo.weeklyDiscountPercent,
      monthlyDiscount: pricingInfo.monthlyDiscount,
      monthlyDiscountPercent: customBaseDiscounts.monthlyDiscountPercent
        || pricingInfo.monthlyDiscountPercent,
    }),
    validationSchema: yup.object().shape({
      weeklyDiscountPercent: yupNumberRange(
        'Offer weekly discount',
        WEEKLY_DISCOUNT_BOUNDARIES.MIN,
        WEEKLY_DISCOUNT_BOUNDARIES.MAX,
      ),
      monthlyDiscountPercent: yupNumberRange(
        'Offer monthly discount',
        MONTHLY_DISCOUNT_BOUNDARIES.MIN,
        MONTHLY_DISCOUNT_BOUNDARIES.MAX,
      ),
    }),
    handleSubmit: handleSubmitWithProps(['camperId', 'selectedSlots']),
  }),
)(BaseDiscountSingle);
