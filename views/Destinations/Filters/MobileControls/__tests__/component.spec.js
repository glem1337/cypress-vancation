import React from 'react';
import { shallow } from 'enzyme';

import MobileControls from '../component';

const mockedHookData = {
  campersTotal: 44,
};
jest.mock('../../hooks/useSharedValues', () => jest.fn(() => mockedHookData));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

describe('MobileControls component tests', () => {
  const props = {
    stateSlug: 'stateSlug',
    stateName: 'stateName',
    locationName: 'locationName',
    toggleMobileFilter: jest.fn(),
  };

  const component = shallow(<MobileControls {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
