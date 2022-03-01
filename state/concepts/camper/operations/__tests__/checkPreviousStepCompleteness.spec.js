import normalize from 'json-api-normalizer';

import MOCKED_ROUTES from 'constants/routes';
import redirect from 'utils/redirect';
import fetchCamperResponse from 'state/concepts/camper/__mocks__/fetchCamperResponse';
import checkCamperPreviousStepCompleteness from 'utils/camper/checkCamperPreviousStepCompleteness';

import checkPreviousStepCompleteness from '../checkPreviousStepCompleteness';

jest.mock('utils/redirect', () => jest.fn());

jest.mock('utils/camper/checkCamperPreviousStepCompleteness', () => jest.fn(() => MOCKED_ROUTES.ADD_NEW_CAMPER.INSURANCE.PATH));

describe('checkPreviousStepCompleteness Operation', () => {
  const action = {
    key: MOCKED_ROUTES.ADD_NEW_CAMPER.DELIVERY.KEY,
    camperId: fetchCamperResponse.data.data.id,
    ctx: {},
  };

  const getState = jest.fn(() => ({
    data: normalize(fetchCamperResponse.data),
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('snapshot', () => {
    expect(checkPreviousStepCompleteness).toMatchSnapshot();
  });

  describe('checks invocations', () => {
    it('should redirect', () => {
      checkPreviousStepCompleteness.process({ action, getState }, null, jest.fn());

      expect(redirect).toHaveBeenCalledWith(
        MOCKED_ROUTES.ADD_NEW_CAMPER.INSURANCE.PATH,
        action.ctx,
      );
    });

    it('should not redirect', () => {
      checkCamperPreviousStepCompleteness.mockReturnValueOnce(null);

      checkPreviousStepCompleteness.process({ action, getState }, null, jest.fn());

      expect(redirect).not.toHaveBeenCalled();
    });
  });
});
