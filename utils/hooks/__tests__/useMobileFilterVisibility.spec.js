import { act, renderHook } from '@testing-library/react-hooks';
import { dispatch } from '__mocks__/react-redux';

import { toggleMobileFiltersVisibility as toggleMobileFiltersVisibilityAction } from 'state/concepts/search-destinations/actions';

import useMobileFilterVisibility from '../useMobileFilterVisibility';

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationFiltersSelector: jest.fn(() => ({
    isMobileVisible: true,
  })),
}));

describe('useMobileFilterVisibility hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useMobileFilterVisibility));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('checks `toggleMobileFiltersVisibility` method', () => {
    act(() => {
      result.current.toggleMobileFiltersVisibility();
    });

    expect(dispatch).toHaveBeenCalledWith(toggleMobileFiltersVisibilityAction());
  });
});
