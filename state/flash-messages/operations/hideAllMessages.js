import { createLogic } from 'redux-logic';
import { notification } from 'antd';

import { HIDE_ALL } from 'state/flash-messages/types';

const hideAllMessagesOperation = createLogic({
  type: HIDE_ALL,
  latest: true,

  async process(_, __, done) {
    if (typeof window !== 'undefined') {
      notification.destroy();
    }

    done();
  },
});

export default hideAllMessagesOperation;
