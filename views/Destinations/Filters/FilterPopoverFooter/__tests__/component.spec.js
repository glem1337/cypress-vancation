import React from 'react';
import { shallow } from 'enzyme';

import FilterPopoverFooter from '../component';

const mockedHookData = {
  areCampersFetching: false,
};
jest.mock('../../hooks/useSharedValues', () => jest.fn(() => mockedHookData));

describe('FilterPopoverFooter component tests', () => {
  const props = {
    clearFilters: jest.fn(),
    applyFilters: jest.fn(),
  };

  const component = shallow(<FilterPopoverFooter {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
