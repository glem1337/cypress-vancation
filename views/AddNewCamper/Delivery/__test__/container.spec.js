import React from 'react';
import { shallow } from 'enzyme';
import * as R from 'ramda';
import ROUTES from 'constants/routes';
import configureStore from 'redux-mock-store';

import { TYPE_DELIVERY, DELIVERY_DEFAULT_VALUES } from 'constants/mapbox';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import {
  checkPreviousStepCompleteness,
  createCamperDeliveryAction,
  updateCamperDeliveryAction,
  fetchCamper,
} from 'state/concepts/camper/actions';
import {
  showModal,
  hideModal,
} from 'state/modal/actions';
import { createRouteFromPathname } from 'utils/createRouteHelper';
import redirect from 'utils/redirect';
import mockedCamper from 'views/__mocks__/camper';

import Delivery, { DeliveryContainer } from '../container';

jest.mock('utils/redirect', () => jest.fn());

jest.mock('utils/form/isSubmitDisabled', () => jest.fn(() => true));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

jest.mock('state/concepts/camper/selectors', () => ({
  camperSelector: jest.fn(() => mockedCamper),
  camperCompletenessSelector: jest.fn(() => 22),
  isCamperExistSelector: jest.fn(() => true),
  leavePageMethodSelector: jest.fn(() => jest.fn()),
}));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock('formik', () => ({
  withFormik: (config) => (Component) => props => {
    const extended = {
      ...config,
      ...props,
    };

    return <Component {...extended} />;
  },
}));

describe('Map Container', () => {
  let container;
  let wrapper;
  let instance;

  const store = configureStore()({});
  store.dispatch = jest.fn();
  store.logicMiddleware = {
    whenComplete: jest.fn(),
  };

  const props = {
    camperId: mockedCamper.id,
    store,
    router: {
      push: jest.fn(),
    },
    setValues: jest.fn(),
    setSubmitting: jest.fn(),
    setStatus: jest.fn(),
    setErrors: jest.fn(),
    resetForm: jest.fn(),
    createCamperDelivery: jest.fn(),
    updateCamperDelivery: jest.fn(),
    values: DELIVERY_DEFAULT_VALUES,
    validateForm: jest.fn(),
    dirty: true,
    isValid: true,
    setFieldValue: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<Delivery {...props} />);
    container = diveTo(wrapper, DeliveryContainer);
    instance = container.instance();

    jest.clearAllMocks();
  });

  it('tests "getInitialProps" static method', async () => {
    const ctx = {
      query: {
        camper_id: 'test id',
      },
      store,
    };

    await DeliveryContainer.getInitialProps(ctx);

    expect(ctx.store.dispatch).toHaveBeenNthCalledWith(
      1,
      fetchCamper(ctx.query.camper_id, 'delivery_information'),
    );

    expect(ctx.store.dispatch).toHaveBeenNthCalledWith(
      2,
      checkPreviousStepCompleteness({
        key: ROUTES.ADD_NEW_CAMPER.DELIVERY.KEY,
        camperId: ctx.query.camper_id,
        ctx,
      }),
    );

    expect(store.logicMiddleware.whenComplete).toHaveBeenCalled();
  });

  it('snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks mapPropsToValues configs', () => {
    expect(container.props().mapPropsToValues((container.props()))).toMatchSnapshot();
  });

  it('checks validationSchema configs', () => {
    expect(container.props().validationSchema).toMatchSnapshot();
  });

  it('tests "submitData" instance getter', () => {
    const { camperId } = container.props();

    const result = R.compose(
      R.append({ camperId }),
      R.props(['values', 'setErrors', 'setSubmitting', 'resetForm', 'setErrors', 'setValues']),
    )(container.props());

    expect(instance.submitData).toEqual(result);
  });

  it('tests "isLoading" instance getter', () => {
    expect(instance.isLoading).toEqual(false);
  });

  describe('tests "handlerPickup" instance method', () => {
    it('value = false', () => {
      instance.handlerPickup(false);

      const values = {
        pickup: false,
        rate: DELIVERY_DEFAULT_VALUES.rate,
        distance: DELIVERY_DEFAULT_VALUES.distance,
        costPerMile: DELIVERY_DEFAULT_VALUES.costPerMile,
        minFee: DELIVERY_DEFAULT_VALUES.minFee,
      };

      expect(props.setValues).toHaveBeenCalledTimes(1);
      expect(props.setValues).toHaveBeenCalledWith({
        ...props.values,
        ...values,
      });
    });

    it('value = true', () => {
      instance.handlerPickup(true);
      const values = { pickup: true };

      expect(props.setValues).toHaveBeenCalledTimes(1);
      expect(props.setValues).toHaveBeenCalledWith({
        ...props.values,
        ...values,
      });
    });
  });

  describe('tests "handlerRate" instance method', () => {
    it('value = rates', () => {
      const e = { target: { value: TYPE_DELIVERY[1] } };
      const values = { rate: e.target.value };

      instance.handlerRate(e);

      expect(props.setValues).toHaveBeenCalledTimes(1);
      expect(props.setValues).toHaveBeenCalledWith({
        ...props.values,
        ...values,
      });
    });

    it('value = free', () => {
      const e = { target: { value: TYPE_DELIVERY[0] } };
      const values = {
        rate: e.target.value,
        costPerMile: DELIVERY_DEFAULT_VALUES.costPerMile,
        minFee: DELIVERY_DEFAULT_VALUES.minFee,
      };

      instance.handlerRate(e);

      expect(props.setValues).toHaveBeenCalledTimes(1);
      expect(props.setValues).toHaveBeenCalledWith({
        ...props.values,
        ...values,
      });
    });
  });

  describe('tests "handleSubmit" instance method', () => {
    it('deliveryInformation is not empty', () => {
      instance.handleSubmit();

      const { camperId } = container.props();

      const result = R.compose(
        R.append({ camperId }),
        R.props(['values', 'setErrors', 'setSubmitting', 'resetForm', 'setErrors', 'setValues']),
      )(container.props());

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(updateCamperDeliveryAction(...result));
    });

    it('deliveryInformation is empty', () => {
      container.setProps({
        camper: {
          ...mockedCamper,
          deliveryInformation: null,
        },
      });

      instance.handleSubmit();

      const result = R.compose(
        R.append({ camperId: props.camperId }),
        R.props(['values', 'setErrors', 'setSubmitting', 'resetForm', 'setErrors', 'setValues']),
      )(container.props());

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(createCamperDeliveryAction(...result));
    });

    it('when is not valid', () => {
      container.setProps({
        isValid: false,
      });

      const res = instance.handleSubmit();

      expect(res).toBe(false);
    });
  });

  describe('tests `onBackButtonClick` instance method', () => {
    it('when form is valid', async () => {
      await instance.onBackButtonClick();

      expect(props.validateForm).toHaveBeenCalled();

      expect(store.dispatch).toHaveBeenCalledWith(
        showModal({
          modalType: 'LEAVE_PAGE_MODAL',
          modalProps: {
            discard: instance.goBack,
            save: instance.saveAndGoBack,
          },
        }),
      );
    });

    it('when form is not valid', async () => {
      container.setProps({
        isValid: false,
      });

      const goBackSpy = jest.spyOn(instance, 'goBack').mockImplementationOnce(() => jest.fn());

      await instance.onBackButtonClick();

      expect(props.validateForm).toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
      expect(goBackSpy).toHaveBeenCalled();
    });
  });

  it('tests `goBack` instance method', async () => {
    instance.goBack();

    expect(props.router.push).toHaveBeenCalledWith(
      createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.LISTING_PHOTOS.PATH, props.camperId),
    );

    expect(store.dispatch).toHaveBeenCalledWith(
      hideModal(),
    );
  });

  it('tests `saveAndGoBack` instance method', async () => {
    const handleSubmitSpy = jest.spyOn(instance, 'handleSubmit').mockImplementationOnce(() => jest.fn());

    await instance.saveAndGoBack();

    const route = createRouteFromPathname(
      ROUTES.ADD_NEW_CAMPER.LISTING_PHOTOS.PATH,
      props.camperId,
    );

    expect(store.dispatch).toHaveBeenCalledWith(hideModal());
    expect(props.setFieldValue).toHaveBeenCalledWith('redirectRoute', route);
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  describe('tests `leavePage` instance method', () => {
    it('with saving', async () => {
      const handleSubmitSpy = jest.spyOn(instance, 'handleSubmit');

      await instance.leavePage(true, 'test')();

      expect(props.setFieldValue).toHaveBeenCalledWith('redirectRoute', 'test');
      expect(handleSubmitSpy).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(hideModal());
    });

    it('without saving', async () => {
      const handleSubmitSpy = jest.spyOn(instance, 'handleSubmit');

      await instance.leavePage(false, 'test')();

      expect(props.setFieldValue).not.toHaveBeenCalled();
      expect(handleSubmitSpy).not.toHaveBeenCalled();
      expect(redirect).toHaveBeenCalledWith('test');
      expect(store.dispatch).toHaveBeenCalledWith(hideModal());
    });
  });
});
