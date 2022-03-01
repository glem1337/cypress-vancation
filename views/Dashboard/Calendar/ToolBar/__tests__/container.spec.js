import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import {
  setCalendarSettingsVisibility,
  clearSelectedSlots,
  toggleCalendarFooter,
} from 'state/concepts/calendar/actions';

import CustomToolbar, { CustomToolbarContainer } from '../container';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

describe('CustomToolbar container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    onNavigate: jest.fn(),
    label: 'label',
    date: new Date('2/20/2000'),
    toggleCalendarSettings: jest.fn(),
  };

  let wrapper = null;
  let container = null;
  let instance = null;

  beforeEach(() => {
    wrapper = shallow(<CustomToolbar {...props} />);
    container = diveTo(wrapper, CustomToolbarContainer);
    instance = container.instance();

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `navigate` instance method', () => {
    instance.navigate('action')();

    expect(props.onNavigate).toHaveBeenCalledWith('action');
  });

  it('checks `toolbarData` instance getter', () => {
    const { toolbarData } = instance;

    expect(toolbarData).toMatchSnapshot();
  });

  it('checks `toggleSettings` instance method', () => {
    const event = {
      preventDefault: jest.fn(),
    };

    instance.toggleSettings(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenNthCalledWith(1, clearSelectedSlots());
    expect(store.dispatch).toHaveBeenNthCalledWith(2, setCalendarSettingsVisibility(true));
  });

  it('checks `toggleFooter` instance method', () => {
    const event = {
      preventDefault: jest.fn(),
    };

    instance.toggleFooter(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(toggleCalendarFooter());
  });
});
