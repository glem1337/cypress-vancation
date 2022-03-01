import React from 'react';
import { shallow } from 'enzyme';

import SearchButton from '../component';

const mockedHookData = {
  containerRef: {},
};
jest.mock('utils/hooks/useButtonGradient', () => jest.fn(() => mockedHookData));

describe('SearchButton component tests', () => {
  const props = {
    onClick: jest.fn(),
  };

  const component = shallow(<SearchButton {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
