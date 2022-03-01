import {
  setCurrentDate,
  setCalendarSettingsVisibility,
  setAvailabilityVisibility,
  setAvailabilityMode,
  closeRightSidebar,
  setSelectedSlots,
  clearSelectedSlots,
  toggleCalendarFooter,
  setCustomDiscountPeriodIds,
  setCustomMinNightStayIds,
  setCustomNightRatesIds,
  setBlockedPeriodIds,
  setExternalEventsIds,
} from '../actions';

it('setCurrentDate()', () => {
  const expectedAction = {
    type: 'camper-calendar/SET_CURRENT_DATE',
    date: 'test',
  };

  expect(setCurrentDate('test')).toEqual(expectedAction);
});

it('setCalendarSettingsVisibility()', () => {
  const expectedAction = {
    type: 'camper-calendar/SET_SETTINGS_VISIBILITY',
    isVisible: true,
  };

  expect(setCalendarSettingsVisibility(true)).toEqual(expectedAction);
});

it('setAvailabilityVisibility()', () => {
  const expectedAction = {
    type: 'camper-calendar/SET_AVAILABILITY_VISIBILITY',
    isVisible: true,
  };

  expect(setAvailabilityVisibility(true)).toEqual(expectedAction);
});

it('setAvailabilityMode()', () => {
  const expectedAction = {
    type: 'camper-calendar/SET_AVAILABILITY_MODE',
    mode: 'blocked',
  };

  expect(setAvailabilityMode('blocked')).toEqual(expectedAction);
});

it('closeRightSidebar()', () => {
  const expectedAction = {
    type: 'camper-calendar/CLOSE_RIGHT_SIDEBAR',
  };

  expect(closeRightSidebar()).toEqual(expectedAction);
});

it('setSelectedSlots()', () => {
  const data = {
    start: 'start',
    end: 'end',
    slots: 'slots',
  };

  const expectedAction = {
    type: 'camper-calendar/SET_SELECTED_SLOTS',
    ...data,
  };

  expect(setSelectedSlots(data)).toEqual(expectedAction);
});

it('clearSelectedSlots()', () => {
  const expectedAction = {
    type: 'camper-calendar/CLEAR_SELECTED_SLOTS',
  };

  expect(clearSelectedSlots()).toEqual(expectedAction);
});

it('toggleCalendarFooter()', () => {
  const expectedAction = {
    type: 'camper-calendar/TOGGLE_CALENDAR_FOOTER',
  };

  expect(toggleCalendarFooter()).toEqual(expectedAction);
});

it('setCustomDiscountPeriodIds()', () => {
  const expectedAction = {
    type: 'camper-calendar/SET_CUSTOM_DISCOUNT_PERIODS_IDS',
    ids: [1, 2],
  };

  expect(setCustomDiscountPeriodIds([1, 2])).toEqual(expectedAction);
});

it('setCustomMinNightStayIds()', () => {
  const expectedAction = {
    type: 'camper-calendar/SET_CUSTOM_MIN_NIGHT_STAY_IDS',
    ids: [1, 2],
  };

  expect(setCustomMinNightStayIds([1, 2])).toEqual(expectedAction);
});

it('setCustomNightRatesIds()', () => {
  const expectedAction = {
    type: 'camper-calendar/SET_CUSTOM_NIGHT_RATES_IDS',
    ids: [1, 2],
  };

  expect(setCustomNightRatesIds([1, 2])).toEqual(expectedAction);
});

it('setBlockedPeriodIds()', () => {
  const expectedAction = {
    type: 'camper-calendar/SET_BLOCKED_PERIODS_IDS',
    ids: [1, 2],
  };

  expect(setBlockedPeriodIds([1, 2])).toEqual(expectedAction);
});

it('setExternalEventsIds()', () => {
  const expectedAction = {
    type: 'camper-calendar/SET_EXTERNAL_EVENT_IDS',
    ids: [1, 2],
  };

  expect(setExternalEventsIds([1, 2])).toEqual(expectedAction);
});
