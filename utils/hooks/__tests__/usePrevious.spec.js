/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import usePrevious from '../usePrevious';

function testHook() {
  const [count, setCount] = useState(0);

  const countPrev = usePrevious(count);

  const increaseCounter = () => {
    setCount(123);
  };

  return {
    count,
    countPrev,
    increaseCounter,
  };
}

describe('usePrevious useContainer hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(testHook));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('checks `increaseCounter` method', () => {
    act(() => {
      result.current.increaseCounter();
    });

    expect(result.current.count).toBe(123);
    expect(result.current.countPrev).toBe(0);
  });
});
