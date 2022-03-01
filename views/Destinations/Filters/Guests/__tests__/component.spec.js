import React from 'react';
import { shallow } from 'enzyme';

import Guests from '../component';
import { FILTER_NAMES } from '../../hooks/useOpenedState';

const mockedGuestsHookData = {
  badge: 22,
  clearFilters: jest.fn(),
  applyFilters: jest.fn(),
  renderQuestsWidget: jest.fn(() => 'renderQuestsWidget'),
};
jest.mock('../../hooks/useQuests', () => jest.fn(() => mockedGuestsHookData));

const mockedShardHookData = {
  getPopupContainer: jest.fn(),
};
jest.mock('../../hooks/useSharedValues', () => jest.fn(() => mockedShardHookData));

describe('Guests component tests', () => {
  const props = {
    openedFilterName: FILTER_NAMES.GUESTS,
    toggleOpenedState: jest.fn(),
  };

  const component = shallow(<Guests {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
