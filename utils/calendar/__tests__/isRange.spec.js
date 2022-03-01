import isRangeMethod from '../isRange';

describe('isRange helper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return false', () => {
    const thisContext = {
      props: {
        selectedSlots: {
          slots: [1],
        },
      },
    };

    const isRange = isRangeMethod.bind(thisContext);

    expect(isRange()).toBe(false);
  });

  it('should return true', () => {
    const thisContext = {
      props: {
        selectedSlots: {
          slots: [1, 2],
        },
      },
    };

    const isRange = isRangeMethod.bind(thisContext);

    expect(isRange()).toBe(true);
  });
});
