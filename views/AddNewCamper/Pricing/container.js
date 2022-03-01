import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { compose, sum } from 'ramda';
import { withRouter } from 'next/router';
import { withFormik } from 'formik';
import yup from 'lib/yupLocalised';

import { CAMPER_INCLUSION } from 'constants/camper';
import { createRouteFromPathname } from 'utils/createRouteHelper';
import { handleSubmitWithProps } from 'utils/form/handleSubmit';

import ROUTES from 'constants/routes';
import {
  MAX_COST_PER_NIGHT,
  MIN_COST_PER_NIGHT,
} from 'constants/camperPricing';
import {
  createCamperPricing,
  checkPreviousStepCompleteness,
  fetchCamper,
  setLeavePageMethod as setLeavePageMethodAction,
} from 'state/concepts/camper/actions';
import { loadingSelector } from 'state/data/selectors';
import { createCamperPricingEndpoint } from 'state/concepts/camper/endpoints';
import {
  camperPricingSelector,
  isCamperExistSelector,
  camperCompletenessSelector,
} from 'state/concepts/camper/selectors';
import {
  showModal as showModalAction,
  hideModal as hideModalAction,
} from 'state/modal/actions';
import attachLayout from 'views/layouts/attachLayout';
import AddNewCamperLayout from 'views/layouts/AddNewCamper';
import { leavePage, leavePagePrepare } from 'utils/camper/leavePageHelper';
import { dataDeleteEntity } from 'state/data/actions';

import PricingComponent from './component';

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

class Pricing extends React.Component {
  static propTypes = {
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    camperId: PropTypes.string.isRequired,
    setFormikState: PropTypes.func.isRequired,
    values: PropTypes.shape({
      costPerNight: PropTypes.number.isRequired,
      weeklyDiscountPercent: PropTypes.number.isRequired,
      monthlyDiscountPercent: PropTypes.number.isRequired,
      costomizialeNightCost: PropTypes.bool.isRequired,
      weekNightPrice: PropTypes.shape({}).isRequired,
    }).isRequired,
    errors: PropTypes.shape().isRequired,
    touched: PropTypes.shape().isRequired,
    pricingInfo: PropTypes.shape({
      weekNightPrice: PropTypes.shape({}).isRequired,
      weeklyDiscountPercent: PropTypes.number.isRequired,
      monthlyDiscountPercent: PropTypes.number.isRequired,
    }).isRequired,
    dirty: PropTypes.bool.isRequired,
    showModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    isValid: PropTypes.bool.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired,
    setLeavePageMethod: PropTypes.func.isRequired,
  };

  static getInitialProps = async (ctx) => {
    const camperId = ctx.query.camper_id;

    ctx.store.dispatch(dataDeleteEntity({
      kind: 'pricingInfo',
    }));

    const inclusions = [
      CAMPER_INCLUSION.PRICING_INFO.WEEK_NIGHT_PRICE,
      CAMPER_INCLUSION.PRICING_INFO.INDEX,
    ];

    ctx.store.dispatch(fetchCamper(camperId, inclusions.join(',')));

    await ctx.store.logicMiddleware.whenComplete();

    ctx.store.dispatch(checkPreviousStepCompleteness({
      key: ROUTES.ADD_NEW_CAMPER.PRICING.KEY,
      camperId,
      ctx,
    }));

    return { camperId };
  };

  constructor(props) {
    super(props);

    props.setLeavePageMethod(this.leavePagePrepare);
  }

  onCustomizableNightCostChange = (isChecked) => {
    const {
      values,
      errors,
      touched,
      setFormikState,
      pricingInfo,
    } = this.props;

    const formikState = {
      errors,
      touched,
      values: {
        ...values,
        costomizialeNightCost: isChecked,
        weekNightPrice: {
          ...values.weekNightPrice,
        },
      },
    };

    if (isChecked) {
      delete formikState.touched.costPerNight;
      delete formikState.errors.costPerNight;
    } else {
      formikState.values.weekNightPrice = pricingInfo.weekNightPrice;

      delete formikState.touched.weekNightPrice;
      delete formikState.errors.weekNightPrice;
    }

    setFormikState(formikState);

    return formikState;
  };

  onWeeklyDiscountChange = (isChecked) => {
    const {
      values,
      errors,
      touched,
      setFormikState,
      pricingInfo,
    } = this.props;

    const formikState = {
      errors,
      touched,
      values: {
        ...values,
        weeklyDiscount: isChecked,
        weeklyDiscountPercent: values.weeklyDiscountPercent,
      },
    };

    if (!isChecked) {
      formikState.values.weeklyDiscountPercent = pricingInfo.weeklyDiscountPercent;

      delete formikState.touched.weeklyDiscountPercent;
      delete formikState.errors.weeklyDiscountPercent;
    }

    setFormikState(formikState);

    return formikState;
  };

  onMonthlyDiscountChange = (isChecked) => {
    const {
      values,
      errors,
      touched,
      setFormikState,
      pricingInfo,
    } = this.props;

    const formikState = {
      errors,
      touched,
      values: {
        ...values,
        monthlyDiscount: isChecked,
        monthlyDiscountPercent: values.monthlyDiscountPercent,
      },
    };

    if (!isChecked) {
      formikState.values.monthlyDiscountPercent = pricingInfo.monthlyDiscountPercent;

      delete formikState.touched.monthlyDiscountPercent;
      delete formikState.errors.monthlyDiscountPercent;
    }

    setFormikState(formikState);

    return formikState;
  };

  get weekCost() {
    const {
      values: { costPerNight, costomizialeNightCost, weekNightPrice },
    } = this.props;

    return costomizialeNightCost
      ? sum(Object.values(weekNightPrice))
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

  goBack = () => {
    const {
      router,
      camperId,
      hideModal,
    } = this.props;

    const route = createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.DELIVERY.PATH, camperId);

    router.push(route);

    hideModal();
  }

  saveAndGoBack = async () => {
    const {
      camperId,
      setFieldValue,
      handleSubmit,
      hideModal,
    } = this.props;

    const route = createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.DELIVERY.PATH, camperId);

    await setFieldValue('redirectRoute', route);

    hideModal();

    handleSubmit();
  }

  onBackButtonClick = async () => {
    await this.props.validateForm();

    const {
      dirty,
      showModal,
      isValid,
    } = this.props;

    if (dirty && isValid) {
      showModal({
        modalType: 'LEAVE_PAGE_MODAL',
        modalProps: {
          discard: this.goBack,
          save: this.saveAndGoBack,
        },
      });

      return;
    }

    this.goBack();
  };

  leavePage = leavePage.bind(this);

  leavePagePrepare = leavePagePrepare.bind(this);

  render() {
    return (
      <PricingComponent
        {...this.props}
        onCustomizableNightCostChange={this.onCustomizableNightCostChange}
        onWeeklyDiscountChange={this.onWeeklyDiscountChange}
        onMonthlyDiscountChange={this.onMonthlyDiscountChange}
        weeklyDiscountPercentPrice={this.weeklyDiscountPercentPrice}
        monthlyDiscountPercentPrice={this.monthlyDiscountPercentPrice}
        onBackButtonClick={this.onBackButtonClick}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
  camperCompleteness: camperCompletenessSelector(state, ownProps?.camperId),
  isLoading: loadingSelector(state, createCamperPricingEndpoint.endpoint),
  pricingInfo: camperPricingSelector(state, ownProps?.camperId),
});

const mapDispatchToProps = {
  onSubmit: createCamperPricing,
  showModal: showModalAction,
  hideModal: hideModalAction,
  setLeavePageMethod: setLeavePageMethodAction,
};

export { Pricing as PricingContainer };
export default compose(
  attachLayout(AddNewCamperLayout),
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
      minimalNightStay: pricingInfo.minimalNightStay,
    }),
    validationSchema: yup.object().shape({
      costPerNight: yup.number().when('costomizialeNightCost', {
        is: false,
        then: yupNumberRange(
          'Cost per night',
          MIN_COST_PER_NIGHT,
          MAX_COST_PER_NIGHT,
        ),
      }),
      weekNightPrice: yup.object().when('costomizialeNightCost', {
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
      weeklyDiscountPercent: yup.number().when('weeklyDiscount', {
        is: true,
        then: yupNumberRange('Offer weekly discount', 1, 99),
      }),
      monthlyDiscountPercent: yup.number().when('monthlyDiscount', {
        is: true,
        then: yupNumberRange('Offer monthly discount', 1, 99),
      }),
    }),
    handleSubmit: handleSubmitWithProps(['camperId']),
  }),
  withRouter,
  injectIntl,
)(Pricing);
