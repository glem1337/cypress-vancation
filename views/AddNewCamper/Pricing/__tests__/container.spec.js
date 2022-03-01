import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import * as R from 'ramda';

import { CAMPER_INCLUSION } from 'constants/camper';
import ROUTES from 'constants/routes';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import { checkPreviousStepCompleteness, fetchCamper } from 'state/concepts/camper/actions';
import { showModal, hideModal } from 'state/modal/actions';
import { dataDeleteEntity } from 'state/data/actions';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import Pricing, { PricingContainer } from '../container';
import mockedCamperPricing from '../__mocks__/mockedCamperPricing';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

jest.mock('state/concepts/camper/selectors', () => ({
  camperPricingSelector: jest.fn(() => mockedCamperPricing),
  isCamperExistSelector: jest.fn(() => true),
  camperCompletenessSelector: jest.fn(() => 44),
  leavePageMethodSelector: jest.fn(() => jest.fn()),
}));

jest.mock('formik', () => ({
  withFormik: (config) => (Component) => props => {
    const extended = {
      ...config,
      ...props,
      validationSchema: () => config.validationSchema,
    };

    return <Component {...extended} />;
  },
}));

describe('Pricing container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();
  store.logicMiddleware = {
    whenComplete: jest.fn(),
  };

  const props = {
    store,
    camperId: 'test id',
    setFormikState: jest.fn(),
    values: {
      costPerNight: 280,
      weeklyDiscountPercent: 280,
      monthlyDiscountPercent: 15,
      costomizialeNightCost: false,
      weeklyDiscount: false,
      monthlyDiscount: false,
      weekNightPrice: {},
    },
    touched: {},
    errors: {},
    router: {
      push: jest.fn(),
    },
    pricingInfo: {},
    dirty: true,
    isValid: true,
    setFieldValue: jest.fn(),
    handleSubmit: jest.fn(),
    validateForm: jest.fn(),
  };

  let wrapper = null;
  let container = null;
  let instance = null;

  beforeEach(() => {
    wrapper = shallow(<Pricing {...props} />, {
      disableLifecycleMethods: false,
    });
    container = diveTo(wrapper, PricingContainer);
    instance = container.instance();
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks mapPropsToValues configs', () => {
    expect(
      container.props().mapPropsToValues(container.props()),
    ).toMatchSnapshot();
  });

  it('checks validationSchema configs', () => {
    expect(container.props().validationSchema).toMatchSnapshot();
  });

  it('checks `getInitialProps` static method', async () => {
    const ctx = {
      store,
      query: {
        camper_id: 'camperId',
      },
    };

    await PricingContainer.getInitialProps(ctx);

    expect(ctx.store.dispatch).toHaveBeenNthCalledWith(
      1,
      dataDeleteEntity({
        kind: 'pricingInfo',
      }),
    );

    const inclusions = [
      CAMPER_INCLUSION.PRICING_INFO.WEEK_NIGHT_PRICE,
      CAMPER_INCLUSION.PRICING_INFO.INDEX,
    ];

    expect(ctx.store.dispatch).toHaveBeenNthCalledWith(
      2,
      fetchCamper(ctx.query.camper_id, inclusions.join(',')),
    );

    expect(ctx.store.dispatch).toHaveBeenNthCalledWith(
      3,
      checkPreviousStepCompleteness({
        key: ROUTES.ADD_NEW_CAMPER.PRICING.KEY,
        camperId: 'camperId',
        ctx,
      }),
    );

    expect(store.logicMiddleware.whenComplete).toHaveBeenCalled();
  });

  describe('checks `onCustomizableNightCostChange` instance method', () => {
    it('when is checked', () => {
      const isChecked = true;

      const res = instance.onCustomizableNightCostChange(isChecked);

      expect(res.values.costomizialeNightCost).toBe(isChecked);
      expect(props.setFormikState).toHaveBeenCalledWith(res);
    });

    it('when is not checked', () => {
      const isChecked = false;

      const res = instance.onCustomizableNightCostChange(isChecked);

      expect(res.values.costomizialeNightCost).toBe(isChecked);
      expect(res.values.weekNightPrice).toEqual(
        mockedCamperPricing.weekNightPrice,
      );
      expect(props.setFormikState).toHaveBeenCalledWith(res);
    });
  });

  describe('checks `onWeeklyDiscountChange` instance method', () => {
    it('when is checked', () => {
      const isChecked = true;

      const res = instance.onWeeklyDiscountChange(isChecked);

      expect(res.values.weeklyDiscount).toBe(isChecked);
      expect(props.setFormikState).toHaveBeenCalledWith(res);
    });

    it('when is not checked', () => {
      const isChecked = false;

      const res = instance.onWeeklyDiscountChange(isChecked);

      expect(res.values.weeklyDiscount).toBe(isChecked);
      expect(res.values.weeklyDiscountPercent).toEqual(
        mockedCamperPricing.weeklyDiscountPercent,
      );
      expect(props.setFormikState).toHaveBeenCalledWith(res);
    });
  });

  describe('checks `onMonthlyDiscountChange` instance method', () => {
    it('when is checked', () => {
      const isChecked = true;

      const res = instance.onMonthlyDiscountChange(isChecked);

      expect(res.values.monthlyDiscount).toBe(isChecked);
      expect(props.setFormikState).toHaveBeenCalledWith(res);
    });

    it('when is not checked', () => {
      const isChecked = false;

      const res = instance.onMonthlyDiscountChange(isChecked);

      expect(res.values.monthlyDiscount).toBe(isChecked);
      expect(res.values.monthlyDiscountPercent).toEqual(
        mockedCamperPricing.monthlyDiscountPercent,
      );
      expect(props.setFormikState).toHaveBeenCalledWith(res);
    });
  });

  it('tests `weekCost` instance getter', () => {
    const {
      values: { costPerNight, customizableNightCost, weekNightPrice },
    } = props;

    const expected = customizableNightCost
      ? R.compose(R.sum, R.values)(weekNightPrice)
      : costPerNight * 7;

    expect(instance.weekCost).toEqual(expected);
  });

  it('tests `weeklyDiscountPercentPrice` instance getter', () => {
    const {
      values: { weeklyDiscountPercent },
    } = props;

    const expected = Math.round(
      (instance.weekCost / 100) * weeklyDiscountPercent,
    );

    expect(instance.weeklyDiscountPercentPrice).toEqual(expected);
  });

  it('tests `monthlyDiscountPercentPrice` instance getter', () => {
    const {
      values: { monthlyDiscountPercent },
    } = props;

    const monthCost = instance.weekCost * 4;

    const expected = Math.round((monthCost / 100) * monthlyDiscountPercent);

    expect(instance.monthlyDiscountPercentPrice).toEqual(expected);
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
      createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.DELIVERY.PATH, props.camperId),
    );

    expect(store.dispatch).toHaveBeenCalledWith(
      hideModal(),
    );
  });

  it('tests `saveAndGoBack` instance method', async () => {
    await instance.saveAndGoBack();

    const route = createRouteFromPathname(
      ROUTES.ADD_NEW_CAMPER.DELIVERY.PATH,
      props.camperId,
    );

    expect(store.dispatch).toHaveBeenCalledWith(hideModal());
    expect(props.setFieldValue).toHaveBeenCalledWith('redirectRoute', route);
    expect(props.handleSubmit).toHaveBeenCalled();
  });
});
