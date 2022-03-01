import { createLogic } from 'redux-logic';
import redirect from 'utils/redirect';

import { CHECK_PREVIOUS_STEP_COMPLETENESS } from 'state/concepts/camper/types';
import { camperSelector } from 'state/concepts/camper/selectors';
import checkCamperPreviousStepCompleteness from 'utils/camper/checkCamperPreviousStepCompleteness';

const checkPreviousStepCompleteness = createLogic({
  type: CHECK_PREVIOUS_STEP_COMPLETENESS,
  latest: true,

  process({ action: { key, camperId, ctx }, getState }, dispatch, done) {
    const camper = camperSelector(getState(), camperId);

    const route = checkCamperPreviousStepCompleteness({ key, camper });

    if (route) {
      redirect(route, ctx);
    }

    done();
  },
});

export default checkPreviousStepCompleteness;
