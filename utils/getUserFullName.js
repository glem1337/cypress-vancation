import { pathOr } from 'ramda';

const getUserFullName = (path, user) => [
  pathOr('', [...path, 'firstName'], user),
  pathOr('', [...path, 'lastName'], user),
];

export default getUserFullName;
