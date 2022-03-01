import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { withRouter } from 'next/router';

import {
  CAMPER_INCLUSION,
  START_RANGE_AGE_CAMPER,
  START_RANGE_LENGTH_CAMPER,
  FINISH_RANGE_LENGTH_CAMPER,
  START_RANGE_LENGTH_CAMPER_FLOAT,
  FINISH_RANGE_LENGTH_CAMPER_FLOAT,
} from 'constants/camper';
import yup from 'lib/yupLocalised';
import attachLayout from 'views/layouts/attachLayout';
import AddNewCamperLayout from 'views/layouts/AddNewCamper';
import { SPECIFICATIONS_VALIDATION_SCHEMA } from 'constants/camperSpecifications';
import {
  createCamperDetailsEndpoint,
  updateCamperSpecificationsEndpoint,
} from 'state/concepts/camper/endpoints';
import {
  fetchSpecificationsAction,
  createCamperAction,
  fetchCamper,
  setEstimateEarningData,
  setLeavePageMethod as setLeavePageMethodAction,
} from 'state/concepts/camper/actions';
import {
  vehicleModelSelector,
  vehicleTypeSelector,
  vehicleMakeSelector,
  camperSelector,
  camperCompletenessSelector,
  estimateEarningStateSelector,
} from 'state/concepts/camper/selectors';
import { isUserLoggedInSelector } from 'state/concepts/session/selectors';
import { loadingSelector } from 'state/data/selectors';
import {
  showModal as showModalAction,
  hideModal as hideModalAction,
} from 'state/modal/actions';
import { leavePagePrepare } from 'utils/camper/leavePageHelper';
import { handleSubmitWithProps } from 'utils/form/handleSubmit';
import getCamperLength from 'utils/camper/getLength';
import isPresent from 'utils/isPresent';

import CamperDetailsComponent from './component';

class CamperDetails extends React.PureComponent {
  static getInitialProps = async (ctx) => {
    const camperId = ctx.query.camper_id;

    const isUserLoggedIn = isUserLoggedInSelector(ctx.store.getState());

    if (isUserLoggedIn) {
      ctx.store.dispatch(fetchSpecificationsAction());
    }

    if (camperId !== 'id' && camperId !== '[id]') {
      ctx.store.dispatch(fetchCamper(camperId, CAMPER_INCLUSION.SPECIFICATIONS_DETAILS));

      await ctx.store.logicMiddleware.whenComplete();
    }

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

  get vehicleTypes() {
    const { vehicleType } = this.props;

    return R.compose(
      R.sortBy(R.prop('value')),
      R.map(({
        id,
        name,
        iconUrl,
        estimatedEarning,
      }) => ({
        id,
        value: name,
        img: iconUrl,
        label: name,
        estimatedEarning,
      })),
      R.defaultTo([]),
    )(vehicleType);
  }

  get vehicleMake() {
    const { vehicleMake } = this.props;

    const prepareMakes = R.compose(
      R.sortBy(R.prop('value')),
      R.map(({
        id,
        name,
      }) => ({
        id,
        value: name,
        label: name,
      })),
      R.filter(({ vehicleModels }) => vehicleModels.length),
      R.defaultTo([]),
    )(vehicleMake);

    return R.unionWith(R.eqBy(R.prop('value')), prepareMakes, prepareMakes);
  }

  get vehicleModel() {
    const {
      vehicleModel,
      vehicleMake,
      values,
    } = this.props;
    const filteredModels = R.compose(
      R.map(elem => elem.id),
      R.propOr([], 'vehicleModels'),
      R.find(elem => elem.name === values.name),
      R.defaultTo([]),
    )(vehicleMake);

    return R.compose(
      R.sortBy(R.prop('value')),
      R.filter(elem => (!R.isEmpty(filteredModels) ? filteredModels.includes(elem.id) : elem)),
      R.map(({
        id,
        name,
        builderName,
        insideHeigh,
        length,
      }) => ({
        id,
        value: name,
        label: name,
        builderName,
        insideHeigh,
        length,
      })),
      R.defaultTo([]),
    )(vehicleModel);
  }

  get builtCamper() {
    const { vehicleModel } = this.props;

    return R.compose(
      R.map(({ builderName }) => ({
        value: builderName,
        label: builderName,
      })),
      R.defaultTo([]),
    )(vehicleModel);
  }

  getYears = () => {
    const currentYear = new Date().getFullYear();

    return R.range(START_RANGE_AGE_CAMPER, currentYear + 1)
      .map(elem => ({
        value: `${elem}`,
        label: `${elem}`,
      }))
      .reverse();
  }

  getCamperLength = () => {
    const intLength = R.range(START_RANGE_LENGTH_CAMPER, FINISH_RANGE_LENGTH_CAMPER + 1);
    const floatLength = R.range(
      START_RANGE_LENGTH_CAMPER_FLOAT,
      FINISH_RANGE_LENGTH_CAMPER_FLOAT,
    )
      .map(elem => elem + 0.5);

    return R.pipe(
      R.sort((a, b) => a - b),
      R.map(elem => ({
        value: `${elem}`,
        label: `${elem} \``,
      })),
    )(intLength.concat(floatLength));
  }

  firstModel = value => R.compose(
    R.prop(0),
    R.propOr([], 'vehicleModels'),
    R.find(item => item.name === value),
    R.defaultTo([]),
  )(this.props.vehicleMake);

  currentMake = currentModelId => R.compose(
    R.pick(['name', 'id']),
    R.find(({ vehicleModels }) => vehicleModels.includes(currentModelId)),
    R.map(elemMake => ({
      ...elemMake,
      vehicleModels: R.map(makeItem => makeItem.id, elemMake.vehicleModels),
    })),
    R.defaultTo([]),
  )(this.props.vehicleMake);

  currentType = currentMakeId => R.compose(
    R.pick(['name', 'id']),
    R.find(({ vehicleMakes }) => vehicleMakes.includes(currentMakeId)),
    R.map(elemType => ({
      ...elemType,
      vehicleMakes: R.map(makeItem => makeItem.id, elemType.vehicleMakes),
    })),
    R.defaultTo([]),
  )(this.props.vehicleType)

  handlerMake = (elem, items) => {
    const currentMake = R.find(modelElem => modelElem.label === elem.value, items);
    const type = this.currentType(currentMake.id);
    const {
      length,
      name,
      insideHeigh,
    } = this.firstModel(elem.value);

    const values = {
      ...this.props.values,
      length: String(length),
      vehicleTypeName: type.name,
      modelNaming: name,
      name: elem.value,
    };

    if (isPresent(insideHeigh)) {
      values.insideHeight = insideHeigh;
    }

    this.props.setValues(values);
  }

  leavePage = (withSaving, redirectRoute) => async () => {
    const { hideModal, setFieldValue, router, handleSubmit } = this.props;

    if (withSaving) {
      await setFieldValue('redirectRoute', redirectRoute);

      handleSubmit();
    } else {
      router.push(redirectRoute);
    }

    hideModal();
  };

  leavePagePrepare = leavePagePrepare.bind(this);

  componentDidUpdate(prevProps) {
    const {
      values,
      setEstimate,
    } = this.props;

    if (prevProps.values.vehicleTypeName !== values.vehicleTypeName) {
      const currentType = this.vehicleTypes.find(elem => values.vehicleTypeName === elem.value);

      if (currentType) {
        setEstimate({
          estimatedEarning: currentType.estimatedEarning,
          name: currentType.value,
          iconUrl: currentType.img,
        });
      }
    }
  }

  get isFormValid() {
    const { camperId, isValid, dirty } = this.props;

    if (camperId === 'id' || camperId === '[id]') {
      return isValid && dirty;
    }

    return isValid;
  }

  render() {
    return (
      <CamperDetailsComponent
        {...this.props}
        isSubmitting={this.isLoading}
        years={this.getYears()}
        camperLength={this.getCamperLength()}
        vehicleTypes={this.vehicleTypes}
        vehicleMake={this.vehicleMake}
        vehicleModel={this.vehicleModel}
        builtCamper={this.builtCamper}
        isFormValid={this.isFormValid}
        handlerMake={this.handlerMake}
      />
    );
  }
}

CamperDetails.defaultProps = {
  vehicleType: [],
  vehicleModel: [],
  vehicleMake: [],
  camper: null,
  isLoadingCreate: undefined,
  isLoadingUpdate: undefined,
};

CamperDetails.propTypes = {
  vehicleType: PropTypes.arrayOf(PropTypes.shape()),
  vehicleModel: PropTypes.arrayOf(PropTypes.shape()),
  vehicleMake: PropTypes.arrayOf(PropTypes.shape()),
  setFieldValue: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  values: PropTypes.shape().isRequired,
  isValid: PropTypes.bool.isRequired,
  setEstimate: PropTypes.func.isRequired,
  camper: PropTypes.shape(),
  dirty: PropTypes.bool.isRequired,
  camperId: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
  setLeavePageMethod: PropTypes.func.isRequired,
  isLoadingCreate: PropTypes.bool,
  isLoadingUpdate: PropTypes.bool,
  hideModal: PropTypes.func.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onSubmit: createCamperAction,
  setEstimate: setEstimateEarningData,
  showModal: showModalAction,
  hideModal: hideModalAction,
  setLeavePageMethod: setLeavePageMethodAction,
};

const mapStateToProps = (state, ownProps) => ({
  camper: camperSelector(state, ownProps?.camperId),
  camperCompleteness: camperCompletenessSelector(state, ownProps?.camperId),
  vehicleType: vehicleTypeSelector(state),
  vehicleModel: vehicleModelSelector(state),
  vehicleMake: vehicleMakeSelector(state),
  isLoadingCreate: loadingSelector(state, createCamperDetailsEndpoint.endpoint),
  isLoadingUpdate: loadingSelector(
    state,
    updateCamperSpecificationsEndpoint(ownProps?.camperId).endpoint,
  ),
  estimateEarningState: estimateEarningStateSelector(state),
});

export { CamperDetails as CamperDetailsContainer };
export default R.compose(
  attachLayout(AddNewCamperLayout),
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    handleSubmit: handleSubmitWithProps(['camperId']),
    enableReinitialize: true,
    mapPropsToValues: ({ camper }) => ({
      vehicleTypeName: camper?.vehicleTypeName || '',
      fuelType: camper?.specificationDetail?.fuelType || '',
      modelNaming: camper?.specificationDetail?.modelNaming || '',
      stateRegistred: camper?.specificationDetail?.stateRegistred || '',
      transmission: camper?.specificationDetail?.transmission || '',
      name: camper?.specificationDetail?.name || '',
      drivetrain: camper?.specificationDetail?.drivetrain || '',
      insideHeight: camper?.specificationDetail?.insideHeight || '',
      length: getCamperLength(camper),
      mileage: camper?.specificationDetail?.mileage || '',
      whoBuiltCamper: camper?.specificationDetail?.whoBuiltCamper || '',
      year: camper ? String(camper.specificationDetail.year) : '',
      seats: camper ? String(camper.specificationDetail.seats) : '1',
      sleeps: camper ? String(camper.specificationDetail.sleeps) : '1',
      camperLocation: {
        id: camper?.placeId || '',
        place: camper?.place || '',
        longitude: camper?.longitude || 0,
        latitude: camper?.latitude || 0,
      },
    }),
    validationSchema: yup.object().shape({
      ...SPECIFICATIONS_VALIDATION_SCHEMA,
    }),
  }),
  withRouter,
  injectIntl,
)(CamperDetails);
