import { act, renderHook } from '@testing-library/react-hooks';

import useContainer from '../hook';

describe('CollapsibleText useContainer hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useContainer));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('checks `setCollapsed` method', () => {
    act(() => {
      result.current.setCollapsed();
    });

    expect(result.current.collapsed).toBe(false);
  });
});
