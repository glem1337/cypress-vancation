import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import yup from 'lib/yupLocalised';
import { withRouter } from 'next/router';

import {
  CUSTOM_DESCRIPTION_MAX_TEXT_LENGTH,
  DESCRIPTION_MAX_TEXT_LENGTH,
  MAX_AMOUNT_VALIDATIONS,
  PRICE_MAX_VALUE,
  PRICE_UNIT_TYPES,
} from 'constants/dashboardAddons';
import { CAMPER_INCLUSION } from 'constants/camper';

import { handleSubmitWithProps } from 'utils/form/handleSubmit';
import { leavePage, leavePagePrepare } from 'utils/camper/leavePageHelper';

import { fetchTravelAccessoriesConfig } from 'state/concepts/travel-accessories/actions';
import { travelAccessoriesSelector } from 'state/concepts/travel-accessories/selectors';

import {
  showModal as showModalAction,
  hideModal as hideModalAction,
} from 'state/modal/actions';

import {
  createCamperTravelAccessories,
  fetchCamper,
} from 'state/concepts/camper/actions';
import {
  camperSelector,
  isCamperExistSelector,
} from 'state/concepts/camper/selectors';
import { createCamperTravelAccessoriesEndpoint } from 'state/concepts/camper/endpoints';

import { loadingSelector } from 'state/data/selectors';

import AddonsComponent from './component';

class Addons extends React.Component {
  static propTypes = {
    camperId: PropTypes.string.isRequired,
    values: PropTypes.shape().isRequired,
    setFieldValue: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
  };

  leavePage = leavePage.bind(this);

  leavePagePrepare = leavePagePrepare.bind(this);

  static getInitialProps = async (ctx) => {
    const camperId = ctx.query.camper;

    ctx.store.dispatch(fetchTravelAccessoriesConfig());

    const inclusions = [
      CAMPER_INCLUSION.CAMPER_ADDITION.CAMPER_TRAVEL_ACCESSORIES,
      CAMPER_INCLUSION.CAMPER_ADDITION.CUSTOM_TRAVEL_ACCESSORIES,
    ];

    ctx.store.dispatch(fetchCamper(camperId, inclusions.join(',')));

    return { camperId };
  };

  removeCustomAddon = async (index) => {
    const { setFieldValue, values, hideModal } = this.props;

    const customAddons = values.customAddons.filter((_, idx) => idx !== index);

    await setFieldValue('customAddons', customAddons);

    hideModal();
  };

  onRemoveCustomAddon =
    ({ index, addonId }) => () => {
      const { showModal, camperId } = this.props;

      showModal({
        modalType: 'REMOVE_CUSTOM_ADDON_MODAL',
        modalProps: {
          onRemove: this.removeCustomAddon,
          index,
          camperId,
          addonId,
        },
      });
    };

  onAddCustomAddon = () => {
    const { setFieldValue, values } = this.props;

    const customAddons = [
      ...values.customAddons,
      {
        listId: uuid(),
        id: null,
        active: true,
        name: '',
        price: undefined,
        description: '',
        maxAmount: undefined,
        priceUnit: PRICE_UNIT_TYPES.EACH,
      },
    ];

    setFieldValue('customAddons', customAddons);
  };

  render() {
    return (
      <AddonsComponent
        {...this.props}
        onAddCustomAddon={this.onAddCustomAddon}
        onRemoveCustomAddon={this.onRemoveCustomAddon}
        leavePagePrepare={this.leavePagePrepare}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  addons: travelAccessoriesSelector(state, ownProps?.camperId),
  camper: camperSelector(state, ownProps?.camperId),
  isLoading: loadingSelector(
    state,
    createCamperTravelAccessoriesEndpoint.endpoint,
  ),
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
});

const mapDispatchToProps = {
  onSubmit: createCamperTravelAccessories,
  showModal: showModalAction,
  hideModal: hideModalAction,
};

export { Addons as AddonsContainer };
export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ addons, camper }) => ({
      addons,
      customAddons: R.pathOr(
        [],
        ['camperAddition', 'customTravelAccessories'],
        camper,
      ),
    }),
    validationSchema: yup.object().shape({
      addons: yup.array().of(
        yup.object().shape({
          active: yup.boolean(),
          description: yup.string().when('active', {
            is: true,
            then: yup
              .string()
              .max(DESCRIPTION_MAX_TEXT_LENGTH, {
                id: 'validations.max',
                values: {
                  pref: 'Description',
                  value: DESCRIPTION_MAX_TEXT_LENGTH,
                },
              })
              .required(),
          }),
          price: yup.number().when('active', {
            is: true,
            then: yup
              .number()
              .min(0, {
                id: 'validations.min',
                values: {
                  pref: 'Price',
                  value: '$0',
                },
              })
              .max(PRICE_MAX_VALUE, {
                id: 'validations.max',
                values: {
                  pref: 'Price',
                  value: `$${PRICE_MAX_VALUE}`,
                },
              })
              .required(),
          }),
          maxAmount: yup.number().when('active', {
            is: true,
            then: yup
              .number()
              .min(MAX_AMOUNT_VALIDATIONS.MIN, {
                id: 'validations.min',
                values: {
                  pref: 'Max quantity',
                  value: MAX_AMOUNT_VALIDATIONS.MIN,
                },
              })
              .max(MAX_AMOUNT_VALIDATIONS.MAX, {
                id: 'validations.max',
                values: {
                  pref: 'Max quantity',
                  value: MAX_AMOUNT_VALIDATIONS.MAX,
                },
              })
              .required(),
          }),
        }),
      ),
      customAddons: yup.array().of(
        yup.object().shape({
          name: yup
            .string()
            .max(DESCRIPTION_MAX_TEXT_LENGTH, {
              id: 'validations.max',
              values: {
                pref: 'Add-on name',
                value: DESCRIPTION_MAX_TEXT_LENGTH,
              },
            })
            .required(),
          description: yup.string().max(CUSTOM_DESCRIPTION_MAX_TEXT_LENGTH, {
            id: 'validations.max',
            values: {
              pref: 'Description',
              value: CUSTOM_DESCRIPTION_MAX_TEXT_LENGTH,
            },
          }),
          price: yup
            .number()
            .min(0, {
              id: 'validations.min',
              values: {
                pref: 'Price',
                value: '$0',
              },
            })
            .max(PRICE_MAX_VALUE, {
              id: 'validations.max',
              values: {
                pref: 'Price',
                value: `$${PRICE_MAX_VALUE}`,
              },
            })
            .required(),
          maxAmount: yup
            .number()
            .min(MAX_AMOUNT_VALIDATIONS.MIN, {
              id: 'validations.min',
              values: {
                pref: 'Max quantity',
                value: MAX_AMOUNT_VALIDATIONS.MIN,
              },
            })
            .max(MAX_AMOUNT_VALIDATIONS.MAX, {
              id: 'validations.max',
              values: {
                pref: 'Max quantity',
                value: MAX_AMOUNT_VALIDATIONS.MAX,
              },
            })
            .required(),
        }),
      ),
    }),
    handleSubmit: handleSubmitWithProps(['camperId']),
  }),
  withRouter,
)(Addons);
