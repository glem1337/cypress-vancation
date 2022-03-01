import { shallow } from 'enzyme';

import Pagination from '../component';

describe('Pagination component matches snapshot', () => {
  const defaultProps = {
    onChange: jest.fn(),
    pageCount: 10,
    currentPage: 2,
  };

  it('with default props', () => {
    const wrapper = shallow(<Pagination {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when pageCount less than 2', () => {
    const props = {
      ...defaultProps,
      pageCount: 1,
    };
    const wrapper = shallow(<Pagination {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('handles fisrt page click', () => {
    const wrapper = shallow(<Pagination {...defaultProps} />);
    wrapper.find('a.main-pagination__item').first().simulate('click');

    expect(defaultProps.onChange).toHaveBeenCalledWith({ selected: 0 });
  });

  it('handles last page click', () => {
    const wrapper = shallow(<Pagination {...defaultProps} />);
    wrapper.find('a.main-pagination__item').last().simulate('click');

    expect(defaultProps.onChange).toHaveBeenCalledWith({ selected: 9 });
  });
});
