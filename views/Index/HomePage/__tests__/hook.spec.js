import { renderHook } from '@testing-library/react-hooks';

import { dispatch } from '__mocks__/react-redux';
import { clearSearchDestinationParams } from 'state/concepts/search-destinations/actions';

import useContainer from '../hook';

describe('IndexPageComponent useContainer hook', () => {
  it('should clear search params', () => {
    renderHook(useContainer);

    expect(dispatch).toHaveBeenCalledWith(clearSearchDestinationParams());
  });
});
