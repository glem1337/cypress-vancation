import { act, renderHook } from '@testing-library/react-hooks';

import { dispatch } from '__mocks__/react-redux';
import { setExpandCondition } from 'state/concepts/header/actions';

import useContainer from '../hook';

describe('MobileHeaderExpanded useContainer hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useContainer));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('checks `collapseMobileHeader` method', () => {
    act(() => {
      result.current.collapseMobileHeader();
    });

    expect(dispatch).toHaveBeenCalledWith(setExpandCondition(false));
  });
});
