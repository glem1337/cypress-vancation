import * as actions from '../actions';
import * as types from '../types';

describe('Header actions', () => {
  it('setExpandCondition()', () => {
    const expectedAction = { type: types.SET_EXPAND_CONDITION, isExpanded: true };

    expect(actions.setExpandCondition(true)).toEqual(expectedAction);
  });

  it('setInputVisibility()', () => {
    const expectedAction = { type: types.SET_INPUT_VISIBILITY, isVisible: true };

    expect(actions.setInputVisibility(true)).toEqual(expectedAction);
  });
});
