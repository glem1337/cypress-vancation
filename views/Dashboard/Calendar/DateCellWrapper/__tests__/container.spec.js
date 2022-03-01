import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import mockedSelectedSlots from 'views/Dashboard/Calendar/__mocks__/mockedSelectedSlots';
import { selectedSlotsSelector, camperCustomNightRateSelector } from 'state/concepts/calendar/selectors';
import { camperPricingSelector } from 'state/concepts/camper/selectors';

import DateCellWrapper, { DateCellWrapperContainer } from '../container';

const layoutContainer = (props) => {
  const wrapper = shallow(<DateCellWrapper {...props} />, { disableLifecycleMethods: true });
  const container = diveTo(wrapper, DateCellWrapperContainer);
  const instance = container.instance();

  return {
    wrapper,
    container,
    instance,
  };
};

jest.mock('state/concepts/calendar/selectors', () => ({
  selectedSlotsSelector: jest.fn(() => mockedSelectedSlots),
  camperCustomNightRateSelector: jest.fn(() => ({
    '2000-02-21': 123,
  })),
}));

const mockedCamperPrice = {
  costomizialeNightCost: false,
  weeklyDiscount: false,
  monthlyDiscount: false,
  weeklyDiscountPercent: 15,
  monthlyDiscountPercent: 33,
  minimalNightStay: '2',
  costPerNight: 280,
  weekNightPrice: {
    monday_price: '250',
    tuesday_price: '250',
    wednesday_price: '250',
    thursday_price: '250',
    friday_price: '320',
    saturday_price: '320',
    sunday_price: '250',
  },
};
jest.mock('state/concepts/camper/selectors', () => ({
  camperPricingSelector: jest.fn(() => mockedCamperPrice),
}));

describe('DateCellWrapper container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    value: new Date('2/20/2000'),
    children: <div />,
    store,
    camperCalendarData: {
      costPerNight: 0,
      mondayPrice: 1,
      tuesdayPrice: 2,
      wednesdayPrice: 3,
      thursdayPrice: 4,
      fridayPrice: 5,
      saturdayPrice: 6,
      sundayPrice: 7,
      customPricingPeriod: {
        '2021-07-28': 33,
        '2021-07-29': 33,
      },
      customDiscountPeriods: {
        '2021-07-27': {
          weeklyDiscountPercent: 15,
          monthlyDiscountPercent: 23,
        },
        '2021-07-28': {
          weeklyDiscountPercent: 44,
          monthlyDiscountPercent: 44,
        },
        '2021-07-29': {
          weeklyDiscountPercent: 15,
          monthlyDiscountPercent: 33,
        },
      },
    },
  };

  let container = null;
  let instance = null;

  beforeEach(() => {
    ({
      container,
      instance,
    } = layoutContainer(props));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `cellData` instance getter', () => {
    const { cellData } = instance;

    expect(cellData).toMatchSnapshot();
  });

  describe('checks `isSelected` instance getter', () => {
    it('for single slot', () => {
      const { isSelected } = instance;

      expect(isSelected).toBe(true);
    });

    it('for multiple slots', () => {
      selectedSlotsSelector.mockReturnValueOnce({
        ...mockedSelectedSlots,
        slots: [new Date(), new Date()],
      });

      ({ instance } = layoutContainer(props));

      const { isSelected } = instance;

      expect(isSelected).toBe(true);
    });

    it('with wrong data', () => {
      selectedSlotsSelector.mockReturnValueOnce({
        ...mockedSelectedSlots,
        slots: [],
      });

      ({ instance } = layoutContainer(props));

      const { isSelected } = instance;

      expect(isSelected).toBe(false);
    });
  });

  describe('checks `dayPrice` instance getter', () => {
    it('should return day price', () => {
      const { dayPrice } = instance;

      expect(dayPrice).toBe('$280');
    });

    it('should return weekly day price', () => {
      camperPricingSelector.mockReturnValueOnce({
        ...mockedCamperPrice,
        costomizialeNightCost: true,
      });

      camperCustomNightRateSelector.mockReturnValueOnce({});

      ({ instance } = layoutContainer(props));

      const { dayPrice } = instance;

      expect(dayPrice).toBe('$250');
    });

    it('should return day custom price', () => {
      container.setProps({ value: new Date('2/21/2000') });

      const { dayPrice } = instance;

      expect(dayPrice).toBe('$123');
    });
  });
});
