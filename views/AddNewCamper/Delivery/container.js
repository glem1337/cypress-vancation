import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { withFormik } from 'formik';
import { injectIntl } from 'react-intl';

import yup from 'lib/yupLocalised';
import { createRouteFromPathname } from 'utils/createRouteHelper';
import {
  camperSelector,
  isCamperExistSelector,
  camperCompletenessSelector,
} from 'state/concepts/camper/selectors';
import { loadingSelector } from 'state/data/selectors';
import { createDeliveryEndpoint, updateDeliveryEndpoint } from 'state/concepts/camper/endpoints';
import {
  createCamperDeliveryAction,
  updateCamperDeliveryAction,
  checkPreviousStepCompleteness,
  fetchCamper,
  setLeavePageMethod as setLeavePageMethodAction,
} from 'state/concepts/camper/actions';
import ROUTES from 'constants/routes';
import attachLayout from 'views/layouts/attachLayout';
import AddNewCamperLayout from 'views/layouts/AddNewCamper';
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
import { leavePagePrepare } from 'utils/camper/leavePageHelper';
import redirect from 'utils/redirect';

import DeliveryComponent from './component';

class Delivery extends React.PureComponent {
  static getInitialProps = async (ctx) => {
    const camperId = ctx.query.camper_id;

    ctx.store.dispatch(fetchCamper(camperId, 'delivery_information'));

    await ctx.store.logicMiddleware.whenComplete();

    ctx.store.dispatch(checkPreviousStepCompleteness({
      key: ROUTES.ADD_NEW_CAMPER.DELIVERY.KEY,
      camperId,
      ctx,
    }));

    return { camperId };
  }

  constructor(props) {
    super(props);

    props.setLeavePageMethod(this.leavePagePrepare);
  }

  get isLoading() {
    const { isLoadingCreate, isLoadingUpdate } = this.props;

    return isLoadingCreate || isLoadingUpdate;
  }

  get submitData() {
    const { camperId } = this.props;

    return R.compose(
      R.append({ camperId }),
      R.props(['values', 'setErrors', 'setSubmitting', 'resetForm', 'setErrors', 'setValues']),
    )(this.props);
  }

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
  }

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
  }

  goBack = () => {
    const {
      router,
      camperId,
      hideModal,
    } = this.props;

    const route = createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.LISTING_PHOTOS.PATH, camperId);

    router.push(route);

    hideModal();
  }

  saveAndGoBack = async () => {
    const {
      camperId,
      setFieldValue,
      hideModal,
    } = this.props;

    const route = createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.LISTING_PHOTOS.PATH, camperId);

    await setFieldValue('redirectRoute', route);

    hideModal();

    this.handleSubmit();
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
  }

  handleSubmit = () => {
    const {
      createCamperDelivery,
      updateCamperDelivery,
      camper,
      isValid,
    } = this.props;

    const hasDeliveryInformation = R.hasPath(['deliveryInformation', 'pickup'], camper);
    const onSubmit = !hasDeliveryInformation ? createCamperDelivery : updateCamperDelivery;

    if (!isValid) {
      return false;
    }

    onSubmit(...this.submitData);

    return true;
  }

  leavePage = (withSaving, redirectRoute) => async () => {
    const {
      hideModal,
      setFieldValue,
    } = this.props;

    if (withSaving) {
      await setFieldValue('redirectRoute', redirectRoute);

      this.handleSubmit();
    } else {
      redirect(redirectRoute);
    }

    hideModal();
  }

  leavePagePrepare = leavePagePrepare.bind(this);

  render() {
    const { isValid } = this.props;

    return (
      <DeliveryComponent
        {...this.props}
        isLoading={this.isLoading}
        handlerRate={this.handlerRate}
        handlerPickup={this.handlerPickup}
        onBackButtonClick={this.onBackButtonClick}
        isFormValid={isValid}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

Delivery.defaultProps = {
  isLoadingCreate: undefined,
  isLoadingUpdate: undefined,
  camper: null,
};

Delivery.propTypes = {
  isValid: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  camperId: PropTypes.string.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  setValues: PropTypes.func.isRequired,
  setSubmitting: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  createCamperDelivery: PropTypes.func.isRequired,
  updateCamperDelivery: PropTypes.func.isRequired,
  values: PropTypes.shape({
    pickup: PropTypes.bool.isRequired,
    distance: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    rate: PropTypes.oneOf(TYPE_DELIVERY).isRequired,
  }).isRequired,
  isLoadingCreate: PropTypes.bool,
  isLoadingUpdate: PropTypes.bool,
  camper: PropTypes.shape({
    deliveryInformation: PropTypes.shape(),
  }),
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired,
  setLeavePageMethod: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  camper: camperSelector(state, ownProps?.camperId),
  isLoadingCreate: loadingSelector(state, createDeliveryEndpoint.endpoint),
  isLoadingUpdate: loadingSelector(state, updateDeliveryEndpoint.endpoint),
  camperCompleteness: camperCompletenessSelector(state, ownProps?.camperId),
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
});

const mapDispatchToProps = {
  createCamperDelivery: createCamperDeliveryAction,
  updateCamperDelivery: updateCamperDeliveryAction,
  showModal: showModalAction,
  hideModal: hideModalAction,
  setLeavePageMethod: setLeavePageMethodAction,
};

export { Delivery as DeliveryContainer };
export default R.compose(
  attachLayout(AddNewCamperLayout),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    mapPropsToValues: ({ camper }) => ({
      pickup: camper?.deliveryInformation?.pickup || DELIVERY_DEFAULT_VALUES.pickup,
      rate: camper?.deliveryInformation?.rate ? TYPE_DELIVERY[1] : DELIVERY_DEFAULT_VALUES.rate,
      distance: camper?.deliveryInformation?.distance || DELIVERY_DEFAULT_VALUES.distance,
      costPerMile: camper?.deliveryInformation?.costPerMile || DELIVERY_DEFAULT_VALUES.costPerMile,
      minFee: camper?.deliveryInformation?.minFee || DELIVERY_DEFAULT_VALUES.minFee,
    }),
    validationSchema: yup.object().shape({
      distance: yup.number()
       .required({ id: 'validations.cantBeBlank', values: { pref: 'Distance' } })
       .min(MIN_DISTANCE_DELIVERY, { id: 'addNewCamper.delivery.validations.distance', values: { value: MIN_DISTANCE_DELIVERY } })
       .max(MAX_DISTANCE_DELIVERY, { id: 'addNewCamper.delivery.validations.max.distance', values: { value: MAX_DISTANCE_DELIVERY } }),
      costPerMile: yup.number()
       .required({ id: 'validations.cantBeBlank', values: { pref: 'Cost Per Mile' } })
       .min(MIN_COST_PER_MILE_DELIVERY, { id: 'addNewCamper.delivery.validations.minCostPerMile', values: { value: MIN_COST_PER_MILE_DELIVERY } })
       .max(MAX_COST_PER_MILE_DELIVERY, { id: 'addNewCamper.delivery.validations.maxCostPerMile', values: { value: MAX_COST_PER_MILE_DELIVERY } }),
      minFee: yup.number()
       .required({ id: 'validations.cantBeBlank', values: { pref: 'Minimum delivery fee' } })
       .min(MIN_FEE_DELIVERY, { id: 'addNewCamper.delivery.validations.minFee', values: { value: MIN_FEE_DELIVERY } })
       .max(MAX_FEE_DELIVERY, { id: 'addNewCamper.delivery.validations.maxFee', values: { value: MAX_FEE_DELIVERY } }),
    }),
  }),
  injectIntl,
)(Delivery);
