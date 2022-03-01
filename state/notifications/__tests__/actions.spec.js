import * as actions from '../actions';
import { notification } from '../__mocks__/notification';

it('showNotification', () => {
  const expectedAction = {
    type: 'SHOW_NOTIFICATION',
    notification,
  };

  expect(actions.showNotification(notification)).toEqual(expectedAction);
});

it('hideNotification action', () => {
  const expectedAction = {
    type: 'HIDE_NOTIFICATION',
    id: 'id',
    context: 'context',
  };

  expect(actions.hideNotification({ id: 'id', context: 'context' })).toEqual(expectedAction);
});
