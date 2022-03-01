import { act, renderHook } from '@testing-library/react-hooks';

import { dispatch } from '__mocks__/react-redux';
import { setFilterValue } from 'state/concepts/search-destinations/actions';

import useGlamperOnly from '../useGlamperOnly';
import mockedFilter from '../__mocks__/filters';

jest.mock('lodash/debounce', () => fn => fn);

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationFiltersSelector: jest.fn(() => mockedFilter),
}));

describe('useGlamperOnly hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useGlamperOnly));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('checks `onChangeHandler` method', () => {
    act(() => {
      result.current.onChangeHandler(true);
    });

    expect(dispatch).toHaveBeenCalledWith(setFilterValue({
      name: 'glamper',
      value: true,
    }));
  });

  it('checks `renderGlamperOnlyWidget` method', () => {
    let res = null;

    act(() => {
      res = result.current.renderGlamperOnlyWidget();
    });

    expect(res).toMatchSnapshot();
  });
});
