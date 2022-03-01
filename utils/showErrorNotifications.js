import { pathOr, isNil } from 'ramda';
import { showMessage } from 'state/flash-messages/actions';
import { MESSAGE_TYPE } from 'state/flash-messages/messagesTypes';

const showErrorNotifications = (error, dispatch) => {
  if (typeof window !== 'undefined') {
    const errors = pathOr(null, ['response', 'data', 'errors'], error);
    const status = pathOr(null, ['response', 'status'], error);
    const statusText = pathOr(null, ['response', 'statusText'], error);

    if (!status) {
      return;
    }

    const apiErrors = isNil(errors)
      ? [statusText]
      : errors.map(e => e?.detail);

    apiErrors.forEach(currentError => {
      dispatch(showMessage({
        messageTitle: { id: 'shared.error' },
        messageSubTitle: `${status} - ${currentError}`,
        messageType: MESSAGE_TYPE.ERROR,
      }));
    });
  }
};

export default showErrorNotifications;
