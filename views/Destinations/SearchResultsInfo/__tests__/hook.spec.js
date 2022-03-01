import { renderHook } from '@testing-library/react-hooks';

import useContainer from '../hook';

jest.mock('state/concepts/campervan-rental/selectors', () => ({
  areSearchResultsFetchingSelector: jest.fn(() => true),
  campersSelector: jest.fn(() => [{ id: 1 }]),
  campersTotalSelector: jest.fn(() => 222),
}));

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationParamsSelector: jest.fn(() => ({
    location: {
      locationName: 'locationName',
      stateLanding: {
        state: 'state',
        slug: 'slug',
      },
    },
  })),
}));

describe('EmptyResult useContainer hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useContainer));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });
});
