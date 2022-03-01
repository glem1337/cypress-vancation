import { shallow } from 'enzyme';

import TableHeadCell from '../component';

describe('TableHeadCell component matches snapshot', () => {
  const defaultProps = {
    text: { id: 'fake.text' },
    sortKey: 'name',
    sortParams: { sortKey: 'services_name', direction: 'asc' },
    onSort: jest.fn(),
  };

  it('with default props', () => {
    const wrapper = shallow(<TableHeadCell {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when sortParams key matches sortKey', () => {
    const props = {
      ...defaultProps,
      sortParams: { sortKey: 'name', direction: 'asc' },
    };
    const wrapper = shallow(<TableHeadCell {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with when direction is desc', () => {
    const props = {
      ...defaultProps,
      sortParams: { sortKey: 'name', direction: 'desc' },
    };
    const wrapper = shallow(<TableHeadCell {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('without sortKey', () => {
    const props = {
      ...defaultProps,
      sortKey: null,
    };
    const wrapper = shallow(<TableHeadCell {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
