import normalize from 'json-api-normalizer';
import build from 'redux-object';

import { instagramPhotosSelector } from '../selectors';
import fetchInstagramPhotosResponse from '../__mocks__/fetchInstagramPhotosResponse';

describe('instagramPhotosSelector', () => {
  it('should return empty array', () => {
    const state = {
      home: {
        instagramPhotosIds: [],
      },
      data: normalize(fetchInstagramPhotosResponse.data),
    };

    expect(instagramPhotosSelector(state)).toEqual([]);
  });

  it('should return photos', () => {
    const ids = [
      fetchInstagramPhotosResponse.data.data[0].id,
      fetchInstagramPhotosResponse.data.data[1].id,
    ];

    const state = {
      home: {
        instagramPhotosIds: ids,
      },
      data: normalize(fetchInstagramPhotosResponse.data),
    };

    expect(instagramPhotosSelector(state)).toEqual(build(state.data, 'instagramPhoto', ids));
  });
});
