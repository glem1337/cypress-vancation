import { createLogic } from 'redux-logic';
import { SET_PAGES } from 'state/app/type';
import setRouterCookies from 'utils/setPagesCookies';

const setPagesOperation = createLogic({
  type: SET_PAGES,
  latest: true,

  process({ action: { prevPage, currentPage, isServer } }, dispatch, done) {
    if (!isServer) {
      setRouterCookies({ prevPage, currentPage });
    }
    done();
  },
});

export default setPagesOperation;
