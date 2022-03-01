import { renderHook } from '@testing-library/react-hooks';

import { FETCH_USER_TYPE } from 'constants/booking';
import { fetchCamperInquiries } from 'state/concepts/booking/actions';

import useContainer, { getInitialProps } from '../hook';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock('state/concepts/booking/selectors', () => ({
  isChatSectionVisibleSelector: jest.fn(() => false),
  isDetailsSectionVisibleSelector: jest.fn(() => false),
  camperInquiresTotalSelector: jest.fn(() => 0),
}));

describe('? useContainer hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useContainer));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('checks `getInitialProps` method', async () => {
    const ctx = {
      store: {
        dispatch: jest.fn(),
      },
    };

    await getInitialProps(ctx);

    expect(ctx.store.dispatch).toHaveBeenCalledWith(fetchCamperInquiries({
      userType: FETCH_USER_TYPE.RENTER,
    }));
  });
});
