import setPagesCookies from 'utils/setPagesCookies';
import setPagesOperation from '../setPagesOperation';

jest.mock('utils/setPagesCookies', () => jest.fn());

describe('setPagesOperation()', () => {
  let dispatch;
  const actionDefault = {
    prevPage: 'test',
    currentPage: 'test',
    isServer: false,
  };

  const beforeFunction = ({ done, action }) => {
    dispatch = jest.fn(() => done());
    jest.clearAllMocks();
    setPagesOperation.process({ action }, dispatch, done);
  };

  it('snapshot', () => {
    expect(setPagesOperation).toMatchSnapshot();
  });

  describe('call setRouterCookies', () => {
    it('isServer false', done => {
      beforeFunction({ action: actionDefault, done });
      expect(setPagesCookies).toHaveBeenCalledTimes(1);
    });

    it('false', done => {
      const action = {
        ...actionDefault,
        isServer: true,
      };

      beforeFunction({ action, done });
      expect(setPagesCookies).toHaveBeenCalledTimes(0);
    });
  });
});
