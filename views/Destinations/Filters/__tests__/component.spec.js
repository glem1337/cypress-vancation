import React from 'react';
import { shallow } from 'enzyme';

import Filters from '../component';

jest.mock('../hook', () => jest.fn());

const mockedOpenedStateHookData = {
  openedFilterName: 'test',
  toggleOpenedState: jest.fn(),
};
jest.mock('../hooks/useOpenedState', () => jest.fn(() => mockedOpenedStateHookData));

describe('Filters component tests', () => {
  const props = {
    isMapVisible: true,
    toggleMapVisibility: jest.fn(),
    stateSlug: 'stateSlug',
    stateName: 'stateName',
    locationName: 'locationName',
    toggleMobileFilter: jest.fn(),
  };

  const component = shallow(<Filters {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
