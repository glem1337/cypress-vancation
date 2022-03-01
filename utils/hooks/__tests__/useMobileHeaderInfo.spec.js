import { renderHook } from '@testing-library/react-hooks';

import useMobileHeaderInfo from '../useMobileHeaderInfo';

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationParamsSelector: jest.fn(() => ({
    dateRange: null,
    location: null,
    locationIntent: null,
  })),
}));

describe('useMobileHeaderInfo hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useMobileHeaderInfo));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });
});
