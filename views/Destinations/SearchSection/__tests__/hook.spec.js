import { act, renderHook } from '@testing-library/react-hooks';

import { dispatch } from '__mocks__/react-redux';
import { setExpandCondition } from 'state/concepts/header/actions';

import useContainer from '../hook';

jest.mock('utils/hooks/useMobileFilterVisibility', () => jest.fn(() => ({
  toggleMobileFiltersVisibility: jest.fn(),
})));

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationParamsSelector: jest.fn(() => ({
    dateRange: null,
    location: null,
  })),
}));

describe('SearchSection useContainer hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useContainer));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('checks `expandMobileHeader` method', () => {
    act(() => {
      result.current.expandMobileHeader();
    });

    expect(dispatch).toHaveBeenCalledWith(setExpandCondition(true));
  });

  it('checks `onClickHandler` method', () => {
    const event = {
      stopPropagation: jest.fn(),
    };

    act(() => {
      result.current.onClickHandler(event);
    });

    expect(event.stopPropagation).toHaveBeenCalled();
  });
});
