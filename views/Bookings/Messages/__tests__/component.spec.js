import React from 'react';
import { shallow } from 'enzyme';

import Messages from '../component';

const mockedHookData = {};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('Messages component tests', () => {
  const component = shallow(<Messages />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
