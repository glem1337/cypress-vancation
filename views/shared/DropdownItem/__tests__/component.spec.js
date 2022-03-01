import { shallow } from 'enzyme';

import DropdownItem from '../component';

describe('DropdownItem component matches snapshot', () => {
  const defaultProps = {
    onClick: jest.fn(),
    text: { id: 'item.text' },
    disabled: false,
  };

  it('with default props', () => {
    const wrapper = shallow(<DropdownItem {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when disabled is true', () => {
    const props = {
      ...defaultProps,
      disabled: true,
    };
    const wrapper = shallow(<DropdownItem {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('when isHidden true', () => {
    const props = {
      ...defaultProps,
      isHidden: true,
    };
    const wrapper = shallow(<DropdownItem {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with icon', () => {
    const props = { ...defaultProps, icon: 'live-preview' };
    const wrapper = shallow(<DropdownItem {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with label', () => {
    const props = { ...defaultProps, label: { id: 'shared.ok' } };
    const wrapper = shallow(<DropdownItem {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with label and icon', () => {
    const props = {
      ...defaultProps,
      label: { id: 'shared.ok' },
      icon: 'icon-time',
    };

    const wrapper = shallow(<DropdownItem {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
