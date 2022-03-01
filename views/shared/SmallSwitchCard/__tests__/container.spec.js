import { shallow } from 'enzyme';

import SmallSwitchCard from '../container';

const layoutContainer = (props) => {
  const wrapper = shallow(<SmallSwitchCard {...props} />);
  const instance = wrapper.instance();

  return {
    wrapper,
    instance,
  };
};

describe('SmallSwitchCard container tests', () => {
  const props = {
    checked: false,
    onChange: jest.fn(),
    icon: 'icon',
    title: 'title',
  };

  let wrapper = null;
  let instance = null;

  beforeEach(() => {
    ({ wrapper, instance } = layoutContainer(props));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('checks `onCardClickHandler` instance method', () => {
    it('onChange should be called', () => {
      instance.onCardClickHandler();

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(props.onChange).toHaveBeenCalledWith(!props.checked);
    });

    it('when disabled is true', () => {
      const newProps = {
        ...props,
        disabled: true,
      };
      const { instance: newInstance } = layoutContainer(newProps);
      newInstance.onCardClickHandler();

      expect(props.onChange).not.toHaveBeenCalled();
    });
  });
});
