import { shallow } from 'enzyme';

import InputNumericField from '../container';

describe('InputNumericField container tests', () => {
  const props = {
    field: {
      name: 'name',
      value: 10,
    },
    form: {
      setFieldValue: jest.fn(),
    },
    min: 0,
  };

  const wrapper = shallow(<InputNumericField {...props} />);
  const instance = wrapper.instance();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('checks `handleIncrease` instance method', () => {
    it('default', () => {
      instance.handleIncrease();

      expect(props.form.setFieldValue).toHaveBeenCalledTimes(1);
      expect(props.form.setFieldValue).toHaveBeenCalledWith(
        props.field.name,
        props.field.value + 1,
      );
    });

    describe('when value === max', () => {
      const newProps = {
        field: {
          name: 'name',
          value: 10,
        },
        max: 10,
      };

      it('default', () => {
        wrapper.setProps(newProps);

        const newInstance = wrapper.instance();
        newInstance.handleIncrease();

        expect(props.form.setFieldValue).not.toHaveBeenCalled();
      });

      it('when `onMaxValueTrigger` callback is present', () => {
        wrapper.setProps({
          ...newProps,
          onMaxValueTrigger: jest.fn(),
        });

        const newInstance = wrapper.instance();
        newInstance.handleIncrease();

        expect(props.form.setFieldValue).not.toHaveBeenCalled();
      });
    });
  });

  describe('checks `handleDecrease` instance method', () => {
    it('default', () => {
      instance.handleDecrease();

      expect(props.form.setFieldValue).toHaveBeenCalledTimes(1);
      expect(props.form.setFieldValue).toHaveBeenCalledWith(
        props.field.name,
        props.field.value - 1,
      );
    });

    it('when value === min', () => {
      wrapper.setProps({
        field: {
          name: 'name',
          value: 1,
        },
        min: 1,
      });

      const newInstance = wrapper.instance();
      newInstance.handleDecrease();

      expect(props.form.setFieldValue).not.toHaveBeenCalled();
    });
  });
});
