import { renderHook } from '@testing-library/react-hooks';

import useContainer from '../hook';

jest.mock('state/concepts/session/selectors', () => ({
  isUserLoggedInSelector: jest.fn(() => true),
}));

describe('GroupedMenu useContainer hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useContainer));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });
});
