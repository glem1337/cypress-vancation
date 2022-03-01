import React from 'react';
import { shallow } from 'enzyme';

import MainPhoto from '../component';

let mockedHookData = {
  url: 'test url',
};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('MainPhoto component tests', () => {
  let component = shallow(<MainPhoto />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when url is not present', () => {
    mockedHookData = { url: null };

    component = shallow(<MainPhoto />);

    expect(component).toMatchSnapshot();
  });
});
