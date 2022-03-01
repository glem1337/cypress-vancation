import { createSelector } from 'reselect';
import { path } from 'ramda';

import isPresent from 'utils/isPresent';

export const currentUserIdSelector = path(['session', 'currentUser', 'id']);

export const currentUserSelector = state => state.session.currentUser;

export const isUserLoggedInSelector = createSelector(
  currentUserIdSelector,
  isPresent,
);
