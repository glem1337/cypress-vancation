import { createLogic } from 'redux-logic';

import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import { SUBSCRIBE_DISCOUNT } from 'state/concepts/users/types';
import { subscribeDiscountEndpoint } from 'state/concepts/users/endpoints';
import showErrorNotifications from 'utils/showErrorNotifications';
import { showMessage } from 'state/flash-messages/actions';
import { MESSAGE_TYPE } from 'state/flash-messages/messagesTypes';
import assignFormErrors from 'utils/form/assignFormErrors';

const subscribeDiscount = createLogic({
  type: SUBSCRIBE_DISCOUNT,
  latest: true,

  async process({ httpClient, action: { values, form } }, dispatch, done) {
    const { endpoint, url } = subscribeDiscountEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    try {
      await httpClient.post(url, values);

      dispatch(showMessage({
        messageTitle: { id: 'shared.success' },
        messageSubTitle: { id: 'notification.discountCodes.success' },
        messageType: MESSAGE_TYPE.SUCCESS,
      }));

      dispatch(dataApiSuccess({ response: {}, endpoint }));
      form.resetForm();
    } catch (error) {
      dispatch(dataApiFailure({ endpoint, error }));
      showErrorNotifications(error, dispatch);
      assignFormErrors(form, error);
    }
    done();
  },
});

export default subscribeDiscount;
