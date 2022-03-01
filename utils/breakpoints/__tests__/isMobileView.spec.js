import isMobileView from '../isMobileView';

describe('isMobileView helper', () => {
  Object.defineProperty(
    window,
    'getComputedStyle',
    { value: jest.fn() },
  );

  it('should return false', () => {
    global.getComputedStyle.mockReturnValueOnce({ display: 'none' });

    expect(isMobileView()).toBe(false);
  });

  it('should return false as error', () => {
    global.getComputedStyle.mockImplementationOnce(() => {
      throw new Error();
    });

    expect(isMobileView()).toBe(false);
  });

  it('should return true', () => {
    const div = document.createElement('div');
    div.id = 'mobile-detector';
    document.body.appendChild(div);

    global.getComputedStyle.mockReturnValueOnce({ display: 'flex' });

    expect(isMobileView()).toBe(true);
  });
});
