import { shallow } from 'enzyme';

import Button from '../component';

describe('Button component matches snapshot', () => {
  const defaultProps = {
    text: { id: 'test.button' },
    onClick: jest.fn(),
  };

  it('with default props', () => {
    const wrapper = shallow(<Button {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with string `text`', () => {
    const props = {
      ...defaultProps,
      text: 'Fake text',
    };
    const wrapper = shallow(<Button {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
