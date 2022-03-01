import React from 'react';
import { shallow } from 'enzyme';

import MainInfo from '../component';

const mockedHookData = {
  title: 'title',
  subTitle: 'subTitle',
};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('MainInfo component tests', () => {
  const component = shallow(<MainInfo />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
