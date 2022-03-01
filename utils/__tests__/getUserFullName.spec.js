import { pathOr } from 'ramda';
import getUserFullName from '../getUserFullName';

it('getUserFullName()', () => {
  const path = ['account', 'user'];
  const user = {
    account: {
      user: {
        firstName: 'John',
        lastName: 'Dou',
      },
    },
  };

  const expected = [
    pathOr('', [...path, 'firstName'], user),
    pathOr('', [...path, 'lastName'], user),
  ];

  expect(getUserFullName(path, user)).toEqual(expected);
});
