import React from 'react';
import { shallow } from 'enzyme';

import Pricing from '../component';

describe('Pricing component tests', () => {
  const props = {
    values: {
      costomizialeNightCost: false,
      weeklyDiscount: false,
      monthlyDiscount: false,
      costPerNight: 280,
    },
    onCustomizableNightCostChange: jest.fn(),
    onWeeklyDiscountChange: jest.fn(),
    onMonthlyDiscountChange: jest.fn(),
    onBackButtonClick: jest.fn(),
    handleSubmit: jest.fn(),
    weeklyDiscountPercentPrice: 100,
    monthlyDiscountPercentPrice: 100,
    isValid: false,
    isCamperExist: true,
    camperCompleteness: 34,
  };

  const component = shallow(<Pricing {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('when costomizialeNightCost === true', () => {
    component.setProps({
      ...props,
      values: {
        ...props.values,
        costomizialeNightCost: true,
      },
    });

    expect(component).toMatchSnapshot();
  });

  it('when weeklyDiscount === true', () => {
    component.setProps({
      ...props,
      values: {
        ...props.values,
        weeklyDiscount: true,
      },
    });

    expect(component).toMatchSnapshot();
  });

  it('when monthlyDiscount === true', () => {
    component.setProps({
      ...props,
      values: {
        ...props.values,
        monthlyDiscount: true,
      },
    });

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when camper does not exist', () => {
    component.setProps({ isCamperExist: false });

    expect(component).toMatchSnapshot();
  });
});
