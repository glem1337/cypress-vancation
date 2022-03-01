import React from 'react';
import { shallow } from 'enzyme';

import BookingDetails from '../component';

const mockedHookData = {};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('BookingDetails component tests', () => {
  const component = shallow(<BookingDetails />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
