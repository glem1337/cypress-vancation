import { combineReducers } from 'redux';
import { uniq } from 'ramda';

import {
  SET_INSTAGRAM_PHOTOS_IDS,
  SET_INSTAGRAM_PHOTOS_TOTAL,
  SET_INSTAGRAM_PHOTOS_PAGE,
} from './types';

const instagramPhotosIds = (state = [], action) => {
  switch (action.type) {
    case SET_INSTAGRAM_PHOTOS_IDS:
      return uniq([...state, ...action.ids]);
    default:
      return state;
  }
};

const instagramPhotosTotal = (state = 0, action) => {
  switch (action.type) {
    case SET_INSTAGRAM_PHOTOS_TOTAL:
      return action.total;
    default:
      return state;
  }
};

const instagramPhotosPage = (state = 0, action) => {
  switch (action.type) {
    case SET_INSTAGRAM_PHOTOS_PAGE:
      return action.page;
    default:
      return state;
  }
};

export default combineReducers({
  instagramPhotosIds,
  instagramPhotosTotal,
  instagramPhotosPage,
});
