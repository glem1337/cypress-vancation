import { shallow } from 'enzyme';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import InputField, { InputFieldContainer } from '../container';

describe('InputField container', () => {
  let wrapper;
  let container;
  let instance;
  const fieldName = 'fieldName';
  const fieldValue = 'password';
  const defaultProps = {
    field: {
      value: fieldValue,
      name: fieldName,
      onBlur: jest.fn(),
    },
    form: {
      touched: {},
      errors: {},
      setFieldValue: jest.fn(),
      setFieldTouched: jest.fn(),
    },
    placeholder: { id: 'fake.placeholder' },
    onChangeHandler: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<InputField {...defaultProps} />);
    container = diveTo(wrapper, InputFieldContainer);
    instance = container.instance();
    jest.clearAllMocks();
  });

  it('injects `intl` prop to Input component', () => {
    expect(wrapper.props().intl).not.toBeUndefined();
  });

  describe('handleChange()', () => {
    it('onChange is not empty ', () => {
      const event = { target: { value: '123' } };

      instance.handleChange(event);

      expect(defaultProps.form.setFieldValue).toHaveBeenCalledTimes(1);
      expect(defaultProps.form.setFieldValue)
        .toHaveBeenCalledWith(fieldName, event.target.value.trim());
      expect(defaultProps.onChangeHandler).toHaveBeenCalledTimes(1);
      expect(defaultProps.onChangeHandler).toHaveBeenCalledWith(event);
    });

    it('onChange is empty ', () => {
      const event = { target: { value: '123' } };

      container.setProps({ onChangeHandler: null });
      instance.handleChange(event);

      expect(defaultProps.form.setFieldValue).toHaveBeenCalledTimes(1);
      expect(defaultProps.form.setFieldValue)
        .toHaveBeenCalledWith(fieldName, event.target.value.trim());
      expect(defaultProps.onChangeHandler).not.toHaveBeenCalled();
    });
  });

  describe('checks `onBlurHandler` instance method', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    const event = {};

    it('when values is empty', () => {
      container.setProps({
        field: {
          value: '             ',
          name: fieldName,
          onBlur: jest.fn(),
        },
      });

      instance.onBlurHandler(event);

      expect(defaultProps.form.setFieldValue).toHaveBeenCalledWith(fieldName, '');
    });

    it('when values is not empty and string', () => {
      container.setProps({
        field: {
          value: 'test ',
          name: fieldName,
          onBlur: jest.fn(),
        },
      });

      instance.onBlurHandler(event);

      expect(defaultProps.form.setFieldValue).toHaveBeenCalledWith(fieldName, 'test');
    });

    it('when values is not empty and not string', () => {
      container.setProps({
        field: {
          value: 11,
          name: fieldName,
          onBlur: jest.fn(),
        },
      });

      instance.onBlurHandler(event);

      expect(defaultProps.form.setFieldValue).toHaveBeenCalledWith(fieldName, 11);
    });
  });
});
