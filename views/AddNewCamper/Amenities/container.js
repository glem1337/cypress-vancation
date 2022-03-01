import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { withRouter } from 'next/router';
import { compose } from 'ramda';
import { v4 as uuid } from 'uuid';
import { connect } from 'react-redux';
import yup from 'lib/yupLocalised';

import { createRouteFromPathname } from 'utils/createRouteHelper';
import { handleSubmitWithProps } from 'utils/form/handleSubmit';
import isPresent from 'utils/isPresent';
import { leavePagePrepare } from 'utils/camper/leavePageHelper';

import ROUTES from 'constants/routes';
import {
  AMENITIES_VALIDATION_SCHEMA,
  CAMPER_AMENITIES_CONFIG,
  CAMPER_AMENITIES_INCLUSIONS,
  FETCH_CAMPER_AMENITIES_INCLUSIONS,
} from 'constants/camperAmenities';

import {
  checkPreviousStepCompleteness,
  createCamperAmenities,
  fetchCamperAmenities,
  fetchCamper,
  setLeavePageMethod as setLeavePageMethodAction,
} from 'state/concepts/camper/actions';
import { loadingSelector } from 'state/data/selectors';
import {
  camperPossibleAmenitiesSelector,
  camperCompletenessSelector,
  isCamperExistSelector,
} from 'state/concepts/camper/selectors';
import { createCamperAmenitiesEndpoint } from 'state/concepts/camper/endpoints';

import {
  hideModal as hideModalAction,
  showModal as showModalAction,
} from 'state/modal/actions';

import { MESSAGE_TYPE } from 'state/flash-messages/messagesTypes';
import { showMessage } from 'state/flash-messages/actions';

import attachLayout from 'views/layouts/attachLayout';
import AddNewCamperLayout from 'views/layouts/AddNewCamper';

import AmenitiesComponent from './component';

class Amenities extends React.Component {
  static propTypes = {
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    camperId: PropTypes.string.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    setFormikState: PropTypes.func.isRequired,
    showMessage: PropTypes.func.isRequired,
    dirty: PropTypes.bool.isRequired,
    showModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    isValid: PropTypes.bool.isRequired,
    values: PropTypes.shape().isRequired,
    errors: PropTypes.shape().isRequired,
    touched: PropTypes.shape().isRequired,
    validateForm: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    setLeavePageMethod: PropTypes.func.isRequired,
  };

  static getInitialProps = async (ctx) => {
    const camperId = ctx.query.camper_id;

    ctx.store.dispatch(
      fetchCamperAmenities(FETCH_CAMPER_AMENITIES_INCLUSIONS.join(',')),
    );
    ctx.store.dispatch(
      fetchCamper(camperId, CAMPER_AMENITIES_INCLUSIONS.join(',')),
    );

    await ctx.store.logicMiddleware.whenComplete();

    ctx.store.dispatch(
      checkPreviousStepCompleteness({
        key: ROUTES.ADD_NEW_CAMPER.AMENITIES.KEY,
        camperId,
        ctx,
      }),
    );

    return { camperId };
  };

  constructor(props) {
    super(props);

    props.setLeavePageMethod(this.leavePagePrepare);
  }

  leavePage = (withSaving, redirectRoute) => async () => {
    const { hideModal, setFieldValue, router } = this.props;

    if (withSaving) {
      await setFieldValue('redirectRoute', redirectRoute);

      this.handleValidateOnSubmit();
    } else {
      router.push(redirectRoute);
    }

    hideModal();
  };

  leavePagePrepare = leavePagePrepare.bind(this);

  goBack = () => {
    const { router, camperId, hideModal } = this.props;

    const route = createRouteFromPathname(
      ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.PATH,
      camperId,
    );

    router.push(route);

    hideModal();
  };

  saveAndGoBack = async () => {
    const { camperId, setFieldValue, hideModal } = this.props;

    const route = createRouteFromPathname(
      ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.PATH,
      camperId,
    );

    await setFieldValue('redirectRoute', route);

    hideModal();

    this.handleValidateOnSubmit();
  };

  onBackButtonClick = async () => {
    await this.props.validateForm();

    const { dirty, showModal, isValid } = this.props;

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

  addCustomAccommodation = (amenityIndex) => () => {
    const { setFieldValue, values } = this.props;

    const id = uuid();

    const amenities = [...values.amenities];

    amenities[amenityIndex].configurationCustomAmenities = amenities[amenityIndex]
      .configurationCustomAmenities || [];

    if (
      amenities[amenityIndex].configurationCustomAmenities.length
      === CAMPER_AMENITIES_CONFIG.MAX_CUSTOM_ACCOMMODATIONS
    ) {
      this.props.showMessage({
        messageSubTitle: {
          id: 'validations.maxAllowedNumber',
        },
        messageType: MESSAGE_TYPE.WARN,
      });

      return;
    }

    amenities[amenityIndex].configurationCustomAmenities.push({
      id,
      name: '',
      quantity: 1,
    });

    setFieldValue('amenities', amenities);
  };

  removeCustomAccommodation =
    ({ amenityIndex, index }) => () => {
      const { setFieldValue, values } = this.props;

      const amenities = [...values.amenities];
      amenities[amenityIndex].configurationCustomAmenities.splice(index, 1);

      setFieldValue('amenities', amenities);
    };

  handleSwitchChange =
    ({ amenityIndex, optionIndex }) => (isChecked) => {
      if (isChecked) return;

      const { values, errors, touched, setFormikState } = this.props;

      const { configurationSubAmenities } = values.amenities[amenityIndex]
        .configurationAmenityOptions[optionIndex];

      configurationSubAmenities.forEach((_, index) => {
        configurationSubAmenities[index].state = false;
      });

      const formikState = {
        errors,
        touched,
        values,
      };

      formikState.values.amenities[amenityIndex].configurationAmenityOptions[
        optionIndex
      ].configurationSubAmenities = configurationSubAmenities;

      setFormikState(formikState);
    };

  get validateState() {
    const { values } = this.props;

    const isValidMap = {
      accommodationsValid: false,
      amenitiesValid: true,
    };

    values.amenities.forEach((amenity) => {
      if (amenity.title === CAMPER_AMENITIES_CONFIG.ACCOMMODATION_TITLE) {
        const filtered = amenity.configurationSubAmenities.filter(
          (subAmenity) => isPresent(subAmenity.state) && subAmenity.state,
        );

        isValidMap.accommodationsValid = filtered.length >= 1;
      }

      amenity.configurationAmenityOptions?.forEach((option) => {
        if (option.state && option.configurationSubAmenities.length > 0) {
          const filtered = option.configurationSubAmenities.filter(
            (subAmenity) => subAmenity.state,
          );

          isValidMap.amenitiesValid = filtered.length >= 1;
        }
      });
    });

    return isValidMap;
  }

  handleValidateOnSubmit = () => {
    const { handleSubmit } = this.props;
    const { accommodationsValid, amenitiesValid } = this.validateState;

    const isValid = accommodationsValid && amenitiesValid;

    if (!accommodationsValid) {
      this.props.showMessage({
        messageSubTitle: {
          id: 'addNewCamper.amenities.accommodationRequired',
        },
        messageType: MESSAGE_TYPE.WARN,
      });
    }

    if (!amenitiesValid) {
      this.props.showMessage({
        messageSubTitle: {
          id: 'addNewCamper.amenities.amenityRequired',
        },
        messageType: MESSAGE_TYPE.WARN,
      });
    }

    if (isValid) {
      handleSubmit();
    }

    return isValid;
  };

  onMaxAccommodationQuantityCallback = () => {
    this.props.showMessage({
      messageSubTitle: {
        id: 'addNewCamper.amenities.maxAccommodationNumber',
      },
      messageType: MESSAGE_TYPE.WARN,
    });
  };

  onMaxCustomAccommodationQuantityCallback = () => {
    this.props.showMessage({
      messageSubTitle: {
        id: 'validations.maxAllowedNumber',
      },
      messageType: MESSAGE_TYPE.WARN,
    });
  };

  render() {
    return (
      <AmenitiesComponent
        {...this.props}
        validateState={this.validateState}
        handleValidateOnSubmit={this.handleValidateOnSubmit}
        onMaxAccommodationQuantityCallback={
          this.onMaxAccommodationQuantityCallback
        }
        onMaxCustomAccommodationQuantityCallback={
          this.onMaxCustomAccommodationQuantityCallback
        }
        onBackButtonClick={this.onBackButtonClick}
        removeCustomAccommodation={this.removeCustomAccommodation}
        addCustomAccommodation={this.addCustomAccommodation}
        handleSwitchChange={this.handleSwitchChange}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  amenities: camperPossibleAmenitiesSelector(state),
  isLoading: loadingSelector(state, createCamperAmenitiesEndpoint.endpoint),
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
  camperCompleteness: camperCompletenessSelector(state, ownProps?.camperId),
});

const mapDispatchToProps = {
  onSubmit: createCamperAmenities,
  setLeavePageMethod: setLeavePageMethodAction,
  showMessage,
  showModal: showModalAction,
  hideModal: hideModalAction,
};

export { Amenities as AmenitiesContainer };
export default compose(
  attachLayout(AddNewCamperLayout),
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    mapPropsToValues: ({ amenities }) => ({
      amenities,
    }),
    validationSchema: yup.object().shape({
      amenities: AMENITIES_VALIDATION_SCHEMA,
    }),
    handleSubmit: handleSubmitWithProps(['camperId']),
  }),
  withRouter,
)(Amenities);
