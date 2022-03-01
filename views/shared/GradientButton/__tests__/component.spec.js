import { shallow } from 'enzyme';

import GradientButton from '../component';

const mockedHookData = {
  containerRef: {},
};
jest.mock('utils/hooks/useButtonGradient', () => jest.fn(() => mockedHookData));

describe('GradientButton component matches snapshot', () => {
  const defaultProps = {
    className: 'testClassName',
    text: { id: 'test.GradientButton' },
  };

  it('with default props', () => {
    const wrapper = shallow(<GradientButton {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with string `text`', () => {
    const props = {
      ...defaultProps,
      text: 'Fake text',
    };
    const wrapper = shallow(<GradientButton {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
