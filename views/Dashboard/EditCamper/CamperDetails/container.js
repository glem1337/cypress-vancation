import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import * as R from 'ramda';
import yup from 'lib/yupLocalised';
import { withRouter } from 'next/router';

import { createRouteFromPathname } from 'utils/createRouteHelper';

import ROUTES from 'constants/routes';
import {
  START_RANGE_AGE_CAMPER,
  START_RANGE_LENGTH_CAMPER,
  FINISH_RANGE_LENGTH_CAMPER,
  START_RANGE_LENGTH_CAMPER_FLOAT,
  FINISH_RANGE_LENGTH_CAMPER_FLOAT,
  CAMPER_INCLUSION,
} from 'constants/camper';
import {
  SPECIFICATIONS_VALIDATION_SCHEMA,
  WATER_FORM_VALIDATION,
} from 'constants/camperSpecifications';

import { updateCamperSpecificationsEndpoint } from 'state/concepts/camper/endpoints';
import {
  fetchCamper,
  fetchSpecificationsAction,
  updateCamperSpecification as updateCamperSpecificationAction,
} from 'state/concepts/camper/actions';
import {
  vehicleModelSelector,
  vehicleTypeSelector,
  vehicleMakeSelector,
  camperSelector,
  isCamperExistSelector,
} from 'state/concepts/camper/selectors';
import { loadingSelector } from 'state/data/selectors';
import {
  showModal as showModalAction,
  hideModal as hideModalAction,
} from 'state/modal/actions';
import { leavePagePrepare } from 'utils/camper/leavePageHelper';
import getCamperLength from 'utils/camper/getLength';

import CamperDetailsComponent from './component';

class CamperDetails extends React.Component {
  static getInitialProps = async (ctx) => {
    const camperId = ctx.query.camper;

    ctx.store.dispatch(fetchSpecificationsAction());
    ctx.store.dispatch(
      fetchCamper(camperId, CAMPER_INCLUSION.SPECIFICATIONS_DETAILS),
    );

    return { camperId };
  };

  leavePage = (withSaving, redirectRoute) => async () => {
    const { hideModal, router, setFieldValue } = this.props;

    if (withSaving) {
      await setFieldValue('redirectRoute', redirectRoute);

      await this.handleSubmit();
    } else {
      router.push(redirectRoute);
    }

    hideModal();
  };

  leavePagePrepare = leavePagePrepare.bind(this);

  get submitData() {
    const { camperId } = this.props;

    return R.compose(
      R.append({ camperId }),
      R.props([
        'values',
        'setErrors',
        'setSubmitting',
        'resetForm',
        'setErrors',
        'setValues',
      ]),
    )(this.props);
  }

  get vehicleTypes() {
    const { vehicleType } = this.props;

    return R.compose(
      R.sortBy(R.prop('value')),
      R.map(({ id, name, iconUrl, estimatedEarning }) => ({
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
      R.map(({ id, name }) => ({
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
    const { vehicleModel, vehicleMake, values } = this.props;
    const filteredModels = R.compose(
      R.map((elem) => elem.id),
      R.propOr([], 'vehicleModels'),
      R.find((elem) => elem.name === values.name),
      R.defaultTo([]),
    )(vehicleMake);

    return R.compose(
      R.sortBy(R.prop('value')),
      R.filter((elem) => (!R.isEmpty(filteredModels) ? filteredModels.includes(elem.id) : elem)),
      R.map(({
 id, name, builderName, insideHeigh, length,
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
      .map((elem) => ({
        value: `${elem}`,
        label: `${elem}`,
      }))
      .reverse();
  };

  getCamperLength = () => {
    const intLength = R.range(
      START_RANGE_LENGTH_CAMPER,
      FINISH_RANGE_LENGTH_CAMPER + 1,
    );
    const floatLength = R.range(
      START_RANGE_LENGTH_CAMPER_FLOAT,
      FINISH_RANGE_LENGTH_CAMPER_FLOAT,
    ).map((elem) => elem + 0.5);

    return R.pipe(
      R.sort((a, b) => a - b),
      R.map((elem) => ({
        value: `${elem}`,
        label: `${elem} \``,
      })),
    )(intLength.concat(floatLength));
  };

  firstModel = (value) => R.compose(
      R.prop(0),
      R.propOr([], 'vehicleModels'),
      R.find((item) => item.name === value),
      R.defaultTo([]),
    )(this.props.vehicleMake);

  currentMake = (currentModelId) => R.compose(
      R.pick(['name', 'id']),
      R.find(({ vehicleModels }) => vehicleModels.includes(currentModelId)),
      R.map((elemMake) => ({
        ...elemMake,
        vehicleModels: R.map((makeItem) => makeItem.id, elemMake.vehicleModels),
      })),
      R.defaultTo([]),
    )(this.props.vehicleMake);

  currentType = (currentMakeId) => R.compose(
      R.pick(['name', 'id']),
      R.find(({ vehicleMakes }) => vehicleMakes.includes(currentMakeId)),
      R.map((elemType) => ({
        ...elemType,
        vehicleMakes: R.map((makeItem) => makeItem.id, elemType.vehicleMakes),
      })),
      R.defaultTo([]),
    )(this.props.vehicleType);

  handlerMake = (elem, items) => {
    const currentMake = R.find(
      (modelElem) => modelElem.label === elem.value,
      items,
    );
    const type = this.currentType(currentMake.id);
    const { length, name } = this.firstModel(elem.value);

    this.props.setValues({
      ...this.props.values,
      length: String(length),
      vehicleTypeName: type.name,
      modelNaming: name,
      name: elem.value,
    });
  };

  handleSubmit = async () => {
    const { updateCamperSpecification, setFieldValue, camperId, values } = this.props;

    if (!values.redirectRoute) {
      const route = createRouteFromPathname(
        ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.ADDONS.PATH,
        null,
        {
          camper: camperId,
        },
      );

      await setFieldValue('redirectRoute', route);
    }

    updateCamperSpecification(...this.submitData);
  };

  render() {
    const { isValid } = this.props;

    return (
      <CamperDetailsComponent
        {...this.props}
        years={this.getYears()}
        camperLength={this.getCamperLength()}
        vehicleTypes={this.vehicleTypes}
        vehicleMake={this.vehicleMake}
        vehicleModel={this.vehicleModel}
        builtCamper={this.builtCamper}
        isFormValid={isValid}
        handlerMake={this.handlerMake}
        handleSubmit={this.handleSubmit}
        leavePagePrepare={this.leavePagePrepare}
      />
    );
  }
}

CamperDetails.defaultProps = {
  vehicleType: [],
  vehicleModel: [],
  vehicleMake: [],
  camper: null,
  isLoading: false,
};

CamperDetails.propTypes = {
  vehicleType: PropTypes.arrayOf(PropTypes.shape()),
  vehicleModel: PropTypes.arrayOf(PropTypes.shape()),
  vehicleMake: PropTypes.arrayOf(PropTypes.shape()),
  setFieldValue: PropTypes.func.isRequired,
  updateCamperSpecification: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  values: PropTypes.shape().isRequired,
  isValid: PropTypes.bool.isRequired,
  camper: PropTypes.shape(),
  camperId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  updateCamperSpecification: updateCamperSpecificationAction,
  showModal: showModalAction,
  hideModal: hideModalAction,
};

const mapStateToProps = (state, ownProps) => ({
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
  camper: camperSelector(state, ownProps?.camperId),
  vehicleType: vehicleTypeSelector(state),
  vehicleModel: vehicleModelSelector(state),
  vehicleMake: vehicleMakeSelector(state),
  isLoading: loadingSelector(
    state,
    updateCamperSpecificationsEndpoint(ownProps?.camperId).endpoint,
  ),
});

export { CamperDetails as CamperDetailsContainer };
export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
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
      freshWater: camper?.specificationDetail?.freshWater || 0,
      grayWater: camper?.specificationDetail?.grayWater || 0,
      camperLocation: {
        id: camper?.placeId || '',
        place: camper?.place || '',
        longitude: camper?.longitude || 0,
        latitude: camper?.latitude || 0,
      },
    }),
    validationSchema: yup.object().shape({
      ...SPECIFICATIONS_VALIDATION_SCHEMA,
      freshWater: yup
        .number()
        .required()
        .min(WATER_FORM_VALIDATION.MIN, {
          id: 'validations.minGallons',
          values: {
            pref: 'Fresh water',
            value: WATER_FORM_VALIDATION.MIN,
          },
        })
        .max(WATER_FORM_VALIDATION.MAX, {
          id: 'validations.maxGallons',
          values: {
            pref: 'Fresh water',
            value: WATER_FORM_VALIDATION.MAX,
          },
        }),
      grayWater: yup
        .number()
        .required()
        .min(WATER_FORM_VALIDATION.MIN, {
          id: 'validations.minGallons',
          values: {
            pref: 'Gray water',
            value: WATER_FORM_VALIDATION.MIN,
          },
        })
        .max(WATER_FORM_VALIDATION.MAX, {
          id: 'validations.maxGallons',
          values: {
            pref: 'Gray water',
            value: WATER_FORM_VALIDATION.MAX,
          },
        }),
    }),
  }),
  injectIntl,
  withRouter,
)(CamperDetails);
