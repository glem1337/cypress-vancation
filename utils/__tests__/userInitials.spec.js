import userInitials from '../userInitials';

describe('userInitials()', () => {
  it('right all arguments', () => {
    expect(userInitials('first', 'second')).toEqual('FS');
  });

  it('first argument null', () => {
    expect(userInitials(null, 'second')).toEqual('S');
  });

  it('second argument null', () => {
    expect(userInitials('first', null)).toEqual('F');
  });

  it('all arguments null', () => {
    expect(userInitials(null, null)).toEqual('');
  });
});
