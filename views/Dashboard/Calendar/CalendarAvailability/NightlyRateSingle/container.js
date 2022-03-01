import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as R from 'ramda';
import yup from 'lib/yupLocalised';
import moment from 'moment';

import { MAX_COST_PER_NIGHT, MIN_COST_PER_NIGHT } from 'constants/camperPricing';
import { camperPricingSelector } from 'state/concepts/camper/selectors';
import { selectedSlotsSelector, customNightRateForSingleDate } from 'state/concepts/calendar/selectors';
import { handleSubmitWithProps } from 'utils/form/handleSubmit';
import { loadingSelector } from 'state/data/selectors';
import { createCustomNightRatePeriodEndpoint } from 'state/concepts/camper/endpoints';
import { createCustomNightRatePeriod } from 'state/concepts/camper/actions';
import withPopovers from 'utils/calendar/withPopovers';
import isRange from 'utils/calendar/isRange';

import NightlyRateSingleComponent from './component';

class NightlyRateSingle extends React.Component {
  static propTypes = {
    selectedSlots: PropTypes.shape().isRequired,
    setFieldValue: PropTypes.func.isRequired,
    values: PropTypes.shape().isRequired,
    setFormikState: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    checkOpenedState: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isLoading: false,
    isSubmitting: false,
  }

  static detectNightlyRate = ({ pricingInfo, customNightRate, selectedSlots }) => {
    // Custom price.
    if (customNightRate) {
      return customNightRate;
    }

    // Cost per night.
    if (pricingInfo?.costomizialeNightCost === false) {
      const price = pricingInfo?.costPerNight;

      return price;
    }

    // Customized cost.
    const date = R.head(selectedSlots?.slots);
    const weekDay = moment(date).format('dddd').toLowerCase();
    const weekDateString = `${weekDay}_price`;

    const weekDayPrice = R.path(['weekNightPrice', weekDateString], pricingInfo);

    return weekDayPrice || '';
  }

  componentDidUpdate(prevProps) {
    const { checkOpenedState } = this.props;

    checkOpenedState(prevProps, this.props);
  }

  isRange = isRange.bind(this)

  render() {
    return (
      <NightlyRateSingleComponent
        {...this.props}
        isRange={this.isRange()}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectedSlots: selectedSlotsSelector(state),
  isLoading: loadingSelector(state, createCustomNightRatePeriodEndpoint.endpoint),
  pricingInfo: camperPricingSelector(state, ownProps?.camperId),
  customNightRate: customNightRateForSingleDate(state),
});

const mapDispatchToProps = {
  onSubmit: createCustomNightRatePeriod,
};

export { NightlyRateSingle as NightlyRateSingleContainer };
export default R.compose(
  withPopovers,
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => ({
      costPerNight: NightlyRateSingle.detectNightlyRate(props),
    }),
    validationSchema: yup.object().shape({
      costPerNight: yup
        .number()
        .required({
          id: 'validations.cantBeBlank',
          values: { pref: 'Cost per night' },
        })
        .min(MIN_COST_PER_NIGHT, {
          id: 'validations.min',
          values: {
            pref: 'Cost per night',
            value: MIN_COST_PER_NIGHT,
          },
        })
        .max(MAX_COST_PER_NIGHT, {
          id: 'validations.max',
          values: {
            pref: 'Cost per night',
            value: MAX_COST_PER_NIGHT,
          },
        }),
    }),
    handleSubmit: handleSubmitWithProps(['camperId', 'selectedSlots']),
  }),
)(NightlyRateSingle);
