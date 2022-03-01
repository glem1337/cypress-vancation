import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import * as R from 'ramda';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import describeValidationSchema from 'utils/testHelpers/describeValidationSchema';
import mockedCamperPricing from 'views/AddNewCamper/Pricing/__mocks__/mockedCamperPricing';
import mockedSelectedSlots from 'views/Dashboard/Calendar/__mocks__/mockedSelectedSlots';

import BaseDiscountSingle, { BaseDiscountSingleContainer } from '../container';

jest.mock('state/concepts/camper/selectors', () => ({
  camperPricingSelector: jest.fn(() => mockedCamperPricing),
}));

jest.mock('state/concepts/calendar/selectors', () => ({
  selectedSlotsSelector: jest.fn(() => mockedSelectedSlots),
  customBaseDiscountsForSingleDate: jest.fn(() => ({
    weeklyDiscountPercent: null,
    monthlyDiscountPercent: null,
  })),
}));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

jest.mock('formik', () => ({
  withFormik: (config) => (Component) => props => {
    const extended = {
      ...props,
      ...config,
      validationSchema: () => config.validationSchema,
    };

    return <Component {...extended} />;
  },
}));

jest.mock('utils/calendar/withPopovers', () => jest.fn((Component) => (props) => (
  <Component
    {...props}
    isOpened={false}
    isBackPopoverVisible={false}
    isDiscardPopoverVisible={false}
    isSavePopoverVisible={false}
    checkOpenedState={jest.fn()}
    showPopover={jest.fn()}
    showPopoverOrBack={jest.fn()}
    closePopover={jest.fn()}
    closeAllPopovers={jest.fn()}
    closePopoversAndBack={jest.fn()}
    closePopoversAndSave={jest.fn()}
    toggleOpenedState={jest.fn()}
  />
)));

describe('BaseDiscountSingle container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    values: { isOpened: true },
    setFieldValue: jest.fn(),
    isLoading: false,
    isSubmitting: false,
    submitForm: jest.fn(),
    isValid: true,

  };

  let wrapper = null;
  let container = null;
  let instance = null;

  beforeEach(() => {
    wrapper = shallow(<BaseDiscountSingle {...props} />);
    container = diveTo(wrapper, BaseDiscountSingleContainer);
    instance = container.instance();

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('has validation schema', () => {
    expect(describeValidationSchema(wrapper)).toMatchSnapshot();
  });

  it('checks mapPropsToValues configs', () => {
    expect(container.props().mapPropsToValues((container.props()))).toMatchSnapshot();
  });

  it('checks `componentDidUpdate` instance method', () => {
    instance.componentDidUpdate(props);

    expect(instance.props.checkOpenedState).toHaveBeenCalled();
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
});
