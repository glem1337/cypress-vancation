import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import describeValidationSchema from 'utils/testHelpers/describeValidationSchema';
import mockedCamperPricing from 'views/AddNewCamper/Pricing/__mocks__/mockedCamperPricing';
import mockedSelectedSlots from 'views/Dashboard/Calendar/__mocks__/mockedSelectedSlots';

import NightlyRateSingle, { NightlyRateSingleContainer } from '../container';

jest.mock('state/concepts/camper/selectors', () => ({
  camperPricingSelector: jest.fn(() => mockedCamperPricing),
}));

jest.mock('state/concepts/calendar/selectors', () => ({
  selectedSlotsSelector: jest.fn(() => mockedSelectedSlots),
  customNightRateForSingleDate: jest.fn(() => 123),
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

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
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

const layoutContainer = (props) => {
  const wrapper = shallow(<NightlyRateSingle {...props} />, { disableLifecycleMethods: true });
  const container = diveTo(wrapper, NightlyRateSingleContainer);
  const instance = container.instance();

  return {
    wrapper,
    container,
    instance,
  };
};

describe('NightlyRateSingle container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    setFormikState: jest.fn(),
    setValues: jest.fn(),
    setFieldValue: jest.fn(),
    values: {
      isOpened: true,
      costPerNight: 22,
      isCustomCost: true,
      weeklyPrice: 23,
    },
    submitForm: jest.fn(),
    isValid: true,
  };

  let wrapper = null;
  let container = null;
  let instance = null;

  beforeEach(() => {
    ({
      wrapper,
      container,
      instance,
    } = layoutContainer(props));

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

  describe('checks `detectNightlyRate` static method', () => {
    it('should return custom night rate', () => {
      const res = NightlyRateSingleContainer.detectNightlyRate({
        pricingInfo: {
          costPerNight: 33,
        },
        customNightRate: 2,
        selectedSlots: {
          slots: [new Date()],
        },
      });

      expect(res).toBe(2);
    });

    it('should return cost per night', () => {
      const res = NightlyRateSingleContainer.detectNightlyRate({
        pricingInfo: {
          costomizialeNightCost: false,
          costPerNight: 33,
        },
        customNightRate: null,
        selectedSlots: {
          slots: [new Date()],
        },
      });

      expect(res).toBe(33);
    });

    it('should return daily cost', () => {
      const res = NightlyRateSingleContainer.detectNightlyRate({
        pricingInfo: {
          costomizialeNightCost: true,
          weekNightPrice: {
            friday_price: 10,
            monday_price: 10,
            saturday_price: 10,
            sunday_price: 10,
            thursday_price: 10,
            tuesday_price: 10,
            wednesday_price: 10,
          },
        },
        customNightRate: null,
        selectedSlots: {
          slots: [new Date()],
        },
      });

      expect(res).toBe(10);
    });
  });
});
