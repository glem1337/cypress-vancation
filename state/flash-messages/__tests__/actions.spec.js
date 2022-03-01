import { MESSAGE_DURATION } from 'state/flash-messages/messagesTypes';
import * as actions from '../actions';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4'),
}));

it('showMessage', () => {
  const expectedAction = {
    type: 'flash-message/SHOW_MESSAGE',
    id: 'uuid/v4',
    duration: MESSAGE_DURATION,
    messageType: 'success',
    messageSubTitle: { id: 'test' },
    messageTitle: { id: 'test' },
  };

  expect(actions.showMessage({ messageTitle: { id: 'test' }, messageSubTitle: { id: 'test' } })).toEqual(expectedAction);
});

it('hideMessage action', () => {
  const expectedAction = {
    type: 'flash-message/HIDE_MESSAGE',
    id: 'id',
  };

  expect(actions.hideMessage({ id: 'id' })).toEqual(expectedAction);
});

it('hideAll action', () => {
  const expectedAction = {
    type: 'flash-message/HIDE_ALL',
  };

  expect(actions.hideAll()).toEqual(expectedAction);
});
