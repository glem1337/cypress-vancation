import React from 'react';
import { withFormik } from 'formik';
import { compose } from 'ramda';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import * as R from 'ramda';
import { injectIntl } from 'react-intl';

import { CAMPER_INCLUSION, TRIP_FEES } from 'constants/camper';
import { DEFAULT_VALUES } from 'constants/camperTripFees';
import ROUTES from 'constants/routes';

import attachLayout from 'views/layouts/attachLayout';
import AddNewCamperLayout from 'views/layouts/AddNewCamper';
import { handleSubmitWithProps } from 'utils/form/handleSubmit';
import {
  createTripFees,
  deleteCustomTripFee as deleteCustomTripFeeAction,
  checkPreviousStepCompleteness,
  fetchCamper,
  setLeavePageMethod as setLeavePageMethodAction,
} from 'state/concepts/camper/actions';
import { createRouteFromPathname } from 'utils/createRouteHelper';
import {
  camperSelector,
  isCamperExistSelector,
  camperCompletenessSelector,
} from 'state/concepts/camper/selectors';
import { createTripFeesEndpoint } from 'state/concepts/camper/endpoints';
import {
  showModal as showModalAction,
  hideModal as hideModalAction,
} from 'state/modal/actions';
import { loadingSelector } from 'state/data/selectors';
import { leavePage, leavePagePrepare } from 'utils/camper/leavePageHelper';
import { dataDeleteEntity } from 'state/data/actions';

import yup from 'lib/yupLocalised';

import TripFeesComponent from './component';

class TripFees extends React.Component {
  static propTypes = {
    values: PropTypes.shape().isRequired,
    errors: PropTypes.shape().isRequired,
    touched: PropTypes.shape().isRequired,
    setFormikState: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    router: PropTypes.shape().isRequired,
    camperId: PropTypes.string.isRequired,
    deleteCustomTripFee: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    intl: PropTypes.shape().isRequired,
    isLoading: PropTypes.bool,
    isValid: PropTypes.bool.isRequired,
    dirty: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired,
    setLeavePageMethod: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isLoading: false,
  }

  static getInitialProps = async (ctx) => {
    const camperId = ctx.query.camper_id;

    ctx.store.dispatch(dataDeleteEntity({
      kind: 'tripFee',
    }));

    const inclusions = [
      CAMPER_INCLUSION.TRIP_FEE.INDEX,
      CAMPER_INCLUSION.TRIP_FEE.TRIP_FEE_MILEAGE,
      CAMPER_INCLUSION.TRIP_FEE.TRIP_FEE_GENERATOR,
      CAMPER_INCLUSION.TRIP_FEE.CUSTOM_FEES,
      // Have to add (this) due to backend has changed architecture of pricing info
      CAMPER_INCLUSION.PRICING_INFO.WEEK_NIGHT_PRICE,
      CAMPER_INCLUSION.PRICING_INFO.INDEX,
    ];

    ctx.store.dispatch(fetchCamper(camperId, inclusions.join(',')));

    await ctx.store.logicMiddleware.whenComplete();

    ctx.store.dispatch(checkPreviousStepCompleteness({
      key: ROUTES.ADD_NEW_CAMPER.LISTING_FEES.KEY,
      camperId,
      ctx,
    }));

    return { camperId };
  }

  constructor(props) {
    super(props);

    props.setLeavePageMethod(this.leavePagePrepare);
  }

  static isUnlimitedMileageMode = (mode) => mode === TRIP_FEES.MILEAGE_VALUES.UNLIMITED;

  static isUnlimitedGeneratorMode = (mode) => mode === TRIP_FEES.GENERATOR_VALUES.UNLIMITED;

  static determineInitialValues = (props) => {
    const tripFee = R.pathOr({}, ['camper', 'tripFee'], props);

    // Cleaning
    const cleaningAndPreparationFee = tripFee.cleaning || '';

    // Mileage
    const mileageIncluded = R.path(['tripFeeMileage', 'available'], tripFee);
    const mileageOverage = R.path(['tripFeeMileage', 'overage'], tripFee);
    const mileageLimit = R.path(['tripFeeMileage', 'limit'], tripFee);
    const mileage = {
      mode: mileageLimit
        ? TRIP_FEES.MILEAGE_VALUES.LIMITED
        : TRIP_FEES.MILEAGE_VALUES.UNLIMITED,
      included: mileageIncluded || DEFAULT_VALUES.MILEAGE.INCLUDED,
      overage: mileageOverage || DEFAULT_VALUES.MILEAGE.OVERAGE,
    };

    // Generator
    const hasGenerator = R.compose(
      R.not,
      R.isNil(),
      R.path(['tripFeeGenerator', 'presence']),
    )(tripFee);
    const generatorLimit = R.path(['tripFeeGenerator', 'limit'], tripFee);
    const generatorIncluded = R.path(['tripFeeGenerator', 'available'], tripFee);
    const generatorOverage = R.path(['tripFeeGenerator', 'overage'], tripFee);
    const generator = {
      hasGenerator,
      mode: generatorLimit === true
        ? TRIP_FEES.GENERATOR_VALUES.LIMITED
        : TRIP_FEES.GENERATOR_VALUES.UNLIMITED,
      included: generatorIncluded || DEFAULT_VALUES.GENERATOR.INCLUDED,
      overage: generatorOverage || DEFAULT_VALUES.GENERATOR.OVERAGE,
    };

    // Custom fees
    const customFees = R.defaultTo([], tripFee.customFees).reduce(
      (acc, item) => R.assoc(
        item.id,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          frequency: item.frequency,
          fromServer: true,
        },
        acc,
      ), {},
    );

    return {
      cleaningAndPreparationFee,
      mileage,
      generator,
      customFees,
    };
  }

  static getCustomFeeSchema = obj => {
    const schema = {};

    const keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];

      schema[key] = yup.object({
        name: yup.string().required(),
        price: yup.number().moreThan(0, { id: 'validations.cantBeValue', values: { value: 0 } }).required(),
        frequency: yup.string(),
      });
    }

    return yup.object(schema);
  }

  componentDidUpdate(prevProps) {
    const { values: { customFees } } = this.props;

    // Scroll to the bottom
    if (Object.keys(customFees).length !== Object.keys(prevProps.values.customFees).length) {
      this.scrollContainerToBottom();
    }
  }

  scrollContainerToBottom = () => {
    const scrollingElement = document.querySelector('.main-listing');
    scrollingElement.scrollTop = scrollingElement.scrollHeight;

    window.scrollTo(0, scrollingElement.scrollHeight);

    return true;
  }

  onMilesModeChange = (event) => {
    const {
      values,
      errors,
      touched,
      setFormikState,
    } = this.props;

    const { value } = event.target;

    const formikState = {
      errors: {
        ...errors,
        mileage: errors.mileage || {},
      },
      touched: {
        ...touched,
        mileage: touched.mileage || {},
      },
      values: {
        ...values,
        mileage: {
          ...values.mileage,
          mode: value,
        },
      },
    };

    if (value === TRIP_FEES.MILEAGE_VALUES.UNLIMITED) {
      formikState.values.mileage.included = DEFAULT_VALUES.MILEAGE.INCLUDED;
      formikState.values.mileage.overage = DEFAULT_VALUES.MILEAGE.OVERAGE;

      delete formikState.errors.mileage;
      delete formikState.touched.mileage;
    }

    setFormikState(formikState);

    return formikState;
  }

  onGeneratorExistenceChange = (isChecked) => {
    const {
      values,
      errors,
      touched,
      setFormikState,
    } = this.props;

    const formikState = {
      errors: {
        ...errors,
        generator: errors.generator || {},
      },
      touched: {
        ...touched,
        generator: touched.generator || {},
      },
      values: {
        ...values,
        generator: {
          ...values.generator,
          hasGenerator: isChecked,
        },
      },
    };

    if (!isChecked) {
      formikState.values.generator.mode = TRIP_FEES.GENERATOR_VALUES.UNLIMITED;
      formikState.values.generator.included = DEFAULT_VALUES.GENERATOR.INCLUDED;
      formikState.values.generator.overage = DEFAULT_VALUES.GENERATOR.OVERAGE;

      delete formikState.errors.generator;
      delete formikState.touched.generator;
    }

    setFormikState(formikState);

    return formikState;
  }

  onGeneratorModeChange = (event) => {
    const {
      values,
      errors,
      touched,
      setFormikState,
    } = this.props;

    const { value } = event.target;

    const formikState = {
      errors: {
        ...errors,
        generator: errors.generator || {},
      },
      touched: {
        ...touched,
        generator: touched.generator || {},
      },
      values: {
        ...values,
        generator: {
          ...values.generator,
          mode: value,
        },
      },
    };

    if (value === TRIP_FEES.GENERATOR_VALUES.UNLIMITED) {
      formikState.values.generator.included = DEFAULT_VALUES.GENERATOR.INCLUDED;
      formikState.values.generator.overage = DEFAULT_VALUES.GENERATOR.OVERAGE;

      delete formikState.errors.generator;
      delete formikState.touched.generator;
    }

    setFormikState(formikState);

    return formikState;
  }

  goBack = () => {
    const {
      router,
      camperId,
      hideModal,
    } = this.props;

    const route = createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.PRICING.PATH, camperId);

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

    const route = createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.PRICING.PATH, camperId);

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
  }

  addCustomFee = () => {
    const { setFieldValue, values } = this.props;

    const id = uuid();

    const customFees = {
      ...values.customFees,
      [id]: {
        id,
        name: '',
        price: '',
        frequency: TRIP_FEES.FREQUENCY_OPTIONS.PER_DAY.VALUE,
      },
    };

    setFieldValue('customFees', customFees);
  }

  removeCustomFeePrepare = (customFee) => () => {
    const {
      showModal,
      hideModal,
      intl: { formatMessage },
    } = this.props;

    showModal({
      modalType: 'REMOVE_SIGNATURE_MODAL',
      modalProps: {
        id: customFee.id,
        title: formatMessage({ id: 'addNewCamper.tripFees.removeModal.title' }),
        subTitle: formatMessage({ id: 'addNewCamper.tripFees.removeModal.subTitle' }),
        cancel: hideModal,
        remove: this.removeCustomFee(customFee),
      },
    });
  }

  removeCustomFee = (customFee) => () => {
    const {
      setFieldValue,
      values,
      deleteCustomTripFee,
      camperId,
      hideModal,
    } = this.props;

    if (customFee.fromServer) {
      deleteCustomTripFee({
        feeId: customFee.id,
        camperId,
      });
    }

    const customFees = R.omit([customFee.id], values.customFees);

    setFieldValue('customFees', customFees);
    if (!customFee.fromServer) {
      hideModal();
    }
  }

  onFrequencyChanged = (feeId) => (value) => {
    const { setFieldValue, values } = this.props;

    const newCustomFeeSection = R.assocPath([feeId, 'frequency'], value, values.customFees);

    setFieldValue('customFees', newCustomFeeSection);
  }

  leavePage = leavePage.bind(this);

  leavePagePrepare = leavePagePrepare.bind(this);

  render() {
    return (
      <TripFeesComponent
        {...this.props}
        onMilesModeChange={this.onMilesModeChange}
        onGeneratorModeChange={this.onGeneratorModeChange}
        onGeneratorExistenceChange={this.onGeneratorExistenceChange}
        onBackButtonClick={this.onBackButtonClick}
        addCustomFee={this.addCustomFee}
        removeCustomFee={this.removeCustomFeePrepare}
        onFrequencyChanged={this.onFrequencyChanged}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
  camper: camperSelector(state, ownProps?.camperId),
  camperCompleteness: camperCompletenessSelector(state, ownProps?.camperId),
  isLoading: loadingSelector(state, createTripFeesEndpoint.endpoint),
});

const mapDispatchToProps = {
  onSubmit: createTripFees,
  deleteCustomTripFee: deleteCustomTripFeeAction,
  showModal: showModalAction,
  hideModal: hideModalAction,
  setLeavePageMethod: setLeavePageMethodAction,
};

export { TripFees as TripFeesContainer };
export default compose(
  attachLayout(AddNewCamperLayout),
  withRouter,
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: TripFees.determineInitialValues,
    validationSchema: yup.object().shape({
      cleaningAndPreparationFee: yup.number().moreThan(-1, { id: 'validations.cantBeValue', values: { value: 'negative' } }),
      mileage: yup.object().shape({
        included: yup.number().when('mode', {
          is: TripFees.isUnlimitedMileageMode,
          then: yup.number(),
          otherwise: yup.number().moreThan(0, { id: 'validations.cantBeValue', values: { value: 0 } }).required(),
        }),
        overage: yup.number().when('mode', {
          is: TripFees.isUnlimitedMileageMode,
          then: yup.number(),
          otherwise: yup.number().moreThan(0, { id: 'validations.cantBeValue', values: { value: 0 } }).required(),
        }),
      }),
      generator: yup.object().shape({
        included: yup.number().when('mode', {
          is: TripFees.isUnlimitedGeneratorMode,
          then: yup.number(),
          otherwise: yup.number().moreThan(0, { id: 'validations.cantBeValue', values: { value: 0 } }).required(),
        }),
        overage: yup.number().when('mode', {
          is: TripFees.isUnlimitedGeneratorMode,
          then: yup.number(),
          otherwise: yup.number().moreThan(0, { id: 'validations.cantBeValue', values: { value: 0 } }).required(),
        }),
      }),
      customFees: yup.lazy(TripFees.getCustomFeeSchema),
    }),
    handleSubmit: handleSubmitWithProps(['camperId']),
  }),
)(TripFees);
