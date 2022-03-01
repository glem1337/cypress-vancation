import * as types from '../types';
import reducer from '../reducer';

describe('Header reducers', () => {
  describe('isExpanded reducer', () => {
    it('type SET_EXPAND_CONDITION', () => {
      const action = {
        type: types.SET_EXPAND_CONDITION,
        isExpanded: true,
      };

      expect(reducer(undefined, action).isExpanded).toBe(true);
    });
  });

  describe('isInputVisible reducer', () => {
    it('type SET_EXPAND_CONDITION', () => {
      const action = {
        type: types.SET_INPUT_VISIBILITY,
        isVisible: true,
      };

      expect(reducer(undefined, action).isInputVisible).toBe(true);
    });
  });
});
