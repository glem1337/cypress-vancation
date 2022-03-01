import {
  SET_INSTAGRAM_PHOTOS_IDS,
  SET_INSTAGRAM_PHOTOS_TOTAL,
  SET_INSTAGRAM_PHOTOS_PAGE,
} from '../types';
import reducer from '../reducer';

describe('Home reducers', () => {
  describe('instagramPhotosIds reducer', () => {
    it('should handle SET_INSTAGRAM_PHOTOS_IDS', () => {
      const action = {
        type: SET_INSTAGRAM_PHOTOS_IDS,
        ids: [1, 2],
      };

      expect(reducer(undefined, action).instagramPhotosIds).toEqual([1, 2]);
    });
  });

  describe('instagramPhotosTotal reducer', () => {
    it('should handle SET_INSTAGRAM_PHOTOS_TOTAL', () => {
      const action = {
        type: SET_INSTAGRAM_PHOTOS_TOTAL,
        total: 12,
      };

      expect(reducer(undefined, action).instagramPhotosTotal).toBe(12);
    });
  });

  describe('instagramPhotosPage reducer', () => {
    it('should handle SET_INSTAGRAM_PHOTOS_PAGE', () => {
      const action = {
        type: SET_INSTAGRAM_PHOTOS_PAGE,
        page: 22,
      };

      expect(reducer(undefined, action).instagramPhotosPage).toBe(22);
    });
  });
});
