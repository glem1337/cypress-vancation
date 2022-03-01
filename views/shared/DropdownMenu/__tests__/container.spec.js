import { shallow } from 'enzyme';

import DropdownMenu from '../container';

describe('DropdownMenu container', () => {
  const defaultProps = {
    children: <div />,
    menuClassName: 'menuClassName',
    icon: <div>Icon</div>,
  };

  const wrapper = shallow(<DropdownMenu {...defaultProps} />);
  const instance = wrapper.instance();

  it('renders DropdownMenu component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('handleVisibleChange()', () => {
    instance.handleVisibleChange(true);
    expect(instance.state.visible).toEqual(true);

    instance.handleVisibleChange(false);
    expect(instance.state.visible).toEqual(false);
  });

  it('handleClose()', () => {
    const onClickMock = jest.fn();
    const event = {};
    instance.handleClose(onClickMock)(event);

    expect(onClickMock).toHaveBeenCalledWith(event);
    expect(instance.state.visible).toEqual(false);
  });

  it('stopPropagation()', () => {
    const event = {
      stopPropagation: jest.fn(),
    };

    expect(instance.stopPropagation(event)).toEqual(event.stopPropagation());
  });
});
