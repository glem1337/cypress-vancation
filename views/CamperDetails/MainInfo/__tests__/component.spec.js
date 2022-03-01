import React from 'react';
import { shallow } from 'enzyme';

import MainInfo from '../component';

let mockedHookData = {
  camper: {
    name: 'Super camper name',
    glamper: true,
    raiting: 50,
  },
  milesCount: null,
  deliveryDistance: 123,
  ratingColors: {
    background: 'in-red-1000',
    text: 'in-red-1000',
  },
};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('MainInfo component tests', () => {
  it('matches snapshot', () => {
    const component = shallow(<MainInfo />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when milesCount is not null', () => {
    mockedHookData = {
      ...mockedHookData,
      milesCount: 345,
    };

    const component = shallow(<MainInfo />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when camper is not existing', () => {
    mockedHookData = {
      ...mockedHookData,
      camper: null,
    };

    const component = shallow(<MainInfo />);

    expect(component).toMatchSnapshot();
  });
});
