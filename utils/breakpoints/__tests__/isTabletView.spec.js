import isTabletView from '../isTabletView';

describe('isTabletView helper', () => {
  Object.defineProperty(
    window,
    'getComputedStyle',
    { value: jest.fn() },
  );

  it('should return false', () => {
    global.getComputedStyle.mockReturnValueOnce({ display: 'none' });

    expect(isTabletView()).toBe(false);
  });

  it('should return false as error', () => {
    global.getComputedStyle.mockImplementationOnce(() => {
      throw new Error();
    });

    expect(isTabletView()).toBe(false);
  });

  it('should return true', () => {
    const div = document.createElement('div');
    div.id = 'tablet-detector';
    document.body.appendChild(div);

    global.getComputedStyle.mockReturnValueOnce({ display: 'flex' });

    expect(isTabletView()).toBe(true);
  });
});
