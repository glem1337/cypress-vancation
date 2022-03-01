import { shallow } from 'enzyme';

import Checkbox from '../component';

describe('Checkbox component matches snapshot', () => {
  const defaultProps = {
    label: { id: 'test.checkbox' },
  };

  it('with default props', () => {
    const wrapper = shallow(<Checkbox {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with string `label`', () => {
    const props = {
      ...defaultProps,
      label: 'Fake label',
    };
    const wrapper = shallow(<Checkbox {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
