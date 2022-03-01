import { act, renderHook } from '@testing-library/react-hooks';

import isMobileView from 'utils/breakpoints/isMobileView';
import isTabletView from 'utils/breakpoints/isTabletView';

import useContainer from '../hook';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));
jest.mock('utils/breakpoints/isMobileView', () => jest.fn(() => true));
jest.mock('utils/breakpoints/isTabletView', () => jest.fn(() => true));

describe('StickyCardBottom useContainer hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useContainer));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  describe('checks `setPriceCardVisibility` method', () => {
    it('should show modal', () => {
      act(() => {
        result.current.setPriceCardVisibility(true)();
      });

      expect(result.current.isCardVisible).toBe(true);
    });

    it('should not show modal', () => {
      isMobileView.mockReturnValueOnce(false);
      isTabletView.mockReturnValueOnce(false);

      ({ result } = renderHook(useContainer));

      act(() => {
        result.current.setPriceCardVisibility(true)();
      });

      expect(result.current.isCardVisible).toBe(false);
    });
  });
});
