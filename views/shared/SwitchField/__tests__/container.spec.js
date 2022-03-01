import { shallow } from 'enzyme';

import SwitchField from '../container';

describe('SwitchField container tests', () => {
  const props = {
    field: {
      name: 'name',
    },
    form: {
      setFieldValue: jest.fn(),
    },
  };

  const wrapper = shallow(<SwitchField {...props} />);
  const instance = wrapper.instance();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('checks `handleChange` instance method', () => {
    const isChecked = true;

    it('when `event` from input', () => {
      const event = { target: { checked: true } };

      instance.handleChange(event);

      expect(props.form.setFieldValue).toHaveBeenCalledTimes(1);
      expect(props.form.setFieldValue).toHaveBeenCalledWith(
        props.field.name,
        event.target.checked,
      );
    });

    it('when `onToggle` isn`t present', () => {
      instance.handleChange(isChecked);

      expect(props.form.setFieldValue).toHaveBeenCalledTimes(1);
      expect(props.form.setFieldValue).toHaveBeenCalledWith(
        props.field.name,
        isChecked,
      );
    });

    it('when `onToggle` is present', () => {
      wrapper.setProps({
        onToggle: jest.fn(),
      });
      const instanceWithOnToggle = wrapper.instance();

      instanceWithOnToggle.handleChange(isChecked);

      expect(instanceWithOnToggle.props.onToggle).toHaveBeenCalledTimes(1);
      expect(instanceWithOnToggle.props.onToggle).toHaveBeenCalledWith(
        isChecked,
      );

      expect(
        instanceWithOnToggle.props.form.setFieldValue,
      ).toHaveBeenCalledTimes(1);
      expect(
        instanceWithOnToggle.props.form.setFieldValue,
      ).toHaveBeenCalledWith(instanceWithOnToggle.props.field.name, isChecked);
    });
  });
});
