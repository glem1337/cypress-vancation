import normalize from 'json-api-normalizer';
import build from 'redux-object';

import { ownerProfileSelector } from '../selectors';
import ownerProfileResponse from '../__mocks__/ownerProfileResponse';

describe('Owner selectors', () => {
  it('ownerProfileSelector', () => {
    const state = {
      data: normalize(ownerProfileResponse.data),
    };

    expect(ownerProfileSelector(state)).toEqual(build(state.data, 'owner')[0]);
  });
});
