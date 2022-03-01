import { renderHook } from '@testing-library/react-hooks';

import { CHECKOUT_STEPS } from 'constants/checkout';

import { currentUserSelector } from 'state/concepts/session/selectors';

import useContainer from 'views/Checkout/Header/hook';

jest.mock('state/concepts/session/selectors', () => ({
  currentUserSelector: jest.fn(() => ({
    dateOfBirth: '01.01.1970',
  })),
}));

describe('Header useContainer hook', () => {
  const { result } = renderHook(useContainer);

  it('when DOB is present', () => {
    const expected = CHECKOUT_STEPS.slice(1);

    expect(result.current).toEqual(expected);
  });

  it('when DOB isn`t present', () => {
    currentUserSelector.mockReturnValueOnce({
      dateOfBirth: null,
    });

    const { result: res } = renderHook(useContainer);

    expect(res.current).toEqual(CHECKOUT_STEPS);
  });
});
