import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import * as R from 'ramda';

import { AVAILABILITY_MODE as MOCKED_AVAILABILITY_MODE } from 'constants/calendar';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import { setAvailabilityMode } from 'state/concepts/calendar/actions';
import mockedSelectedSlots from 'views/Dashboard/Calendar/__mocks__/mockedSelectedSlots';
import {
  createBlockedPeriods,
  deleteBlockedPeriods,
} from 'state/concepts/camper/actions';

import CalendarAvailability, { CalendarAvailabilityContainer } from '../container';

jest.mock('state/concepts/calendar/selectors', () => ({
  availabilityModeSelector: jest.fn(() => MOCKED_AVAILABILITY_MODE.AVAILABLE),
  selectedSlotsSelector: jest.fn(() => mockedSelectedSlots),
  camperExternalCalendarsSelector: jest.fn(() => [{ name: 'name', id: 'id' }]),
  externalCalendarIdsSelector: jest.fn(() => (['id'])),
}));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

const layoutContainer = (props) => {
  const wrapper = shallow(<CalendarAvailability {...props} />, { disableLifecycleMethods: true });
  const container = diveTo(wrapper, CalendarAvailabilityContainer);
  const instance = container.instance();
  const setStateSpy = jest.spyOn(instance, 'setState');

  return {
    wrapper,
    container,
    instance,
    setStateSpy,
  };
};

describe('CalendarAvailability container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    camperId: 'camperId',
  };

  let container = null;
  let instance = null;
  let setStateSpy = null;

  beforeEach(() => {
    ({
      container,
      instance,
      setStateSpy,
    } = layoutContainer(props));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `changeAvailabilityMode` instance method', () => {
    instance.changeAvailabilityMode(MOCKED_AVAILABILITY_MODE.AVAILABLE)();

    expect(store.dispatch).toHaveBeenCalledWith(
      setAvailabilityMode(MOCKED_AVAILABILITY_MODE.AVAILABLE),
    );
  });

  it('checks `blockReject` instance method', () => {
    instance.blockReject();

    expect(setStateSpy).toHaveBeenCalledWith({ isBlockedPopoverVisible: false });
  });

  it('checks `blockConfirm` instance method', () => {
    instance.blockConfirm();

    expect(setStateSpy).toHaveBeenCalledWith({ isBlockedPopoverVisible: false });
    expect(store.dispatch).toHaveBeenCalledWith(
      setAvailabilityMode(MOCKED_AVAILABILITY_MODE.BLOCKED),
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      createBlockedPeriods({
        camperId: 'camperId',
        startDate: R.head(mockedSelectedSlots.slots),
        endDate: R.last(mockedSelectedSlots.slots),
      }),
    );
  });

  it('checks `unBlockReject` instance method', () => {
    instance.unBlockReject();

    expect(setStateSpy).toHaveBeenCalledWith({ isUnBlockedPopoverVisible: false });
  });

  it('checks `unBlockConfirm` instance method', () => {
    instance.unBlockConfirm();

    expect(setStateSpy).toHaveBeenCalledWith({ isUnBlockedPopoverVisible: false });
    expect(store.dispatch).toHaveBeenCalledWith(
      setAvailabilityMode(MOCKED_AVAILABILITY_MODE.AVAILABLE),
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      deleteBlockedPeriods({
        camperId: 'camperId',
        startDate: R.head(mockedSelectedSlots.slots),
        endDate: R.last(mockedSelectedSlots.slots),
      }),
    );
  });

  describe('checks `blockPrepare` instance method', () => {
    it('should show popover', () => {
      instance.blockPrepare();

      expect(setStateSpy).toHaveBeenCalledWith({ isBlockedPopoverVisible: true });
    });

    it('should not show popover', () => {
      instance.setState({
        isBlockedPopoverVisible: true,
        isUnBlockedPopoverVisible: true,
      });

      setStateSpy.mockClear();

      instance.blockPrepare();

      expect(setStateSpy).not.toHaveBeenCalled();
    });
  });

  describe('checks `unBlockPrepare` instance method', () => {
    it('should show popover', () => {
      instance.unBlockPrepare();

      expect(setStateSpy).toHaveBeenCalledWith({ isUnBlockedPopoverVisible: true });
    });

    it('should not show popover', () => {
      instance.setState({
        isBlockedPopoverVisible: true,
        isUnBlockedPopoverVisible: true,
      });

      setStateSpy.mockClear();

      instance.unBlockPrepare();

      expect(setStateSpy).not.toHaveBeenCalled();
    });
  });
});
