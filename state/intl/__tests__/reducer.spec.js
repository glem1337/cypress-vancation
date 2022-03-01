import enLocale from 'locales/en';
import reducer from '../reducer';

describe('intlReducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({ ...enLocale });
  });
});
