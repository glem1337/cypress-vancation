import {
  SET_EXPAND_CONDITION,
  SET_INPUT_VISIBILITY,
} from './types';

export const setExpandCondition = (isExpanded) => ({
  type: SET_EXPAND_CONDITION,
  isExpanded,
});

export const setInputVisibility = (isVisible) => ({
  type: SET_INPUT_VISIBILITY,
  isVisible,
});
