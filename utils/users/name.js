import { isNil } from 'ramda';

export default ({ firstName, lastName }) => {
  if (isNil(firstName) || isNil(lastName)) { return '—'; }

  return `${firstName} ${lastName}`;
};
