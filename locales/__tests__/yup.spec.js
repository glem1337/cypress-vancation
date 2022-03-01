import yup from '../yup';

describe('yup translation ids', () => {
  it('match snapshot', () => {
    expect(yup).toMatchSnapshot();
  });

  it('string.min', () => {
    expect(yup.string.min({ min: 13 })).toMatchSnapshot();
  });

  it('string.max', () => {
    expect(yup.string.max({ max: 42 })).toMatchSnapshot();
  });
});
