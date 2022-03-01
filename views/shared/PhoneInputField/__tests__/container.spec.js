import { shallow } from 'enzyme';
import intl from 'utils/testHelpers/fakeIntl';
import diveTo from 'utils/testHelpers/diveToEnzyme';

import PhoneInputField, { PhoneInputFieldContainer } from '../container';

describe('PhoneInputField container', () => {
  const fieldName = 'fieldName';

  const defaultProps = {
    field: { value: '', name: fieldName },
    placeholder: { id: 'fake.placeholder' },
    intl,
    label: { id: 'fake.label' },
    form: {
      touched: {},
      errors: {},
      setFieldValue: jest.fn(),
      setFieldTouched: jest.fn(),
    },
  };

  it('injects `intl` prop to PhoneInputField component', () => {
    const wrapper = shallow(<PhoneInputField {...defaultProps} />);

    expect(wrapper.props().intl).not.toBeUndefined();
  });

  it('handleChange()', () => {
    const wrapper = shallow(<PhoneInputField {...defaultProps} />);
    const container = diveTo(wrapper, PhoneInputFieldContainer);

    const instance = container.instance();
    const handleChangeSpy = jest.spyOn(instance, 'handleChange');

    instance.handleChange('12345');

    expect(handleChangeSpy).toHaveBeenCalledWith('12345');
  });

  it('handleChange()', () => {
    const wrapper = shallow(<PhoneInputField {...defaultProps} />);
    const container = diveTo(wrapper, PhoneInputFieldContainer);

    const instance = container.instance();
    const handleChangeSpy = jest.spyOn(instance, 'handleBlur');

    instance.handleBlur();

    expect(handleChangeSpy).toHaveBeenCalledTimes(1);
  });
});
