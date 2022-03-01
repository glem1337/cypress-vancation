import getLength from '../getLength';

describe('getLength helper', () => {
  it('should return empty string as camper equals undefined', () => {
    const res = getLength();

    expect(res).toBe('');
  });

  it('should return empty string as camper equals null', () => {
    const res = getLength(null);

    expect(res).toBe('');
  });

  it('should return empty string as camper equals empty string', () => {
    const res = getLength('');

    expect(res).toBe('');
  });

  it('should return correct value', () => {
    const res = getLength({
      specificationDetail: {
        length: 22,
      },
    });

    expect(res).toBe('22');
  });
});
