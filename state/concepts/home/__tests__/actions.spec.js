import {
  FETCH_INSTAGRAM_PHOTOS,
  SET_INSTAGRAM_PHOTOS_IDS,
  SET_INSTAGRAM_PHOTOS_TOTAL,
  SET_INSTAGRAM_PHOTOS_PAGE,
} from '../types';

import {
  fetchInstagramPhotos,
  setInstagramPhotosIds,
  setInstagramPhotosTotal,
  setInstagramPhotosPage,
} from '../actions';

it('fetchInstagramPhotos()', () => {
  const params = {
    page: 10,
    perPage: 20,
  };

  const expectedAction = {
    type: FETCH_INSTAGRAM_PHOTOS,
    ...params,
  };

  expect(fetchInstagramPhotos(params)).toEqual(expectedAction);
});

it('setInstagramPhotosIds()', () => {
  const expectedAction = {
    type: SET_INSTAGRAM_PHOTOS_IDS,
    ids: [1, 2],
  };

  expect(setInstagramPhotosIds([1, 2])).toEqual(expectedAction);
});

it('setInstagramPhotosTotal()', () => {
  const expectedAction = {
    type: SET_INSTAGRAM_PHOTOS_TOTAL,
    total: 100,
  };

  expect(setInstagramPhotosTotal(100)).toEqual(expectedAction);
});

it('setInstagramPhotosPage()', () => {
  const expectedAction = {
    type: SET_INSTAGRAM_PHOTOS_PAGE,
    page: 3,
  };

  expect(setInstagramPhotosPage(3)).toEqual(expectedAction);
});
