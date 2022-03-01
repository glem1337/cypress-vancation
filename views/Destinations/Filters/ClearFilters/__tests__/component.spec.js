import React from 'react';
import { shallow } from 'enzyme';

import useDestinationPageStats from 'utils/hooks/useDestinationPageStats';

import ClearFilters from '../component';

const mockedHookData = {
  isAnyFilterApplied: false,
  clearAllFilters: jest.fn(),
};
jest.mock('utils/hooks/useDestinationPageStats', () => jest.fn(() => mockedHookData));

describe('ClearFilters component tests', () => {
  let component = shallow(<ClearFilters />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when isAnyFilterApplied equals true', () => {
    useDestinationPageStats.mockReturnValueOnce({
      isAnyFilterApplied: true,
      clearAllFilters: jest.fn(),
    });

    component = shallow(<ClearFilters />);

    expect(component).toMatchSnapshot();
  });
});
