import { shallow } from 'enzyme';

import SearchListComponent from '../component';

describe('SearchList component matches snapshot', () => {
  const defaultProps = {
    onChange: jest.fn(),
    onClear: jest.fn(),
    value: 'value',
  };

  it('with default props', () => {
    const wrapper = shallow(<SearchListComponent {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with className', () => {
    const props = {
      ...defaultProps,
      className: 'className',
    };
    const wrapper = shallow(<SearchListComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
