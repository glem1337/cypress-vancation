import {
  FETCH_INSTAGRAM_PHOTOS,
  SET_INSTAGRAM_PHOTOS_IDS,
  SET_INSTAGRAM_PHOTOS_TOTAL,
  SET_INSTAGRAM_PHOTOS_PAGE,
} from './types';

export const fetchInstagramPhotos = ({ page = 1, perPage = 20 } = {}) => ({
  type: FETCH_INSTAGRAM_PHOTOS,
  page,
  perPage,
});

export const setInstagramPhotosIds = (ids) => ({
  type: SET_INSTAGRAM_PHOTOS_IDS,
  ids,
});

export const setInstagramPhotosTotal = (total) => ({
  type: SET_INSTAGRAM_PHOTOS_TOTAL,
  total,
});

export const setInstagramPhotosPage = (page) => ({
  type: SET_INSTAGRAM_PHOTOS_PAGE,
  page,
});
