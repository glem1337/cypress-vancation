import { renderHook } from '@testing-library/react-hooks';

import useContainer from '../hook';

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationParamsSelector: jest.fn(() => ({
    location: {
      seoInfo: {
        pageHeaderTitle: 'pageHeaderTitle',
      },
    },
  })),
}));

describe('SeoInfo useContainer hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useContainer));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });
});
