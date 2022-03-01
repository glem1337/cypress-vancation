import { shallow } from 'enzyme';

import UsersFiltersComponent from '../component';

describe('UsersFilters component matches snapshot', () => {
  const defaultProps = {
    onSubmit: jest.fn(),
    appliedFilters: [],
    onReset: jest.fn(),
    onVisibleChange: jest.fn(),
    isOpen: true,
  };

  it('with default props', () => {
    const wrapper = shallow(<UsersFiltersComponent {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when hasAppliedFilters has value greater than 0', () => {
    const props = {
      ...defaultProps,
      appliedFilters: ['1', 'active'],
    };
    const wrapper = shallow(<UsersFiltersComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
