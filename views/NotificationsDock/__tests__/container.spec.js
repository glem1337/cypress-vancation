import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import { hideNotification } from 'state/notifications/actions';
import NotificationsDockWrapped, { NotificationsDockContainer } from '../container';

jest.mock('state/notifications/actions', () => ({
  hideNotification: jest.fn(),
}));

describe('NotificationsDock container', () => {
  const store = configureStore()({
    notifications: {
      general: {
        general_123: {
          id: 'general_123',
          notificationType: 'PLAIN_NOTIFICATION',
          messageObject: { id: 'some.value' },
          kind: 'info',
          context: 'general',
          isCloseable: true,
        },
      },
    },
  });
  store.dispatch = jest.fn();

  const wrapper = shallow(<NotificationsDockWrapped store={store} context="general" />);
  const container = diveTo(wrapper, NotificationsDockContainer);
  const instance = container.instance();

  it('renders NotificationsDock component', () => {
    expect(container).toMatchSnapshot();
  });

  it('maps state and dispatch to props', () => {
    expect(instance.props).toEqual(expect.objectContaining({
      hideNotification: expect.any(Function),
      notifications: expect.any(Object),
    }));
  });

  it('hideNotification()', () => {
    instance.props.hideNotification();
    expect(hideNotification).toHaveBeenCalled();
  });
});
