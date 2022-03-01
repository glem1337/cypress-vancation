import { shallow } from 'enzyme';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import intl from 'utils/testHelpers/fakeIntl';

import PasswordInputField, { PasswordInputFieldContainer } from '../container';

describe('PasswordInputField container', () => {
  const fieldName = 'fieldName';
  const fieldValue = 'password';
  const defaultProps = {
    field: {
      value: fieldValue,
      name: fieldName,
    },
    form: {
      touched: {},
      errors: {},
      setFieldValue: jest.fn(),
      setFieldTouched: jest.fn(),
    },
    intl,
  };

  it('injects `intl` prop to PasswordInputField component', () => {
    const wrapper = shallow(<PasswordInputField {...defaultProps} />);
    expect(wrapper.props().intl).not.toBeUndefined();
  });

  it('renderVisibilityIcon(true)', () => {
    const wrapper = shallow(<PasswordInputField {...defaultProps} />);
    const container = diveTo(wrapper, PasswordInputFieldContainer);

    const instance = container.instance();

    const result = instance.renderVisibilityIcon(true);

    expect(result).toMatchSnapshot();
  });

  it('renderVisibilityIcon(false)', () => {
    const wrapper = shallow(<PasswordInputField {...defaultProps} />);
    const container = diveTo(wrapper, PasswordInputFieldContainer);

    const instance = container.instance();

    const result = instance.renderVisibilityIcon(false);

    expect(result).toMatchSnapshot();
  });

  it('handleChange()', () => {
    const wrapper = shallow(<PasswordInputField {...defaultProps} />);
    const container = diveTo(wrapper, PasswordInputFieldContainer);

    const instance = container.instance();
    const event = { target: { value: '123' } };

    instance.handleChange(event);

    expect(defaultProps.form.setFieldValue).toHaveBeenCalledTimes(1);
    expect(defaultProps.form.setFieldValue)
      .toHaveBeenCalledWith(fieldName, event.target.value.trim());
  });
});
