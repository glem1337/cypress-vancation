import { shallow } from 'enzyme';

import CheckboxField from '../component';

describe('CheckboxField component matches snapshot', () => {
  const defaultProps = {
    field: { value: true, name: 'fieldName' },
    passThrough: 'prop',
    handleChange: jest.fn(),
  };

  it('with default props', () => {
    const wrapper = shallow(<CheckboxField {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });
});
