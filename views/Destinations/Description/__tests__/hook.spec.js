import { renderHook } from '@testing-library/react-hooks';

import useContainer from '../hook';

jest.mock('state/concepts/campervan-rental/selectors', () => ({
  campersSelector: jest.fn(() => [{ id: 1 }]),
}));

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationParamsSelector: jest.fn(() => ({
    location: {
      description: 'Test description',
    },
  })),
}));

describe('Description useContainer hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useContainer));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });
});
