import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import * as R from 'ramda';

import diveTo from 'utils/testHelpers/diveToEnzyme';

import MessagesRoot, { FlashMessagesRootContainer } from '../container';

describe('MessagesRoot container tests', () => {
  const messages = {
    1: { id: '1', duration: 3, messageTitle: {}, messageType: 'success' },
    2: { id: '2', duration: 3, messageTitle: {}, messageType: 'error' },
  };

  const store = configureStore()({});
  store.dispatch = jest.fn();
  store.getState = jest.fn(() => ({
    'flash-messages': messages,
  }));

  const props = {
    store,
  };

  const wrapper = shallow(<MessagesRoot {...props} />);
  const container = diveTo(wrapper, FlashMessagesRootContainer);
  const instance = container.instance();

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  describe('checks `shouldComponentUpdate` instance method', () => {
    it('should return true', () => {
      const shouldUpdate = instance.shouldComponentUpdate({ messages: R.omit(['1'], messages) });

      expect(shouldUpdate).toBe(true);
    });

    it('should return false', () => {
      const shouldUpdate = instance.shouldComponentUpdate({ messages });

      expect(shouldUpdate).toBe(false);
    });
  });
});
