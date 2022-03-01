import { act, renderHook } from '@testing-library/react-hooks';

import { dispatch } from '__mocks__/react-redux';
import { hideModal } from 'state/modal/actions';

import camperPricingAndFees from '../../__mocks__/camperPricing';

import useContainer from '../hook';

describe('FeesAndProcessingModal useContainer hook', () => {
  let result = null;

  const props = {
    camperPricingAndFees,
  };

  beforeEach(() => {
    ({ result } = renderHook(() => useContainer(props)));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('checks `closeModal` method', () => {
    act(() => {
      result.current.closeModal();
    });

    expect(dispatch).toHaveBeenCalledWith(hideModal());
  });
});
