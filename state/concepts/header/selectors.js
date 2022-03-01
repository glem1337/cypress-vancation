import * as R from 'ramda';

export const isHeaderExpandedSelector = R.path(['header', 'isExpanded']);
export const isHeaderInputVisibleSelector = R.path(['header', 'isInputVisible']);
