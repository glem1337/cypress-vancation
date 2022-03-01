import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { compose } from 'ramda';
import { v4 as uuid } from 'uuid';
import { connect } from 'react-redux';
import yup from 'lib/yupLocalised';
import { withRouter } from 'next/router';

import { handleSubmitWithProps } from 'utils/form/handleSubmit';
import isPresent from 'utils/isPresent';
import { createRouteFromPathname } from 'utils/createRouteHelper';
import { leavePagePrepare } from 'utils/camper/leavePageHelper';

import ROUTES from 'constants/routes';
import {
  AMENITIES_VALIDATION_SCHEMA,
  CAMPER_AMENITIES_CONFIG,
  CAMPER_AMENITIES_INCLUSIONS,
  FETCH_CAMPER_AMENITIES_INCLUSIONS,
} from 'constants/camperAmenities';
import { CAMPER_INCLUSION } from 'constants/camper';

import {
  fetchCamperAmenities,
  fetchCamper,
  createCamperAmenityHealthSafeties,
} from 'state/concepts/camper/actions';
import { fetchHealthAndSafetyConfig } from 'state/concepts/health-and-safety/actions';
import { loadingSelector } from 'state/data/selectors';
import {
  camperPossibleAmenitiesSelector,
  isCamperExistSelector,
} from 'state/concepts/camper/selectors';
import { amenityHealthAndSafetyItemsSelector } from 'state/concepts/health-and-safety/selectors';
import {
  createCamperAmenitiesEndpoint,
  createCamperAmenityHealthSafetiesEndpoint,
} from 'state/concepts/camper/endpoints';

import {
  hideModal as hideModalAction,
  showModal as showModalAction,
} from 'state/modal/actions';

import { dataDeleteEntity } from 'state/data/actions';

import { MESSAGE_TYPE } from 'state/flash-messages/messagesTypes';
import { showMessage } from 'state/flash-messages/actions';

import AmenitiesComponent from './component';

class Amenities extends React.Component {
  static defaultProps = {
    isLoadingAmenities: false,
    isLoadingHealthSafeties: false,
  };

  static propTypes = {
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    camperId: PropTypes.string.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    setFormikState: PropTypes.func.isRequired,
    showMessage: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    isValid: PropTypes.bool.isRequired,
    values: PropTypes.shape().isRequired,
    errors: PropTypes.shape().isRequired,
    touched: PropTypes.shape().isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isLoadingAmenities: PropTypes.bool,
    isLoadingHealthSafeties: PropTypes.bool,
  };

  leavePage = (withSaving, redirectRoute) => async () => {
    const { hideModal, setFieldValue, router } = this.props;

    if (withSaving) {
      await setFieldValue('redirectRoute', redirectRoute);

      await this.handleValidateOnSubmit();
    } else {
      router.push(redirectRoute);
    }

    hideModal();
  };

  leavePagePrepare = leavePagePrepare.bind(this);

  static getInitialProps = async (ctx) => {
    const camperId = ctx.query.camper;

    ctx.store.dispatch(
      dataDeleteEntity({
        kind: 'amenity',
      }),
    );

    ctx.store.dispatch(
      dataDeleteEntity({
        kind: 'amenityHealthSafetyItem',
      }),
    );

    ctx.store.dispatch(
      fetchCamperAmenities(FETCH_CAMPER_AMENITIES_INCLUSIONS.join(',')),
    );

    const camperInclusions = [
      ...CAMPER_AMENITIES_INCLUSIONS,
      CAMPER_INCLUSION.CAMPER_ADDITION.AMENITY_HEALTH_SAFETY_ITEMS,
    ];

    ctx.store.dispatch(fetchCamper(camperId, camperInclusions.join(',')));
    ctx.store.dispatch(fetchHealthAndSafetyConfig());

    return { camperId };
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

  handleValidateOnSubmit = async () => {
    const { values, handleSubmit, setFieldValue, camperId } = this.props;

    let isValid = true;

    values.amenities.forEach((amenity) => {
      if (amenity.title === CAMPER_AMENITIES_CONFIG.ACCOMMODATION_TITLE) {
        const filtered = amenity.configurationSubAmenities.filter(
          (subAmenity) => isPresent(subAmenity.state) && subAmenity.state,
        );

        if (filtered.length === 0) {
          this.props.showMessage({
            messageSubTitle: {
              id: 'addNewCamper.amenities.accommodationRequired',
            },
            messageType: MESSAGE_TYPE.WARN,
          });

          isValid = false;
        }
      }

      amenity.configurationAmenityOptions?.forEach((option) => {
        if (option.state && option.configurationSubAmenities.length > 0) {
          const result = option.configurationSubAmenities.filter(
            (subAmenity) => subAmenity.state,
          );
          if (result.length === 0) {
            this.props.showMessage({
              messageSubTitle: {
                id: 'addNewCamper.amenities.amenityRequired',
              },
              messageType: MESSAGE_TYPE.WARN,
            });

            isValid = false;
          }
        }
      });
    });

    if (!values.redirectRoute) {
      const route = createRouteFromPathname(
        ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.SPECIFICATIONS.PATH,
        null,
        { camper: camperId },
      );

      await setFieldValue('redirectRoute', route);
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

  get isLoading() {
    const { isLoadingAmenities, isLoadingHealthSafeties } = this.props;

    return isLoadingAmenities || isLoadingHealthSafeties;
  }

  render() {
    return (
      <AmenitiesComponent
        {...this.props}
        isLoading={this.isLoading}
        handleValidateOnSubmit={this.handleValidateOnSubmit}
        onMaxAccommodationQuantityCallback={
          this.onMaxAccommodationQuantityCallback
        }
        onMaxCustomAccommodationQuantityCallback={
          this.onMaxCustomAccommodationQuantityCallback
        }
        removeCustomAccommodation={this.removeCustomAccommodation}
        addCustomAccommodation={this.addCustomAccommodation}
        handleSwitchChange={this.handleSwitchChange}
        leavePagePrepare={this.leavePagePrepare}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  amenities: camperPossibleAmenitiesSelector(state),
  isLoadingAmenities: loadingSelector(
    state,
    createCamperAmenitiesEndpoint.endpoint,
  ),
  isLoadingHealthSafeties: loadingSelector(
    state,
    createCamperAmenityHealthSafetiesEndpoint.endpoint,
  ),
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
  amenityHealthSafetyItems: amenityHealthAndSafetyItemsSelector(state),
});

const mapDispatchToProps = {
  onSubmit: createCamperAmenityHealthSafeties,
  showMessage,
  showModal: showModalAction,
  hideModal: hideModalAction,
};

export { Amenities as AmenitiesContainer };
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ amenities, amenityHealthSafetyItems }) => ({
      amenities,
      amenityHealthSafetyItems,
    }),
    validationSchema: yup.object().shape({
      amenities: AMENITIES_VALIDATION_SCHEMA,
    }),
    handleSubmit: handleSubmitWithProps(['camperId']),
  }),
  withRouter,
)(Amenities);
