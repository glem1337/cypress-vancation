import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import mockedSelectedSlots from 'views/Dashboard/Calendar/__mocks__/mockedSelectedSlots';
import { selectedSlotsSelector } from 'state/concepts/calendar/selectors';

import RightSidebar, { RightSidebarContainer } from '../container';

jest.mock('state/concepts/calendar/selectors', () => ({
  selectedSlotsSelector: jest.fn(() => mockedSelectedSlots),
  isSettingsVisibleSelector: jest.fn(() => true),
  isAvailabilityVisibleSelector: jest.fn(() => true),
  camperExternalCalendarsSelector: jest.fn(() => [{ name: 'name', id: 'id' }]),
  externalCalendarIdsSelector: jest.fn(() => (['id'])),
}));

const layoutContainer = (props) => {
  const wrapper = shallow(<RightSidebar {...props} />, { disableLifecycleMethods: true });
  const container = diveTo(wrapper, RightSidebarContainer);
  const instance = container.instance();

  return {
    wrapper,
    container,
    instance,
  };
};

describe('RightSidebar container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    camperId: 'camperId',
  };

  let container = null;
  let instance = null;

  beforeEach(() => {
    ({
      container,
      instance,
    } = layoutContainer(props));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  describe('checks `selectedDatesString` instance getter', () => {
    it('with single day', () => {
      expect(instance.selectedDatesString).toBe('Feb 20');
    });

    it('with multiple days', () => {
      selectedSlotsSelector.mockReturnValueOnce({
        ...mockedSelectedSlots,
        slots: [new Date(), new Date()],
      });

      ({ instance } = layoutContainer(props));

      expect(instance.selectedDatesString).toBe('Feb 20 - Feb 20');
    });

    it('without days', () => {
      selectedSlotsSelector.mockReturnValueOnce({
        ...mockedSelectedSlots,
        slots: [],
      });

      ({ instance } = layoutContainer(props));

      expect(instance.selectedDatesString).toBe('');
    });

    it('with empty days', () => {
      selectedSlotsSelector.mockReturnValueOnce(null);

      ({ instance } = layoutContainer(props));

      expect(instance.selectedDatesString).toBe('');
    });
  });
});
