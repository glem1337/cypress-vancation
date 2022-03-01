import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { CAMPER_INCLUSION } from 'constants/camper';
import { TYPE_DELIVERY, DELIVERY_DEFAULT_VALUES } from 'constants/mapbox';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import { fetchCamper } from 'state/concepts/camper/actions';
import mockedCamper from 'views/__mocks__/camper';

import Delivery, { DeliveryContainer } from '../container';

jest.mock('utils/redirect', () => jest.fn());

jest.mock('utils/form/isSubmitDisabled', () => jest.fn(() => true));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

jest.mock('state/concepts/camper/selectors', () => ({
  camperSelector: jest.fn(() => mockedCamper),
  isCamperExistSelector: jest.fn(() => true),
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
        camper: 'test id',
      },
      store,
    };

    await DeliveryContainer.getInitialProps(ctx);

    expect(ctx.store.dispatch).toHaveBeenNthCalledWith(
      1,
      fetchCamper(ctx.query.camper, CAMPER_INCLUSION.DELIVERY_INFORMATION),
    );
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
});
