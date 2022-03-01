import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { withFormik } from 'formik';
import { injectIntl } from 'react-intl';
import { handleSubmitWithProps } from 'utils/form/handleSubmit';
import { leavePagePrepare, leavePage } from 'utils/camper/leavePageHelper';

import ROUTES from 'constants/routes';
import { CAMPER_INCLUSION } from 'constants/camper';
import yup from 'lib/yupLocalised';
import {
  camperSelector,
  isCamperExistSelector,
} from 'state/concepts/camper/selectors';
import { loadingSelector } from 'state/data/selectors';
import { updateDeliveryEndpoint } from 'state/concepts/camper/endpoints';
import {
  updateCamperDeliveryAction,
  fetchCamper,
} from 'state/concepts/camper/actions';
import {
  showModal as showModalAction,
  hideModal as hideModalAction,
} from 'state/modal/actions';
import {
  MIN_DISTANCE_DELIVERY,
  MAX_DISTANCE_DELIVERY,
  TYPE_DELIVERY,
  MIN_FEE_DELIVERY,
  MAX_FEE_DELIVERY,
  MIN_COST_PER_MILE_DELIVERY,
  MAX_COST_PER_MILE_DELIVERY,
  DELIVERY_DEFAULT_VALUES,
} from 'constants/mapbox';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import DeliveryComponent from './component';

class Delivery extends React.Component {
  static getInitialProps = async (ctx) => {
    const camperId = ctx.query.camper;

    ctx.store.dispatch(
      fetchCamper(camperId, CAMPER_INCLUSION.DELIVERY_INFORMATION),
    );

    return { camperId };
  };

  leavePage = leavePage.bind(this);

  leavePagePrepare = leavePagePrepare.bind(this);

  handlerPickup = (val) => {
    const { setValues } = this.props;
    const values = {};

    if (!val) {
      values.rate = DELIVERY_DEFAULT_VALUES.rate;
      values.distance = DELIVERY_DEFAULT_VALUES.distance;
      values.costPerMile = DELIVERY_DEFAULT_VALUES.costPerMile;
      values.minFee = DELIVERY_DEFAULT_VALUES.minFee;
    }

    setValues({
      ...this.props.values,
      pickup: val,
      ...values,
    });
  };

  handlerRate = (e) => {
    const { setValues } = this.props;
    const values = {};

    if (e.target.value === TYPE_DELIVERY[0]) {
      values.costPerMile = DELIVERY_DEFAULT_VALUES.costPerMile;
      values.minFee = DELIVERY_DEFAULT_VALUES.minFee;
    }

    setValues({
      ...this.props.values,
      rate: e.target.value,
      ...values,
    });
  };

  render() {
    const { isValid } = this.props;

    return (
      <DeliveryComponent
        {...this.props}
        handlerRate={this.handlerRate}
        handlerPickup={this.handlerPickup}
        leavePagePrepare={this.leavePagePrepare}
        isFormValid={isValid}
      />
    );
  }
}

Delivery.defaultProps = {
  isLoading: false,
  camper: null,
};

Delivery.propTypes = {
  isValid: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  camperId: PropTypes.string.isRequired,
  router: PropTypes.shape().isRequired,
  setValues: PropTypes.func.isRequired,
  setSubmitting: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  values: PropTypes.shape().isRequired,
  isLoading: PropTypes.bool,
  camper: PropTypes.shape(),
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  camper: camperSelector(state, ownProps?.camperId),
  isLoading: loadingSelector(state, updateDeliveryEndpoint.endpoint),
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
});

const mapDispatchToProps = {
  onSubmit: updateCamperDeliveryAction,
  showModal: showModalAction,
  hideModal: hideModalAction,
};

export { Delivery as DeliveryContainer };
export default R.compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ camper, camperId }) => ({
      pickup:
        camper?.deliveryInformation?.pickup || DELIVERY_DEFAULT_VALUES.pickup,
      rate: camper?.deliveryInformation?.rate
        ? TYPE_DELIVERY[1]
        : DELIVERY_DEFAULT_VALUES.rate,
      distance:
        camper?.deliveryInformation?.distance
        || DELIVERY_DEFAULT_VALUES.distance,
      costPerMile:
        camper?.deliveryInformation?.costPerMile
        || DELIVERY_DEFAULT_VALUES.costPerMile,
      minFee:
        camper?.deliveryInformation?.minFee || DELIVERY_DEFAULT_VALUES.minFee,
      redirectRoute: createRouteFromPathname(
        ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.RULES_AND_TRAVELS.PATH,
        null,
        { camper: camperId },
      ),
    }),
    validationSchema: yup.object().shape({
      distance: yup
        .number()
        .required({
          id: 'validations.cantBeBlank',
          values: { pref: 'Distance' },
        })
        .min(MIN_DISTANCE_DELIVERY, {
          id: 'addNewCamper.delivery.validations.distance',
          values: { value: MIN_DISTANCE_DELIVERY },
        })
        .max(MAX_DISTANCE_DELIVERY, {
          id: 'addNewCamper.delivery.validations.max.distance',
          values: { value: MAX_DISTANCE_DELIVERY },
        }),
      costPerMile: yup
        .number()
        .required({
          id: 'validations.cantBeBlank',
          values: { pref: 'Cost Per Mile' },
        })
        .min(MIN_COST_PER_MILE_DELIVERY, {
          id: 'addNewCamper.delivery.validations.minCostPerMile',
          values: { value: MIN_COST_PER_MILE_DELIVERY },
        })
        .max(MAX_COST_PER_MILE_DELIVERY, {
          id: 'addNewCamper.delivery.validations.maxCostPerMile',
          values: { value: MAX_COST_PER_MILE_DELIVERY },
        }),
      minFee: yup
        .number()
        .required({
          id: 'validations.cantBeBlank',
          values: { pref: 'Minimum delivery fee' },
        })
        .min(MIN_FEE_DELIVERY, {
          id: 'addNewCamper.delivery.validations.minFee',
          values: { value: MIN_FEE_DELIVERY },
        })
        .max(MAX_FEE_DELIVERY, {
          id: 'addNewCamper.delivery.validations.maxFee',
          values: { value: MAX_FEE_DELIVERY },
        }),
    }),
    handleSubmit: handleSubmitWithProps(['camperId']),
  }),
  injectIntl,
)(Delivery);
