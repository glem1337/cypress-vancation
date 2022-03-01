import { renderHook } from '@testing-library/react-hooks';

import useContainer from '../hook';

jest.mock('state/app/selectors', () => ({
  openGraphDataSelector: jest.fn(() => ({
    openGraph: {
      url: null,
      title: null,
      type: null,
      image: null,
      siteName: null,
      description: null,
    },
    twitter: {
      card: null,
      image: null,
    },
  })),
}));

describe('MetaComponent useContainer hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useContainer));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });
});
